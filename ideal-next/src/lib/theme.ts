import { extendTheme } from '@chakra-ui/react'

const colors = {
  neonBlue: "rgba(0, 184, 212, 1)",
  neonPurple: '#7B1FA2',
  deepBlue: '#0A0A1A',
  navy: {
    900: '#050614',
    800: '#0A0A1A',
  },
  gradients: {
    blue: {
      start: "#4299E1",  // blue.400
      end: "#00B5D8",    // cyan.400
    }
  },
}

const styles = {
  global: {
    body: {
      bg: '#050614',
      color: 'white',
    },
    'select option': {
      bg: '#0A0A1A !important',
      color: 'white !important',
    },
    'select:focus option:checked': {
      bg: '#1A1A2A !important',
      color: 'white !important',
    },
    '.gradient-text': {
      bgGradient: 'linear(to-r, blue.400, cyan.400)',
      bgClip: 'text',
      fontWeight: 'bold',
      filter: 'drop-shadow(0 0 8px rgba(66, 153, 225, 0.6))',
    },
    '.gradient-text-hover': {
      _hover: {
        bgGradient: 'linear(to-r, cyan.400, blue.400)',
      }
    },
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    },
  },
}

const components = {
  Heading: {
    baseStyle: {
      color: 'white',
      letterSpacing: 'wider',
    },
    variants: {
      gradient: {
        position: 'relative',
        zIndex: 1,
        '& span': {
          background: 'linear-gradient(to right, #4299E1, #00B5D8)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textFillColor: 'transparent',
          textShadow: '0 0 8px rgba(66, 153, 225, 0.6)',
          display: 'inline',
        }
      },
      pageTitle: {
        fontSize: ['3xl', '4xl'],
        textAlign: 'center',
        mb: 4,
        color: 'white',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
      },
      sectionTitle: {
        position: 'relative',
        textAlign: 'center',
        color: 'white',
        bgGradient: 'linear(to-r, neonBlue, neonPurple)',
        bgClip: 'text',
        letterSpacing: '1px',
        fontWeight: 'bold',
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '2px',
          bgGradient: 'linear(to-r, neonBlue, neonPurple)',
        }
      }
    },
    defaultProps: {
      variant: 'gradient'
    }
  },
  Text: {
    baseStyle: {
      color: 'gray.100',
      letterSpacing: '0.1em',
      lineHeight: 1.8,
    },
    variants: {
      subtitle: {
        fontSize: ['lg', 'xl'],
        textAlign: 'center',
        color: 'whiteAlpha.800',
        mb: 8,
      }
    }
  },
  Button: {
    variants: {
      primary: {
        bg: 'neonBlue',
        color: 'white',
        _hover: {
          bg: 'blue.400',
          transform: 'translateY(-2px)',
          boxShadow: '0 0 20px rgba(0, 184, 212, 0.4)',
        },
      },
      outline: {
        borderColor: 'neonBlue',
        color: 'neonBlue',
        _hover: {
          bg: 'rgba(0, 184, 212, 0.1)',
        },
      },
    },
  },
  Tag: {
    variants: {
      subtle: {
        bg: 'rgba(66, 153, 225, 0.3)',
        color: 'white',
      },
    },
  },
  Select: {
    baseStyle: {
      field: {
        bg: 'navy.900',
        color: 'white',
        borderColor: 'whiteAlpha.300',
        _hover: {
          borderColor: 'whiteAlpha.400',
        },
        _focus: {
          borderColor: 'blue.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
        },
      },
      icon: {
        color: 'white',
      },
    },
    variants: {
      filled: {
        field: {
          bg: 'navy.900',
          color: 'white',
          borderColor: 'whiteAlpha.300',
          _hover: {
            bg: 'navy.800',
            borderColor: 'whiteAlpha.400',
          },
          _focus: {
            bg: 'navy.800',
            borderColor: 'blue.400',
          },
          _invalid: {
            borderColor: 'red.500',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: 'navy.900',
          color: 'white',
          borderColor: 'whiteAlpha.300',
          _hover: {
            bg: 'navy.900',
            borderColor: 'whiteAlpha.400',
          },
          _focus: {
            bg: 'navy.900',
            borderColor: 'blue.400',
          },
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
  Textarea: {
    variants: {
      filled: {
        bg: 'navy.900',
        color: 'white',
        borderColor: 'whiteAlpha.300',
        _hover: {
          bg: 'navy.900',
          borderColor: 'whiteAlpha.400',
        },
        _focus: {
          bg: 'navy.900',
          borderColor: 'blue.400',
        },
      },
    },
    defaultProps: {
      variant: 'filled',
    },
  },
}

const theme = extendTheme({
  fonts: {
    heading: `'Noto Sans JP', sans-serif`,
    body: `'Noto Sans JP', sans-serif`,
  },
  colors,
  styles,
  components,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
})

export default theme 