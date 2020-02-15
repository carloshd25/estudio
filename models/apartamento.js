const mongoose=require('mongoose');

let ApartamentoScheme=new mongoose.Schema({
    numero:{
        type:String,
        required: true
    },
    piso:{
        type:Number,
        required: true
    },
    unidad:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Unidad'
    },
    propietario:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Propietario'
    }
    /*
    Propietario:{
        type:String,
        required: true,
        unique:true
    }
    */
});

mongoose.model('Apartamento',ApartamentoScheme);
module.exports=mongoose.model('Apartamento');