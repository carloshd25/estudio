const express= require('express');
const body =require('body-parser');
const app=express();
const router =express.Router();
const mongose = require('mongoose');
const config=require('./configs/configs');

const propietarioControler=require('./controllers/propietariosController');
const unidadController=require('./controllers/unidadesController');
const apartamentoController=require('./controllers/apartamentoController');

app.use(body.urlencoded({
    extended:true
}));
app.use(body.json());

//mongose.connect('mongodb://127.0.0.1:27017/myfirstapp',
mongose.connect(`mongodb://${config.BD_HOST}:${config.BD_PORT}/${config.BD_NAME}`,
                {
                        useNewUrlParser:true, 
                        useUnifiedTopology:true,
                        useFindAndModify:false
                },
                (err)=>{
                        if(err){
                        console.log("Hubo un error");
                        }
                        }
                );


let db =mongose.connection;
db.on('error',console.error.bind(console,'Db connection error:')) ;

if(!db){
    console.log('Error during connection with db');
}else{
    console.log('********** Connect Succesfully **********');
}

router.route('/Propietarios')
    .get(propietarioControler.obtenerPropietarios)
    .post(propietarioControler.crearPropietario);

router.route('/Propietarios/:id')
    .delete(propietarioControler.eliminarPropietario)
    .get(propietarioControler.findPropietario)
    .put(propietarioControler.putPropietario);

router.route('/Propietarios/documento/:id')
    .get(propietarioControler.findPropietarioDoc);

router.route('/Unidades')
    .get(unidadController.obtenerUnidad)
    .post(unidadController.crearUnidad);

router.route('/Unidades/:id')
    .delete(unidadController.eliminarUnidad)
    .get(unidadController.findUnidad)
    .put(unidadController.putUnidad);    


router.route('/Apartamento')
    .get(apartamentoController.obtenerApartamento)
    .post(apartamentoController.crearApartamento);  

app.use('/',router);


app.listen(config.PORT,()=>{
    console.log(`estoy escuchando en el puerto ${config.PORT}`);
    //console.log(process.env.BD_HOST);
    //console.log(process.env.BD_PORT);
    //console.log(process.env.BD_NAME);
});

//npm run dev