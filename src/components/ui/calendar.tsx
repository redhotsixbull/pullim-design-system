"use client";

import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button, buttonVariants } from "./button";

import { cn } from "../../lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      data-name="calendar-root"
      formatters={{
        formatYearDropdown: (date) => `${date.getFullYear()}년`,
        formatMonthDropdown: (date) => date.toLocaleString("ko-KR", { month: "long" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "h-(--cell-size) px-(--cell-size) flex w-full items-center justify-center",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "h-(--cell-size) flex w-full flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring shadow-xs has-focus:ring-pullim-500 has-focus:ring-[3px] bg-background relative rounded-md border border-gray-300",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 text-sm opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              data-name="calendar-root-container"
              ref={rootRef}
              className={cn(className)}
              {...rootProps}
            />
          );
        },
        Chevron: ({ className, orientation, ...chevronProps }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-4", className)}
                data-name="calendar-chevron-left"
                {...chevronProps}
              />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                data-name="calendar-chevron-right"
                {...chevronProps}
              />
            );
          }

          return (
            <ChevronDownIcon
              className={cn("size-4", className)}
              data-name="calendar-chevron-down"
              {...chevronProps}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekProps }) => {
          return (
            <td {...weekProps}>
              <div className="size-(--cell-size) flex items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const dayLayoutClasses =
    "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal";

  const daySelectionStateClasses = [
    "data-[selected-single=true]:bg-primary",
    "data-[selected-single=true]:text-primary-foreground",
    "data-[range-middle=true]:bg-pullim-100/80",
    "data-[range-middle=true]:text-accent-foreground",
    "data-[range-start=true]:bg-pullim-500",
    "data-[range-start=true]:text-gray-50",
    "data-[range-end=true]:bg-pullim-500",
    "data-[range-end=true]:text-gray-50",
  ].join(" ");

  const dayFocusStateClasses = [
    "focus:!border-pullim-500",
    "focus:!ring-pullim-500",
    "focus:!ring-2",
    "focus:!ring-offset-0",
    "focus:relative",
    "focus:z-10",
  ].join(" ");

  const dayRoundingClasses = [
    "data-[range-end=true]:!rounded-r-md data-[range-end=true]:!rounded-l-none",
    "data-[range-middle=true]:!rounded-none",
    "data-[range-start=true]:!rounded-l-md data-[range-start=true]:!rounded-r-none",
  ].join(" ");

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-name="calendar-day-button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        dayLayoutClasses,
        daySelectionStateClasses,
        dayFocusStateClasses,
        dayRoundingClasses,
        "dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
        modifiers.outside && "text-muted-foreground opacity-50",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
