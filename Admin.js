
import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  inicializarBanco,
  listarServicos,
  adicionarServico,
  atualizarServico,
  excluirServico,
} from './BancoDeDados';

export default function Admin({
  agendamentos = [],
  navigation,
  route,
}) {
  const autorizado = route.params?.adminAutenticado === true;

  const [servicos, setServicos] = useState([]);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [tempo, setTempo] = useState('');

  const [editandoId, setEditandoId] = useState(null);
  const [salvando, setSalvando] = useState(false);

  // =====================================
  // CARREGAR SERVIÇOS
  // =====================================

  const carregarServicos = async () => {
    try {
      await inicializarBanco();
      const dados = await listarServicos();
      setServicos(dados);
    } catch (erro) {
      console.log('Erro ao carregar serviços:', erro);
      Alert.alert('Erro', 'Não foi possível carregar os serviços.');
    }
  };

  useEffect(() => {
    if (autorizado) {
      carregarServicos();
    }
  }, [autorizado]);

  useEffect(() => {
    if (!autorizado) {
      navigation.replace('Login');
    }
  }, [autorizado, navigation]);

  if (!autorizado) {
    return null;
  }

  // =====================================
  // LIMPAR FORMULÁRIO
  // =====================================

  const limparFormulario = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setTempo('');
    setEditandoId(null);
  };

  // =====================================
  // CADASTRAR OU EDITAR
  // =====================================

  const salvarServico = async () => {
    if (
      !nome.trim() ||
      !descricao.trim() ||
      !preco.trim() ||
      !tempo.trim()
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os dados do serviço.'
      );
      return;
    }

    try {
      setSalvando(true);

      const novoServico = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        preco: preco.trim(),
        tempo: tempo.trim(),
      };

      if (editandoId !== null) {
        await atualizarServico(editandoId, novoServico);

        Alert.alert(
          'Sucesso',
          'Serviço atualizado!'
        );
      } else {
        await adicionarServico(novoServico);

        Alert.alert(
          'Sucesso',
          'Serviço cadastrado!'
        );
      }

      limparFormulario();
      await carregarServicos();

    } catch (erro) {
      console.log('Erro ao salvar:', erro);
      Alert.alert('Erro', 'Não foi possível salvar o serviço.');
    } finally {
      setSalvando(false);
    }
  };

  // =====================================
  // EDITAR SERVIÇO
  // =====================================

  const editarServico = (servico) => {
    setEditandoId(servico.id);
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setPreco(servico.preco);
    setTempo(servico.tempo);
  };

  // =====================================
  // EXCLUIR SERVIÇO
  // =====================================

  const confirmarExclusao = (id) => {
    Alert.alert(
      'Excluir serviço',
      'Tem certeza que deseja excluir este serviço?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await excluirServico(id);

              if (editandoId === id) {
                limparFormulario();
              }

              await carregarServicos();

              Alert.alert('Sucesso', 'Serviço excluído.');
            } catch (erro) {
              Alert.alert('Erro', 'Não foi possível excluir.');
            }
          },
        },
      ]
    );
  };

  // =====================================
  // TELA
  // =====================================

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >

        {/* CABEÇALHO */}

        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>
            PAINEL DO BARBEIRO
          </Text>

          <Text style={styles.headerSubtitle}>
            Total de Agendamentos: {agendamentos.length}
          </Text>
        </View>

        {/* GERENCIAR SERVIÇOS */}

        <Text style={styles.sectionTitle}>
          GERENCIAR SERVIÇOS
        </Text>

        <View style={styles.formCard}>

          <Text style={styles.formTitle}>
            {editandoId !== null
              ? 'EDITAR SERVIÇO'
              : 'CADASTRAR NOVO SERVIÇO'}
          </Text>

          <Text style={styles.label}>Nome do serviço</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Corte degradê"
            placeholderTextColor="#888"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Descrição</Text>

          <TextInput
            style={[styles.input, styles.inputDescricao]}
            placeholder="Descreva o serviço"
            placeholderTextColor="#888"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <Text style={styles.label}>Preço</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: R$ 40,00"
            placeholderTextColor="#888"
            value={preco}
            onChangeText={setPreco}
          />

          <Text style={styles.label}>Tempo de duração</Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 40 min"
            placeholderTextColor="#888"
            value={tempo}
            onChangeText={setTempo}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={salvarServico}
            disabled={salvando}
          >
            <Text style={styles.saveButtonText}>
              {salvando
                ? 'SALVANDO...'
                : editandoId !== null
                ? 'ATUALIZAR SERVIÇO'
                : 'CADASTRAR SERVIÇO'}
            </Text>
          </TouchableOpacity>

          {editandoId !== null && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={limparFormulario}
            >
              <Text style={styles.cancelButtonText}>
                CANCELAR EDIÇÃO
              </Text>
            </TouchableOpacity>
          )}

        </View>

        {/* SERVIÇOS CADASTRADOS */}

        <Text style={styles.sectionTitle}>
          SERVIÇOS CADASTRADOS ({servicos.length})
        </Text>

        {servicos.map((servico) => (

          <View key={servico.id} style={styles.card}>

            <Text style={styles.serviceName}>
              {servico.nome}
            </Text>

            <Text style={styles.description}>
              {servico.descricao}
            </Text>

            <View style={styles.details}>
              <Text style={styles.price}>
                {servico.preco}
              </Text>

              <Text style={styles.time}>
                ⏱️ {servico.tempo}
              </Text>
            </View>

            <View style={styles.actions}>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editarServico(servico)}
              >
                <Text style={styles.actionText}>
                  EDITAR
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmarExclusao(servico.id)}
              >
                <Text style={styles.actionText}>
                  EXCLUIR
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        ))}

        {/* AGENDAMENTOS */}

        <Text style={styles.sectionTitle}>
          PRÓXIMOS CLIENTES
        </Text>

        {agendamentos.length === 0 ? (

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum agendamento realizado no momento.
            </Text>
          </View>

        ) : (

          agendamentos.map((item, index) => (

            <View key={item.id || index} style={styles.card}>

              <Text style={styles.serviceName}>
                {item.serviceName}
              </Text>

              <Text style={styles.description}>
                📅 Dia {item.date} • ⏰ {item.time}
              </Text>

              <Text style={styles.price}>
                {item.price}
              </Text>

            </View>

          ))

        )}

      </ScrollView>

    </SafeAreaView>
  );
}

// =====================================
// ESTILOS
// =====================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  headerCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
    marginBottom: 25,
  },

  headerTitle: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 6,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 15,
    marginTop: 10,
  },

  formCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,
  },

  formTitle: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 12,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#292929',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 9,
    padding: 13,
    color: '#FFFFFF',
    fontSize: 14,
  },

  inputDescricao: {
    minHeight: 75,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 9,
    padding: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  saveButtonText: {
    color: '#111111',
    fontWeight: '900',
    fontSize: 12,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: '#999999',
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 10,
  },

  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },

  serviceName: {
    color: '#D4AF37',
    fontSize: 17,
    fontWeight: 'bold',
  },

  description: {
    color: '#BBBBBB',
    fontSize: 13,
    marginTop: 6,
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },

  price: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
  },

  time: {
    color: '#D4AF37',
    fontSize: 13,
    marginTop: 8,
  },

  actions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#3A3A3A',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#8B2525',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },

  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },

  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },

  emptyText: {
    color: '#777777',
    fontSize: 14,
    textAlign: 'center',
  },

});
