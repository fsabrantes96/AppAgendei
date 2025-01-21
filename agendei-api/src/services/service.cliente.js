import repoCliente from "../repositories/repository.cliente.js"

async function Listar(name) {

    const clientes = await repoCliente.Listar(name);

    return clientes;
}

async function Inserir(nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone) {

    const clientes = await repoCliente.Inserir(nome, email, telefone, cpf, anamnese, dataNascimento, procedimentosAnteriores, icone);
    
    return clientes;
}


async function Editar(idCliente, nome, email, telefone, cpf, dataNascimento) {

    const clientes = await repoCliente.Editar(idCliente, nome, email, telefone, cpf, dataNascimento);

    return clientes;
}

async function Excluir(idCliente) {

    const clientes = await repoCliente.Excluir(idCliente);

    return clientes;
}

async function ListarServicos(idCliente) {

    const serv = await repoCliente.ListarServicos(idCliente);

    return serv;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };