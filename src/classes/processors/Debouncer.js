import Base from './Base'
import _ from 'lodash'

export default class Debouncer extends Base {
  _wrapHandler = (fn) => _.debounce(fn, this.time);
}
