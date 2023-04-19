import { regexp,phone,idExp } from "./controler";

export type LinkData = {
    phone:string,
    id:string
}

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
    {
        return number[0];
    }
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

export const checkPhone = (number:string):string => {
    console.log('check number')
    if(number.length==10)
    {
        console.log('if in check number');
        number = "38" + number;
        console.log(number);
    }
    return number;
}

