import fast2sms from 'fast-two-sms';
import distinctPincodes from '../services/DaoServices.js'
import checkAvailabilityAndSend from '../services/fetchCoWinData.js'

// var options = {authorization : 'tWIg58NEPZayjTfuVovh1sKOUlQrA9F324cYRbSBH07nqzkJem2qTzCMHQr41imNoGg8XEn0IeBVFPld' , message : 'CHECKING!!' ,  numbers : ['9304889456','9939380107']} 
// fast2sms.sendMessage(options)


var phonesDict = {};
var emailsDict={};
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
                var email = found[i].email;
                var phones = found[i].phone;
                phonesDict[pinCode]=phones;
                emailsDict[pinCode]=email;
                console.log(email);
            }
            sendMessage(phonesDict,emailsDict);

        }catch(error)
        {
            console.log(error);
        }
        
    }));
    }

const sendMessage = async (phonesDict,emailsDict)=> {
    
    for (let pinCode in phonesDict)
    {
        checkAvailabilityAndSend(pinCode,phonesDict[pinCode],emailsDict[pinCode])
       
        // console.log(pinCode);
        // console.log(phonesDict[pinCode]);
        // var options = {authorization : 'tWIg58NEPZayjTfuVovh1sKOUlQrA9F324cYRbSBH07nqzkJem2qTzCMHQr41imNoGg8XEn0IeBVFPld' , message : 'CHECKING!!' ,  numbers : phonesDict[pinCode]} 
        // fast2sms.sendMessage(options);
    }
}

export default startService;
// console.log(distinctPincodes);

