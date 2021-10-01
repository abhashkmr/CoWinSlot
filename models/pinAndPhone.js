import mongoose from 'mongoose';

const pinAndPhoneSchema = mongoose.Schema({
    pinCode : {
        type : Number,
        require : true
    },
    phone : {
        type : [String],
        require : true
    },
    email:{
        type:[String],
        require:true
    }

})

const pinAndPhone = mongoose.model('pinAndPhone',pinAndPhoneSchema);
export default pinAndPhone;