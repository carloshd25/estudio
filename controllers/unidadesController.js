const Unidad=require('../models/Unidad');
const Apartamento=require('../models/apartamento');
const Propietario=require('../models/Propietario');

exports.obtenerUnidad= async(req,res)=>{
    try{
        //let Unidades = await Unidad.find().populate('apartamentos','numero piso');
        //let Unidades = await Unidad.find().populate('apartamentos','numero piso propietario').populate('propietario','nombre');
        //let Unidades = await Unidad.find().populate({["apartamentos":"numero","piso","propietario"});
        
        let Unidades = await Unidad.find().populate({ 
                                            path: 'apartamentos', 
                                            model: Apartamento, 
                                            select: 'numero piso propietario',
                                            populate:{ path: 'propietario', model: Propietario, select: 'nombre' }
                                        });

        
        res.status(200).send(Unidades);
        
    }catch(err){
        res.status(500).send(err)
    }
    

}

exports.crearUnidad=async(req,res)=>{
    try{
        let unidad=req.body;
        let addResult= await Unidad.create(unidad);
        res.status(200).send(addResult);
    }catch(err){
        res.status(500).send(err)
    }
}

exports.eliminarUnidad=async(req,res)=>{
    try{
        let idUnidad=req.params.id;
        let deleteResult= await Unidad.findByIdAndDelete(idUnidad);
        if(!deleteResult)
        {
            res.status(404).send({error:'Unidad no encontrado'})
        }
        else
        {
            res.status(200).send(deleteResult);
        }
        
    }catch(err){
        res.status(500).send(err)
    }
}
exports.findUnidad=async(req,res)=>{
    try{
        let idUnidad=req.params.id;
        let UnidadResult=await Unidad.findById(idUnidad);
        
        if(!UnidadResult)
        {
            res.status(404).send({error:'Unidad no encontrado'})
        }
        else
        {
            res.status(200).send(UnidadResult);
        } 
    }
    catch(err){
        res.status(500).send(err)
    }
}

exports.putUnidad=async(req,res)=>{
    try{
        let idUnidad=req.params.id;
        let data = req.body;
        let result=await Unidad.findByIdAndUpdate(idUnidad,data);
        if(!result)
        {
            res.status(404).send({error:'Unidad no encontrado'})
        }
        else
        {
            res.status(200).send(result);
        } 
    }catch(err){
        res.status(500).send(err)
    }
    
}


