import { createContext, useContext } from "react";

// Defines which values and functions the Context makes available to child components.
type BookmarkContextValue = {
  bookmarkIds: string[];
  toggleBookmark: (evidenceId: string) => void;
};

// Creates the Context. The Provider will supply its values to child components.
// Without a Provider, the Context value is undefined.
export const BookmarkContext = createContext<BookmarkContextValue | undefined>(
  undefined,
);

// Custom hook that lets child components access the Context using useBookmarks().
// Throws an error if the component is not wrapped in a BookmarkProvider.
export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (context === undefined) {
    throw new Error("useBookmarks must be used inside a BookmarkProvider");
  }

  return context;
}
