import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { User } from "./models/user.model.js";
import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";
import esewa from "./payment/esewa.js";
import MongoStore from 'connect-mongo';
const app = express();

//dotenv config
dotenv.config({path : './.env'})
// console.log(process.env.CORS_ORIGIN);

//google auth config
// const CLIENT_ID = process.env.CLIENT_ID;

// const CLIENT_SECRET = process.env.CLIENT_SECRET;
console.log(process.env.SESSION_SECRET)
console.log(process.env.MONGODB_URI)
// Session configuration with connect-mongo
app.use(session({
  secret: process.env.SESSION_SECRET,  // Use a strong secret for session
  resave: false,
  saveUninitialized: false,
  secure: true,
  store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',  // Name of the collection to store sessions
  }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24  // 1 day
  }
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportGoogleOauth20({
    clientID:"692481142961-rv9gdv5mpggllp8fjq20s078sh2aknk3.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]   
},
async(accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({googleId:profile.id})
        if(!existingUser){
            const newUser = new User({
                googleId:profile.id,
                username:profile.displayName,
                email:profile.emails[0].value,
                avatar:profile.photos[0].value
            })
            await newUser.save()
            done(null, newUser)
        }
    }
    catch (error) {
        return done(error , null)
    }
    }
))

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
  });

app.get('/auth/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:5173/login')
  })

  app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send(null);
    }
  })

  app.get('/pay/esewa',esewa)


  const allowedOrigins = ['https://group-project-livid.vercel.app', 'http://localhost:5173','https://lucidmerch.netlify.app'];

  const corsOptions = {
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Foo'],
    credentials: true, 
  };
  
app.use(cors(corsOptions));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.route.js'
import cartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'
import productRouter from './routes/product.route.js'
import wishlistRouter from './routes/wishlist.route.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/carts",cartRouter)
app.use("/api/v1/orders",orderRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/wishlists",wishlistRouter)
app.use("*", (req, res) => {
    res.status(404).json({message: "Not Found"})
})

export { app }
