'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rSocsCore = require('r-socs-core');
var React = _interopDefault(require('react'));
var propTypes = require('prop-types');

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

class AsyncLoaderCollector extends rSocsCore.Collector {}

_defineProperty(AsyncLoaderCollector, "handleMap", {
  hfu: {
    hifu: {
      data: 'data',
      error: 'error',
      inAsync: 'inAsync'
    },
    hefu: {
      clear: 'clear',
      load: 'load'
    }
  }
});

const initialState = {
  data: undefined,
  error: undefined,
  inAsync: false
};

class AsyncLoader extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "data", () => this.state.data);

    _defineProperty(this, "error", () => this.state.error);

    _defineProperty(this, "inAsync", () => this.state.inAsync);

    _defineProperty(this, "load", params => {
      this.setState({
        inAsync: true
      });
      this.props.service(params).then(data => {
        this.setState({
          data,
          error: undefined,
          inAsync: false
        });
        this.props.loaded(data);
      }).catch(error => {
        this.setState({
          data: undefined,
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
  service: propTypes.func.isRequired,
  loaded: propTypes.func
});

_defineProperty(AsyncLoader, "defaultProps", {
  loaded: () => {}
});

/*
    Collected AsyncLoader.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/
const CollectedAsyncLoader = rSocsCore.withCollector(AsyncLoaderCollector)(AsyncLoader);

exports.CollectedAsyncLoader = CollectedAsyncLoader;
