import * as path from 'path';
import * as fs from 'fs';
import { _IO, _STATS } from '../app';
import { client_config } from '../client_config';

export const fetchAll: Function = (data, socket) => {    
    let res: any = {
        online_players: _STATS.getOnlinePlayers(),
        offline_players: _STATS.getOfflinePlayers(),
        total_players: _STATS.getAllPlayers(),
        sockets: _STATS.SOCKETS
    }
    _IO.sockets.connected[socket.id].emit('data', res)
}