"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getKitById } from "@/data/kits/registry";
import { Lesson } from "@/data/kits/types";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Layers, 
  Wrench, 
  Code, 
  Copy, 
  Check, 
  HelpCircle, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  AlertCircle, 
  Lightbulb,
  PanelRightClose,
  PanelRightOpen,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

export default function LessonPlayerPage({ 
  params 
}: { 
  params: Promise<{ domain: string; kitId: string }> 
}) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const requestedLessonId = searchParams.get("lessonId");

  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  // Flatten all lessons across modules
  const allLessons: Lesson[] = kitData.curriculum.flatMap((m) => m.lessons);

  // Active lesson state
  const initialLessonIndex = requestedLessonId 
    ? Math.max(0, allLessons.findIndex((l) => l.id === requestedLessonId))
    : 0;

  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(initialLessonIndex);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(true);

  const currentLesson = allLessons[activeLessonIndex] || allLessons[0];

  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setIsQuizSubmitted(false);
    setCodeCopied(false);
  }, [activeLessonIndex]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    toast.success("Firmware code copied to clipboard!");
    setTimeout(() => setCodeCopied(false), 2500);
  };

  const handleMarkCompleteAndNext = () => {
    if (!completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds((prev) => [...prev, currentLesson.id]);
      toast.success(`Completed: ${currentLesson.title}`);
    }

    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else {
      toast.success("🎉 You completed all modules in this kit!");
    }
  };

  const progressPercent = Math.round((completedLessonIds.length / allLessons.length) * 100);

  return (
    <div className="space-y-4 animate-fadeIn w-full">
      
      {/* ═══ 1. COMPACT SINGLE-LINE BREADCRUMB & CONTROL ROW ═══ */}
      <div 
        className="px-4 py-2.5 rounded-2xl border shadow-xs flex items-center justify-between gap-3 text-xs"
        style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
      >
        {/* Left Breadcrumb */}
        <div className="flex items-center gap-2 text-[var(--text-secondary)] min-w-0">
          <Link
            href={`/${domain.slug}/${kitData.kitId}`}
            className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="Back to Kit Overview"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-medium">{domain.title}</span>
          </Link>
          <span className="text-[var(--text-tertiary)]">/</span>
          <span className="font-semibold text-[var(--text-primary)] truncate max-w-[180px] sm:max-w-xs">
            {kitData.name}
          </span>
          <span className="text-[var(--text-tertiary)] hidden sm:inline">/</span>
          <span className="text-[11px] font-mono text-[#5C6B38] hidden sm:inline font-semibold truncate">
            Module {currentLesson.moduleIndex}: {currentLesson.title}
          </span>
        </div>

        {/* Right Controls: Progress + Sidebar Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[var(--text-primary)]">
              {progressPercent}% Complete
            </span>
            <div className="w-20 h-1.5 rounded-full bg-[var(--bg-surface-2)] overflow-hidden border border-[var(--border-subtle)]">
              <div 
                className="h-full rounded-full bg-[#5C6B38] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setIsCurriculumOpen(!isCurriculumOpen)}
            className="px-3 py-1 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5 cursor-pointer"
            title={isCurriculumOpen ? "Collapse Curriculum Sidebar for Cinema Mode" : "Open Curriculum Sidebar"}
          >
            {isCurriculumOpen ? (
              <>
                <PanelRightClose className="w-3.5 h-3.5 text-[#5C6B38]" />
                <span className="hidden sm:inline">Hide Index</span>
              </>
            ) : (
              <>
                <PanelRightOpen className="w-3.5 h-3.5 text-[#5C6B38]" />
                <span className="font-semibold text-[#5C6B38]">Curriculum Index</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ═══ 2. COMPACT LESSON HEADER BAR ═══ */}
      <div 
        className="px-5 py-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
      >
        <div className="space-y-0.5 min-w-0">
          <div className="text-[11px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider">
            MODULE {currentLesson.moduleIndex} • LESSON {currentLesson.moduleIndex}.{currentLesson.lessonIndex}
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-bold font-['Fraunces'] text-[var(--text-primary)] leading-snug truncate">
            {currentLesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border text-[var(--text-secondary)]" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
            Est: {currentLesson.estimatedDuration}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg border text-[#5C6B38] bg-[#5C6B38]/10 font-bold uppercase">
            {currentLesson.contentType}
          </span>
        </div>
      </div>

      {/* ═══ 3. FLUID CSS GRID LESSON WORKSPACE ═══ */}
      <div className={`grid gap-5 items-start ${isCurriculumOpen ? "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]" : "grid-cols-1"}`}>
        
        {/* ════ MAIN CONTENT / VIDEO COLUMN (Expands to 100% when sidebar is closed) ════ */}
        <div className="min-w-0 space-y-4">
          
          {/* 1. VIDEO PLAYER (16:9 Aspect Ratio) */}
          {(currentLesson.contentType === "video" || currentLesson.contentType === "hybrid") && currentLesson.videoUrl && (
            <div className="rounded-2xl overflow-hidden border shadow-xs relative aspect-video bg-black flex items-center justify-center" style={{ borderColor: "var(--border-subtle)" }}>
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Video Timestamps Bar */}
          {currentLesson.videoTimestamps && (
            <div className="p-3.5 rounded-2xl border space-y-2" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase block">
                Video Chapters &amp; Timestamps:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentLesson.videoTimestamps.map((ts, idx) => (
                  <span 
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg border flex items-center gap-1.5 cursor-pointer hover:border-[#5C6B38] transition-colors"
                    style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}
                  >
                    <Clock className="w-3 h-3 text-[#5C6B38]" />
                    <span className="font-bold text-[#5C6B38]">{ts.time}</span>
                    <span className="text-[var(--text-secondary)]">{ts.label}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 2. VISUAL STEP-BY-STEP ASSEMBLY */}
          {currentLesson.steps && currentLesson.steps.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5C6B38] uppercase">
                <Wrench className="w-3.5 h-3.5" />
                <span>Visual Assembly Steps</span>
              </div>

              <div className="space-y-3">
                {currentLesson.steps.map((step) => (
                  <div 
                    key={step.stepNumber}
                    className="p-4 sm:p-5 rounded-2xl border space-y-3 shadow-2xs"
                    style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
                  >
                    <div className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] pb-2">
                      <span className="w-5 h-5 rounded-full bg-[#5C6B38] text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                        {step.stepNumber}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                    </div>

                    {step.image && (
                      <div className="aspect-[16/9] max-h-[360px] rounded-xl overflow-hidden border p-1" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                        <img src={step.image} alt={step.title} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    )}

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {step.instruction}
                    </p>

                    {step.partsNeeded && step.partsNeeded.length > 0 && (
                      <div className="p-2.5 rounded-xl border space-y-1" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                        <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase">
                          Parts Needed for this Step:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {step.partsNeeded.map((part, pIdx) => (
                            <span key={pIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium">
                              • {part}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {step.warningOrTip && (
                      <div className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{step.warningOrTip}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CIRCUIT SCHEMATIC & PIN MATRIX */}
          {currentLesson.schematic && (
            <div className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5C6B38] uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>Circuit Schematic &amp; Pinout</span>
              </div>

              <div className="aspect-[16/9] max-h-[360px] rounded-xl overflow-hidden border p-1" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                <img src={currentLesson.schematic.diagramImage} alt="Schematic" className="w-full h-full object-cover rounded-lg" />
              </div>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {currentLesson.schematic.description}
              </p>

              <div className="overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]">
                      <th className="p-2.5 font-mono font-semibold text-[var(--text-primary)]">Component Pin</th>
                      <th className="p-2.5 font-mono font-semibold text-[var(--text-primary)]">MCU Pin</th>
                      <th className="p-2.5 font-mono font-semibold text-[var(--text-primary)]">Function</th>
                      <th className="p-2.5 font-mono font-semibold text-[var(--text-primary)]">Wire Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {currentLesson.schematic.pinConnections.map((pin, pIdx) => (
                      <tr key={pIdx} className="hover:bg-[var(--bg-surface-2)] transition-colors">
                        <td className="p-2.5 font-mono font-bold text-[#5C6B38]">{pin.componentPin}</td>
                        <td className="p-2.5 font-mono font-medium text-[var(--text-primary)]">{pin.mcuPin}</td>
                        <td className="p-2.5 text-[var(--text-secondary)]">{pin.functionType}</td>
                        <td className="p-2.5 font-mono text-[11px] text-[var(--text-tertiary)]">{pin.colorCode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. CODE WALKTHROUGH */}
          {currentLesson.codeSnippet && (
            <div className="p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5C6B38] uppercase">
                  <Code className="w-3.5 h-3.5" />
                  <span>Firmware Source Code</span>
                </div>

                <button
                  onClick={() => handleCopyCode(currentLesson.codeSnippet?.code || "")}
                  className="px-3 py-1 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {codeCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{codeCopied ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden">
                <div className="px-3.5 py-1.5 text-xs font-mono font-bold border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">{currentLesson.codeSnippet.filename}</span>
                  <span className="text-[10px] text-[#5C6B38] uppercase font-bold">{currentLesson.codeSnippet.language}</span>
                </div>
                <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#1E1E2E] text-[#CDD6F4]">
                  <code>{currentLesson.codeSnippet.code}</code>
                </pre>
              </div>

              {currentLesson.codeSnippet.explanationPoints && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase">
                    Code Breakdown:
                  </span>
                  <div className="space-y-1.5">
                    {currentLesson.codeSnippet.explanationPoints.map((pt, eIdx) => (
                      <div key={eIdx} className="p-2.5 rounded-lg border text-xs flex items-start gap-2.5" style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-subtle)" }}>
                        <span className="font-mono font-bold text-[#5C6B38] shrink-0">{pt.lineRange}:</span>
                        <span className="text-[var(--text-secondary)]">{pt.explanation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. KNOWLEDGE CHECK QUIZ */}
          {currentLesson.checkpointQuiz && (
            <div className="p-4 sm:p-5 rounded-2xl border space-y-3 shadow-2xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5C6B38] uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Knowledge Check</span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {currentLesson.checkpointQuiz.question}
              </h3>

              <div className="space-y-1.5">
                {currentLesson.checkpointQuiz.options.map((option, optIdx) => {
                  const isSelected = selectedQuizAnswer === optIdx;
                  const isCorrect = optIdx === currentLesson.checkpointQuiz?.correctIndex;

                  let optionClass = "border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)]";
                  if (isQuizSubmitted) {
                    if (isCorrect) {
                      optionClass = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optionClass = "border-red-500 bg-red-500/10 text-red-800 dark:text-red-300";
                    }
                  } else if (isSelected) {
                    optionClass = "border-[#5C6B38] bg-[#5C6B38]/10 font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        if (!isQuizSubmitted) setSelectedQuizAnswer(optIdx);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optionClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[9px] font-mono shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isQuizSubmitted && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                      {isQuizSubmitted && isSelected && !isCorrect && <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {!isQuizSubmitted ? (
                <button
                  onClick={() => {
                    if (selectedQuizAnswer !== null) {
                      setIsQuizSubmitted(true);
                    } else {
                      toast.info("Please select an answer first!");
                    }
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-colors cursor-pointer"
                >
                  Check Answer
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-[var(--bg-surface-2)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-0.5">
                  <div className="font-bold text-[var(--text-primary)]">Explanation:</div>
                  <div>{currentLesson.checkpointQuiz.explanation}</div>
                </div>
              )}
            </div>
          )}

          {/* ═══ BOTTOM NAVIGATION CONTROLS ═══ */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between gap-4" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
            <button
              onClick={() => {
                if (activeLessonIndex > 0) setActiveLessonIndex(activeLessonIndex - 1);
              }}
              disabled={activeLessonIndex === 0}
              className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] text-xs font-semibold hover:bg-[var(--bg-surface-2)] transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleMarkCompleteAndNext}
              className="px-5 py-2 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 shadow-2xs hover:scale-102 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {completedLessonIds.includes(currentLesson.id) ? "Next Lesson" : "Mark Complete & Next"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ════ RIGHT COLUMN: COMPACT CURRICULUM INDEX SIDEBAR (320px) ════ */}
        {isCurriculumOpen && (
          <aside className="w-full lg:w-[320px] space-y-3 lg:sticky lg:top-20 shrink-0 animate-fadeIn">
            
            <div className="p-4 rounded-2xl border space-y-3 shadow-xs" style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}>
              
              {/* Index Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#5C6B38]" />
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">
                    Curriculum Index
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                  {allLessons.length} Total Lessons
                </span>
              </div>

              {/* Module Tree (Dense & Compact) */}
              <div className="space-y-3">
                {kitData.curriculum.map((module) => (
                  <div key={module.id} className="space-y-1">
                    <div className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase tracking-wider py-0.5">
                      MODULE {module.moduleNumber}: {module.title}
                    </div>

                    <div className="space-y-1">
                      {module.lessons.map((lesson) => {
                        const isCurrent = currentLesson.id === lesson.id;
                        const isDone = completedLessonIds.includes(lesson.id);
                        const lessonGlobalIndex = allLessons.findIndex((l) => l.id === lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLessonIndex(lessonGlobalIndex)}
                            className={`w-full px-2.5 py-1.5 rounded-xl text-left border flex items-center justify-between gap-2 transition-all text-xs cursor-pointer ${
                              isCurrent
                                ? "border-[#5C6B38] bg-[#5C6B38]/10 font-bold text-[#5C6B38]"
                                : "border-[var(--border-subtle)] hover:bg-[var(--bg-surface-2)] text-[var(--text-secondary)]"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : (
                                <span className="w-4 h-4 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[9px] font-mono shrink-0">
                                  {String(lesson.lessonIndex).padStart(2, "0")}
                                </span>
                              )}
                              <span className="truncate text-[11px]">{lesson.title}</span>
                            </div>

                            <span className="text-[10px] font-mono text-[var(--text-tertiary)] shrink-0">
                              {lesson.estimatedDuration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Milestone Assessment Card Link */}
              <div className="pt-2.5 border-t border-[var(--border-subtle)]">
                <Link
                  href={`/${domain.slug}/${kitData.kitId}/assessments`}
                  className="w-full p-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 transition-colors flex items-center justify-between text-xs font-bold"
                >
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Milestone Exam</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </aside>
        )}

      </div>

    </div>
  );
}
