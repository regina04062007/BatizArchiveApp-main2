import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Principal from './Principal';
import Login from './Login';
import Register from './Register'; 
import RecuperarContra from './RecuperarContra';
import CambiarContra from './CambiarContra';
import Perfil from './Perfil';
import verProyecto from './verProyecto';
import Inicio from './Inicio';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{title: '', headerStyle: {backgroundColor: '#f7f1fb', },headerTintColor: '#7E21A3', }} />
        <Stack.Screen name="Register" component={Register} options={{title: '', headerStyle: {backgroundColor: '#f7f1fb', },headerTintColor: '#7E21A3', }} />
        <Stack.Screen name="RecuperarContra" component={RecuperarContra} options={{title: '', headerStyle: {backgroundColor: '#f7f1fb', },headerTintColor: '#7E21A3', }} />
        <Stack.Screen name="CambiarContra" component={CambiarContra} options={{title: '', headerStyle: {backgroundColor: '#f7f1fb', },headerTintColor: '#7E21A3', }} />
        <Stack.Screen name="Perfil" component={Perfil}  options={{title: '', headerStyle: {backgroundColor: '#9A20E0', },headerTintColor: '#fff', }} />
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="verProyecto" component={verProyecto}  options={{title: '', headerStyle: {backgroundColor: '#006CD1', },headerTintColor: '#fff', }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
