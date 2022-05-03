import React, { useContext, useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import DataDialog from '../../../components/Universal/DataDailog';
import FieldsData from './menuUtils/input-fields.json';
import InputFields from '../../../components/CommonInput/InputFields';
import MRCButton from '../../../components/Button/MRCButton';
import MenuContext from '../menu-context';
import { getMenuAction, getMenuDetails, deleteMenu } from './menuUtils/apis/actions';
import ENUMS from '../../../utils/enum';
import { ToastMessageContext } from '../../../context/messageContext';



function ManageMenu({
  title, action, data, ...props
}) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const message = useContext(ToastMessageContext);


  const handleSubmit = (_data) => {
    setLoading(true);
    if (action !== 'create') {
      const _menus = [...menus];
      const index = _menus.findIndex((menu) => menu.menuName === data.menuName);
      if (index > -1) {
        _menus[index] = {
          ..._data,
          menuName: _data.menuName,
          partnerId: props.partner.id,
          id: data.id,
          partnerName: props.partner.firstName,
        };
        props.saveMenu(_menus[index], message)
      }
      return props?.handleClose();
    }

    props.saveMenu({
      partnerId: props.partner.id,
      partnerName: props.partner.firstName,
      menuName: _data.menuName,
      menuCategories: [],
    }, message);

    props?.handleClose();
  };


  const handleDelete = () => {
    props.deleteMenu({
      id: data?.id,
      partnerId: props.partner.id,
      category: data?.menuCategories?.map(category => category.id)
    }, message)
    props?.handleClose();
  };

  useEffect(() => {
    setMenus(props.menus)
    setLoading(false);
  }, [props.menus])

  const textOk = action === ENUMS.CREATE ? ENUMS.CREATE_MENU : ENUMS.SAVE_CHANGES;

  const { errors, register, handleSubmit: submit } = useForm({ mode: 'all', defaultValues: data });

  return (
    <>
      <form onSubmit={submit(handleSubmit)}>
        <DataDialog {...props} textOk={textOk} textCancel={ENUMS.CANCEL} loading={loading} handleSubmit={submit(handleSubmit)}>
          <Grid container spacing={3} direction="column">
            <Grid item justify="center" container justify="space-between" alignItems="center">
              <Typography variant="h4">{title}</Typography>
              {
                action === ENUMS.UPDATE && (
                  <Grid item container xs={4} alignItems="center">
                    <MRCButton loading={loading} onClick={handleDelete} variant="transparent" color="error">
                      <DeleteOutline fontSize="small" color="error" />
                      <Typography variant="subtitle2" color="error">{ENUMS.DELETE_MENU}</Typography>
                    </MRCButton>
                  </Grid>
                )
              }
            </Grid>
            <Grid item alignItems="center">
              <Typography>
                {ENUMS.ADD_MENU_TITLE}
              </Typography>
            </Grid>
            <Grid item>
              <InputFields errors={errors} register={register} FieldsData={FieldsData} />
            </Grid>
          </Grid>
        </DataDialog>
      </form>
    </>
  );
}


export default connect(state => ({
  partner: state.partnerReducer.partner, menus: state.menuReducer.menu
}), { saveMenu: getMenuAction, getMenus: getMenuDetails, deleteMenu })(ManageMenu)