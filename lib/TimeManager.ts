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