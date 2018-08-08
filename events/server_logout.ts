import * as path from 'path';
import * as fs from 'fs';
import { _IO } from '../app';
import { client_config } from '../client_config';
import { Join_History } from '../models/join_history';
import { MCProfiles } from '../models/mc_profiles';
import { datetime, logger } from '../lib/logger';
import { Sessions } from '../models/sessions';

export const Server_logout: Function = async (data, socket) => {
    const session = await Sessions.create({
        id: data.id,
        ended: datetime()
    }).save();
    logger("Session " + data.id + " end's.")
}