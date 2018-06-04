import * as path from 'path';
import * as fs from 'fs';
import { _IO } from '../app';
import { client_config } from '../client_config';
import * as vars from '../lib/globale_vars';

export const fetchAll: Function = (data, socket) => {    
    let res: any = {
        online_players: vars.get_ONLINE_PLAYERS(),
        offline_players: vars.get_OFFLINE_PLAYERS(),
        total_players: vars.get_ALL_PLAYERS(),
        sockets: Array(vars.get_SOCKETS().toString())
    }
    _IO.sockets.connected[socket.id].emit('data', res)
}