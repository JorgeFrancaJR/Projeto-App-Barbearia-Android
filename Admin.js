import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Admin({ agendamentos = [] }) {
  const handleConcluir = (id) => {
    Alert.alert('Atendimento', `Agendamento marcado como concluído!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>PAINEL DO BARBEIRO</Text>
          <Text style={styles.headerSubtitle}>
            Total de Agendamentos: {agendamentos.length}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>PRÓXIMOS CLIENTES</Text>

        {agendamentos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum agendamento realizado no momento.
            </Text>
          </View>
        ) : (
          <FlatList
            data={agendamentos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardInfo}>
                  <Text style={styles.serviceName}>{item.serviceName}</Text>
                  <Text style={styles.cardDetails}>
                    📅 Dia {item.date} • ⏰ {item.time}
                  </Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>

                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => handleConcluir(item.id)}
                >
                  <Text style={styles.doneButtonText}>CONCLUIR</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  content: { flex: 1, padding: 20 },
  headerCard: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#D4AF37', marginBottom: 25 },
  headerTitle: { color: '#D4AF37', fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  headerSubtitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  sectionTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 15 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#777777', fontSize: 14 },
  card: { backgroundColor: '#1E1E1E', borderRadius: 14, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1 },
  serviceName: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  cardDetails: { color: '#D4AF37', fontSize: 13, marginTop: 4 },
  cardPrice: { color: '#999999', fontSize: 13, marginTop: 2 },
  doneButton: { backgroundColor: '#D4AF37', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8, marginLeft: 10 },
  doneButtonText: { color: '#111111', fontSize: 11, fontWeight: '900' },
});