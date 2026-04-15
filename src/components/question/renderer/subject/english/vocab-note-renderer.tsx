import type { VocabNoteBlock } from "../../../component-block/subject/english";

export function VocabNoteRenderer({ block }: { block: VocabNoteBlock }) {
  return (
    <dl className="space-y-1 text-sm">
      {block.notes.map((note, i) => (
        <div key={i} className="flex gap-2">
          <dt className="text-foreground shrink-0 font-medium">{note.term}</dt>
          <dd className="text-muted-foreground">{note.definition}</dd>
        </div>
      ))}
    </dl>
  );
}
