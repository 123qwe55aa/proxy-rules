# Proxy Rules

Shadowrocket proxy rules configuration.

- `default.conf` — Main config (Shadowrocket format: General + Rule + Host + URL Rewrite)

## Usage

1. Open Shadowrocket on iOS
2. Config → Import from URL (or AirDrop / iCloud)
3. Enable VPN

## Structure

- **DIRECT** — Mainland China sites, Apple services, LAN, Tailscale, custom VPS
- **PROXY** — Blocked services (Google, GitHub, OpenAI, Telegram, Discord, etc.)
- **FINAL** — PROXY (default route out)
