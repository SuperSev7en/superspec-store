#!/usr/bin/env bash
# Automate pushing updates from IDE to Git and Vercel, and keep only the latest 4 tags.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VERSION="release-$(date +%Y%m%d-%H%M%S)"
TAG="v/${VERSION}"
MESSAGE="${1:-chore: auto update from IDE}"

echo "==> Pushing update with version label: ${VERSION}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required." >&2
  exit 1
fi

if git rev-parse --git-dir >/dev/null 2>&1; then
  echo "==> Staging and committing changes..."
  git add -A
  git commit -m "$MESSAGE" || echo "No changes to commit."

  echo "==> Creating tag $TAG"
  git tag -a "$TAG" -m "Auto deploy ${VERSION}"

  # Keep only the last 4 tags starting with v/
  echo "==> Cleaning up old tags (keeping last 4)..."
  # Fetch tags to ensure we have the latest
  git fetch --tags origin 2>/dev/null || true

  # Get all tags sorted by creation date
  TAGS=$(git tag -l "v/*" --sort=-creatordate)
  COUNT=0

  for t in $TAGS; do
    COUNT=$((COUNT+1))
    if [ "$COUNT" -gt 4 ]; then
      echo "    Deleting old tag: $t"
      git tag -d "$t"
      git push origin --delete "$t" 2>/dev/null || true
    fi
  done

  if git remote get-url origin >/dev/null 2>&1; then
    echo "==> Pushing branch and latest tag to origin..."
    git push origin HEAD
    git push origin "$TAG"
  else
    echo "==> No git remote 'origin' — skipping push."
  fi
else
  echo "==> Not a git repository — skip tag/push."
fi

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI not found. Skipping Vercel deploy." >&2
else
  echo "==> Deploying to Vercel production..."
  vercel deploy --prod --yes
fi

echo "==> Update complete! Your changes are live and the last 4 versions are saved."
