import React from 'react';
import { ScrollView, View, Text, Image, Alert, Button } from 'react-native';
import styles from '../styles/ProductDetailStyles';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  const confirmarExcluir = () => {
    Alert.alert('Confirmar', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          fetch(`http://192.168.1.10:3000/produtos/${product.id}`, {
            method: 'DELETE',
          }).then(() => navigation.navigate('ProductList'));
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.imagemUrl }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.nome}>{product.nome}</Text>
      <Text style={styles.descricao}>{product.descricao}</Text>
      <Text style={styles.preco}>R$ {product.preco.toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('ProductForm', { product })}
        />
        <Button title="Excluir" color="red" onPress={confirmarExcluir} />
      </View>
    </ScrollView>
  );
}
