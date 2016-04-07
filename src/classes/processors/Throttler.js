import Base from './Base'
import throttle from './helpers/throttle';

export default class Throttler extends Base {
  _wrapHandler = (fn) => throttle(fn, this.time);
}
