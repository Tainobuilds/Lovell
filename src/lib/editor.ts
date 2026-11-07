/**
 * The editor is available in development (local file storage) and in
 * production only once GitHub storage is configured. Local storage can't work
 * on a deployed site (its file system is read-only), so it is hidden there.
 */
export function editorEnabled() {
  return process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";
}
