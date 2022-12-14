import React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {COLORS} from '../config/constant';

export default function SearchScreen() {
  return (
    <View>
      <StatusBar
        backgroundColor={COLORS.PRIMARY}
        barStyle="light-content"
        // translucent={true}
      />
      <Text>Search Screen</Text>
    </View>
  );
}
