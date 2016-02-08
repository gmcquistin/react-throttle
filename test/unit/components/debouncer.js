import 'enzyme/withDom';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import Debounce from '../../../src/components/Debounce'
import isWrappedFunction from '../../helpers/isWrappedFunction';
import _ from 'lodash';
import sinon from 'sinon';
import { mount } from 'enzyme';


chai.should();

describe('Debouncer component', function() {
  it('should render the child component', function() {
    const renderer = TestUtils.createRenderer();

    renderer.render(
      <Debounce>
        <input value="Test" />
      </Debounce>
    );
    const output = renderer.getRenderOutput();

    output.type.should.equal('input');
    output.props.value.should.equal('Test');
  });

  describe('with one prop to wrap', function() {
    before(function() {
      const renderer = TestUtils.createRenderer();

      renderer.render(
        <Debounce handler="onClick">
          <ul onClick={function() {}} onMouseOver={function() {}}/>
        </Debounce>
      );
      this.output = renderer.getRenderOutput();
    });

    it('should wrap specified prop', function() {
      isWrappedFunction(this.output.props.onClick).should.be.true;
    });

    it('should not wrap unspecified prop', function() {
      isWrappedFunction(this.output.props.onMouseOver).should.be.false;
    });
  });

  describe('with an array of props to wrap', function() {
    before(function() {
      const renderer = TestUtils.createRenderer();
      renderer.render(
        <Debounce handlers={['onClick', 'onBlur', 'onChange']}>
          <input onClick={() => {}}
                 onBlur={() => {}}
                 onChange={() => {}}
                 onMouseOver={() => {}}
                 />
        </Debounce>
      );
      this.output = renderer.getRenderOutput();
    });

    it('should wrap specified props', function() {
      const props = _.pick(this.output.props, ['onClick', 'onBlur', 'onChange']);

      _.every(props, isWrappedFunction).should.be.true;
    });

    it('should not wrap unspecified props', function() {
      isWrappedFunction(this.output.props.onMouseOver).should.be.false;
    });
  });

  describe('when unmounting', function() {
    it('should cancel throttling operations', function(done) {
      const fn = sinon.spy();
      const wrapper = mount(
        <Debounce time="100" handler="onClick">
          <button onClick={fn}/>
        </Debounce>
      );
      const button = wrapper.find('button');

      button.simulate('click');
      wrapper.unmount();

      setTimeout(function() {
        fn.called.should.be.false;
        done();
      }, 150);
    });
  });
});
