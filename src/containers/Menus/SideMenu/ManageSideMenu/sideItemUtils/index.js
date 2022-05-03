import React, { useState, useContext } from 'react'
import { useTheme, Box, Grid, Typography, ListItem, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MRCButton from '../../../../../components/Button/MRCButton'
import ENUMS from '../../../../../utils/enum'
import InputFields from './inputFileds'
import FieldsData from './input-fields.json'
import { useForm } from 'react-hook-form'
import { sideCategories } from '../../data'
import MRCChip from '../../../../../components/Universal/Chip'
import { DeleteOutline, DeleteOutlineSharp, Add } from '@material-ui/icons'
import ManageItem from '../../ManageSideItem';
import { connect } from 'react-redux'
import { getSideMenuAction } from '../../sideMenuUtils/apis/actions'
import { ToastMessageContext } from '../../../../../context/messageContext'

function SideItem({ title, menuAction, ...props }) {

  const items = sideCategories[0];
  const classes = useStyles();
  const { control, errors, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: props.category
  });
  const message = useContext(ToastMessageContext);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [action, setAction] = useState('');
  const { category } = props;

  const submit = (data) => {
    if (menuAction === ENUMS.CREATE) {
      props.getSideMenuAction({
        ...data,
        partnerId: props.partner.id
      }, message)
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

  }

  const handleAddItem = (action, item) => () => {
    if (action === ENUMS.SIDE_ITEM_MENU.UPDATE_ITEM) {
      set
    }
    setAction(ENUMS.CREATE);
    setOpenAddItem(true);
  }
  const handleClose = () => {
    setOpenAddItem(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Box minHeight={600} borderRadius={8} p={3} bgcolor={useTheme().palette.common.white}>
          <Grid container>
            <Grid item container justify="center" direction="row" justify="space-between" alignItems="center">
              <Typography variant="h4">Side Category name</Typography>
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
              <Box paddingLeft={2} mb={-1} justifyContent="space-between" width="100%" alignItems="Center" display="flex">
                <Typography variant="h6" className={classes.listHeaderTitle}>Item List</Typography>
                <Grid xs={2}>
                  <MRCButton onClick={handleAddItem} type="button" variant="text" color="primary">
                    <Add fontSize="small" className={classes.addIcon} color="primary" />
                    Add new item
                </MRCButton>
                </Grid>
              </Box>
              {
                items.items.map(item => <ListItem
                  onClick={handleAddItem(ENUMS.SIDE_ITEM_MENU.UPDATE_ITEM, item)}
                  className={classes.itemList}>
                  <Grid item container alignItems="center" justify="flex-start" xs={6}>
                    <Box display="flex" alignItems="center" mr={2.2}> <Typography variant="subtitle1">{item.name}</Typography></Box>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" color="textSecondary">({item.itemCalories} Cal.)</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={6} item container alignItems="center" justify="flex-end">
                    <Box mr={2}> {
                      item.default ? <MRCChip label="Default Item" /> : ''
                    }</Box>
                    <Box mr={1}><Typography variant="subtitle2">{item.included ? <MRCChip label="Included" /> : `+$${item.additionalPrice}`}</Typography></Box>
                    <Box><IconButton><DeleteOutlineSharp /></IconButton></Box>
                  </Grid>
                </ListItem>)
              }
            </Box>
          </Grid>
        </Box>
        {
          openAddItem && <ManageItem
            categories={props.categories}
            action={action}
            handleClose={handleClose}
          />
        }
      </form>
    </>
  )
}

export default connect(state => ({
  partner: state.partnerReducer.partner
}), { getSideMenuAction })(SideItem)


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