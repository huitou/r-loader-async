import React from 'react';
import { func } from 'prop-types';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const initialState = {
  value: undefined,
  error: undefined,
  inAsync: false
};

class AsyncLoader extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "value", () => this.state.value);

    _defineProperty(this, "error", () => this.state.error);

    _defineProperty(this, "inAsync", () => this.state.inAsync);

    _defineProperty(this, "load", params => {
      this.setState({
        inAsync: true
      });
      this.props.service(params).then(data => {
        this.setState({
          value: data,
          error: undefined,
          inAsync: false
        });
      }).catch(error => {
        this.setState({
          value: undefined,
          error,
          inAsync: false
        });
      });
    });

    _defineProperty(this, "clear", () => {
      this.setState(initialState);
    });

    this.state = initialState;
  }

  render() {
    return null;
  }

}

_defineProperty(AsyncLoader, "propTypes", {
  service: func.isRequired
});

export { AsyncLoader as CollectedAsyncLoader };
