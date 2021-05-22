import mongoose from 'mongoose';

const schema = mongoose.Schema;

const coWinSchema = new schema({
    name: {
        type : String,
        required : true
    },
    phone:{
        type : Number,
        required:true,
        dropDups : true,
        unique : true,
        index : true
        

    },
    email:{
        type: String,
        required : true,
        dropDups : true,
        trim : true,
        unique : true,
        index : true
    },
    pinCode : {
        type: Number,
        required: true
    }
}


);

const coWin = mongoose.model('coWin',coWinSchema);
export default coWin;