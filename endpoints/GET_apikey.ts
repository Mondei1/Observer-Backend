import { APIKeys } from "../models/apikeys";
import { Users } from "../models/users";
import { config } from "../config";

import * as jwt from 'jsonwebtoken';

export const GET_apikey: Function = async (req, res) => {
    const key: string = req.query.key;
    const db: APIKeys = await APIKeys.findOne({
        key: key
    });

    if(db == undefined) {
        res.status(401).send("You're API-key is wrong! Please contact the administrator to create one.")
    } else {
        let key: any = jwt.sign({
            name: db.name
        }, config.jwtKey, { expiresIn: 60 * 60 * 24 }); // 1 Day
        res.status(200).send({ token: key });
    }
}