import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { QSG_TECH_SPECS, TechSpecItem } from '../types/tourPro3';

const CATEGORIES: TechSpecItem['category'][] = [
  'Acoustics & Drivers',
  'Battery & Playtime',
  'Bluetooth & Connectivity',
  'Physical & Build',
];

export function TechSpecsSection() {
  const [viewMode, setViewMode] = useState<'table' | 'accordion'>('table');
  const [selectedCategory, setSelectedCategory] = useState<'All' | TechSpecItem['category']>('All');
  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Acoustics & Drivers': true,
    'Battery & Playtime': true,
    'Bluetooth & Connectivity': false,
    'Physical & Build': false,
  });

  const filteredSpecs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QSG_TECH_SPECS.filter((item) => {
      const catMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const textMatch =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [query, selectedCategory]);

  const toggleAccordion = (cat: string) => {
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <section id="specs" className="border-b border-white/10 bg-[#0A0A0B] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-medium tracking-wider text-[#FF5722] uppercase">
              03. Technical Specifications
            </p>
            <h2
              className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Verified specifications from the Tour Pro 3 guide.
            </h2>
            <p className="text-sm text-zinc-400">
              Complete acoustic, radio, battery, and physical ratings for TOUR PRO 3 earbuds and the
              TOUR PRO 3C Smart Charging Case™.
            </p>
          </div>

          {/* Table / Accordion View Switcher */}
          <div className="inline-flex rounded-lg border border-white/10 bg-[#141416] p-1 self-start">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'table' ? 'bg-[#FF5722] text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Data Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode('accordion')}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'accordion'
                  ? 'bg-[#FF5722] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Accordion
            </button>
          </div>
        </div>

        {/* Highlighted Core Spec Callouts */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#141416] p-5">
            <p className="text-xs text-zinc-400">Hybrid Driver Size</p>
            <p className="mt-1.5 font-mono text-base font-semibold text-white">
              10.2 mm Dynamic + 5.1 mm × 2.8 mm Balanced Armature
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#141416] p-5">
            <p className="text-xs text-zinc-400">Bluetooth Compatibility</p>
            <p className="mt-1.5 font-mono text-base font-semibold text-white">
              Bluetooth 5.3 (Earbuds &amp; Charging Case)
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#141416] p-5">
            <p className="text-xs text-zinc-400">Maximum Music Playtime</p>
            <p className="mt-1.5 font-mono text-base font-semibold text-white">
              Up to 11 hrs (Bluetooth on, ANC off)
            </p>
          </div>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {(['All', ...CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-black'
                    : 'bg-[#141416] text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter specs (e.g. 5.3, 11 hrs)"
              aria-label="Filter technical specifications"
              className="w-full rounded-lg border border-white/10 bg-[#141416] py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500 focus:border-[#FF5722] focus:outline-none"
            />
          </div>
        </div>

        {/* Table or Accordion Output */}
        {viewMode === 'table' ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#141416]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-medium text-zinc-400">
                  <th className="py-3.5 px-5">Specification</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5 text-right">Rated Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {filteredSpecs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 px-5 text-center text-zinc-400">
                      No specifications match &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredSpecs.map((row) => (
                    <tr
                      key={row.label}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="py-3.5 px-5 font-medium text-zinc-200">{row.label}</td>
                      <td className="py-3.5 px-5 text-xs text-zinc-400">{row.category}</td>
                      <td
                        className={`py-3.5 px-5 text-right font-mono text-xs sm:text-sm tabular-nums ${
                          row.highlight ? 'text-[#FF5722] font-semibold' : 'text-zinc-100'
                        }`}
                      >
                        {row.value}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {CATEGORIES.filter(
              (c) => selectedCategory === 'All' || selectedCategory === c
            ).map((category) => {
              const items = filteredSpecs.filter((s) => s.category === category);
              if (items.length === 0) return null;
              const isOpen = !!openCategories[category];
              return (
                <div
                  key={category}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#141416]"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(category)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display text-base font-bold text-white">
                        {category}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 tabular-nums">
                        {items.length} specs
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#FF5722]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 divide-y divide-white/10">
                      {items.map((item) => (
                        <div
                          key={item.label}
                          className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="text-sm text-zinc-300">{item.label}</span>
                          <span
                            className={`font-mono text-xs sm:text-sm tabular-nums ${
                              item.highlight ? 'text-[#FF5722] font-semibold' : 'text-white'
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
