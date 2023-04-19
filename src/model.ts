import { regexp,phone,idExp } from "./controler";

//проверает сообщение на просьбу ссылки
export const isNLink = (str: string | undefined): boolean => {
    if (!isUndefined(str))
    {
        console.log('1')
        return false;
    }
    else if (str!.match(regexp) === null)
    {
        console.log('2')
        return false;
    }
    else
        return true;
}
//Проверка на undefined
export const isUndefined = (str: number | string | undefined): boolean => {
    if (str === undefined)
        return false;
    else
        return true;
}
//возращает номер телефона из строки
export const getPhone = (str:string|undefined):string => {
    let number = str!.match(phone);
    if(number===null)
        return "error";
    else
        return number[0];
}
//возращает ИД КЛ из строки
export const getID = (str:string):string => {
    let id = str!.match(idExp);
    if(id===null)
        return "error";
    else
    {
        let result:string = id.join('');
        return result;
    }
        
}
//Удаление подстроки
export const replaceSubStr = (str:string,sub:string,replacement=''):string =>{
    str = str.replace(sub,replacement);
    return str;
}
//Получение "просьбы" из строки(нужно что бы в Controler удалить эту подстроку)
export const RegExpToStr = (regexp:RegExp, str:string):string =>{
    let result = str.match(regexp);
    return result![0];
}