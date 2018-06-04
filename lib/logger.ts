var chalk = require('chalk'); // For colors in the console.
import { TimeManager } from './TimeManager';
import { config } from '../config';

export enum modes {
    ERROR,
    DEBUG,
    HINT,
    WARN,
    SUCCESS
}

export const logger: Function = function(message: string, type: modes) {
    // Editing message
    let spaces: number = (TimeManager().length + 5 + type.toString().length);
    let toReplace: string = "";
    for(let i: number = 0; i < spaces; i++) toReplace += " ";

    message = message.replace(/\n/gi, "\n" + toReplace);

    // If the message is empty or null/undefined.
    if(message == "" || message == null || message == undefined) {
        message = TimeManager() + chalk.italic("EMPTY");
    }
    // If type is undefined or null it's a regular message.
    if(type == undefined || type == null) {
        console.log(TimeManager() + chalk.gray("MESSAGE: ") + message);
    }

    // If type is error.
    if(type == modes.ERROR) {
        console.log(TimeManager() + chalk.red("ERROR: ") + message);
    }

    // If type is debug.
    if(type == modes.DEBUG && config.development.debug) {
        console.log(TimeManager() + chalk.cyan("DEBUG: ") + message);
    }

    // If type is hint.
    if(type == modes.HINT) {
        console.log(TimeManager() + chalk.yellow("HINT: ")+ message);
    }

    // If type is warning.
    if(type == modes.WARN) {
        console.log(TimeManager() + chalk.magenta("WARN: ") + message);
    }

    // If type is success.
    if(type == modes.SUCCESS) {
        console.log(TimeManager() + chalk.green("SUCCESS: ") + message);
    }
}