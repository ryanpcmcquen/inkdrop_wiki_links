## v0.1.0 - First Release!

-   Working links.
-   Links that can not be found by title search, are created.

## v0.1.8 - Lots of clean up and code reduction.

-   Mobile should work once merged as well now!

## v0.1.10 - More cleanup and some bug fixes.

-   There were some issues with anchor tags, we switched to using a span element instead.
-   General code cleanup.

## v0.1.11 - Standardize more code and add a mobile workaround.

-   This adds preliminary mobile support. Mobile only does a search for the note at this time.
-   More of the code was standardized for consistentency and readability.

## v0.1.12 - Remove old cruft.

-   Cleared out some old files that didn't need to be there.

## v0.1.14 - Switch to editor mode after new note creation.

-   We also pass less inherited props to the new note, resulting in less data you may not want transferring (such as status or tags).

## v0.2.1 - Autocomplete!

-   Many thanks to @ebigram for bringing autocomplete to this plugin. Huzzah!

## v0.2.3 - Cleanup and slight change in new note behavior.

-   Cleaned up some code and made the build process nicer for the TypeScript that is here.
-   There is new behavior now in regards to notes that are created when they don't exist. New notes focus and switch to editor mode, existing notes remain in preview mode.
