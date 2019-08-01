'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

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

    _defineProperty(this, "change", changedData => {
      this.setState({
        data: changedData
      });
    });

    this.state = initialState;
  }

  render() {
    return null;
  }

}

_defineProperty(AsyncLoader, "propTypes", {
  service: propTypes.func.isRequired
});

exports.CollectedAsyncLoader = AsyncLoader;
