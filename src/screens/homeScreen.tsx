import React, {useState} from 'react';
import {View, Text, Alert, StatusBar} from 'react-native';
import Button from '../components/button';
import {COLORS} from '../config/constant';
import supabase from '../services/supabaseClient';

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  function createTwoButtonAlert(msg: string) {
    return Alert.alert('Gagal Keluar', msg, [{text: 'OK', style: 'cancel'}]);
  }
  const handleLogout = async () => {
    setLoading(true);
    const {error} = await supabase.auth.signOut();
    if (error) {
      createTwoButtonAlert(error.message as string);
    }
    setLoading(false);
  };
  return (
    <View className="flex-1 justify-center items-center px-6">
      <StatusBar
        backgroundColor={COLORS.PRIMARY}
        barStyle="light-content"
        // translucent={true}
      />
      <Text className="text-primary-light mb-4">Home Screen</Text>
      <Button isLoading={loading} onPress={handleLogout}>
        Logout
      </Button>
    </View>
  );
}
