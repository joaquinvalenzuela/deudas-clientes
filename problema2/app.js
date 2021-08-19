const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors')

const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'deudasclientes'
}

//middlewares

app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

//routes

app.get('/', (req, res) => {
    res.send("Bienvenido a la API")
})

app.post('/login', (req, res) => {

    const user = {
        id: 1,
        nombre: "Joaquin"
    }

    jwt.sign({ user }, 'secretKey', (err, token) => {

        res.json({
            token
        })

    })

})

app.get('/mostrarDeudas', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }

                conn.query('SELECT * FROM cliente JOIN deuda ON idCliente = cliente_idCliente', [req.body], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send(rows)
                })

            })
        }
    })
})

app.post('/agregarCliente', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }

                conn.query('INSERT INTO cliente set ? ', [req.body], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('cliente agregado')
                })

            })
        }
    })


})
app.post('/agregarDeuda', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {

            let newDate =req.body.fechaVencimiento.split("-").reverse().join("-");
            req.body.fechaVencimiento = newDate;
          console.log(req.body.fechaVencimiento) ;


            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }

                conn.query('INSERT INTO deuda set ? ', [req.body], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('deuda agregada')
                })

            })
        }
    })


})

app.put('/modificarCliente/:idCliente', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }

                conn.query('UPDATE cliente SET ? WHERE idCliente = ?', [req.body , req.params.idCliente], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('Cliente modificado')
                })

            })
        }
    })

})

app.put('/modificarDeuda/:idDeuda', verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }

                conn.query('UPDATE deuda SET ? WHERE idDeuda = ?', [req.body , req.params.idDeuda], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('Deuda modificada')
                })

            })
        }
    })

})

app.delete('/eliminarDeuda/:idDeuda', verifyToken ,(req,res)=>{

    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            console.log(req.params.idDeuda)

            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }
                conn.query('DELETE FROM deuda WHERE idDeuda = ?', [req.params.idDeuda], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('Deuda eliminada')
                })

            })
        }
    })
})

app.delete('/eliminarCliente/:idCliente', verifyToken ,(req,res)=>{

    jwt.verify(req.token, 'secretKey', (error) => {
        if (error) {
            res.sendStatus(403)
        } else {
            

            req.getConnection((err, conn) => {

                if (err) {
                    return res.send(err)
                }
                conn.query('DELETE FROM cliente WHERE idCliente = ?', [req.params.idCliente], (err, rows) => {
                    if (err) {
                        return res.send(err)

                    }

                    res.send('Cliente Eliminado')
                })

            })
        }
    })
})


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {

        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}

//server running

app.listen(app.get('port'), () => {
    console.log("Servidor funcionando en el puerto ", app.get('port'));
})