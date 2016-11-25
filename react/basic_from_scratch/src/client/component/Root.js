import React, {PropTypes} from 'react';

class RootComponent extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        );
    }
}

RootComponent.propTypes = {
    children: PropTypes.object.isRequired
};

export default RootComponent;