/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

import Picture from '../Picture';
import AccountContext from '../../context/accountContext';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing.unit * 2,
    listStyleType: 'none',
    '& a': {
      display: 'flex',
      fontSize: theme.spacing.unit * 2,
      fontWeight: theme.palette.weight.bold,
      textAlign: 'left',
      color: theme.palette.tabTextColor,
      textTransform: 'capitalize',
      '& img': {
        backgroundColor: 'transparent',
        padding: '4px 10px'
      }
    }
  },
  ul: {
    paddingLeft: '10px',
  },
  tabs: {
    display: 'flex',
  },
  active: {
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

export default function NavItem(props) {
  const classes = useStyles();
  const { menuItems = [], tabs } = props;
  const { pathName } = useContext(AccountContext);

  return (
    <ul className={`${tabs ? classes.tabs : ''} ${classes.ul}`}>
      {menuItems.map((item) => {
        const ele = { ...item }
        ele.imgArr[0].src = ele.imgArr[0].src[Number(ele.path === pathName)]
        return (<li className={`${ele.path.includes(pathName) ? classes.active : ''} ${classes.list}`}>
          <Link href={`/account/${ele.path}`}>
            <React.Fragment><Picture imgArr={ele.imgArr} /> {ele.title}</React.Fragment>
          </Link>
        </li>
        );
      })}
    </ul>
  );
}

