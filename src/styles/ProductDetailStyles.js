import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    textAlign: 'center',
  },
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D2D2D',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});
