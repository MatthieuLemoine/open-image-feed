const moment = require('moment');

export function since(date) {
  return moment(date).fromNow();
}
