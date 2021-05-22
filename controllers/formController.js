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
        pinAndPhone.findOne({pinCode:req.params.pinCode},req.body).then((res)=>{
            console.log(res);
            if(res == null)
            pinAndPhone.create(req.body);
        }).catch((err)=>{res.json(err.message)});
        res.status(201).json(coWinData);
    }catch(error)
    {
        res.status(401).json({message:error.message});
    }
    
}
