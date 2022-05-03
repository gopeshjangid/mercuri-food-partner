import { makeStyles } from '@material-ui/core/styles';

import MetaInfo from '../../../../public/static/js/MetaInformations';

import LogoImg from '../../../../public/static/images/MercuriLogo.png';
import backgroundImg from '../../../../public/static/images/login-background.jpg';

export const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: theme.palette.weight.bold,
    fontSize: theme.palette.size.default,
    borderRadius: theme.palette.radius.default,
  },
  inputRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
    },
  },
  input: {
    borderRadius: theme.palette.radius.default,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #CCCCCC',
    fontSize: theme.palette.size.default,
    padding: '18px 14px',
    height: '1.1876em',
    '&:focus': {
      borderColor: '#80bdff',
    },
  },
  inputLabelRoot: {
    fontWeight: theme.palette.weight.bold,
  },
  signupBlock: {
    maxWidth: '375px',
    margin: 'auto auto',
    verticalAlign: 'middle',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  register: {
    marginTop: '15px',
    border: `1pt solid ${theme.palette.primary.main}`,
    borderRadius: theme.palette.radius.default,
    padding: '15px 25px',
    fontWeight: theme.palette.weight.bold,
    fontSize: theme.palette.size.default,
    display: 'inline-block',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  logo: {
    width: '100%',
  },
  error: {
    color: theme.palette.error.main,
    textAlign: 'center',
    display: 'block'
  }
}));

export const logoInfo = ({ classes }) => ({
  imgArr: [
    {
      src: LogoImg,
      alt: MetaInfo.title,
      className: classes.logo,
    },
  ],
});
