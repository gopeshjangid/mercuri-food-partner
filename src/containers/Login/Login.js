import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import InputFields from '../../components/CommonInput/InputFields';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import Picture from '../../components/Picture';

import { getLoginAction } from './loginUtils/apis/actions';
import { getUserError, getUser } from './loginUtils/apis/reducer';

import ENUMS from '../../utils/enum';
import { logoInfo, useStyles } from './loginUtils/utils';
import FieldsData from './loginUtils/input-fields.json';
import { ToastMessageContext } from '../../context/messageContext';
import { useContext } from 'react';

const SignInSide = (props) => {

  const classes = useStyles();
  const router = useRouter();
  const message = useContext(ToastMessageContext);
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const { error, getUser } = props;

  const onSubmit = (data) => {
    props.getLoginAction(data, router, message);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container item xs={12} sm={4} md={6} className={classes.image}>
        <Paper elevation={0} className={classes.signupBlock}>
          <Title title={ENUMS.JOIN_MERCURI} />
          <p>{ENUMS.CONNECT_WITH_CUSTOMERS}</p>
          <Link href={ENUMS.ROUTES.REGISTER} variant="body2"><span className={classes.register}>{ENUMS.REGISTER_MY_RESTAURANT}</span></Link>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={0} square alignItems="center" justify="center" spacing={0} container >
        <Grid md={8} alignItems="center">
          <div className={classes.paper}>
            <Picture {...logoInfo({ classes })} />
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <InputFields register={register} errors={errors} FieldsData={FieldsData} />
              <Button text={ENUMS.LOGIN} />
              {error && <span className={classes.error}>{error}</span>}
              <Grid container>
                <Grid item xs>
                  <Link href="forgot-password" variant="body2">
                    <a className={classes.link}>{ENUMS.FORGOT_PASSWORD}</a>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  error: getUserError(state),
  getUser: getUser(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getLoginAction: getLoginAction
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);
