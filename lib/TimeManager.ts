import { _STATS } from "../app";
import { player_afk } from "../events/player_afk";
import { logger, modes } from "./logger";
import { WSAEPROVIDERFAILEDINIT } from "constants";
import { MCProfiles } from "../models/mc_profiles";

let save: number = 60; // 1min

export const TimeManager: Function = function getTime() {
    var date = new Date();

    // Hours
    var hour: string = date.getHours().toString();
    hour = (parseInt(hour) < 10 ? "0" : "") + hour;

    // Minutes
    var min: string  = date.getMinutes().toString();
    min = (parseInt(min) < 10 ? "0" : "") + min;

    // Seconds
    var sec: string = date.getSeconds().toString();
    sec = (parseInt(sec) < 10 ? "0" : "") + sec;

    return "[" + hour + ":" + min + ":" + sec + "] ";
}

/**
 * Async AFK checker that writes every minute the new online time into the database.
 */
export async function AFKChecker() {
    async function run() {
        await _STATS.ONLINE_PLAYERS.forEach(async (player) => {
            if(player.afk != true) {
                player.onlineTime += 1;
                //logger("Add one second to the online time from " + player.name + "\tSave time: " + save, modes.DEBUG)
            }            
            if(save == 0) {
                //await logger("Save...", modes.DEBUG)
                const copy = await MCProfiles.findOne({where: { uuid: player.uuid }});
                copy.onlineTime = player.onlineTime;
                await copy.save()
            }
        })
        if(save == 0) save = 61;
        save--;
        AFKChecker()
    }

    // Call function run() every second.
    setTimeout(async () => {
        await run()
    }, 1000);
}