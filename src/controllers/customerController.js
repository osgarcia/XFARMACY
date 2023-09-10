const connection = require("express-myconnection");
const bcryptjs = require("bcryptjs");
const { Result } = require("express-validator");
const stripe = require('stripe')('sk_test_51NoKp9JNkXDc99lCXz8FZCz8wxAqOPqGBBfiIL1kOHXsRGlRmwdeHomPfVCtvrfN2GwMJgItis4MwTrNisoyeNAI00lg1ybONB');


const controller = {};


//Lista las Solicitudes Creas Bandeja De Gerente
controller.listgr = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from venprod', (err, customers_gr) =>{
            if(err) {
                res.json(err);
            }
            res.render('customers_gr',{
                data: customers_gr
            });
            
        });
    });
};


//Crea Solicitudes
controller.save = (req, res) => {
 
 const data = req.body;   
 
 req.getConnection((err, conn) => {
    conn.query('insert into venprod set ?', [data], (err, rows) => {
        console.log(rows);
        res.redirect('/gr');
    })
 })
};

//Crea Solicitudes En Usuario de Gerente
controller.savegr = (req, res) => {
    const data = req.body;   
   
    req.getConnection((err, conn) => {
       conn.query('insert into venprod set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/gr');
       })
    })
   };


//Muestra Datos De Solicitud Previo a Autorizar
controller.edit = (req, res) => {
    const ID = req.params.ID;
    req.getConnection((err, conn) => {
        conn.query('select * from venprod where ID = ?', [ID], (err, customer) => {
          res.render('customer_edit', {
            data: customer[0]
          });
        });

    }); 

    
};

//Aprueba Solicitud Bandeja De Asistente
controller.update = (req, res) => {
    const Stcompr = req.body.Stcompr
    const ID = req.params.ID;  
    //const STC = req.body.STC;
    req.getConnection((err, conn) => {
        conn.query('update venprod set Stcompr = ? where ID = ?;', [Stcompr, ID], async (err, rows) => {
          console.log(rows);
          res.redirect('/gr');      
   
    });
    });
};

//Deniega Solicitud
controller.delete = (req, res) => {
    const ID = req.params.ID;
    
    req.getConnection((err, conn) => {
        conn.query('delete from venprod where ID = ?', [ID], (err, rows) => {
        res.redirect('/gr'); 
        });
    });
    
};


//Muestra Productos Activos
controller.prods = (req, res) => {
    //const User = req.session.User 
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join fusers b on a.climed = b.User', (err, customer_prod) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_prod', {
            data: customer_prod,
            login: true,
            User: req.session.User
        });
        });
       
    });
}
};

//Muestra Formulario de Producto Previo a Creacion
controller.cprod = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from pacien', (err, customers_crprod) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_crprod', {
            data: customers_crprod
        });
        });
       
    });
};


//Guarda Pacientes
controller.savprod = (req, res) => {
    const data = req.body;   
   
    req.getConnection((err, conn) => {
       conn.query('insert into pacien set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods');
       });
    });
};

//Muestra Formulario de Consulta Paciente
controller.edtprod = (req, res) => {
    const IDPa = req.params.IDPa;
    req.getConnection((err, conn) => {
        conn.query('select * from pacien where IDPa = ?', [IDPa], (err, customer_edtprod) => {
          res.render('customer_edtprod', {
            data: customer_edtprod[0]
          });
        });

    }); 

    
};

//Inserta Consulta del Paciente
controller.addsoli = (req, res) => {
    const data = req.body;   
    
    req.getConnection((err, conn) => {
       conn.query('insert into cliconsul set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods');
       })
    })
   };



   //Muestra Login de Secretaria 
controller.logr = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logingr) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logingr', {
            data: customers_logingr
        });
        });
       
    });
};

//Login De Secretaria
controller.logf = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ?' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logingr',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logingr'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User
                res.redirect('/prods');
                
            }
        });
    });
};
};

//Muestra Modulo de Usuarios Activos
controller.user = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customer_users) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_users', {
            data: customer_users
        });
        });
       
    });
};

//Muestra Formulario de Usuarios Previo a su Creacion
controller.nuser = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customer_nuser) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_nuser', {
            data: customer_nuser
        });
        });
       
    });
};


//Crea Nuevos Usuarios
controller.nuserv = async (req, res) => {
 
    const Nuser = req.body.Nuser;
    const User = req.body.User;
    const Pass = req.body.Pass;
    const DPI = req.body.DPI;
    const Fecingre = req.body.Fecingre;
    const Rol = req.body.Rol;
    const Dresp = req.body.Dresp;    
    let passwordHash = await bcryptjs.hash(Pass, 8);
    req.getConnection((err, conn) => {
       conn.query('insert into fusers set ?', {Nuser:Nuser, User:User, Pass:passwordHash, DPI:DPI, Fecingre:Fecingre, Rol:Rol, Dresp:Dresp}, async (err, rows) => {
           console.log(rows);
           res.redirect('/user');
       });
    });
   };

   //Muestra formulario de Usuarios Previo a Actualizar
   controller.edtusr = (req, res) => {
    const ID = req.params.ID;
    req.getConnection((err, conn) => {
        conn.query('select * from fusers where ID = ?', [ID], (err, customer_editusr) => {
          res.render('customer_editusr', {
            data: customer_editusr[0]
          });
        });

    }); 

    
};

//Actualiza Usuarios
controller.updusr = (req, res) => {
    const ID = req.params.ID;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('update fusers set ? where ID = ?', [newCustomer, ID],(err, rows) => {
          console.log(rows);
          res.redirect('/user');       
        });
    });
};

//Muestra formulario de Clientes Previo a Actualizar
controller.edtcli = (req, res) => {
    const Codcli = req.params.Codcli;
    req.getConnection((err, conn) => {
        conn.query('select * from clmte where Codcli = ?', [Codcli], (err, customer_edtclint) => {
          res.render('customer_edtclint', {
            data: customer_edtclint[0]
          });
        });

    }); 

    
};

//Actuliza Clientes
controller.updcli = (req, res) => {
    const Codcli = req.params.Codcli;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('update clmte set ? where Codcli = ?', [newCustomer, Codcli],(err, rows) => {
          console.log(rows);
          res.redirect('/cli');       
        });
    });
};


//Muestra Receta
controller.clirecet = (req, res) => {
    const Idcon = req.params.Idcon;
    //const Fecconsul = req.body.Fecconsul;
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join cliconsul b  on a.Noclie = b.Nocli Where Idcon = ?', [Idcon], (err, customer) => {
          res.render('customer_clirecet', {
            data: customer
          });
        });

    }); 

};


//Muestra Login de Doctor
controller.logdr = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logdre) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logdre', {
            data: customers_logdre
        });
        });
       
    });
};

//Login De Doctor
controller.logdre = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;
    
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ?' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logdre',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logdre'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User;
                req.session.Nuser = rows[0].Nuser;
                res.redirect('/mendr/' + User);
                
            }
        });
    });
};
};


//Menu De Doctor
controller.mendr = (req, res) => {
    const User = req.session.User
    const Nuser = req.session.Nuser 
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join fusers b on a.climed = b.User left join cliconsul c on a.IDPa = c. IDPa Where b.User = ? and stcconsul = "G"',[User], (err, customer_mndoc) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_mndoc', {
            data: customer_mndoc,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser
        });
        });
       
    });
}
};



//Muestra Formulario De Horario
controller.hrdoc = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from dochour', (err, customer_hrdoc) => {
          res.render('customer_hrdoc', {
            data: customer_hrdoc
          });
        });

    }); 

};


//Guarda Horario
controller.adhrdoc = (req, res) => {
    const data = req.body;   
    const User = req.session.User;
    req.getConnection((err, conn) => {
       conn.query('insert into dochour set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/mendr/' + User);
       });
    });
};

//Muestra Formulario de Consulta Paciente
controller.upconsul = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_upconsul) => {
          res.render('customer_upconsul', {
            data: customer_upconsul[0]
          });
        });

    }); 

    
};

//Actualiza Consulta Genera Receta Completa
controller.upconsult = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/mendr/' + User);       
        });
    });
};

//Muestra Formulario de Referir Especialista
controller.refespe = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_refespeciali) => {
          res.render('customer_refespeciali', {
            data: customer_refespeciali[0]
          });
        });

    }); 

    
};

//Actualiza Especialista
controller.uprefespe = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/mendr/' + User);       
        });
    });
};

//Muestra Especialistas
controller.especialist = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from fusers a left join dochour b on a.ID = b.IDD where Dresp <> "GEN" and fecaten >= current_date()', (err, customer_especialist) => {
          res.render('customer_especialist', {
            data: customer_especialist
          });
        });

    }); 

    
};

//Muestra Muestra Generales
controller.generali = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from fusers a left join dochour b on a.ID = b.IDD where Dresp = "GEN" and fecaten >= current_date()', (err, customer_especialist) => {
          res.render('customer_especialist', {
            data: customer_especialist
          });
        });

    }); 

    
};


//Muestra Login de Especialista
controller.logdresp = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logespec) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logespec', {
            data: customers_logespec
        });
        });
       
    });
};

//Login De Especialista
controller.logdreesp = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;
    
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ?' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logespec',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logespec'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User,
                req.session.Dresp = rows[0].Dresp,
                res.redirect('/mendresp/' + User);
                
            }
        });
    });
};
};


//Menu De Especialista
controller.mendresp = (req, res) => {
    const User = req.session.User
    const Esp = req.session.Dresp 
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select * from fusers a left join cliconsul b on a.Nuser = b.medesp left join pacien c on b.IDPa = c.IDPa where User = ? and Tipespec = ? and stcconsul = "E"',[User, Esp], (err, customer_mnespecia) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_mnespecia', {
            data: customer_mnespecia,
            login: true,
            User: req.session.User
        });
        });
       
    });
}
};



//Muestra Login de Administrador
controller.logadmin = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logadmin) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logadmin', {
            data: customers_logadmin
        });
        });
       
    });
};

//Login De Especialista
controller.logadmi = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;
    
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ?' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logadmin',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logadmin'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User
                res.redirect('/menadmin/' + User);
                
            }
        });
    });
};
};


//Menu De Administrador
controller.menadmin = (req, res) => {
     
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customer_users) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_users', {
            data: customer_users,
            login: true,
            User: req.session.User
        });
        });
       
    });
}
};


//Muestra Formulario de Consulta Paciente
controller.conesp = (req, res) => {
    const IDPa = req.params.IDPa;
    req.getConnection((err, conn) => {
        conn.query('select * from pacien where IDPa = ?', [IDPa], (err, customer_espconsul) => {
          res.render('customer_espconsul', {
            data: customer_espconsul[0]
          });
        });

    }); 

    
};

//Inserta Consulta del Paciente
controller.adconesp = (req, res) => {
    const data = req.body;      
    req.getConnection((err, conn) => {
       conn.query('insert into cliconsul set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods');
       })
    })
   };


//Muestre Referidos a Especialista
controller.ref = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where stcconsul = "E"', (err, customer_ref) => {
          res.render('customer_ref', {
            data: customer_ref
          });
        });

    }); 

    
};

//Muestra Formulario Para Asignar Especialista
controller.asigesp = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_asigespe) => {
          res.render('customer_asigespe', {
            data: customer_asigespe[0]
          });
        });

    }); 

    
};

//Actualiza Especialista
controller.upasigesp = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    //const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/ref');       
        });
    });
};


//Muestra Historial Medico General
controller.history = (req, res) => {
    const IDPa = req.params.IDPa
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where IDPa = ?',[IDPa], (err, customer_histcli) => {
          res.render('customer_histcli', {
            data: customer_histcli
          });
        });

    }); 

    
};

//Muestra Historial Medico Especialista
controller.histclie = (req, res) => {
    const IDPa = req.params.IDPa
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where IDPa = ?',[IDPa], (err, customer_histclie) => {
          res.render('customer_histclie', {
            data: customer_histclie
          });
        });

    }); 

    
};

//Muestra Formulario Para Finalizar Consulta
controller.fnconsul = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_finconsul) => {
          res.render('customer_finconsul', {
            data: customer_finconsul[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upfnconsul = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/mendresp/' + User);       
        });
    });
};

//Muestra Registro De Cliente
controller.logcli = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from cliusers', (err, customers_logclie) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logclie', {
            data: customers_logclie
        });
        });
       
    });
};

controller.adlogcli = async (req, res) => {
    const Clinomb = req.body.Clinomb;
    const Clinumb = req.body.Clinumb;
    const username = req.body.username;
    const pass = req.body.pass;  
    let passwordHash = await bcryptjs.hash(pass, 8);
    req.getConnection((err, conn) => {
       conn.query('insert into cliusers set ?', {Clinomb:Clinomb, Clinumb:Clinumb, username:username, pass:passwordHash}, async (err, rows) => {
           console.log(rows);
           res.redirect('/logcli');
       });
    });
   };


//Muestra Login de Cliente
controller.sessicli = (req, res) => {
       
    req.getConnection((err, conn) => {
        conn.query('select * from cliusers', (err, customers_sessionclie) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_sessionclie', {
            data: customers_sessionclie
        });
        });
       
    });
};

//Login De Cliente
controller.sessioncli = async (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;  
    let passwordHash = await bcryptjs.hash(pass, 8);
    if(username && pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from cliusers where username = ?' ,[username], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(pass, rows[0].pass))){
                res.render('customer_sessionclie',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_sessionclie'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.Clinomb = rows[0].Clinomb,
                req.session.IDClie = rows[0].IDClie
                res.redirect('/mncli/: IDClie');
                
            }
        });
    });
};
};

//Menu De Cliente
controller.mencli = (req, res) => {
    const IDClie = req.session.IDClie  
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliusers  where IDClie = ?',[IDClie], (err, customer) => {
            if(err) {
                res.json(err);
            }
        res.render('customer', {
            data: customer,
            login: true,
            Clinomb: req.session.Clinomb,
            username: req.session.username,
            IDClie: req.session.IDClie
        });
        });
       
    });
}
};

//Actualiza Cliente MED-MOVIL
controller.upclie = (req, res) => {
    const IDClie = req.session.IDClie
    
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliusers  where IDClie = ?',[IDClie], (err, customer_upcliinf) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_upcliinf', {
            data: customer_upcliinf[0],
            login: true,
            Clinomb: req.session.Clinomb,
            username: req.session.username,
            IDClie: req.session.IDClie
        });
        });
       
    });
}
};

//Actualiza Informacion De Cliente Med-Movil
controller.upcli = (req, res) => {
    const IDClie= req.params.IDClie;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('update cliusers set ? where IDClie = ?', [newCustomer, IDClie],(err, rows) => {
          console.log(rows);
          res.redirect('/mncli/' + IDClie);       
        });
    });
};

//Muestra Horario Medicos Generales MED
controller.docmed = (req, res) => {  
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers a left join dochour b on a.ID = b.IDD where  Dresp = "GEN" and fecaten >= current_date()', (err, customer_dochourmed) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_dochourmed', {
            data: customer_dochourmed,
            login: true,
            Clinomb: req.session.Clinomb,
            username: req.session.username,
            IDClie: req.session.IDClie
        });
        });
       
    });
}
};


//Muestra Formulario de Consulta Paciente-MED Movil
controller.conmedg = (req, res) => {
    const IDH = req.params.IDH
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from dochour a left join fusers b on  a.Ndoc = b.Nuser where IDH = ?',[IDH], (err, customer_agcitag) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_agcitag', {
            data: customer_agcitag[0],
            login: true,
            Clinomb: req.session.Clinomb,
            username: req.session.username,
            IDClie: req.session.IDClie
        });
        });
       
    });
}
};

//Inserta Consulta del Paciente
controller.addconmedg = (req, res) => {
    const DI_IDPa = req.body.IDPa;
    const DS_Nocli = req.body.Nocli;
    const DS_Fecconsul = req.body.Fecconsul;
    const DS_clihour = req.body.clihour;
    const DS_Moticonsul = req.body.Moticonsul;
    const DS_Histenf = req.body.Histenf;
    const DS_Tipespec = req.body.Tipespec;
    const DS_medesp = req.body.medesp;
    const DI_IDH = req.body.IDH;
    const IDClie = req.session.IDClie;
    req.getConnection((err, conn) => {
       conn.query('CALL SP_CITAMEDMOVIL(? , ?, ?, ?, ?, ?, ?, ?, ?)', [DI_IDPa, DS_Nocli, DS_Fecconsul, DS_clihour, DS_Moticonsul, DS_Histenf, DS_Tipespec, DS_medesp, DI_IDH ], (err, rows) => {
           console.log(rows);
           res.redirect('/docmed/' + IDClie);
       })
    })
   };



//Muestra Formulario Horario Medico General
controller.hourgen = (req, res) => {
    const IDH = req.params.IDH;
    req.getConnection((err, conn) => {
        conn.query('select * from dochour where IDH = ?', [IDH], (err, customer_uphorgen) => {
          res.render('customer_uphourgen', {
            data: customer_uphorgen[0]
          });
        });

    }); 

    
};

//Actualiza Horario Medico General
controller.uphourgen = (req, res) => {
    const IDH = req.params.IDH;
    const newCustomer = req.body;
    //const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update dochour set ? where IDH = ?', [newCustomer, IDH],(err, rows) => {
          console.log(rows);
          res.redirect('/ref');       
        });
    });
};

//Muestra Productos Activos
controller.orderpay = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join fusers b on a.climed = b.User left join cliconsul c on a.IDPa = c. IDPa Where stcconsul = "A" and tipespec = "GEN"', (err, customer_paygen) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_paygen', {
            data: customer_paygen,
        });
        });
       
    });

};


//Muestra Formulario Para Finalizar Consulta
controller.fnconsulsecre = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_fnconsulsecre) => {
          res.render('customer_fnconsulsecre', {
            data: customer_fnconsulsecre[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upfnconsulsecre = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/orderpay');       
        });
    });
};

//Muestra Productos Activos
controller.orderpayesp = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where stcconsul = "A" and Tipespec <> "GEN"', (err, customer_payesp) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_payesp', {
            data: customer_payesp,
        });
        });
       
    });

};

 module.exports = controller;