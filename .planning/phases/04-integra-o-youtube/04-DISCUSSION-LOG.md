# Phase 4: Integração YouTube - Discussion Log

**Date:** 2026-09-29
**Mode:** --auto

This is a record of options presented and selected. It is for human retrospective only.

---

### Area: Fallback Strategy Details
- **Options presented:**
  - A simple stylized card matching the site's design system, linking directly to the channel URL. (Recommended)
  - A text-only link to minimize visual impact.
- **Selected:** A simple stylized card matching the site's design system, linking directly to the channel URL. (auto-selected)

### Area: "Assistir ao vivo" Hero CTA Behavior
- **Options presented:**
  - Open directly in a new tab (`target="_blank"`) to minimize friction for users wanting to watch. (Recommended)
  - Scroll down to the YouTube section first.
- **Selected:** Open directly in a new tab (`target="_blank"`) to minimize friction for users wanting to watch. (auto-selected)

### Area: YouTube API Service Location
- **Options presented:**
  - In a dedicated service file `lib/youtube.ts` to keep components clean and testable. (Recommended)
  - Inline within the Server Component.
- **Selected:** In a dedicated service file `lib/youtube.ts` to keep components clean and testable. (auto-selected)

### Area: RSS Parsing Library
- **Options presented:**
  - Native fetch with lightweight regex/string matching since we only need basic video IDs and titles, avoiding heavy dependencies. (Recommended)
  - Install an external library like `rss-parser`.
- **Selected:** Native fetch with lightweight regex/string matching since we only need basic video IDs and titles, avoiding heavy dependencies. (auto-selected)
