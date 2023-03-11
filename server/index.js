import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import assistProfRoutes from './routes/assistance-professional_routes.js';
import payControllerRoutes from './routes/payment-controller_routes.js';
import receiptRoutes from './routes/receipt_routes.js';
import serviceRoutes from './routes/service_routes.js';
import subMemberRoutes from './routes/subscribed-member_routes.js';
import motoristForms from './routes/motorist-form_routes.js';
import memberSearchCriteria from './routes/memberSearchCriteria.js';
import apSearchCriteria from './routes/apSearchCriteria.js';
import otherModels from './routes/other-model_routes.js';

const app = express();
app.use(cors(), express.json());
app.use('/', payControllerRoutes);
app.use('/', receiptRoutes);
app.use('/', serviceRoutes);
app.use('/', subMemberRoutes);
app.use('/', assistProfRoutes);
app.use('/', motoristForms);
app.use('/', otherModels);
app.use('/', memberSearchCriteria);
app.use('/', apSearchCriteria);

app.use(bodyParser.json({limit: "40mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "40mb", extended:true}));

const CONNECTION_URL = 'mongodb+srv://csit314-user:csit314@lemon.pmheg.mongodb.net/lemonDB?retryWrites=true&w=majority';

mongoose.connect(process.env.CONNECTION_URL || CONNECTION_URL) 
.then(() => app.listen(process.env.PORT || 5000)); // port to listen on 

