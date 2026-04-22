import { useCallback, useState } from 'react';
import {
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSupabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/config';
import Colors, { shopifyGreen, type ColorPalette } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useHubActivity } from '@/context/HubActivityContext';

type HomeStats = {
  orders7: number;
  revenue7: number;
  orders30: number;
  revenue30: number;
  products: number;
};

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const { items } = useHubActivity();
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const now = new Date();
    const d7 = new Date(now);
    d7.setDate(d7.getDate() - 7);
    const d30 = new Date(now);
    d30.setDate(d30.getDate() - 30);

    const [{ count: c7 }, { count: c30 }, rows7, rows30, { count: pc }] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', d7.toISOString()),
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', d30.toISOString()),
      supabase.from('orders').select('total').gte('created_at', d7.toISOString()).limit(5000),
      supabase.from('orders').select('total').gte('created_at', d30.toISOString()).limit(5000),
      supabase.from('products').select('id', { count: 'exact', head: true }),
    ]);

    const sum = (rows: { total: unknown }[] | null) =>
      (rows ?? []).reduce((s, r) => s + Number.parseFloat(String(r.total ?? 0)), 0);

    setStats({
      orders7: c7 ?? 0,
      revenue7: sum(rows7.data),
      orders30: c30 ?? 0,
      revenue30: sum(rows30.data),
      products: pc ?? 0,
    });
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: palette.background }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void load()} tintColor={shopifyGreen} />}
    >
      <View style={styles.pad}>
        <Text style={[styles.h1, { color: palette.text }]}>Home</Text>
        <Text style={[styles.sub, { color: palette.muted }]}>
          Snapshot of your store — similar idea to Shopify Home (KPIs + what just happened).
        </Text>

        <Pressable
          style={[styles.storeBtn, { borderColor: palette.border, backgroundColor: palette.card }]}
          onPress={() => void Linking.openURL(SITE_URL)}
        >
          <Text style={[styles.storeBtnText, { color: shopifyGreen }]}>View storefront</Text>
        </Pressable>

        <View style={styles.grid}>
          <StatCard label="Orders (7d)" value={String(stats?.orders7 ?? '—')} palette={palette} />
          <StatCard label="Sales (7d)" value={stats ? `$${stats.revenue7.toFixed(0)}` : '—'} palette={palette} />
          <StatCard label="Orders (30d)" value={String(stats?.orders30 ?? '—')} palette={palette} />
          <StatCard label="Sales (30d)" value={stats ? `$${stats.revenue30.toFixed(0)}` : '—'} palette={palette} />
          <StatCard label="Products" value={String(stats?.products ?? '—')} palette={palette} wide />
        </View>

        <Text style={[styles.section, { color: palette.text }]}>Live activity</Text>
        <Text style={[styles.hint, { color: palette.muted }]}>
          Instant updates use Supabase Realtime on the `orders` table (enable replication in Supabase → Database →
          Publications for `orders` if you do not see alerts).
        </Text>
        {items.length === 0 ? (
          <Text style={{ color: palette.muted, marginTop: 8 }}>No live events yet this session.</Text>
        ) : (
          items.map((it) => (
            <View key={`${it.id}-${it.at}`} style={[styles.row, { borderColor: palette.border, backgroundColor: palette.card }]}>
              <Text style={{ color: palette.text, fontWeight: '600' }}>{it.label}</Text>
              <Text style={{ color: palette.muted, fontSize: 12, marginTop: 4 }}>{new Date(it.at).toLocaleString()}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function StatCard({ label, value, palette, wide }: { label: string; value: string; palette: ColorPalette; wide?: boolean }) {
  return (
    <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.card }, wide && styles.cardWide]}>
      <Text style={{ color: palette.muted, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: palette.text, fontSize: 22, fontWeight: '700', marginTop: 4 }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { padding: 16, paddingBottom: 40 },
  h1: { fontSize: 28, fontWeight: '700' },
  sub: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  storeBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  storeBtnText: { fontSize: 16, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 },
  card: { width: '47%', borderRadius: 10, borderWidth: 1, padding: 14 },
  cardWide: { width: '100%' },
  section: { marginTop: 28, fontSize: 18, fontWeight: '700' },
  hint: { marginTop: 6, fontSize: 13, lineHeight: 18 },
  row: { marginTop: 10, borderRadius: 10, borderWidth: 1, padding: 12 },
});
