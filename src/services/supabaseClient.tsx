import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SUPABASE_ANON, SUPABASE_URL} from '../config/constant';

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, options);

export default supabase;
