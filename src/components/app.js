import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Location from './location';
import Room from './room';
import Board from './board';
import NotFound from './notFound';
import sampledb from '../db';

class App extends Component {
    state = {
        data: {}
    };

    componentDidMount() {
        this.setState({data: sampledb});
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Location {...props} location={data} />} />
                    <Route exact path="/store/:location" render={props => <Room {...props} data={data} />} />
                    <Route exact path="/store/:location/:room" component={Board} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default App;
