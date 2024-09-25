const addZero = (number) => {
    return number < 10 ? '0' + number : number
    // return number.toString().pasStart(2, '0');
}

const currentTime = () => {
    let date = new Date;
    let result = {
        year: date.getFullYear(),
        mounth: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
    };
    for (const key in result) {
        result[key] = addZero(result[key]);
    }
    return result
};

module.exports = currentTime;