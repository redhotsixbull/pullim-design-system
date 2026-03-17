# @pullim/design-system — 설정 및 사용 가이드

## 목차

1. [설치](#1-설치)
2. [CSS 토큰 설정](#2-css-토큰-설정)
3. [Next.js 설정](#3-nextjs-설정)
4. [컴포넌트 사용법](#4-컴포넌트-사용법)
5. [토큰 레퍼런스](#5-토큰-레퍼런스)
6. [다크모드](#6-다크모드)
7. [로컬 개발 환경](#7-로컬-개발-환경)
8. [자주 겪는 문제](#8-자주-겪는-문제)

---

## 1. 설치

```bash
# GitHub URL로 직접 설치 (npm publish 없이 사용 가능)
npm install github:redhotsixbull/pullim-design-system

# 특정 커밋/태그 고정
npm install github:redhotsixbull/pullim-design-system#v0.1.0

# npm 레지스트리 (publish 후)
npm install @pullim/design-system

# 로컬 경로 (개발 중)
npm install file:../pullim-design-system
```

peer dependencies 필수 설치:

```bash
npm install react react-dom tailwindcss react-hook-form
```

> **GitHub URL 설치 시 빌드 주의**: `dist/`가 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.
> 설치 후 자동으로 `npm run build`가 실행되도록 `package.json`에 `prepare` 스크립트가 추가되어 있습니다.

---

## 2. CSS 토큰 설정

### globals.css 전체 설정 예시

```css
@import "tailwindcss";
@import "tw-animate-css"; /* 애니메이션 optional */

@custom-variant dark (&:is(.dark *));

/* ──────────────────────────────────────────────────
 * @theme inline 핵심 패턴
 *
 * Semantic 토큰은 var(--X) 매핑만 선언합니다.
 * 실제 색상 값은 반드시 :root / .dark 에서 별도 변수(--X)로 정의해야 합니다.
 *
 * ❌ 틀린 방법 — initial은 CSS 무효값이므로 bg-card 등이 동작 안 함
 *    @theme inline { --color-card: initial; }
 *    :root { --color-card: #fff; }        ← 같은 변수명 사용 금지
 *
 * ✅ 올바른 방법
 *    @theme inline { --color-card: var(--card); }
 *    :root { --card: #fff; }              ← 다른 변수명으로 실제 값 지정
 * ────────────────────────────────────────────────── */
@theme inline {
  /* Semantic — Tailwind 유틸리티 클래스 생성 */
  --color-background:          var(--background);
  --color-foreground:          var(--foreground);
  --color-card:                var(--card);
  --color-card-foreground:     var(--card-foreground);
  --color-popover:             var(--popover);
  --color-popover-foreground:  var(--popover-foreground);
  --color-primary:             var(--primary);
  --color-primary-foreground:  var(--primary-foreground);
  --color-secondary:           var(--secondary);
  --color-secondary-foreground:var(--secondary-foreground);
  --color-muted:               var(--muted);
  --color-muted-foreground:    var(--muted-foreground);
  --color-accent:              var(--accent);
  --color-accent-foreground:   var(--accent-foreground);
  --color-destructive:         var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border:              var(--border);
  --color-input:               var(--input);
  --color-ring:                var(--ring);

  /* Brand Blue */
  --color-pullim-50:   #f4faff;
  --color-pullim-100:  #d1e8ff;
  --color-pullim-200:  #9fc8ff;
  --color-pullim-300:  #5aa9ff;
  --color-pullim-400:  #1f89f5;
  --color-pullim-500:  #0362da; /* base */
  --color-pullim-600:  #004bb9;
  --color-pullim-700:  #00389e;
  --color-pullim-800:  #002878;
  --color-pullim-900:  #001b52;

  /* Gray */
  --color-gray-50:  #fdfdfd;
  --color-gray-100: #f7f7f7;
  --color-gray-200: #ededed;
  --color-gray-300: #e4e3e8;
  --color-gray-400: #cfcdd2;
  --color-gray-500: #a4a3a8;
  --color-gray-600: #7c7a7f;
  --color-gray-700: #656369;
  --color-gray-800: #47454a;
  --color-gray-900: #262528;

  /* Status */
  --color-red:              #ea2d2d;
  --color-red-200:          #ffd6d6;
  --color-green-surface:    #ebf6da;
  --color-green-text:       #4a7a1e;
  --color-warning:          #f28500;
  --color-warning-surface:  #fce3c5;

  /* Base */
  --color-black: #000000;
  --color-white: #ffffff;

  /* Radius */
  --radius:     0.625rem;
  --radius-xs:  0.125rem;
  --radius-sm:  0.25rem;
  --radius-md:  0.375rem;
  --radius-lg:  0.5rem;
  --radius-xl:  0.75rem;
  --radius-2xl: 1rem;

  /* Font */
  --font-sans: "Pretendard", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;
}

/* Light Mode */
:root {
  --background:          #fdfdfd;
  --foreground:          #262528;
  --card:                #ffffff;
  --card-foreground:     #262528;
  --popover:             #ffffff;
  --popover-foreground:  #262528;
  --primary:             #0362da;
  --primary-foreground:  #fdfdfd;
  --secondary:           #f7f7f7;
  --secondary-foreground:#656369;
  --muted:               #f7f7f7;
  --muted-foreground:    #7c7a7f;
  --accent:              #fdfdfd;
  --accent-foreground:   #656369;
  --destructive:         #ea2d2d;
  --destructive-foreground: #fdfdfd;
  --border:              #e4e3e8;
  --input:               #f7f7f7;
  --ring:                #0362da;
}

/* Dark Mode */
.dark {
  --background:          #262528;
  --foreground:          #fdfdfd;
  --card:                #47454a;
  --card-foreground:     #fdfdfd;
  --popover:             #47454a;
  --popover-foreground:  #fdfdfd;
  --primary:             #1f89f5;
  --primary-foreground:  #fdfdfd;
  --secondary:           #47454a;
  --secondary-foreground:#fdfdfd;
  --muted:               #47454a;
  --muted-foreground:    #cfcdd2;
  --accent:              #47454a;
  --accent-foreground:   #fdfdfd;
  --destructive:         #ea2d2d;
  --destructive-foreground: #fdfdfd;
  --border:              rgba(255, 255, 255, 0.1);
  --input:               rgba(255, 255, 255, 0.15);
  --ring:                #0362da;
}

@layer base {
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
}
```

---

## 3. Next.js 설정

### postcss.config.mjs

```js
const config = {
  plugins: { "@tailwindcss/postcss": {} },
};
export default config;
```

### next.config.ts (필수)

로컬 패키지 또는 node_modules symlink 사용 시 `react-hook-form` 중복 인스턴스 문제를 방지해야 합니다.

```ts
import type { NextConfig } from "next";
import path from "path";

export default {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // react-hook-form이 두 개의 인스턴스로 로드되는 것을 방지
      "react-hook-form": path.resolve("./node_modules/react-hook-form"),
    };
    return config;
  },
} satisfies NextConfig;
```

### package.json dev 스크립트

```json
{
  "scripts": {
    "dev": "next dev --webpack"
  }
}
```

> **⚠️ 주의**: Next.js 16에서 Turbopack이 기본 번들러입니다.  
> `--webpack` 플래그 없이 실행하면 `next.config.ts`의 `webpack()` 설정이 무시되어
> `react-hook-form` 충돌이 발생합니다. 반드시 `--webpack` 플래그를 사용하세요.

### @source 경로 설정 (로컬 패키지 사용 시)

npm에서 설치한 경우 Tailwind가 자동으로 스캔하지만, 로컬 경로로 설치한 경우 `globals.css`에 스캔 경로를 명시해야 합니다.

```css
/* globals.css 상단에 추가 */
@source "../node_modules/@pullim/design-system/dist/index.js";

/* 또는 로컬 경로 직접 사용 시 */
@source "../../pullim-design-system/src/components/**/*.tsx";
@source "../../pullim-design-system/dist/index.js";
```

---

## 4. 컴포넌트 사용법

### Typography

```tsx
import { Heading, Text, Lead, Muted, Code, Blockquote } from "@pullim/design-system";

// Heading: as로 시맨틱 태그, size로 시각적 크기를 분리
<Heading as="h1" size="4xl">페이지 제목</Heading>
<Heading as="h2" size="2xl">섹션 제목</Heading>
<Heading as="h3" size="xl">소제목</Heading>

// Text: 본문 텍스트
<Text>기본 본문</Text>
<Text size="sm" muted>보조 설명</Text>
<Text size="lg" weight="semibold">강조 텍스트</Text>

// 기타
<Lead>섹션 소개 문구입니다.</Lead>
<Muted>힌트나 부가 설명</Muted>
<Code>const x = 1</Code>
<Blockquote>인용문 내용</Blockquote>
```

### Button

```tsx
import { Button } from "@pullim/design-system";

// Variants
<Button variant="default">기본 (파란색)</Button>
<Button variant="secondary">보조</Button>
<Button variant="outline">외곽선</Button>
<Button variant="ghost">고스트</Button>
<Button variant="link">링크</Button>
<Button variant="destructive">삭제/위험</Button>

// Sizes
<Button size="lg">크게</Button>
<Button size="default">기본 (h-9)</Button>
<Button size="sm">작게</Button>
<Button size="icon" aria-label="설정"><SettingsIcon /></Button>

// 상태
<Button loading>저장 중...</Button>
<Button disabled>비활성</Button>

// asChild — 내부 요소를 버튼처럼 스타일링
<Button asChild>
  <a href="/somewhere">링크 버튼</a>
</Button>
```

### Input / Textarea / Select

```tsx
import { Input, Textarea, Select, SelectTrigger, SelectValue,
         SelectContent, SelectItem, Label } from "@pullim/design-system";

// Input
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email">이메일</Label>
  <Input id="email" type="email" placeholder="example@email.com" />
</div>

// 에러 상태
<Input aria-invalid placeholder="잘못된 값" />

// Textarea
<Textarea placeholder="내용을 입력하세요..." />

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="korean">국어</SelectItem>
    <SelectItem value="english">영어</SelectItem>
    <SelectItem value="math">수학</SelectItem>
  </SelectContent>
</Select>
```

### Checkbox / Switch / RadioGroup

```tsx
import { Checkbox, Switch, RadioGroup, RadioGroupItem, Label }
  from "@pullim/design-system";

// Checkbox
<div className="flex items-center gap-2">
  <Checkbox id="agree" />
  <Label htmlFor="agree">동의합니다</Label>
</div>

// Switch
<div className="flex items-center gap-2">
  <Switch id="notify" />
  <Label htmlFor="notify">알림 받기</Label>
</div>

// RadioGroup
<RadioGroup defaultValue="english">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="korean" id="r-korean" />
    <Label htmlFor="r-korean">국어</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="english" id="r-english" />
    <Label htmlFor="r-english">영어</Label>
  </div>
</RadioGroup>
```

### Form (react-hook-form 연동)

```tsx
import { useForm } from "react-hook-form";
import {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormMessage, Input, Button
} from "@pullim/design-system";

type FormValues = { email: string; password: string };

function LoginForm() {
  const form = useForm<FormValues>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "이메일을 입력하세요" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">로그인</Button>
      </form>
    </Form>
  );
}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription,
         CardContent, CardFooter, CardAction } from "@pullim/design-system";

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
    <CardAction>
      {/* 우측 상단 액션 영역 */}
      <Badge variant="blue">New</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    본문 내용
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="outline" size="sm">취소</Button>
    <Button size="sm">확인</Button>
  </CardFooter>
</Card>
```

### Accordion / Tabs

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent,
         Tabs, TabsList, TabsTrigger, TabsContent } from "@pullim/design-system";

// Accordion
<Accordion type="single" collapsible>
  <AccordionItem value="faq-1">
    <AccordionTrigger>자주 묻는 질문 1</AccordionTrigger>
    <AccordionContent>답변 내용입니다.</AccordionContent>
  </AccordionItem>
</Accordion>

// Tabs — Solid (기본)
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">개요</TabsTrigger>
    <TabsTrigger value="tab2">사용법</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">개요 내용</TabsContent>
  <TabsContent value="tab2">사용법 내용</TabsContent>
</Tabs>

// Tabs — Line (하단 인디케이터, pullim-500 강조선)
<Tabs defaultValue="all">
  <TabsList variant="line">
    <TabsTrigger value="all" variant="line">전체</TabsTrigger>
    <TabsTrigger value="korean" variant="line">국어</TabsTrigger>
  </TabsList>
  <TabsContent value="all">전체 내용</TabsContent>
</Tabs>
```

### Dialog / AlertDialog / Sheet

```tsx
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription, DialogFooter,
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
  Button
} from "@pullim/design-system";

// Dialog
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    <p>내용</p>
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button>저장</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// AlertDialog — 확인이 필요한 위험 액션
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">삭제</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
      <AlertDialogDescription>이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>취소</AlertDialogCancel>
      <AlertDialogAction>삭제</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

// Sheet — 슬라이드 패널 (side: "left" | "right" | "top" | "bottom")
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">사이드 패널</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>패널 제목</SheetTitle>
    </SheetHeader>
    <p>패널 내용</p>
  </SheetContent>
</Sheet>
```

### Popover / Tooltip / DropdownMenu

```tsx
import {
  Popover, PopoverTrigger, PopoverContent,
  Tooltip, TooltipTrigger, TooltipContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  Button
} from "@pullim/design-system";

// Popover
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">설정</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm">팝오버 내용</p>
  </PopoverContent>
</Popover>

// Tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon" aria-label="정보">
      <InfoIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>도움말 텍스트</TooltipContent>
</Tooltip>

// DropdownMenu
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">메뉴</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>프로필</DropdownMenuItem>
    <DropdownMenuItem>설정</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Badge / Avatar / Progress / Skeleton / Toast

```tsx
import { Badge, Avatar, AvatarImage, AvatarFallback,
         Progress, Skeleton, Toaster } from "@pullim/design-system";
import { toast } from "sonner";

// Badge variants
<Badge variant="default">기본</Badge>
<Badge variant="blue">영어</Badge>
<Badge variant="orange">국어</Badge>   // warning-surface + warning
<Badge variant="green">수학</Badge>    // green-surface + green-text
<Badge variant="red">오류</Badge>      // red-200 + red
<Badge variant="gray">임시저장</Badge>
<Badge variant="darkGray">비공개</Badge>
<Badge variant="destructive">위험</Badge>
<Badge variant="outline">외곽선</Badge>

// Avatar
<Avatar>
  <AvatarImage src="/profile.jpg" alt="프로필" />
  <AvatarFallback>김</AvatarFallback>
</Avatar>

// Progress
<Progress value={60} />  // 0~100

// Skeleton
<Skeleton className="h-4 w-full" />
<Skeleton className="h-10 w-10 rounded-full" />

// Toast — 앱 루트에 Toaster 한 번만 선언
// app/layout.tsx:
<Toaster position="top-right" richColors />

// 호출 (어디서든 가능):
import { toast } from "sonner";
toast("알림 메시지");
toast.success("저장되었습니다");
toast.error("오류가 발생했습니다");
toast.warning("주의가 필요합니다");
```

---

## 5. 토큰 레퍼런스

### Semantic 토큰 — 항상 이것을 먼저 사용하세요

컴포넌트 작성 시 `bg-gray-*`, `text-gray-*` 대신 아래 Semantic 토큰을 사용해야 다크모드가 자동으로 반전됩니다.

| 토큰 | 라이트 | 다크 | 용도 |
|---|---|---|---|
| `bg-background` | `#fdfdfd` | `#262528` | 페이지 배경 |
| `bg-card` | `#ffffff` | `#47454a` | 카드, 모달, 패널 배경 |
| `bg-muted` | `#f7f7f7` | `#47454a` | 비활성, 섹션 구분 배경 |
| `text-foreground` | `#262528` | `#fdfdfd` | 기본 텍스트 |
| `text-muted-foreground` | `#7c7a7f` | `#cfcdd2` | 보조 텍스트 |
| `border-border` | `#e4e3e8` | `rgba(255,255,255,0.1)` | 기본 테두리 |
| `bg-primary` | `#0362da` | `#1f89f5` | 주요 액션 배경 |
| `text-primary` | `#0362da` | `#1f89f5` | 링크, 강조 텍스트 |
| `bg-destructive` | `#ea2d2d` | `#ea2d2d` | 에러, 삭제 배경 |
| `ring-ring` | `#0362da` | `#0362da` | 포커스 링 |

### Brand Blue

```
pullim-50   #f4faff  연한 파란 배경
pullim-100  #d1e8ff  파란 배지 배경
pullim-400  #1f89f5  다크모드 primary
pullim-500  #0362da  ★ 기본 primary (버튼, 링크, 포커스)
pullim-600  #004bb9  hover 상태
```

### Status 색상

```
red           #ea2d2d   에러
red-200       #ffd6d6   에러 배지 배경
green-surface #ebf6da   성공 배지 배경
green-text    #4a7a1e   성공 배지 텍스트
warning       #f28500   경고
warning-surface #fce3c5 경고 배지 배경
```

### 과목별 배지 색상 (CSS 변수 직접 사용)

```css
/* 국어 */
--color-subject-korean-badge-bg:   rgba(239, 134, 63, 0.08)
--color-subject-korean-badge-text: #a75f2c

/* 영어 */
--color-subject-english-badge-bg:  rgba(3, 98, 218, 0.08)
--color-subject-english-badge-text:#024eae

/* 수학 */
--color-subject-math-badge-bg:     rgba(115, 153, 30, 0.1)
--color-subject-math-badge-text:   #5c6619

/* 사회 */
--color-subject-social-badge-bg:   rgba(251, 195, 180, 0.1)
--color-subject-social-badge-text: #957568

/* 과학 */
--color-subject-science-badge-bg:  rgba(111, 193, 186, 0.1)
--color-subject-science-badge-text:#4e8782
```

사용 예:
```tsx
<span style={{
  backgroundColor: "var(--color-subject-korean-badge-bg)",
  color: "var(--color-subject-korean-badge-text)"
}}>
  국어
</span>
```

---

## 6. 다크모드

### 방법 1: HTML 클래스 직접 제어

```ts
// 다크모드 켜기
document.documentElement.classList.add("dark");

// 라이트모드로 전환
document.documentElement.classList.remove("dark");
```

### 방법 2: ThemeProvider 패턴 (권장)

```tsx
// components/theme-provider.tsx
"use client";

import * as React from "react";

type Theme = "light" | "dark";
const ThemeContext = React.createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: "light", toggleTheme: () => {} });

export function useTheme() {
  return React.useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

> **⚠️ FOUC 주의**: `useEffect`에서 `localStorage`를 읽기 때문에, 서버 렌더링 시에는 항상 `light`로 시작합니다. 다크모드를 저장한 후 새로고침하면 순간적으로 라이트→다크로 전환되는 깜빡임이 발생합니다. 이를 방지하려면 `<head>`의 인라인 스크립트로 초기 클래스를 설정해야 합니다.

---

## 7. 로컬 개발 환경

### 패키지 구조

```
pullim-design-system/       ← 디자인시스템 패키지
├── src/
│   ├── index.ts            ← 전체 export 진입점
│   ├── styles/globals.css  ← CSS 토큰 (소비 앱에서 @import)
│   ├── lib/utils.ts        ← cn() 유틸
│   └── components/
│       ├── ui/             ← 24개 UI 컴포넌트
│       └── typography/     ← 타이포그라피 컴포넌트
├── dist/                   ← tsup 빌드 결과 (gitignore)
├── scripts/
│   └── add-use-client.mjs  ← 빌드 후 "use client" 주입
├── tsup.config.ts
└── SETUP.md                ← 이 문서

pullim-design-system-preview/   ← 프리뷰 앱
```

### 빌드

```bash
cd pullim-design-system
npm run build
# = tsup + node scripts/add-use-client.mjs
# 결과: dist/index.js (ESM), dist/index.cjs (CJS), dist/index.d.ts
```

### 로컬 연결

```json
// 소비 앱 package.json
{
  "dependencies": {
    "@pullim/design-system": "file:../pullim-design-system"
  }
}
```

```bash
npm install   # 심볼릭 링크 자동 생성
```

디자인시스템 코드 수정 후:
```bash
cd pullim-design-system && npm run build
# 소비 앱은 자동으로 최신 빌드 반영 (심볼릭 링크)
```

---

## 8. 자주 겪는 문제

### bg-card, bg-background 등 색상이 적용 안 될 때

`@theme inline`에서 `initial` 값 사용이 원인입니다.

```css
/* ❌ initial은 CSS 커스텀 프로퍼티에서 무효값 */
@theme inline { --color-card: initial; }

/* ✅ var(--card)로 간접 참조, :root에서 실제 값 정의 */
@theme inline { --color-card: var(--card); }
:root { --card: #ffffff; }
```

### FormProvider import 에러

```
Attempted import error: 'FormProvider' is not exported from 'react-hook-form'
```

**원인**: 디자인시스템과 소비 앱이 각각 다른 `react-hook-form` 인스턴스를 참조  
**해결**: `next.config.ts`에 `resolve.alias` 추가 (3번 섹션 참조)

### Dialog/Sheet 배경이 투명하게 나올 때

Overlay 컴포넌트에 `style={{ backgroundColor: "rgba(0,0,0,0.5)" }}`가 인라인으로 적용되어 있습니다. 만약 Tailwind 스캔 경로가 누락되어 클래스가 없어도 인라인 스타일로 항상 동작합니다.

증상이 있다면 `globals.css`에 `@source` 경로가 올바른지 확인하세요.

### Turbopack 에러 (`leaves the filesystem root`)

```
FileSystemPath("").join("../pullim-design-system/...") leaves the filesystem root
```

**원인**: Turbopack이 프로젝트 루트 밖의 파일을 `@import`할 수 없음  
**해결**: `next dev --webpack` 사용, 또는 npm publish 후 정식 설치

### 다크모드 깜빡임 (FOUC)

새로고침 시 라이트 → 다크로 전환되는 깜빡임이 보입니다.  
**원인**: SSR에서는 `localStorage` 접근 불가, 항상 light로 렌더링됨  
**해결**: `<head>`에 인라인 스크립트로 초기 클래스 설정:

```tsx
// app/layout.tsx의 <head>에 추가
<script dangerouslySetInnerHTML={{
  __html: `
    const t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  `
}} />
```
