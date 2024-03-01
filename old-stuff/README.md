# Notion Tools

This project contains some additions with real data which can be embedded in Notion.

## Endpoints

`/weather/{placename}/{lat}/{lon}` returns a weather widget for the specified place ready to use in Notion, respects
dark / light mode.

## Development

This project uses `vite` and `pnpm` with no dependencies to other local systems and doesn't need any api keys. You need
an internet connection to access some systems used in the endpoints.

Development with `pnpm install && pnpm run dev`
