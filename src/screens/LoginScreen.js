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
  Image,
} from 'react-native';
import axios from 'axios';
import styles from '../styles/LoginStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };

  const handleLogin = async () => {
    setErro('');

    // Validações
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
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

    try {
      const baseURL = 'http://192.168.1.10:3000';
      const response = await axios.get(`${baseURL}/usuarios?email=${email}`);

      if (response.data.length === 0) {
        setErro('E-mail não encontrado.');
        return;
      }

      const usuario = response.data[0];

      if (usuario.senha !== senha) {
        setErro('Senha incorreta.');
        return;
      }

      Alert.alert('Login realizado com sucesso!');
      navigation.navigate('ProductList'); 

    } catch (err) {
      console.error(err);
      setErro('Erro ao realizar login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.formContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.titulo}>Entrar</Text>

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

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Button title="Entrar" onPress={handleLogin} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.botaoCadastrar}
        >
          <Text style={styles.textoCadastrar}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}