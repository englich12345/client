import moment from 'moment';
export const getDate = (date, format) => date && moment(date).format(format || "YYYY-MM-DD")
export const getDateTime = (date, format) => date && moment(date).format(format || "YYYY-MM-DD HH:mm:ss") 