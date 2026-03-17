# 토큰 시스템 가이드

`@pullim/design-system`의 CSS 토큰 구조와 사용법을 설명합니다.

---

## 토큰 레이어 구조

```
Primitive  →  Semantic  →  Tailwind 유틸리티
─────────────────────────────────────────────
#0362da    →  --color-primary  →  bg-primary / text-primary
```

- **Primitive**: 고정된 원색. `@theme inline` 블록에 정의.
- **Semantic**: `:root` / `.dark`에서 모드별 값 지정. 컴포넌트는 이 토큰을 사용.
- **Tailwind 유틸리티**: `@theme inline`에 선언된 것만 Tailwind 클래스로 노출.

---

## 컬러 토큰

### Brand Blue (Pullim)

| 토큰 | 값 | 용도 |
|---|---|---|
| `pullim-50` | `#f4faff` | 배경 하이라이트 |
| `pullim-100` | `#d1e8ff` | 연한 강조 배경 |
| `pullim-200` | `#9fc8ff` | |
| `pullim-300` | `#5aa9ff` | |
| `pullim-400` | `#1f89f5` | 다크모드 primary |
| `pullim-500` | `#0362da` | **base — 라이트 primary** |
| `pullim-600` | `#004bb9` | hover 상태 |
| `pullim-700` | `#00389e` | |
| `pullim-800` | `#002878` | |
| `pullim-900` | `#001b52` | |
| `pullim-1000` | `#0d1a1f` | brand-black |

```html
<!-- 사용 예 -->
<div class="bg-pullim-100 text-pullim-700">...</div>
<button class="bg-pullim-500 hover:bg-pullim-600">...</button>
```

---

### Neutral (Gray)

| 토큰 | 값 | 용도 |
|---|---|---|
| `gray-50` | `#fdfdfd` | 거의 흰색 배경 |
| `gray-100` | `#f7f7f7` | secondary 배경 |
| `gray-200` | `#ededed` | 구분선, 비활성 |
| `gray-300` | `#e4e3e8` | 기본 border |
| `gray-400` | `#cfcdd2` | 비활성 텍스트 |
| `gray-500` | `#a4a3a8` | placeholder |
| `gray-600` | `#7c7a7f` | muted 텍스트 |
| `gray-700` | `#656369` | secondary 텍스트 |
| `gray-800` | `#47454a` | |
| `gray-900` | `#262528` | 기본 본문 텍스트 |

---

### Status

| 토큰 | 값 | 용도 |
|---|---|---|
| `red` | `#ea2d2d` | 에러, destructive |
| `red-50` | `#fef2f2` | 에러 배경 |
| `red-100` | `#fee2e2` | 에러 연한 배경 |
| `green` | `#4ad676` | 성공 |
| `warning` | `#f28500` | 경고 |
| `warning-surface` | `#fce3c5` | 경고 배경 |

---

### 과목별 색상 (Subject)

과목 테마는 `subject-{subject}-{role}` 패턴으로 구성됩니다.

| Subject | 원색 | 과목 |
|---|---|---|
| `all` | `#0d1a1f` (black) | 전체 |
| `korean` | `#ef863f` (orange) | 국어 |
| `english` | `#0362da` (blue) | 영어 |
| `math` | `#e6ff4c` (lemon) | 수학 |
| `social` | `#fbc3b4` (apricot) | 사회 |
| `science` | `#6fc1ba` (mint) | 과학 |

```html
<!-- 예: 국어 배지 -->
<span class="bg-[var(--color-subject-korean-badge-bg)] text-[var(--color-subject-korean-badge-text)]">
  국어
</span>

<!-- 예: 수학 인버티드 버튼 배경 -->
<div class="bg-[var(--color-subject-math-inverted-bg)] text-[var(--color-subject-math-inverted-text)]">
  수학
</div>
```

**role 종류:**

| role | 설명 |
|---|---|
| `main` | 원색 |
| `bg` | 연한 배경 (10~15% 투명도) |
| `text` | 텍스트용 (WCAG AA 대비 확보) |
| `hover` | hover 배경 |
| `badge-bg` | 배지 배경 |
| `badge-text` | 배지 텍스트 |
| `inverted-bg` | 인버티드 배경 (원색 배경) |
| `inverted-text` | 인버티드 텍스트 (흰색) |

---

### Semantic 토큰

컴포넌트에서는 항상 Semantic 토큰을 사용하세요. 라이트/다크 모드가 자동으로 전환됩니다.

| 토큰 | 라이트 | 다크 |
|---|---|---|
| `background` | gray-50 | gray-900 |
| `foreground` | gray-900 | gray-50 |
| `card` | #ffffff | gray-800 |
| `primary` | pullim-500 | pullim-400 |
| `secondary` | gray-100 | gray-800 |
| `muted` | gray-100 | gray-800 |
| `muted-foreground` | gray-600 | gray-400 |
| `border` | gray-300 | white/10% |
| `ring` | pullim-500 | pullim-500 |
| `destructive` | red | red |

```html
<!-- Semantic 토큰 사용 (권장) -->
<div class="bg-background text-foreground border border-border">...</div>

<!-- Primitive 직접 참조 (Semantic이 없을 때만) -->
<div class="bg-gray-50">...</div>
```

---

## Radius 토큰

| 토큰 | 값 | Tailwind 클래스 |
|---|---|---|
| `radius-xs` | 2px | `rounded-xs` |
| `radius-sm` | 4px | `rounded-sm` |
| `radius-md` | 6px | `rounded-md` |
| `radius-lg` | 8px | `rounded-lg` |
| `radius-xl` | 12px | `rounded-xl` |
| `radius-2xl` | 16px | `rounded-2xl` |
| `radius-3xl` | 24px | `rounded-3xl` |

---

## 타이포그라피 스케일

| 스케일 | 클래스 | 크기 |
|---|---|---|
| xs | `text-xs` | 12px |
| sm | `text-sm` | 14px |
| base | `text-base` | 16px |
| lg | `text-lg` | 18px |
| xl | `text-xl` | 20px |
| 2xl | `text-2xl` | 24px |
| 3xl | `text-3xl` | 30px |
| 4xl | `text-4xl` | 36px |

폰트: **Pretendard** (한국어 최적화) / 모노: **Geist Mono**

---

## 다크모드

`.dark` 클래스를 `html` 또는 상위 요소에 붙이면 다크 토큰이 활성화됩니다.

```html
<html class="dark">
  <!-- 내부 모든 요소에 다크 토큰 적용 -->
</html>
```

Tailwind에서 직접 다크 스타일 오버라이드도 가능합니다:

```html
<div class="bg-white dark:bg-gray-900">...</div>
```
