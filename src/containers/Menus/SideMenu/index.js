import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@material-ui/core';
import { Add, ExpandMore } from '@material-ui/icons';
import { connect } from 'react-redux';

import Title from '../../../components/Title/Title';
import MRCButton from '../../../components/Button/MRCButton';
import ENUMS from '../../../utils/enum';
import Category from './Category';
import Item from './Item';
import { useStyles as styles } from '../';
import ManageSideMenu from './ManageSideMenu';
import { getSideMenuDetails } from './sideMenuUtils/apis/actions';

import MenuImage from '../../../../public/static/images/menu-home-new.svg';


const useStyles = makeStyles(theme => ({
  ...styles
}))

function SideItemMenu({ sideMenu, ...props }) {

  const classes = styles();
  const [openSideItem, setOpenSideItem] = useState(false);
  const [action, setAction] = useState('');
  const [category, setCategory] = useState({});
  const [sideCategories, setSideCategories] = useState([]);
  const handleNewSide = () => {
    setAction(ENUMS.CREATE);
    setOpenSideItem(true)
  }

  const handleEditSide = (category) => () => {
    setAction(ENUMS.UPDATE);
    setCategory(category)
    setOpenSideItem(true)
  }

  const handleClose = () => {
    setCategory({})
    setOpenSideItem(false);
  }

  useEffect(() => {
    setSideCategories(sideMenu)
  }, [sideMenu])

  useEffect(() => {
    if (props.partnerId) {
      props.getSideMenuDetails(props.partnerId)
    }
  }, [props?.partnerId])

  return (
    <>
      <Grid container>
        <Grid item container className={classes.wrapper}>
          <Box width="100%" marginBottom={2} alignSelf="flex-start" alignItems="center" justifyContent="space-between" display="flex">
            <Grid className={classes.menusTitle} item xs={8} direction="column" container justify="space-between">
              <Title title="Side items menu" />
              <Box mt={1.5}>
                <Typography className={classes.secondaryTitle}>{ENUMS.SIDE_ITEM_MENU.ADD_ITEM_TO_ACCOMPANY}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={4} justify="flex-end">
              <Grid item sm={10} md={6} lg={5}>
                <MRCButton onClick={handleNewSide} type="button" color="primary">
                  <Add fontSize="small" className={classes.addIcon} color="default" />
                  {ENUMS.SIDE_ITEM_MENU.NEW_SIDE}</MRCButton>
              </Grid>
            </Grid>
          </Box>
          <Box width="100%">
            <Grid item xs={12}>
              <Box width="100%" display="flex" justifyContent="flex-start" py={3} my={1}>
                {
                  !sideCategories.length ? <Grid justify="center" container item xs={12} >
                    <img src={MenuImage} />
                  </Grid> :
                    <>  <Grid item xs={6}><Typography variant="h6" classNmae={classes.categoryName}>{ENUMS.SIDE_ITEM_MENU.SIDE_CATEGORY_NAME}</Typography></Grid>
                      <Grid item xs={1}><Typography variantsideMenus="h6" classNmae={classes.categoryName}>{ENUMS.SIDE_ITEM_MENU.ITEMS}</Typography></Grid>
                    </>
                }
              </Box>
              {sideCategories?.map((category) => (
                <Accordion
                  classes={{
                    root: classes.accordion,
                    expanded: classes.expanded,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore className={classes.arrowIcon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionSummary}
                    IconButtonProps={{ edge: 'end' }}
                    classes={{
                      content: classes.summaryContent,
                    }}
                  >
                    <Category
                      handleEditCategory={handleEditSide(category)}
                      classes={classes}
                      category={category}
                      categories={sideCategories}
                      partnerId={props.partnerId}
                    />
                  </AccordionSummary>
                  <Divider />
                  <Grid item xs={12}>
                    <AccordionDetails className={classes.AccordionDetails}>
                      {category?.sideItems?.map((item) => (
                        <Item
                          classes={classes}
                          category={category}
                          item={item}
                          categories={sideCategories}
                          partnerId={props.partnerId}
                        />
                      ))}
                      {!category?.sideItems?.length && (
                        <Grid
                          className={classes.menuItem}
                          item
                          container
                          justify="center"
                          alignItems="center"
                        >
                          <Typography>{ENUMS.NO_ITEMS}</Typography>
                        </Grid>
                      )}
                    </AccordionDetails>
                  </Grid>
                </Accordion>
              ))}
            </Grid>
          </Box>
          {
            <ManageSideMenu categories={sideCategories} category={category} menuAction={action} open={openSideItem} handleClose={handleClose} />
          }
        </Grid>
      </Grid>
    </>
  )
}


export default connect(state => ({
  sideMenu: state.sideMenuReducer.sideMenu,
  partnerId: state.partnerReducer.partner.id
}), { getSideMenuDetails })(SideItemMenu)