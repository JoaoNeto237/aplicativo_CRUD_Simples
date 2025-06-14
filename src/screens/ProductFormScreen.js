import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import styles from '../styles/ProductFormStyles';

export default function ProductFormScreen({ route, navigation }) {
  const produtoEdit = route.params?.product;

  const [nome, setNome] = useState(produtoEdit ? produtoEdit.nome : '');
  const [descricao, setDescricao] = useState(produtoEdit ? produtoEdit.descricao : '');
  const [preco, setPreco] = useState(produtoEdit ? String(produtoEdit.preco) : '');
  const [imagemUrl, setImagemUrl] = useState(produtoEdit ? produtoEdit.imagemUrl : '');

  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const errs = {};

    if (!nome.trim()) {
      errs.nome = 'O nome do produto é obrigatório.';
    }
    if (!descricao.trim()) {
      errs.descricao = 'A descrição é obrigatória.';
    }
    if (!preco.trim()) {
      errs.preco = 'O preço é obrigatório.';
    } else if (isNaN(Number(preco)) || Number(preco) <= 0) {
      errs.preco = 'Informe um preço válido maior que zero.';
    }
    if (!imagemUrl.trim()) {
      errs.imagemUrl = 'A URL da imagem é obrigatória.';
    } else {
      const urlRegex = /^(http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(imagemUrl.trim())) {
        errs.imagemUrl = 'Informe uma URL válida.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const salvarProduto = () => {
    if (!validarFormulario()) {
      return;
    }

    const produto = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      preco: Number(preco),
      imagemUrl: imagemUrl.trim(),
    };

    const metodo = produtoEdit ? 'PUT' : 'POST';
    const url = produtoEdit
      ? `http://192.168.1.10:3000/produtos/${produtoEdit.id}`
      : 'http://192.168.1.10:3000/produtos';

    fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Sucesso', `Produto ${produtoEdit ? 'atualizado' : 'adicionado'} com sucesso!`);
          navigation.navigate('ProductList');
        } else {
          throw new Error('Erro ao salvar produto');
        }
      })
      .catch(() => Alert.alert('Erro', 'Não foi possível salvar o produto.'));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{produtoEdit ? 'Editar Produto' : 'Adicionar Produto'}</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, errors.nome && styles.inputError]}
          value={nome}
          onChangeText={setNome}
          placeholder="Digite o nome do produto"
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.descricao && styles.inputError]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição do produto"
          multiline
          numberOfLines={4}
        />
        {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={[styles.input, errors.preco && styles.inputError]}
          value={preco}
          onChangeText={setPreco}
          placeholder="Digite o preço"
          keyboardType="numeric"
        />
        {errors.preco && <Text style={styles.errorText}>{errors.preco}</Text>}

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          style={[styles.input, errors.imagemUrl && styles.inputError]}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Digite a URL da imagem"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.imagemUrl && <Text style={styles.errorText}>{errors.imagemUrl}</Text>}

        {/* Pré-visualização da imagem */}
        {imagemUrl.trim() !== '' && (
          <Image
            source={{ uri: imagemUrl }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.buttonContainer}>
          <Button title="Salvar" onPress={salvarProduto} color="#2D2D2D" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
