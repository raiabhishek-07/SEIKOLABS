"use client";

import React, { use } from "react";
import Link from "next/link";
import { getKitById } from "@/data/kits/registry";
import { PRODUCT_DOMAINS } from "@/data/domains";
import { 
  Video, 
  Wrench, 
  Layers, 
  Code, 
  Clock, 
  ArrowRight,
  Sparkles,
  Play
} from "lucide-react";

export default function KitCurriculumPage({
  params
}: {
  params: Promise<{ domain: string; kitId: string }>;
}) {
  const resolvedParams = use(params);
  const domain = PRODUCT_DOMAINS.find((d) => d.slug === resolvedParams.domain) || PRODUCT_DOMAINS[0];
  const kitData = getKitById(resolvedParams.kitId, resolvedParams.domain);

  const allLessonsCount = kitData.curriculum.flatMap((m) => m.lessons).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Fraunces'] text-[var(--text-primary)]">
            Curriculum Roadmap
          </h1>
          <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
            {kitData.curriculum.length} Modules • {allLessonsCount} Hands-On Guided Lessons
          </p>
        </div>

        <Link
          href={`/${domain.slug}/${kitData.kitId}/lessons`}
          className="px-4 py-2 rounded-full text-xs font-bold bg-[#5C6B38] text-white hover:bg-[#4E5B2E] transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>Launch Lesson Player</span>
        </Link>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {kitData.curriculum.map((module) => (
          <div 
            key={module.id}
            className="p-5 sm:p-6 rounded-2xl border space-y-3"
            style={{ backgroundColor: "var(--bg-surface-1)", borderColor: "var(--border-subtle)" }}
          >
            {/* Module Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[var(--border-subtle)] pb-2.5">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#5C6B38] uppercase">
                  MODULE {module.moduleNumber}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {module.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-tertiary)]">
                <Clock className="w-3 h-3" />
                <span>{module.duration}</span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {module.description}
            </p>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {module.lessons.map((lesson) => {
                let formatIcon = Video;
                let formatLabel = "Video";
                if (lesson.contentType === "step-by-step") {
                  formatIcon = Wrench;
                  formatLabel = "Guide";
                } else if (lesson.contentType === "theory") {
                  formatIcon = Layers;
                  formatLabel = "Schematic";
                } else if (lesson.contentType === "code") {
                  formatIcon = Code;
                  formatLabel = "Code";
                } else if (lesson.contentType === "hybrid") {
                  formatIcon = Sparkles;
                  formatLabel = "Hybrid";
                }

                const FormatIconComponent = formatIcon;

                return (
                  <Link
                    key={lesson.id}
                    href={`/${domain.slug}/${kitData.kitId}/lessons?lessonId=${lesson.id}`}
                    className="p-3 rounded-xl border flex items-center justify-between gap-3 group hover:border-[#5C6B38] hover:bg-[var(--bg-surface-2)] transition-all"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="p-1.5 rounded-lg bg-[var(--bg-surface-2)] text-[var(--accent-primary)] group-hover:bg-[#5C6B38] group-hover:text-white transition-colors shrink-0">
                        <FormatIconComponent className="w-3 h-3" />
                      </span>
                      <span className="text-xs font-medium text-[var(--text-primary)] truncate">
                        {lesson.moduleIndex}.{lesson.lessonIndex} {lesson.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-[var(--text-tertiary)] shrink-0">
                      {lesson.estimatedDuration}
                    </span>
                  </Link>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
