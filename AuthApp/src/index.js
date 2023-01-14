import express from "express";

import User from "./models/user.js";
import Group from "./models/group.js";

import Crypto from "./services/crypto.js";
import JwtToken from "./services/token.js";

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.json(
        {message:"started"}
    );
});

app.get('/services/db', (req, res) => {

    res.json({
        message : "running"
    })
});

app.post('/user', async (req, res) => {

    const {name, email, password} = req.body;

    const nameExists = await User.findOne({where:{name:name}});

    if(nameExists) {
        res.status(409).json({error:"user exists"});
    }

    const emailExists = await User.findOne({where:{email:email}});

    if(emailExists) {
        res.status(409).json({error:"email exists"});
    }

    const crypto = new Crypto();
    const pass = await crypto.crypto(password);

    const user = await User.create({name:name,email:email,password:pass});

    res.json(user);
});

app.get("/login",async (req, res) => {

    const {email, password} = req.body;

    const userExists = await User.findOne({
        where:{email:email}
    });

    if(!userExists) {
        res.status(404).json({
            error:"user not found"
        });
    }

    const {id,name,password:hashPassword} = userExists;

    const crypto = new Crypto();
    const passwordIsValid = await crypto.decrypto(password,hashPassword);

    if(!passwordIsValid) {
        res.status(401).json({
            error:"password invalid"
        });
    }

    const token = new JwtToken();
    const hashToken = token.generate(id,name,email);

    return res.json({
        token:hashToken
    });
});

app.get("/check-token",async (req, res) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        
        const jwtToken = new JwtToken();
        const isValidToken = jwtToken.verify(token);

        if (isValidToken) {

            const isValidUser = await User.findOne({
                where:{id : isValidToken.id, active : true}
            })

            if(!isValidUser) {
                res.status(404).json({
                    error : "user not found"
                });
            }

            res.json({
                message: "token is valid",
                token : isValidToken
            })
        } else {
            res.status(401).json({
                message: "invalid token"
            });
        }

    } catch(error) {
        res.status(401).json({
            error: "please, send token in the authotization header with Bearer type"
        });
    }
});

app.listen(port, () => {
    console.log(`app started at port : ${port}`)
});