import * as path from 'path';
import * as fs from 'fs';
import { _IO } from '../app';
import { client_config } from '../client_config';
import { add_ONLINE_PLAYER, remove_ONLINE_PLAYER } from '../lib/globale_vars';
import { Leave_History } from '../models/leave_history';

export const player_leave: Function = (data, socket) => {
    if(data.user != null) {
        remove_ONLINE_PLAYER(data.user);
        Leave_History.create({
            timestamp: Date.now(),
            player: data.user
        }).save();
        socket.broadcast.emit("player leave", data.user);
    }
}