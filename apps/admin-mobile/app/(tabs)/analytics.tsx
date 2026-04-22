import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSupabase } from '@/lib/supabase';
import Colors, { shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type Block = { title: string; lines: string[] };

export default function AnalyticsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const now = new Date();
    const ranges = [1, 7, 30].map((d) => {
      const dt = new Date(now);
      dt.setDate(dt.getDate() - d);
      return { label: `Last ${d} day${d === 1 ? '' : 's'}`, iso: dt.toISOString() };
    });

    const next: Block[] = [];
    for (const r of ranges) {
      const { data } = await supabase.from('orders').select('total, status').gte('created_at', r.iso).limit(5000);
      const rows = (data ?? []) as { total: unknown; status: string | null }[];
      const revenue = rows.reduce((s, x) => s + Number.parseFloat(String(x.total ?? 0)), 0);
      const count = rows.length;
      const fulfilled = rows.filter((x) => x.status === 'fulfilled').length;
      next.push({
        title: r.label,
        lines: [`Orders: ${count}`, `Gross sales: $${revenue.toFixed(2)}`, `Fulfilled rows: ${fulfilled}`],
      });
    }

    setBlocks(next);
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
      <View style={{ padding: 16 }}>
        <Text style={[styles.h1, { color: palette.text }]}>Analytics</Text>
        <Text style={[styles.sub, { color: palette.muted }]}>
          Shopify’s mobile app highlights store performance; here we compute simple sales blocks from your Supabase
          `orders` table (same source as the web admin). For web marketing analytics, keep using Vercel Analytics on
          the storefront.
        </Text>
        {blocks.map((b) => (
          <View key={b.title} style={[styles.card, { borderColor: palette.border, backgroundColor: palette.card }]}>
            <Text style={[styles.cardTitle, { color: palette.text }]}>{b.title}</Text>
            {b.lines.map((line) => (
              <Text key={line} style={{ color: palette.muted, marginTop: 6 }}>
                {line}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 24, fontWeight: '700' },
  sub: { marginTop: 8, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  card: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
});
