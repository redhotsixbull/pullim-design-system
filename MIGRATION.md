# Legacy 앱 → @pullim/design-system 마이그레이션 가이드

레거시 프로젝트를 Pullim 디자인시스템으로 옮길 때, **무엇을 무엇으로 바꾸는지**와 **설정·검증 체크리스트**를 한곳에 모았습니다. 상세 설정은 [SETUP.md](./SETUP.md), 컴포넌트·Motion 요약은 [README.md](./README.md)를 참고하세요.

---

## 1. 마이그레이션 전제 조건

| 항목 | 요구사항 |
|------|----------|
| React | 18 이상 |
| Tailwind CSS | **4 이상** (v3 전용 유틸/설정과 혼용 시 토큰이 깨지기 쉬움) |
| 필수 peer | `react`, `react-dom`, `tailwindcss`, `react-hook-form`, `sonner` |

- 패키지 엔트리: `@pullim/design-system`
- 서브패스: `@pullim/design-system/icons`, `@pullim/design-system/lucide-animated`, `@pullim/design-system/styles/globals.css`

---

## 2. 레거시 패턴 → 디자인시스템 대응표

아래는 **“레거시에서 흔히 쓰던 것”**을 **“이 패키지에서 쓰는 것”**으로 매핑한 참고표입니다. 이름이 shadcn/ui와 비슷해도, **앱에 복사해 둔 `components/ui/*`와 패키지 버전을 혼용하지 마세요.** 한 화면·한 기능 단위로 패키지 import로 통일하는 것이 안전합니다.

### 2.1 UI 컴포넌트

| 레거시(또는 흔한 형태) | 디자인시스템으로 |
|------------------------|------------------|
| 로컬 `Button` / MUI `Button` / 커스텀 CTA | `Button`, `buttonVariants` (`@pullim/design-system`) |
| 네이티브 `<input>` 스타일만 입힘 | `Input` |
| `<textarea>` 직접 스타일 | `Textarea` |
| 커스텀 드롭다운 / MUI Select | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, … |
| 체크박스·스위치·라디오 직접 구현 | `Checkbox`, `Switch`, `RadioGroup`, `RadioGroupItem` |
| 폼 라벨만 `<label>` | `Label` (Radix 연동 패턴과 함께) |
| 카드 레이아웃을 div + class로 반복 | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` |
| `<hr>` 또는 구분선 div | `Separator` |
| 접이식 FAQ 등 직접 구현 | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| 탭을 상태 + 버튼으로 구현 | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| 커스텀 모달 | `Dialog` 계열 |
| 확인/취소 필수 알림 | `AlertDialog` 계열 |
| 모바일 하단 시트·사이드 패널 | `Sheet` 계열 |
| 툴팁·팝오버 직접 구현 | `Tooltip` 계열, `Popover` 계열 |
| 메뉴·컨텍스트 메뉴 | `DropdownMenu` 계열 |
| 뱃지·태그 span | `Badge`, `badgeVariants` |
| 로딩 스켈레톤 | `Skeleton` |
| 아바타 | `Avatar`, `AvatarImage`, `AvatarFallback` |
| 진행률 바 | `Progress` |
| 날짜 선택 UI | `Calendar`, `CalendarDayButton` |
| `react-hook-form` + 수동 에러 표시 | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `FormDescription` |

### 2.2 타이포그래피

| 레거시 | 디자인시스템으로 |
|--------|------------------|
| 제목을 `<h1>`~`<h6>` + 임의 `text-*` 클래스만 | `Heading` (`as`로 시맨틱, `size`로 시각적 크기) |
| 본문 `<p>` / `<span>` + 색·크기 산재 | `Text` (`size`, `weight`, `muted` 등) |
| 섹션 리드 문단 | `Lead` |
| 보조 설명·캡션 | `Muted` |
| 인라인 코드 스타일 | `Code` |
| 인용문 | `Blockquote` |
| `headingVariants`, `textVariants`로 커스텀 조합 | 동일 이름으로 export됨 (`cn(...)`과 조합 가능) |

### 2.3 토스트·알림

| 레거시 | 디자인시스템으로 |
|--------|------------------|
| `react-hot-toast`, 커스텀 스낵바 | `Toaster`(레이아웃에 배치) + `toast` (`sonner`, 패키지에서 re-export) |

### 2.4 아이콘

| 레거시 | 디자인시스템으로 |
|--------|------------------|
| `lucide-react` 직접 import (앱 전역 산재) | **`@pullim/design-system/icons`** — Pullim 래퍼(오버라이드 가능). 한 프로젝트에서는 가능하면 이 경로로 통일 |
| 애니메이션 아이콘 필요 | **`@pullim/design-system/lucide-animated`** (메인 번들과 분리된 서브패스) |

### 2.5 애니메이션

| 레거시 | 디자인시스템으로 |
|--------|------------------|
| `framer-motion`만 단독 사용 | 패키지는 **`motion`** re-export + `AnimatePresence`, `useReducedMotion` |
| 임의 `initial`/`animate` 값 반복 | `fadeIn`, `fadeSlideUp`, `fadeSlideX`, `scaleIn`, `pulse`, `staggerContainer`, `staggerItem`, `pullimMotionPresets` |
| 래퍼로 빠르게 맞추고 싶을 때 | `PullimFadeIn`, `PullimFadeSlideUp`, `PullimFadeSlideX`, `PullimScaleIn`, `PullimPulse`, `PullimStaggerRoot`, `PullimStaggerItem` |

> Motion은 peer가 아니라 패키지 의존성이지만, 빌드에서 external 처리되므로 **앱에 `motion`이 설치**되어 있어야 합니다. 버전 충돌 시 앱과 맞추세요.

### 2.6 스타일·토큰 (Tailwind 유틸)

| 레거시 | 디자인시스템으로 |
|--------|------------------|
| 하드코딩 hex (`#0362da` 등) | 시맨틱: `bg-primary`, `text-foreground`, `border-border` 등 — `globals.css` import 후 사용 |
| 브랜드 스케일 직접 정의 | `pullim-*`, `brand-*`, 과목별 `subject-*` 토큰 (`globals.css`의 `@theme inline` 참고) |
| 회색 팔레트 임의 값 | `gray-50` ~ `gray-900` 등 정의된 스케일 |
| `clsx` + `tailwind-merge`만 각자 사용 | **`cn`** (`@pullim/design-system`)으로 통일 권장 |

다크 모드는 **`.dark` 조상** 기준(`@custom-variant dark`)입니다. 레거시에서 `data-theme`만 쓰는 경우, `html` 또는 `body`에 `class="dark"`를 맞추거나 변환 레이어를 두세요.

---

## 3. 앱 쪽 필수 설정 체크리스트

마이그레이션 후 “컴포넌트는 쓰는데 스타일이 안 먹는” 경우가 많습니다. 아래를 순서대로 확인하세요.

- [ ] **전역 CSS**에 `@import "tailwindcss";` 다음에 **`@import "@pullim/design-system/styles/globals.css";`** (순서·경로는 [README.md](./README.md) 예시 따름)
- [ ] **Tailwind v4** 및 소스 스캔: 디자인시스템 패키지 경로가 `@source` 등에 포함되는지 ([SETUP.md](./SETUP.md)의 Next/Vite 예시)
- [ ] **Pretendard** 등 폰트 로드(README 권장 방식)
- [ ] **`Toaster`**를 실제로 한 번 렌더했는지(루트 레이아웃 등)
- [ ] **`react-hook-form` 단일 인스턴스**: 앱과 DS가 다른 물리 경로를 보면 `FormProvider` 등 오류 — bundler `resolve.alias`로 정리 ([SETUP.md §8](./SETUP.md))
- [ ] **Turbopack + 패키지 밖 경로**: `@import` 실패 시 webpack 모드 또는 publish 후 node_modules 설치로 해결 ([SETUP.md §8](./SETUP.md))
- [ ] **시맨틱 색이 안 나올 때**: 소비 앱의 `@theme inline`에서 `--color-card: initial` 같은 패턴이 없는지 확인 — 반드시 **`var(--card)` 등 간접 참조** ([SETUP.md §8](./SETUP.md))

---

## 4. 권장 마이그레이션 순서

1. **인프라**: Tailwind 4, `globals.css` import, 폰트, 다크 클래스 전략 정리  
2. **토큰 정리**: 화면 단위로 하드코딩 색을 `primary` / `muted-foreground` / `subject-*` 등으로 치환  
3. **타이포**: 제목·본문을 `Heading` / `Text` / `Lead` / `Muted`로 교체(시맨틱과 시각 크기 분리)  
4. **폼·입력**: `Button`, `Input`, `Label`, DS `Form` 계열로 통일  
5. **오버레이·네비**: `Dialog`, `Sheet`, `DropdownMenu` 등으로 교체  
6. **아이콘·모션**: `@pullim/design-system/icons`, 필요 시 `lucide-animated`; 등장 애니메이션은 Motion 프리셋·`Pullim*` 래퍼 검토  
7. **제거**: 앱 내 구버전 `components/ui` 복사본, 중복 테마 CSS, 충돌하는 전역 버튼/입력 스타일

---

## 5. AI·코드 검색용 힌트 (치환 시 grep 키워드)

마이그레이션 자동화나 리뷰 시 아래 패턴을 찾으면 교체 후보입니다.

- `from "lucide-react"` → 가능하면 `@pullim/design-system/icons`
- `from "@/components/ui/button"` 등 로컬 shadcn 경로 → `@pullim/design-system`
- `framer-motion` → `motion/react` 또는 패키지에서 re-export하는 `motion` 사용 여부 검토
- `#([0-9a-fA-F]{3,8})` / `rgb(` 남용 → 시맨틱·토큰 클래스
- `<h[1-6][^>]*className=.*text-(xs\|sm\|base\|lg\|xl)` → `Heading` 검토

---

## 6. 이 문서를 나눠 쓰는 팀 규칙 제안

- **한 PR에서는 한 축만** (예: 타이포만, 또는 버튼/입력만) 바꾸면 리뷰와 롤백이 쉽습니다.  
- 새 코드는 **가능한 한 DS import만** 사용하고, 레거시 래퍼를 얇게 두어 점진적으로 제거합니다.  
- 디자인시스템 버전 올릴 때는 릴리즈 태그·커밋 히스토리를 보고 breaking 여부를 확인하세요.

---

문서 위치: 저장소 루트 `MIGRATION.md`. 내용은 패키지 `src/index.ts` export와 `src/styles/globals.css` 토큰 기준으로 작성되었습니다.
