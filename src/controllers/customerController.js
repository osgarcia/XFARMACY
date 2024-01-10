const connection = require("express-myconnection");
const bcryptjs = require("bcryptjs");
const { Result } = require("express-validator");



const controller = {};



//Muestra Menu Secretari@
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
            User: req.session.User,
            Nuser: req.session.Nuser
        });
        });
       
    });
}
};

//Muestra Formulario de Producto Previo a Creacion
controller.cprod = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien', (err, customer_crprod) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_crprod', {
            data: customer_crprod,
            login: true,
            User: req.session.User
        });
        });
       
    });
};
};


//Guarda Pacientes
controller.savprod = (req, res) => {
    const data = req.body;
    const User = req.session.User
    req.getConnection((err, conn) => {
       conn.query('insert into pacien set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods/' + User);
       });
    });
};

//Muestra Formulario de Consulta Paciente
controller.edtprod = (req, res) => {
    const IDPa = req.params.IDPa;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien where IDPa = ?', [IDPa], (err, customer_edtprod) => {
          res.render('customer_edtprod', {
            data: customer_edtprod[0],
            login: true,
            User: req.session.User
          });
        });
    
    }); 
    }
    
};

//Inserta Consulta del Paciente
controller.addsoli = (req, res) => {
    const data = req.body;   
    const User = req.session.User;
    req.getConnection((err, conn) => {
       conn.query('insert into cliconsul set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods/' + User);
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
        conn.query ('select * from fusers where User = ? and Rol in ("SE", "SO", "AD", "DR") and drestat = "A"' ,[User], async(err, rows) =>{
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
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                res.redirect('/prods/' + User);
                
            }
        });
    });
};
};



//Muestra Formulario de Usuarios Previo a su Creacion
controller.nuser = (req, res) => {
    if(req.session.loggedin){  
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customer_nuser) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_nuser', {
            data: customer_nuser,
            login: true,
            User: req.session.User
        });
        });
       
    });

}
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
           res.redirect('/menadmin/' + User);
       });
    });
   };

//Crea Nuevos Usuarios- API
controller.nuserf = async (req, res) => {
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
           res.json({rows});
       });
    });
   };

   //Muestra formulario de Usuarios Previo a Actualizar
   controller.edtusr = (req, res) => {
    const ID = req.params.ID;
    if(req.session.loggedin){  
    req.getConnection((err, conn) => {
        conn.query('select * from fusers where ID = ?', [ID], (err, customer_editusr) => {
          res.render('customer_editusr', {
            data: customer_editusr[0],
            login: true,
            User: req.session.User
          });
        });

    }); 

} 
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
    if(req.session.loggedin){
    //const Fecconsul = req.body.Fecconsul;
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join cliconsul b  on a.Noclie = b.Nocli Where Idcon = ?', [Idcon], (err, customer) => {
          res.render('customer_clirecet', {
            data: customer,
            login: true,
            User: req.session.User
          });
        });

    }); 
}

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
        conn.query ('select * from fusers where User = ? and Rol = "DR" and Dresp = "GEN" and drestat = "A"' ,[User], async(err, rows) =>{
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
    const Nuser = req.session.Nuser
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers where Nuser = ? ',[Nuser], (err, customer_hrdoc) => {
          res.render('customer_hrdoc', {
            data: customer_hrdoc[0],
            login: true,
            User: req.session.User,
            ID: req.session.ID,
            Nuser: req.session.Nuser
          });
        });

    }); 
    }
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

//Muestra Formulario De Horario Especialista
controller.hrdocesp = (req, res) => {
    const Nuser = req.session.Nuser
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers where Nuser = ? ',[Nuser], (err, customer_hrdoc) => {
          res.render('customer_hrdoc', {
            data: customer_hrdoc[0],
            login: true,
            User: req.session.User,
            ID: req.session.ID,
            Nuser: req.session.Nuser
          });
        });

    }); 
    }
};


//Guarda Horario Especialista
controller.adhrdocesp = (req, res) => {
    const data = req.body;   
    const User = req.session.User;
    req.getConnection((err, conn) => {
       conn.query('insert into dochour set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/mendresp/' + User);
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
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers a left join dochour b on a.ID = b.IDD where Dresp <> "GEN" and fecaten >= current_date()', (err, customer_especialist) => {
          res.render('customer_especialist', {
            data: customer_especialist,
            login: true,
            User: req.session.User,
            ID: req.session.ID,
            Nuser: req.session.Nuser
          });
        });

    }); 

}
};

//Muestra Muestra Generales
controller.generali = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from fusers a left join dochour b on a.ID = b.IDD where Dresp = "GEN" and fecaten >= current_date()', (err, customer_especialist) => {
          res.render('customer_especialist', {
            data: customer_especialist,
            login: true,
            User: req.session.User,
            ID: req.session.ID,
            Nuser: req.session.Nuser
          });
        });

    }); 
    }
    
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
        conn.query ('select * from fusers where User = ? and Rol = "DR" and Dresp <> "GEN" and drestat = "A"' ,[User], async(err, rows) =>{
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
                req.session.Nuser = rows[0].Nuser,
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
            User: req.session.User,
            Nuser: req.session.Nuser
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

//Login De Administrador
controller.logadmi = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ? and Rol IN ("SO", "AD") and drestat = "A"' ,[User], async(err, rows) =>{
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
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
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
            User: req.session.User,
            Nuser: req.session.Nuser
        });
        });
       
    });
}
};


//Muestra Formulario de Consulta Paciente
controller.conesp = (req, res) => {
    const IDPa = req.params.IDPa;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien where IDPa = ?', [IDPa], (err, customer_espconsul) => {
          res.render('customer_espconsul', {
            data: customer_espconsul[0],
            login: true,
            User: req.session.User,
          });
        });

    }); 

}   
    
};

//Inserta Consulta del Paciente
controller.adconesp = (req, res) => {
    const data = req.body;
    const User = req.session.User;      
    req.getConnection((err, conn) => {
       conn.query('insert into cliconsul set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/prods/' + User);
       })
    })
   };


//Muestre Referidos a Especialista
controller.ref = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select a.*, Case when Tipespec = "CAR" Then "Cardiologia" when Tipespec = "PSI" then "Psicologia" when Tipespec = "NEU" then "Neurologia" when Tipespec = "GIN" then "Ginecologia" when Tipespec = "OBS" then "Obstetricia" when Tipespec = "ORT" then "Ortopedia" when Tipespec = "NUT" then "Nutricion" end as Tipespec, b.* from cliconsul a left join pacien b on a.Nocli = b.Noclie where stcconsul = "E"', (err, customer_ref) => {
          res.render('customer_ref', {
            data: customer_ref,
            login: true,
            User: req.session.User
          });
        });

    }); 

}
};

//Muestra Formulario Para Asignar Especialista
controller.asigesp = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_asigespe) => {
          res.render('customer_asigespe', {
            data: customer_asigespe[0],
            login: true,
            User: req.session.User
          });
        });

    }); 

}
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
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where IDPa = ?',[IDPa], (err, customer_histcli) => {
          res.render('customer_histcli', {
            data: customer_histcli,
            login: true,
            User: req.session.User
          });
        });

    }); 
    }
    
};

//Muestra Historial Medico Especialista
controller.histclie = (req, res) => {
    const IDPa = req.params.IDPa;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where IDPa = ?',[IDPa], (err, customer_histclie) => {
          res.render('customer_histclie', {
            data: customer_histclie,
            login: true,
            User: req.session.User
          });
        });

    }); 

}
};

//Muestra Formulario Para Finalizar Consulta
controller.fnconsul = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_finconsul) => {
          res.render('customer_finconsul', {
            data: customer_finconsul[0],
            login: true,
            User: req.session.User
          });
        });

    }); 
    }
    
};

//Actualiza Estatus Consulta
controller.upfnconsul = (req, res) => {
    const DI_Idcon = req.params.Idcon;
    const DS_Nocli = req.body.Nocli;
    const DS_Fecconsul = req.body.Fecconsul;
    const DS_stcconsul = req.body.stcconsul;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('CALL SP_UPCONSULGEN(?,?,?,?)', [DI_Idcon, DS_Nocli, DS_Fecconsul, DS_stcconsul],(err, rows) => {
          console.log(rows);
          res.redirect('/mendr/' + User);       
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
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien a left join fusers b on a.climed = b.User left join cliconsul c on a.IDPa = c. IDPa Where stcconsul IN ("A", "FA", "FC") and tipespec = "GEN"', (err, customer_paygen) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_paygen', {
            data: customer_paygen,
            login: true,
            User: req.session.User
        });
        });
       
    });

}

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
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul where stcconsul IN ("A", "FA", "FC") and Tipespec <> "GEN"', (err, customer_payesp) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_payesp', {
            data: customer_payesp,
            login: true,
            User: req.session.User
        });
        });
       
    });
}

};

 //Muestra formulario de Usuarios Previo a Actualizar
 controller.edtpacien = (req, res) => {
    if(req.session.loggedin){
    const IDPa = req.params.IDPa;
    req.getConnection((err, conn) => {
        conn.query('select * from pacien where IDPa = ?', [IDPa], (err, customer_edtpacien) => {
          res.render('customer_edtpacien', {
            data: customer_edtpacien[0],
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Actualiza Usuarios
controller.uppacien = (req, res) => {
    const IDPa = req.params.IDPa;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update pacien set ? where IDPa = ?', [newCustomer, IDPa],(err, rows) => {
          console.log(rows);
          res.redirect('/prods/' + User); 
               
        });
    });
};

//Muestra Farmacia
controller.farma = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods', (err, customer_farma) => {
          res.render('customer_farma', {
            data: customer_farma,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Detalle Medicamento
controller.detafarm = (req, res) => {
    const ID = req.params.ID
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods where id = ?',[ID], (err, customer_detafarm) => {
          res.render('customer_detafarm', {
            data: customer_detafarm,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Factura
controller.viewfact = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select b.Idcon, Prod, Casprod, Cantprod, Preprod, Cantprod * Preprod as Total, Clnit, Nocli, date_format(Fecconsul, "%d/%m/%Y") as Fecconsul from venprod a left join cliconsul b on a.Idcon = b.Idcon left join pacien c on b.IDPa = c.IDPa where b.Idcon = ?',[Idcon], (err, Customer_Fact) => {
        console.log(Customer_Fact);
          res.render('Customer_Fact', {
            data: Customer_Fact,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Referidos A Farmacia
controller.reffarma = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select * from cliconsul where stcconsul in ("F", "FL")', (err, customer_reffarma) => {
          res.render('customer_reffarma', {
            data: customer_reffarma,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Referidos A Farmacia Asistente
controller.reffarmaci = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select * from cliconsul where stcconsul in ("F", "FL")', (err, customer_reffarmaci) => {
          res.render('customer_reffarmaci', {
            data: customer_reffarmaci,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

   //Muestra Formulario Para Finalizar Consulta
controller.fnfarma = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_fnfarma) => {
          res.render('customer_fnfarma', {
            data: customer_fnfarma[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upfnfarma = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/reffarma');       
        });
    });
};

   //Muestra Formulario Para Finalizar Consulta
   controller.fnfarmaci = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_fnfarma) => {
          res.render('customer_fnfarma', {
            data: customer_fnfarma[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upfnfarmaci = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/reffarmaci');       
        });
    });
};

   //Muestra Formulario Para Finalizar Consulta
   controller.fnlab = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_fnlab) => {
          res.render('customer_fnlab', {
            data: customer_fnlab[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upfnlab = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/reflab');       
        });
    });
};

//Muestra Inventario
controller.invprod = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods', (err, customer_invprod) => {
          res.render('customer_invprod', {
            data: customer_invprod,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Consultas
controller.viewconsul = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul', (err, customer_viewconsul) => {
          res.render('customer_viewconsul', {
            data: customer_viewconsul,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Formulario Para Finalizar Consulta
controller.viewstconsul = (req, res) => {
const Idcon = req.params.Idcon;
req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_upstconsul) => {
          res.render('customer_upstconsul', {
            data: customer_upstconsul[0]
          });
        });

    }); 

    
};

//Actualiza Estatus Consulta
controller.upstconsul = (req, res) => {
    const Idcon = req.params.Idcon;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('update cliconsul set ? where Idcon = ?', [newCustomer, Idcon],(err, rows) => {
          console.log(rows);
          res.redirect('/viewconsul');       
        });
    });
};

//Muestra Formulario de nuevo Producto
controller.viewnewprod = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from prods', (err, customer_addnewprod) => {
          res.render('customer_addnewprod', {
            data: customer_addnewprod,
            login: true,
            User: req.session.User,
          });
        });

    }); 

}   
    
};

//Inserta Nuevo Producto
controller.addnewprod = (req, res) => {
    const data = req.body;     
    req.getConnection((err, conn) => {
       conn.query('insert into prods set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/bodega');
       })
    })
   };

//Muestra Formulario Para Agregar Existencias
controller.viewexismed = (req, res) => {
    const ID = req.params.ID;
    req.getConnection((err, conn) => {
            conn.query('select * from prods where ID = ?', [ID], (err, customer_addexismed) => {
              res.render('customer_addexismed', {
                data: customer_addexismed[0]
              });
            });
    
        }); 
    
        
    };
    
    //Actualiza Estatus Consulta
controller.addexismed = (req, res) => {
        const ID = req.params.ID;
        const newCustomer = req.body;
        req.getConnection((err, conn) => {
            conn.query('update prods set ? where ID = ?', [newCustomer, ID],(err, rows) => {
              console.log(rows);
              res.redirect('/bodega');       
            });
        });
    };

    //Muestra Formulario Para Agregar Existencias
controller.viewexismedsu = (req, res) => {
    const ID = req.params.ID;
    req.getConnection((err, conn) => {
            conn.query('select * from prods where ID = ?', [ID], (err, customer_addexismedsu) => {
              res.render('customer_addexismedsu', {
                data: customer_addexismedsu[0]
              });
            });
    
        }); 
    
        
    };
    
    //Actualiza Estatus Consulta
controller.addexismedsu = (req, res) => {
        const ID = req.params.ID;
        const newCustomer = req.body;
        req.getConnection((err, conn) => {
            conn.query('update prods set ? where ID = ?', [newCustomer, ID],(err, rows) => {
              console.log(rows);
              res.redirect('/invprod');       
            });
        });
    };

//Muestra Reporte De Consultas
controller.viewreport = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
            conn.query('select * from cliconsul', (err, customer_viewreport) => {
              res.render('customer_viewreport', {
                data: customer_viewreport,
                login: true,
                User: req.session.User
              });
            });
    
        }); 
    
    }
    };


//Muestra Reporte De Ventas
controller.viewvent = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
            conn.query('select Cantprod * Preprod as Total, a.* from venprod a ', (err, customer_viewvent) => {
              res.render('customer_viewvent', {
                data: customer_viewvent,
                login: true,
                User: req.session.User
              });
            });
    
        }); 
    
    }
    };


//Muestra Farmacia
controller.viewreprod = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta, Fecingrep from prods', (err, customer_viewreprod) => {
          res.render('customer_viewreprod', {
            data: customer_viewreprod,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Formulario de Consulta Paciente Especialista
controller.upconsule = (req, res) => {
    const Idcon = req.params.Idcon;
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_upconsule) => {
          res.render('customer_upconsule', {
            data: customer_upconsule[0]
          });
        });

    }); 

    
};

//Actualiza Consulta Genera Receta Completa Especialista
controller.upconsulte = (req, res) => {
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

//Muestra Formulario Para Finalizar Consulta
controller.fnconsule = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from cliconsul a left join pacien b on a.Nocli = b.Noclie where Idcon = ?', [Idcon], (err, customer_finconsule) => {
          res.render('customer_finconsule', {
            data: customer_finconsule[0],
            login: true,
            User: req.session.User
          });
        });

    }); 
    }
    
};

//Actualiza Estatus Consulta
controller.upfnconsule = (req, res) => {
    const DI_Idcon = req.params.Idcon;
    const DS_Nocli = req.body.Nocli;
    const DS_Fecconsul = req.body.Fecconsul;
    const DS_stcconsul = req.body.stcconsul;
    const User = req.session.User;
    req.getConnection((err, conn) => {
        conn.query('CALL SP_UPCONSULESP(?,?,?,?)', [DI_Idcon, DS_Nocli, DS_Fecconsul, DS_stcconsul],(err, rows) => {
          console.log(rows);
          res.redirect('/mendresp/' + User);       
        });
    });
};

//Muestra Intranet
controller.intranet = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('Select * from fusers', (err, customer_intranet) => {
          res.render('customer_intranet', {
            data: customer_intranet,
          });
        });
    }); 
};


//Muestra Farmacia Intramed
controller.farmaintramed = (req, res) => {
    
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods', (err, customer_farmaintramed) => {
          res.render('customer_farmaintramed', {
            data: customer_farmaintramed,
          });
        });

    }); 
    
};

//Muestra Detalle Medicamento
controller.detafarmintramed = (req, res) => {
    const ID = req.params.ID
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods where id = ?',[ID], (err, customer_detafarmintramed) => {
          res.render('customer_detafarmintramed', {
            data: customer_detafarmintramed
          });
        });

    }); 
    
};

//Muestra Login de Farmacia
controller.logfar = (req, res) => {      
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logfarma) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logfarma', {
            data: customers_logfarma
        });
        });
       
    });
};

//Login De Farmacia
controller.logfarma = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ? and Rol IN ("SO", "AD") and drestat = "A"' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logfarma',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logfarma'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                res.redirect('/farmacia');
                
            }
        });
    });
};
};

//Muestra Login de Bodega
controller.logbode = (req, res) => {      
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logbode) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logbode', {
            data: customers_logbode
        });
        });
       
    });
};

//Login De Bodega
controller.logbodeg = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ? and Rol IN ("SO", "AD") and drestat = "A"' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logbode',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logbode'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                res.redirect('/bodega');
                
            }
        });
    });
};
};

//Muestra Farmacia-Menu
controller.farmacia = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods', (err, customer_farmacia) => {
          res.render('customer_farmacia', {
            data: customer_farmacia,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Inventario
controller.bodega = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Noprod, Casprod , Case Resprod When Resprod = "N" Then "No" When Resprod  = "S" Then "Si" End as Resprod, Preprod, Unidisp, Prdeta from prods', (err, customer_bodega) => {
          res.render('customer_bodega', {
            data: customer_bodega,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Inventario - Labotario
controller.invlab = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Nolab, Case When Stlab = "D" Then "Disponible" When Stlab = "N" then "No Disponible" End as Stlab, Prelab, Labdeta from labs', (err, customer_invlabs) => {
          res.render('customer_invlabs', {
            data: customer_invlabs,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Laboratorio
controller.mnlab = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select ID, Nolab, Case When Stlab = "D" Then "Disponible" When Stlab = "N" then "No Disponible" End as Stlab, Prelab, Labdeta from labs', (err, customer_mnlab) => {
          res.render('customer_mnlab', {
            data: customer_mnlab,
          });
        });

    }); 
       
};


//Muestra Login de Bodega
controller.loglabs = (req, res) => {      
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_loglab) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_loglab', {
            data: customers_loglab
        });
        });
       
    });
};

//Login De Laboratorio
controller.loglab = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ? and Rol IN ("SO", "AD") and drestat = "A"' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_loglab',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_loglab'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                res.redirect('/laboratorio');
                
            }
        });
    });
};
};


//Muestra Laboratorio
controller.viewlabintra = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select ID, Nolab, Case When Stlab = "D" Then "Disponible" When Stlab = "N" then "No Disponible" End as Stlab, Prelab, Labdeta from labs', (err, customer_viewlabintra) => {
          res.render('customer_viewlabintra', {
            data: customer_viewlabintra,
          });
        });

    }); 
       
};

//Muestra Laboratorio
controller.labs = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Nolab, Case When Stlab = "D" Then "Disponible" When Stlab = "N" then "No Disponible" End as Stlab, Prelab, Labdeta from labs', (err, customer_labs) => {
          res.render('customer_labs', {
            data: customer_labs,
            login: true,
            User: req.session.User
          });
        });

    }); 
       
}
};


//Muestra Formulario de nuevo Producto
controller.viewnewlab = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from labs', (err, customer_addnewlab) => {
          res.render('customer_addnewlab', {
            data: customer_addnewlab,
            login: true,
            User: req.session.User,
          });
        });

    }); 

}   
    
};

//Inserta Nuevo Laboratorio
controller.addnewlab = (req, res) => {
    const data = req.body;     
    req.getConnection((err, conn) => {
       conn.query('insert into labs set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/labs');
       })
    })
   };

//Muestra Formulario Para Agregar Existencias
controller.viewexislab = (req, res) => {
    const ID = req.params.ID;
    req.getConnection((err, conn) => {
            conn.query('select * from labs where ID = ?', [ID], (err, customer_addexislab) => {
              res.render('customer_addexislab', {
                data: customer_addexislab[0]
              });
            });
    
        }); 
    
        
    };
    
    //Actualiza Estatus Consulta
controller.addexislab = (req, res) => {
        const ID = req.params.ID;
        const newCustomer = req.body;
        req.getConnection((err, conn) => {
            conn.query('update labs set ? where ID = ?', [newCustomer, ID],(err, rows) => {
              console.log(rows);
              res.redirect('/invlab');       
            });
        });
    };


    //Muestra Menu Perfil Laboratorio
controller.laboratorio = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select ID, Nolab, Case When Stlab = "D" Then "Disponible" When Stlab = "N" then "No Disponible" End as Stlab, Prelab, Labdeta from labs', (err, customer_laboratorio) => {
          res.render('customer_laboratorio', {
            data: customer_laboratorio,
            login: true,
            User: req.session.User
          });
        });

    }); 
       
}
};


//Muestra Referidos A Farmacia
controller.reflab = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select * from cliconsul where stcconsul in ("L", "FL", "FA")', (err, customer_reflab) => {
          res.render('customer_reflab', {
            data: customer_reflab,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};


//Muestra Formulario de Productos para Factura
controller.listlab = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select Prod, Casprod, Cantprod, Preprod, Cantprod * Preprod as Total, b.* from pacien a left join cliconsul b on a.IDPa = b.IDPa left join venprod c on b.Idcon = c.Idcon where c.Idcon  = ?',[Idcon], (err, customer_agprlab) => {
          res.render('customer_agprlab', {
            data: customer_agprlab,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Agrega Productos a Consulta
controller.savelab = (req, res) => {
    const DI_Idcon = req.body.Idcon;   
    const DS_Prod = req.body.Prod;
    const DS_Casprod = req.body.Casprod;
    const DI_Cantprod = req.body.Cantprod;
    const DD_Preprod = req.body.Preprod;
    const DS_Feccomp = req.body.Feccomp;
    const DS_Stcompr = req.body.Stcompr;
    req.getConnection((err, conn) => {
       conn.query('CALL SP_ADDLAB(?, ?, ?, ?, ?, ?, ?)', [DI_Idcon, DS_Prod, DS_Casprod, DI_Cantprod, DD_Preprod, DS_Feccomp, DS_Stcompr], (err, rows) => {
           console.log(rows);
           res.redirect('/addlab/' + DI_Idcon);
       })
    })
   };

   //Muestra Formulario de Productos para Factura
controller.listfar = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select Prod, Casprod, Cantprod, Preprod, Cantprod * Preprod as Total, b.* from pacien a left join cliconsul b on a.IDPa = b.IDPa left join venprod c on b.Idcon = c.Idcon where c.Idcon  = ?',[Idcon], (err, customer_agprfarma) => {
          res.render('customer_agprfarma', {
            data: customer_agprfarma,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Agrega Productos a Consulta
controller.savfar = (req, res) => {
    const DI_Idcon = req.body.Idcon;   
    const DS_Prod = req.body.Prod;
    const DS_Casprod = req.body.Casprod;
    const DI_Cantprod = req.body.Cantprod;
    const DD_Preprod = req.body.Preprod;
    const DS_Feccomp = req.body.Feccomp;
    const DS_Stcompr = req.body.Stcompr;
    req.getConnection((err, conn) => {
       conn.query('CALL SP_ADDMED(?, ?, ?, ?, ?, ?, ?)', [DI_Idcon, DS_Prod, DS_Casprod, DI_Cantprod, DD_Preprod, DS_Feccomp, DS_Stcompr], (err, rows) => {
           console.log(rows);
           res.redirect('/addfar/' + DI_Idcon);
       })
    })
   };


   //Muestra Formulario de Productos para Factura
   controller.listfarma = (req, res) => {
    const Idcon = req.params.Idcon;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select Prod, Casprod, Cantprod, Preprod, Cantprod * Preprod as Total, b.* from pacien a left join cliconsul b on a.IDPa = b.IDPa left join venprod c on b.Idcon = c.Idcon where c.Idcon  = ?',[Idcon], (err, customer_agprfarmaci) => {
          res.render('customer_agprfarmaci', {
            data: customer_agprfarmaci,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Agrega Productos a Consulta
controller.savfarma = (req, res) => {
    const DI_Idcon = req.body.Idcon;   
    const DS_Prod = req.body.Prod;
    const DS_Casprod = req.body.Casprod;
    const DI_Cantprod = req.body.Cantprod;
    const DD_Preprod = req.body.Preprod;
    const DS_Feccomp = req.body.Feccomp;
    const DS_Stcompr = req.body.Stcompr;
    req.getConnection((err, conn) => {
       conn.query('CALL SP_ADDMED(?, ?, ?, ?, ?, ?, ?)', [DI_Idcon, DS_Prod, DS_Casprod, DI_Cantprod, DD_Preprod, DS_Feccomp, DS_Stcompr], (err, rows) => {
           console.log(rows);
           res.redirect('/addfarci/' + DI_Idcon);
       })
    })
   };

//Muestra Farmacia
controller.repacien = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien', (err, customer_repacien) => {
          res.render('customer_repacien', {
            data: customer_repacien,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Farmacia
controller.viewreppacien = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from pacien', (err, customer_viewreppacien) => {
          res.render('customer_viewreppacien', {
            data: customer_viewreppacien,
            login: true,
            User: req.session.User
          });
        });

    }); 
    
}
    
};

//Muestra Portal Med
controller.portalmed = (req, res) => {
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select date_format(Fecingre, "%d/%m/%Y") as Fecingre, a.* from fusers a', (err, customer_portalmed) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_portalmed', {
            data: customer_portalmed,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            ID : req.session.ID,
            Dvacs : req.session.Dvacs
        });
        });
       
    });
}
};


//Muestra Login de Portal
controller.logportalmed = (req, res) => {      
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_logportalmed) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_logportalmed', {
            data: customers_logportalmed
        });
        });
       
    });
};

controller.logportal = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select date_format(Fecingre, "%d/%m/%Y") as Fecingre, case when drestat = "A" then "Activo" when drestat = "B" then "Baja" end as drestat, a.* from fusers a where User = ? and drestat = "A"' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_logportalmed',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logportalmed'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.ID = rows[0].ID,
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                req.session.DPI = rows[0].DPI,
                req.session.Fecingre = rows[0].Fecingre,
                req.session.drestat = rows[0].drestat,
                req.session.Rol = rows[0].Rol,
                req.session.Area = rows[0].Area,
                req.session.Jefinme = rows[0].Jefinme,
                req.session.Dvacs = rows[0].Dvacs
                res.redirect('/portalmed/' + User);
                
            }
        });
    });
};
};

//Muestra Login de Portal - Autorizador
controller.logautorizador = (req, res) => {      
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_autorizador) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_autorizador', {
            data: customers_autorizador
        });
        });
       
    });
};

controller.logauth = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select date_format(Fecingre, "%d/%m/%Y") as Fecingre, case when drestat = "A" then "Activo" when drestat = "B" then "Baja" end as drestat, a.* from fusers a where User = ? and Rol in ("JF", "GER", "DIR")and drestat = "A"' ,[User], async(err, rows) =>{
            if(rows.length == 0 || !(await bcryptjs.compare(Pass, rows[0].Pass))){
                res.render('customer_autorizador',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_autorizador'
                });
            }else {
                console.log(rows);
                req.session.loggedin = true;
                req.session.ID = rows[0].ID,
                req.session.User = rows[0].User,
                req.session.Nuser = rows[0].Nuser,
                req.session.DPI = rows[0].DPI,
                req.session.Fecingre = rows[0].Fecingre,
                req.session.drestat = rows[0].drestat,
                req.session.Rol = rows[0].Rol,
                req.session.Area = rows[0].Area,
                req.session.Jefinme = rows[0].Jefinme
                res.redirect('/portalmedjf/' + User);
                
            }
        });
    });
};
};


//Muestra Portal Med - Jefe
controller.portalmedjf = (req, res) => {
    const Nuser = req.session.Nuser
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select DATEDIFF(Fecfin, Fecini) AS Dias, a.* from permis a where Soliautori = ? and Statsoli = "C"',[Nuser], (err, customer_portalmedjf) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_portalmedjf', {
            data: customer_portalmedjf,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            ID: req.session.ID
        });
        });
       
    });
}
};



//Muestra Nominas
controller.nominas = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_nominas) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_nominas', {
            data: customers_nominas,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Nominas
controller.boletaene = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletaene) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletaene', {
            data: customers_boletaene,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};


//Muestra Nominas
controller.boletafeb = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletafeb) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletafeb', {
            data: customers_boletafeb,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Nominas
controller.boletamar = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletamar) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletamar', {
            data: customers_boletamar,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Nominas
controller.boletaabr = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletaabr) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletaabr', {
            data: customers_boletaabr,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Nominas
controller.boletamay = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletamay) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletamay', {
            data: customers_boletamay,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Nominas
controller.boletajun = (req, res) => {   
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers', (err, customers_boletajun) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_boletajun', {
            data: customers_boletajun,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol
        });
        });
       
    });
}
};

//Muestra Permisos
controller.permisos = (req, res) => {  
    const User = req.session.User 
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select * from fusers where User = ?',[User], (err, customers_permisos) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_permisos', {
            data: customers_permisos,
            login: true,
            ID: req.session.ID,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            Area: req.session.Area,
            Jefinme: req.session.Jefinme
        });
        });
       
    });
}
};

//Agrega Permisos
controller.addpermis = (req, res) => {
    const data = req.body; 
    const User = req.session.User    
    req.getConnection((err, conn) => {
       conn.query('insert into permis set ?', [data], (err, rows) => {
           console.log(rows);
           res.redirect('/permisos/' + User);
       })
    })
   };


//Muestra Vacaciones
controller.vacaciones = (req, res) => {  
    const IDS = req.session.ID
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select DATEDIFF(Fecfin, Fecini) AS Dias, a.* from permis a where IDS = ? and Tipsoli = "VAC" and Statsoli= "C"',[IDS], (err, customers_vacaciones) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_vacaciones', {
            data: customers_vacaciones,
            login: true,
            ID: req.session.ID,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            Area: req.session.Area,
            Jefinme: req.session.Jefinme
        });
        });
       
    });
}
};

//Muestra Paternidad
controller.paternidad = (req, res) => {  
    const IDS = req.session.ID
    if(req.session.loggedin){   
    req.getConnection((err, conn) => {
        conn.query('select DATEDIFF(Fecfin, Fecini) AS Dias, a.*  from permis a where IDS = ? and Tipsoli = "PAT" and Statsoli= "C"',[IDS], (err, customers_paternidad) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_paternidad', {
            data: customers_paternidad,
            login: true,
            ID: req.session.ID,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            Area: req.session.Area,
            Jefinme: req.session.Jefinme
        });
        });
       
    });
}
};


//Muestra Formulario Para Aprobar Permiso
controller.viewaprobsoli = (req, res) => {
    const ID = req.params.ID;
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('select * from permis where ID = ?', [ID], (err, customer_aprobsoli) => {
          res.render('customer_aprobsoli', {
            data: customer_aprobsoli[0],
            login: true,
            User: req.session.User
          });
        });

    }); 
    }
    
};

//Aprueba Permiso
controller.aprobsoli = (req, res) => {
    const DI_ID = req.params.ID;
    const DS_Nuser = req.body.Nosoli;
    const DD_Fecini = req.body.Fecini;
    const DD_Fecfin = req.body.Fecfin;
    const DS_Statsoli = req.body.Statsoli;
    const DS_Tipsoli = req.body.Tipsoli;
    const User = req.session.User
    req.getConnection((err, conn) => {
        conn.query('CALL SP_APROBSOLI(?,?,?,?,?,?)',[DI_ID, DS_Nuser, DD_Fecini, DD_Fecfin, DS_Statsoli, DS_Tipsoli],(err, rows) => {
          console.log(rows);
          res.redirect('/portalmedjf/' + User);       
        });
    });
};


//Muestra Portal Med - Jefe
controller.mipersonal = (req, res) => {
    const Nuser = req.session.Nuser
    if(req.session.loggedin){
    req.getConnection((err, conn) => {
        conn.query('Select * from fusers where Jefinme = ?',[Nuser], (err, customer_mipersonal) => {
            if(err) {
                res.json(err);
            }
        res.render('customer_mipersonal', {
            data: customer_mipersonal,
            login: true,
            User: req.session.User,
            Nuser: req.session.Nuser,
            DPI: req.session.DPI,
            Fecingre : req.session.Fecingre,
            drestat: req.session.drestat,
            Rol: req.session.Rol,
            ID: req.session.ID
        });
        });
       
    });
}
};




//Login De Administrador
controller.logflu = async (req, res) => {
    const User = req.body.User;
    const Pass = req.body.Pass;  
    let passwordHash = await bcryptjs.hash(Pass, 8);
    if(User && Pass){
    req.getConnection((err,conn) => {
        conn.query ('select * from fusers where User = ? and Rol IN ("SO", "AD") and drestat = "A"' ,[User], async(err, data) =>{
            if(data.length == 0 || !(await bcryptjs.compare(Pass, data[0].Pass))){
                res.json('Usuario Y/O Password Incorrectos',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessege: "Usuario Y/O Password Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'customer_logadmin'
                });
            }else {
                console.log(data);
                req.session.loggedin = true;
                req.session.User = data[0].User,
                req.session.Nuser = data[0].Nuser,
                res.json({data});
                
                
            }
        });
    });
};
};


 module.exports = controller;