import React from 'react';  
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import styles from './RecuperarContraStyles';
import { useNavigation } from '@react-navigation/native'; 

export default function RecuperarContra() {
  const navigation = useNavigation(); 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
<ScrollView contentContainerStyle={{ flexGrow: 1 }}keyboardShouldPersistTaps="handled">
  <View style={styles.fullContent}>
    <View style={styles.header}>
      <Text style={styles.headerText}>RECUPERAR CONTRASEÑA</Text>
    </View>

    <View style={styles.footer}>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#7E21A3"
      />
      <Icon
        name="email-outline"
        size={24}
        color="#7E21A3"
        style={styles.icon}
      />
    </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CambiarContra')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>SIGUIENTE</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.link}>¿Recordaste tu contraseña?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkHighlight}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</ScrollView>

    </KeyboardAvoidingView>
  );
}

