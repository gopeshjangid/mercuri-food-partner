import React, { useState, useContext, useEffect } from 'react'
import { useTheme, Box, Grid, Typography, ListItem, IconButton, FormControl, FormControlLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DeleteOutline, DeleteOutlineSharp, Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'

import MRCButton from '../../../../../components/Button/MRCButton'
import MRCChip from '../../../../../components/Universal/Chip'
import ManageItem from '../../ManageSideItem';
import DataDialog from '../../../../../components/Universal/DataDailog'
import { ToastMessageContext } from '../../../../../context/messageContext'
import ENUMS from '../../../../../utils/enum'
import InputFields from './inputFileds'
import FieldsData from './input-fields.json'
import { getSideMenuAction, deleteSideItem, deleteSide } from '../../sideMenuUtils/apis/actions'
import { sideCategories } from '../../data'

function SideMenu({ title, menuAction, ...props }) {

  const items = sideCategories[0];
  const classes = useStyles();
  const { control, errors, register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: props.category
  });
  const [sideItems, setSideItems] = useState([]);

  const message = useContext(ToastMessageContext);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [itemId, setItemId] = useState('');
  const [item, setItem] = useState({});
  const [action, setAction] = useState('');
  const { category } = props;

  useEffect(() => {
    setSideItems(props?.categories?.find(category => category?.id === props?.category?.id)?.sideItems || [])
  }, [props.categories]);

  const submit = (data) => {
    if (menuAction === ENUMS.CREATE) {
      props.getSideMenuAction({
        ...data,
        partnerId: props.partner.id
      }, message)
      props.handleClose()
    }

    if (menuAction === ENUMS.UPDATE) {
      props.getSideMenuAction({
        ...data,
        id: category.id,
        partnerId: props.partner.id
      }, message)
    }
  }
  const handleDelete = () => {
    props.deleteSide({ id: props?.category?.id, partnerId: props?.partner?.id }, message)
    props.handleClose()
  }

  const handleDeleteItem = id => () => {
    setItemId(id);
    setOpenDeleteItem(true)
  }

  const confirmDeleteItem = () => {
    props.deleteSideItem({ id: itemId, partnerId: props.partner.id }, message)
    handleClose();
  }

  const handleAddItem = (action, item) => () => {
    setOpenAddItem(true);
    if (action === ENUMS.SIDE_ITEM_MENU.UPDATE_ITEM) {
      return setItem(item)
    }
    setAction(ENUMS.CREATE);
  }

  const handleClose = () => {
    setItem({})
    setOpenAddItem(false);
    setOpenDeleteItem(false);
  }

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Box minHeight={600} borderRadius={8} p={3} bgcolor={useTheme().palette.common.white}>
          <Grid container>
            <Grid item container justify="center" direction="row" justify="space-between" alignItems="center">
              <Typography variant="h4">Side Category name</Typography>
              <Box component="div" paddingRight={8}>
                <Grid item container xs={12} alignItems="center" justify="space-between">
                  <Grid item xs={6}>
                    <MRCButton type="button" onClick={menuAction !== ENUMS.CREATE ? handleDelete : ''} variant="outlined" color="default">
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
                {ENUMS.SIDE_ITEM_MENU.ADD_ITEM_TO_ACCOMPANY}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box m={1}>
                <InputFields categories={props.categories} control={control} errors={errors} register={register} FieldsData={FieldsData} />
              </Box>
            </Grid>
            <Box mt={3} width="100%">
              {menuAction !== ENUMS.CREATE && <Box paddingLeft={2} mb={-1} justifyContent="space-between" width="100%" alignItems="Center" display="flex">
                <Typography variant="h6" className={classes.listHeaderTitle}>Item List</Typography>
                <Grid xs={2}>
                  <MRCButton onClick={handleAddItem()} type="button" variant="text" color="primary">
                    <Add fontSize="small" className={classes.addIcon} color="primary" />
                    Add new item
                </MRCButton>
                </Grid>
              </Box>}
              {
                sideItems?.map(item => <ListItem
                  onClick={handleAddItem(ENUMS.SIDE_ITEM_MENU.UPDATE_ITEM, item, category)}
                  className={classes.itemList}>
                  <Grid item container alignItems="center" justify="flex-start" xs={6}>
                    <Box display="flex" alignItems="center" mr={2.2}> <Typography variant="subtitle1">{item.name}</Typography></Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" color="textSecondary">({item?.calories} Cal.)</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} item container alignItems="center" justify="flex-end">
                    <Box mr={2}> {
                      item.isDefault ? <MRCChip label="Default Item" /> : ''
                    }</Box>
                    <Box mr={1}><Typography variant="subtitle2">{item.isDefault ? "Included" : `+$${item?.price}`}</Typography></Box>
                    <Box ml={1} mr={-3}>
                      <FormControlLabel
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                        control={(<IconButton onClick={handleDeleteItem(item.id)}><DeleteOutlineSharp /></IconButton>)}
                      />
                    </Box>
                  </Grid>
                </ListItem>)
              }
            </Box>
          </Grid>
        </Box>
        {
          openAddItem && <ManageItem
            categories={props.categories}
            category={props.category}
            sideItem={item}
            action={action}
            handleClose={handleClose}
          />
        }{
          openDeleteItem && <DataDialog textOk={ENUMS.DELETE_ITEM} handleClose={handleClose} handleSubmit={confirmDeleteItem}>
            <Typography variant="h5">Are you sure you want to delete this data?</Typography>
          </DataDialog>
        }
      </form>
    </>
  )
}

export default connect(state => ({
  partner: state.partnerReducer.partner
}), { getSideMenuAction, deleteSideItem, deleteSide })(SideMenu)


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
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3.2)
  },
  itemList: {
    boxShadow: 'none',
    minHeight: theme.spacing(9),
    borderBottomLeftRadius: theme.spacing(0),
    borderBottomRightRadius: theme.spacing(0),
    WebkitBorderBottomLeftRadius: theme.spacing(0),
    WebkitBorderBottomRightRadius: theme.spacing(0),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    '&:last-child': {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      borderBottomLeftRadius: theme.spacing(0),
      borderBottomRightRadius: theme.spacing(0),
      WebkitBorderBottomLeftRadius: theme.spacing(0),
      WebkitBorderBottomRightRadius: theme.spacing(0),
    },
  },
  listHeaderTitle: {
    fontSize: theme.spacing(2.3)
  }
}))