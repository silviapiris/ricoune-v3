"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TimelineEvent {
  year: string;
  description: string;
}

interface BioTimelineProps {
  events: TimelineEvent[];
}

function TimelineItem({ event, delay }: { event: TimelineEvent; delay: number }): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Dot on the line */}
      <div className="absolute -left-8 top-1 flex h-5 w-5 items-center justify-center md:-left-10">
        <div className="absolute left-0 h-3.5 w-3.5 rounded-full border-2 border-rc-yellow bg-rc-dark md:left-0" />
      </div>

      {/* Content */}
      <span className="font-[family-name:var(--font-oswald)] text-2xl font-bold text-rc-yellow">
        {event.year}
      </span>
      <p className="mt-1 leading-relaxed text-white/90">
        {event.description}
      </p>
    </div>
  );
}

export default function BioTimeline({ events }: BioTimelineProps): React.ReactElement {
  return (
    <div className="relative pl-8 md:pl-10">
      {/* Vertical yellow line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-rc-yellow md:left-4" />

      <div className="space-y-10">
        {events.map((event, i) => (
          <TimelineItem key={event.year} event={event} delay={i * 100} />
        ))}
      </div>
    </div>
  );
}
