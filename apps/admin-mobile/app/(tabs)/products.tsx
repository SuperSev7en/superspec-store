import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getSupabase } from '@/lib/supabase';
import Colors, { shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type ProductRow = {
  id: string;
  handle: string;
  title: string;
  status: string;
  published: boolean;
  updated_at: string | null;
};

export default function ProductsScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const { data } = await supabase
      .from('products')
      .select('id, handle, title, status, published, updated_at')
      .order('updated_at', { ascending: false })
      .limit(300);
    setRows((data ?? []) as ProductRow[]);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => r.title.toLowerCase().includes(s) || r.handle.toLowerCase().includes(s));
  }, [rows, q]);

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ paddingHorizontal: 12, paddingTop: 8 }}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search products"
          placeholderTextColor={palette.muted}
          style={[styles.search, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void load()} tintColor={shopifyGreen} />}
        contentContainerStyle={{ padding: 12, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={{ color: palette.muted, textAlign: 'center', marginTop: 24 }}>No products match.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Text style={[styles.title, { color: palette.text }]}>{item.title}</Text>
            <Text style={{ color: palette.muted, marginTop: 4 }}>/{item.handle}</Text>
            <View style={styles.meta}>
              <Text style={{ color: palette.muted, fontSize: 12 }}>{item.status}</Text>
              <Text style={{ color: item.published ? shopifyGreen : palette.muted, fontSize: 12, fontWeight: '600' }}>
                {item.published ? 'Published' : 'Hidden'}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  card: { borderRadius: 10, borderWidth: 1, padding: 14, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: '700' },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});
