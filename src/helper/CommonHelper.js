import _ from 'lodash';
import moment from 'moment';

// Stock
export const normalizeStockTicker = (ticker) => {
    return _.toUpper(ticker);
}

export const addPriceSign = (price) => {
    return (price < 0) ? price : "+" + price;
}

// Date
export const normalizeDateFormat = (date) => moment(date).format("MMM Do, YYYY");

export const getDayOnDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var momentDate = moment(date);
    return days[momentDate.day()];
}

export const getQuarterYearOnDate = (date, withYear=true) => {
    var momentDate = moment(date);
    if (withYear) {
        return "Q" + momentDate.quarter() + " " + momentDate.year()
    } else {
        return "Q" + momentDate.quarter()
    }
}
