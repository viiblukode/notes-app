import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './app/navigations/AppNavigation';
import Toast from 'react-native-toast-message';
import { ModalProvider } from './components/ModalHandler';

export default function App() {
  return (
    <ModalProvider>
        <NavigationContainer>
          <AppNavigation />
          <Toast />
      </NavigationContainer>
    </ModalProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
