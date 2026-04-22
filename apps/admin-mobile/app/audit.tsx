import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { getSupabase } from '@/lib/supabase';
import Colors, { shopifyGreen } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

type Row = {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  created_at: string | null;
};

export default function AuditScreen() {
  const { ready, session, isAdmin } = useAuth();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const { data } = await supabase
      .from('audit_log')
      .select('id, action, entity_type, entity_id, created_at')
      .order('created_at', { ascending: false })
      .limit(100);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!session || !isAdmin) return <Redirect href="/login" />;

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void load()} tintColor={shopifyGreen} />}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<Text style={{ color: palette.muted, textAlign: 'center', marginTop: 24 }}>No audit entries.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.card }]}>
            <Text style={{ color: palette.text, fontWeight: '700' }}>
              {item.action} · {item.entity_type}
            </Text>
            <Text style={{ color: palette.muted, fontSize: 12, marginTop: 4 }}>
              {item.created_at ? new Date(item.created_at).toLocaleString() : ''}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 10, borderWidth: 1, padding: 12, marginBottom: 8 },
});
