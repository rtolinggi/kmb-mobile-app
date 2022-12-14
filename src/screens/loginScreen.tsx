import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CheckBox from '@react-native-community/checkbox';
import Button from '../components/button';
import FormInput from '../components/formInput';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {RootStackParamList} from '../routes/auth';
import {COLORS} from '../config/constant';
import Logo from '../assets/logo.svg';
import {useMutation} from '@tanstack/react-query/build/lib/useMutation';
import supabase from '../services/supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
const LoginSchema = z.object({
  email: z
    .string({required_error: 'email harus di isi'})
    .min(1, {message: 'email harus di isi'})
    .email({message: 'email tidak valid'}),
  passwordHash: z
    .string({required_error: 'password harus di isi'})
    .min(1, {message: 'password harus di isi'}),
});
type ActionInputUser = z.infer<typeof LoginSchema>;

export default function LoginScreen({navigation}: Props) {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ActionInputUser>({
    defaultValues: {
      email: '',
      passwordHash: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  function createTwoButtonAlert(msg: string) {
    return Alert.alert('Credential Tidak Cocok', msg, [
      {text: 'OK', style: 'cancel'},
    ]);
  }

  const mutation = useMutation({
    mutationFn: async (data: ActionInputUser) => {
      return await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.passwordHash,
      });
    },
    onSuccess: async data => {
      if (data.data.user) {
        return;
      }
      createTwoButtonAlert(data.error?.message as string);
    },
    onError: () => createTwoButtonAlert('Terjadi gangguan di server'),
  });

  const HandleLogin = (data: ActionInputUser) => {
    mutation.mutate(data);
  };

  return (
    <SafeAreaView className="bg-primary-default h-screen flex-1 relative">
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <View className="absolute z-10 w-60 h-60 bg-primary-light/20 -top-16 left-44 rounded-full" />
      <View className="absolute w-12 h-12 bg-primary-light/20 top-56 left-7 rounded-full" />
      <View className="absolute w-5 h-5 bg-primary-light/20 top-52 -left-1 rounded-full" />
      <Text className="absolute z-10 left-[26] top-[145] text-5xl font-heading text-white">
        Masuk
      </Text>
      <View className="mt-[259] flex-1 bg-white rounded-t-3xl px-7 py-10 justify-between">
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FormInput
                placeholder="Masukan Email"
                value={value}
                onChangeText={onChange}
                label="Email"
                wrapperStyle="mb-6"
                isError={
                  errors.email && (
                    <Text className="font-sans font-sm text-red-500">
                      {errors.email?.message}
                    </Text>
                  )
                }
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <FormInput
                placeholder="Masukan Password"
                value={value}
                secureTextEntry={!togglePassword}
                onChangeText={onChange}
                label="Password"
                isError={
                  errors.passwordHash && (
                    <Text className="font-sans font-sm text-red-500">
                      {errors.passwordHash?.message}
                    </Text>
                  )
                }
                rightIcon={
                  <Icon
                    name={togglePassword ? 'eye' : 'eye-slash'}
                    size={18}
                    onPress={() => setTogglePassword(e => !e)}
                  />
                }
              />
            )}
            name="passwordHash"
          />
          <View className="flex-row justify-between items-center mt-2 font-sans">
            <View className="flex-row items-center">
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
                tintColors={{true: COLORS.PRIMARY}}
              />
              <Text className="font-sans">Tetap Login</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Sign Out')}>
              <Text className="font-sans text-primary-default underline underline-offset-2">
                Lupa Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-6 shadow-md">
            <Button
              isLoading={mutation.isLoading}
              onPress={handleSubmit(HandleLogin)}>
              {mutation.isLoading ? 'Loading...' : 'Masuk'}
            </Button>
          </View>
          <View className="flex-row justify-center items-center mt-2">
            <View>
              <Text className="font-sans mr-1">Belum punya akun?</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <Text className="font-sans text-primary-default underline underline-offset-2">
                Daftar Sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row w-full justify-center items-center">
          <Logo width={55} height={55} />
          <View>
            <Text className="font-sans font-bold -tracking-tighter text-primary-default text-2xl">
              KMB
            </Text>
            <Text className="font-semibold -tracking-tighter text-xs text-primary-light">
              Mobile Collection System
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
