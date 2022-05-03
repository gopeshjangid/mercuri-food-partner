import React, { useRef, useState, useEffect, useContext } from 'react';
import { Grid, IconButton, Typography, Fab, Tooltip, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AttachFile, HelpOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import mergeRefs from "react-merge-refs";

import MRCButton from '../../components/Button/MRCButton';
import ColorPickerInput from '../../components/CommonInput/ColorPickerInput';
import ENUMS from '../../utils/enum';
import MRCInputfield from '../../components/CommonInput/MRCInputField';
import { getBrandingAction, setBrandingColor } from './brandingUtils/apis/actions';
import BrandindPreview from './brandingUtils/preview';
import InputFields from './brandingUtils/InputFields';
import FieldsData from './brandingUtils/inputFields.json';
import { getPartnerDetails } from '../../components/BusinessProfile/businessUtils/apis/actions';
import { ToastMessageContext } from '../../context/messageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    '& a': {
      fontWeight: theme.palette.weight.bold,
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  container: {
    margin: theme.spacing(2, 'auto'),
    minHeight: '90vh',
  },
  wrapper: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2)
  },
  deviceWrapper: {
    position: 'relative'
  },
  deviceFrame: {
    position: 'absolute',
    zIndex: 100
  },
  deviceImage: {
    position: 'absolute',
    top: theme.spacing(0.8),
    left: theme.spacing(1.5)
  },
  display: {
    display: 'none'
  }, iconButton: {
    position: 'absolute', right: 0
  },
  titleHeader: {
    fontSize: theme.spacing(3.5),
    fontFamily: 'Exo',
    fontWeight: theme.typography.fontWeightBold
  },
  subtitle1: {
    fontWeight: theme.typography.fontWeightBold
  },
  pointer: {
    cursor: 'pointer !important'
  },
  profile_cover_wrapper: {
    position: 'relative'
  },
  profile_cover_hidden: {
    position: 'absolute',
    opacity: `${0} !important`,
    zIndex: 10,
    top: theme.spacing(4)
  },
  profile_cover: {
    marginTop: theme.spacing(-2)
  },
  tooltip: {
    position: 'absolute',
    right: '58%',
    top: theme.spacing(-1.4),
    [theme.breakpoints.down('lg')]: {
      right: '56%'
    },
    [theme.breakpoints.down('md')]: {
      right: '40%'
    }
  },
  simplifiedWrapper: {
    position: 'relative'
  }, positionRelative: {
    position: 'relative'
  }
}));

function BusinessBranding(props) {

  const profileRef = useRef(null);
  const coverRef = useRef(null);
  const colorRef = useRef(null);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const message = useContext(ToastMessageContext);
  const { register, control, errors, handleSubmit, formState, watch, setValue } = useForm({
    reValidateMode: 'onBlur',
    mode: 'all',
    defaultValues: {
      ...props.branding,
      ...props.partner,
      simplifiedName: props.partner.simplifiedName
    }
  });

  const watchFileFields = watch(['simplifiedName', 'brandColor', 'profilePhoto', 'profilePhotoHelper', 'coverPhoto', 'coverPhotoHelper']);

  const { profilePhoto, coverPhoto, brandColor, simplifiedName } = watchFileFields;

  useEffect(() => {
    if (watchFileFields) {
      if (!!profilePhoto?.length)
        setValue('profilePhotoHelper', watchFileFields.profilePhoto[0]?.name)
      if (!!coverPhoto?.length)
        setValue('coverPhotoHelper', watchFileFields.coverPhoto[0]?.name)
    }
  }, [!!profilePhoto?.length && profilePhoto[0].name, !!coverPhoto?.length && coverPhoto[0].name])


  const submit = (data) => {
    setLoading(true);
    props.getBrandingAction({
      ...data,
      partner: props.partner,
      orderType: props.orderType,
      brandColor: props.branding.brandColor
    }, message)
  }

  useEffect(() => {
    props.setBrandingColor(props?.partner.brandColor)
    setValue("brandColor", props?.partner.brandColor)
  }, [props?.partner.brandColor])


  useEffect(() => {
    setValue("profilePhotoHelper", props.partner.profileImage)
    setValue("coverPhotoHelper", props.partner.coverImage)
    setValue("simplifiedName", props.partner.simplifiedName)
    setLoading(false);
  }, [props.partner])

  useEffect(() => {
    props.getPartnerDetails(props.partner.id)
  }, [])


  return (
    <>
      <Grid className={classes.container} container direction="column" alignItems="center">
        <form onSubmit={handleSubmit(submit)}>
          <Grid
            className={classes.wrapper}
            item
            container
            xs={12}
            direction="column"
            alignItems=""
            spacing={3}
          >
            <Grid item container justify="flex-start" alignItems="center">
              <Typography className={classes.titleHeader} variant="h6">
                {ENUMS.BRANDING_HEADER}
              </Typography>
            </Grid>
            <Grid item container xs={7} alignItems="flex-start" >
              <Typography variant="body1">
                {ENUMS.BRANDING_TITLE}
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={3} justify="space-between">

              <Grid item container xs={12} spacing={2} md={7} direction="column">
                <Grid item container>
                  <InputFields setBrandingColor={props.setBrandingColor} setValue={setValue} watchFileField={watchFileFields} control={control} errors={errors} register={register} FieldsData={FieldsData} />

                  <Box>
                    <MRCButton loading={loading} type="submit" variant="contained" color="primary">
                      {ENUMS.SAVE_MY_BRANDING}
                    </MRCButton>
                  </Box>
                </Grid>

              </Grid>
              <Grid className={classes.positionRelative} item container xs={12} md={5} spacing={8} direction="column">
                <Box width="100%" marginTop={-4}>
                  <BrandindPreview />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}


export default connect(state => ({
  branding: state.brandingReducer.branding,
  partner: state.partnerReducer.partner,
  orderType: state.orderTypeReducer.orderType
}), { getBrandingAction, setBrandingColor, getPartnerDetails })(BusinessBranding)