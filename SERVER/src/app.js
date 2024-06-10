import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { User } from "./models/user.model.js";
import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";
import esewa from "./payment/esewa.js";

const app = express();

//dotenv config
dotenv.config({path : './.env'})
console.log(process.env.CORS_ORIGIN);

//google auth config
// const CLIENT_ID = process.env.CLIENT_ID;

// const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}))

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


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
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