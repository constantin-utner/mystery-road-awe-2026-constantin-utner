// ---------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------

// Lives in its own module so people.js, timeline.js, and workspace.js
// can import it without a circular dependency on main.js
export default function navigateTo(viewName) {
    window.location.hash = viewName;
    // handleHashChange() will pick this up via the hashchange listener
}