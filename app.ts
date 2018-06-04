import * as express from 'express';
import * as chalk from 'chalk';
import * as bp from 'body-parser';
import * as cors from 'cors';
import * as socket from 'socket.io';
import * as http from 'http';

import * as vars from './lib/globale_vars';

import { logger, modes } from './lib/logger';
import { config } from './config';
import { seedUsers } from './lib/seeder';
import { createConnection, Connection } from 'typeorm';
import { Users } from './models/users';
import { Router } from './lib/router';

export let _CONNECTION: Connection = null;
export let _IO: any = null
export const _VERSION: string = "Beta-0.1";
export const _AUTHOR: string = "Mondei1";
export const _SESSION_START: number = Date.now();

async function run() {
    console.log(chalk.default.cyan("Observer") + " version " + chalk.default.blue(_VERSION) + " by " + chalk.default.yellow(_AUTHOR))
    console.log(chalk.default.gray("===================================="))
    vars.setDefault();
    const app = express()   // Start new express instance
    let server = http.createServer(app);
    _IO = new socket(server);

    _CONNECTION = await createConnection(); // Connect to database
    logger("Connected with database!", modes.SUCCESS);

    // Seeding
    if (config.development.dummys.users) await seedUsers();

    // Check if users are available.
    if (await _CONNECTION.getRepository(Users).count() == 0) logger("You need to create a superuser! Open the frontend to do that.\n" +
        "Otherwise, this thing here becomes useless, do you want this? No.", modes.HINT);

    app.use(cors())
    app.use(bp.urlencoded({ extended: false }))
    app.use(bp.json());
    
    // Setup socket.io and express routes.
    Router(app)

    server.listen(config.port, () => {
        logger("Started within " + chalk.default.bold((Date.now() - _SESSION_START) + "ms") + " on port " + config.port + " :D", modes.SUCCESS)
    })

    return null
}

run();