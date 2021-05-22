import coWin from '../models/postForm.js';
import pinAndPhone from '../models/pinAndPhone.js';

export const getForm = async (req,res)=>{
    try{
        res.render('form');
    }
    catch(error)
    {
        res.status(404).json({message: error.message});
    }
}

export const postForm = async (req,res)=>{
    const formData = req.body;
    let coWinData;

    // First promise the data to be unique then create the model

    coWin.init().then(
    coWinData = new coWin(formData)).catch((err) => {
        res.json(err.message);
      });
    try{
        await coWinData.save();
        pinAndPhone.findOne({pinCode:req.body.pinCode},function(err,data){
            if(err)
            console.log(err);
            else
            {
                if (data == null)
                {
                    pinAndPhone.create(req.body);
                }
                else
                {
                    pinAndPhone.updateOne(
                        { pinCode:req.body.pinCode }, 
                        { $push: { phone: req.body.phone } },
                        function(error,docs){
                            if(error)
                            console.log(error);
                            else
                            console.log(docs);
                        }
                    );
                }
               
            }
            
        });

        res.status(201).json(coWinData);
    }catch(error)
    {
        res.status(401).json({message:error.message});
    }
    
}
