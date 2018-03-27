import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

class StockCard extends React.Component {
    render() {
        const { companyName, ticker } = this.props;
        return (
            <Card>
            <Card.Content>
              <Card.Header>
                {companyName}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {ticker}
                </span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        )
    }
}

export default StockCard;