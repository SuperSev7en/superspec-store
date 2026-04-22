import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { getSupabase } from '@/lib/supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type Options = {
  enabled: boolean;
  onInsert?: (row: Record<string, unknown>) => void;
};

/**
 * Shopify-style “instant” awareness: Supabase Realtime on `orders` INSERT
 * + a local notification when the app can show it (best-effort; push later with EAS).
 */
export function useOrdersRealtime({ enabled, onInsert }: Options) {
  const onInsertRef = useRef(onInsert);
  onInsertRef.current = onInsert;

  useEffect(() => {
    if (!enabled) return;
    const supabase = getSupabase();

    const channel = supabase
      .channel('hub-orders')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        async (payload) => {
          const row = payload.new as Record<string, unknown>;
          onInsertRef.current?.(row);
          const total = row.total != null ? String(row.total) : '';
          const num = row.order_number != null ? `#${row.order_number}` : 'New order';
          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: 'New order',
                body: total ? `${num} · $${total}` : num,
                sound: true,
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 1,
                repeats: false,
              },
            });
          } catch {
            // Simulator / permission denied — ignore
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [enabled]);
}
