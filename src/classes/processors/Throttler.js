import Base from './Base'
import _ from 'lodash'

export default class Throttler extends Base {
  _wrapHandler = (fn) => _.throttle(fn, this.time);
}
