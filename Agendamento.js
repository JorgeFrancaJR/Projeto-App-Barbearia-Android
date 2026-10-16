import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';

const allTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const daysOfWeek = [
  { day: 'Seg', date: '21' },
  { day: 'Ter', date: '22' },
  { day: 'Qua', date: '23' },
  { day: 'Qui', date: '24' },
  { day: 'Sex', date: '25' },
];

export default function Agendamento({ route, navigation, agendamentos = [], onAdicionarAgendamento }) {
  const service = route?.params?.service || {};

  const [selectedDay, setSelectedDay] = useState('21');
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoAtual, setAgendamentoAtual] = useState(null);

  // Filtra os horários que já foram agendados para o dia selecionado
  const bookedTimesForSelectedDay = agendamentos
    .filter((ag) => String(ag.date) === String(selectedDay))
    .map((ag) => ag.time);

  const handleConfirm = () => {
    if (!selectedTime) {
      Alert.alert('Atenção', 'Por favor, selecione um horário antes de confirmar.');
      return;
    }

    const novoAgendamento = {
      id: Date.now().toString(),
      serviceName: service.name || 'Serviço',
      price: service.price || 'R$ 0,00',
      date: String(selectedDay),
      time: selectedTime,
    };

    if (typeof onAdicionarAgendamento === 'function') {
      onAdicionarAgendamento(novoAgendamento);
    }

    setAgendamentoAtual(novoAgendamento);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTime(null);
    navigation.navigate('outrapag');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* RESUMO DO SERVIÇO */}
        <View style={styles.serviceSummary}>
          <Text style={styles.summaryLabel}>SERVIÇO SELECIONADO</Text>
          <Text style={styles.serviceTitle}>{service.name || 'Serviço'}</Text>
          <Text style={styles.servicePrice}>
            {service.price || 'R$ 0,00'} • {service.time || '0 min'}
          </Text>
        </View>

        {/* SELEÇÃO DE DIA */}
        <Text style={styles.sectionTitle}>ESCOLHA O DIA</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysContainer}>
          {daysOfWeek.map((item) => (
            <TouchableOpacity
              key={item.date}
              onPress={() => {
                setSelectedDay(item.date);
                setSelectedTime(null);
              }}
              style={[styles.dayCard, selectedDay === item.date && styles.selectedDayCard]}
            >
              <Text style={[styles.dayText, selectedDay === item.date && styles.selectedText]}>
                {item.day}
              </Text>
              <Text style={[styles.dateText, selectedDay === item.date && styles.selectedText]}>
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SELEÇÃO DE HORÁRIO */}
        <Text style={styles.sectionTitle}>HORÁRIOS DISPONÍVEIS</Text>
        <View style={styles.timeGrid}>
          {allTimes.map((time) => {
            const isBooked = bookedTimesForSelectedDay.includes(time);
            const isSelected = selectedTime === time;

            return (
              <TouchableOpacity
                key={time}
                disabled={isBooked}
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.timeCard,
                  isSelected && styles.selectedTimeCard,
                  isBooked && styles.disabledTimeCard,
                ]}
              >
                <Text style={[
                  styles.timeText,
                  isSelected && styles.selectedTimeText,
                  isBooked && styles.disabledTimeText,
                ]}>
                  {isBooked ? 'Ocupado' : time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>CONFIRMAR AGENDAMENTO</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* COMPROVANTE / MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.iconBadge}>
              <Text style={styles.iconCheck}>✓</Text>
            </View>

            <Text style={styles.modalTitle}>Horário Agendado!</Text>
            <Text style={styles.modalSubtitle}>Seu agendamento foi realizado com sucesso.</Text>

            <View style={styles.receiptBox}>
              <Text style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Serviço: </Text>{agendamentoAtual?.serviceName}
              </Text>
              <Text style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Data: </Text>Dia {agendamentoAtual?.date}
              </Text>
              <Text style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Horário: </Text>{agendamentoAtual?.time}
              </Text>
              <Text style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Valor: </Text>{agendamentoAtual?.price}
              </Text>
              <Text style={styles.receiptItem}>
                <Text style={styles.receiptLabel}>Local: </Text>Rua Cirne Maia, 126
              </Text>
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK, ENTENDI</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  content: { padding: 20 },
  serviceSummary: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#D4AF37', marginBottom: 25 },
  summaryLabel: { color: '#D4AF37', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  serviceTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', marginTop: 5 },
  servicePrice: { color: '#999999', fontSize: 14, marginTop: 4 },
  sectionTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 15 },
  daysContainer: { marginBottom: 25 },
  dayCard: { backgroundColor: '#1E1E1E', width: 65, height: 75, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  selectedDayCard: { backgroundColor: '#D4AF37' },
  dayText: { color: '#999999', fontSize: 12 },
  dateText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  selectedText: { color: '#111111' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  timeCard: { backgroundColor: '#1E1E1E', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, width: '30%', alignItems: 'center' },
  selectedTimeCard: { backgroundColor: '#D4AF37' },
  disabledTimeCard: { backgroundColor: '#2A2A2A', borderColor: '#444444', borderWidth: 1, opacity: 0.5 },
  timeText: { color: '#FFFFFF', fontWeight: 'bold' },
  selectedTimeText: { color: '#111111' },
  disabledTimeText: { color: '#777777', textDecorationLine: 'line-through', fontSize: 12 },
  confirmButton: { backgroundColor: '#D4AF37', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  confirmButtonText: { color: '#111111', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { backgroundColor: '#1E1E1E', width: '100%', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#D4AF37' },
  iconBadge: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  iconCheck: { color: '#111111', fontSize: 30, fontWeight: 'bold' },
  modalTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  modalSubtitle: { color: '#999999', fontSize: 13, textAlign: 'center', marginTop: 5, marginBottom: 20 },
  receiptBox: { backgroundColor: '#111111', width: '100%', borderRadius: 12, padding: 16, marginBottom: 20 },
  receiptItem: { color: '#FFFFFF', fontSize: 14, marginVertical: 4 },
  receiptLabel: { color: '#D4AF37', fontWeight: 'bold' },
  modalButton: { backgroundColor: '#D4AF37', width: '100%', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  modalButtonText: { color: '#111111', fontSize: 13, fontWeight: '900', letterSpacing: 1 },
});