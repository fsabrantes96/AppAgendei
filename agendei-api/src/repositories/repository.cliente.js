import { query } from "../database/sqlite.js";

async function Listar(name) {

    let filtro = [];

    let sql = "select * from clientes order by (nome); ";

    if (name) {
        sql = sql + "where nome like ? ";
        filtro.push('%' + name + '%');
    }


    sql = sql + "order by nome"

    const clientes = await query(sql, filtro);

    return clientes;
}

async function Inserir(nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone) {
    let sql = `insert into clientes(nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone)
    values(?, ?, ?, ?, ?, ?, ?, ?) returning idCliente`;

    const clientes = await query(sql, [nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone]);

    return clientes[0];
}


async function Editar(idCliente, nome, email, telefone, cpf, dataNascimento) {

    let sql = `update clientes set nome=?, email=?, telefone=?, cpf=?, dataNascimento=?
                where idCliente = ?`;

    await query(sql, [nome, email, telefone, cpf, dataNascimento, idCliente]);

    return {idCliente};
}

async function Excluir(idCliente) {

    let sql = `delete from clientes where idCliente = ?`;

    await query(sql, [idCliente]);

    return {idCliente};
}

async function ListarServicos(idCliente) {

    let sql = `select d.idAgendamento, d.idCliente, p.nome, d.horario, d.data, d.observacoes, p.valor
    from agendamento d
    join procedimentos p on (p.idProcedimento = d.idProcedimento)
    where d.idCliente = ?
    order by d.horario;`;

    const serv = await query(sql, [idCliente]);

    return serv;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };