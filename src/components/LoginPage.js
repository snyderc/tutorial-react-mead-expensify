import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

// LoginPage takes in props
// but we've destructured the props
// which is why it takes in { startLogin }
export const LoginPage = ({ startLogin }) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
)

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);