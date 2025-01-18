import { query } from "../database/sqlite.js";

async function Inserir(nomeDoutor, email, especialidade, password) {

    let sql = `INSERT INTO user(nomeDoutor, email, especialidade, password) VALUES (?, ?, ?, ?) RETURNING idUser`;

    const user = await query(sql, [nomeDoutor, email, especialidade, password]);

    return user[0];
}

async function ListarByEmail(email) {

    let sql = `select * from user where email = ?`;

    const user = await query(sql, [email]);

    if (user.length == 0)
        return[];
    else
        return user[0];
}

async function Profile(idUser) {

    let sql = `select idUser, nomeDoutor, email, especialidade from user where idUser = ?`;

    const user = await query(sql, [idUser]);

    return user[0];
}

async function ListarServicesByUser(idUser) {

    let sql = `select idProcedimento, nome, valor from procedimentos
                where idUser = ?;`

    const serv = await query(sql, [idUser]);

    return serv;
}

export default { Inserir, ListarByEmail, Profile, ListarServicesByUser };