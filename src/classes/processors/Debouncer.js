import Base from './Base'
import debounce from './helpers/debounce';


export default class Debouncer extends Base {
  _wrapHandler = (fn) => debounce(fn, this.time);
}
