import * as moment from 'moment';

export const currDate = () => {
  return function () {
    return moment.utc();
  };
};

export const getFirstDateAndLastDateInMonth = (data: Date) => {
  const first_date_of_month = moment(data)
    .startOf('month')
    .format('YYYY-MM-DD HH:mm');
  const last_date_of_month = moment(data)
    .endOf('month')
    .format('YYYY-MM-DD HH:mm');
  return {
    first_date_of_month,
    last_date_of_month,
  };
};
