import { logger, modes } from "../lib/logger";
import { MCProfiles } from "../models/mc_profiles";
import chalk from "chalk";

export const player_chat: Function = async (data, socket) => {
    const db = await MCProfiles.findOne({ where: { uuid: data.user }, relations: ['server']})
    logger(chalk.bold(db.name + " [" + db.server.name + "]") + " ⇢ " + data.message, modes.CHAT);
}