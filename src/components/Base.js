import React, { Component } from 'react';

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.el = React.Children.only(props.children);
    this.handlersToWrap = props.handler.length ? [props.handler] : props.handlers;
  }

  componentWillUnmount() {
    this._throttler.destroy();
  }

  render = () => this._throttler.element();
}
