import React from 'react';
import { func } from 'prop-types';

const initialState = {
    data: undefined,
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

    data = () => this.state.data;
    error = () => this.state.error;
    inAsync = () => this.state.inAsync;

    load = (params) => {
        this.setState({ inAsync: true });
        this.props.service(params)
            .then((data) => {
                this.setState({
                    data,
                    error: undefined,
                    inAsync: false
                });
            })
            .catch((error) => {
                this.setState({
                    data: undefined,
                    error,
                    inAsync: false
                });
            });
    };

    clear = () => {
        this.setState(initialState);
    };

    change = (changedData) => {
        this.setState({ data: changedData });
    };

    render() {
        return null;
    }
}

export default AsyncLoader;
