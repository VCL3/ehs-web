import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Search, Label, Icon } from 'semantic-ui-react'

const source = [
    {
        name: "Groupon, Inc",
        ticker: "GRPN"
    },
    {
        name: "Facebook",
        ticker: "FB"
    },
    {
        name: "Apple",
        ticker: "AAPL"
    },
];

const resultRenderer = ({ name, ticker }) => {
    return (
        <div>
            <Link to={"/stock/" + _.toLower(ticker)}>
                <Label size='large' color='blue'>
                    {name}
                    <Label.Detail>{ticker}</Label.Detail>
                    <Icon name='delete' />
                </Label>
            </Link>
        </div>
    )};

resultRenderer.propTypes = {
    name: PropTypes.string,
    ticker: PropTypes.string
}

export default class SearchBar extends Component {

    state = {
        isLoading: false,
        searchValue: "",
        results: []
    }

    componentWillMount() {
        this.resetComponent();
    }

    handleSearchChange = (e, { value }) => {

        this.setState({
            isLoading: true,
            searchValue: value
        })
    
        setTimeout(() => {
            if (this.state.searchValue.length < 1) {
                return this.resetComponent();
            }
    
            const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i');
            const isMatch = (result) => re.test(result.name) || re.test(result.ticker);

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch)
            })
        }, 200)
      }
    
    handleResultSelect = (e, { result }) => {
        this.resetComponent();
    }

    resetComponent = () => {
        this.setState({ 
            isLoading: false,
            searchValue: "", 
            results: []
        })
    }

    render() {
        const { isLoading, searchValue, results } = this.state;

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={searchValue}
                resultRenderer={resultRenderer}
                {...this.props}
            />
        )
    }
}
