import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Disc from './DiscComponent';

/* eslint-disable no-console */
class DiscsPage extends Component { 
    constructor(props, context) {
        super(props, context);
    }
    
    render() {   
        const discs =   this.props.data.discs;
        
        return (
            <div>
            <h3>Your music store is here!</h3>
            <Disc discs={this.props.data.discs} />
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


/* TODO: this will be used with the mutations
const withData = graphql(CurrentDiscsForLayout,{
  options: props => ({
    forceFetch: true,
  }),
  props: ({ data: { discs, fetchMore } }) => ({
    discs,
    fetchMore: () => fetchMore({
      variables: {
        offset: discs.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) { return discs; }
        return Object.assign({}, prev, {
          discs: [...prev.discs, ...fetchMoreResult.data.discs],
        });
      },
    }),
  }),
});
*/