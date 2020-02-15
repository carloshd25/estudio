const mongoose=require('mongoose');

let propietarioScheme=new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    edad:{
        type:Number,
        required: true
    },
    documento:{
        type:String,
        required: true,
        unique:true
    },
    sexo:{
        type:String,
        required: false
    },
    apartamentos:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Apartamento'
        }

    ]
});

mongoose.model('Propietario',propietarioScheme);
module.exports=mongoose.model('Propietario');
