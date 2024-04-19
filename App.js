import express from 'express';
import mongoose from 'mongoose';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import UserRoutes from './Users/routes.js';
import session from 'express-session';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect('mongodb://localhost:27017/kanbas');
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUnitialized: false,
}
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
)
app.use(express.json());

CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
UserRoutes(app);
Hello(app);

app.listen(process.env.PORT || 4000);