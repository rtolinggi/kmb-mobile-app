import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {COLORS} from '../config/constant';

export default function ProfileScreen() {
  return (
    <View>
      <StatusBar
        backgroundColor={COLORS.PRIMARY}
        barStyle="light-content"
        // translucent={true}
      />
      <Text>Profil Screen</Text>
    </View>
  );
}
