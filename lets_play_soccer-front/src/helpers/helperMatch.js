import moment from "moment";

export const getConfirmedUsersNumber = users => {
    return users.reduce((acc, count) => {
        return acc + !!count.user_match.confirmed;
    }, 0);
};

export const getHours = hours => moment(hours).format('HH:mm');
export const getDate = datetime => moment(datetime).format('DD MMMM');
export const getDayOfTheWeek = datetime => moment(datetime).format('dddd');
export const getTimeDiff = (startTime, endTime) => {
    const hours = moment(endTime).diff(startTime, 'hours');
    const minutes = moment.utc(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm"))).format("mm");
    return (hours < 10 ? '0'+ hours : hours) + ':' + minutes;
};
export const getPlayerWord = number => {
    switch (number) {
        case 1:
            return 'игрок';
        case 2:
        case 3:
        case 4:
            return 'игрока';
        default:
            return 'игроков';

    }
};

export const getPricePerPerson = (priceTotal, format, team) => {
    const price = Math.round(priceTotal / (format * team));
    if (price === Infinity) return 0;
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
};

export const getMatchStatusImg = (status) => {
    switch (status) {
        case 'В ожидании':
            return 'waiting.svg';
        case 'Игра началась':
            return 'going.svg';
        case 'Игра Завершена':
            return 'waiting.svg';
        default:
            return 'waiting.svg';
    }
};