import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Disc from './DiscComponent';
import NewDisc from './NewDiscComponent';

/* eslint-disable no-console */
class DiscsPage extends Component { 
    constructor(props, context) {
        super(props, context);
    }
    
    render() {   
        const discs = this.props.data.discs;
        
        return (
            <div>
                <h3>Your music store is here (in React)!</h3>
                <Disc discs={discs} />
                <div style={{paddingTop: '10px'}}>
                    <NewDisc data={this.props.data} />
                </div>
            </div>
        );
    }
}

// We use the gql tag to parse our query string into a query document
const CurrentDiscsForLayout = gql`
  query CurrentDiscsForLayout {
      discs {
          title
          artist
          year
          id
      }
  }
`;

DiscsPage.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        discs: PropTypes.array
    }).isRequired,
};


export default graphql(CurrentDiscsForLayout)(DiscsPage);
