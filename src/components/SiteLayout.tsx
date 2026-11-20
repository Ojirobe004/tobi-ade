import {useState, type ReactNode} from 'react';
import {ArrowUpRight, Check, Copy} from 'lucide-react';
import {CONTACT_EMAIL, CONTACT_MAILTO} from '../data/portfolioData';

interface SiteLayoutProps {
  activePage: 'home' | 'work';
  contactHeading: string;
  contactSubcopy: string;
  children: ReactNode;
}

export function SiteLayout({
  activePage,
  contactHeading,
  contactSubcopy,
  children,
}: SiteLayoutProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard permissions are blocked inside an iframe
      const textarea = document.createElement('textarea');
      textarea.value = CONTACT_EMAIL;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111113]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#111113] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Strict 3-zone mobile-first top bar (h-16 keeps sticky height well under 15% on phones) */}
      <header className="sticky top-0 z-40 h-16 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text wordmark */}
          <a
            href="./index.html"
            className="font-display text-lg font-semibold tracking-tight text-[#111113] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 min-h-[44px] inline-flex items-center"
          >
            Tobi Ade
          </a>

          {/* Zone 2: Clean typography Home & Work links */}
          <nav
            aria-label="Primary"
            className="flex items-center gap-5 sm:gap-8 text-sm"
          >
            <a
              href="./index.html"
              aria-current={activePage === 'home' ? 'page' : undefined}
              className={`min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 transition-colors ${
                activePage === 'home'
                  ? 'font-semibold text-[#111113] border-b-2 border-[#1D4ED8]'
                  : 'font-medium text-zinc-600 hover:text-[#111113]'
              }`}
            >
              Home
            </a>
            <a
              href="./work.html"
              aria-current={activePage === 'work' ? 'page' : undefined}
              className={`min-h-[44px] inline-flex items-center whitespace-nowrap shrink-0 transition-colors ${
                activePage === 'work'
                  ? 'font-semibold text-[#111113] border-b-2 border-[#1D4ED8]'
                  : 'font-medium text-zinc-600 hover:text-[#111113]'
              }`}
            >
              Work
            </a>
          </nav>

          {/* Zone 3: Single primary action */}
          <div className="shrink-0">
            <a
              href={CONTACT_MAILTO}
              className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-4 py-2 inline-flex items-center justify-center rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
            >
              Email me
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        {children}

        {/* Shared direct contact band */}
        <section
          aria-labelledby="contact-heading"
          className="border-t border-zinc-200 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-zinc-500 mb-3">
                Direct inquiry · Replies within one business day
              </p>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#111113] [text-wrap:balance]"
              >
                {contactHeading}
              </h2>
              <p className="mt-4 text-base text-zinc-600 leading-relaxed">
                {contactSubcopy}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <a
                  href={CONTACT_MAILTO}
                  className="min-h-[48px] px-6 py-3 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] text-white text-sm sm:text-base font-medium hover:bg-[#1E40AF] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Email me about a project</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[48px] px-4 py-3 inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-[#FAFAFA] text-zinc-800 text-sm font-medium hover:border-zinc-300 hover:bg-zinc-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                      <span>Copied {CONTACT_EMAIL}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                      <span className="font-mono text-xs sm:text-sm">
                        {CONTACT_EMAIL}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet footer with Home, Work, and direct email link */}
      <footer className="border-t border-zinc-200 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-zinc-600">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display font-semibold text-[#111113]">
              Tobi Ade
            </span>
            <span aria-hidden="true" className="text-zinc-300">
              ·
            </span>
            <span>Freelance web designer</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="./index.html"
              className="min-h-[40px] inline-flex items-center hover:text-[#111113] transition-colors whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="./work.html"
              className="min-h-[40px] inline-flex items-center hover:text-[#111113] transition-colors whitespace-nowrap"
            >
              Work
            </a>
            <a
              href={CONTACT_MAILTO}
              className="min-h-[40px] inline-flex items-center text-[#1D4ED8] hover:text-[#1E40AF] font-medium transition-colors whitespace-nowrap"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
