import React, { Component, PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';

class DiscComponent extends Component {
    render(){
       const discs = this.props.discs;
       if (discs && discs.length){
            return (
                <List>
                    {this.props.discs.map(disc => 
                        <ListItem>{disc.title} - {disc.artist} ({disc.year})</ListItem>
                    )}
                </List>
            );
       }
       return <div />;
    }
}

DiscComponent.propTypes = {
    discs: PropTypes.array
};

export default DiscComponent;