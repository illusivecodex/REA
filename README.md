# Illusive Studio — Interactive Portfolio Index

A Vite-powered interactive portfolio surface for Ian Lester Eclevia / Illusive Studio, using the real services, stack, skills, work, and contact details from [illusivestudio.site](https://illusivestudio.site/).

## Run

```bash
npm install
npm run dev
```

## Search behavior

- Open the palette with the search button or `Cmd/Ctrl + K`.
- Search titles, descriptions, and tags.
- Use Up/Down to move through matches and Enter to jump to a chapter.
- Scroll or use the field map to move through the cinematic sections.

The reference site uses scroll-driven chapters, an overlay chapter menu, a briefing form, and a Three.js scene; its public HTML does not expose a conventional content-search endpoint. This project keeps the chapter/overlay language and adds a local indexed search layer for the project content.