import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { _types } from '../models/users';

export const isClient: Function = (req, res, next) => {
    const token: string = req.headers.token
    const decoded: any = jwt.decode(token)
    
    if(decoded.type != _types.CLIENT) res.status(401).send("Only clients are allowed to use this path! And you are not a client!")
    else next()
}