import { ResponsiveValue } from "@chakra-ui/react";

export type Transition = {
  duration: number;
  delay?: number;
  type?: string;
};

export type TransitionProps = ResponsiveValue<Transition>; 