import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Location from './location';
import Room from './room';
import NotFound from './notFound';
import sampledb from '../db';

class App extends Component {
    state = {
        location: {},
        selectedLocation: ''
    };

    componentDidMount() {
        this.setState({location: sampledb});
    }

    identifyLocation = selectedLocation => {
        this.setState({selectedLocation});
    }

    render() {
        const {location} = this.state;
        console.log('app state', this.state)
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Location {...props} location={location} identifyLocation={this.identifyLocation} />} />
                    <Route path="/store/:location" component={Room} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default App;
