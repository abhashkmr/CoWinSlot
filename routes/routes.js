import express from 'express';
import {getForm,postForm} from '../controllers/formController.js'
import bodyParser from 'body-parser';


const router = express.Router();
router.use(bodyParser.json({limit: "30mb", extended: true}));
router.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

router.get('/',getForm)

router.post('/',postForm)

export default router;
