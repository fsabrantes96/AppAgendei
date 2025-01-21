import serviceCliente from "../services/service.cliente.js";

async function Listar(req, res) {

    const name = req.query.name;
    const clientes = await serviceCliente.Listar(name);

    res.status(200).json(clientes)
}

async function Inserir(req, res) {
    const { nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone } = req.body;

    try {
        const clientes = await serviceCliente.Inserir(
            nome,
            email,
            telefone,
            cpf,
            anamnese,
            dataNascimento,
            procedimentosAnteriores,
            icone
        );

        res.status(201).json(clientes);
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).json({ error: 'Erro ao inserir cliente' });
    }
}

async function Editar(req, res) {

    const idCliente = req.params.idCliente;
    const {nome, email, telefone, cpf, dataNascimento} = req.body;

    const clientes = await serviceCliente.Editar(idCliente, nome, email, telefone, cpf, dataNascimento);

    res.status(200).json(clientes)
}

async function Excluir(req, res) {

    const idCliente = req.params.idCliente;

    const clientes = await serviceCliente.Excluir(idCliente);

    res.status(200).json(clientes)
}

async function ListarServicos(req, res) {

    const idCliente = req.params.idCliente;
    const serv = await serviceCliente.ListarServicos(idCliente);

    res.status(200).json(serv)
}


export default { Listar, Inserir, Editar, Excluir, ListarServicos};