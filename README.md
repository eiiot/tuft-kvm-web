# kvm-web — hosted JetKVM viewer

Serves the JetKVM cloud viewer at `kvm-staging.tuft.dev` as an assets-only
Cloudflare Worker. See LLP 0065 (tuft-owned JetKVM cloud), especially the
"Viewer Hosting" section for why this is a dedicated subdomain.

The viewer is upstream `jetkvm/kvm`'s `ui/` built in cloud mode, pinned in
`upstream.lock`, **plus the `overlay/` directory**: files copied over the
pristine checkout before the build (login route → Tuft code-exchange
redirect, signup route → admin-setup notice, brand assets) and a string
swap for visible "JetKVM" branding. Keep the overlay minimal — every file
in it shadows an upstream file and must be re-checked against upstream when
bumping `upstream.lock`. The build + deploy runs in
`.github/workflows/tuft-kvm-web.yml` on staging pushes touching this
directory.

Local one-off build (mirrors CI):

```bash
source upstream.lock
git clone --filter=blob:none https://github.com/jetkvm/kvm kvm-src
git -C kvm-src checkout "$KVM_REF"
printf 'VITE_CLOUD_API=https://kvm-api-staging.tuft.dev\n' > kvm-src/ui/.env.cloud-staging
(cd kvm-src/ui && npm ci && npm run build:staging)
rm -rf dist && cp -R kvm-src/ui/dist dist
npm ci && npx wrangler deploy   # needs CLOUDFLARE_API_TOKEN/ACCOUNT_ID
```

Bumping the viewer = editing `upstream.lock` after bench-testing the new
ref against staging kvm-api (upstream firmware and cloud protocol move
together — see LLP 0065 "Risks And Watch Items").

## License and corresponding source

The viewer is a modified version of [jetkvm/kvm](https://github.com/jetkvm/kvm)'s
`ui/`, licensed **GPL-2.0** (see `LICENSE`). Serving the built bundle conveys
a modified GPL work, so this directory — the pinned upstream ref, the
`overlay/`, and the build workflow — is the corresponding source. It is
mirrored publicly at [eiiot/tuft-kvm-web](https://github.com/eiiot/tuft-kvm-web)
on every deploy by the workflow's sync step.

The Expo name and mark are registered trademarks; their inclusion in this
repository is not a license to use them.
