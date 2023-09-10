const express = require('express');
const router =  express.Router();

const newLocal = '../controllers/customercontroller';
const customerController = require(newLocal);

//Lista De Solicitudes Gerente
router.get('/gr', customerController.listgr);

//Crear Solicitud Asistente
router.post('/add',customerController.save);

//Crear Solicitud Gerente
router.post('/addgr',customerController.savegr);

//Borrar Solicitud
router.get('/delete/:ID',customerController.delete);

//Aprobacion Solicitudes
router.get('/update/:ID', customerController.edit);
router.post('/update/:ID', customerController.update);


//Productos
router.get('/prods', customerController.prods);
router.get('/cprod', customerController.cprod);
router.post('/cprod', customerController.savprod);
router.get('/edtprod/:IDPa', customerController.edtprod);
router.post('/crsoli/:IDPa', customerController.addsoli);

//Login Funcionario
router.get('/logr', customerController.logr);
router.post('/logr', customerController.logf);

//Usuarios
router.get('/user', customerController.user);
router.get('/nuser', customerController.nuser);
router.post('/nuser', customerController.nuserv);

//Actualiza Clientes
router.get('/edtclient/:Codcli', customerController.edtcli);
router.post('/edtclient/:Codcli', customerController.updcli);

//Actualizar Usuarios
router.get('/edtuser/:Empfun', customerController.edtusr);
router.post('/edtuser/:Empfun', customerController.updusr);


//Receta Medica
router.get('/clirecet/:Idcon', customerController.clirecet);

//Login De Doctor 
router.get('/logdr', customerController.logdr);
router.post('/logdr', customerController.logdre);

//Menu Doctor
router.get('/mendr/:User', customerController.mendr);

//Horarios Doctor
router.get('/hrdoc', customerController.hrdoc);
router.post('/hrdoc', customerController.adhrdoc);


//Muestra Consulta Alta De Secretaria
router.get('/upconsul/:Idcon', customerController.upconsul);
router.post('/upconsul/:Idcon', customerController.upconsult);

//Muestra Consulta Alta De Secretaria
router.get('/refespe/:Idcon', customerController.refespe);
router.post('/refespe/:Idcon', customerController.uprefespe);

//Muestra Doctores - Especialistas
router.get('/especialist', customerController.especialist);
router.get('/generali', customerController.generali);


//Login De Especialista
router.get('/logdresp', customerController.logdresp);
router.post('/logdresp', customerController.logdreesp);

//Menu Especialista
router.get('/mendresp/:User', customerController.mendresp);

//Login De Especialista
router.get('/logadmin', customerController.logadmin);
router.post('/logadmin', customerController.logadmi);

//Menu Especialista
router.get('/menadmin/:User', customerController.menadmin);

//Consulta Especialista
router.get('/conesp/:IDPa', customerController.conesp);
router.post('/conesp/:IDPa', customerController.adconesp);


//Muestre Referidos a Especialista
router.get('/ref', customerController.ref);


//Asigna Especialista
router.get('/asigesp/:Idcon', customerController.asigesp);
router.post('/asigesp/:Idcon', customerController.upasigesp);

//Historial Medico General
router.get('/history/:IDPa', customerController.history);

//Historial Medico Especialista
router.get('/histclie/:IDPa', customerController.histclie);

//Muestra Fin De Consulta
router.get('/fnconsul/:Idcon', customerController.fnconsul);
router.post('/fnconsul/:Idcon', customerController.upfnconsul);

//Registra De Cliente
router.get('/logcli', customerController.logcli);
router.post('/logcli', customerController.adlogcli);

//Login De Cliente MED-MOVIL
router.get('/sessioncli', customerController.sessicli);
router.post('/sessioncli', customerController.sessioncli);

//Menu De Cliente
router.get('/mncli/:IDClie', customerController.mencli);

//Actualiza Cliente MED-MOVIL
router.get('/upcli/:IDClie', customerController.upclie);
router.post('/upcli/:IDClie', customerController.upcli);

//Muestra Medicos Generales MED
router.get('/docmed/:IDClie', customerController.docmed);

//Consulta Medico General MED
router.get('/conmedg/:IDH', customerController.conmedg);
router.post('/conmedg/:IDClie', customerController.addconmedg);

//Actualiza Horario Medico General
router.get('/hourgen/:IDH', customerController.hourgen);
router.post('/hourgen/:IDH', customerController.uphourgen);

//Genera orden de pago Medigo General-Especialista
router.get('/orderpay', customerController.orderpay);

//Genera orden de pago Medigo General-Especialista
router.get('/orderpayesp', customerController.orderpayesp);

//Muestra Fin De Consulta-Secretari@
router.get('/fnconsulsecre/:Idcon', customerController.fnconsulsecre);
router.post('/fnconsulsecre/:Idcon', customerController.upfnconsulsecre);

module.exports = router;