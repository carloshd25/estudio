const Apartamento=require('../models/apartamento');
const Unidad=require('../models/Unidad');
const Propietario=require('../models/Propietario');


exports.obtenerApartamento= async(req,res)=>{
    try{
        let apartamento;
        if(req.query.numero){
            apartamento = await Apartamento.findOne({numero: req.query.numero});
        }else{
            //apartamento = await Apartamento.find().populate('unidad','nombre pisos constructora');

            apartamento = await Apartamento.find().populate({ path: 'unidad', select: 'nombre pisos constructora' })
                                                .populate({ path: 'propietario', select: 'nombre' });
        }
        res.status(200).send(apartamento);
    }catch(err){
        res.status(500).send(err)
    }
    

}

exports.crearApartamento=async(req,res)=>{
    try{
        let apartamento=req.body;
        let addResult= await Apartamento.create(apartamento);

        let unidad=await Unidad.findById(req.body.unidad);
        
        unidad.apartamentos.push(addResult);
        unidad.save();

        let propietario= await Propietario.findById(req.body.propietario);
        propietario.apartamentos.push(addResult);
        propietario.save();


        res.status(200).send(addResult);
    }catch(err){
        res.status(500).send(err)
    }
}