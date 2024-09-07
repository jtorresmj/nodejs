import express from "express"
import { crud_estudiante } from "./controllers/crud_estudiantes.js"

const app_e = express()
app_e.use(express.urlencoded({extended:false}));
app_e.use(express.json());
app_e.use(express.static('./controllers'))
app_e.use(express.static('./models'))
app_e.use(express.static('./views'))
app_e.set('view engine','ejs')

app_e.listen('5000', function(){
    console.log('Aplicacion Iniciada : http://localhost:5000/')
    
})
app_e.get('/',crud_estudiante.leer);
app_e.post('/crud_e',crud_estudiante.cud);

// Ruta para obtener los datos de un estudiante por su carne
app_e.get('/obtener_estudiante/:carne', (req, res) => {
    const carne = req.params.carne;
    conectar.query('SELECT * FROM estudiantes WHERE carne = ?', [carne], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.json(results[0]); // Devolver el primer resultado como JSON
    });
});

// Ruta para actualizar la información del estudiante
app_e.post('/actualizar_estudiante', (req, res) => {
    const { carne, nombres, apellidos, direccion, telefono, correo, sangre, fecha_nacimiento } = req.body;

    const query = `UPDATE estudiantes SET nombres = ?, apellidos = ?, direccion = ?, telefono = ?, correo = ?, sangre = ?, fecha_nacimiento = ? WHERE carne = ?`;
    conectar.query(query, [nombres, apellidos, direccion, telefono, correo, sangre, fecha_nacimiento, carne], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.redirect('/'); // Redirigir a la lista de estudiantes después de actualizar
    });
});