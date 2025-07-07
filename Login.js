import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform, Image, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './LoginStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function Login() {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleLogin = async () => {

    const correoRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
    const contraseñaRegex = /^[a-zA-Z0-9#$%&]+$/;
  
    if (!correoRegex.test(correo)) {
      Alert.alert('Correo inválido', 'El correo debe terminar en @gmail.com');
      return;
    }
  
    if (!contraseñaRegex.test(contraseña)) {
      Alert.alert('Contraseña inválida');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.0.9:5000/api/login', {
        correo_usuario: correo,
        contrasena_usuario: contraseña,
      });
  
      const { token } = response.data;
  
      await AsyncStorage.setItem('token', token);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      navigation.navigate('Inicio');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', error.response ? error.response.data.error : 'Error desconocido');
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>INICIO DE SESIÓN</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Correo Electrónico" maxLength={50} style={styles.input} keyboardType="email-address" value={correo} onChangeText={setCorreo} autoCapitalize="none" placeholderTextColor="#7E21A3" />
            <Icon name="email-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Contraseña" maxLength={20} style={styles.input} value={contraseña} onChangeText={setContraseña}secureTextEntry={true} placeholderTextColor="#7E21A3" />
            <Icon name="lock-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer2}>
            <Text style={styles.link}>¿Todavía no tienes cuenta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.linkHighlight}>Regístrate</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.linkContainer}>
            <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecuperarContra')}>
              <Text style={styles.linkHighlight}>Recuperar contraseña</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
