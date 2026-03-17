# @pullim/design-system

shadcn/ui 기반의 Pullim 디자인시스템입니다. Tailwind v4 토큰 시스템, 조립형 타이포그라피, 커레이션된 컴포넌트 셋을 제공합니다.

---

## 설치

```bash
# npm (npm publish 후)
npm install @pullim/design-system

# GitHub URL로 직접 설치 (publish 없이)
npm install github:redhotsixbull/pullim-design-system

# 특정 버전/태그
npm install github:redhotsixbull/pullim-design-system#v0.1.0

# 로컬 경로 (개발 중)
npm install file:../pullim-design-system
```

```bash
yarn add @pullim/design-system
```

```bash
pnpm add @pullim/design-system
```

---

## 요구사항 (Peer Dependencies)

```
react >= 18
react-dom >= 18
tailwindcss >= 4
```

Tailwind v4와 PostCSS가 설정된 Next.js / Vite 프로젝트에서 사용합니다.

---

## 설정

### 1. CSS 토큰 import

앱의 전역 CSS 파일 최상단에 추가합니다.

```css
/* globals.css */
@import "tailwindcss";
@import "@pullim/design-system/styles/globals.css";
```

> Pretendard 폰트는 별도로 로드해야 합니다.
> Next.js 프로젝트라면 `next/font`를 사용하거나, CDN에서 직접 불러오세요.

```html
<!-- 또는 CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" />
```

### 2. 컴포넌트 사용

```tsx
import { Button, Input, Heading, Text } from "@pullim/design-system";

export function Example() {
  return (
    <div>
      <Heading as="h1" size="3xl">안녕하세요</Heading>
      <Text muted>디자인시스템 예시입니다.</Text>
      <Input placeholder="입력하세요" />
      <Button>확인</Button>
    </div>
  );
}
```

---

## 컴포넌트 목록

### 타이포그라피

| 컴포넌트 | 설명 | 예시 |
|---|---|---|
| `Heading` | h1~h6, size prop 분리 | `<Heading as="h1" size="4xl">` |
| `Text` | 본문 텍스트 | `<Text size="sm" muted>` |
| `Lead` | 섹션 소개 문구 | `<Lead>요약 문구</Lead>` |
| `Muted` | 보조 설명 | `<Muted>힌트 텍스트</Muted>` |
| `Code` | 인라인 코드 | `` <Code>const x = 1</Code> `` |
| `Blockquote` | 인용문 | `<Blockquote>인용</Blockquote>` |

```tsx
// Heading: as로 시맨틱 태그, size로 시각적 크기 분리
<Heading as="h2" size="xl">섹션 제목</Heading>

// Text: weight, muted 조합
<Text size="sm" weight="medium" muted>보조 텍스트</Text>
```

### 입력 컴포넌트

`Button` `Input` `Textarea` `Select` `Checkbox` `Switch` `RadioGroup` `Label`

```tsx
import { Button } from "@pullim/design-system";

<Button variant="default">기본</Button>
<Button variant="outline">외곽선</Button>
<Button variant="destructive">삭제</Button>
<Button variant="ghost">고스트</Button>
<Button variant="secondary">보조</Button>
<Button variant="link">링크</Button>
<Button loading>로딩 중</Button>
<Button size="sm">작은 버튼</Button>
<Button size="icon"><PlusIcon /></Button>
```

### 레이아웃

`Card` `CardHeader` `CardTitle` `CardDescription` `CardContent` `CardFooter` `CardAction`
`Separator` `Accordion` `Tabs`

### 오버레이

`Dialog` `AlertDialog` `Sheet` `Popover` `Tooltip` `DropdownMenu`

### 피드백

`Badge` `Skeleton` `Avatar` `Progress` `Toaster`

### 폼 (react-hook-form 연동)

`Form` `FormField` `FormItem` `FormLabel` `FormControl` `FormMessage` `FormDescription`

---

## 토큰 시스템

상세 내용은 [`src/tokens/README.md`](./src/tokens/README.md)를 참고하세요.

### 주요 컬러 토큰

```css
/* Brand Blue */
--color-pullim-500: #0362da;   /* 기본 primary */
--color-pullim-400: #1f89f5;   /* 다크모드 primary */

/* Gray */
--color-gray-900: #262528;     /* 기본 텍스트 */
--color-gray-600: #7c7a7f;     /* muted 텍스트 */
--color-gray-300: #e4e3e8;     /* 기본 border */

/* Status */
--color-red: #ea2d2d;
--color-green: #4ad676;
--color-warning: #f28500;
```

### 과목별 색상

```css
/* 사용법: var(--color-subject-{subject}-{role}) */
var(--color-subject-korean-main)     /* 국어 orange */
var(--color-subject-english-main)    /* 영어 blue */
var(--color-subject-math-main)       /* 수학 lemon */
var(--color-subject-social-main)     /* 사회 apricot */
var(--color-subject-science-main)    /* 과학 mint */
```

---

## 소스 직접 편집

컴포넌트를 직접 수정해야 하는 경우:

```bash
git clone https://github.com/your-org/pullim-design-system.git
cd pullim-design-system
npm install
npm run build

# 로컬 프로젝트에 링크
npm link
cd ../my-project && npm link @pullim/design-system
```

또는 `package.json`에서 로컬 경로로 참조:

```json
{
  "dependencies": {
    "@pullim/design-system": "file:../pullim-design-system"
  }
}
```

---

## 개발

```bash
npm run dev      # watch 모드 빌드
npm run build    # 프로덕션 빌드
npm run typecheck
```

---

## 라이선스

MIT
