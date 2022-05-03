import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import ENUMS from '../../utils/enum';

export const tabProps = (index) => {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        '& button': {
            '& span': {
                textTransform: 'capitalize'
            }
        }
    },
    container: {
        marginLeft: theme.spacing(20)
    }
}));

export const list = {
    menuItems: [{
        id: '1',
        path: 'account',
        title: ENUMS.BUSINESS_PROFILE,
    }, {
        id: '2',
        path: 'account',
        title: ENUMS.BUSINESS_BRANDING,
    }
    ]
}