import type { ExpoConfig } from 'expo/config';

const { expo } = require('./app.json') as { expo: ExpoConfig };

export default (): ExpoConfig => {
  const baseAndroid = expo.android ?? {};
  const perms = Array.isArray(baseAndroid.permissions) ? [...baseAndroid.permissions] : [];
  if (!perms.includes('POST_NOTIFICATIONS')) perms.push('POST_NOTIFICATIONS');

  return {
    ...expo,
    android: {
      ...baseAndroid,
      permissions: perms,
    },
    extra: {
      ...(typeof expo.extra === 'object' && expo.extra ? expo.extra : {}),
      /** If set, only this email may use the hub (client-side lock; pair with server `ADMIN_PUSH_USER_IDS`). */
      adminLockEmail: process.env.EXPO_PUBLIC_ADMIN_LOCK_EMAIL ?? '',
      eas: {
        projectId:
          process.env.EAS_PROJECT_ID ??
          (expo as unknown as { extra?: { eas?: { projectId?: string } } }).extra?.eas?.projectId ??
          '',
      },
    },
  };
};
