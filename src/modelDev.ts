import { getPhone, replaceSubStr, getID, checkPhone, LinkData } from "./model";

//проверает сообщение на просьбу ссылки

export const parseData = (str: string | undefined): LinkData => {
    let obj: LinkData = {
        phone: '',
        id: '',
    }
    obj.phone = getPhone(str);
    str = replaceSubStr(str!, obj.phone);
    obj.phone = checkPhone(obj.phone);
    obj.id = getID(str!);
    console.log(obj);
    return obj;
}