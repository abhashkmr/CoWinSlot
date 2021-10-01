import request from 'request';
import fast2sms from 'fast-two-sms';
import nodemailer from 'nodemailer'
var date = new Date().toLocaleDateString().replace(/\//g,'-').trim();


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'raghababhash@gmail.com',
        pass: 'jwnhctzkzloaeiwd'
    }
});


let data;
const checkAvailabilityAndSend = async (pinCode,phoneList,emailList)=>{
    const apiURL = "http://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pinCode+"&date="+date;
    
    let options = {json: true};
    let vaccineDetails = {};
    request(apiURL, options, (error, res, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
        let length = body.sessions.length;
        for(let i = 0 ; i<length ; i++)
        {
            let name = body.sessions[i].name;
            vaccineDetails[name] = [body.sessions[i].vaccine,body.sessions[i].available_capacity_dose1,body.sessions[i].available_capacity_dose2];
            
        }
            // console.log(vaccineDetails);
            //
            var msg = "Hello,vaccine details are - ";
            for(let name in vaccineDetails)
            {
                msg += name + ":" + vaccineDetails[name] +"\n";
            }
            var options = {authorization : 'tWIg58NEPZayjTfuVovh1sKOUlQrA9F324cYRbSBH07nqzkJem2qTzCMHQr41imNoGg8XEn0IeBVFPld' , message : msg,  numbers : phoneList} 
            fast2sms.sendMessage(options);
            console.log("Logging emails list:"+emailList);
            emailList.forEach(function (to, i , array) {
                var message = {
                    from: "raghababhash@gmail.com", // sender address
                    subject: "Hello ✔", // Subject line
                    text: msg, // plaintext body
                       
                    //  html: "<b>Hello world ✔</b>" // html body
                }
                message.to = to;
              
                mailTransporter.sendMail(message, function (err) {
                  if (err) { 
                    console.log('Sending to ' + to + ' failed: ' + err);
                    return;
                  } else { 
                    console.log('Sent to ' + to);
                  }
              
                  if (i === emailList.length - 1) { message.transport.close(); }
                });
              });
            


        };
       console.log(vaccineDetails);
    });
    return Promise.resolve(vaccineDetails);
}

export default checkAvailabilityAndSend;