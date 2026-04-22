import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { ready, envConfigured, session, isAdmin } = useAuth();

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!envConfigured) {
    return (
      <View style={styles.box}>
        <Text style={styles.title}>Configuration needed</Text>
        <Text style={styles.body}>
          Create `apps/admin-mobile/.env` with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY (same values as
          your website `.env`). See `apps/admin-mobile/.env.example`.
        </Text>
      </View>
    );
  }

  if (!session) return <Redirect href="/login" />;
  if (!isAdmin) return <Redirect href="/login" />;

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  box: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  body: { fontSize: 15, lineHeight: 22, color: '#444' },
});
