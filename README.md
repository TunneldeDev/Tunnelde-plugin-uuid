# UUID Generator

Generate batches of cryptographically random UUID v4 values in lowercase (default) or uppercase.

An independent official Tunnelde plugin. Requires Node.js 22 or later. No npm installation, network access, filesystem access or clipboard permission is required. Install the folder or its release ZIP in Tunnelde, then open the plugin view.

All fields and results remain local. Results are copied only when you click the host's Copy result button. Switching workspace tabs preserves unfinished input and the last result; closing the tab discards that draft.

## Commands

- `generate`: Generate UUIDs

## Runtime protocol

JSON-RPC 2.0 over newline-delimited stdin/stdout. Supports initialize, view.render (main, optional locale), command.run (command, optional input), and shutdown. UI is declarative JSON rendered by the host; this plugin never sends HTML.

## License

GPL-3.0-only. Copyright (C) 2026 TunneldeDev.

## Independent development

`npm ci --ignore-scripts` → `npm run build` → `npm run verify` → `npm run package`. Push a matching `vX.Y.Z` tag to publish this plugin independently. The Hub distributes the release URL and SHA-256; it does not build this package.
