import { makeStyles } from '@material-ui/core/styles';

import ENUMS from '../../utils/enum';

import LogoImg from '../../../public/static/images/MercuriLogo.svg';
import OrdersIcon from '../../../public/static/images/order_black.png';
import MenuIcon from '../../../public/static/images/menu_black.png';
import AccountIcon from '../../../public/static/images/account_black.png';
import ActiveMenuIcon from '../../../public/static/images/menu_green.png';
import ActiveAccountIcon from '../../../public/static/images/account_green.png';
import ActiveOrdersIcon from '../../../public/static/images/order_green.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'fixed',
    padding: theme.spacing.unit * 2,
    margin: theme.spacing(-0.5)
  },
  logo: {
    width: '100%'
  },
  icons: {
    padding: theme.spacing.unit * 1
  }
}));


export const logoInfo = ({ classes }) => {
  return {
    imgArr: [{
      src: LogoImg,
      alt: 'Mercuri',
      className: classes.logo
    }]
  }
}
export const list = ({ classes }) => {
  return {
    menuItems: [{
      id: '1',
      path: ENUMS.MENU,
      title: ENUMS.MENU,
      imgArr: [
        {
          src: [MenuIcon, ActiveMenuIcon],
          alt: ENUMS.MENU,
          className: classes.logo
        }
      ]
    }, {
      id: '2',
      path: ENUMS.ORDERS,
      title: ENUMS.ORDERS,
      imgArr: [
        {
          src: [OrdersIcon, ActiveOrdersIcon],
          alt: ENUMS.ORDERS,
          className: classes.logo
        }
      ]
    }, {
      id: '3',
      path: 'business',
      title: ENUMS.ACCOUNT,
      imgArr: [
        {
          src: [AccountIcon, ActiveAccountIcon],
          alt: ENUMS.ACCOUNT,
          className: classes.logo
        }
      ]
    }]
  }
}