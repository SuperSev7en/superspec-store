import { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { SITE_URL } from '@/lib/config';
import Colors, { type ColorPalette, shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/context/AuthContext';

/** Shopify-style settings: grouped sections, dense rows, clear hierarchy (Polaris mobile patterns). */
export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, accessToken, user } = useAuth();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [testing, setTesting] = useState(false);
  const [testMsg, setTestMsg] = useState<string | null>(null);

  const lock = (Constants.expoConfig?.extra as { adminLockEmail?: string } | undefined)?.adminLockEmail?.trim();

  async function sendTestPush() {
    if (!accessToken) {
      setTestMsg('No session token — sign in again.');
      return;
    }
    setTesting(true);
    setTestMsg(null);
    try {
      const res = await fetch(`${SITE_URL}/api/push/test`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; sent?: number };
      if (!res.ok || !json.ok) {
        setTestMsg(json.error ?? `Request failed (${res.status})`);
      } else {
        setTestMsg(`Sent to ${json.sent ?? 0} device(s).`);
      }
    } catch {
      setTestMsg('Network error — use your production URL in EXPO_PUBLIC_SITE_URL.');
    } finally {
      setTesting(false);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
      <Text style={[styles.h1, { color: palette.text }]}>Settings</Text>
      <Text style={[styles.lead, { color: palette.muted }]}>
        Configure notifications, open deep admin tools on the web, and review who can access this hub (Shopify documents
        advanced store configuration on desktop — same idea here).
      </Text>

      <Section title="Account" palette={palette} />
      <MetaRow label="Signed in as" value={user?.email ?? '—'} palette={palette} />
      {lock ? <MetaRow label="App lock" value={`Only ${lock}`} palette={palette} /> : null}

      <Section title="Notifications" palette={palette} />
      <Text style={[styles.p, { color: palette.muted }]}>
        New orders trigger a push from your server (Stripe webhook) to every registered Expo token for admin accounts.
        Optional: set ADMIN_PUSH_USER_IDS on the server so only your user UUID receives pushes.
      </Text>
      <Pressable
        style={[styles.primaryBtn, { backgroundColor: shopifyGreen }, testing && { opacity: 0.6 }]}
        disabled={testing}
        onPress={() => void sendTestPush()}
      >
        {testing ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryBtnText}>Send test push</Text>
        )}
      </Pressable>
      {testMsg ? <Text style={[styles.hint, { color: palette.muted }]}>{testMsg}</Text> : null}

      <Section title="Store" palette={palette} />
      <RowButton label="View storefront" description="Opens your live site" palette={palette} onPress={() => void Linking.openURL(SITE_URL)} />
      <RowButton
        label="Web admin (full)"
        description="Products, imports, discounts, deep settings"
        palette={palette}
        onPress={() => void Linking.openURL(`${SITE_URL}/admin`)}
      />
      <RowButton label="Stripe Dashboard" description="Payments, payouts, webhooks" palette={palette} onPress={() => void Linking.openURL('https://dashboard.stripe.com')} />
      <RowButton label="Supabase Dashboard" description="Auth, database, Realtime" palette={palette} onPress={() => void Linking.openURL('https://supabase.com/dashboard')} />

      <Section title="People & activity" palette={palette} />
      <RowButton label="Customers" description="Checkout-created customers" palette={palette} onPress={() => router.push('/customers')} />
      <RowButton label="Activity log" description="Admin audit trail" palette={palette} onPress={() => router.push('/audit')} />

      <Section title="Security" palette={palette} />
      <Text style={[styles.p, { color: palette.muted }]}>
        This app uses your Supabase session and `profiles.is_admin`. The website `/admin` may also use HTTP Basic in
        production. Set EXPO_PUBLIC_ADMIN_LOCK_EMAIL in `apps/admin-mobile/.env` so only your email can open the hub on
        this install.
      </Text>

      <Pressable
        style={[styles.signOut, { borderColor: '#d72c0d' }]}
        onPress={async () => {
          await signOut();
          router.replace('/login');
        }}
      >
        <Text style={{ color: '#d72c0d', fontWeight: '700', textAlign: 'center' }}>Sign out</Text>
      </Pressable>
    </ScrollView>
  );
}

function Section({ title, palette }: { title: string; palette: ColorPalette }) {
  return (
    <Text style={[styles.section, { color: palette.text, borderBottomColor: palette.border }]} accessibilityRole="header">
      {title}
    </Text>
  );
}

function MetaRow({ label, value, palette }: { label: string; value: string; palette: ColorPalette }) {
  return (
    <View style={[styles.metaCard, { backgroundColor: palette.card, borderColor: palette.border }]}>
      <Text style={{ color: palette.muted, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: palette.text, fontWeight: '600', marginTop: 4 }}>{value}</Text>
    </View>
  );
}

function RowButton({
  label,
  description,
  onPress,
  palette,
}: {
  label: string;
  description?: string;
  onPress: () => void;
  palette: ColorPalette;
}) {
  return (
    <Pressable
      style={[styles.row, { backgroundColor: palette.card, borderColor: palette.border }]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={{ color: palette.text, fontSize: 16, fontWeight: '600' }}>{label}</Text>
        {description ? <Text style={{ color: palette.muted, fontSize: 13, marginTop: 4 }}>{description}</Text> : null}
      </View>
      <Text style={{ color: shopifyGreen, fontSize: 22 }}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontWeight: '700' },
  lead: { marginTop: 8, fontSize: 14, lineHeight: 21 },
  section: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    paddingBottom: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  p: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  metaCard: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 10 },
  primaryBtn: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  hint: { marginTop: 10, fontSize: 13 },
  signOut: { marginTop: 28, borderWidth: 1, borderRadius: 10, padding: 14 },
});
