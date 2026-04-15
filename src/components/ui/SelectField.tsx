"use client";

import { ChevronDown, Check } from "lucide-react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";

const BUTTON_CLASS =
  "group w-full flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition-colors hover:border-white/40 focus:border-rc-yellow focus-visible:ring-2 focus-visible:ring-rc-yellow/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent data-[open]:border-rc-yellow";

const OPTIONS_CLASS =
  "absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/25 bg-gradient-to-b from-[#1f3f7a]/85 to-[#1a3368]/85 backdrop-blur-[6px] shadow-lg shadow-black/30 outline-none";

const OPTION_CLASS =
  "group flex cursor-pointer items-center gap-3 px-5 py-4 text-sm text-white rounded-md transition-colors hover:bg-white/5 data-[focus]:bg-white/5 data-[focus]:text-white data-[selected]:bg-white/[0.08] data-[selected]:text-white";

const OPTION_EMPTY_CLASS =
  "group flex cursor-pointer items-center gap-3 px-5 py-4 text-sm text-white/40 rounded-md transition-colors hover:bg-white/5 hover:text-white/70 data-[focus]:bg-white/5 data-[focus]:text-white/70";

interface SelectFieldProps {
  value: string | undefined;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
  "aria-labelledby"?: string;
}

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "-- Sélectionnez --",
  allowEmpty = false,
  emptyLabel = "-- Optionnel --",
  "aria-labelledby": ariaLabelledby,
}: SelectFieldProps): React.ReactElement {
  const safeValue = value ?? "";
  return (
    <Listbox value={safeValue} onChange={onChange}>
      <div className="relative">
        <ListboxButton
          aria-labelledby={ariaLabelledby}
          className={BUTTON_CLASS}
        >
          <span className={safeValue ? "text-white" : "text-white/40"}>
            {safeValue || (allowEmpty ? emptyLabel : placeholder)}
          </span>
          <ChevronDown
            className="h-4 w-4 text-white/60 transition-transform duration-200 group-data-[open]:rotate-180"
            aria-hidden="true"
          />
        </ListboxButton>

        <ListboxOptions className={OPTIONS_CLASS} transition>
          <div className="origin-top transition duration-150 ease-out data-[closed]:scale-y-95 data-[closed]:opacity-0 py-2 px-2 space-y-1">
            {allowEmpty && (
              <ListboxOption value="" className={OPTION_EMPTY_CLASS}>
                <span className="h-4 w-4 flex-shrink-0" />
                <span>{emptyLabel}</span>
              </ListboxOption>
            )}
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className={OPTION_CLASS}
              >
                <Check
                  className="h-4 w-4 flex-shrink-0 text-rc-yellow opacity-0 group-data-[selected]:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
                <span>{option}</span>
              </ListboxOption>
            ))}
          </div>
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
