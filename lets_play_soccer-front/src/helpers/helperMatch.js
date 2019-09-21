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
            return 'waiting';
        case 'Игра началась':
            return 'going';
        case 'Игра Завершена':
            return 'finished';
        default:
            return 'waiting';
    }
};

//create match
export const getHoursInCreateMatch = hours => {
    if (hours === 1) {
        return 'час';
    } else if (hours >= 0.5 && hours < 5) {
        return 'часа';
    } else if (hours >= 5 ) {
        return 'часов';
    }
};
export const getFormat = people => {
    switch (people) {
        case 1:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            return 'человек';
        case 2:
        case 3:
        case 4:
            return 'человека';
        default:
            return '';
    }
};
export const getTeams = team => {
    switch (team) {
        case 1:
            return 'команда';
        case 5:
            return 'команд';
        case 2:
        case 3:
        case 4:
            return 'команды';
        default:
            return '';
    }
};