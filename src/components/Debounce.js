import React, { Component } from 'react';
import Debouncer from '../classes/processors/Debouncer';
import Base from './Base';

export default class Debounce extends Base {
  static defaultProps = {
    handler: '',
    handlers: [],
    time: 400
  };

  constructor(props) {
    super(props);

    this._throttler = new Debouncer(this.el, this.handlersToWrap, props.time);
  }
}
