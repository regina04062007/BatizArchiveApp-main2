import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f1fb',
  },
  header: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: '#7E21A3',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 30,  
    marginTop: 10,
    height:'100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    flexGrow: 1, 
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
    color: '#000',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: 14,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#7E21A3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
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
});
