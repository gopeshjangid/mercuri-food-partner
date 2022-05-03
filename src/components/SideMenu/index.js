import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import MercuriLogo from '../../../public/static/images/Logo.png';
import MenuIcon from '../../../public/static/images/orders/menu.png';
import OrderIcon from '../../../public/static/images/orders/order.png';
import AccountIcon from '../../../public/static/images/orders/account.png';
import LogoutIcon from '../../../public/static/images/orders/logout.png';
import Link from 'next/link';
import { logout } from '../../containers/Login/loginUtils/apis/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxHeight: '100vh',
    overflowY: 'hidden',
    position: 'fixed',
    left: 0
  },
  sidebar: {
    backgroundColor: theme.palette.grey[300],
    width: theme.spacing(10.5)
  },
  divider: {
    width: theme.spacing(0.2),
    height: theme.dimensions.width100,
    color: theme.palette.common.black
  },
  width100: {
    width: theme.dimensions.width100,
    justifyContent: 'space-evenly',

  },
  sidebar: {
    backgroundColor: theme.palette.grey[300],
    width: theme.spacing(20)
  },
  noBorderRadius: {
    padding: theme.spacing(3, 2),
    borderRadius: 0
  },
  active: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold
  },
  menuTitle: {
    fontSize: theme.spacing(2)
  },
  logo: {
    marginTop: theme.spacing(6)
  },
  logout: {
    marginBottom: theme.spacing(3)
  }
}))


function Sidebar(props) {

  const classes = useStyles();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    router.prefetch('/account/business')
    setCurrentPath(router.pathname)
  }, [router.pathname])

  const handleLogout = () => {
    props.logout(router);
  }

  return (
    <>
      <Grid className={clsx(classes.root, classes.sidebar)} alignItems="center" item container justify="space-between" direction="column">
        <Grid className={classes.logo} item>
          <img src={MercuriLogo} />
        </Grid>
        <Grid item container direction="column" justify="space-between" alignItems="center">
          <Grid item className={classes.width100}>
            <Link href="/menus">
              <IconButton className={clsx(classes.width100, classes.noBorderRadius, currentPath === '/menus' ? classes.active : '')}>
                <img src={MenuIcon} />
                <Typography className={classes.menuTitle} variant="h6">Menu</Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item className={classes.width100}>
            <Link href="/orders">
              <IconButton className={clsx(classes.width100, classes.noBorderRadius, currentPath === '/orders' ? classes.active : '')}>
                <img src={OrderIcon} />
                <Typography className={classes.menuTitle} variant="h6">Orders</Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item className={classes.width100}>
            <Link href="/account/business">
              <IconButton className={clsx(classes.width100, classes.noBorderRadius, currentPath.startsWith('/account') ? classes.active : '')}>
                <img src={AccountIcon} />
                <Typography className={classes.menuTitle} variant="h6">Account</Typography>
              </IconButton>
            </Link>
          </Grid>
        </Grid>
        <Grid className={clsx(classes.logout, classes.width100)} item>
          <IconButton onClick={handleLogout} className={clsx(classes.width100, classes.noBorderRadius)}>
            <img src={LogoutIcon} />
            <Typography className={classes.menuTitle} variant="h6">Sign Out</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}


export default connect(null, { logout })(Sidebar)