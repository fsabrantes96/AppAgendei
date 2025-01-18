import { query } from "../database/sqlite.js";

async function Listar(idUser) {

    let sql = `select  a.idAppointment, p.nome as nome_procedimento, u.nomeDoutor, u.especialidade,
    a.data, a.horario, c.nome as nome_cliente, p.valor
    from appointment a
    join procedimentos p on (p.idProcedimento = a.idProcedimento)
    join user u on (u.idUser = a.idUser)
    join clientes c on (c.idCliente = a.idCliente)
    where a.idUser = ?
    order by a.data, a.horario`;

    const appointments = await query(sql, idUser);

    return appointments;
}

async function Inserir( idCliente, idProcedimento, idUser, data, horario) {

    console.log("Valores enviados para a query:", { idCliente, idProcedimento, idUser, data, horario });

    let sql = `insert into appointment(idCliente, idProcedimento, idUser, data, horario)
    values(?, ?, ?, ?, ?) returning idAppointment`;

    const appointment = await query(sql, [idCliente, idProcedimento, idUser, data, horario]);

    return appointment[0];
}

async function Excluir( idUser, idAppointment) {

    let sql = `delete from appointment where idAppointment = ? 
    and idUser = ?`;

    await query(sql, [idAppointment, idUser]);

    return { idAppointment };
}


export default { Listar, Inserir, Excluir };