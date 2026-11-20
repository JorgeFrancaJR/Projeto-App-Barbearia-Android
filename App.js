import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Vibration,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OutraPag from './outrapag';
import Agendamento from './Agendamento';
import Admin from './Admin';
import CriarConta from './CriarConta';

import {
  inicializarBanco,
  fazerLogin,
} from './BancoDeDados';

const Stack = createStackNavigator();

// Padrão de vibração de erro: vibra, pausa, vibra
const VIBRACAO_ERRO = [0, 150, 100, 150];

// =====================================
// TELA DE LOGIN
// =====================================

function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {

    if (!email.trim() || !senha.trim()) {
      Vibration.vibrate(VIBRACAO_ERRO);
      Alert.alert(
        'Campos obrigatórios',
        'Digite seu e-mail e sua senha.'
      );
      return;
    }

    try {

      setCarregando(true);

      // Inicializa o banco
      await inicializarBanco();

      // Verifica usuário e senha
      const usuario = await fazerLogin(email, senha);

      // Usuário não encontrado
      if (!usuario) {
        Vibration.vibrate(VIBRACAO_ERRO);
        Alert.alert(
          'Acesso negado',
          'E-mail ou senha incorretos. Verifique seus dados ou crie uma conta.'
        );
        return;
      }

      // VERIFICA SE É ADMINISTRADOR
      if (usuario.tipo === 'admin') {

        navigation.navigate('Admin', {
          adminAutenticado: true,
        });

      } else {

        // SE FOR CLIENTE, VAI PARA A TELA NORMAL
        navigation.navigate('outrapag', {
          usuario: usuario,
        });

      }

      // Limpa os campos
      setEmail('');
      setSenha('');

    } catch (erro) {

      console.log('Erro no login:', erro);

      Vibration.vibrate(VIBRACAO_ERRO);

      Alert.alert(
        'Erro',
        'Não foi possível realizar o login. Tente novamente.'
      );

    } finally {

      setCarregando(false);

    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#111111"
      />

      <View style={styles.innerContainer}>

        {/* LOGO */}

        <View style={styles.logoContainer}>

          <Image
            source={{
              uri: 'https://static.vecteezy.com/ti/vetor-gratis/t2/19495567-design-de-logotipo-de-barbearia-e-maquina-de-barbear-vetor.jpg',
            }}
            style={styles.logo}
          />

        </View>

        {/* TÍTULO */}

        <Text style={styles.brandTitle}>
          BARBEARIA DO
        </Text>

        <Text style={styles.brandName}>
          BAIANO
        </Text>

        <View style={styles.divider} />

        {/* FORMULÁRIO */}

        <View style={styles.form}>

          <Text style={styles.inputLabel}>
            E-MAIL
          </Text>

          <TextInput
            placeholder="seuemail@email.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>
            SENHA
          </Text>

          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry
            autoCapitalize="none"
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />

          {/* ESQUECEU A SENHA */}

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              Alert.alert(
                'Recuperar Senha',
                'Entre em contato com a barbearia para recuperar sua senha.'
              )
            }
          >

            <Text style={styles.forgotPasswordText}>
              Esqueceu a senha?
            </Text>

          </TouchableOpacity>

          {/* BOTÃO ENTRAR */}

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={entrar}
            disabled={carregando}
          >

            {carregando ? (

              <ActivityIndicator color="#111111" />

            ) : (

              <Text style={styles.buttonPrimaryText}>
                ENTRAR
              </Text>

            )}

          </TouchableOpacity>

          {/* CRIAR CONTA */}

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('CriarConta')}
          >

            <Text style={styles.buttonSecondaryText}>
              CRIAR UMA CONTA
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );
}

// =====================================
// NAVEGAÇÃO PRINCIPAL
// =====================================

export default function App() {

  const [agendamentos, setAgendamentos] = useState([]);

  // Adiciona agendamento
  const adicionarAgendamento = (novoAgendamento) => {

    setAgendamentos((prev) => [
      ...prev,
      novoAgendamento,
    ]);

  };

  return (

    <NavigationContainer>

      <Stack.Navigator

        initialRouteName="Login"

        screenOptions={{

          headerStyle: {
            backgroundColor: '#111111',
          },

          headerTintColor: '#D4AF37',

          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerBackTitleVisible: false,

        }}

      >

        {/* LOGIN */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        {/* TELA PRINCIPAL DO CLIENTE */}

        <Stack.Screen
          name="outrapag"
          component={OutraPag}
          options={{
            title: 'Barbearia do Baiano',
          }}
        />

        {/* CADASTRO */}

        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{
            title: 'Criação de Usuário',
          }}
        />

        {/* AGENDAMENTOS */}

        <Stack.Screen
          name="Agendamento"
          options={{
            title: 'Agendar Horário',
          }}
        >

          {(props) => (

            <Agendamento
              {...props}
              agendamentos={agendamentos}
              onAdicionarAgendamento={adicionarAgendamento}
            />

          )}

        </Stack.Screen>

        {/* PAINEL ADMINISTRATIVO */}

        <Stack.Screen
          name="Admin"
          options={{
            title: 'Painel do Barbeiro',
          }}
        >

          {(props) => (

            <Admin
              {...props}
              agendamentos={agendamentos}
            />

          )}

        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>

  );
}

// =====================================
// ESTILIZAÇÃO
// =====================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logoContainer: {
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
    borderRadius: 65,
    padding: 3,
    marginBottom: 15,
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  brandTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 4,
  },

  brandName: {
    color: '#D4AF37',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 4,
  },

  divider: {
    width: 40,
    height: 2,
    backgroundColor: '#D4AF37',
    alignSelf: 'center',
    marginVertical: 18,
  },

  form: {
    marginTop: 10,
  },

  inputLabel: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 15,
  },

  forgotPasswordText: {
    color: '#999999',
    fontSize: 12,
  },

  buttonPrimary: {
    backgroundColor: '#D4AF37',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonPrimaryText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonSecondaryText: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

});