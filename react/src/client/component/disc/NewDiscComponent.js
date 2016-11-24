import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/* eslint-disable no-console */
class NewDiscComponent extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          id:"", title:"", artist:"", year:""
        };
        this.idChanged = this.idChanged.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.artistChanged = this.artistChanged.bind(this);
        this.yearChanged = this.yearChanged.bind(this);
        this.btnAdd = this.btnAdd.bind(this);
    }
    
    idChanged(e) {
        this.setState({id: e.target.value});
    }

    titleChanged(e) {
        this.setState({title: e.target.value});
    }

    artistChanged(e) {
        this.setState({artist: e.target.value});
    }

    yearChanged(e) {
        this.setState({year: e.target.value});
    }

    btnAdd() {
        let newDisc = {
            id: this.state.id,
            title: this.state.title,
            artist: this.state.artist,
            year: this.state.year        
        };

        // call the mutation in order to create the new disc
        this.props.mutate({ variables: { input: newDisc } })
            .then(({ data }) => {
                console.log('got data', data);
                this.props.data.refetch(); // refetch the data
            }).catch((error) => {
                console.log('there was an error sending the query', error);
            });      
        
        // reset values
        this.refs.newId.value = "";
        this.refs.newTitle.value = "";
        this.refs.newArtist.value = "";
        this.refs.newYear.value = "";
        
        this.setState({id:"", title:"", artist:"", year:""});
    }    
    
    render() {
        return(
            <div>
                You can also create discs here: <br />
                <input type="text" placeholder="Id" ref="newId" onChange={this.idChanged} />
                <input type="text" placeholder="Title" ref="newTitle" onChange={this.titleChanged} />
                <input type="text" placeholder="Artist" ref="newArtist" onChange={this.artistChanged} />
                <input type="text" placeholder="Year" ref="newYear" onChange={this.yearChanged} />
                <button onClick={this.btnAdd}>Add</button>
            </div>
        );
    }
}


NewDiscComponent.propTypes = {
    mutate: PropTypes.func.isRequired,
    newDisc: PropTypes.object,
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        discs: PropTypes.array
    })
};

const submitNewDisc = gql`
  mutation CreateDiscMutation($input: CreateDisc!) {
    createDiscMutation(input: $input) {
        title
        artist
        year
        id
    }
  }
`;

export default graphql(submitNewDisc)(NewDiscComponent);