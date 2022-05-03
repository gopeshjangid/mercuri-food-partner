import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import MRCButton from '../../../../../components/Button/MRCButton';
import ENUMS from '../../../../../utils/enum';
import MenuContext from '../../../menu-context';
import FieldsData from './../../itemUtils/input-fields.json';
import InputFields from './../../itemUtils/inputFileds';
import { saveItem, deleteItem } from '../../../ManageMenu/menuUtils/apis/actions';
import MRCTab from '../../../../../components/Universal/Tab';
import { ToastMessageContext } from '../../../../../context/messageContext';


const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "transparent",
    color: theme.palette.common.black,
    boxShadow: 'none',
  },
  container: {
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  wrapper: {
    margin: theme.dimensions.width3
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3.2)
  }
}));

function ItemDescription({
  title, data, action, ...props
}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const message = useContext(ToastMessageContext);
  const { register, control, errors, handleSubmit, formState, watch, setValue } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
    defaultValues: {
      ...data?.data?.item,
      itemImage: String(data?.data?.item?.itemImage).includes('https://') ? null : '',
      itemImage1: '',
      category: data?.data?.category
    }
  });
  const [taxes, setTaxes] = useState([]);


  const watchFileFields = watch(['itemImage', 'itemImage1', 'category']);

  useEffect(() => {
    if (watchFileFields.itemImage1) {
      setValue('itemImage', watchFileFields.itemImage1[0]?.name || '')
    }
  }, [watchFileFields?.itemImage1 && watchFileFields.itemImage1[0]])


  useEffect(() => {
    const { salesTax, alcoholTax } = props.partner;
    if (salesTax || alcoholTax) {
      setTaxes([{ id: 1, name: `Sales Tax (${formatTaxes(salesTax)})` }, { id: 2, name: `Alcohol Tax (${formatTaxes(alcoholTax)})` }])
    }
  }, [props.partner])

  const formatTaxes = tax => {
    return tax.includes('%') ? tax : `${tax}%`
  }

  const [menus, setMenus] = useContext(MenuContext);

  const submit = (_data) => {
    const _menus = [...menus];
    const index = _menus.findIndex((menu) => menu.id === data?.data?.menu?.id);
    if (index > -1) {
      if (action === ENUMS.UPDATE) {
        delete _data.category
        props.saveItem({
          id: data?.data?.item?.id,
          ..._data,
          partnerId: props.partner.id,
          takeoutAvailable: false,
          categoryId: watchFileFields.category.id
        }, message)
        return
      }
      props.saveItem({
        ..._data,
        categoryId: watchFileFields.category.id,
        partnerId: props.partner.id,
        takeoutAvailable: false
      }, message)
      props?.handleClose();
    }
  };



  const handleDelete = () => {
    props.deleteItem({
      id: data?.data?.item?.id,
      partnerId: props.partner.id
    }, message)
    props?.handleClose();
  };


  const textOk = action === ENUMS.UPDATE ? ENUMS.SAVE_CHANGES : ENUMS.ADD_NEW_ITEM;

  const currentMenuCategory = data?.data?.menu?.menuCategories;

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Grid item container justify="center" direction="row" justify="space-between" alignItems="center">
          <Typography variant="h4">{title}</Typography>
          <Box component="div" paddingRight={8}>
            <Grid item container xs={12} alignItems="center" justify="space-between">
              <Grid item xs={6}>
                <MRCButton type="button" onClick={action === ENUMS.CREATE ? '' : handleDelete} variant="outlined" color="default">
                  <Typography variant="subtitle2" color="default">{ENUMS.DELETE_CAMEL_CASE}</Typography>
                </MRCButton>
              </Grid>
              <Grid item xs={5}>
                <MRCButton type="submit" variant="contained" color="primary">
                  <Typography variant="subtitle2" color="default">{ENUMS.SAVE}</Typography>
                </MRCButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid className={classes.title} item alignItems="center">
          <Typography>
            {ENUMS.ADD_ITEM_TITLE}
          </Typography>
        </Grid>
        <MRCTab
          tabHeaders={[{ label: ENUMS.ITEM.DESCRIPTION }, { label: ENUMS.ITEM.VARIATIONS }, { label: ENUMS.ITEM.MODIFIERS }]}
          tabPanels={[
            <Grid item container spacing={5} justify="center" >
              <Grid className={classes.container} container direction="column">
                <Box paddingTop={5}>
                  <Grid item xs={12} md={8}>
                    <Box m={1}>
                      <InputFields taxes={taxes} category={currentMenuCategory} watchFileField={watchFileFields} control={control} errors={errors} register={register} FieldsData={FieldsData} />
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            ,
            <Grid item container justify="center" >
            </Grid>
          ]}
        />
      </form>
    </>
  );
}


export default connect(state => ({
  category: state.menuReducer.menu,
  partner: state.partnerReducer.partner
}), {
  saveItem,
  deleteItem
})(ItemDescription)