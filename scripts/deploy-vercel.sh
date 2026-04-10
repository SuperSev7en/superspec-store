#!/usr/bin/env bash
# Deploy production to Vercel with a git tag for history (rollback via Vercel dashboard or git).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VERSION="${1:-release-$(date +%Y%m%d-%H%M%S)}"
TAG="v/${VERSION}"

echo "==> SuperSpec deploy — version label: ${VERSION}"
echo "==> Tag: ${TAG}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required." >&2
  exit 1
fi

if git rev-parse --git-dir >/dev/null 2>&1; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "==> Staging and committing all changes..."
    git add -A
    git commit -m "chore: deploy ${VERSION}" || true
  fi
  if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo "==> Tag $TAG already exists; skipping tag create."
  else
    git tag -a "$TAG" -m "Production deploy ${VERSION}"
    echo "==> Created annotated tag $TAG"
  fi
  if git remote get-url origin >/dev/null 2>&1; then
    echo "==> Pushing branch and tags to origin..."
    git push origin HEAD
    git push origin "$TAG"
  else
    echo "==> No git remote 'origin' — skip push. Configure: git remote add origin <url>"
  fi
else
  echo "==> Not a git repository — skip tag/push."
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI not found. Install: npm i -g vercel" >&2
  exit 1
fi

echo "==> vercel deploy --prod"
vercel deploy --prod

echo "==> Done. Rollback: Vercel dashboard → Deployments → Promote previous."
