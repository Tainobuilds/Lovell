import { ViewTransition } from "react";

/**
 * Templates remount on every navigation, so the page content gets an
 * enter/exit "cut" (see globals.css → View transitions). The header is
 * anchored separately so it never moves. Browsers without View Transitions
 * support simply navigate without the animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="cut-in" exit="cut-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
