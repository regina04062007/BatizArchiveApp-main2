import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1fb',
  },
  header: {
    marginTop: 30,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: '#7E21A3',
    alignSelf:'center',
    justifyContent:'center',
    marginBottom:10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 60,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#EEEEEE',
    paddingLeft: 50,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#000',
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 14,
  },
  contenedorGenero: {
    marginBottom: 20,
    alignItems: 'flex-start', 
  },
  etiquetaGenero: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  opcionesGenero: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    marginTop: 10,
  },
  opcionGenero: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  circuloGenero: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7E21A3',
    marginRight: 8,
  },
  circuloSeleccionado: {
    backgroundColor: '#7E21A3',
  },
  textoGenero: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  seleccionado: {
    color: '#7E21A3', 
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#7E21A3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
  },
  linkContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  linkContainer2: {
    marginTop: 15,
    alignItems: 'center',
  },
  link: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  linkHighlight: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#9A20E0',
    marginTop: 4,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  
  feedbackText: {
    fontSize: 14,
    textAlign: 'center',
  }
  
});

