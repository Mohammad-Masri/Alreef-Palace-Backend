import * as moment from 'moment';

export const currDate = () => {
  return function () {
    return moment.utc();
  };
};
