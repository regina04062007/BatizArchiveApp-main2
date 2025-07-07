import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './RegisterStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Register() {
  const navigation = useNavigation();
  const [nom_usuario, setNomUsuario] = useState('');
  const [appat_usuario, setAppatUsuario] = useState('');
  const [apmat_usuario, setApmatUsuario] = useState('');
  const [contrasena_usuario, setContrasenaUsuario] = useState('');
  const [correo_usuario, setCorreoUsuario] = useState('');
  const [genero_usuario, setGeneroUsuario] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState('Minímo 5 caracteres.\nLetra mayúscula.\nNúmero.\nCarácter especial (#$%^&*).');
  const [emailFeedback, setEmailFeedback] = useState('El correo debe terminar en @gmail.com');
  const [passwordValido, setIsPasswordValid] = useState(false);
  const [correoValido, setIsEmailValid] = useState(false);

  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  if (!fontsLoaded) return <AppLoading />;

  const validarPassword = (password) => {
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[#\$%\^&\*\(\)]/;
    const minimo = 5;

    setContrasenaUsuario(password);

    if (password === '') {
      setPasswordFeedback('Minímo 5 caracteres.\nLetra mayúscula.\nNúmero.\nCarácter especial (#$%^&*).');
      setIsPasswordValid(false);
      return;
    }

    let feedback = '';
    if (password.length < minimo) feedback += 'Minímo 5 caracteres.\n';
    if (!upperCaseRegex.test(password)) feedback += 'Letra mayúscula.\n';
    if (!numberRegex.test(password)) feedback += 'Número.\n';
    if (!specialCharRegex.test(password)) feedback += 'Carácter especial (#$%^&*).\n';

    if (feedback === '') {
      setPasswordFeedback('Contraseña válida');
      setIsPasswordValid(true);
    } else {
      setPasswordFeedback(feedback);
      setIsPasswordValid(false);
    }
  };

  const validarCorreo = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setCorreoUsuario(email);

    if (email === '') {
      setEmailFeedback('El correo debe terminar en @gmail.com');
      setIsEmailValid(false);
      return;
    }

    if (emailRegex.test(email)) {
      setEmailFeedback('Correo válido');
      setIsEmailValid(true);
    } else {
      setEmailFeedback('El correo debe terminar en @gmail.com');
      setIsEmailValid(false);
    }
  };

  const validarFormulario =
    nom_usuario &&
    appat_usuario &&
    apmat_usuario &&
    contrasena_usuario &&
    correo_usuario &&
    genero_usuario &&
    passwordValido &&
    correoValido;

  const handleRegister = async () => {
    let generoDB = genero_usuario === 'Femenino' ? 1 : genero_usuario === 'Masculino' ? 2 : null;
    try {
      await axios.post('http:// 192.168.0.9:5000/api/register', {
        nom_usuario,
        appat_usuario,
        apmat_usuario,
        contrasena_usuario,
        correo_usuario,
        id_genero: generoDB,
      });
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al registrar al usuario');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}><Text style={styles.headerText}>REGISTRO</Text></View>

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Nombre de Usuario" maxLength={20} style={styles.input} value={nom_usuario} onChangeText={setNomUsuario} placeholderTextColor="#7E21A3" />
            <Icon name="account" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Apellido Paterno" maxLength={20} style={styles.input} value={appat_usuario} onChangeText={setAppatUsuario} placeholderTextColor="#7E21A3" />
            <Icon name="account-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Apellido Materno" maxLength={20} style={styles.input} value={apmat_usuario} onChangeText={setApmatUsuario} placeholderTextColor="#7E21A3" />
            <Icon name="account-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <View style={styles.contenedorGenero}>
            <Text style={styles.etiquetaGenero}>Género</Text>
            <View style={styles.opcionesGenero}>
              <TouchableOpacity style={[styles.opcionGenero, genero_usuario === 'Masculino' && styles.seleccionado]} onPress={() => setGeneroUsuario('Masculino')}>
                <View style={[styles.circuloGenero, genero_usuario === 'Masculino' && styles.circuloSeleccionado]} />
                <Text style={styles.textoGenero}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.opcionGenero, genero_usuario === 'Femenino' && styles.seleccionado]} onPress={() => setGeneroUsuario('Femenino')}>
                <View style={[styles.circuloGenero, genero_usuario === 'Femenino' && styles.circuloSeleccionado]} />
                <Text style={styles.textoGenero}>Femenino</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Correo" maxLength={50} style={styles.input} value={correo_usuario} onChangeText={validarCorreo} keyboardType="email-address" placeholderTextColor="#7E21A3" />
            <Icon name="email-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, { color: emailFeedback === 'Correo válido' ? 'green' : '#7E21A3' }]}>{emailFeedback}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Contraseña" maxLength={20} style={styles.input} value={contrasena_usuario} onChangeText={validarPassword} secureTextEntry placeholderTextColor="#7E21A3" />
            <Icon name="lock-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>
          <View style={styles.feedbackContainer}>
            <Text style={[styles.feedbackText, { color: passwordFeedback === 'Contraseña válida' ? 'green' : '#7E21A3' }]}>{passwordFeedback}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { opacity: validarFormulario ? 1 : 0.5 }]}
            onPress={handleRegister}
            disabled={!validarFormulario}
          >
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
