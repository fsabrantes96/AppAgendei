import bcrypt from "bcrypt";
import repoUser from "../repositories/repository.user.js"
import jwt from "../token.js";


async function Inserir(nomeDoutor, email, especialidade, password) {

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repoUser.Inserir(nomeDoutor, email, especialidade, hashPassword);

    user.token = jwt.CreateToken(user.idUser);

    return user;
}

async function Login(email, password) {

    const user = await repoUser.ListarByEmail(email);

    if (user.length == 0)
        return [];
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;

            user.token = jwt.CreateToken(user.idUser);

            return user;
        } else 
            return [];
    }

    return user;
}

async function Profile(idUser) {

    const user = await repoUser.Profile(idUser);

    return user;
}

async function ListarServicesByUser(idUser) {

    const serv = await repoUser.ListarServicesByUser(idUser);

    return serv;
}

export default { Inserir, Login, Profile, ListarServicesByUser };