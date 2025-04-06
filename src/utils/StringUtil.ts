
const isEmpty = (str: string): boolean =>{
    return str == null || str == undefined || str == "";
}

const isNotEmpty = (str: string): boolean => {
    return !isEmpty(str)
}


export default {
    isEmpty: (text) => isEmpty(text),
    isNotEmpty: (text) => isNotEmpty(text),
}
