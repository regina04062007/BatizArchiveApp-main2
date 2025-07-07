import React from 'react';  
import {Text,TextInput,TouchableOpacity, View,KeyboardAvoidingView,ScrollView,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import styles from './CambiarContraStyles';
import { useNavigation } from '@react-navigation/native'; 

export default function CambiarContra() {
  const navigation = useNavigation(); 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.headerText}>CAMBIAR CONTRASEÑA</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Contraseña" placeholderTextColor="#7E21A3" secureTextEntry={true} style={styles.input}/>
           <Icon name="lock-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput placeholder="Confirmar contraseña" placeholderTextColor="#7E21A3" secureTextEntry={true} style={styles.input}/>
           <Icon name="lock-outline" size={24} color="#7E21A3" style={styles.icon} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.button}>
            <Text style={styles.buttonText}>RESTABLECER</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <Text style={styles.link}>¿Recordaste tu contraseña?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkHighlight}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
