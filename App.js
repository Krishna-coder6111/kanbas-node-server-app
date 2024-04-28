    import Hello from "./Hello.js";
    import Lab5 from "./Lab5.js";
    import "dotenv/config";
    import express from 'express';
    import cors from "cors";
    import CourseRoutes from "./Kanbas/courses/routes.js";
    import ModuleRoutes from "./Kanbas/modules/routes.js";
    import mongoose from 'mongoose';
    import UserRoutes from "./Users/routes.js";
    import session from "express-session";
    const app = express();
    const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
    


    app.use(
        cors({
          credentials: true,
          origin: [process.env.FRONTEND_URL, "https://a6--merry-treacle-6a0621.netlify.app", "https://master--merry-treacle-6a0621.netlify.app"]
        })
       );
       const sessionOptions = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      };
      if (process.env.NODE_ENV !== "development") {
        sessionOptions.proxy = true;
        sessionOptions.cookie = {
          sameSite: "none",
          secure: true,
          domain: process.env.HTTP_SERVER_DOMAIN,
        };
      }
      app.use(session(sessionOptions));
      
      
    mongoose.connect(CONNECTION_STRING);
    app.use(express.json());
    UserRoutes(app);
    CourseRoutes(app);
    ModuleRoutes(app);
    Lab5(app);
    Hello(app);

    
    app.get('/', (req, res) => res.send('Hello World!'));
    
    const port = 4000;
    app.listen(process.env.PORT || 4000); 