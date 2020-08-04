import moment from 'moment';

if (window.navigator && window.navigator.language) {
  moment.locale(window.navigator.language);
  console.debug('moment locale set to: ', window.navigator.language);
} else {
  moment.locale('en-gb');
  console.debug('navigator.language not found, moment locale set to: en-gb');
}
