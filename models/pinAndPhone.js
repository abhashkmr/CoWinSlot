import mongoose from 'mongoose';

const pinAndPhoneSchema = mongoose.Schema({
    pinCode : {
        type : Number,
        require : true
    },
    phone : {
        type : [Number],
        require : true
    }
})

const pinAndPhone = mongoose.model('pinAndPhone',pinAndPhoneSchema);
export default pinAndPhone;