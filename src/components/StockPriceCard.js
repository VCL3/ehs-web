import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import * as CommonHelper from '../helper/CommonHelper';

class StockPriceCard extends React.Component {

    render() {
        const { date, previousClosePrice, closePrice, changePercent } = this.props.stockPrice;
        return (
            <Card color='red'>
                <Card.Content>
                    <Card.Header textAlign='left'>
                        {CommonHelper.normalizeDateFormat(date)}
                    </Card.Header>
                    <Card.Meta textAlign='left'>
                        {CommonHelper.getDayOnDate(date)}
                    </Card.Meta>
                    <Card.Description>
                        <Icon className="global-left" name='caret up' size='large' color='red' />
                        <span className="global-right card-price">{CommonHelper.addPriceSign(closePrice - previousClosePrice)}</span>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span className="global-left card-price">${closePrice}</span>
                    <span className="global-right card-price">{CommonHelper.addPriceSign(changePercent)}%</span>
                </Card.Content>
            </Card>
        )
    }
}

export default StockPriceCard;