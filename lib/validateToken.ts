import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const validate: Function = function(req, res, next) {
    if(req.headers.token != null || req.headers.token != undefined) {
        try {
            jwt.verify(req.headers.token, config.jwtKey);
        } catch(err) {
            res.status(401).send("Token declined!");    // Response with status code 401 (Unauthorized)
            return;
        }
        next(); // This token is valid so we can continue with whatever we do.
    } else {
        res.status(400).send("Token is missing!");
    }
}