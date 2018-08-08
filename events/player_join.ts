import * as path from 'path';
import * as fs from 'fs';
import { _IO, _STATS } from '../app';
import { client_config } from '../client_config';
import { Join_History } from '../models/join_history';
import { MCProfiles } from '../models/mc_profiles';
import { datetime, logger, modes } from '../lib/logger';
import chalk from 'chalk';
import { Bungeecords } from '../models/bungeecords';
import { Spigots } from '../models/spigots';

export const player_join: Function = async (data, socket) => {
    if(data.user != null) {
        const db = await MCProfiles.findOne({where: {uuid: data.user}})
        const bungeecord = await Bungeecords.findOne({where: { macAddress: data.network }})
        if(db == undefined) {
            await MCProfiles.create({
                uuid: data.user,
                joinedFirst: datetime(),
                lastLogin: datetime(),
                name: data.name,
                online: true,
                onlineTime: 0,
                afk: false,
                server: null,
                network: bungeecord
            }).save()
        } else {
            db.online = true;
            db.lastLogin = datetime();
            db.network = bungeecord;
            db.server = null;
            db.afk = false;
            db.save()
        }        
        await Join_History.create({
            timestamp: Date.now(),
            player: data.user,
            network: bungeecord
        }).save();
        _STATS.ONLINE_PLAYERS.push(db)
        logger("Player " + chalk.bold(data.name) + " joined the network " + chalk.bold(bungeecord.name), modes.NETWORK);
        socket.broadcast.emit("player join", data.user);
    }
}