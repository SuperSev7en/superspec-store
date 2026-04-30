"use client";

import { useEffect, useMemo, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabaseBrowser";

type PresenceState = Record<
  string,
  Array<{ name?: string; online_at?: string }>
>;

export function PresenceBadge({
  roomKey,
  displayName,
}: {
  roomKey: string;
  displayName: string;
}) {
  const [count, setCount] = useState<number>(1);

  const key = useMemo(
    () => `${roomKey}:${displayName}`,
    [roomKey, displayName],
  );

  useEffect(() => {
    const supabase = getBrowserSupabase();
    const channel = supabase.channel(`presence:${roomKey}`, {
      config: { presence: { key } },
    });

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState() as PresenceState;
      setCount(Object.keys(state).length || 1);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          name: displayName,
          online_at: new Date().toISOString(),
        });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [roomKey, key, displayName]);

  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
      {count} online
    </span>
  );
}
