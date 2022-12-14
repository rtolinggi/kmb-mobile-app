import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './src/routes/main';
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';
import {AuthStack} from './src/routes/auth';
import type {Session} from '@supabase/supabase-js';
import supabase from './src/services/supabaseClient';

export const queryClient = new QueryClient();

const App: React.FC = () => {
  const [sessions, setSessions] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSessions(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSessions(session);
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {sessions && sessions.user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
