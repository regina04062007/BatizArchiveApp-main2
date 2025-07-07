import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1fb',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1, 
  },
  imagenLogo: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 44,
    color: '#6C0BA9',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 50,
    height:'100%',
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#7E21A3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9A20E0',
    borderRadius: 30,
  },
  registerButtonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#9A20E0',
    fontSize: 16,
    letterSpacing: 1,
  },
});
