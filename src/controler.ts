import { isNLink,getPhone, replaceSubStr, RegExpToStr, getID } from "./model";
import { answer } from "./app";
require('dotenv').config();

export const regexp = /можна ручне|ручную клиент|дайте ручное|дайте ручне|можно ручное|ручне посилання|можно ручную/g;
export const phone = /380\d{9}|0\d{9}/;
export const idExp = /\d/g;

let phoneNumber:string;
let clientId:string;
let request;//полный запрос от события message


const staticLink = process.env.BASE_URL!;

export const newMessage = (msg:any):void => {
    let str = msg.text!;
    request = msg;
    if(isNLink(str)){
        //получение номера телефона из ссылки
        phoneNumber = getPhone(str);
        //удаление номера из строки
        str = replaceSubStr(str,phoneNumber);
        //*****удаление просьбы из строки(можна и без него)
        // str = replaceSubStr(str,RegExpToStr(regexp,str))
        // console.log(str.length);
//----------------------------
        //получение ИД КЛ
        clientId = getID(str);
        //формирование ссылки для ответа сотруднику
        str = `${staticLink}+${phoneNumber}/${clientId}`;
        console.log(`${staticLink}+${phoneNumber}/${clientId}`);
        //console.log(encodeURIComponent(`${staticLink}+${phoneNumber}/${clientId}`));
        answer(request.chat.id,request.from.username,str);
    }
}
