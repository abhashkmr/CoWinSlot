import pinAndPhone from '../models/pinAndPhone.js';
const distinctPincodes = async function (callback) {
   await pinAndPhone.find((err,obj)=>{
        if(err)
        return callback(err);
        else if(obj)
        return callback(null,obj);
        else
        return callback();
    
    }).lean()
}

export default distinctPincodes;
