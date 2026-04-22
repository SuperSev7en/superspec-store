import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import Colors from '@/constants/Colors';
import { HubActivityProvider } from '@/context/HubActivityContext';
import { useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { usePushRegistration } from '@/hooks/usePushRegistration';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={22} style={{ marginBottom: -2 }} {...props} />;
}

function PushRegistrationBridge() {
  const { ready, session, isAdmin } = useAuth();
  usePushRegistration(Boolean(ready && session && isAdmin));
  return null;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { ready, session, isAdmin } = useAuth();
  const headerShown = useClientOnlyValue(false, true);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session || !isAdmin) return <Redirect href="/login" />;

  const palette = Colors[colorScheme ?? 'light'];

  return (
    <HubActivityProvider>
      <PushRegistrationBridge />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: palette.tint,
          tabBarInactiveTintColor: palette.tabIconDefault,
          headerShown,
          headerStyle: { backgroundColor: palette.card },
          headerTintColor: palette.text,
          tabBarStyle: { backgroundColor: palette.card, borderTopColor: palette.border },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color }) => <TabBarIcon name="shopping-bag" color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: ({ color }) => <TabBarIcon name="cube" color={color} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          }}
        />
      </Tabs>
    </HubActivityProvider>
  );
}
