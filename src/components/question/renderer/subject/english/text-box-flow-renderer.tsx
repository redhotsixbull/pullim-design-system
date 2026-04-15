import type { TextBoxFlowBlock } from "../../../component-block/subject/english";
import { LabeledBox } from "../../_shared/labeled-box";
import { RichText } from "../../_shared/rich-text";
import { VocabNoteRenderer } from "./vocab-note-renderer";

export function TextBoxFlowRenderer({ block }: { block: TextBoxFlowBlock }) {
  return (
    <div className="space-y-3">
      {block.blocks.map((item) => (
        <LabeledBox key={item.id}>
          <RichText text={item.text} className="leading-relaxed" />
          {item.voca?.map((v, vi) => (
            <div key={vi} className="border-border mt-2 border-t pt-2">
              <VocabNoteRenderer block={v} />
            </div>
          ))}
        </LabeledBox>
      ))}
    </div>
  );
}
