import _telegramAPI = require("node-telegram-bot-api");
import { newMessage } from "./controler";

require('dotenv').config();

const bot = new _telegramAPI(process.env.TOKEN!, { polling: true });

bot.on('message', (msg): void => {
    newMessage(msg);
});

console.log('work');

export const returnLink = (id:number,username:string,link:string):void => {
    bot.sendMessage(id,`@${username} \n${link}`);
    console.log(encodeURI(link));
}
export const replyAdmin = (id:number,data:string):void => {
    bot.sendMessage(id,`${data}`);
}
