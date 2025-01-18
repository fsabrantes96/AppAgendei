import { Router } from "express";
import controllerCliente from "./controllers/controller.cliente.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointments from "./controllers/controller.appointment.js";
import jwt from "./token.js";


const router = Router();

router.get("/cliente", jwt.ValidateToken, controllerCliente.Listar);
router.post("/cliente", jwt.ValidateToken, controllerCliente.Inserir);
router.put("/cliente/:idCliente", jwt.ValidateToken, controllerCliente.Editar);
router.delete("/cliente/:idCliente", jwt.ValidateToken, controllerCliente.Excluir);
router.get("/cliente/:idCliente/services", jwt.ValidateToken, controllerCliente.ListarServicos);


//Users
router.post("/user/register", controllerUser.Inserir);
router.post("/user/login", controllerUser.Login);
router.get("/user/profile", jwt.ValidateToken, controllerUser.Profile);
router.get("/user/:idUser/services", jwt.ValidateToken, controllerUser.ListarServicesByUser);

// Reservas (appointments)...
router.get("/appointments", jwt.ValidateToken, controllerAppointments.ListarByUser);
router.post("/appointments", jwt.ValidateToken, controllerAppointments.Inserir);
router.delete("/appointments/:idAppointment", jwt.ValidateToken, controllerAppointments.Excluir);





export default router;