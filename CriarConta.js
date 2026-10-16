import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const criarConta = () => {
    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha.trim() ||
      !confirmarSenha.trim()
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos para criar sua conta.'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        'Senhas diferentes',
        'As senhas digitadas não são iguais.'
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Senha inválida',
        'A senha deve ter pelo menos 6 caracteres.'
      );
      return;
    }

    Alert.alert(
      'Conta criada!',
      'Seu cadastro foi realizado com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Horarios')}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#111111"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltar}>
            ‹
          </Text>
        </TouchableOpacity>

        <Text style={styles.logo}>
          Barbearia do Baiano
        </Text>

        <Text style={styles.subtitulo}>
          Crie sua conta
        </Text>
      </View>

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoInterno}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>
          Criar conta
        </Text>

        <Text style={styles.descricao}>
          Preencha seus dados para realizar seus
          agendamentos na barbearia.
        </Text>

        <Text style={styles.label}>
          Nome completo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#999999"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Telefone
        </Text>

        <TextInput
          style={styles.input}
          placeholder="(21) 99999-9999"
          placeholderTextColor="#999999"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>
          Senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Text style={styles.label}>
          Confirmar senha
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Digite sua senha novamente"
          placeholderTextColor="#999999"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={criarConta}
        >
          <Text style={styles.textoCadastrar}>
            CRIAR CONTA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoJaTenho}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoJaTenho}>
            Já tenho uma conta
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          © 2026 Barbearia do Baiano
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  header: {
    backgroundColor: '#111111',
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 22,
  },

  botaoVoltar: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    marginBottom: 5,
  },

  voltar: {
    color: '#D4AF37',
    fontSize: 38,
    lineHeight: 38,
  },

  logo: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitulo: {
    color: '#F5F3EF',
    fontSize: 14,
    marginTop: 5,
  },

  conteudo: {
    flex: 1,
    backgroundColor: '#F5F3EF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  conteudoInterno: {
    padding: 24,
    paddingBottom: 35,
  },

  titulo: {
    color: '#111111',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  descricao: {
    color: '#666666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },

  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#111111',
  },

  botaoCadastrar: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },

  textoCadastrar: {
    color: '#111111',
    fontSize: 14,
    fontWeight: 'bold',
  },

  botaoJaTenho: {
    alignItems: 'center',
    paddingVertical: 18,
  },

  textoJaTenho: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '600',
  },

  footer: {
    backgroundColor: '#111111',
    paddingVertical: 15,
    alignItems: 'center',
  },

  footerTexto: {
    color: '#999999',
    fontSize: 11,
  },
});