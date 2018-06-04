import * as path from 'path';
import * as fs from 'fs';
import { _IO } from '../app';
import { client_config } from '../client_config';

export const get_config: Function = (data, socket) => {
    fs.readFile(path.join(__dirname + "/../client_config.ts"), (err, data) => {
        _IO.sockets.connected[socket.id].emit('get config', JSON.stringify(client_config, null, 4))
    })
}