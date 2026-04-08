"use client";

// ── Utils ──────────────────────────────────────────────────────────
export { cn } from "./lib/utils";

// ── Typography ─────────────────────────────────────────────────────
export {
  Heading,
  Text,
  Lead,
  Muted,
  Code,
  Blockquote,
  headingVariants,
  textVariants,
} from "./components/typography";
export type { HeadingProps, TextProps } from "./components/typography";

// ── Inputs ─────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";
export { Calendar, CalendarDayButton } from "./components/ui/calendar";
export { Input } from "./components/ui/input";
export { Textarea } from "./components/ui/textarea";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
export { Checkbox } from "./components/ui/checkbox";
export { Switch } from "./components/ui/switch";
export { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
export { Label } from "./components/ui/label";

// ── Layout ─────────────────────────────────────────────────────────
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
export { Separator } from "./components/ui/separator";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";

// ── Overlays ───────────────────────────────────────────────────────
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";
export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

// ── Navigation ────────────────────────────────────────────────────
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

// ── Feedback ───────────────────────────────────────────────────────
export { Badge, badgeVariants } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";
export { Skeleton } from "./components/ui/skeleton";
export { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
export { Progress } from "./components/ui/progress";
export { Toaster } from "./components/ui/sonner";
export { toast } from "sonner";

// ── Form ───────────────────────────────────────────────────────────
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./components/ui/form";

// ── Motion (Motion / Framer 계열) ──────────────────────────────────
export { AnimatePresence, motion, useReducedMotion } from "motion/react";
export type { Transition, Variants } from "motion/react";
export {
  fadeIn,
  fadeSlideUp,
  fadeSlideX,
  pulse,
  pullimMotionPresets,
  scaleIn,
  staggerContainer,
  staggerItem,
  PullimFadeIn,
  PullimFadeSlideUp,
  PullimFadeSlideX,
  PullimPulse,
  PullimScaleIn,
  PullimStaggerItem,
  PullimStaggerRoot,
} from "./components/motion";
export type {
  PullimFadeInProps,
  PullimFadeSlideUpOptions,
  PullimFadeSlideUpProps,
  PullimFadeSlideXOptions,
  PullimFadeSlideXProps,
  PullimMotionBaseOptions,
  PullimMotionOpacityOptions,
  PullimMotionTimingOptions,
  PullimPulseOptions,
  PullimPulseProps,
  PullimScaleInOptions,
  PullimScaleInProps,
  PullimStaggerContainerOptions,
  PullimStaggerItemProps,
  PullimStaggerRootProps,
  PullimWhen,
} from "./components/motion";
