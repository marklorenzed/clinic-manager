"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { useMemo } from "react";
import { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | undefined;
};

const AuthContext = createContext<AuthContextType>({ user: undefined });

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [supabase] = useState(() => createPagesBrowserClient());

  const onAuthStateChange = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const session = await supabase.auth.getSession();
      if (user && session) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChange();
  }, []);

  const value = useMemo(() => {
    return {
      user,
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const { user } = useContext(AuthContext);
  return { user };
};
