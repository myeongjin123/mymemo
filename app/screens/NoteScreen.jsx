import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    Text,
    Keyboard,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import Note from '../components/Note';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';
import { useNotes } from '../context/NoteProvider';
import NoteInputModal from '../components/NoteInputModal';
import SearchBar from '../components/SearchBar';

const reverseData = (data) => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time);
        const bInt = parseInt(b.time);
        if(aInt < bInt) return 1;
        if(aInt === bInt) return 0;
        if(aInt > bInt) return -1;
    });
}


const NoteScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);

    const { notes, setNotes, findNotes } = useNotes();

    const findGreet = () => {
        const hrs = new Date().getHours();
        if(hrs === 0 || hrs < 12) return setGreet("오전");
        if(hrs === 1 || hrs < 17) return setGreet("오후");
        setGreet("밤");
    }
    useEffect(()=> {
        findGreet();
    },[]);
    const reverseNote = reverseData(notes);

    const handleOnSubmit = async (title, desc) => {
        const note = { id: Date.now(), title, desc, time: Date.now()};
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const openNote = (note) => {
        navigation.navigate('NoteDeatil', { note });

    }

    const handleOnSearchInput = async text => {
        setSearchQuery(text);
        if(!text.trim()){
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes();
        }
        const filterNote = notes.filter( note => {
            if( note.title.toLowerCase().includes(text.toLowerCase())){
                return note;
            }
        });
        if(filterNote.length){
            setNotes([...filterNote]);
        }else{
            setResultNotFound(true);
        }
    }

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();

    }

    return (
        <>
           <StatusBar barStyle="dark-content" backgroundColor={colors.LIGHT} />
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.container}>
                  <Text>
                    {user.name}님이 {greet}에 쓰심.  
                  </Text> 
                  {notes.length ? (
                    <SearchBar
                        value={searchQuery}
                        onChangeText={handleOnSearchInput}
                        containerStyle={{marinVertical: 15}}
                        onClear={handleOnClear}
                    />
                  ) : null
                }
                {resultNotFound ? (
                    <NotFound />
                ) : (
                    <FlatList
                        data={reverseNote}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: 15
                        }}
                        keyExtractor={ (item) => item.id.toString()}
                        renderItem={({item}) => (
                            <Note onPress={() => openNote(item)} item={item} />
                        )}
                    />
                )}

               {
                !notes.length ? (
                    <View 
                        style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
                        >
                            <Text style={styles.emptyHeader}>
                                Add Notes
                            </Text>
                        </View>
                ) : null
               }
            </View>
           </TouchableWithoutFeedback>
           <RoundIconBtn
            antIconName='plus'
            style={styles.addBtn}
            onPress = {() => setModalVisible(false)}
            onSubmit = {handleOnSubmit}
            />
            <NoteInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
};
const styles = StyleSheet.create({
    header: {
       fontSize: 15,
       fontWeight: 'bold'
    },
    container: {
       paddingHorizontal: 20,
       flex: 1,
       zIndex: 1
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    addBtn: {
        position: 'absoulute',
        right: 15,
        bottom: 50,
        zIndex: 1
    },
});   
export default NoteScreen;