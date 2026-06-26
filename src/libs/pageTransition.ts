const TRANSITION_STATE_KEY = "__portfolio_page_transition__";

export const PAGE_TRANSITION_TOTAL_MS = 1200;
export const PAGE_ENTER_LEAD_MS = 100;
export const PAGE_ENTER_FALLBACK_MS = 100;

type TransitionState = {
  startedAt: number;
  totalMs: number;
  leadMs: number;
};

export const markPageTransitionStart = (
  totalMs: number = PAGE_TRANSITION_TOTAL_MS,
  leadMs: number = PAGE_ENTER_LEAD_MS,
) => {
  if (typeof window === "undefined") return;

  (window as Window & { [TRANSITION_STATE_KEY]?: TransitionState })[
    TRANSITION_STATE_KEY
  ] = {
    startedAt: performance.now(),
    totalMs,
    leadMs,
  };
};

export const consumePageTransitionEnterDelay = (
  fallbackMs: number = PAGE_ENTER_FALLBACK_MS,
) => {
  if (typeof window === "undefined") {
    return fallbackMs / 1000;
  }

  const stateWindow = window as Window & { [TRANSITION_STATE_KEY]?: TransitionState };
  const state = stateWindow[TRANSITION_STATE_KEY];

  if (!state) {
    return fallbackMs / 1000;
  }

  delete stateWindow[TRANSITION_STATE_KEY];

  const elapsedMs = performance.now() - state.startedAt;
  const remainingMs = Math.max(0, state.totalMs - elapsedMs - state.leadMs);

  return remainingMs / 1000;
};
