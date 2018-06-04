// PLAYER's
let _ONLINE_PLAYERS: Array<string>           = new Array<string>();
let _OFFLINE_PLAYERS: Array<string>          = new Array<string>();
let _ALL_PLAYERS: Array<string>              = new Array<string>();

// CONNECTIONS
let _SOCKETS: Array<any>                     = new Array<any>();

export const setDefault: Function = () => {
    _ONLINE_PLAYERS = [];
    _OFFLINE_PLAYERS = [];
    _ALL_PLAYERS = [];
    _SOCKETS = [];
}

/**
 * Getter's
 */
export const get_ONLINE_PLAYERS: Function = () => {
    return _ONLINE_PLAYERS;
}
export const get_OFFLINE_PLAYERS: Function = () => {
    return _OFFLINE_PLAYERS;
}
export const get_ALL_PLAYERS: Function = () => {
    return _ALL_PLAYERS;
}
export const get_SOCKETS: Function = () => {
    return _SOCKETS;
}

/**
 * Setter's
 */
// ADD Online_Player
export const add_ONLINE_PLAYER: Function = (item: string) => {
    _ONLINE_PLAYERS.push(item)
    if(_OFFLINE_PLAYERS.indexOf(item) != -1) _OFFLINE_PLAYERS.splice(_OFFLINE_PLAYERS.indexOf(item), 1)
}
// REMOVE Online_Player
export const remove_ONLINE_PLAYER: Function = (item: string) => {
    _ONLINE_PLAYERS.splice(_ONLINE_PLAYERS.indexOf(item), 1)
    _OFFLINE_PLAYERS.push(item)
}

// ADD Sockets
export const add_SOCKETS: Function = (socket: any) => {
    _SOCKETS.push(socket)
}
// REMOVE Sockets
export const remove_SOCKETS: Function = (socket: any) => {
    _SOCKETS.splice(_SOCKETS.indexOf(socket), 1)
}