import {useState} from 'react';
import {ArrowUpRight, Smartphone} from 'lucide-react';
import {SiteLayout} from '../components/SiteLayout';
import {ResilientImage} from '../components/ResilientImage';
import {ConceptPreviewModal} from '../components/ConceptPreviewModal';
import {
  CONCEPT_PROJECTS,
  CONTACT_MAILTO,
  type ConceptProject,
} from '../data/portfolioData';

type FilterValue = 'all' | ConceptProject['category'];

const FILTER_OPTIONS: {value: FilterValue; label: string}[] = [
  {value: 'all', label: 'All concepts'},
  {value: 'preorder', label: 'Bakery preorder'},
  {value: 'registration', label: 'Workshop registration'},
];

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [previewProjectId, setPreviewProjectId] = useState<
    ConceptProject['id'] | null
  >(null);

  const visibleProjects =
    activeFilter === 'all'
      ? CONCEPT_PROJECTS
      : CONCEPT_PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <SiteLayout
      activePage="work"
      contactHeading="Want a focused page like these for your business?"
      contactSubcopy="Share a quick outline of your offer, preorder menu, or upcoming workshop. I will reply with a straightforward plan and timeline."
    >
      {/* Work Page Header */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium text-zinc-500">
            Work · Concept projects by Tobi Ade
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.08] font-semibold tracking-tight text-[#111113] [text-wrap:balance]">
            Two small business landing page concepts
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
            Both projects below are concept studies designed to show how clear
            hierarchy and phone-first layouts make it easy for local customers
            to place a preorder or reserve a workshop seat.
          </p>
        </div>

        {/* Interactive filter tabs */}
        <div
          role="tablist"
          aria-label="Filter concept projects"
          className="mt-8 inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-zinc-100 border border-zinc-200/80"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#111113] shadow-xs'
                    : 'text-zinc-600 hover:text-[#111113]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Concept Case Studies */}
      <section
        aria-label="Concept projects"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 space-y-14 sm:space-y-20"
      >
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="pt-10 sm:pt-14 border-t border-zinc-200 scroll-mt-20"
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500">
              <span className="font-mono tabular-nums text-zinc-400">
                {project.number}
              </span>
              <span>Concept project</span>
              <span aria-hidden="true">·</span>
              <span>{project.offerType}</span>
              <span aria-hidden="true">·</span>
              <span>{project.clientName}</span>
            </div>

            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 lg:items-stretch">
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 aspect-4/3 lg:aspect-auto lg:h-full">
                  <ResilientImage
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fallbackTitle={project.clientName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#111113] [text-wrap:balance]">
                    {project.categoryLabel}: {project.title}
                  </h2>
                  <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                    {project.subtitle}
                  </p>

                  <div className="mt-6 space-y-4 text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                    <div>
                      <h3 className="text-xs font-semibold text-[#111113] mb-1">
                        The problem
                      </h3>
                      <p>{project.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-[#111113] mb-1">
                        Phone-first approach
                      </h3>
                      <p>{project.approach}</p>
                    </div>
                  </div>

                  <ul className="mt-5 pt-5 border-t border-zinc-200/80 space-y-2 text-sm text-zinc-700">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-6 border-t border-zinc-200 space-y-5">
                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.mobileMetrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="text-xs text-zinc-500">
                          {metric.label}
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium text-[#111113]">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setPreviewProjectId(project.id)}
                      className="min-h-[46px] px-5 py-2.5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#111113] text-white text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Preview phone layout</span>
                    </button>

                    <a
                      href={CONTACT_MAILTO}
                      className="min-h-[44px] px-1 inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Email me about a project</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <ConceptPreviewModal
        projectId={previewProjectId}
        onClose={() => setPreviewProjectId(null)}
      />
    </SiteLayout>
  );
}
