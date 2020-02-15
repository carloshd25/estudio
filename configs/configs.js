const config=require('dotenv');
const ambiente=config.config();

if (ambiente.error){
    throw ambiente.error
}

const {parsed:env}=ambiente;
//const env=ambiente.parsed;

module.exports=env;