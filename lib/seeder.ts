import { _CONNECTION } from '../app';
import { Users } from '../models/users';
import { dummy_users } from './dummys/users';
import { logger, modes } from './logger';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from '../config';
import { APIKeys } from '../models/apikeys';

export const seedUsers: Function = async () => {
    await getConnection().synchronize(true)
    for(let i: number = 0; i < dummy_users.length; i++) {
        const x = dummy_users[i];
        x.password = bcrypt.hashSync(x.password, config.saltRounds)
        await Users.create(x).save();
        logger("Created dummy user " + (i+1) + " of " + dummy_users.length + " (" + x.username + ")", modes.DEBUG);
    }

    await APIKeys.create({
        key: "yGCK9Jl7GHgKaWIRAEB2ZbT340UHdng8",
        name: "default",
        description: "It's just a dummy key."
    }).save();
    return true
}