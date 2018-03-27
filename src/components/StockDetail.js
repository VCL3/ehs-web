import React from 'react';
import { Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import * as EhsApi from '../api/EhsApi';
import * as CommonHelper from '../helper/CommonHelper';
import MainMenu from '../components/MainMenu';
import StockPriceCard from '../components/StockPriceCard';

class StockDetail extends React.Component {

    state = {
        isLoading: true,
        metadata: {},
        currentPrice: {},
        stockPrices: []
    }

    ticker = this.props.match.params.ticker;

    componentDidMount() {
        this.fetchStockData(this.ticker);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.ticker !== this.ticker) {
            this.ticker = nextProps.match.params.ticker;
            this.fetchStockData(this.ticker);
        }
    }

    fetchStockData = (ticker) => {
        EhsApi.getStockData(ticker)
        .then(({ metadata, currentPrice, stockPrices }) => {
            this.setState({
                metadata,
                currentPrice,
                stockPrices
            })
        })
    }

    render() {
        const { metadata, currentPrice, stockPrices } = this.state;
        return (
            <div className="stock-detail">
                <MainMenu />

                <Segment clearing basic>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign='left' width={2}>
                                <div className="stock-metadata">
                                    <Header className="stock-ticker" size='large'>{CommonHelper.normalizeStockTicker(this.ticker)}</Header>
                                    <p className="stock-name">{metadata.name}</p>
                                    <p className="stock-exchange">{metadata.exchange}</p>
                                </div>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <div className="stock-detail-button">
                                    <Button animated fluid>
                                        <Button.Content visible>Get Alerts</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='mail' />
                                        </Button.Content>
                                    </Button>
                                </div>
                                <div className="stock-detail-button">
                                    <Button animated fluid>
                                        <Button.Content visible>Add to Watchlist</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='star' />
                                        </Button.Content>
                                    </Button>
                                </div>
                            </Grid.Column>

                            <Grid.Column width={6} />

                            <Grid.Column width={4}>
                                <StockPriceCard stockPrice={currentPrice} />
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Segment>

                <Segment>
                    <Grid columns={4}>
                        <Grid.Row>
                            {stockPrices.map((stockPrice) => (
                                <Grid.Column key={stockPrice.date}>
                                    <p>{CommonHelper.getQuarterYearOnDate(stockPrice.date)}</p>
                                    <StockPriceCard stockPrice={stockPrice}/>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

export default StockDetail;