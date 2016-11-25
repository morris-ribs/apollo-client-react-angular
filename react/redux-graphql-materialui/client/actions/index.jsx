import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
};

export const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
};


export const getGraph = () => {
 /* return dispatch => {
    
    return new Promise(function(resolve, reject) {
      let request=new XMLHttpRequest();
      request.open("POST", "/graphql", true);
      request.setRequestHeader("Content-Type",
                               "application/graphql");
      request.send(payload);
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          resolve(request.responseText);
        }
      }
    }).then(response =>
            dispatch(finishedRequest(JSON.parse(response))))
  }*/
  return dispatch => {
    dispatch(startingRequest());
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

    console.log('calling gql... ');
    let response = graphql(CurrentDiscsForLayout, {
        // ownProps are the props that are passed into the `ProfileWithData`
        // when it is used by a parent component
        props: ({ ownProps, data: { loading, discs, refetch } }) => ({
          loading: loading,
          discs: discs
        }),
      }
    );

    console.log(response);
    return dispatch(finishedRequest(JSON.parse(response)));
  }
};
