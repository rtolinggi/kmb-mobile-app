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
import Button from '../components/button';
import FormInput from '../components/formInput';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {RootStackParamList} from '../routes/auth';
import Logo from '../assets/logo.svg';
import supabase from '../services/supabaseClient';
import {useMutation} from '@tanstack/react-query';

export type Props = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;

const RegisterSchema = z
  .object({
    email: z
      .string({required_error: 'email harus di isi'})
      .email({message: 'email tidak valid'}),
    passwordHash: z
      .string({required_error: 'password harus di isi'})
      .min(6, {message: 'password minimal 6 character'}),
    confirmPassword: z.string(),
  })
  .refine(data => data.passwordHash === data.confirmPassword, {
    message: 'password tidak cocok',
    path: ['confirmPassword'],
  });

type ActionInputUser = z.infer<typeof RegisterSchema>;

export default function RegisterScreen({navigation}: Props) {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ActionInputUser>({
    defaultValues: {
      email: '',
      passwordHash: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const createTwoButtonAlert = (msg: string) =>
    Alert.alert('Registrasi Gagal', msg, [{text: 'OK', style: 'cancel'}]);

  const mutation = useMutation({
    mutationFn: async (data: ActionInputUser) =>
      await supabase.auth.signUp({
        email: data.email,
        password: data.passwordHash,
      }),
    onSuccess: async data => {
      if (data.data.user) {
        return navigation.replace('LoginScreen');
      }
      createTwoButtonAlert(data.error?.message as string);
    },
    onError: () => createTwoButtonAlert('Terjadi gangguan di server'),
  });

  const HandleRegister = async (data: ActionInputUser) => {
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
        Daftar
      </Text>
      <View className="mt-[259] flex-1 bg-white rounded-t-3xl px-7 py-10 justify-between">
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
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
                      {errors.email.message}
                    </Text>
                  )
                }
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <FormInput
                placeholder="Masukan Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!togglePassword}
                label="Password"
                wrapperStyle="mb-6"
                rightIcon={
                  <Icon
                    name={togglePassword ? 'eye' : 'eye-slash'}
                    size={18}
                    onPress={() => setTogglePassword(e => !e)}
                  />
                }
                isError={
                  errors.passwordHash && (
                    <Text className="font-sans font-sm text-red-500">
                      {errors.passwordHash.message}
                    </Text>
                  )
                }
              />
            )}
            name="passwordHash"
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <FormInput
                placeholder="Ulangi Password"
                value={value}
                onChangeText={onChange}
                label="Ulangi Password"
                secureTextEntry={!togglePassword}
                wrapperStyle="mb-6"
                rightIcon={
                  <Icon
                    name={togglePassword ? 'eye' : 'eye-slash'}
                    size={18}
                    onPress={() => setTogglePassword(e => !e)}
                  />
                }
                isError={
                  errors.confirmPassword && (
                    <Text className="font-sans font-sm text-red-500">
                      {errors.confirmPassword.message}
                    </Text>
                  )
                }
              />
            )}
            name="confirmPassword"
          />
          <View className="shadow-md">
            <Button
              isLoading={mutation.isLoading}
              onPress={handleSubmit(HandleRegister)}>
              {mutation.isLoading ? 'loading...' : 'Daftar'}
            </Button>
          </View>
          <View className="flex-row justify-center items-center mt-2">
            <View>
              <Text className="font-sans mr-1">Sudah punya akun?</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text className="font-sans text-primary-default underline underline-offset-2">
                Masuk Sekarang
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
