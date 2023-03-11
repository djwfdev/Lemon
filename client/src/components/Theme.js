import { createTheme } from '@mui/material/styles';

export const Theme = createTheme ({
    components: {
      MuiBox: {
        styleOverrides: {
          root: {
            borderRadius: 15,
            boxShadow: 3
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 15,
            boxShadow: 3
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 15,
            boxShadow: 3,
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 15,
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          textSizeSmall: {
            padding: '7px 12px'
          },
          textSizeMedium: {
            padding: '9px 16px'
          },
          textSizeLarge: {
            padding: '12px 16px'
          }
        }
      }
    },
    palette: {
      type: 'light',
      primary: {
        main: '#1f351c',
      },
      secondary: {
        main: '#80b979',
      },
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.57
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        lineHeight: 2.5,
        textTransform: 'uppercase'
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66
      },
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.375
      },
      h2: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.375
      },
      h3: {
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.375
      },
      h4: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.375
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.375
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.375
      }, 
      fontSize: 14,
      button: {
        fontSize: 16,
        fontWeight: 500, 
      },
    },
  }
); 
