import { MCProfiles } from "../models/mc_profiles";
import { logger } from "../lib/logger";
import chalk from "chalk";

export const player_afk: Function = async (data, socket) => {
    const db = await MCProfiles.findOne({where: {uuid: data.user}, relations: ['server']})
    db.afk = true;
    await db.save();

    logger("Player " + chalk.bold(db.name) + " is now AFK on " + db.server.name + "!")
}