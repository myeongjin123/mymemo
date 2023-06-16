import React from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';
const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
        <div>
            <View style={[styles.container, {...containerStyle}]}>
                <TextInput 
                    value={value}
                    onChangeText={onChangeText}
                    placeholder='Search here...'
                    style={styles.searchBar}
                />
                {value?(
                    <AntDesign
                        name='close'
                        size={20}
                        color={colors.PRIMARY}
                        onPress={onClear}
                        style={styles.clearIcon}
                    />
                ):null}
            </View>
        </div>
    );
};
const styles = StyleSheet.create({
    searchBar : {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        hegiht: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 14
    },
    container: {
        justifyContent: 'center',
    },
    clearIcon: {
        position: 'absolute',
        right: 10
    }
})

export default SearchBar;