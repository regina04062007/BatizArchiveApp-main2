import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './PerfilStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function Perfil() {
  const navigation = useNavigation();
  const [activeSection, setActiveSection] = useState('infoPersonal');

  const [usuario, setUsuario] = useState({
    nom_usuario: '',
    appat_usuario: '',
    apmat_usuario: '',
    correo_usuario: ''
  });

  const [proyectosUsuario, setProyectosUsuario] = useState([]);
  const [proyectosFavoritos, setProyectosFavoritos] = useState([]);

  const [paginaProyectos, setPaginaProyectos] = useState(1);
  const [paginaFavoritos, setPaginaFavoritos] = useState(1);
  const porPagina = 7;

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const responseUsuario = await axios.get('http://192.168.0.9:5000/api/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(responseUsuario.data);

        const responseProyectos = await axios.get('http://192.168.0.9:5000/api/proyectos/mios', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProyectosUsuario(responseProyectos.data);

        const responseFavoritos = await axios.get('http://192.168.0.9:5000/api/proyectos/favoritos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProyectosFavoritos(responseFavoritos.data);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  const paginar = (datos, pagina) => {
    const inicio = (pagina - 1) * porPagina;
    return datos.slice(inicio, inicio + porPagina);
  };

  const renderPaginas = (total, actual, setPagina) => {
    const totalPaginas = Math.ceil(total / porPagina);
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, flexWrap: 'wrap' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => setPagina(i + 1)}
            style={{
              margin: 4,
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: actual === i + 1 ? '#6A0DAD' : '#ccc',
              borderRadius: 8
            }}
          >
            <Text style={{ color: actual === i + 1 ? '#fff' : '#000' }}>{i + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}>
        {activeSection === 'infoPersonal' && (
          <View style={styles.seccion}>
            <View style={styles.contenedorInfo}>
              <Text style={styles.tituloSeccion}>Información Personal</Text>
              <View style={styles.contenedorImagen}>
                <Image source={require('./assets/perfil.png')} style={styles.imagenPerfil} />
              </View>
              <View style={styles.infoUsuario}>
                <Text style={styles.textoInfo1}>
                  {usuario.nom_usuario} {usuario.appat_usuario} {usuario.apmat_usuario}
                </Text>
                <Text style={styles.textoInfo}>{usuario.correo_usuario}</Text>
                <Text style={styles.textoInfo}>Contraseña: {'•'.repeat(10)}</Text>
              </View>
            </View>
          </View>
        )}

        {activeSection === 'misProyectos' && (
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Mis Proyectos</Text>
            {proyectosUsuario.length === 0 ? (
              <Text style={styles.textoInfo}>No tienes proyectos aún.</Text>
            ) : (
              <>
                {paginar(proyectosUsuario, paginaProyectos).map((proyecto) => (
                  <View key={proyecto.id_proyecto} style={styles.proyectoCard}>
                    <View style={styles.tituloRow}>
                      <Text style={styles.textoFavorito} numberOfLines={1} ellipsizeMode="tail">
                        {proyecto.titulo_p}
                      </Text>
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => navigation.navigate('verProyecto', { id_proyecto: proyecto.id_proyecto })}
                      >
                        <Icon name="eye" size={20} color="#6A0DAD" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                {renderPaginas(proyectosUsuario.length, paginaProyectos, setPaginaProyectos)}
              </>
            )}
          </View>
        )}

        {activeSection === 'misFavoritos' && (
          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Mis Favoritos</Text>
            {proyectosFavoritos.length === 0 ? (
              <Text style={styles.textoInfo}>Aún no has marcado proyectos como favoritos.</Text>
            ) : (
              <>
                {paginar(proyectosFavoritos, paginaFavoritos).map((proyecto) => (
                  <View key={proyecto.id_proyecto} style={styles.proyectoCard}>
                    <View style={styles.tituloRow}>
                      <Text style={styles.textoFavorito} numberOfLines={1} ellipsizeMode="tail">
                        {proyecto.titulo_p}
                      </Text>
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => navigation.navigate('verProyecto', { id_proyecto: proyecto.id_proyecto })}
                      >
                        <Icon name="eye" size={20} color="#6A0DAD" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                {renderPaginas(proyectosFavoritos.length, paginaFavoritos, setPaginaFavoritos)}
              </>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => setActiveSection('infoPersonal')}>
          <Icon name="account-circle" size={30} color="white" />
          <Text style={styles.footerText}>Información</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setActiveSection('misProyectos')}>
          <Icon name="folder" size={30} color="white" />
          <Text style={styles.footerText}>Mis Proyectos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => setActiveSection('misFavoritos')}>
          <Icon name="heart" size={30} color="white" />
          <Text style={styles.footerText}>Mis Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
