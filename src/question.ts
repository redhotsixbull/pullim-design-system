// ── Types ──
export type { Question, SetQuestion, ListeningScript } from "./components/question/types";
export type {
  ComponentBlock,
  ContentBlock,
  ContainerBlock,
  SplitBlock,
  CompositeBlock,
  CompositeWithBoxBlock,
  LabeledParagraphBlock,
} from "./components/question/component-block/container";
export type {
  CommonBlock,
  TextBasicBlock,
  ImageSingleBlock,
  TextWithBoxBlock,
  PassageBlockGroupBlock,
  ViewBoxBlock,
  BulletListBlock,
} from "./components/question/component-block/subject/common";
export type {
  EnglishBlock,
  VocabNoteBlock,
  AnnouncementBlock,
  TextBoxFlowBlock,
  PassageBoxGroupBlock,
} from "./components/question/component-block/subject/english";
export type {
  KoreanBlock,
  AnnotatedParagraphBlock,
  MultiBoxesBlock,
  NoteStylePassageBlock,
  PaperStylePassageBlock,
  PassageBlockBlock,
} from "./components/question/component-block/subject/korean";
export type { MathBlock, ImageAfterOptionsBlock } from "./components/question/component-block/subject/math";
export type {
  VisualBlock,
  BarChartBlock,
  BarGroupedChartBlock,
  BarHorizontalChartBlock,
  BarHorizontalGroupedChartBlock,
  BarStackedChartBlock,
  BarHorizontalStackedChartBlock,
  LineChartBlock,
  PieChartBlock,
  TableBasicBlock,
  TableMultiBlock,
  AxisChartBase,
  ChartAxis,
  ChartSeries,
  ChartOptions,
  PieChartOptions,
  TableCell,
  TableSubTable,
} from "./components/question/component-block/visual";
export type {
  OptionBlock,
  TextOptionBlock,
  PairOptionBlock,
  ImageOptionBlock,
  TableOptionBlock,
} from "./components/question/option-block";

// ── Parsers ──
export { parseComponentBlock } from "./components/question/component-block/container";
export { parseCommonBlock } from "./components/question/component-block/subject/common";
export { parseEnglishBlock } from "./components/question/component-block/subject/english";
export { parseKoreanBlock } from "./components/question/component-block/subject/korean";
export { parseMathBlock } from "./components/question/component-block/subject/math";
export { parseVisualBlock } from "./components/question/component-block/visual";
export { parseOptionBlock } from "./components/question/option-block";

// ── Renderers ──
export { BlockRenderer } from "./components/question/renderer/block-renderer";
export { QuestionRenderer, SetQuestionRenderer } from "./components/question/renderer/question-renderer";
export { OptionRenderer } from "./components/question/renderer/option/option-renderer";

// ── Render Config ──
export type { RenderConfig, RenderVariant } from "./components/question/renderer/_shared/render-config";
export { DEFAULT_RENDER_CONFIG } from "./components/question/renderer/_shared/render-config";
