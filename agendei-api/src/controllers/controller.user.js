import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {

    const {nomeDoutor, email, especialidade, password} = req.body;

    const user = await serviceUser.Inserir(nomeDoutor, email, especialidade, password);

    res.status(201).json(user)
}

async function Login(req, res) {

    const {email, password} = req.body;

    const user = await serviceUser.Login(email, password);

    if (user.length == 0)
        res.status(401).json({error: "E-mail ou senha inválida"});
    else
        res.status(200).json(user)
}

async function Profile(req, res) {

    const idUser = req.idUser;
    const user = await serviceUser.Profile(idUser);

    res.status(200).json(user)
}

async function ListarServicesByUser(req, res) {

    const idUser = req.params.idUser;
    const serv = await serviceUser.ListarServicesByUser(idUser);

    res.status(200).json(serv)
}

export default { Inserir, Login, Profile, ListarServicesByUser };