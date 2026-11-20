import {useEffect, useState, type FormEvent} from 'react';
import {CheckCircle2, Minus, Plus, RotateCcw, X} from 'lucide-react';
import {CONCEPT_PROJECTS, type ConceptProject} from '../data/portfolioData';
import {ResilientImage} from './ResilientImage';

interface ConceptPreviewModalProps {
  projectId: ConceptProject['id'] | null;
  onClose: () => void;
}

const BAKERY_MENU = [
  {
    id: 'sourdough',
    name: 'Country Sourdough',
    note: '900g naturally leavened boule',
    price: 9,
  },
  {
    id: 'cardamom',
    name: 'Cardamom Buns (4-pack)',
    note: 'Freshly ground green cardamom',
    price: 14,
  },
  {
    id: 'seeded-rye',
    name: 'Seeded Rye Loaf',
    note: 'Toasted sunflower & sesame crust',
    price: 10,
  },
];

const PICKUP_WINDOWS = ['Sat 9:00–10:30 AM', 'Sat 10:30 AM–12:00 PM'];

const WORKSHOP_SESSIONS = [
  {id: 'dec-6', date: 'Sat, Dec 6 · 10:00 AM', seatsLeft: 4},
  {id: 'dec-13', date: 'Sat, Dec 13 · 10:00 AM', seatsLeft: 6},
];

export function ConceptPreviewModal({
  projectId,
  onClose,
}: ConceptPreviewModalProps) {
  useEffect(() => {
    if (!projectId) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectId, onClose]);

  if (!projectId) return null;

  const project = CONCEPT_PROJECTS.find((item) => item.id === projectId);
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 bg-[#111113]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden my-auto">
        {/* Modal chrome */}
        <div className="px-4 py-3 border-b border-zinc-200 bg-[#FAFAFA] flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-zinc-500 truncate">
              Phone layout preview · 390px
            </p>
            <h3
              id="preview-modal-title"
              className="font-display text-sm font-semibold text-[#111113] truncate"
            >
              {project.clientName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close phone layout preview"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-600 hover:text-[#111113] hover:bg-zinc-200/70 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable phone viewport */}
        <div className="max-h-[78vh] overflow-y-auto">
          {projectId === 'bakery-preorder' ? (
            <BakeryPhonePreview project={project} />
          ) : (
            <WorkshopPhonePreview project={project} />
          )}
        </div>
      </div>
    </div>
  );
}

function BakeryPhonePreview({project}: {project: ConceptProject}) {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    sourdough: 1,
    cardamom: 1,
    'seeded-rye': 0,
  });
  const [pickupSlot, setPickupSlot] = useState(PICKUP_WINDOWS[0]);
  const [customerName, setCustomerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const itemCount = Object.values(quantities).reduce((sum, n) => sum + n, 0);
  const total = BAKERY_MENU.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0
  );

  function updateQty(id: string, delta: number) {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.min(6, (prev[id] ?? 0) + delta)),
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (itemCount === 0) return;
    setSubmitted(true);
  }

  function handleReset() {
    setQuantities({sourdough: 1, cardamom: 1, 'seeded-rye': 0});
    setPickupSlot(PICKUP_WINDOWS[0]);
    setCustomerName('');
    setSubmitted(false);
  }

  return (
    <div className="p-5 space-y-5 bg-white">
      <div>
        <p className="text-xs text-zinc-500">
          Saturday bake drop · Order by Thu 6:00 PM
        </p>
        <h4 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#111113]">
          Hearth &amp; Crumb
        </h4>
        <p className="mt-1 text-sm text-zinc-600">
          Small-batch sourdough baked Saturday morning for pickup on Elm Street.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border border-zinc-200 aspect-4/3 bg-zinc-100">
        <ResilientImage
          src={project.imageSrc}
          alt={project.imageAlt}
          fallbackTitle={project.clientName}
          className="w-full h-full object-cover"
        />
      </div>

      {submitted ? (
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-[#111113]">
                Preorder preview saved
              </p>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                {customerName.trim() ? `${customerName.trim()}, your` : 'Your'}{' '}
                {itemCount} item{itemCount === 1 ? '' : 's'} (
                <span className="font-mono tabular-nums">${total}</span>) would
                be held for {pickupSlot}. This is an interactive concept preview
                with no payment processed.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-3 py-2 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-[#111113] border border-zinc-200 rounded-lg bg-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset preview</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs font-medium text-zinc-500">
              1. Pick your loaves
            </p>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {BAKERY_MENU.map((item) => {
                const qty = quantities[item.id] ?? 0;
                return (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#111113]">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {item.note} ·{' '}
                        <span className="font-mono tabular-nums text-zinc-700">
                          ${item.price}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        aria-label={`Remove one ${item.name}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-5 text-center text-sm font-mono tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        aria-label={`Add one ${item.name}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-zinc-200 text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-medium text-zinc-500">
              2. Saturday pickup window
            </p>
            <div className="grid grid-cols-1 gap-2">
              {PICKUP_WINDOWS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPickupSlot(slot)}
                  className={`min-h-[44px] px-3.5 py-2 text-left text-sm rounded-lg border transition-colors cursor-pointer ${
                    pickupSlot === slot
                      ? 'border-[#1D4ED8] bg-[#1D4ED8]/5 text-[#111113] font-medium'
                      : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bakery-name"
              className="block text-xs font-medium text-zinc-500"
            >
              3. Name for the pickup bag
            </label>
            <input
              id="bakery-name"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="e.g. Jordan Mensah"
              className="w-full min-h-[44px] px-3.5 rounded-lg border border-zinc-200 text-sm text-[#111113] placeholder:text-zinc-400"
            />
          </div>

          <button
            type="submit"
            disabled={itemCount === 0}
            className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1E40AF] disabled:bg-zinc-300 disabled:text-zinc-500 transition-colors cursor-pointer"
          >
            {itemCount === 0
              ? 'Select at least one loaf'
              : `Reserve pickup · $${total}`}
          </button>
        </form>
      )}
    </div>
  );
}

function WorkshopPhonePreview({project}: {project: ConceptProject}) {
  const [selectedSession, setSelectedSession] = useState(
    WORKSHOP_SESSIONS[0].id
  );
  const [seats, setSeats] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');
  const [registered, setRegistered] = useState(false);

  const seatPrice = 68;
  const session =
    WORKSHOP_SESSIONS.find((item) => item.id === selectedSession) ??
    WORKSHOP_SESSIONS[0];

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setRegistered(true);
  }

  function handleReset() {
    setSelectedSession(WORKSHOP_SESSIONS[0].id);
    setSeats(1);
    setAttendeeName('');
    setRegistered(false);
  }

  return (
    <div className="p-5 space-y-5 bg-white">
      <div>
        <p className="text-xs text-zinc-500">
          2.5-hour beginner class · Clay &amp; kiln firing included
        </p>
        <h4 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#111113]">
          Hand-Built Stoneware Mugs
        </h4>
        <p className="mt-1 text-sm text-zinc-600">
          Shape two stoneware mugs by hand in our sunlit Saturday studio. Small
          group capped at 8 makers.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border border-zinc-200 aspect-4/3 bg-zinc-100">
        <ResilientImage
          src={project.imageSrc}
          alt={project.imageAlt}
          fallbackTitle={project.clientName}
          className="w-full h-full object-cover"
        />
      </div>

      {registered ? (
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
          <div className="flex items-start gap-2.5">
            <CheckCircle2
              className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-[#111113]">
                Seat reservation preview confirmed
              </p>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                {attendeeName.trim() ? `${attendeeName.trim()} — ` : ''}
                {seats} seat{seats === 1 ? '' : 's'} held for {session.date} (
                <span className="font-mono tabular-nums">
                  ${seats * seatPrice}
                </span>
                ). This is an interactive concept preview with no real booking
                created.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-3 py-2 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-[#111113] border border-zinc-200 rounded-lg bg-white cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset preview</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
            <p className="text-xs font-medium text-zinc-500">
              1. Choose a Saturday session
            </p>
            <div className="grid grid-cols-1 gap-2">
              {WORKSHOP_SESSIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSession(item.id)}
                  className={`min-h-[44px] px-3.5 py-2.5 flex items-center justify-between gap-2 text-sm rounded-lg border transition-colors cursor-pointer ${
                    selectedSession === item.id
                      ? 'border-[#1D4ED8] bg-[#1D4ED8]/5 text-[#111113] font-medium'
                      : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <span>{item.date}</span>
                  <span className="text-xs font-mono tabular-nums text-zinc-500">
                    {item.seatsLeft} left
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-y border-zinc-200">
            <div>
              <p className="text-sm font-medium text-[#111113]">
                Number of seats
              </p>
              <p className="text-xs text-zinc-500 font-mono tabular-nums">
                ${seatPrice} per person
              </p>
            </div>
            <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg">
              {[1, 2].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSeats(count)}
                  className={`min-h-[36px] px-3.5 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    seats === count
                      ? 'bg-white text-[#111113] shadow-xs'
                      : 'text-zinc-600 hover:text-[#111113]'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="workshop-name"
              className="block text-xs font-medium text-zinc-500"
            >
              2. Your full name
            </label>
            <input
              id="workshop-name"
              type="text"
              value={attendeeName}
              onChange={(event) => setAttendeeName(event.target.value)}
              placeholder="e.g. Priya Okafor"
              className="w-full min-h-[44px] px-3.5 rounded-lg border border-zinc-200 text-sm text-[#111113] placeholder:text-zinc-400"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-[#1D4ED8] text-white text-sm font-medium hover:bg-[#1E40AF] transition-colors cursor-pointer"
          >
            Hold {seats} seat{seats === 1 ? '' : 's'} · ${seats * seatPrice}
          </button>
        </form>
      )}
    </div>
  );
}
