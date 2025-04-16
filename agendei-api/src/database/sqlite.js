import Database from 'better-sqlite3';

// Cria a conexão com o banco de dados
const db = new Database('./src/database/banco.db', {
  readonly: false, // true se quiser apenas leitura
  fileMustExist: true // lança erro se o arquivo não existir
});

// Função para executar comandos (get, all, run) de forma genérica
function query(command, params = [], method = 'all') {
  try {
    const stmt = db.prepare(command);

    switch (method) {
      case 'get':
        return stmt.get(...params);
      case 'run':
        return stmt.run(...params);
      case 'all':
      default:
        return stmt.all(...params);
    }
  } catch (error) {
    console.error("Erro ao executar query:", error.message);
    throw error;
  }
}

export { db, query };
