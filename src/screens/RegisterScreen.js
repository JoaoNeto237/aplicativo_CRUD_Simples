import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import styles from '../styles/RegisterStyles';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };

  const handleCadastro = async () => {
    setErro('');

    // Verificações
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (nome.trim().length < 3) {
      setErro('Nome deve ter pelo menos 3 caracteres.');
      return;
    }

    if (!validarEmail(email)) {
      setErro('Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const baseURL = 'http://192.168.1.10:3000';

      const response = await axios.get(`${baseURL}/usuarios?email=${email}`);
      if (response.data.length > 0) {
        setErro('Este e-mail já está cadastrado.');
        return;
      }

      const novoUsuario = { nome, email, senha };

      await axios.post(`${baseURL}/usuarios`, novoUsuario);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (err) {
      setErro('Erro ao cadastrar usuário.');
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Crie sua Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Button title="Cadastrar" onPress={handleCadastro} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.botaoVoltarAbaixo}
        >
          <Text style={styles.textoVoltarAbaixo}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
