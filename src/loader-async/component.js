import React from 'react';
import { func } from 'prop-types';

const noop = () => {};

export const initialState = {
    data: undefined,
    error: undefined,
    inAsync: false
};

class LoaderAsync extends React.Component {
    static propTypes = {
        service: func.isRequired,
        onLoading: func,
        onLoaded: func,
        onError: func,
        onCleared: func
    };

    static defaultProps = {
        onLoading: noop,
        onLoaded: noop,
        onError: noop,
        onCleared: noop
    };

    constructor(props){
        super(props);
        this.state = initialState;
    }

    data = () => this.state.data;
    error = () => this.state.error;
    inAsync = () => this.state.inAsync;

    load = (params) => {
        this.setState({
            data: undefined,
            error: undefined,
            inAsync: true
        });
        this.props.onLoading();
        this.props.service(params)
            .then((data) => {
                this.setState({
                    data,
                    error: undefined,
                    inAsync: false
                });
                this.props.onLoaded(data);
            })
            .catch((error) => {
                this.setState({
                    data: undefined,
                    error,
                    inAsync: false
                });
                this.props.onError(error);
            });
    };

    clear = () => {
        this.setState(initialState);
        this.props.onCleared();
    };

    render() {
        return null;
    }
}

export default LoaderAsync;
