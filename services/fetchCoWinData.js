import request from 'request';

var date = new Date().toLocaleDateString().replace(/\//g,'-').trim();


let data;
const checkAvailabilityAndSend = async (pinCode)=>{
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
            vaccineDetails[name] = [body.sessions[i].available_capacity_dose1,body.sessions[i].available_capacity_dose1];
        }
            // console.log(vaccineDetails);
            return vaccineDetails;
        };
       console.log(vaccineDetails);
    });
    return Promise.resolve(vaccineDetails);
}

export default checkAvailabilityAndSend;