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
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OutraPag from './outrapag';
import Agendamento from './Agendamento';
import Admin from './Admin';
import CriarConta from './CriarConta'

const Stack = createStackNavigator();

// =========================
// PÁGINA DE LOGIN
// =========================

function Login({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111111" />
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
        <Text style={styles.brandTitle}>BARBEARIA DO</Text>
        <Text style={styles.brandName}>BAIANO</Text>
        <View style={styles.divider} />

        {/* FORMULÁRIO */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>E-MAIL</Text>
          <TextInput
            placeholder="seuemail@email.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.inputLabel}>SENHA</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() =>
              Alert.alert('Recuperar Senha', 'Link de recuperação enviado para o seu e-mail!')
            }
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => navigation.navigate('outrapag')}
          >
            <Text style={styles.buttonPrimaryText}>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => navigation.navigate('CriarConta')}
          >
            <Text style={styles.buttonSecondaryText}>CRIAR UMA CONTA</Text>
          </TouchableOpacity>
        </View>

        {/* ACESSO BARBEIRO / ADMIN */}
        <TouchableOpacity
          style={styles.adminLink}
          onPress={() => navigation.navigate('Admin')}
        >
          <Text style={styles.adminLinkText}>Acesso Barbeiro / Admin 🔐</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// =========================
// NAVEGAÇÃO E ESTADO GLOBAL
// =========================

export default function App() {
  const [agendamentos, setAgendamentos] = useState([]);

  const adicionarAgendamento = (novoAgendamento) => {
    setAgendamentos((prev) => [...prev, novoAgendamento]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#111111' },
          headerTintColor: '#D4AF37',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="outrapag"
          component={OutraPag}
          options={{ title: 'Barbearia do Baiano' }}
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{ title: 'Criação De Usuário' }}
        />
        <Stack.Screen name="Agendamento" options={{ title: 'Agendar Horário' }}>
          {(props) => (
            <Agendamento
              {...props}
              agendamentos={agendamentos}
              onAdicionarAgendamento={adicionarAgendamento}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Admin" options={{ title: 'Painel do Barbeiro' }}>
          {(props) => <Admin {...props} agendamentos={agendamentos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  innerContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
  logoContainer: { alignSelf: 'center', borderWidth: 2, borderColor: '#D4AF37', borderRadius: 65, padding: 3, marginBottom: 15 },
  logo: { width: 110, height: 110, borderRadius: 55 },
  brandTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '700', textAlign: 'center', letterSpacing: 4 },
  brandName: { color: '#D4AF37', fontSize: 28, fontWeight: '900', textAlign: 'center', letterSpacing: 4 },
  divider: { width: 40, height: 2, backgroundColor: '#D4AF37', alignSelf: 'center', marginVertical: 18 },
  form: { marginTop: 10 },
  inputLabel: { color: '#D4AF37', fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#1E1E1E', borderWidth: 1, borderColor: '#333333', borderRadius: 10, padding: 14, color: '#FFFFFF', fontSize: 15 },
  forgotButton: { alignSelf: 'flex-end', marginTop: 8, marginBottom: 15 },
  forgotPasswordText: { color: '#999999', fontSize: 12 },
  buttonPrimary: { backgroundColor: '#D4AF37', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonPrimaryText: { color: '#111111', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  buttonSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#D4AF37', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  buttonSecondaryText: { color: '#D4AF37', fontSize: 13, fontWeight: '800', letterSpacing: 1 },
  adminLink: { marginTop: 30, alignItems: 'center' },
  adminLinkText: { color: '#666666', fontSize: 12, textDecorationLine: 'underline' },
});