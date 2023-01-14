import { useSyncExternalStore } from "react";

let filters = [];
const listeners = new Set();

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

function getSnapshot() {
  return filters;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function toggle(item) {
  if (filters.includes(item)) {
    filters = filters.filter((v) => v !== item);
  } else {
    filters = [...filters, item];
  }
  emitChange();
}

function reset() {
  filters = [];
  emitChange();
}

export function useFilters() {
  const filters = useSyncExternalStore(subscribe, getSnapshot);
  return [filters, toggle, reset];
}
