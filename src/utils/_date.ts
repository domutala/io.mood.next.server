import * as moment from "moment";

moment.updateLocale("fr", { week: { dow: 1, doy: 4 } });

const formater = (date: string | Date, format = "DD MMMM YYYY") => {
  return moment(date).format(format);
};

const test = (date: string | Date) => {
  return moment(date).isValid();
};

export default { formater, test };
