export function deleteJWT() {
  document.cookie =
    "JWT=; Max-Age=0; path=/; domain=" + window.location.hostname;
}
