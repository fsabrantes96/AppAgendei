import serviceAppointment from "../services/service.appointment.js";

async function ListarByUser(req, res) {

    const idUser = req.idUser;
    const appointments = await serviceAppointment.Listar(idUser);

    res.status(200).json(appointments)
}

async function Inserir(req, res) {

    const idUser = req.idUser;

    const {idCliente, idProcedimento, data, horario } = req.body;
    const appointment = await serviceAppointment.Inserir(idCliente, idProcedimento, idUser, data, horario);

    res.status(201).json(appointment)
}

async function Excluir(req, res) {

    const idUser = req.idUser;
    const idAppointment = req.params.idAppointment;

    const appointment = await serviceAppointment.Excluir(idUser, idAppointment);

    res.status(201).json(appointment)
}

export default { ListarByUser, Inserir, Excluir };