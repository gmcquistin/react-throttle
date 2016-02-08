import React, { Component } from 'react';
import Throttler from '../classes/processors/Throttler'
import Base from './Base';

export default class Throttle extends Base {
  static defaultProps = {
    handler: '',
    handlers: [],
    time: 100
  };

  constructor(props) {
    super(props);

    this._throttler = new Throttler(props.children, this.handlersToWrap, props.time);
  }
}
