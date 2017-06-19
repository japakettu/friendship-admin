import React from 'react';

import { CircularProgress } from 'material-ui/Progress';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createAction } from 'redux-act';

export const reset = createAction('Reset app state');

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  doLogout() {
    dispatch(reset());
  },
  redirect(path) {
    dispatch(replace(path));
  },
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Logout extends React.Component {
  componentDidMount() {
    if (!this.props.auth.data.token) {
      this.deauthSuccess();
    } else {
      this.props.doLogout();
    }
  }

  shouldComponentUpdate(props) {
    if (!props.auth.data.token) {
      this.deauthSuccess();
      return false;
    }

    return true;
  }

  deauthSuccess = () => {
    const { redirect } = this.props;

    redirect('/');
  };

  render() {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}
