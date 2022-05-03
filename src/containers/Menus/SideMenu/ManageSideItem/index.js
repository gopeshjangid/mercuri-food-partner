import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Box, FormControlLabel } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import DataDialog from '../../../../components/Universal/DataDailog';
import ENUMS from '../../../../utils/enum';
import MRCButton from '../../../../components/Button/MRCButton';
import FieldsData from './manageItemUtils/input-fields.json';
import InputFields from './manageItemUtils/inputFileds';
import { saveSideItem, deleteSideItem } from '../sideMenuUtils/apis/actions';
import { ToastMessageContext } from '../../../../context/messageContext';



function ManageItem({ action, loading, ...props }) {

  const { control, errors, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: props?.sideItem
  });
  const message = useContext(ToastMessageContext);
  const watchFields = watch(['enableCustomization', 'isDefault']);

  const getBoolean = (data) => {
    return Boolean(data)
  }

  useEffect(() => {
    setValue('isDefault', getBoolean(watchFields.isDefault))
    setValue('enableCustomization', getBoolean(watchFields.enableCustomization))
  }, [watchFields.enableCustomization, watchFields.isDefault]);

  const submit = (data) => {

    if (action === ENUMS.CREATE) {
      props.handleClose()
      return props.saveSideItem({
        ...data,
        sideCategoryId: props?.category?.id,
        price: parseFloat(data.price || 0),
        calories: parseFloat(data.calories || 0),
        isDefault: getBoolean(watchFields.isDefault),
        enableCustomization: getBoolean(watchFields.enableCustomization),
        partnerId: props.partnerId
      }, message)
    }
    props.saveSideItem({
      ...data,
      sideCategoryId: props?.category?.id,
      isDefault: getBoolean(watchFields.isDefault),
      enableCustomization: getBoolean(watchFields.enableCustomization),
      price: parseFloat(data.price || 0),
      calories: parseFloat(data.calories || 0),
      id: props.sideItem.id,
      partnerId: props.partnerId
    }, message)
    props.handleClose()

  }
  const handleDelete = () => {
    props.deleteSideItem({ id: props.sideItem.id, partnerId: props.partnerId }, message)
    props.handleClose();
  }

  const textOk = !props?.sideItem?.id ? ENUMS.ADD_NEW_ITEM : ENUMS.SAVE_CHANGES
  const title = !props?.sideItem?.id ? ENUMS.SIDE_ITEM_MENU.ADD_A_NEW_ITEM : ENUMS.SIDE_ITEM_MENU.UPDATE_ITEM
  const createItemText = ENUMS.SIDE_ITEM_MENU.CREATE_ITEM_INSIDE_CATEGORY

  return (
    <>
      <FormControlLabel
        aria-label="Acknowledge"
        onClick={(event) => event.stopPropagation()}
        onFocus={(event) => event.stopPropagation()}
        control={(<form onSubmit={handleSubmit(submit)}>
          <DataDialog {...props} textOk={textOk} textCancel={ENUMS.CANCEL} loading={loading} handleClose={props.handleClose} handleSubmit={handleSubmit(submit)}>
            <Grid container spacing={3} direction="column">
              <Grid item container alignItems="center" justify="space-between">
                <Box width="100%" position="relative">
                  <Typography variant="h4">{title}</Typography>
                  <Box position="absolute" right={0} top={-25}>
                    {props?.sideItem?.id &&
                      <MRCButton loading={loading} onClick={handleDelete} variant="transparent" color="error">
                        <DeleteOutline fontSize="small" color="error" />
                        <Typography variant="subtitle2" color="error">{ENUMS.DELETE}</Typography>
                      </MRCButton>}
                  </Box>
                </Box>
              </Grid>
              <Grid item alignItems="center">
                <Box item alignItems="center">
                  <Typography>
                    {createItemText}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box paddingLeft={0.5}>
                  <InputFields categories={props.categories.map(category => ({
                    name: category.name,
                    value: category.name
                  }))}
                    watchFields={watchFields}
                    control={control} errors={errors} register={register} FieldsData={FieldsData} />
                </Box>
              </Grid>
            </Grid>
          </DataDialog>
        </form>)}
      />

    </>
  )
}


export default connect(state => ({
  partnerId: state.partnerReducer.partner.id
}), { saveSideItem, deleteSideItem })(ManageItem);