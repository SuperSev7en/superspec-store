import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { shopifyGreen } from '@/constants/Colors';

export default function LoginScreen() {
  const { ready, envConfigured, session, isAdmin, signIn, profileError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={shopifyGreen} />
      </View>
    );
  }

  if (session && isAdmin) return <Redirect href="/(tabs)" />;

  if (!envConfigured) {
    return (
      <View style={[styles.root, { justifyContent: 'center' }]}>
        <Text style={styles.title}>Missing Supabase env</Text>
        <Text style={styles.sub}>
          Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to apps/admin-mobile/.env (copy from your site
          .env). Restart Expo after saving.
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Store hub</Text>
        <Text style={styles.sub}>
          Same Supabase account as the web admin. Shopify-style mobile hub: orders, products, and analytics on the go
          (official Shopify mobile app focuses on orders, products, and analytics; advanced settings stay on desktop —
          we follow that split).
        </Text>
        {profileError ? <Text style={styles.err}>Profile: {profileError}</Text> : null}
        {session && !isAdmin ? (
          <Text style={styles.err}>This user is not an admin. Set `is_admin` on `profiles` in Supabase.</Text>
        ) : null}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#8c9196"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8c9196"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.err}>{error}</Text> : null}
        <Pressable
          style={[styles.btn, loading && styles.btnDisabled]}
          disabled={loading}
          onPress={async () => {
            setLoading(true);
            setError(null);
            const { error: e } = await signIn(email, password);
            setLoading(false);
            if (e) setError(e);
          }}
        >
          <Text style={styles.btnText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
        </Pressable>
        <Text style={styles.hint}>
          Tip: use the same email/password as <Text style={{ fontWeight: '600' }}>/login</Text> on your website.
        </Text>
        <Pressable onPress={() => void Linking.openURL('https://supabase.com/dashboard')}>
          <Text style={styles.link}>Open Supabase dashboard</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f6f6f7' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e1e3e5',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#202223', marginBottom: 8 },
  sub: { fontSize: 14, color: '#6d7175', marginBottom: 20, lineHeight: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#c9cccf',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#202223',
  },
  btn: { backgroundColor: shopifyGreen, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  err: { color: '#d72c0d', marginBottom: 8, fontSize: 14 },
  hint: { marginTop: 16, fontSize: 13, color: '#6d7175' },
  link: { marginTop: 12, color: shopifyGreen, fontSize: 14, fontWeight: '600' },
});
