import React, { Component } from 'react';

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.el = React.Children.only(props.children);
    this.handlersToWrap = props.handler.length ? [props.handler] : props.handlers;
  }

  componentWillReceiveProps(newProps){
    this._throttler.processPropsChange(newProps.children.props)
  }

  componentWillUnmount() {
    this._throttler.destroy();
  }

  render = () => this._throttler.element();
}
