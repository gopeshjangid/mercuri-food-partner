import { createMuiTheme } from '@material-ui/core/styles';

const globalTheme = createMuiTheme({});

const theme = createMuiTheme({
  palette: {
    // Brand Primary colors in 10% shades — dark to light
    primary: {
      main: '#098860',
      900: '#6f5092',
      800: '#7f639e',
      700: '#8f77aa',
      600: '#9f8ab6',
      500: '#af9ec3',
      400: '#bfb1cf',
      300: '#cfc5db',
      200: '#dfd8e7',
      100: '#efecf3',
      contrastText: '#fff',
    },
    // Brand Secondary colors in 10% shades — dark to light
    secondary: {
      main: '#00C876',
      900: '#5c9c4d',
      800: '#528a44',
      700: '#47793b',
      600: '#3d6833',
      500: '#66ad55',
      400: '#75b566',
      300: '#85bd77',
      200: '#94c688',
      100: '#a3ce99',
      contrastText: '#fff',
    },

    tertiary: {
      main: '#fff',
      contrastText: '#99999',
    },
    quadrinary: {},

    status: {
      main: '#E1B336',
      500: '#E1B336',
      contrastText: '#fff',
    },
    error: {
      main: '#ff0000',
      500: '#ff0000',
      contrastText: '#fff',
    },
    success: {
      main: '#00C876',
      900: '#5c9c4d',
      800: '#528a44',
      700: '#47793b',
      600: '#3d6833',
      500: '#66ad55',
      400: '#75b566',
      300: '#85bd77',
      200: '#94c688',
      100: '#d9f5dc',
      contrastText: '#fff',
    },
    common: {
      black: '#000',
      white: '#fff',
      grey: '#aeaeae',
      green: '#6E9930',
      red: '#d90059',
    },
    background: {
      paper: '#fff',
      default: '#fff', // Used by css baseline to set body bg color
      skyblue: '#bce3d959',
      skyblueDark: '#f7faf9',
      mediumPrimary: 'rgba(9, 136, 96, 0.2)'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    button: {
      lightPrimary: 'rgba(9, 136, 96, 0.04)'
    },
    weight: {
      light: 300,
      normal: 400,
      regular: 500,
      semiBold: 600,
      bold: 700,
    },
    size: {
      default: '16px',
      double: '32px',
    },
    radius: {
      default: '8px',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    navHeight: '52px',
    formBackground: '#E5E5E5',
    borderColor: '#CCCCCC',
    colorPrimary: '#65388b', // replaces cta1
    colorPrimaryContrast: '#fff',
    colorSecondary: '#600', // replaces cta2
    colorSecondaryContrast: '#fff',
    colorTertiary: '#1f1f1b', // replaces cta3
    colorTertiaryContrast: '#fff',
    colorQuaternary: '#1f1f1b', // replaces cta4
    colorQuaternaryContrast: '#fff',
    colorQuinary: '#1f1f1b', // added for flexibility
    colorQuinaryContrast: '#fff',
    colorIcBanner10: '#e94e75',
    colorIcBanner20: '#7ca60b',
    colorNeutral: '#1f1f1b', // replaces gray*
    colorNeutral10: '#fafafa', // begin alpha variants
    colorNeutral20: '#f5f5f5',
    colorNeutral30: '#eee',
    colorNeutral40: '#e0e0e0',
    colorNeutral50: '#bdbdbd',
    colorNeutral60: '#9e9e9e',
    colorNeutral70: '#757575',
    colorNeutral80: '#373737',
    colorNeutral90: '#1b1b1b', // end alpha variants

    colorInfo: '#1976d2',
    colorInfoContrast: '#fff',
    colorWarning: '#ffa000',
    colorWarningContrast: '#fff',
    clubsTypebackground: '#F2F0EC',
    colorAlert: '#f44336',
    contentColor: '#666666',
    colorAlertContrast: '#fff',
    colorSuccess: '#43a047',
    colorSuccessContrast: '#fff',
    colorDisabled: '#ccc',
    colorDisabledContrast: '#1f1f1b',
    colorValid: '#24b200',
    tabTextColor: '#212121',

    tiers: {
      card: {
        backgroundColor: '#fff',
      },
      image: {
        maxWidth: '100%',
        height: 'auto',
      },
      title: {
        lineHeight: '42px',
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        upSmall: {
          textAlign: 'left',
        },
        downSmall: {
          textAlign: 'center',
        },
      },
      container: {
        backgroundColor: 'transparent',
        maxWidth: {
          downSmall: '100%',
          downMedium: '100%',
          upMedium: '970px',
          upLarge: '1170px',
        },
      },
    },
    display: {
      flex: 'flex',
      block: 'block',
      none: 'none'
    }
  },
  typography: {
    body1: {
      fontFamily: 'Open Sans',
    },
    h4: {
      fontWeight: 800,
      fontFamily: 'Exo',
    },
    h5: {
      fontWeight: 600,
      fontFamily: 'Exo',
    },
    h6: { fontFamily: 'Exo', fontWeight: 700 },
    subtitle1: {
      fontFamily: 'Exo',
      fontWeight: 500
    },
    subtitle2: {
      fontFamily: 'Exo',
      fontWeight: 600,
    },
    display: {
      flex: 'flex',
      block: 'block',
      none: 'none'
    }
  },
  overrides: {
    MuiFormLabel: {
      root: {
        fontWeight: globalTheme.typography.fontWeightBold,
        color: globalTheme.palette.grey[800],
        fontFamily: 'Exo',
        "&$disabled": {
          color: `${globalTheme.palette.grey[800]}`,
        }
      }
    },
    MuiGrid: {
      "spacing-xs-1": {
        margin: 0
      }
    },
    MuiTab: {
      root: {
        padding: globalTheme.spacing(0, 0),
        textTransform: 'none',
        fontSize: globalTheme.spacing(2)
      },
      textColorPrimary: {
        fontFamily: 'Exo',
        fontWeight: globalTheme.typography.fontWeightBold,
      },
      selected: {
        color: globalTheme.palette.common.black
      },

    },
    MuiTabs: {
      indicator: {
        height: globalTheme.spacing(0.5),
      }
    }
  },
  dimensions: {
    width100: '100%',
    width95: '95%',
    width90: '90%',
    width80: '80%',
    width70: '70%',
    width50: '50%',
    width3: '3%'
  }
});

export { theme as default };
