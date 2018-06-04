import { _VERSION, _AUTHOR } from "../app";
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
import { add_SOCKETS, remove_SOCKETS } from '../lib/globale_vars';

import { get_config } from "../events/get_config";
import { player_join } from '../events/player_join';
import { fetchAll } from "../events/fetchAll";
import { player_leave } from "../events/player_leave";
import { GET_apikey } from "../endpoints/GET_apikey";

export const Router: Function = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("<h1>Yay, Observer is working!</h1> <p>You did a great job.</p>");
    })

    app.get("/apikey", (req, res) => GET_apikey(req, res))

    /**
     * Get's executed before a connection gets created.
     */ 
    _IO.use((socket, next) => {
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

        // Set 'get config'
        socket.on('get config', (data) => get_config(data, socket))

        // Set 'shutdown'
        socket.on('shutdown', (data) => socket.broadcast.emit("shutdown", null))

        // Set 'player join'
        socket.on('player join', (data) => player_join(data, socket))

        // Set 'player leave'
        socket.on('player leave', (data) => player_leave(data, socket))

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
            remove_SOCKETS(socket)
        })

        add_SOCKETS(socket)
        //socket.broadcast.emit("new socket", socket)
    });

    app.post("/auth", (req, res) => POST_auth(req, res))
}