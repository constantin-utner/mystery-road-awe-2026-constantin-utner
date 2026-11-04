import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { loadBookmarksFromStorage, saveBookmarksToStorage } from "../storage";

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

type BookmarkProviderProps = {
  children: ReactNode;
};

// Provider component that manages the bookmark state and provides it to child components.
export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarkIds, setBookmarkIds] = useState<string[]>(
    loadBookmarksFromStorage,
  );

  function toggleBookmark(evidenceId: string) {
    const nextBookmarkIds = bookmarkIds.includes(evidenceId)
      ? bookmarkIds.filter((id) => id !== evidenceId)
      : [...bookmarkIds, evidenceId];

    setBookmarkIds(nextBookmarkIds);
    saveBookmarksToStorage(nextBookmarkIds);
  }

  return (
    <BookmarkContext.Provider value={{ bookmarkIds, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

// Custom hook (Consumer) that lets child components access the Context using useBookmarks().
// Throws an error if the component is not wrapped in a BookmarkProvider.
export function useBookmarks() {
  const context = useContext(BookmarkContext);

  if (context === undefined) {
    throw new Error("useBookmarks must be used inside a BookmarkProvider");
  }

  return context;
}
