# Memory Flip
A small browser game of recall. Flip two cards, find matching fruit pairs, and finish in as few moves as possible.

## Play
Extract the ZIP and open index.html in a modern browser. Keep style.css, core.js and app.js alongside it. No install, build, account, or internet connection is needed after downloading.

- Easy: 6 pairs; Medium: 8 pairs; Hard: 12 pairs.
- Each two-card attempt counts as one move.
- Different cards turn back after one second; input is locked during that moment.
- Matching cards stay face up.
- The timer starts with your first card and continues in background tabs and while viewing instructions.
- New game or changing difficulty discards the current round.
- Best moves are stored separately per difficulty in browser localStorage. Clearing site data, changing browser/address, or private browsing can reset records.
- Use Tab and Enter/Space to play by keyboard. Reduced-motion preferences disable the flip animation.
- Card artwork uses system emoji, which can look different across devices.

## Publish on GitHub Pages
Upload this folder's contents to a repository, including .nojekyll.
In Settings > Pages, select Deploy from a branch, main, and / (root).
Use the exact website URL shown after deployment.

Suggested description:
A responsive memory card game with CSS flip animations, three difficulty levels, a timer, and local personal bests.

## Development
Vanilla HTML, CSS and JavaScript; no dependencies.
Run: node core.test.cjs
Tests cover pair distribution, duplicate picks, mismatch locking, matched cards and win scoring. JavaScript syntax was checked. Full visual and browser interaction testing has not been completed.

## Privacy
No network requests, analytics, or accounts. Only best move counts are persisted locally.

## License
MIT. See LICENSE.
