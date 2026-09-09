'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

// Pageview tracking for the Koko Analytics install on the WordPress site at
// https://brewser.io. The docs are a static export served from a separate
// origin (docs.brewser.io), but they feed the SAME Koko dashboard — so instead
// of loading the WordPress tracker script we post the collect beacon directly.
//
// Config values below were captured verbatim from window.koko_analytics on the
// live brewser.io HTML (url / method / use_cookie). Since use_cookie is true,
// the "m" flag is "c" (matches the official script's `use_cookie ? 'c' : method[0]`).
const COLLECT_URL = 'https://brewser.io/koko-analytics-collect.php';
const METHOD_FLAG = 'c';
const DOCS_HOST = 'docs.brewser.io';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

// "/" would merge with the WordPress homepage in the shared dashboard, and
// "/docs" is already a real docs page — so give the docs landing its own key.
// Every other pathname is sent unchanged (no basePath/trailingSlash in
// next.config, so usePathname always yields a clean, leading-slash path).
function mapPath(pathname: string): string {
  return pathname === '/' ? '/docs-home' : pathname;
}

export function KokoAnalytics() {
  const pathname = usePathname();
  // Persists across client-side route changes (this component lives in the root
  // layout, which never unmounts), so we can distinguish the first hit.
  const isFirstHit = useRef(true);

  useEffect(() => {
    // Only the production docs host. Skips localhost and preview deploys; the
    // server already filters bots, so we just add the headless/automation guard.
    if (location.hostname !== DOCS_HOST) return;
    if (navigator.webdriver) return;
    if (typeof navigator.sendBeacon !== 'function') return;

    const body = new URLSearchParams();
    body.set('action', 'koko_analytics_collect');
    body.set('pa', mapPath(pathname));
    body.set('po', '0');

    if (isFirstHit.current) {
      // document.referrer never updates on SPA navigations, so it's only
      // meaningful on the initial load — and only when it points at an external
      // site (an internal docs referrer would inflate referrer counts).
      const ref = document.referrer;
      body.set('r', ref && !ref.startsWith(location.origin) ? ref : '');

      // Forward campaign params on the first hit, matching the official tracker
      // (which reads them from both the query string and the hash).
      const query = new URLSearchParams(location.search);
      const hash = new URLSearchParams(location.hash.slice(1));
      for (const key of UTM_KEYS) {
        const value = query.get(key) ?? hash.get(key);
        if (value) body.set(key, value);
      }
    } else {
      body.set('r', '');
    }

    body.set('m', METHOD_FLAG);

    navigator.sendBeacon(COLLECT_URL, body);
    isFirstHit.current = false;
  }, [pathname]);

  return null;
}
