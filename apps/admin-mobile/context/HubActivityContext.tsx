import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { useAuth } from '@/context/AuthContext';
import { useOrdersRealtime } from '@/hooks/useOrdersRealtime';

export type HubActivityItem = { id: string; at: string; label: string };

type Ctx = { items: HubActivityItem[] };

const HubActivityContext = createContext<Ctx>({ items: [] });

export function HubActivityProvider({ children }: { children: React.ReactNode }) {
  const { ready, session, isAdmin } = useAuth();
  const [items, setItems] = useState<HubActivityItem[]>([]);

  useEffect(() => {
    if (!ready || !session || !isAdmin) return;
    void Notifications.requestPermissionsAsync();
  }, [ready, session, isAdmin]);

  useOrdersRealtime({
    enabled: Boolean(ready && session && isAdmin),
    onInsert: (row) => {
      const id = String(row.id ?? '');
      const num = row.order_number != null ? `#${row.order_number}` : id.slice(0, 8);
      const at = new Date().toISOString();
      setItems((prev) => [{ id, at, label: `New order ${num}` }, ...prev].slice(0, 20));
    },
  });

  const value = useMemo(() => ({ items }), [items]);
  return <HubActivityContext.Provider value={value}>{children}</HubActivityContext.Provider>;
}

export function useHubActivity() {
  return useContext(HubActivityContext);
}
