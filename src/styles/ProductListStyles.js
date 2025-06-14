import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  preco: { fontSize: 14, color: '#444' },
  excluir: { fontSize: 20, color: 'red', marginLeft: 12 },
  botaoAdicionar: {
    backgroundColor: '#2D2D2D',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: { color: '#fff', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  erro: { color: 'red' },
  vazio: { textAlign: 'center', marginTop: 20 },
});
