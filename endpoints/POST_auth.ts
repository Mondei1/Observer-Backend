import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { config } from "../config";
import { logger, modes } from "../lib/logger";
import * as chalk from "chalk";
import { Users } from '../models/users';

export const POST_auth: Function = async (req, res) => {
    if(req.body.username == undefined || req.body.password == undefined) {
        res.status(400).send();
        return
    }
    let username: string = req.body.username;
    let password: string = req.body.password;
    let realtime: boolean = req.body.realtime;

    // Check if user exists in DB.
    let user: Users = await Users.findOne({
        where: {
            username: username
        }
    })
    if(user == undefined) {
        res.status(401).send();
    } else {
        bcrypt.compare(password, user.password, function(err, truth) {
            if(truth) {
                let key: any = jwt.sign({
                    id: user.id,
                    username: user.username,
                }, config.jwtKey, { expiresIn: 60 * 60 * 24 });
                res.status(200).send({ token: key })

                logger("Access for user " + chalk.default.bold(user.username) + " got " + chalk.default.green("granted") + "!", modes.SUCCESS);
            } else {
                logger("Access for user " + chalk.default.bold(user.username) + " got " + chalk.default.red("denied") + "!", modes.SUCCESS);
                res.status(401).send()
            }
        });
    }
}