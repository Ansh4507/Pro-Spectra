// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e0faff',
    100: '#b3ecf5',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4', // primary
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
  },
  accent: {
    500: '#64ffda',
  },
  slate: {
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
    600: '#475569',
    500: '#64748b',
    400: '#94a3b8',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.4)',
  }
};

const fonts = {
  heading: `'Poppins', 'Segoe UI', sans-serif`,
  body: `'Inter', 'Segoe UI', sans-serif`,
};

const shadows = {
  outline: '0 0 0 3px rgba(0, 188, 212, 0.6)',
  subtle: '0 4px 14px rgba(0,0,0,0.08)',
  deep: '0 6px 24px rgba(0,0,0,0.15)',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'xl',
    },
    variants: {
      solid: (props) => ({
        bg: `${props.colorScheme}.500`,
        color: 'white',
        _hover: {
          bg: `${props.colorScheme}.600`,
          boxShadow: 'md',
        },
        _active: {
          bg: `${props.colorScheme}.700`,
        },
      }),
      glass: {
        bg: 'glass.dark',
        color: 'white',
        backdropFilter: 'blur(10px)',
        _hover: {
          bg: 'glass.light',
        },
      },
    },
  },
  Input: {
    baseStyle: {
      borderRadius: 'md',
    },
    variants: {
      filled: {
        field: {
          bg: 'gray.700',
          _hover: { bg: 'gray.600' },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: 'outline',
          },
        },
      },
    },
  },
  Select: {
    baseStyle: {
      borderRadius: 'md',
    },
    variants: {
      filled: {
        field: {
          bg: 'gray.700',
          _hover: { bg: 'gray.600' },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: 'outline',
          },
        },
      },
    },
  },
  Textarea: {
    baseStyle: {
      borderRadius: 'md',
    },
    variants: {
      filled: {
        bg: 'gray.700',
        _hover: { bg: 'gray.600' },
        _focus: {
          borderColor: 'brand.500',
          boxShadow: 'outline',
        },
      },
    },
  },
  Switch: {
    baseStyle: {
      track: {
        _checked: {
          bg: 'brand.500',
        },
      },
    },
  },
  Modal: {
    baseStyle: {
      dialog: {
        bg: 'slate.800',
        borderRadius: 'xl',
      },
    },
  },
  Tooltip: {
    baseStyle: {
      bg: 'gray.700',
      color: 'white',
      fontSize: 'sm',
      px: 3,
      py: 2,
      borderRadius: 'md',
    },
  },
  Toast: {
    baseStyle: {
      borderRadius: 'md',
      boxShadow: 'md',
      fontWeight: '500',
    },
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'slate.900' : 'white',
      color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      fontFamily: 'body',
    },
    '::selection': {
      bg: 'brand.300',
      color: 'slate.900',
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  shadows,
  components,
  styles,
});

export default theme;
