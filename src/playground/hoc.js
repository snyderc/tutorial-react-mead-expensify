// Higher Order Components (HOC):
// A component that renders another component
// Advantages:
// 1. Reuse code
// 2. Render hijacking
// 3. Prop manipulation
// 4. Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// higher order component
const withAdminWarning = (WrappedComponent) => {
    // returning a higher order component
    // for this one, using a stateless component
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info! Do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

// returns an alternative version of the component passed in.
// AdminInfo is the HOC!
const AdminInfo = withAdminWarning(Info);

// requireAuthentication

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
             ) : (
                 <p>Log in first!</p>
             )}
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info='Here is some info' />, document.getElementById('app'));