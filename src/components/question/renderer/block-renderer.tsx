import type { ComponentBlock, ContentBlock } from "../component-block/container";
import {
  isSplitBlock,
  isCompositeBlock,
  isCompositeWithBoxBlock,
  isLabeledParagraphBlock,
} from "../component-block/container";

// ── Container ──
import { SplitBlockRenderer } from "./container/split-block-renderer";
import { CompositeRenderer } from "./container/composite-renderer";
import { CompositeWithBoxRenderer } from "./container/composite-with-box-renderer";
import { LabeledParagraphRenderer } from "./container/labeled-paragraph-renderer";

// ── Common ──
import { TextBasicRenderer } from "./subject/common/text-basic-renderer";
import { TextWithBoxRenderer } from "./subject/common/text-with-box-renderer";
import { ImageSingleRenderer } from "./subject/common/image-single-renderer";
import { PassageBlockGroupRenderer } from "./subject/common/passage-block-group-renderer";
import { ViewBoxRenderer } from "./subject/common/view-box-renderer";
import { BulletListRenderer } from "./subject/common/bullet-list-renderer";

// ── English ──
import { VocabNoteRenderer } from "./subject/english/vocab-note-renderer";
import { AnnouncementRenderer } from "./subject/english/announcement-renderer";
import { TextBoxFlowRenderer } from "./subject/english/text-box-flow-renderer";
import { PassageBoxGroupRenderer } from "./subject/english/passage-box-group-renderer";

// ── Korean ──
import { AnnotatedParagraphRenderer } from "./subject/korean/annotated-paragraph-renderer";
import { MultiBoxesRenderer } from "./subject/korean/multi-boxes-renderer";
import { NoteStylePassageRenderer } from "./subject/korean/note-style-passage-renderer";
import { PaperStylePassageRenderer } from "./subject/korean/paper-style-passage-renderer";
import { PassageBlockRenderer } from "./subject/korean/passage-block-renderer";

// ── Math ──
import { ImageAfterOptionsRenderer } from "./subject/math/image-after-options-renderer";

// ── Visual ──
import { AxisChartRenderer } from "./visual/axis-chart-renderer";
import { PieChartRenderer } from "./visual/pie-chart-renderer";
import { TableBasicRenderer } from "./visual/table-basic-renderer";
import { TableMultiRenderer } from "./visual/table-multi-renderer";

/**
 * ComponentBlock을 받아 type에 따라 적절한 렌더러로 디스패치한다.
 */
export function BlockRenderer({ block }: { block: ComponentBlock }) {
  // ── Container ──
  if (isSplitBlock(block)) return <SplitBlockRenderer block={block} />;
  if (isCompositeBlock(block)) return <CompositeRenderer block={block} />;
  if (isCompositeWithBoxBlock(block)) return <CompositeWithBoxRenderer block={block} />;
  if (isLabeledParagraphBlock(block)) return <LabeledParagraphRenderer block={block} />;

  // ── Subject / Visual (leaf blocks) ──
  return <LeafBlockRenderer block={block} />;
}

/**
 * ContentBlock(리프 블록)을 렌더링한다.
 */
function LeafBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    // ── Common ──
    case "text-basic":
      return <TextBasicRenderer block={block} />;
    case "image-single":
      return <ImageSingleRenderer block={block} />;
    case "text-with-box":
      return <TextWithBoxRenderer block={block} />;
    case "passage-block-group":
      return <PassageBlockGroupRenderer block={block} />;
    case "view-box":
      return <ViewBoxRenderer block={block} />;
    case "bullet-list":
      return <BulletListRenderer block={block} />;

    // ── English ──
    case "vocab-note":
      return <VocabNoteRenderer block={block} />;
    case "announcement":
      return <AnnouncementRenderer block={block} />;
    case "text-box-flow":
      return <TextBoxFlowRenderer block={block} />;
    case "passage-box-group":
      return <PassageBoxGroupRenderer block={block} />;

    // ── Korean ──
    case "annotated-paragraph":
      return <AnnotatedParagraphRenderer block={block} />;
    case "multi-boxes":
      return <MultiBoxesRenderer block={block} />;
    case "note-style-passage":
      return <NoteStylePassageRenderer block={block} />;
    case "paper-style-passage":
      return <PaperStylePassageRenderer block={block} />;
    case "passage-block":
      return <PassageBlockRenderer block={block} />;

    // ── Math ──
    case "image-after-options":
      return <ImageAfterOptionsRenderer block={block} />;

    // ── Visual ──
    case "bar":
    case "bar-grouped":
    case "bar-horizontal":
    case "bar-horizontal-grouped":
    case "bar-stacked":
    case "bar-horizontal-stacked":
    case "line":
      return <AxisChartRenderer block={block} />;
    case "pie":
      return <PieChartRenderer block={block} />;
    case "table-basic":
      return <TableBasicRenderer block={block} />;
    case "table-multi":
      return <TableMultiRenderer block={block} />;

    default: {
      const _exhaustive: never = block;
      return <div>Unknown block type: {(_exhaustive as ComponentBlock).type}</div>;
    }
  }
}
