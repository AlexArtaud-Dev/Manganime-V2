import React from 'react';
import {Path} from "react-native-svg";
import {Icon} from "native-base";


const RightArrowIcon = ( ) => {

    return (
        <Icon  viewBox="0 0 896 896" style={{width: "7%", marginLeft: "10%", transform: [{ rotateY: '180deg' }]}}>
            <Path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" fill="white"/>
        </Icon>
    );

}

export default RightArrowIcon;
