import React, {PropTypes} from "react";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {connect} from "react-redux";
import Disc from './disc';
import NewDisc from './newdisc';
import AppBar from './appbarmenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends React.Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
          data: Object.assign({}, this.props.data),
          discList: Object.assign({}, this.props.discList)
      };
  }
   
  render() {
    const discs = this.props.data.discs;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar></AppBar>
          <Disc discs={discs} />
          <div style={{paddingTop: '10px'}}>
              <NewDisc data={this.props.data} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

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

const mapStateToProps = (state) => {  
  return {
    discList: state.apollo.data.ROOT_QUERY
  };
};

Home.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        discs: PropTypes.array
    }).isRequired,
    discList: PropTypes.array.isRequired
};

const HomeWithData = connect(mapStateToProps)(graphql(CurrentDiscsForLayout)(Home));

export default HomeWithData;
