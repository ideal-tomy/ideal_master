import { Text, TextProps } from '@chakra-ui/react'

interface GradientTextProps extends TextProps {
  children: React.ReactNode;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, ...props }) => {
  return (
    <Text
      as="span"
      display="inline"
      css={{
        background: 'linear-gradient(to right, #4299E1, #00B5D8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 8px rgba(66, 153, 225, 0.6)'
      }}
      fontWeight="bold"
      {...props}
    >
      {children}
    </Text>
  );
}; 