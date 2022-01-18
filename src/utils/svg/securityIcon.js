import React from 'react';
import {Path} from 'react-native-svg';
import {Icon} from 'native-base';

const SecurityIcon = () => {
  return (
    <Icon viewBox="0 0 1024 1024" style={{width: '7%', marginRight: '5%'}}>
      <Path
        d="M512 64L128 192v384c0 212.1 171.9 384 384 384s384-171.9 384-384V192L512 64zm312 512c0 172.3-139.7 312-312 312S200 748.3 200 576V246l312-110 312 110v330z"
        fill="white"
      />
      <Path
        d="M378.4 475.1a35.91 35.91 0 00-50.9 0 35.91 35.91 0 000 50.9l129.4 129.4 2.1 2.1a33.98 33.98 0 0048.1 0L730.6 434a33.98 33.98 0 000-48.1l-2.8-2.8a33.98 33.98 0 00-48.1 0L483 579.7 378.4 475.1z"
        fill="white"
      />
    </Icon>
  );
};

export default SecurityIcon;
