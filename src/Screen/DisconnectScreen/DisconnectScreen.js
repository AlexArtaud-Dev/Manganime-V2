import React, {useEffect} from 'react';
import RNRestart from 'react-native-restart';
import {removeToken} from '../../API/Token';

const DisconnectScreen = ({navigation}) => {
  removeToken().then(r => RNRestart.Restart());

  return <></>;
};
export default DisconnectScreen;
