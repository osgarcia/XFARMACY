const express = require('express');
const router =  express.Router();

const newLocal = '../controllers/customercontroller';
const customerController = require(newLocal);

//Intranet
router.get('/', customerController.intranet);

//Productos
router.get('/prods/:User', customerController.prods);
router.get('/cprod/:User', customerController.cprod);
router.post('/cprod/:User', customerController.savprod);
router.get('/edtprod/:IDPa', customerController.edtprod);
router.post('/crsoli/:IDPa', customerController.addsoli);

//Login Funcionario
router.get('/logr', customerController.logr);
router.post('/logr', customerController.logf);

//Usuarios
router.get('/nuser', customerController.nuser);
router.post('/nuser', customerController.nuserv);
router.post('/nuserF', customerController.nuserf);

//Actualiza Clientes
router.get('/edtclient/:Codcli', customerController.edtcli);
router.post('/edtclient/:Codcli', customerController.updcli);

//Actualizar Usuarios
router.get('/edtuser/:ID', customerController.edtusr);
router.post('/edtuser/:ID', customerController.updusr);

//Actualiza Pacientes
router.get('/edtpacien/:IDPa', customerController.edtpacien);
router.post('/edtpacien/:IDPa', customerController.uppacien);


//Receta Medica
router.get('/clirecet/:Idcon', customerController.clirecet);

//Login De Doctor 
router.get('/logdr', customerController.logdr);
router.post('/logdr', customerController.logdre);

router.post('/logflu', customerController.logflu);

//Menu Doctor
router.get('/mendr/:User', customerController.mendr);

//Horarios Doctor
router.get('/hrdoc/:User', customerController.hrdoc);
router.post('/hrdoc/:User', customerController.adhrdoc);

//Horarios Doctor Especialista
router.get('/hrdocesp/:User', customerController.hrdocesp);
router.post('/hrdocesp/:User', customerController.adhrdocesp);


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

//Login De Farmacia
router.get('/logfarma', customerController.logfar);
router.post('/logfarma', customerController.logfarma);

//Login De Bodega
router.get('/logbode', customerController.logbode);
router.post('/logbode', customerController.logbodeg);

//Login De Bodega
router.get('/loglabs', customerController.loglabs);
router.post('/loglabs', customerController.loglab);

//Menu Especialista
router.get('/menadmin/:User', customerController.menadmin);

//Laboratorio Intramed
router.get('/viewlabintra', customerController.viewlabintra);

//Referido Laboratorio
router.get('/labs', customerController.labs);

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

//Muestra Fin De Consulta General
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

//Muestra Modulo De Farmacia
router.get('/farma', customerController.farma);

//Muestra Menu de Farmacia
router.get('/farmacia', customerController.farmacia);

//Muestra Menu de Laboratorio
router.get('/mnlab', customerController.mnlab);

//Muestra Farmacia Intramed
router.get('/farmaintramed', customerController.farmaintramed);

//Muestra Detalle Medicamento
router.get('/detafarm/:ID', customerController.detafarm);

//Muestra Detalle Medicamento Intramed
router.get('/detafarmintramed/:ID', customerController.detafarmintramed);

//Muestra Factura
router.get('/viewfact/:Idcon', customerController.viewfact);

//Referidos A Farmacia
router.get('/reffarma', customerController.reffarma);

//Referidos A Farmacia Asistente
router.get('/reffarmaci', customerController.reffarmaci);

//Referidos A Farmacia
router.get('/reflab', customerController.reflab);

//Lista Productos Farmcia
router.get('/addfar/:Idcon', customerController.listfar);
router.post('/addfar/', customerController.savfar);

//Lista Productos Farmcia
router.get('/addfarci/:Idcon', customerController.listfarma);
router.post('/addfarci/', customerController.savfarma);

//Lista Productos Laboratorio a Factura
router.get('/addlab/:Idcon', customerController.listlab);
router.post('/addlab/:Idcon', customerController.savelab);


//Muestra Fin De Consulta-Farmacia
router.get('/fnfarma/:Idcon', customerController.fnfarma);
router.post('/fnfarma/:Idcon', customerController.upfnfarma);

//Muestra Fin De Consulta-Farmacia Asistente
router.get('/fnfarmaci/:Idcon', customerController.fnfarmaci);
router.post('/fnfarmaci/:Idcon', customerController.upfnfarmaci);

//Muestra Fin De Consulta-Laboratorio
router.get('/fnlabb/:Idcon', customerController.fnlab);
router.post('/fnlabb/:Idcon', customerController.upfnlab);

//Muestra Inventario De Farmacia
router.get('/invprod', customerController.invprod);

//Muestra Inventario De Laboratorio
router.get('/invlab', customerController.invlab);

//Muestra Menu de Bodega
router.get('/bodega', customerController.bodega);

//Muestra Menu de Laboratorio
router.get('/laboratorio', customerController.laboratorio);

//Muestra Inventario De Farmacia
router.get('/viewconsul', customerController.viewconsul);

//Soporte de Estado Consulta
router.get('/upstconsul/:Idcon', customerController.viewstconsul);
router.post('/upstconsul/:Idcon', customerController.upstconsul);

//Agrega Nuevos Productos
router.get('/addnewprod', customerController.viewnewprod);
router.post('/addnewprod', customerController.addnewprod);

//Agrega Nuevos Laboratorios
router.get('/addnewlab', customerController.viewnewlab);
router.post('/addnewlab', customerController.addnewlab);

//Actualiza Existencias
router.get('/addexismedsu/:ID', customerController.viewexismedsu);
router.post('/addexismedsu/:ID', customerController.addexismedsu);

//Actualiza Existencias
router.get('/addexismed/:ID', customerController.viewexismed);
router.post('/addexismed/:ID', customerController.addexismed);

//Actualiza Existencias
router.get('/addexislab/:ID', customerController.viewexislab);
router.post('/addexislab/:ID', customerController.addexislab);

//Reporte De Consultas
router.get('/viewreport', customerController.viewreport);

//Reporte De Ventas
router.get('/viewvent', customerController.viewvent);

//Reporte De Productos
router.get('/viewreprod', customerController.viewreprod);

//Reporte De Clientes Soporte
router.get('/repacien', customerController.repacien);

//Reporte De Clientes Secretaria
router.get('/viewreppacien', customerController.viewreppacien);

//Muestra - Actualiza Consulta Especialista
router.get('/upconsule/:Idcon', customerController.upconsule);
router.post('/upconsule/:Idcon', customerController.upconsulte);

//Muestra Fin De Consulta General
router.get('/fnconsule/:Idcon', customerController.fnconsule);
router.post('/fnconsule/:Idcon', customerController.upfnconsule);

//Login De Portal Med
router.get('/logportalmed', customerController.logportalmed);
router.post('/logportalmed', customerController.logportal);

//Login De Portal Med - Autorizador
router.get('/logautorizador', customerController.logautorizador);
router.post('/logautorizador', customerController.logauth);

//Menu Portal Med
router.get('/portalmed/:User', customerController.portalmed);

//Menu Portal Med - Jefe
router.get('/portalmedjf/:User', customerController.portalmedjf);

//Menu Nominas
router.get('/nominas/:User', customerController.nominas);

//Menu Boletas
router.get('/boletaene/:User', customerController.boletaene);
router.get('/boletafeb/:User', customerController.boletafeb);
router.get('/boletamar/:User', customerController.boletamar);
router.get('/boletaabr/:User', customerController.boletaabr);
router.get('/boletamay/:User', customerController.boletamay);
router.get('/boletajun/:User', customerController.boletajun);

//Menu Permisos
router.get('/permisos/:User', customerController.permisos);
router.post('/permisos/:User', customerController.addpermis);

//Vacaciones
router.get('/vacaciones/:User', customerController.vacaciones);

//paternidad
router.get('/paternidad/:User', customerController.paternidad);


//Aprobacion De Permisos
router.get('/aprobpermis/:ID', customerController.viewaprobsoli);
router.post('/aprobpermis/:ID', customerController.aprobsoli);

//Mi Personal
router.get('/mipersonal/:Nuser', customerController.mipersonal)

module.exports = router;