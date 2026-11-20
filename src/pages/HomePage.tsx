import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {SiteLayout} from '../components/SiteLayout';
import {ResilientImage} from '../components/ResilientImage';
import {
  CONCEPT_PROJECTS,
  CONTACT_MAILTO,
  PROCESS_STEPS,
  SERVICE_OFFERINGS,
  STUDIO_FACTS,
} from '../data/portfolioData';

export function HomePage() {
  const featuredConcept = CONCEPT_PROJECTS[0];

  return (
    <SiteLayout
      activePage="home"
      contactHeading="Tell me what your business needs next"
      contactSubcopy="Whether you are launching a brand-new one-page site or refreshing an older landing page so it works better on phones, send a short note and I will reply with scope and timing."
    >
      {/* Hero Section: Mobile-first stack -> Desktop 2-column stretch split */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-zinc-500">
              Tobi Ade · Freelance web designer · Phone-first layouts
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.06] font-semibold tracking-tight text-[#111113] [text-wrap:balance]">
              Landing pages for small businesses
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              I design and build clear new one-page sites and landing page
              refreshes for neighborhood shops, independent studios, and local
              founders—starting with the phone layout where most of your
              customers find you.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <a
                href={CONTACT_MAILTO}
                className="min-h-[48px] px-6 py-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] text-white text-sm sm:text-base font-medium hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Email me about a project</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="./work.html"
                className="min-h-[44px] px-1 inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm sm:text-base font-medium text-[#111113] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
              >
                <span>View concept work</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <figure className="w-full rounded-2xl overflow-hidden border border-zinc-200 bg-white flex flex-col">
              <div className="aspect-4/3 lg:aspect-auto lg:flex-1 bg-zinc-100 overflow-hidden">
                <ResilientImage
                  src={featuredConcept.imageSrc}
                  alt={featuredConcept.imageAlt}
                  fallbackTitle={featuredConcept.clientName}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-4 sm:p-5 border-t border-zinc-200 flex items-center justify-between gap-4 bg-white">
                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">
                    Concept project · Phone-first study
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#111113] truncate">
                    {featuredConcept.categoryLabel}
                  </p>
                </div>
                <a
                  href="./work.html#bakery-preorder"
                  className="min-h-[40px] inline-flex items-center gap-1 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Key Facts Strip: Full-width row below hero split */}
      <section
        aria-label="Key project details"
        className="border-y border-zinc-200 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STUDIO_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs text-zinc-500">{fact.label}</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#111113] tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services Section: New one-page sites & Landing page refreshes */}
      <section
        aria-labelledby="services-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium text-zinc-500">
            Services · Two focused ways to work together
          </p>
          <h2
            id="services-heading"
            className="mt-2.5 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#111113] [text-wrap:balance]"
          >
            Built to be read and acted on from a phone
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SERVICE_OFFERINGS.map((service) => (
            <article
              key={service.title}
              className="pt-6 border-t border-zinc-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#111113]">
                    <span className="font-mono text-sm font-normal text-zinc-400 mr-2 tabular-nums">
                      {service.number}
                    </span>
                    {service.title}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-zinc-500 font-mono tabular-nums">
                  Turnaround: {service.turnaround} · {service.scopeNote}
                </p>

                <p className="mt-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
                  {service.summary}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-zinc-200/80 pt-5 text-sm text-zinc-700">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Concept Work Teaser Section */}
      <section
        aria-labelledby="work-preview-heading"
        className="border-t border-zinc-200 bg-[#F4F4F5]/70"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-medium text-zinc-500">
                Work preview · Concept projects
              </p>
              <h2
                id="work-preview-heading"
                className="mt-2 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#111113] [text-wrap:balance]"
              >
                See how the layout structure works in practice
              </h2>
            </div>

            <a
              href="./work.html"
              className="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open Work page</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-9 sm:mt-11 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CONCEPT_PROJECTS.map((project) => (
              <a
                key={project.id}
                href={`./work.html#${project.id}`}
                className="group block rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 transition-colors"
              >
                <div className="aspect-4/3 bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fallbackTitle={project.clientName}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-xs text-zinc-500">
                    Concept project · {project.offerType}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-[#111113] group-hover:text-[#1D4ED8] transition-colors">
                    {project.categoryLabel}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {project.subtitle}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#111113] group-hover:text-[#1D4ED8] transition-colors">
                    <span>Read study &amp; preview phone layout</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Simple 3-Step Process */}
      <section
        aria-labelledby="process-heading"
        className="border-t border-zinc-200 bg-[#FAFAFA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <p className="text-xs font-medium text-zinc-500">
            Process · Plain steps, no agency overhead
          </p>
          <h2
            id="process-heading"
            className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#111113] [text-wrap:balance]"
          >
            From first email to live page
          </h2>

          <ol className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="pt-5 border-t border-zinc-200">
                <p className="font-mono text-xs text-zinc-400 tabular-nums">
                  {step.number}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-[#111113]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </SiteLayout>
  );
}
