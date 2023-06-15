'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import { getSession } from './supabase-server';


type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: Session | null | undefined
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};