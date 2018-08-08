import { MCProfiles } from "../models/mc_profiles";

export class Stats {
    /* Variables to get result's direct from momory. */
    SOCKETS: number = 0;
    ONLINE_PLAYERS: Array<MCProfiles> = [];

    /* Methodes to get result's from database. */
    async getOnlinePlayers(): Promise<Array<MCProfiles>> {
        return await MCProfiles.find({where: { online: true }});
    }
    async getOfflinePlayers(): Promise<Array<MCProfiles>> {
        return await MCProfiles.find({where: { online: false }});
    }
    async getAllPlayers(): Promise<Array<MCProfiles>> {
        return await MCProfiles.find();
    }
}