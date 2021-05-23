import pinAndPhone from '../models/pinAndPhone.js';
export const distinctPincodes = pinAndPhone.find().distinct('pinCode',(err,obj)=>{
    if(err)
    console.log(err);

})
export default distinctPincodes;
