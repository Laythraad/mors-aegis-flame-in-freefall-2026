# Coolify backup deployment runbook

This runbook is for the MORS AEGIS project team. It covers the separate public, read-only copy built from this repository. The application has no production database: PSI tables, reports, and model assets ship with the source.

## Build configuration

Configure the Coolify application to use:

- Repository: `Laythraad/mors-aegis-flame-in-freefall-2026` (new competition-ready backup repository)
- Branch: `main`
- Build method: the root `Dockerfile`
- Container port: `4173`
- Health check: `GET /healthz` on port `4173` (the Docker image includes `curl` for Coolify's probe).

The Dockerfile binds inside the container to `0.0.0.0:4173`, enables the guarded network binding, and runs Node as the unprivileged `node` user. Keep the application behind Coolify's proxy; do not publish port `4173` directly on the host.

## Runtime environment

Set these values in Coolify's private environment settings, never in GitHub:

| Variable | Value |
| --- | --- |
| `MORS_PUBLIC_READONLY` | `1` |
| `MORS_ACCESS_TOKEN` | Leave unset for this public judges' copy. With read-only mode enabled, pages and GET APIs are public; only the bounded Copilot POST is allowed. |
| `MORS_TRUSTED_ORIGINS` | Comma-separated exact HTTPS origins for the Coolify app host and the public Cloudflare hostname, with no paths or wildcards. |
| `MORS_COOKIE_SECURE` | `1` when the app is accessed through HTTPS. |
| `MORS_OLLAMA_BASE_URL` | `http://100.93.0.64:11434` for the current Windows RTX 4060 PC, reachable privately over Tailscale. This endpoint has no API authentication; keep it on the tailnet and never publish port `11434` publicly. |
| `MORS_OLLAMA_MODEL` | `qwen2.5:3b` (the model already installed on the AI PC). |
| `GEMINI_API_KEY` | Optional alternative provider. Store it only as a locked server-side secret; never put it in Git or a browser bundle. When Ollama is configured, the app prefers Ollama. |

The public-only server permits only the same-origin, rate-limited `POST /api/copilot` research request; all other mutation `POST` APIs remain blocked. Copilot sends only the PSI-69 summary and question-relevant rows over Tailscale to Ollama. The Windows AI PC and Ollama must be running for generated answers; a deterministic evidence summary is shown when they are offline. Do not place private data in the repository or its bundled assets. See [the security boundary](../SECURITY.md).

## Redeploying from GitHub

1. Push the reviewed source commit to `main`.
2. In Coolify, set the application's source repository to `Laythraad/mors-aegis-flame-in-freefall-2026` (branch `main`) if it is still connected to the previous repository. Keep the root Dockerfile, port `4173`, and `/api/health` check.
3. Select **Deploy** for the latest `main` commit. This deployment is manual; a Git push alone does not update the running application.
4. Wait for the deployment and application health check to report healthy.
5. Confirm the deployed commit is the intended GitHub commit.
6. Check the public read-only behavior:

   - `/` returns the MORS AEGIS page without a login prompt.
   - `/healthz` returns `200` with only `{"status":"ok"}`.
   - `/api/health` returns `200` without authentication.
   - `/models/catalog.json` lists 41 GLB models.
   - `/vendor/model-viewer.min.js` and a selected `.glb` return `200`.
   - Application-changing `POST` routes return `405`.

   The direct navigation routes are `/#Chart%20Guide` and `/#3D%20Models`; verify both after deployment.

## Public routing and recovery

The generated Coolify/`sslip.io` hostname is not directly reachable from the public Internet on this residential host. Public access is provided by a Cloudflare Quick Tunnel pointed at the Coolify HTTPS origin and pinned to this application host. The tunnel is a separate user service named `mors-aegis-concepts-backup.service`.

Check it from the Ubuntu user session:

```bash
systemctl --user is-active mors-aegis-concepts-backup.service
systemctl --user is-enabled mors-aegis-concepts-backup.service
journalctl --user -u mors-aegis-concepts-backup.service --no-pager | grep -Eo 'https://[[:alnum:]-]+\.trycloudflare\.com' | tail -n 1
```

The currently observed Quick Tunnel hostname is `https://halifax-accent-berlin-mystery.trycloudflare.com`. It is temporary and can change when the process is recreated. The user service restarts on failure and starts with the user manager. With systemd lingering disabled, it may not run after logout or before the next login following a reboot. To make user services start at boot and survive logout, an administrator must run `sudo loginctl enable-linger mors` once.

The tunnel uses `--no-tls-verify` only for its loopback connection to the Coolify proxy because that origin certificate does not match the local loopback address. Do not reuse this setting for a remote origin. For a durable public hostname, configure a named Cloudflare Tunnel and a domain; do not publish the Coolify dashboard, SSH, Docker socket, Tailscale address, or database ports.

## Source and asset integrity

The repository is the recovery source for the application, bundled NASA PSI tables, documentation, and concept models. Verify the PSI tables with `npm run data:audit`; this command regenerates `ms02-connectors/challenge-data/quality_report.json` with a new generation timestamp. Verify the deployed 3D files against `public/models/asset-manifest.json` when investigating an incomplete model gallery. Do not treat the GitHub copy as a backup of any host-level secrets or Cloudflare account credentials.
