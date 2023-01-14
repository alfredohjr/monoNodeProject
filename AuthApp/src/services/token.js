import jwt from "jsonwebtoken";

import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET;

export default class JwtToken {

    constructor(){
        this.options = {expiresIn : '1h'};
    }

    generate(id, name, email) {
        const payload = {id:id, name:name, email:email};
        const token = jwt.sign(payload, secret, this.options);
        return token;
    };

    verify(token) {
        try {
            const verify = jwt.verify(token,secret);
            return verify;
        } catch (error) {
            return false;
        }
    };
}

