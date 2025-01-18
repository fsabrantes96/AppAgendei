import repoAppointment from "../repositories/repository.appointment.js";

async function Listar(idUser) {

    const appointments = await repoAppointment.Listar(idUser);

    return appointments;
}

async function Inserir(idCliente, idProcedimento, idUser, data, horario) {

    const appointment = await repoAppointment.Inserir(idCliente, idProcedimento, idUser, data, horario);

    return appointment;
}

async function Excluir(idUser, idAppointment) {

    const appointment = await repoAppointment.Excluir(idUser, idAppointment);

    return appointment;
}

export default { Listar, Inserir, Excluir };