# 24h Analog Percent Clock

Single‑page analog clock that replaces hour numbers with your **fractional percentage sequence** values.

- **Inner ring (blue):** 0–11 (AM)
- **Outer ring (white):** 12–23 (PM)
- **Labels:** always **two decimal places**.
- **Hands:** normal **12‑hour** analog behavior.
- **Refresh:** redraw every **5 seconds**.

## Math (from your Desmos table)
For hour `h` (0–23), the label is:

- If `h = 0`, treat it as **24** for the label math.
- Denominator: `d = 25 - H` where `H = (h == 0 ? 24 : h)`
- Percent shown: `100 / d` (as a percent)

Examples:
- 0 → 100.00%
- 12 → 7.69%
- 15 → 10.00%
- 18 → 14.29%
- 21 → 25.00%
- 23 → 50.00%

## Run locally (HTTPS on port 8443)
This uses a tiny Node HTTPS static server (self‑signed cert), so it works well on phones on the same LAN.

1) Create the dev cert (one time):

```powershell
powershell -ExecutionPolicy Bypass -File .\make-cert.ps1
```

2) Start the server:

```powershell
node .\server.js
```

3) Open:
- Desktop: `https://localhost:8443/clock.html`
- Phone (same Wi‑Fi): `https://<your-lan-ip>:8443/clock.html`

> Note: Your browser will warn about the self‑signed certificate; proceed.

## Files
- `clock.html` — the clock
- `server.js` — HTTPS static server
- `make-cert.ps1` — generates `cert/devcert.pfx` (ignored by git)
