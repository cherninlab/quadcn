import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { Simplify } from "type-fest";

// Create polymorphic component types with type-fest
export type AsProp<C extends ElementType> = {
  as?: C;
};

export type PolymorphicProps<C extends ElementType, Props = {}> = Simplify<
  AsProp<C> &
    Omit<ComponentPropsWithoutRef<C>, keyof AsProp<C> | keyof Props> &
    Props
>;

export type PolymorphicComponent<
  DefaultElement extends ElementType,
  Props = {},
> = <C extends ElementType = DefaultElement>(
  props: PolymorphicProps<C, Props>
) => ReactNode;

// Responsive style props
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Space tokens from our system
export type SpaceToken =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12
  | 16
  | 20
  | 24
  | 32;

// Border tokens
export type BorderWidth = "none" | "hairline" | "thin" | "thick";
export type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
