import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import InputFields from '../../components/CommonInput/InputFields';
import Button from '../../components/Button/Button';
import Title from '../../components/Title/Title';
import Picture from '../../components/Picture';

import { getRegisterAction } from './registerUtils/apis/actions';
import { getRegisterError, getRegister } from './registerUtils/apis/reducer';

import { logoInfo } from '../Login/loginUtils/utils';
import FieldsData from './registerUtils/input-fields.json';
import backgroundImg from '../../../public/static/images/login-background.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& a': {
      fontWeight: theme.palette.weight.bold,
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  image: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: theme.palette.weight.bold,
    fontSize: theme.palette.size.default,
    borderRadius: theme.palette.radius.default,
  },
  signupBlock: {
    maxWidth: '375px',
    margin: 'auto auto',
    verticalAlign: 'middle',
    padding: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  link: {
    fontWeight: theme.palette.weight.bold,
  },
  title: {
    margin: 0,
    padding: 0,
    textAlign: 'left',
    fontSize: theme.palette.size.double,

  },
  textContainer: {
    flexDirection: 'column',
  },
  registerContainer: {
    background: theme.palette.formBackground,
  },
  logo: {
    width: '100%'
  },
  error: {
    color: theme.palette.error.main,
    textAlign: 'center',
    display: 'block'
  }
}));

const Register = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const router = useRouter();
  const { error } = props;

  const onSubmit = (data) => {
    props.getRegisterUser(data, router);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container item xs={12} sm={4} md={6} className={classes.image}>
        <Paper elevation={0} className={classes.signupBlock}>
          <Picture {...logoInfo({ classes })} />
        </Paper>
      </Grid>
      <Grid className={classes.registerContainer} item xs={12} sm={8} md={6} component={Paper} elevation={0} square alignItems="center" justify="center" spacing={0} container >
        <Grid md={8} alignItems="center">
          <div className={classes.paper}>
            <Grid container justify="flex-start" className={classes.textContainer}>
              <p>Back to <Link className={classes.link} href='/' variant="body2">Login</Link></p>
              <Title title='Register my restaurant' />
            </Grid>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <InputFields register={register} errors={errors} FieldsData={FieldsData} />
              <Button text='Create my account' />
              {error && <span className={classes.error}>{error}</span>}
              <p align="center">By clicking “Submit,” you agree to <Link className={classes.link} href='/register' variant="body2">Mercuri’s General Terms and Conditions</Link> and acknowledge you have read the <Link className={classes.link} href='/register' variant="body2">Privacy Policy</Link>.</p>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  error: getRegisterError(state),
  getRegister: getRegister(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getRegisterUser: getRegisterAction
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);

