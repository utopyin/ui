import { Button as PrimitiveButton } from "@base-ui/react/button";
import { tv, type VariantProps } from "tailwind-variants";
import { composeBaseUI } from "@/registry/lib/utils";
import { focusRingBaseVariant } from "@/registry/ui/focus-ring";

const buttonVariants = tv({
  slots: {
    base: [
      focusRingBaseVariant(),
      "inline-flex items-center font-medium outline-offset-2 transition-[background-color,scale,box-shadow] duration-100 active:scale-97",
    ],
    icon: "flex size-4.5 shrink-0 items-center justify-center",
    text: "font-medium text-sm",
  },
  variants: {
    variant: {
      accent: {
        base: [
          "bg-linear-to-b from-accent-300 to-accent-600 text-accent-foreground hover:from-accent-600",
          "shadow-[0_1px_3px_rgb(0_0_0_/_0.20),0px_0px_0px_1px_var(--color-accent-700),inset_0px_1px_0px_rgba(255,_255,_255,_0.2)]",
        ],
        text: "text-shadow-xs",
        icon: "drop-shadow-[0_1px_2px_var(--tw-drop-shadow-color,rgb(0_0_0_/_0.20))]",
      },
      outline: {
        base: [
          "bg-outline text-foreground hover:bg-outline-hover",
          "shadow-[0_1px_3px_rgb(0_0_0_/_0.10),0px_0px_0px_1px_rgb(0_0_0_/_0.08)]",
          "dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.20),0px_0px_0px_1px_rgb(255_255_255_/_0.2)]",
        ],
        icon: "text-muted-foreground",
      },
      secondary: {
        base: [
          "bg-secondary text-foreground shadow-[0_1px_3px_rgb(0_0_0_/_0.05),0_0_0_1px_rgb(0_0_0_/_0.04),inset_0_-10px_5px_-7px_rgb(0_0_0_/_0.04)]",
          "hover:shadow-[0_1px_3px_rgb(0_0_0_/_0.05),0_0_0_1px_rgb(0_0_0_/_0.04)]",
          "dark:shadow-[0_1px_3px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(0_0_0_/_0.2),inset_0_1px_2px_-1px_rgb(255_255_255_/_0.2),inset_0_-9px_8px_-8px_rgb(0_0_0_/_0.3)]",
          "dark:hover:shadow-[0_1px_3px_rgb(0_0_0_/_0.2),0_0_0_1px_rgb(0_0_0_/_0.2),inset_0_1px_2px_-1px_rgb(255_255_255_/_0.2)]",
        ],
        icon: "text-muted-foreground",
      },
    },
    size: {
      sm: { base: "gap-px rounded-sm px-1.5 py-1", text: "px-0.5" },
      md: { base: "gap-1 rounded-sm px-2 py-1.5", text: "px-0.5" },
      lg: { base: "gap-0.5 rounded-md px-2.5 py-2", text: "px-1" },
    },
  },
  defaultVariants: { variant: "secondary", size: "md" },
});

type ButtonProps = (
  | {
      leftIcon?: React.ReactNode;
      rightIcon?: undefined;
    }
  | {
      leftIcon?: undefined;
      rightIcon?: React.ReactNode;
    }
) &
  (
    | { text?: string; children?: undefined }
    | { text?: undefined; children?: React.ReactNode }
  ) &
  Omit<
    React.ComponentProps<typeof PrimitiveButton> &
      VariantProps<typeof buttonVariants>,
    "children"
  >;

export function Button({
  children,
  className,
  variant,
  size,
  text,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  const {
    base: baseVariants,
    icon: iconVariants,
    text: textVariants,
  } = buttonVariants({ variant, size });

  return (
    <span className="p-px">
      <PrimitiveButton
        className={composeBaseUI(baseVariants(), className)}
        {...props}
      >
        {leftIcon && <span className={iconVariants()}>{leftIcon}</span>}
        {children ?? <span className={textVariants()}>{text}</span>}
        {rightIcon && <span className={iconVariants()}>{rightIcon}</span>}
      </PrimitiveButton>
    </span>
  );
}
