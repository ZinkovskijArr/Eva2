import { isNLink, getPhone, replaceSubStr, getID, LinkData, checkPhone } from "./model";
import { returnLink, replyAdmin } from "./app";
import { parseData } from "./modelDev";
require('dotenv').config();

export const regexp = /можна ручне|ручную клиент|дайте ручное|дайте ручне|можно ручное|ручне посилання|можно ручную|ручне будь ласка|ручне|ручну|ручное/ig;
export const phone = /380\d{9}|0\d{9}/;
export const idExp = /\d/g;

let request;//полный запрос от события message
enum State { dev = 'dev', prod = 'prod' };
let currentState = State.dev;

const staticLink = process.env.BASE_URL!;

export const newMessage = (msg: any): void => {
    let str = msg.text!;
    request = msg;
    let obj: LinkData;
    //проверка состояния 
    if (str === '/state') {
        replyAdmin(request.chat.id, currentState);
        console.log(currentState);
    }
    else if (str === '/setstate') {
        setState();
        replyAdmin(request.chat.id, currentState);
    }
    //формирование ссылки в dev режиме
    else if (currentState === State.dev) {
        obj = parseData(str);
        if (obj.phone === "error" || obj.id === "error")
            console.log("Object is empty");
        else {
            console.log(obj);
            str = createLink(obj);
            returnLink(request.chat.id, request.from.username, str);
        }
    }
    //формирование ссылки в prod режиме
    else if (isNLink(str)) {
        obj = {
            phone: '',
            id: ''
        }
        console.log("prod mode ");
        obj.phone = getPhone(str);
        str = replaceSubStr(str!, obj.phone);
        obj.phone = checkPhone(obj.phone);
        obj.id = getID(str!);
        console.log(obj);

        if (obj.phone === "error" || obj.id === "error")
            console.log("Object is empty");
        else {
            console.log(obj);
            str = createLink(obj);
            returnLink(request.chat.id, request.from.username, str);
        }
    }

}
//change state
const setState = (): void => {
    if (currentState === State.dev)
        currentState = State.prod;
    else
        currentState = State.dev;
}

const createLink = (obj: LinkData): string => {
    let link: string;
    link = `${staticLink}+${obj.phone}/${obj.id}`;
    console.log(`${staticLink}+${obj.phone}/${obj.id}`);
    return link;
}
