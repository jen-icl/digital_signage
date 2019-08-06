import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import base from '../base';
import Location from './location';
import Room from './room';
import Board from './board';
import Panel from './panel';
import NotFound from './notFound';

class App extends Component {
    state = {
        data: {}
    };

    checkExist = (path, action) => {
        base.fetch(`/${path}`, {
            context: this
        }).then(data => {
            console.log('Fetch Success', data);
            if(Object.keys(data).length !== 0 || data === 0){
                console.log('stop')
                return; //means data exists, do not execute action
            } else {
                console.log('perform action')
                return action(path); //means data does not exist, perform action
            }
        }).catch(err => {
            console.log('Fetch Error', err);
        });
    }

    addData = path => {
        base.post(`/${path}`, {
            data: 0
        }).then(() => {
            console.log('Added to db check state', this.state)
        });
    }

    componentDidMount() {
        this.ref = base.syncState('/', {
            context: this,
            state: 'data'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Location {...props} data={data} checkExist={this.checkExist} addData={this.addData} />} />
                    <Route exact path="/:locationName" render={props => <Room {...props} data={data} />} />
                    <Route exact path="/:locationName/:roomName" render={props => <Board {...props} data={data} />} />
                    <Route exact path="/:locationName/:roomName/:boardName" render={props => <Panel {...props} data={data} />} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
