import * as path from 'path';
import * as fs from 'fs';
import { _IO, _STATS } from '../app';
import { client_config } from '../client_config';
import { Leave_History } from '../models/leave_history';
import { MCProfiles } from '../models/mc_profiles';
import { logger, modes } from '../lib/logger';
import chalk from 'chalk';

export const player_leave: Function = async (data, socket) => {
    if(data.user != null) {
        const db = await MCProfiles.findOne({where: {uuid: data.user}})
        db.online = false;
        db.server = null;
        db.network = null;
        db.save()

        await Leave_History.create({
            timestamp: Date.now(),
            player: data.user
        }).save();
        _STATS.ONLINE_PLAYERS.splice(_STATS.ONLINE_PLAYERS.indexOf(db));

        logger("Player " + chalk.bold(db.name) + " leaved the network", modes.NETWORK);
        socket.broadcast.emit("player leave", data.user);
    }
}