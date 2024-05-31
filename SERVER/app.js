import express, { urlencoded } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import { User } from "./src/models/user.model.js";
import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";

const app = express();

//dotenv config
dotenv.config({path : './.env'})
console.log(process.env.CORS_ORIGIN);

//google auth config
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new passportGoogleOauth20({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
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

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173');
  });


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './src/routes/user.route.js'
import cartRouter from './src/routes/cart.route.js'
import orderRouter from './src/routes/order.route.js'
import productRouter from './src/routes/product.route.js'
import wishlistRouter from './src/routes/wishlist.route.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/carts",cartRouter)
app.use("/api/v1/orders",orderRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/wishlists",wishlistRouter)

export { app }