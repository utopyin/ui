import { cn } from "tailwind-variants";

export const composeBaseUI = <State>(
  className: string,
  otherClassName?: string | ((state: State) => string | undefined) | undefined
) => {
  if (typeof otherClassName === "function") {
    return (state: State) => cn(className, otherClassName(state));
  }
  return cn(className, otherClassName);
};
