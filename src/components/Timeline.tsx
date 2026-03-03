"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dark-lighter md:left-1/2 md:-translate-x-px" />

      <div className="space-y-12">
        {events.map((event, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex items-start"
            >
              {/* Dot */}
              <div className="absolute left-4 z-10 -translate-x-1/2 md:left-1/2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-dark">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
              </div>

              {/* Card — mobile always right, desktop alternating */}
              <div
                className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:mr-auto md:pr-4 md:text-right" : "md:ml-auto md:pl-4"
                }`}
              >
                <span className="mb-1 inline-block text-sm font-bold tracking-wider text-primary">
                  {event.year}
                </span>
                <div className="rounded-xl border border-dark-lighter bg-dark-light p-5">
                  <p className="leading-relaxed text-gray-300">{event.title}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
