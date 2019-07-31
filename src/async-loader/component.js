import React from 'react';
import { func } from 'prop-types';

const initialState = {
    value: undefined,
    error: undefined,
    inAsync: false
};

class AsyncLoader extends React.Component {
    static propTypes = {
        service: func.isRequired
    };

    constructor(props){
        super(props);
        this.state = initialState;
    }

    value = () => this.state.value;
    error = () => this.state.error;
    inAsync = () => this.state.inAsync;

    load = (params) => {
        this.setState({ inAsync: true });
        this.props.service(params)
            .then((data) => {
                this.setState({
                    value: data,
                    error: undefined,
                    inAsync: false
                });
            })
            .catch((error) => {
                this.setState({
                    value: undefined,
                    error,
                    inAsync: false
                });
            });
    };

    clear = () => {
        this.setState(initialState);
    };

    render() {
        return null;
    }
}

export default AsyncLoader;
