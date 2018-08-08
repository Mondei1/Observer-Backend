import { _VERSION, _AUTHOR, _STATS } from "../app";
import { validate } from "./validateToken";
import { isClient } from "./isClient";
import { POST_auth } from "../endpoints/POST_auth";

import * as path from 'path';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import * as socket from 'socket.io';

import { config } from "../config";
import { client_config } from "../client_config";
import { logger, modes } from "./logger";
import { _IO } from '../app';

import { get_config } from "../events/get_config";
import { player_join } from '../events/player_join';
import { fetchAll } from "../events/fetchAll";
import { player_leave } from "../events/player_leave";
import { POST_apikey } from "../endpoints/POST_apikey";
import { Server_logout } from "../events/server_logout";
import { player_switch } from "../events/player_switch";
import { player_afk } from "../events/player_afk";
import { player_chat } from "../events/player_chat";

export const Router: Function = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("<h1>Yay, Observer is working!</h1> <p>You did a great job.</p>");
    })

    app.post("/apikey", (req, res) => POST_apikey(req, res))

    /**
     * Get's executed before a connection gets created.
     */ 
    _IO.use((socket: any, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, config.jwtKey, function(err, decoded) {
                if(err) return next(new Error('Token not vaild!'));
                socket.decoded = decoded;
                next();
            });
        } else {
            socket.disconnect();
            next(new Error('Token not vaild!'));
        } 
    })

    /**
     * Get's executed when a client want's to create a connection.
     */
    _IO.on('connection', (socket) => {
        // Setup auth middleware.
        socket.use((packet, next) => {
            try {
                jwt.verify(JSON.parse(JSON.stringify(packet[1])).token, config.jwtKey);
                next();
            } catch (error) {
                socket.disconnect();
                next(new Error("Token not vaild!"))
            }
        })

        // Set 'server logout'
        socket.on('server logout', (data) => Server_logout(data, socket));

        // Set 'get config'
        socket.on('get config', (data) => get_config(data, socket))

        // Set 'shutdown'
        socket.on('shutdown', (data) => socket.broadcast.emit("shutdown", null))

        // Set 'player join'
        socket.on('player join', (data) => player_join(data, socket))

        // Set 'player leave'
        socket.on('player leave', (data) => player_leave(data, socket))

        socket.on('player switch', (data) => player_switch(data, socket))

        socket.on('player afk', (data) => player_afk(data, socket))

        socket.on('player chat', (data) => player_chat(data, socket))

        // Set 'broadcast-msg'.
        socket.on('broadcast-msg', (data) => {
            delete data['token'];
            console.log(data);
            
            socket.broadcast.emit("broadcast", data);
        })

        // Set 'fetchAll'.
        socket.on('fetchAll', (data) => fetchAll(data, socket))

        // Set 'disconnect'
        socket.on('disconnect', (socket) => {
            logger("Client disconnect!",  modes.DEBUG);
            _STATS.SOCKETS -= 1;
        })

        _STATS.SOCKETS += 1;
        //socket.broadcast.emit("new socket", socket)
    });

    app.post("/auth", (req, res) => POST_auth(req, res))
}