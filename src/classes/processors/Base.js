import React from 'react';
import lodash from 'lodash';

const _ = lodash.runInContext();

// Processes a ReactElement by iterating over its props, looking for
// props which are specified by `handlersToWrap`. Matching props will
// be passed to the derived class to be wrapped in a throttling function
export default class Base {
  constructor(el, handlersToWrap, time) {
    if (this.constructor === Base) {
      throw new Error('Can\'t instantiate abstract class!');
    }

    // Array of handler names which we should wrap
    this.handlersToWrap = handlersToWrap;

    // Throttle interval/delay
    this.time = time;

    // Element that we are processing
    this.el = el;

    // Array of handlers which we have wrapped (so we can unwrap them)
    this.handlers = [];
  }

  // How the processed element is made public, memoized
  element = () => this._el || (this._el = this._processElement());

  // Clone the element, overwriting unwrapped handlers with their wrapped versions
  _processElement = () => {
    this.handlers = this._wrapHandlers();
    return React.cloneElement(this.el, this.handlers);
  };

  // Find the handlers which should be wrapped by the throttling function
  _extractHandlers = () => _.pickBy(this.el.props, this._shouldWrapHandler);

  // Pass each handler to the derived class to be wrapped
  _wrapHandlers = () => _.mapValues(this._extractHandlers(), this._wrapHandler);

  _shouldWrapHandler = (handler, handlerName) => {
    return _.isFunction(handler) && this.handlersToWrap.includes(handlerName);
  };

  // Cancel timers related to throttling
  destroy() {
    _.values(this.handlers).forEach(this._cancelThrottle);
  }

  // Lodash provides cancel methods on throttle/debounce wrappers
  _cancelThrottle(handler) {
    handler.cancel && handler.cancel();
  }
}
