import chai from 'chai';
import Throttler from '../../../src/classes/processors/Throttler';
import React from 'react';
import isWrappedFunction from '../../helpers/isWrappedFunction';

chai.should();

describe('Debounce processor', function() {
  it('should wrap handlers with throttler function', function() {
    const func = function() {};
    const element = <input onChange={func} />;
    const throttler = new Throttler(element, 'onChange', 400);

    const el = throttler.element();

    isWrappedFunction(el.props.onChange).should.be.true;
  });
});
