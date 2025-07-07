import React from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Image,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './PrincipalStyles';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function Principal() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}keyboardShouldPersistTaps="handled">
      <View style={styles.topSection}>
        <Image
          style={styles.imagenLogo}
          source={require('./assets/logoBatizArchive.png')}
        />
        <Text style={styles.title}>BatizArchive</Text>
        <Text style={styles.subtitle}>Tu gestor de proyectos</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={[styles.button, styles.registerButton]}
        >
          <Text style={styles.registerButtonText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
