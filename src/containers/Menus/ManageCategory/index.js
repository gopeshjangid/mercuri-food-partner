import { Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { findIndex } from 'lodash';
import { connect } from 'react-redux';
import { DeleteOutline } from '@material-ui/icons';

import DataDialog from '../../../components/Universal/DataDailog';
import FieldsData from './categoryUtils/input-fields.json';
import InputFields from '../../../components/CommonInput/InputFields';
import MRCButton from '../../../components/Button/MRCButton';
import MenuContext from '../menu-context';
import ENUMS from '../../../utils/enum';
import { getMenuAction, getMenuDetails, updateCategory, deleteCategory } from '../ManageMenu/menuUtils/apis/actions';
import { ToastMessageContext } from '../../../context/messageContext';

function ManageCategory({
  title, data, action, ...props
}) {
  const [menus, setMenus] = useContext(MenuContext);
  const [loading, setLoading] = useState(false);
  const message = useContext(ToastMessageContext);
  const { errors, handleSubmit: submit, register, setValue, control, watch } = useForm({
    defaultValues: {
      ...data?.data?.category,
    }
  });
  const watchFileFields = watch(['takeoutAvailable']);

  useEffect(() => {
    setValue('takeoutAvailable', getBoolean())
  }, [watchFileFields.takeoutAvailable])

  const handleSubmit = (_data) => {
    const _menus = [...menus];
    const index = findIndex(_menus, { id: data?.data?.menu?.id || data.id });
    if (index > -1) {
      if (action === ENUMS.UPDATE) {
        return handleUpdate(index, _menus, _data);
      }

      props.updateCategory({
        ..._data,
        partnerId: props.partner.id,
        takeoutAvailable: getBoolean(),
        menuId: data?.data?.menu?.id || data.id
      }, message)
    }
    props?.handleClose();
  };

  const handleUpdate = (index, _menus, _data) => {
    props.updateCategory({
      ..._data,
      partnerId: props.partner.id,
      menuId: data?.data?.menu?.id || data.id,
      takeoutAvailable: getBoolean(),
      id: data?.data?.category.id
    }, message)

    props?.handleClose();
  };

  const getBoolean = () => {
    return Boolean(watchFileFields.takeoutAvailable)
  }

  const handleDelete = () => {
    props.deleteCategory({
      id: data?.data?.category?.id,
      partnerId: props.partner.id
    }, message)
    props?.handleClose();
  };

  const textOk = action === ENUMS.UPDATE ? ENUMS.SAVE_CHANGES : ENUMS.CREATE_CATEGORY;

  return (
    <>
      <form onSubmit={submit(handleSubmit)}>
        <DataDialog {...props} textOk={textOk} textCancel={ENUMS.CANCEL} loading={loading} handleSubmit={submit(handleSubmit)}>
          <Grid container spacing={3} direction="column">
            <Grid item container alignItems="center" justify="space-between">
              <Typography variant="h4">{title}</Typography>
              {
                action === ENUMS.UPDATE && (
                  <Grid item container xs={4} alignItems="center">
                    <MRCButton loading={loading} onClick={handleDelete} variant="transparent" color="error">
                      <DeleteOutline fontSize="small" color="error" />
                      <Typography variant="subtitle2" color="error">{ENUMS.DELETE_CATEGORY}</Typography>
                    </MRCButton>

                  </Grid>
                )
              }
            </Grid>
            <Grid item alignItems="center">
              <Typography>
                {ENUMS.ADD_CATEGORY_TITLE}
              </Typography>
            </Grid>
            <Grid item>
              <InputFields control={control} errors={errors} register={register} FieldsData={FieldsData} />
            </Grid>
          </Grid>
        </DataDialog>
      </form>
    </>
  );
}


export default connect(state => ({
  partner: state.partnerReducer.partner
}), { updateMenu: getMenuAction, updateCategory, getMenuDetails, deleteCategory })(ManageCategory)