import { useCallback, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getSupabase } from '@/lib/supabase';
import Colors, { shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type OrderRow = {
  id: string;
  order_number: string | null;
  status: string;
  total: number | string | null;
  currency: string | null;
  created_at: string | null;
};

function statusColor(status: string) {
  if (status === 'fulfilled') return '#2c6ecb';
  if (status === 'unfulfilled' || status === 'paid') return '#008060';
  return '#6d7175';
}

export default function OrdersScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const { data } = await supabase
      .from('orders')
      .select('id, order_number, status, total, currency, created_at')
      .order('created_at', { ascending: false })
      .limit(150);
    setRows((data ?? []) as OrderRow[]);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void load()} tintColor={shopifyGreen} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={{ color: palette.muted, textAlign: 'center', marginTop: 24 }}>
            No orders yet. Complete a Stripe checkout with webhooks configured.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}
            onPress={() => router.push(`/order/${item.id}`)}
          >
            <View style={styles.row}>
              <Text style={[styles.title, { color: palette.text }]}>
                {item.order_number ? `#${item.order_number}` : `#${item.id.slice(0, 8)}`}
              </Text>
              <Text style={[styles.badge, { color: statusColor(item.status), borderColor: statusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
            <Text style={{ color: palette.muted, marginTop: 6 }}>
              {item.currency ?? 'USD'} {Number(item.total ?? 0).toFixed(2)}
            </Text>
            <Text style={{ color: palette.muted, fontSize: 12, marginTop: 4 }}>
              {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '700' },
  badge: { fontSize: 12, fontWeight: '600', borderWidth: 1, borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
});
