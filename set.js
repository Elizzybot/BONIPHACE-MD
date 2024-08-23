const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0U4amQ4L245VTFkcE1mU29yeDZwYi84OWhJdStsVk1lNWdtYXg3NVBsTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0VVNDZ6N3pnVHNoblU0RjNYNG1OUklTVU5GSFNVWnliYlNoUm1TMUdGQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUHZuR2FaSHlLekV2b1pWOThjTS9lNXBzaWg1Uk40d1h2RDJKRVdOZm1jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2dGRxdGJ5TkZpSWx5dU5DaXZBRG55N21sa09aVE5GNDR4QzJNMCtONFE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNJVVZvdEtSRkZ5a20wN3VYTndnTm45dlVNSUlta294eDZCQ0lCYWNpMnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhGdUc5WEk2N050NXBORFF0dE05T3ljbzN4eUpSQm42Yko2TkRQMSsyRmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktEVnd4UU15TFlMZ0pMNWtVaWM2eDgzV2o2WTVzOVhETjZPUkpCajQwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidi9qZW9ESFBtY2s4WDJub0RlejFEcjIxdDgrajk2a1l5N3lxWW5yYkJCMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJzQmFvczJqYXpxcVZzdGY4V0N4WVFyY2VsY2RDak9vb2Y5czlMVWNOTVV5Qis0L1l6WFordHowcEU0VkNBSUgrTEVNdGpjN2l6eGlYMERLRFJQemhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMzLCJhZHZTZWNyZXRLZXkiOiI2TkZHV3pUa1JhUXlaUnc2RVZCM3AweG1wVG90M2dXTXNsbFJMU21GenNvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNR1VJV2hmdlR1T1JpeEhiWHB4WXlnIiwicGhvbmVJZCI6IjNlY2EwZWE3LTY5ODYtNGM1MS1iMTliLWQ1ODI3YmE5NmJkYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBbDlRUlNMSHcyTjFvWDNWYkVSbUFObE5qSGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUpvc2krTEswWU84S05XaWpINzkvL0E1TE13PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5YWUFLU0RGIiwibWUiOnsiaWQiOiIyMzQ3MDM4NDk0OTk3Ojk0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik5vLW5hbWUgVGVjaCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWZmN213UTg3dWt0Z1lZQXlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTzVvaElYZkxuS01wWGR3dlpDNDBTb1NoUnJCT3FndlhPSjQ0UFNPZlhpST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiR2xmTi8zeTBURU1BaVhQMy96d1M4NUdEMDdPUENUYWYwVmlzbXFUQTFBc0VCVlRUT0xUR0hGN3JNdG5aY0lpZGF5ZkExOHhZOFRPclQxTUNZejFBQnc9PSIsImRldmljZVNpZ25hdHVyZSI6InNKcHhrSmxDTnI3bDFEZEE0TjREWUJJbFFma2pXRnlhcHhLOVJtUHQ4SjcyNkdxTzI4RExkRXBQZmxSZysvRU1EOURic0JBOWJiSEorbWZiYTE4UWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAzODQ5NDk5Nzo5NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUdWFJU0YzeTV5aktWM2NMMlF1TkVxRW9VYXdUcW9MMXppZU9EMGpuMTRpIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0NDU2NDQ4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFDNCJ9',
    PREFIXE: process.env.PREFIX || "",
    OWNER_NAME: process.env.OWNER_NAME || "no-name tech Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2347038494997",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'no-name MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dc401d2c40b761b6c8e10.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
