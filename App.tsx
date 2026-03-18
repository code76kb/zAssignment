import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect } from 'react';
import { initDB } from './src/database/Migration';
import client from './src/network';
import { GET_USER, LIST_USERS } from './src/network/Queries';

const TAG = 'APP :';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log(TAG, 'DidMount');
    init();
    return () => {
      console.log(TAG, 'WilUnmount');
    };
  }, []);

  async function init() {
    await initDB();
    // testNetwork();
  }

  async function testNetwork() {
    try {
      const res = await client.request(LIST_USERS,{id:"1"});

      console.log(TAG, 'Network TEST REs :', res);
    } catch (error) {
      console.error(TAG,"Error Network TEST :",error);
    }
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default App;
