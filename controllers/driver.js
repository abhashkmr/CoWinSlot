import fast2sms from 'fast-two-sms';
import distinctPincodes from '../services/DaoServices.js'
import checkAvailabilityAndSend from '../services/fetchCoWinData.js'

// var options = {authorization : 'tWIg58NEPZayjTfuVovh1sKOUlQrA9F324cYRbSBH07nqzkJem2qTzCMHQr41imNoGg8XEn0IeBVFPld' , message : 'CHECKING!!' ,  numbers : ['9304889456','9939380107']} 
// fast2sms.sendMessage(options)


var phonesDict = {};
const startService = ()=>{
    console.log(distinctPincodes(function(err,found){
        if (err)
        {
            console.log(err)
        }
        try{
            for(let i in found)
            {
                var pinCode = found[i].pinCode;
                var phones = found[i].phone;
                phonesDict[pinCode]=phones;
            }
            sendMessage(phonesDict);

        }catch(error)
        {
            console.log(error);
        }
        
    }));
    }

const sendMessage = async (phonesDict)=> {
    
    for (let pinCode in phonesDict)
    {
        let data = await checkAvailabilityAndSend(pinCode)
        console.log(data);
        // console.log(pinCode);
        // console.log(phonesDict[pinCode]);
        // var options = {authorization : 'tWIg58NEPZayjTfuVovh1sKOUlQrA9F324cYRbSBH07nqzkJem2qTzCMHQr41imNoGg8XEn0IeBVFPld' , message : 'CHECKING!!' ,  numbers : phonesDict[pinCode]} 
        // fast2sms.sendMessage(options);
    }
}

export default startService;
// console.log(distinctPincodes);

