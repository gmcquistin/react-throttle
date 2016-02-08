import chai from 'chai';
import Debouncer from '../../../src/classes/processors/Debouncer';
import React from 'react';
import isWrappedFunction from '../../helpers/isWrappedFunction';

chai.should();

describe('Debounce processor', function() {
  it('should wrap handlers with debounce function', function() {
    const func = function() {};
    const element = <input onChange={func} />;
    const debouncer = new Debouncer(element, 'onChange', 400);

    const el = debouncer.element();

    isWrappedFunction(el.props.onChange).should.be.true;
  });
});
