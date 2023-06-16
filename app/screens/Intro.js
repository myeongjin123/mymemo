import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    StatusBar, 
    Dimensions
} 
    from 'react-native';
import colors from "../misc/colors";
import RoundIconBtn from '../components/RoundIconBtn';


const Intro = ({ onFinish }) => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);

    const handleSubmit = async () => {
        const user = {name : user};
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinish) onFinish();
    };
    console.log(name);
    return (
        <>
        <StatusBar hidden />
        <View style={styles.container}>
            <Text style={styles.inputTitle}>이름을 입력하세요.</Text>
            <TextInput
            style={styles.textInput} 
            placeholder='Enter Your Name'
            value={name}
            onChangeText={handleOnChangeText} 
            />
            {
            name.trim().length > 1 ? (
            <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} />
             ) : null
            }
        </View>
        </>
    );
};
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center'
    },
    inputTitle: {
       alignSelf: 'flex-start',
       paddingLeft: 25,
       marginBottom: 10,
       opacity: 0.5,
       fontSize: 16
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.DARK,
        fontSize: 25,
        marginBottom: 15,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
    }

});

export default Intro;