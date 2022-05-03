import React from 'react'
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles as styles } from '../index';
import clsx from 'clsx';

import MercuriLogo from '../../../../public/static/images/orders/mercuri_logo.png';
import MenuIcon from '../../../../public/static/images/orders/menu.png';
import OrderIcon from '../../../../public/static/images/orders/order.png';
import AccountIcon from '../../../../public/static/images/orders/account.png';
import LogoutIcon from '../../../../public/static/images/orders/logout.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { logout } from '../../Login/loginUtils/apis/actions';

const useStyles = makeStyles(theme => ({
  ...styles,
  width100: {
    width: theme.dimensions.width100,
    justifyContent: 'center'
  },
  noBorderRadius: {
    padding: theme.spacing(4, 2),
    borderRadius: 0
  },
  active: {
    backgroundColor: theme.palette.grey[200]
  },
  logo: {
    marginTop: theme.spacing(6)
  },
  logout: {
    marginBottom: theme.spacing(5)
  }
}))

function Sidebar(props) {

  const classes = useStyles();
  const router = useRouter();

  const handleLogout = () => {
    props.logout(router);
  }

  return (
    <>
      <Grid className={clsx(props.classes.root, props.classes.sidebar)} alignItems="center" item container justify="space-between" direction="column">
        <Grid className={classes.logo} item>
          <img src={MercuriLogo} />
        </Grid>
        <Grid item container direction="column" justify="space-between" alignItems="center">
          <Grid item className={classes.width100}>
            <Link href="/menus">
              <IconButton className={clsx(classes.width100, classes.noBorderRadius)}>
                <img src={MenuIcon} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item className={classes.width100}>
            <Link href="/orders">
              <IconButton className={clsx(classes.width100, classes.noBorderRadius, classes.active)}>
                <img src={OrderIcon} />
              </IconButton>
            </Link>
          </Grid>
          <Link href="/account/business">
            <IconButton className={clsx(classes.width100, classes.noBorderRadius)}>
              <img src={AccountIcon} />
            </IconButton>
          </Link>
        </Grid>
        <Grid className={classes.logout} item>
          <IconButton onClick={handleLogout}>
            <img src={LogoutIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}



export default connect(null, { logout })(Sidebar)