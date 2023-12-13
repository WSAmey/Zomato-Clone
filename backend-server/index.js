import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import route from "./routes/restaurRoute.js";
import cors from "cors";
import {Stripe} from "stripe";

//in front end we use publishable key and in backend we have to use secret key

const stripe=Stripe("sk_test_51OMoOqSCVIBZdYnz7NSHcQN3Vmwlipx4yDAzAl0pfz3lgXJnWcIAbfHQQlh3SkkfvUWMH2HQlCh3f4bxPyVfg2tB00kEtbkxtu");

const app=express();

app.use(express.json()); //this will parse request body in json
app.use(cors());
dotenv.config();

// stripe checkout api

app.post("/api/create-checkout-session",async(req,res)=>{
    const {orders,subtotal}=req.body;
    console.log(orders, subtotal);
    const lineItems=orders.map((menu)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name: menu.name,
                images:[menu.image]
            },
            unit_amount:menu.subtotal * 100,

        }, 
        //here whatever amount we get, it will be converted to decimal with 2 zeros so we need to multiply the amount with 100

        quantity:menu.quantity
    }));
    console.log(lineItems);

    const session =await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    });

    res.json({id:session.id})

})

const PORT=process.env.PORT || 7000

const MONGOURL= process.env.MONGO_URL

mongoose.connect(MONGOURL).then(()=>{

    console.log("Database connected successfully");

    app.listen(PORT,()=>{

        console.log(`Server is running on port: ${PORT}`);

    })

}).catch((error)=>{
    console.log(error);
})

 app.use("/",route)
