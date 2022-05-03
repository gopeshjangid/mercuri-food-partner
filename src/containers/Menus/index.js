import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Typography,
  Box,
} from '@material-ui/core';
import {
  CloseRounded, EditOutlined, EditTwoTone, ExpandMore, Add,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { parse, stringify } from 'flatted';

import { makeStyles } from '@material-ui/core/styles';

import ActivateMenu from './ActivateMenu';
import MRCButton from '../../components/Button/MRCButton';
import ManageCategory from './ManageCategory';
import { ManageItem } from './ManageItem';
import ManageMenu from './ManageMenu';
import MenuContext from './menu-context';
import Title from '../../components/Title/Title';
import Category from './Category';
import Item from './Item';
import Menu from './Menu';
import ENUMS from '../../utils/enum';
import AppStorage from '../../utils/app.storage';

import MenuImage from '../../../public/static/images/menu-home-new.svg';
import { getMenuDetails, getMenuAction } from './ManageMenu/menuUtils/apis/actions';
import { getPartnerDetails } from '../../components/BusinessProfile/businessUtils/apis/actions';
import MRCTab from '../../components/Universal/Tab';
import SideItemMenu from './SideMenu';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& a': {
      fontWeight: theme.palette.weight.bold,
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  container: {
    margin: 'auto',
    marginLeft: theme.spacing(-1),
    minHeight: '90vh',
  },
  menusTitle: { marginBottom: theme.spacing(2) },
  contactInfo: { marginTop: theme.spacing(4) },
  menuContainer: {
    backgroundColor: theme.palette.background.skyblue,
    borderRadius: theme.spacing(1),
    minHeight: theme.spacing(20),
    margin: theme.spacing(0),
    marginBottom: theme.spacing(-2.5)
  },
  wrapper: {
    padding: theme.spacing(1 / 2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3),
    minHeight: '80vh'
  },
  createMenu: {
    marginTop: theme.spacing(-5),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '48.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  editButton: {
    marginLeft: theme.spacing(2),
  },
  accordion: {
    boxShadow: 'none',
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
  expanded: {
    margin: `${theme.spacing(0, 0)} !important`,
  },
  accordionSummary: {
    flexDirection: 'row-reverse',
  },
  summaryContent: { margin: `${theme.spacing(0, 0)} !important` },
  arrowIcon: {
    margin: theme.spacing(1),
  },
  AccordionDetails: {
    marginLeft: theme.spacing(0),
    flexDirection: 'column',
    padding: theme.spacing(0),
  },
  menuItem: {
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(10),
    marginLeft: theme.spacing(0),
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  menu: {
    marginBottom: theme.spacing(4),
  },
  addIcon: {
    fontSize: theme.spacing(2),
  },
  categoryName: {
    marginLeft: theme.spacing(2),
  },
}));

function Menus({ partner, ...props }) {
  const classes = useStyles();
  const [menus, setMenus] = useState([]);
  const [openCreateMenu, setOpenCreateMenu] = useState(false);
  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [action, setAction] = useState('');


  useEffect(() => {
    const token = AppStorage.getLoginToken();
    try {
      props.getPartnerDetails(JSON.parse(token).userId)
    } catch (error) {
    }
  }, [])

  useEffect(() => {
    props.getMenuDetails(partner.id)
  }, [partner.id])


  useEffect(() => {
    setMenus(props.menus)
  }, [props.menus])

  const handleCreaMenu = () => {
    setOpenCreateMenu(true);
    setAction(ENUMS.CREATE);
  };
  const handleCreateItem = (menu, category) => {
    setSelectedCategory({
      data: {
        menu,
        category,
      },
    });
    setOpenCreateItem(true);
    setAction(ENUMS.CREATE);
  };
  const handleCreateCategory = (menu) => {
    setSelectedMenu(menu);
    setOpenCreateCategory(true);
    setAction(ENUMS.CREATE);
  };

  const handleCloseMenu = () => {
    setAction('');
    setOpenCreateMenu(false);
    setOpenCreateItem(false);
    setOpenCreateCategory(false);
  };

  const handleClearMenu = () => {
    setMenus([]);
  };

  const handleEditMenu = (menu) => {
    setSelectedMenu(menu);
    setOpenCreateMenu(true);
    setAction(ENUMS.UPDATE);
  };
  const handleEditCategory = (menu, category) => {
    setSelectedCategory({
      data: {
        menu,
        category,
      },
    });
    setOpenCreateCategory(true);
    setAction(ENUMS.UPDATE);
  };
  const handleEditMenuItem = (item, category, menu) => {
    setSelectedItem({
      data: {
        menu,
        category,
        item,
      },
    });
    setOpenCreateItem(true);
    setAction(ENUMS.UPDATE);
  };

  const handleActivate = (menu) => {
    setAction(ENUMS.ACTIVATE);
    setSelectedMenu(menu);
  };

  return (
    <>
      <MenuContext.Provider value={[menus, setMenus]}>
        <MRCTab
          noDivider={true}
          tabHeaders={[{ label: ENUMS.MENUS }, { label: ENUMS.SIDE_ITEM_MENU.TITLE }]}
          tabPanels={[<Grid className={classes.container} container direction="column" alignItems="flex-start">
            <Grid
              className={classes.wrapper}
              item
              container
              xs={12}
              direction="column"
              alignItems="center"
              spacing={0}
            >
              <Box alignSelf="flex-start">
                <Grid className={classes.menusTitle} item xs={12} container justify="space-between">
                  <Title title="Menus" />
                </Grid>
              </Box>
              {!menus.length && (
                <Grid item container spacing={3} direction="row-reverse" alignItems="center">
                  <Grid item container className={classes.menuContainer} spacing={5} justify="space-around" direction="row-reverse" >
                    <Grid item xs={12} md={6}>
                      <img width="100%" src={MenuImage} />
                    </Grid>
                    <Grid item container xs={12} direction="row" justify="flex-start" md={5}>
                      <Grid item>
                        <Typography variant="h6">{ENUMS.NO_RESTAURANT}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>{ENUMS.MENUS_TITLE}</Typography>
                      </Grid>
                      <Grid item md={12} lg={9} >
                        <MRCButton onClick={handleCreaMenu} color="primary">
                          <Add fontSize="small" className={classes.addIcon} color="default" />
                        &nbsp;
                        {ENUMS.CREATE_FIRST_MENU}
                        </MRCButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.contactInfo} item container justify="center" alignItems="center" direction="column" spacing={0}>
                    <Grid item>
                      <Typography variant="body2">
                        {ENUMS.CONTACT_MERCURI_LONG}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <MRCButton color="primary" variant="outlined">
                        {ENUMS.CONTACT_MERCURI}</MRCButton>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {!!menus.length && (
                <Grid item container direction="column">
                  <Grid item container justify="space-between">
                    <Grid item>
                      <Typography>{ENUMS.MENUS_TITLE}</Typography>
                    </Grid>
                    <Grid item className={classes.createMenu}>
                      <MRCButton onClick={handleCreaMenu} color="primary">
                        <Add fontSize="small" className={classes.addIcon} color="default" />
                        {ENUMS.CREATE_NEW_MENU}
                      </MRCButton>
                    </Grid>
                  </Grid>
                  <Divider />
                  {menus
                    && menus.length
                    && menus.map((menu, index) => (
                      <Grid key={index} className={classes.menu} item container>
                        <Menu
                          menu={menu}
                          classes={classes}
                          handleEditMenu={handleEditMenu}
                          handleCreateCategory={handleCreateCategory}
                          handleActivate={handleActivate}
                        />
                        <Grid item xs={12}>
                          {menu?.menuCategories?.map((category) => (
                            <Accordion
                              classes={{
                                root: classes.accordion,
                                expanded: classes.expanded,
                              }}
                              key={category.id}
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
                                  handleCreateItem={handleCreateItem}
                                  handleEditCategory={handleEditCategory}
                                  menu={menu}
                                  category={category}
                                  classes={classes}
                                />
                              </AccordionSummary>
                              <Divider />
                              <Grid item xs={12}>
                                <AccordionDetails className={classes.AccordionDetails}>
                                  {category.menuItems?.map((item) => (
                                    <Item
                                      key={item.id}
                                      category={category}
                                      menu={menu}
                                      item={item}
                                      classes={classes}
                                      handleEditMenuItem={handleEditMenuItem}
                                    />
                                  ))}
                                  {!category?.menuItems?.length && (
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
                      </Grid>
                    ))}
                </Grid>
              )}
            </Grid>
          </Grid>, <SideItemMenu />]}
        />
        {openCreateMenu && (
          <ManageMenu
            action={action}
            data={selectedMenu}
            title={ENUMS.MANAGE_MENU_TITLE}
            handleClose={handleCloseMenu}
          />
        )}
        {(
          <ManageItem
            action={action}
            open={openCreateItem}
            data={action === ENUMS.UPDATE ? selectedItem : selectedCategory}
            title={ENUMS.MANAGE_ITEM_TITLE}
            handleClose={handleCloseMenu}
          />
        )}
        {openCreateCategory && (
          <ManageCategory
            action={action}
            data={action === ENUMS.UPDATE ? selectedCategory : selectedMenu}
            title={ENUMS.MANAGE_CATEGORY_TITLE}
            handleClose={handleCloseMenu}
          />
        )}
        {action === ENUMS.ACTIVATE && (
          <ActivateMenu
            data={selectedMenu}
            title={`${selectedMenu.isActive ? 'De-Activate' : 'Activate'} Menu`}
            handleClose={handleCloseMenu}
          />
        )}
      </MenuContext.Provider>
    </>
  );
}


export default connect(state => ({
  menus: state.menuReducer.menu,
  partner: state.partnerReducer.partner
}), { getMenuDetails, getPartnerDetails, saveMenu: getMenuAction })(Menus)