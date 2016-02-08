import chai from 'chai';
import Debouncer from '../../../src/classes/processors/Debouncer';
import React from 'react';
import sinon from 'sinon';

chai.should();

describe('Base processor', function() {
  it('should cancel throttle functions when destroyed', function(done) {
    const func = sinon.spy();
    const element = <input onChange={func} />;
    const debouncer = new Debouncer(element, "onChange", 200);

    const el = debouncer.element();
    el.props.onChange();
    debouncer.destroy();

    setTimeout(function() {
      func.called.should.be.false;
      done();
    }, 400);
  });

  it('should wrap functions properly', function(done) {
    const func = sinon.spy();
    const element = <input onChange={func} />;
    const debouncer = new Debouncer(element, "onChange", 200);

    const el = debouncer.element();
    el.props.onChange();

    setTimeout(function() {
      func.called.should.be.true;
      done();
    }, 250);
  });
});
