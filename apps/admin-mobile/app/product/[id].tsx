import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { getSupabase } from '@/lib/supabase';
import Colors, { shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type Product = {
  id: string;
  handle: string;
  title: string;
  description_html: string;
  status: 'draft' | 'active' | 'archived' | string;
  published: boolean;
};

export default function ProductEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ready, session, isAdmin } = useAuth();
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [row, setRow] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    const supabase = getSupabase();
    const { data } = await supabase
      .from('products')
      .select('id, handle, title, description_html, status, published')
      .eq('id', id)
      .maybeSingle();
    const p = data as Product | null;
    setRow(p);
    setTitle(p?.title ?? '');
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const save = useCallback(
    async (next: Partial<{ title: string; published: boolean; status: string }>) => {
      if (!id) return;
      setBusy(true);
      const supabase = getSupabase();
      const { error } = await supabase
        .from('products')
        .update({
          ...next,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
      setBusy(false);
      if (error) {
        Alert.alert('Save failed', error.message);
        return;
      }
      Alert.alert('Saved', 'Storefront picks up changes immediately.', [{ text: 'OK', onPress: () => router.back() }]);
    },
    [id, router],
  );

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background }}>
        <ActivityIndicator size="large" color={shopifyGreen} />
      </View>
    );
  }
  if (!session || !isAdmin) return <Redirect href="/login" />;

  if (!id) return null;

  if (!row) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background }}>
        <ActivityIndicator size="large" color={shopifyGreen} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={[styles.muted, { color: palette.muted }]}>/{row.handle}</Text>
      <Text style={[styles.label, { color: palette.text }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
      />

      <Text style={[styles.label, { color: palette.text }]}>Status</Text>
      <View style={styles.row}>
        {(['draft', 'active', 'archived'] as const).map((s) => (
          <Pressable
            key={s}
            style={[
              styles.chip,
              { borderColor: palette.border, backgroundColor: row.status === s ? shopifyGreen : palette.card },
            ]}
            onPress={() => setRow({ ...row, status: s })}
          >
            <Text style={{ color: row.status === s ? '#fff' : palette.text, fontWeight: '600', textTransform: 'capitalize' }}>
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.label, { color: palette.text }]}>Storefront visibility</Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.chip, { borderColor: palette.border, backgroundColor: row.published ? shopifyGreen : palette.card }]}
          onPress={() => setRow({ ...row, published: true })}
        >
          <Text style={{ color: row.published ? '#fff' : palette.text, fontWeight: '600' }}>Published</Text>
        </Pressable>
        <Pressable
          style={[styles.chip, { borderColor: palette.border, backgroundColor: !row.published ? shopifyGreen : palette.card }]}
          onPress={() => setRow({ ...row, published: false })}
        >
          <Text style={{ color: !row.published ? '#fff' : palette.text, fontWeight: '600' }}>Hidden</Text>
        </Pressable>
      </View>

      <Pressable
        style={[styles.save, busy && { opacity: 0.6 }]}
        disabled={busy}
        onPress={() => void save({ title: title.trim(), published: row.published, status: row.status })}
      >
        <Text style={styles.saveText}>{busy ? 'Saving…' : 'Save'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  muted: { fontSize: 14, marginBottom: 12 },
  label: { fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
  save: {
    marginTop: 24,
    backgroundColor: shopifyGreen,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
