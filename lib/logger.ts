import * as chalk from 'chalk';
import { config } from '../config';
import { MinKey } from 'typeorm';

export enum modes {
    NORMAL,
    HINT,
    WARN,
    ERROR,
    SUCCESS,
    NETWORK,
    CHAT,
    CRITICAL,
    DEBUG
}

/**
 * @returns Stunden:Minuten:Sekunden:Millisekunden
 */
export const time: Function = function getTime() {
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

    // Millis
    var milli: string = date.getMilliseconds().toString();
    milli = (parseInt(milli) < 10 ? "00" : "") + milli;
    milli = (parseInt(milli) < 100 ? "0" : "") + milli;

    return "[" + hour + ":" + min + ":" + sec + "," + milli + "] ";
}

export const datetime: Function = (): string => {
    let date: Date = new Date()

    // Month
    let month: string = date.getUTCMonth().toString();
    month = (parseInt(month) < 10 ? "0" : "") + month;

    // Day
    let day: string = date.getUTCDate().toString();
    day = (parseInt(day) < 10 ? "0" : "") + day;

    // Hours
    let hour: string = date.getHours().toString();
    hour = (parseInt(hour) < 10 ? "0" : "") + hour;

    // Minutes
    let min: string  = date.getMinutes().toString();
    min = (parseInt(min) < 10 ? "0" : "") + min;

    // Seconds
    let sec: string = date.getSeconds().toString();
    sec = (parseInt(sec) < 10 ? "0" : "") + sec;

    return date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

/**
 * 
 * @param message Deine Nachricht
 * @param priority Die Priorität der Nachricht
 */
export const logger: Function = function(message: string, priority: modes) {
    switch(priority) {
        case modes.NORMAL:
            console.log(time() + chalk.default.gray("MESSAGE:\t") + message);
            break;
        case modes.SUCCESS:
            console.log(time() + chalk.default.green("SUCCESS:\t") + message);
            break;
        case modes.HINT:
            console.log(time() + chalk.default.yellow("HINT:\t") + message);
            break;
        case modes.WARN:
            console.log(time() + chalk.default.keyword('orange')("WARN:\t") + message);
            break;
        case modes.NETWORK:
            console.log(time() + chalk.default.magenta("NETWORK:\t") + message);
            break;
        case modes.CHAT:
            console.log(time() + chalk.default.magenta("CHAT:\t") + message);
            break;
        case modes.ERROR:
            console.log(time() + chalk.default.redBright("# ERROR:\t") + message);
            break;
        case modes.CRITICAL:
            console.log(time() + chalk.default.redBright("# CRITICAL:\t") + message);
            process.exit();
            break;
        case modes.DEBUG:
            if(config.development.debug) console.log(time() + chalk.default.cyan("DEBUG:\t") + message);
            break;
        default:
            console.log(time() + chalk.default.gray("MESSAGE: ") + message);
            break;
    }
}