import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator,Alert, KeyboardAvoidingView, TextInput, Platform} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './InicioStyles';

export default function Inicio() {
  const navigation = useNavigation();
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState({
    foto: 'https://cdn-icons-png.flaticon.com/512/18573/18573353.png',
    name: '',
    email: '',
  });
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 12;

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const response = await axios.get(`http://192.168.0.9:5000/api/proyectos/todos`);
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        Alert.alert('Error', 'No se pudieron cargar los proyectos. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    obtenerProyectos();
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [especialidadSeleccionada, searchTerm]);

  useEffect(() => {
    const buscarProyectos = async (texto) => {
      if (!texto.trim()) return;
      try {
        const response = await fetch(`http://192.168.0.9:5000/api/buscador/real-time?query=${encodeURIComponent(texto)}`);
        const data = await response.json();
        setResultadosBusqueda(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al buscar:', error);
        setResultadosBusqueda([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      buscarProyectos(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const proyectosFiltrados = especialidadSeleccionada
    ? proyectos.filter(p => p.desc_especialidad === especialidadSeleccionada)
    : proyectos;

  const proyectosAMostrar = searchTerm.length > 0 ? resultadosBusqueda : proyectosFiltrados;

  const paginar = (datos, pagina) => {
    if (!Array.isArray(datos)) return [];
    const inicio = (pagina - 1) * porPagina;
    return datos.slice(inicio, inicio + porPagina);
  };

  const renderPaginas = (total, actual, setPagina) => {
    const totalPaginas = Math.ceil(total / porPagina);
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, flexWrap: 'wrap' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => setPagina(i + 1)}
            style={{
              margin: 5,
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {showSidebar && (
        <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarToggle} onPress={() => setShowSidebar(false)}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.userSection}>
            <Image source={{ uri: user.foto }} style={styles.userFoto} />
            <Text style={styles.userName}>{user.name || 'Usuario'}</Text>
            <Text style={styles.userEmail}>{user.email || 'Correo Electrónico'}</Text>
            <TouchableOpacity style={styles.optionItem2} onPress={() => navigation.navigate('Perfil')}>
              <Icon name="account" size={30} color="black" />
              <Text style={styles.optionText}>Perfil</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.optionItem} onPress={() => setEspecialidadSeleccionada('')}>
            <Icon name="clock-outline" size={20} color="9A20E0" />
            <Text style={styles.optionText}>Últimos Agregados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setEspecialidadSeleccionada('Tronco Comun')}>
            <Icon name="school-outline" size={20} color="9A20E0" />
            <Text style={styles.optionText}>Tronco Común</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setEspecialidadSeleccionada('Programacion')}>
            <Icon name="code-tags" size={20} color="9A20E0" />
            <Text style={styles.optionText}>Programación</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setEspecialidadSeleccionada('Mecatronica')}>
            <Icon name="robot" size={20} color="9A20E0" />
            <Text style={styles.optionText}>Mecatrónica</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={() => setEspecialidadSeleccionada('Sistemas Digitales')}>
            <Icon name="chip" size={20} color="9A20E0" />
            <Text style={styles.optionText}>Sistemas Digitales</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonCerrarSesion} onPress={() => navigation.navigate('Principal')}>
            <Icon name="logout" size={24} color="white" />
            <Text style={styles.textoCerrarSesion}>Cerrar sesión</Text>
          </TouchableOpacity>

          <Image style={styles.imagenLogo} source={require('./assets/logoBatizArchive.png')} />
        </View>
      )}

      <View style={styles.header}>
        {!showSidebar && (
          <TouchableOpacity onPress={() => setShowSidebar(true)} style={styles.sidebarToggle}>
            <Icon name="menu" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buscador}>
        <TextInput
          style={styles.buscadorInput}
          placeholder="Buscar aquí"
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.buscadorButton}>
          <Text style={styles.buscadorButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
        <Text style={styles.titulo2}>
          {searchTerm ? `Resultados para "${searchTerm}"` : (especialidadSeleccionada || 'Últimos agregados')}
        </Text>

        <View style={styles.proyectosContainer}>
          {Array.isArray(paginar(proyectosAMostrar, paginaActual)) && paginar(proyectosAMostrar, paginaActual).length > 0 ? (
            paginar(proyectosAMostrar, paginaActual).map((proyecto, index) => (
              <View key={index} style={styles.proyecto}>
                <Image
                  style={styles.imagen}
                  source={{ uri: proyecto.URL_textoD || proyecto.img_url || 'https://via.placeholder.com/150' }}
                />
                <Text style={styles.carrera}>{proyecto.desc_especialidad}</Text>
                <Text style={styles.titulo}>{proyecto.titulo_p}</Text>
                <Text style={styles.grupo}>Grupo {proyecto.desc_grupo}</Text>
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigation.navigate('verProyecto', { id_proyecto: proyecto.id_proyecto })}
                  >
                    <Text style={styles.buttonText}>Ver proyecto</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>No se encontraron proyectos.</Text>
          )}
        </View>

        {renderPaginas(proyectosAMostrar.length, paginaActual, setPaginaActual)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
