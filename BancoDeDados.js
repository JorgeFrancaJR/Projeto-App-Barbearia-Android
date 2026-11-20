
import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync('barbearia.db');

// =====================================
// INICIALIZAR BANCO
// =====================================

export async function inicializarBanco() {
  const db = await dbPromise;

  // Tabela de usuários
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT NOT NULL,
      senha TEXT NOT NULL,
      tipo TEXT DEFAULT 'cliente'
    );
  `);

  // Tabela de serviços
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      preco TEXT NOT NULL,
      tempo TEXT NOT NULL
    );
  `);

  // Criar administrador padrão
  const admin = await db.getFirstAsync(
    "SELECT id FROM usuarios WHERE tipo = 'admin' LIMIT 1"
  );

  if (!admin) {
    await db.runAsync(
      `INSERT INTO usuarios
       (nome, email, telefone, senha, tipo)
       VALUES (?, ?, ?, ?, ?)`,
      [
        'Administrador',
        'admin@gmail.com',
        '',
        '12345678',
        'admin'
      ]
    );
  }

  // Inserir serviços iniciais somente se a tabela estiver vazia
  const resultado = await db.getFirstAsync(
    'SELECT COUNT(*) AS total FROM servicos'
  );

  if (resultado.total === 0) {
    const servicosIniciais = [
      {
        nome: 'Corte Tesoura',
        descricao: 'Corte completo na tesoura.',
        preco: 'R$ 35,00',
        tempo: '40 min',
      },
      {
        nome: 'Tesoura e Máquina',
        descricao: 'Degradê personalizado com acabamento preciso.',
        preco: 'R$ 45,00',
        tempo: '50 min',
      },
      {
        nome: 'Barba',
        descricao: 'Modelagem, toalha quente e acabamento.',
        preco: 'R$ 30,00',
        tempo: '30 min',
      },
      {
        nome: 'Corte + Barba',
        descricao: 'O combo completo para renovar o visual.',
        preco: 'R$ 65,00',
        tempo: '1h 10min',
      },
    ];

    for (const servico of servicosIniciais) {
      await db.runAsync(
        `INSERT INTO servicos
         (nome, descricao, preco, tempo)
         VALUES (?, ?, ?, ?)`,
        [
          servico.nome,
          servico.descricao,
          servico.preco,
          servico.tempo
        ]
      );
    }
  }

  return db;
}

// =====================================
// USUÁRIOS
// =====================================

export async function cadastrarUsuario(usuario) {
  const db = await dbPromise;

  try {
    await db.runAsync(
      `INSERT INTO usuarios
       (nome, email, telefone, senha, tipo)
       VALUES (?, ?, ?, ?, ?)`,
      [
        usuario.nome.trim(),
        usuario.email.trim().toLowerCase(),
        usuario.telefone.trim(),
        usuario.senha,
        'cliente'
      ]
    );

    return { sucesso: true };

  } catch (erro) {
    return {
      sucesso: false,
      mensagem: 'Este e-mail já está cadastrado.'
    };
  }
}

export async function fazerLogin(email, senha) {
  const db = await dbPromise;

  const usuario = await db.getFirstAsync(
    `SELECT id, nome, email, telefone, tipo
     FROM usuarios
     WHERE email = ? AND senha = ?`,
    [email.trim().toLowerCase(), senha]
  );

  return usuario || null;
}

// =====================================
// SERVIÇOS
// =====================================

// Listar serviços
export async function listarServicos() {
  const db = await dbPromise;

  return await db.getAllAsync(
    'SELECT * FROM servicos ORDER BY id DESC'
  );
}

// Cadastrar serviço
export async function adicionarServico(servico) {
  const db = await dbPromise;

  await db.runAsync(
    `INSERT INTO servicos
     (nome, descricao, preco, tempo)
     VALUES (?, ?, ?, ?)`,
    [
      servico.nome,
      servico.descricao,
      servico.preco,
      servico.tempo
    ]
  );
}

// Editar serviço
export async function atualizarServico(id, servico) {
  const db = await dbPromise;

  await db.runAsync(
    `UPDATE servicos
     SET nome = ?, descricao = ?, preco = ?, tempo = ?
     WHERE id = ?`,
    [
      servico.nome,
      servico.descricao,
      servico.preco,
      servico.tempo,
      id
    ]
  );
}

// Excluir serviço
export async function excluirServico(id) {
  const db = await dbPromise;

  await db.runAsync(
    'DELETE FROM servicos WHERE id = ?',
    [id]
  );
}
