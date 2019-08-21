import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import base from '../base';
import Location from './location';
import Room from './room';
import Board from './board';
import Panel from './panel';
import View from './view';
import NotFound from './notFound';
import '../css/component.css';

class App extends Component {
    state = {
        data: {}
    };

    checkExist = (action, path, content = 0) => {
        base.fetch(`${path}`, {
            context: this
        }).then(data => {
            console.log('Fetch Success', data);
            if (Object.keys(data).length !== 0 || data === 0) {
                if (action === this.addData) {
                    console.log('stop add')
                    return; //means data exists, do not execute add action
                } else {
                    return action(path); //means data exists, perform delete action
                }
            } else {
                if (action === this.addData) {
                    console.log('perform add action')
                    return action(path, content); //means data does not exist, perform add action
                } else {
                    return; //means data does not exist, do not execute delete action
                }
            }
        }).catch(err => {
            console.log('Fetch Error', err);
        });
    }

    addData = (path, content = 0) => {
        base.post(`${path}`, {
            data: content
        }).then(() => {
            console.log('Added to db check state', this.state)
        });
    }

    deleteData = path => {
        base.remove(`${path}`)
            .then(() => {
                console.log('Removed from db check state', this.state)
            }).catch(err => {
                console.log('Delete data error' , err);
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
        console.log('app state', data)
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" render={props => <Location {...props} data={data} checkExist={this.checkExist} addData={this.addData} deleteData={this.deleteData} />} />
                    <Route exact path="/:locationName" render={props => <Room {...props} data={data} checkExist={this.checkExist} addData={this.addData} deleteData={this.deleteData} />} />
                    <Route exact path="/:locationName/:roomName" render={props => <Board {...props} data={data} checkExist={this.checkExist} addData={this.addData} deleteData={this.deleteData} />} />
                    <Route exact path="/:locationName/:roomName/:boardName" render={props => <Panel {...props} data={data} checkExist={this.checkExist} addData={this.addData} deleteData={this.deleteData} />} />
                    <Route exact path="/view/:locationName/:roomName/:boardName" render={props => <View {...props} data={data} />} />
                    <Route component={NotFound} />
                </Switch>
            </Fragment>
        );
    }
}

export default App;
