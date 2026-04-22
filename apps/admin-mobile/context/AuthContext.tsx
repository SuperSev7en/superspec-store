import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { isSupabaseEnvConfigured } from '@/lib/config';
import { getSupabase } from '@/lib/supabase';

type AuthState = {
  ready: boolean;
  envConfigured: boolean;
  session: Session | null;
  user: User | null;
  accessToken: string | null;
  isAdmin: boolean;
  profileError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const loadAdminFlag = useCallback(async (uid: string) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('profiles').select('is_admin').eq('id', uid).maybeSingle();
    if (error) {
      setProfileError(error.message);
      setIsAdmin(false);
      return;
    }
    setProfileError(null);
    const row = data as { is_admin?: boolean } | null;
    if (!row?.is_admin) {
      setIsAdmin(false);
      return;
    }

    const lock = (Constants.expoConfig?.extra as { adminLockEmail?: string } | undefined)?.adminLockEmail
      ?.trim()
      .toLowerCase();
    if (lock) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email?.trim().toLowerCase() ?? '';
      if (email !== lock) {
        await supabase.auth.signOut();
        setIsAdmin(false);
        setProfileError('This hub is locked to a different admin email (EXPO_PUBLIC_ADMIN_LOCK_EMAIL).');
        return;
      }
    }

    setIsAdmin(true);
  }, []);

  useEffect(() => {
    if (!isSupabaseEnvConfigured()) {
      setReady(true);
      setSession(null);
      setIsAdmin(false);
      return;
    }

    const supabase = getSupabase();
    let cancelled = false;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (cancelled) return;
        setSession(data.session ?? null);
        if (data.session?.user?.id) {
          void loadAdminFlag(data.session.user.id);
        } else {
          setIsAdmin(false);
        }
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next?.user?.id) void loadAdminFlag(next.user.id);
      else {
        setIsAdmin(false);
        setProfileError(null);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [loadAdminFlag]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseEnvConfigured()) return { error: 'App is missing Supabase environment variables.' };
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseEnvConfigured()) return;
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setIsAdmin(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    const uid = session?.user?.id;
    if (uid) await loadAdminFlag(uid);
  }, [session?.user?.id, loadAdminFlag]);

  const value = useMemo(
    () => ({
      ready,
      envConfigured: isSupabaseEnvConfigured(),
      session,
      user: session?.user ?? null,
      accessToken: session?.access_token ?? null,
      isAdmin,
      profileError,
      signIn,
      signOut,
      refreshProfile,
    }),
    [ready, session, isAdmin, profileError, signIn, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
