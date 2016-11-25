import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from '../component/Root';
import DiscsPage from '../component/disc/DiscsPage';

export default (
    <Route path="/" component={Root}>
        <IndexRoute component={DiscsPage} />
    </Route>
);