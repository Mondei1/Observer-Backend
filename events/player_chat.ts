import { logger, modes, datetime } from "../lib/logger";
import { MCProfiles } from "../models/mc_profiles";
import chalk from "chalk";
import { ChatHistory } from "../models/chat_history";

export const player_chat: Function = async (data, socket) => {
    const db = await MCProfiles.findOne({ where: { uuid: data.user }, relations: ['server']})
    await ChatHistory.create({
        message: data.message,
        player: db,
        timestamp: datetime()
    }).save();
    logger(chalk.bold(db.name + " [" + db.server.name + "]") + " ⇢ " + data.message, modes.CHAT);
}