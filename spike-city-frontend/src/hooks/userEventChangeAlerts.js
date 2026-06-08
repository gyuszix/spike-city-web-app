//frontend/src/hooks/userEventChangeAlerts.js

import { useEffect, useState, useCallback } from 'react';
import EventsDataService from '../services/events';

/**
 * Detects changes to attended events and keeps an "unseen" flag persisted
 * so the badge/banner survive route changes and future polls until cleared.
 */
const useEventChangeAlerts = (user) => {
  const [unread, setUnread] = useState(0);
  const [banner, setBanner] = useState(false);
  const [changedIds, setChangedIds] = useState([]);

  // Schema helpers
  const getUniqueKey = (e) => String(e?._id ?? e?.num ?? '');
  const getDetailId  = (e) => e?.num ?? null;
  const isAttending  = (e, uid) => Array.isArray(e?.attendees) && e.attendees.includes(uid);

  // No updatedAt -> fingerprint important fields
  const fingerprint = (e) =>
    JSON.stringify({
      date: e?.date,
      location: e?.location,
      address: e?.address,
      description: e?.description,
    });

  const runCheck = useCallback(async () => {
    if (!user?.sub) return;

    const uid = user.sub;
    const SNAP_KEY   = `vb:snapshot:${uid}`; // { [uniqueKey]: fingerprint }
    const INIT_KEY   = `vb:snapInit:${uid}`;
    const UNSEEN_KEY = `vb:unseen:${uid}`;   // { count:number, ids:string[] }

    // Always hydrate UI from persisted 'unseen' first
    const unseen = JSON.parse(localStorage.getItem(UNSEEN_KEY) || '{"count":0,"ids":[]}');
    setUnread(unseen.count || 0);
    setBanner((unseen.count || 0) > 0);
    setChangedIds(Array.isArray(unseen.ids) ? unseen.ids : []);

    // Fetch and diff
    const res = await EventsDataService.getEvents(uid);
    const list = Array.isArray(res?.data?.events) ? res.data.events
               : Array.isArray(res?.data)        ? res.data
               : [];
    const attending = list.filter((e) => isAttending(e, uid));

    // Build current snapshot
    const current = {};
    for (const e of attending) current[getUniqueKey(e)] = fingerprint(e);

    const prev   = JSON.parse(localStorage.getItem(SNAP_KEY) || '{}');
    const inited = localStorage.getItem(INIT_KEY) === '1';

    // First run: initialize, keep whatever unseen says
    if (!inited) {
      localStorage.setItem(SNAP_KEY, JSON.stringify(current));
      localStorage.setItem(INIT_KEY, '1');
      return;
    }

    // Diff: only if event existed before AND fingerprint changed
    const changedNow = [];
    for (const e of attending) {
      const key = getUniqueKey(e);
      if (Object.prototype.hasOwnProperty.call(prev, key) && prev[key] !== current[key]) {
        const num = getDetailId(e);
        if (num !== null && num !== undefined) changedNow.push(String(num));
      }
    }

    // Update snapshot immediately so we don't re-trigger on next poll
    localStorage.setItem(SNAP_KEY, JSON.stringify(current));

    if (changedNow.length > 0) {
      // Merge with existing unseen (so new changes accumulate)
      const mergedIds = Array.from(new Set([...(unseen.ids || []), ...changedNow]));
      const payload = { count: mergedIds.length, ids: mergedIds };
      localStorage.setItem(UNSEEN_KEY, JSON.stringify(payload));
      setUnread(payload.count);
      setBanner(payload.count > 0);
      setChangedIds(mergedIds);
    } else {
      // No new changes → keep whatever unseen already said (do NOT clear)
      setUnread(unseen.count || 0);
      setBanner((unseen.count || 0) > 0);
      setChangedIds(Array.isArray(unseen.ids) ? unseen.ids : []);
    }
  }, [user]);

  useEffect(() => {
    if (!user?.sub) return;

    // On mount, hydrate from unseen so UI is immediate
    const UNSEEN_KEY = `vb:unseen:${user.sub}`;
    const unseen = JSON.parse(localStorage.getItem(UNSEEN_KEY) || '{"count":0,"ids":[]}');
    setUnread(unseen.count || 0);
    setBanner((unseen.count || 0) > 0);
    setChangedIds(Array.isArray(unseen.ids) ? unseen.ids : []);

    let timer;
    (async () => { try { await runCheck(); } catch (e) { console.error('Alert check failed:', e); } })();
    timer = setInterval(() => {
      runCheck().catch((e) => console.error('Alert check failed:', e));
    }, 20000);

    return () => clearInterval(timer);
  }, [user, runCheck]);

  const markSeen = useCallback(() => {
    if (!user?.sub) return;
    const UNSEEN_KEY = `vb:unseen:${user.sub}`;
    localStorage.setItem(UNSEEN_KEY, JSON.stringify({ count: 0, ids: [] }));
    setUnread(0);
    setBanner(false);
    setChangedIds([]);
  }, [user]);

  return { unread, banner, changedIds, markSeen };
};

export default useEventChangeAlerts;