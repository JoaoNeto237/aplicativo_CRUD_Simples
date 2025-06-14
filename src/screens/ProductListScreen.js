import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import styles from '../styles/ProductListStyles';

export default function ProductListScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const IP_LOCAL = Platform.select({
    ios: 'http://localhost:3000',
    android: 'http://192.168.1.10:3000',
  });

  const fetchProdutos = () => {
    setLoading(true);
    fetch(`${IP_LOCAL}/produtos`)
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setErro('Erro ao carregar produtos');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isFocused) fetchProdutos();
  }, [isFocused]);

  const excluirProduto = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          fetch(`${IP_LOCAL}/produtos/${id}`, {
            method: 'DELETE',
          }).then(() => fetchProdutos());
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      onLongPress={() => navigation.navigate('ProductForm', { product: item })}
    >
      <Image
        source={{ uri: item.imagemUrl }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => excluirProduto(item.id)}>
        <Text style={styles.excluir}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.center}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto disponível</Text>}
      />
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.botaoTexto}>+ Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}
