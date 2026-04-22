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

type Order = {
  id: string;
  order_number: string | null;
  status: string;
  total: number | string | null;
  currency: string | null;
  created_at: string | null;
};

type Item = {
  id: string;
  quantity: number | null;
  price: number | string | null;
  product_id: string | null;
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { ready, session, isAdmin } = useAuth();
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [carrier, setCarrier] = useState('');
  const [tracking, setTracking] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    const supabase = getSupabase();
    const [{ data: o }, { data: lines }] = await Promise.all([
      supabase.from('orders').select('id, order_number, status, total, currency, created_at').eq('id', id).maybeSingle(),
      supabase.from('order_items').select('id, quantity, price, product_id').eq('order_id', id),
    ]);
    setOrder((o ?? null) as Order | null);
    setItems((lines ?? []) as Item[]);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const fulfill = useCallback(async () => {
    if (!id) return;
    setBusy(true);
    const supabase = getSupabase();
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;

    const { error: fErr } = await supabase.from('fulfillments').insert({
      order_id: id,
      status: 'in_transit',
      carrier: carrier.trim() || null,
      tracking_number: tracking.trim() || null,
      shipped_at: new Date().toISOString(),
    });
    if (fErr) {
      Alert.alert('Fulfillment failed', fErr.message);
      setBusy(false);
      return;
    }

    const { error: oErr } = await supabase.from('orders').update({ status: 'fulfilled' }).eq('id', id);
    if (oErr) {
      Alert.alert('Order update failed', oErr.message);
      setBusy(false);
      return;
    }

    if (uid) {
      await supabase.from('audit_log').insert({
        actor_user_id: uid,
        entity_type: 'order',
        entity_id: id,
        action: 'fulfill',
        before: null,
        after: { carrier: carrier.trim() || null, tracking_number: tracking.trim() || null },
      });
    }

    Alert.alert('Marked fulfilled', undefined, [{ text: 'OK', onPress: () => router.back() }]);
    setBusy(false);
  }, [id, carrier, tracking, router]);

  if (!ready) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={shopifyGreen} />
      </View>
    );
  }
  if (!session || !isAdmin) return <Redirect href="/login" />;

  if (!order && !id) {
    return (
      <View style={styles.center}>
        <Text style={{ color: palette.muted }}>Missing order id.</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={shopifyGreen} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: palette.background }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={[styles.title, { color: palette.text }]}>
        {order.order_number ? `Order #${order.order_number}` : `Order #${order.id.slice(0, 8)}`}
      </Text>
      <Text style={{ color: palette.muted, marginTop: 6 }}>
        {order.status} · {order.currency ?? 'USD'} {Number(order.total ?? 0).toFixed(2)}
      </Text>
      <Text style={{ color: palette.muted, fontSize: 12, marginTop: 4 }}>
        {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
      </Text>

      <Text style={[styles.h2, { color: palette.text }]}>Items</Text>
      {items.length === 0 ? (
        <Text style={{ color: palette.muted }}>No line items recorded.</Text>
      ) : (
        items.map((it) => (
          <View key={it.id} style={[styles.line, { borderColor: palette.border }]}>
            <Text style={{ color: palette.text }}>
              qty {it.quantity ?? 0} · ${Number(it.price ?? 0).toFixed(2)}
            </Text>
            <Text style={{ color: palette.muted, fontSize: 12 }}>product {String(it.product_id ?? '').slice(0, 8)}</Text>
          </View>
        ))
      )}

      {order.status !== 'fulfilled' ? (
        <>
          <Text style={[styles.h2, { color: palette.text }]}>Fulfillment</Text>
          <Text style={{ color: palette.muted, marginBottom: 8 }}>Carrier and tracking (optional).</Text>
          <TextInput
            placeholder="Carrier"
            placeholderTextColor={palette.muted}
            value={carrier}
            onChangeText={setCarrier}
            style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          />
          <TextInput
            placeholder="Tracking number"
            placeholderTextColor={palette.muted}
            value={tracking}
            onChangeText={setTracking}
            style={[styles.input, { borderColor: palette.border, color: palette.text, backgroundColor: palette.card }]}
          />
          <Pressable
            style={[styles.btn, busy && { opacity: 0.6 }]}
            disabled={busy}
            onPress={() => void fulfill()}
          >
            <Text style={styles.btnText}>{busy ? 'Saving…' : 'Mark fulfilled'}</Text>
          </Pressable>
        </>
      ) : (
        <Text style={{ color: shopifyGreen, marginTop: 16, fontWeight: '600' }}>This order is already fulfilled.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700' },
  h2: { marginTop: 22, marginBottom: 8, fontSize: 16, fontWeight: '700' },
  line: { borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 16 },
  btn: { backgroundColor: shopifyGreen, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
