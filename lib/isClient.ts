import * as jwt from 'jsonwebtoken';
import * as path from 'path';

export const isClient: Function = (req, res, next) => {
    const token: string = req.headers.token
    const decoded: any = jwt.decode(token)
    
    if(decoded.name == undefined) res.status(401).send("Only clients are allowed to use this path! And you are not a client!")
    else next()
}