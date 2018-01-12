const config = require("../config");
const eol = require('os').EOL;
const levels = ["verbose", "info", "warn", "error"];

let canWriteToLog = (levelName) => {
    let currLevel = levels.indexOf(config.log);
    let logLevel = levels.indexOf(levelName);
    return logLevel >= currLevel;
};

let formatMsg = (msgs) => {
    let text = "";
    msgs.forEach(element => {
        text += " " + element;
    });
    return "[".concat(new Date().toISOString()).concat("] -").concat(text).concat(eol);
};

module.exports = {
    verbose: (...msgs) => {
        if (canWriteToLog("verbose")) {
            process.stdout.write(formatMsg(msgs));
        }
    },
    info: (...msgs) => {
        if (canWriteToLog("info")) {
            process.stdout.write(formatMsg(msgs));
        }
    },
    warn: (...msgs) => {
        if (canWriteToLog("warn")) {
            process.stdout.write(formatMsg(msgs));
        }
    },
    error: (...msgs) => {
        if (canWriteToLog("error")) {
            process.stderr.write(formatMsg(msgs));
        }
    }
};
