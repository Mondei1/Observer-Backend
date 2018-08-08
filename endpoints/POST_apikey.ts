import { APIKeys } from "../models/apikeys";
import { Users } from "../models/users";
import { config } from "../config";

import * as jwt from 'jsonwebtoken';
import chalk from 'chalk';
import { logger, modes, datetime } from "../lib/logger";
import { Bungeecords } from "../models/bungeecords";
import { randString } from "../app";
import { Spigots } from "../models/spigots";
import { Session } from "inspector";
import { Sessions } from "../models/sessions";
import { SSL_OP_COOKIE_EXCHANGE } from "constants";
import { isUndefined } from "util";

interface IBungeecord {
    mac: string,
    servers: Array<IServer> // Array of servers of the bungeecord.
}

interface IServer {
    name: string,
    port: number
}

interface ISpigot {
    mac: string,
    port: number
}

export const POST_apikey: Function = async (req, res) => {
    const key: string = req.body.key;
    const name: string = req.body.name;
    const sessionID: string = randString(16);
    const bungeecord: IBungeecord = (req.body.bungeecord);  // Only bungeecord server's will send this field.
    const spigot: ISpigot = (req.body.spigot);              // Only spigot server's will send this field.

    const db: APIKeys = await APIKeys.findOne({
        key: key
    });
    let bungee: Bungeecords;
    // If field 'bungeecord' isn't empty.
    if(bungeecord != undefined) {
        bungee = await Bungeecords.findOne({where:{ macAddress: bungeecord.mac }});
    }

    if(db == undefined) {
        res.status(401).send("You're API-key is wrong! Please contact the administrator to create one.")
        logger("Login unsuccessful!", modes.DEBUG)
    } else {
        let key: any;
        // Send other token contains id and mac.
        if(bungeecord != undefined) {
            if(bungee == undefined) {
                logger("Create bungeecord \"" + chalk.bold("Bungeecord on " + bungeecord.mac) + "\" with " + chalk.bold(bungeecord.servers.length.toString()) + " servers ...", modes.DEBUG);
                bungee = await Bungeecords.create({
                    id: "BC"+randString(6),
                    name: ("Bungeecord on " + bungeecord.mac),
                    description: "Just another bungeecord",
                    macAddress: bungeecord.mac
                }).save();
            }
            for(let i = 0; i < bungeecord.servers.length; i++) {
                const e: IServer = bungeecord.servers[i];
                if(await Spigots.findOne({where:{ port: e.port, name: e.name }}) == undefined) {
                    logger("Create spigot server for " + chalk.bold(bungee.name) + " called " + chalk.bold(e.name), modes.DEBUG);
                    await Spigots.create({
                        bungeecord: bungee,
                        description: e.name,
                        id: "SG"+randString(6),
                        name: e.name,
                        port: e.port,
                        sessions: null,
                        temp: false
                    }).save();
                }
            }
        }
        if(spigot != undefined) {
            let allServer: Spigots[] = await Spigots.find({ where: { port: spigot.port }, relations: ['bungeecord'] }); // Search for all servers with this port.
            const server = allServer.filter((value) => {
                if(value.bungeecord.macAddress == spigot.mac) return value; // Return's the bungeecord of the spigot server.
            })[0];
            if(isUndefined(server)) {
                logger("A server tries to get a connection but it got denied!", modes.WARN)
                res.status(401).send({ message: "You are not permitted to connect to this server."});
                return;
            }
            logger("Create new session for " + chalk.bold(server.name) + " (" + server.bungeecord.name + ") ...", modes.DEBUG);
            // Create new session.
            await Sessions.create({
                id: sessionID,
                started: datetime(),
                ended: null,
                server: server
            }).save();
        }
        key = jwt.sign({
            name: db.name
        }, config.jwtKey, { expiresIn: 60 * 60 * 24 }); // 1 Day
        //logger("Login successful!", modes.DEBUG);
        res.status(200).send({ token: key, sessionID: sessionID });
    }
}