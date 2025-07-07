import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },

  seccion: {
    marginBottom: 30,
    paddingBottom: 20,
  },

  tituloSeccion: {
    fontSize: 28,
    color: "#1f1f1f",
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Poppins_700Bold',
  },

  contenedorImagen: {
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#ffffff",
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  imagenPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  infoUsuario: {
    alignItems: "center",
    marginTop: 15,
  },

  textoInfo1: {
    fontSize: 22,
    marginBottom: 5,
    color: "#222",
    fontFamily: 'Poppins_700Bold',
    textAlign: "center",
  },

  textoInfo: {
    fontSize: 17,
    marginBottom: 5,
    color: "#555",
    fontFamily: 'Poppins_400Regular',
    textAlign: "center",
  },

  textoFavorito: {
    fontSize: 17,
    marginBottom: 10,
    color: "#444",
    fontFamily: 'Poppins_700Bold',
  },

  proyectoCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  Button: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#6A0DAD', 
    borderRadius: 30,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    paddingHorizontal: 8,
  },
  

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: "#9A20E0",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  footerButton: {
    alignItems: "center",
  },

  footerText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'Poppins_400Regular',
  },
});
