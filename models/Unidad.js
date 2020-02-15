const mongoose=require('mongoose');

let UnidadScheme=new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    pisos:{
        type:Number,
        required: true
    },
    constructora:{
        type:String,
        required: true,
        unique:true
    },
    apartamentos:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Apartamento'
        }

    ]
});

mongoose.model('Unidad',UnidadScheme);
module.exports=mongoose.model('Unidad');