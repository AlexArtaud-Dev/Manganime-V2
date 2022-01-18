import React from 'react';
import {Path} from "react-native-svg";
import {Icon} from "native-base";


const DisconnectIcon = ( ) => {

    return (
        <Icon viewBox="0 0 24 24" style={{width: "7%", marginRight: "5%"}}>
            <Path d="M14 6v15H3v-2h2V3h9v1h5v15h2v2h-4V6h-3zm-4 5v2h2v-2h-2z" fill="white"/>
        </Icon>
    );

}

export default DisconnectIcon;
