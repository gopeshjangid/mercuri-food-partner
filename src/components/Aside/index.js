import React from 'react';

import Picture from '../Picture';
import NavItem from '../NavItem';
import { logoInfo, list, useStyles } from './asideUtils';

export default function Aside(props) {
  const classes = useStyles();

  return (
    <aside className={classes.root}>
      <Picture {...logoInfo({ classes })} />
      <NavItem {...list({ classes })} />
    </aside>
  );
}