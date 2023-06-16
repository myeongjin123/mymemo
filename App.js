import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './app/screens/Intro';
import NoteScreen from './app/screens/NoteScreen';
import NoteProvider from './app/context/NoteProvider';
import NoteDetail from './app/components/NoteDetail';

const Stack = createStackNavigator();

export default function App() {
  const [ user, setUser ] = useState({});
  const [isAppFirstOpen, setIsAppFirstOpen] = useState(false);
 
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result === null) return setIsAppFirstOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstOpen(false);
  };

  useEffect(()=>{
    findUser();
  }, []);
 
  const RenderNoteScreen = props => <NoteScreen {...props} user={user} />;
  if(isAppFirstOpen) return <Intro onFinish={findUser} />
  
  return (
      <NavigationContainer> 
         <NoteProvider>
            <Stack.Navigator 
                    screenOptions={{ headerTitle: '', headerTransparent : true }}
            >
                <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
                <Stack.Screen component={NoteDetail} name='NoteDetail' />
            </Stack.Navigator>  
         </NoteProvider>
          
      </NavigationContainer> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
