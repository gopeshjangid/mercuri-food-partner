import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { connect } from 'react-redux';

import DataDialog from '../../../components/Universal/DataDailog';
import InputFields from '../../../components/CommonInput/InputFields';
import MRCButton from '../../../components/Button/MRCButton';
import MenuContext from '../menu-context';
import ENUMS from '../../../utils/enum';
import { getMenuAction } from '../ManageMenu/menuUtils/apis/actions';

function ActivateMenu({
  title, action, data, ...props
}) {
  const [menus, setMenus] = useContext(MenuContext);

  const handleSubmit = () => {
    const _menus = [...menus];
    const index = _menus.findIndex((menu) => menu.id === data.id);
    _menus[index] = {
      ..._menus[index],
      partnerId: props.partner.id,
      isActive: !_menus[index].isActive,
    };
    props.saveMenu(_menus[index])
    return props?.handleClose();
  };

  const textOk = data.isActive ? ENUMS.DEACTIVATE_MENU : ENUMS.ACTIVATE_MENU;

  return (
    <>
      <DataDialog
        {...props}
        textOk={textOk}
        textCancel={ENUMS.CANCEL}
        loading={false}
        handleSubmit={handleSubmit}
      >
        <Grid container spacing={3} direction="column">
          <Grid item justify="center" container justify="space-between" alignItems="center">
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item alignItems="center">
            <Typography>
              {ENUMS.ACTIVATE_MENU_LONG}
            </Typography>
          </Grid>
        </Grid>
      </DataDialog>
    </>
  );
}

export default connect(state => ({
  partner: state.partnerReducer.partner
}), { saveMenu: getMenuAction })(ActivateMenu)