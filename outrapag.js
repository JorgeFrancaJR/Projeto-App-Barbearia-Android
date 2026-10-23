import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';

const services = [
  {
    id: 1,
    name: 'Corte Tesoura',
    description: 'Corte completo na tesoura.',
    price: 'R$ 35,00',
    time: '40 min',
  },
  {
    id: 2,
    name: 'Tesoura e Máquina',
    description: 'Degradê personalizado com acabamento preciso.',
    price: 'R$ 45,00',
    time: '50 min',
  },
  {
    id: 3,
    name: 'Barba',
    description: 'Modelagem, toalha quente e acabamento.',
    price: 'R$ 30,00',
    time: '30 min',
  },
  {
    id: 4,
    name: 'Corte + Barba',
    description: 'O combo completo para renovar o visual.',
    price: 'R$ 65,00',
    time: '1h 10min',
  },
];
const abrirWhatsApp = async () => {
  const telefone = '5521959034244';

  const mensagem = 'Olá! Gostaria de mais informações sobre os serviços da Barbearia do Baiano, pra ver se ele é BAIANO';

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  try {
    await Linking.openURL(url);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
  }
};
export default function OutraPag({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Text style={styles.logo}>Barbearia do</Text>
          <Text style={styles.logo}>Baiano</Text>
          <View style={styles.divider} />
          <Text style={styles.welcome}>Atendimento Priorizado</Text>
          <Text style={styles.headerDescription}>
            Com o agendamento você será prioridade ao ser atendido
          </Text>
        </View>

        {/* LISTA DE SERVIÇOS */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>NOSSOS SERVIÇOS</Text>

          {services.map((service) => (
            <View key={service.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.icon}>
                  <Text style={styles.iconText}>✂️</Text>
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.description}>{service.description}</Text>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.time}>⏱️ {service.time}</Text>
                <Text style={styles.price}>{service.price}</Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Agendamento', { service })}
              >
                <Text style={styles.buttonText}>AGENDAR</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* INFORMAÇÕES DA BARBEARIA */}
          <View style={styles.about}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📍 ENDEREÇO</Text>
              <Text style={styles.infoValue}>Rua Cirne Maia, 126</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🕐 HORÁRIO</Text>
              <Text style={styles.infoValue}>Ter - Sáb: 08h às 19h</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📞 CONTATO</Text>
              <Text style={styles.infoValue}>(21) 99512-2022</Text>
            </View>
            {/* BOTÃO DO WHATSAPP */}
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={abrirWhatsApp}
            >
              <Text style={styles.whatsappButtonText}>
                CONVERSAR PELO WHATSAPP
              </Text>
            </TouchableOpacity>
          </View>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Text style={styles.footerLogo}>BARBER</Text>
            <Text style={styles.footerText}>
              © 2026 Barbearia. Todos os direitos reservados.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 45,
    paddingBottom: 35,
    alignItems: 'center',
  },
  logo: {
    color: '#D4AF37',
    fontSize: 45,
    fontWeight: '900',
    letterSpacing: 6,
  },
  divider: {
    width: 55,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 25,
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerDescription: {
    color: '#999999',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 10,
    maxWidth: 330,
  },
  content: {
    backgroundColor: '#F5F3EF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingTop: 30,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconText: {
    color: '#D4AF37',
    fontSize: 23,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: '#777777',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  time: {
    color: '#777777',
    fontSize: 13,
  },
  price: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#111111',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  about: {
    marginTop: 18,
    paddingTop: 10,
  },
  infoRow: {
    borderTopWidth: 1,
    borderTopColor: '#DDDBD6',
    paddingVertical: 14,
  },
  infoLabel: {
    color: '#111111',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  infoValue: {
    color: '#777777',
    fontSize: 14,
    marginTop: 4,
  },

  // BOTÃO DO WHATSAPP
  whatsappButton: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 35,
  },
  footerLogo: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 4,
  },
  footerText: {
    color: '#999999',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },
});