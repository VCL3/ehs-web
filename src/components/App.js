import _ from 'lodash';
import logo from '../icons/logo.svg';
import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Grid, Header, Menu, Search, Segment, Button, Container } from 'semantic-ui-react';
import * as EhsApi from '../api/EhsApi';
import MainMenu from './MainMenu';
import SearchBar from './SearchBar';
import StockDetail from './StockDetail';
import Login from './Login';
import Signup from './Signup';
import Watchlist from './Watchlist';
import Profile from './Profile';
import '../public/css/App.css';

export default class App extends Component {

    state = {
        stockSelections: [],
        isLoading: false
    }

    componentWillMount() {
        this.resetComponent();
    }

    componentDidMount() {
        this.populateStockSelections();
    }

    populateStockSelections = () => {
        EhsApi.getStockSelections()
        .then((stockSelections) => {
            this.setState({
                stockSelections: stockSelections
            });
        })
    }

    resetComponent = () => {
        this.setState({ 
            isLoading: false
        })
    }

    render() {

        const { isLoading, fixed } = this.state;

        return (
            <div className="App">
                <Switch>
                    <Route path='/stock/:ticker' component={StockDetail} />

                    <Route exact path='/user/watchlist' component={Watchlist} />
                    <Route exact path='/user/profile' component={Profile} />

                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />

                    <Route exact path='/' render={({ history }) => (
                        <div>
                            <MainMenu hideSearch />
                        
                            <Segment>
                                <SearchBar aligned='none'/>
                            </Segment>

                            <Segment>
                                <Grid columns={3} divided>
                                    <Grid.Row>
                                        {this.state.stockSelections.map((stockSelectionsOnDay) => (
                                            <Grid.Column key={Object.keys(stockSelectionsOnDay)[0]}>
                                                {Object.entries(stockSelectionsOnDay).map(([date, stockSelectionsList]) => (
                                                    <div key={date}>
                                                        <p>{date}</p>                        
                                                        {stockSelectionsList.map((stockSelected) => (
                                                            <p key={stockSelected}>{stockSelected}</p>
                                                        ))}
                                                    </div>
                                                ))}
                                            </Grid.Column>
                                        ))}
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </div>
                    )}/>

                    <Route render={() => <Redirect to='/' />} />
                </Switch>
            </div>
        );
    }
}
