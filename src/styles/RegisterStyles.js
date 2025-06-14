import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  formContainer: {
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  erro: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  botaoVoltarAbaixo: {
    marginTop: 12,
    alignItems: 'center',
  },
  textoVoltarAbaixo: {
    color: '#2D2D2D',
    fontSize: 16,
    fontWeight: '600',
  },
});
