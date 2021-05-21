import express from 'express';
import {getForm} from '../controllers/formController.js'

const routes = express.Router();

routes.get('/',getForm)

// routes.post('/',postForm)

export default routes;
