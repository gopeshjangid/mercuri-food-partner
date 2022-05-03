import React, { Component, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import clsx from 'clsx';

import { getMasterRestaurantTypes, getRestaurantTypeAction } from './businessUtils/restaurantType/apis/actions';
import MRCChip from '../Universal/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
        fontWeight: theme.typography.fontWeightBold,
        fontFamily: 'Exo',
        textTransform: 'uppercase !important',
        fontSize: theme.spacing(1.4),
        backgroundColor: theme.palette.grey[50],
        color: theme.palette.text.hint,
        cursor: 'pointer'
    },
    selected: {
        fontWeight: theme.typography.fontWeightBold,
        fontFamily: 'Exo',
        textTransform: 'uppercase !important',
        fontSize: theme.spacing(1.4),
        border: 'none',
        backgroundColor: theme.palette.background.mediumPrimary,
        color: theme.palette.primary.main,
        cursor: 'pointer'
    },
    defaultColor: {
        backgroundColor: theme.palette.grey[50],
        textTransform: 'uppercase',
        fontSize: theme.spacing(1.5)
    },
    label: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.grey[800],
        fontFamily: 'Exo',
        fontSize: theme.spacing(1.5),
        marginBottom: theme.spacing(3.5)
    }
}))

const RestaurantType = (props) => {

    const classes = useStyles();
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        (async () => {
            setList(await getMasterRestaurantTypes())
        })()
    }, [])

    const handleClick = (current) => () => {
        if (selected?.some(e => e === current))
            return setSelected(selected?.filter(selected => selected !== current))
        !!selected?.length && setSelected([...selected, current]);
        !selected?.length && setSelected([current])
    }

    useEffect(() => {
        props?.getRestaurantTypeAction(selected)
    }, [selected])

    useEffect(() => {
        if (props.partner.partnerType) {
            setSelected([props?.partner.partnerType])
        }
    }, [props?.partner])

    return (
        <div>
            <Box pl={2} mb={3}>
                <Typography className={classes.label} >Select Restaraunt Type (choose all that apply)</Typography>
                <Grid item container xs={12} spacing={2}>
                    {
                        list.map((list, index) => (<Box

                            onClick={handleClick(index + 1)} m={1}><MRCChip className={clsx(!selected.some(selected => selected === index + 1) ? classes.root : classes.selected)}
                                variant={selected.some(selected => selected === index + 1) ? "primary" : "transparent"}
                                label={list.value} /></Box>))
                    }
                </Grid>
            </Box>
        </div>
    )
}

export default connect(state => ({
    restaurantType: state.restaurantTypeReducer.restaurantType,
    partner: state.partnerReducer.partner
}), { getRestaurantTypeAction })(RestaurantType)
