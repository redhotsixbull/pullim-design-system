"use client";

import type { Question, SetQuestion } from "../types";
import { BlockRenderer } from "./block-renderer";
import { OptionRenderer } from "./option/option-renderer";
import {
  type RenderConfig,
  DEFAULT_RENDER_CONFIG,
  VARIANT_GAPS,
  RenderConfigProvider,
  useRenderConfig,
} from "./_shared/render-config";
import { ScaleWrapper } from "./_shared/scale-wrapper";

interface QuestionRendererProps {
  question: Question;
  config?: Partial<RenderConfig>;
}

/**
 * 단일 문제를 렌더링한다.
 * 최상위에서 호출될 때 config를 받아 ScaleWrapper + RenderConfigProvider를 적용한다.
 * SetQuestionRenderer 내부에서 호출될 때는 config 없이 context를 상속한다.
 */
export function QuestionRenderer({ question, config }: QuestionRendererProps) {
  if (config) {
    const merged = { ...DEFAULT_RENDER_CONFIG, ...config };
    return (
      <RenderConfigProvider config={merged}>
        <ScaleWrapper>
          <QuestionInner question={question} />
        </ScaleWrapper>
      </RenderConfigProvider>
    );
  }

  return <QuestionInner question={question} />;
}

function QuestionInner({ question }: { question: Question }) {
  const { variant } = useRenderConfig();
  const gaps = VARIANT_GAPS[variant];

  return (
    <div className={gaps.block}>
      {/* 발문 */}
      <div className={gaps.inner}>
        {question.stemBlocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {/* 지문 / 자료 */}
      {question.contentBlocks.length > 0 && (
        <div className={gaps.inner}>
          {question.contentBlocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      )}

      {/* 선지 */}
      <div>
        <OptionRenderer block={question.optionBlocks} />
      </div>
    </div>
  );
}

interface SetQuestionRendererProps {
  setQuestion: SetQuestion;
  config?: Partial<RenderConfig>;
}

/**
 * 세트(묶음) 문제를 렌더링한다.
 */
export function SetQuestionRenderer({ setQuestion, config }: SetQuestionRendererProps) {
  const merged = { ...DEFAULT_RENDER_CONFIG, ...config };

  return (
    <RenderConfigProvider config={merged}>
      <ScaleWrapper>
        <SetQuestionInner setQuestion={setQuestion} />
      </ScaleWrapper>
    </RenderConfigProvider>
  );
}

function SetQuestionInner({ setQuestion }: { setQuestion: SetQuestion }) {
  const { variant } = useRenderConfig();
  const gaps = VARIANT_GAPS[variant];

  return (
    <div className={gaps.section}>
      {/* 세트 발문 */}
      <div className={gaps.inner}>
        {setQuestion.setStemBlocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </div>

      {/* 세트 지문 / 자료 */}
      {setQuestion.setContentBlocks.length > 0 && (
        <div className={gaps.inner}>
          {setQuestion.setContentBlocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      )}

      {/* 하위 문제들 */}
      <div className={gaps.section}>
        {setQuestion.questions.map((q, i) => (
          <QuestionInner key={i} question={q} />
        ))}
      </div>
    </div>
  );
}
