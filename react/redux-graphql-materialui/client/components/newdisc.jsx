import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
        
        this.setState({id:"", title:"", artist:"", year:""});
    }    
    
    render() {
        return(
            <div>
                You can also create discs here: <br />
                <TextField
                    hintText="Id"
                    onChange={this.idChanged}
                    value={this.state.id}
                />
                <TextField
                    hintText="Title"
                    onChange={this.titleChanged}
                    value={this.state.title}
                />
                <TextField
                    hintText="Artist"
                    onChange={this.artistChanged}
                    value={this.state.artist}
                />
                <TextField
                    hintText="Year"
                    onChange={this.yearChanged}
                    value={this.state.year}
                />
                <FloatingActionButton mini={true} style={{marginLeft:'20px'}} onClick={this.btnAdd}>
                    <ContentAdd />
                </FloatingActionButton>
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