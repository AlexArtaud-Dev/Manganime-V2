import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet} from 'react-native';
import {LoadingAnimation} from 'react-native-loading-animation-image';
import {checkToken} from '../../API/Auth';

import ThemeClass from '../../utils/ThemeClass';
import { removeToken } from "../../API/Token";
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

const logo = require('../../assets/manganime.png');

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = React.useState(true);
  // removeToken();
  useEffect(async () => {
    const data = await checkToken();
    setTimeout(() => {
      setLoading(false);
      if (data) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  }, []);

  return (
    <View style={theme.splashScreen.container}>
      <LoadingAnimation source={logo} visible={loading}/>
    </View>
  );
};
export default SplashScreen;
