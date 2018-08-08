import { logger, modes } from "../lib/logger";
import { MCProfiles } from "../models/mc_profiles";
import chalk from "chalk";
import { Spigots } from "../models/spigots";
import { Bungeecords } from "../models/bungeecords";
import { isUndefined, isNull } from "util";

export const player_switch: Function = async (data, socket) => {
    const db = await MCProfiles.findOne({ where: { uuid: data.user }, relations: ['server', 'network']})
    const bungeecord = db.network;

    let oldServer: string = "";
    if(isNull(db.server)) oldServer = "none"
    else oldServer = db.server.name;
    const newServer = await Spigots.findOne({ where: { port: data.switchedTo, bungeecord: bungeecord }})

    db.server = newServer;
    await db.save();

    logger("Player " + chalk.bold(db.name) + " switched server: " + oldServer + " → " + newServer.name, modes.NETWORK)
}