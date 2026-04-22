import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { getSupabase } from '@/lib/supabase';

/**
 * Registers this device with Supabase `push_subscriptions` for remote Expo push (new orders, test ping).
 * Physical device + granted permission + valid EAS `projectId` required for a real `ExponentPushToken`.
 */
export function usePushRegistration(enabled: boolean) {
  const ran = useRef(false);

  useEffect(() => {
    if (!enabled || ran.current) return;
    ran.current = true;

    void (async () => {
      if (!Device.isDevice) {
        return;
      }

      const { status: existing } = await Notifications.getPermissionsAsync();
      let final = existing;
      if (final !== 'granted') {
        const req = await Notifications.requestPermissionsAsync();
        final = req.status;
      }
      if (final !== 'granted') {
        return;
      }

      const projectId =
        (Constants.expoConfig?.extra as { eas?: { projectId?: string } } | undefined)?.eas?.projectId ||
        (Constants as unknown as { easConfig?: { projectId?: string } }).easConfig?.projectId;

      if (!projectId) {
        console.warn('[push] Missing EAS projectId. Run `eas init` and set EAS_PROJECT_ID when starting Expo.');
        return;
      }

      let tokenData: string;
      try {
        const res = await Notifications.getExpoPushTokenAsync({ projectId });
        tokenData = res.data;
      } catch (e) {
        console.warn('[push] getExpoPushTokenAsync failed', e);
        return;
      }

      const supabase = getSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      if (!tokenData.startsWith('ExponentPushToken[') && !tokenData.startsWith('ExpoPushToken')) {
        console.warn('[push] unexpected token format');
        return;
      }

      const { error } = await supabase.from('push_subscriptions').upsert(
        {
          user_id: user.id,
          expo_push_token: tokenData,
          platform: Platform.OS,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,expo_push_token' },
      );

      if (error) {
        console.warn('[push] upsert token', error.message);
      }
    })();
  }, [enabled]);
}
