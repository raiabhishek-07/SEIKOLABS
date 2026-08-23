"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Download,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

export default function KitAssessmentPage({ 
  params 
}: { 
  params: Promise<{ domain: string; kitId: string }> 
}) {
  const resolvedParams = use(params);
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const totalQuestions = kitData.assessments.length;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    kitData.assessments.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < totalQuestions) {
      toast.info(`Please answer all ${totalQuestions} questions before submitting!`);
      return;
    }
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= Math.ceil(totalQuestions * 0.8)) {
      toast.success("🎉 Congratulations! You passed the certification exam!");
    } else {
      toast.error("You scored below the 80% passing threshold. Review explanations and try again!");
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const isPassed = scorePercent >= 80;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
            Milestone Certification Assessment
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {totalQuestions} Questions • 80% Passing Score to Earn Certificate
          </p>
        </div>

        <Link
          href={`/${domain.slug}/${kitData.kitId}/lessons`}
          className="text-xs font-semibold text-[#5C6B38] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Review Guided Lessons</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Results Summary Banner (When Submitted) */}
      {isSubmitted && (
        <div 
          className={`p-6 rounded-2xl border space-y-4 ${
            isPassed 
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200" 
              : "border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>EXAM RESULTS • {isPassed ? "PASSED (CERTIFIED)" : "NEEDS REVIEW"}</span>
              </div>
              <h3 className="text-xl font-bold font-['Fraunces']">
                Your Score: {score} of {totalQuestions} ({scorePercent}%)
              </h3>
              <p className="text-xs leading-relaxed max-w-lg">
                {isPassed 
                  ? "Exceptional mastery! You have demonstrated a thorough understanding of ESP32 Wi-Fi networking, L298N motor drivers, and Type-C 2S power electronics."
                  : "You need 80% to earn the digital completion certificate. Review explanations below and retake the exam."}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>

              {isPassed && (
                <button
                  onClick={() => toast.success("Certificate downloaded! (Demo)")}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {kitData.assessments.map((question, qIdx) => {
          const selectedOption = answers[question.id];
          const isCorrect = selectedOption === question.correctIndex;

          return (
            <div
              key={question.id}
              className="p-5 rounded-2xl border space-y-3"
              style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">
                  QUESTION {qIdx + 1} OF {totalQuestions} • {question.topic}
                </span>

                {isSubmitted && (
                  <span className={`text-xs font-bold flex items-center gap-1 ${isCorrect ? "text-emerald-500" : "text-red-500"}`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? "Correct" : "Incorrect"}</span>
                  </span>
                )}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-snug">
                {question.question}
              </h3>

              {/* Options List */}
              <div className="space-y-1.5">
                {question.options.map((option, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isOptionCorrect = optIdx === question.correctIndex;

                  let optionClass = "border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)]";
                  if (isSubmitted) {
                    if (isOptionCorrect) {
                      optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-bold";
                    } else if (isSelected && !isOptionCorrect) {
                      optionClass = "border-red-500 bg-red-500/10 text-red-900 dark:text-red-200";
                    }
                  } else if (isSelected) {
                    optionClass = "border-[#5C6B38] bg-[#5C6B38]/10 font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(question.id, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isOptionCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      {isSubmitted && isSelected && !isOptionCorrect && <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card (After Submit) */}
              {isSubmitted && (
                <div className="p-3 rounded-xl bg-[var(--bg-surface-2)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-0.5 mt-2">
                  <span className="font-bold text-[var(--text-primary)] block">Explanation:</span>
                  <span>{question.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Bar */}
      {!isSubmitted && (
        <div className="p-4 rounded-2xl border flex items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
          <span className="text-xs text-[var(--text-secondary)] font-mono">
            Answered: <strong className="text-[var(--text-primary)]">{Object.keys(answers).length}</strong> of {totalQuestions}
          </span>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all"
          >
            Submit for Grading
          </button>
        </div>
      )}

    </div>
  );
}
