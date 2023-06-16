import React from 'react';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';
 
const RoundIconBtn = ({ antIconName, size, color, style }) => {
    return <AntDesign 
              name={antIconName} 
              size={ size || 25 } 
              color={color || colors.LIGHT} 
              style={[styles.icon, {...style}]}   
           />
};
const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding:15,
        borderRadius: 50,
        //android
        elevation: 5,
        //ios...
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 4
    }
})
export default RoundIconBtn;