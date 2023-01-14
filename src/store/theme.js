import { useSyncExternalStore } from "react";

const loadTheme = (name) => {
  document.getElementById("theme-styles").href = `/themes/${name}.css`;
};

const init = () => {
  const value = localStorage.getItem("theme") ?? "light";
  loadTheme(value);
  return value;
};

let theme = init();
const listeners = new Set();

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

function getSnapshot() {
  return theme;
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setTheme(value) {
  localStorage.setItem("theme", value);
  loadTheme(value);
  theme = value;
  emitChange();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot);
  return [theme, setTheme];
}
