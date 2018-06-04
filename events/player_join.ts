import * as path from 'path';
import * as fs from 'fs';
import { _IO } from '../app';
import { client_config } from '../client_config';
import { add_ONLINE_PLAYER } from '../lib/globale_vars';
import { Join_History } from '../models/join_history';

export const player_join: Function = (data, socket) => {
    if(data.user != null) {
        add_ONLINE_PLAYER(data.user);
        Join_History.create({
            timestamp: Date.now(),
            player: data.user
        }).save();
        socket.broadcast.emit("player join", data.user);
    }
}