import Base from './Base'
import throttle from './helpers/throttle';
import _ from 'lodash';

export default class Throttler extends Base {
  _wrapHandler = (fn) => _.throttle(fn, this.time);
}
