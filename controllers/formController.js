import coWin from '../models/postForm.js';


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
    const coWinData = new coWin(formData);
    try{
        await coWinData.save();
        res.status(201).json(coWinData);
    }catch(error)
    {
        res.status(401).json({message:error.message});
    }
    
}
