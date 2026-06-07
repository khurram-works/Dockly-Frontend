const SESSION_COOKIE = "dockly_session";
const MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export function setSessionMarker() {
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function clearSessionMarker() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
