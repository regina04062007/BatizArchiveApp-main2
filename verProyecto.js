import React, { useState, useEffect } from 'react';  
import { Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform, TextInput, Image, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import styles from './verProyectoStyles'; 
import { useNavigation, useRoute } from '@react-navigation/native';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function VerProyecto() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id_proyecto } = route.params; 
  console.log('ID del proyecto recibido:', id_proyecto); 

  const [proyecto, setProyecto] = useState(null);

  const [esVisibleObjetivo, setEsVisibleObjetivo] = useState(false);
  const [esVisibleEjeTematico, setEsVisibleEjeTematico] = useState(false);
  const [esVisibleImpactoSocial, setEsVisibleImpactoSocial] = useState(false);
  const [esVisibleProposito, setEsVisibleProposito] = useState(false);
  const [esVisibleJustificacion, setEsVisibleJustificacion] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState('portada');

  const alternarSeccion = (seccion) => {
    if (seccion === 'objetivo') setEsVisibleObjetivo(!esVisibleObjetivo);
    if (seccion === 'ejeTematico') setEsVisibleEjeTematico(!esVisibleEjeTematico);
    if (seccion === 'impactoSocial') setEsVisibleImpactoSocial(!esVisibleImpactoSocial);
    if (seccion === 'proposito') setEsVisibleProposito(!esVisibleProposito);
    if (seccion === 'justificacion') setEsVisibleJustificacion(!esVisibleJustificacion);
  };

  const obtenerProyecto = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', token);  

      if (!token || token === 'undefined' || token === 'null') {
        console.log('Token inválido o no encontrado en almacenamiento');
        Alert.alert('Error', 'No hay token válido en el almacenamiento local');
        return;
      }

      console.log('ID que voy a buscar:', id_proyecto);

      const response = await axios.get(`http://192.168.0.9:5000/api/verProyectos/${id_proyecto}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Respuesta del backend:', response.data);
      setProyecto(response.data);

    } catch (error) {
      console.error('Error al obtener el proyecto:', error);
      Alert.alert('Error', error.response?.data?.error || 'Error desconocido');
    }
  };

  const descargarArchivo = async (url, nombreArchivo) => {
    try {
      let nombre = nombreArchivo.replace(/\s+/g, '_');
      if (!nombre.toLowerCase().endsWith('.pdf') && !nombre.toLowerCase().endsWith('.jpg') && !nombre.toLowerCase().endsWith('.jpeg')) {
        if (url.toLowerCase().includes('.pdf')) {
          nombre += '.pdf';
        } else if (url.toLowerCase().includes('.jpg') || url.toLowerCase().includes('.jpeg')) {
          nombre += '.jpg';
        }
      }

      const path = FileSystem.documentDirectory + nombre;
      const download = await FileSystem.downloadAsync(url, path);
      Alert.alert('Descarga completa', `Archivo guardado en: ${download.uri}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo descargar el archivo');
    }
  };

  useEffect(() => {
    obtenerProyecto();
  }, []);

  if (!proyecto) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 80,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >


        {seccionActiva === 'portada' && (
          <>
            <Text style={styles.title}>{proyecto.titulo_p}</Text>
            <Image
              style={styles.imagenProyecto}
              source={proyecto.img_url ? { uri: proyecto.img_url } : require('./assets/rob.jpeg')}/>
            <View style={styles.infoContainer2}>
              <TextInput style={styles.infoTexto} value={`Fecha Creación: ${proyecto.fecha_creacion ? proyecto.fecha_creacion : '00:00:00'}`} editable={false}/>
              <TextInput style={styles.infoTexto} value={`Fecha Actualización: ${proyecto.ultima_actualizacion ? proyecto.ultima_actualizacion : '00:00:00'}`} editable={false}/>
            </View>

            <View style={styles.infoContainer}>
              <TextInput style={styles.infoTexto} value={`Especialidad: ${proyecto.desc_especialidad}`} editable={false}/>
              <TextInput style={styles.infoTexto} value={`Grupo: ${proyecto.grupo}`} editable={false}/>
            </View>
          </>
        )}

        {seccionActiva === 'informacion' && (
          <>
            <TouchableOpacity style={styles.sectionHeader} onPress={() => alternarSeccion('objetivo')}>
              <Text style={styles.sectionTitle}>Objetivo</Text>
              <Icon name={esVisibleObjetivo ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
            </TouchableOpacity>
            {esVisibleObjetivo && (
              <Animated.View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{proyecto.obj_p}</Text>
              </Animated.View>
            )}

            <TouchableOpacity style={styles.sectionHeader} onPress={() => alternarSeccion('ejeTematico')}>
              <Text style={styles.sectionTitle}>Eje Temático</Text>
              <Icon name={esVisibleEjeTematico ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
            </TouchableOpacity>
            {esVisibleEjeTematico && (
              <Animated.View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{proyecto.ejeT_p}</Text>
              </Animated.View>
            )}

            <TouchableOpacity style={styles.sectionHeader} onPress={() => alternarSeccion('impactoSocial')}>
              <Text style={styles.sectionTitle}>Impacto Social</Text>
              <Icon name={esVisibleImpactoSocial ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
            </TouchableOpacity>
            {esVisibleImpactoSocial && (
              <Animated.View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{proyecto.impacto_socialp}</Text>
              </Animated.View>
            )}

            <TouchableOpacity style={styles.sectionHeader} onPress={() => alternarSeccion('proposito')}>
              <Text style={styles.sectionTitle}>Propósito</Text>
              <Icon name={esVisibleProposito ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
            </TouchableOpacity>
            {esVisibleProposito && (
              <Animated.View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{proyecto.proposito_p}</Text>
              </Animated.View>
            )}

            <TouchableOpacity style={styles.sectionHeader} onPress={() => alternarSeccion('justificacion')}>
              <Text style={styles.sectionTitle}>Justificación</Text>
              <Icon name={esVisibleJustificacion ? 'chevron-up' : 'chevron-down'} size={20} color="white" />
            </TouchableOpacity>
            {esVisibleJustificacion && (
              <Animated.View style={styles.sectionContent}>
                <Text style={styles.sectionText}>{proyecto.justificacion_p}</Text>
              </Animated.View>
            )}
          </>
        )}

        {seccionActiva === 'documentacion' && (
          <View style={styles.seccionDocumentacion}>
            <Text style={styles.tituloTabla}>Documentación PDF / Enlaces</Text>
            <View style={styles.tabla}>
              <View style={styles.filaEncabezado}>
                <Text style={styles.celdaEncabezado}>Archivos</Text>
                <Text style={styles.celdaEncabezado}>Descargar</Text>
              </View>
              {proyecto.documentacion_pdf && proyecto.documentacion_pdf.length > 0 ? (
                proyecto.documentacion_pdf.map((item, index) => (
                  <View key={index} style={styles.fila}>
                    <Text style={styles.celda}>{item.nombre}</Text>
                    <TouchableOpacity onPress={() => descargarArchivo(item.enlace, item.nombre)}>
                      <Text style={[styles.celda, { color: 'blue', textDecorationLine: 'underline' }]}>Descargar PDF</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.fila}>
                  <Text style={styles.celda}>No disponible</Text>
                  <Text style={styles.celda}>Aún no hay documentación</Text>
                </View>
              )}
            </View>

            <Text style={styles.tituloTabla}>Documentación en Imágenes</Text>
            <View style={styles.tabla}>
              <View style={styles.filaEncabezado}>
                <Text style={styles.celdaEncabezado}>Archivos</Text>
                <Text style={styles.celdaEncabezado}>Descargar</Text>
              </View>
              {proyecto.documentacion_imagenes && proyecto.documentacion_imagenes.length > 0 ? (
                proyecto.documentacion_imagenes.map((item, index) => (
                  <View key={index} style={styles.fila}>
                    <Text style={styles.celda}>{item.nombre}</Text>
                    <TouchableOpacity onPress={() => descargarArchivo(item.enlace, item.nombre)}>
                      <Text style={[styles.celda, { color: 'blue', textDecorationLine: 'underline' }]}>Descargar Imagen</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.fila}>
                  <Text style={styles.celda}>No disponible</Text>
                  <Text style={styles.celda}>Aún no hay documentación</Text>
                </View>
              )}
            </View>
          </View>
        )}

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => setSeccionActiva('portada')}>
          <Icon name="book-open-variant" size={28} color="#FFFFFF" />
          <Text style={styles.footerText}>Portada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => setSeccionActiva('informacion')}>
          <Icon name="information" size={28} color="#FFFFFF" />
          <Text style={styles.footerText}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => setSeccionActiva('documentacion')}>
          <Icon name="file-document" size={28} color="#FFFFFF" />
          <Text style={styles.footerText}>Documentación</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}
