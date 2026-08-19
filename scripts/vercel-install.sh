#!/usr/bin/env bash
# Vercel install step.
#
# The résumé PDF is generated at deploy time, never committed, so the build
# needs pandoc and XeLaTeX the same way CI does. Vercel's build image is Amazon
# Linux 2023, so the packages come from dnf rather than apt, and pandoc comes
# from its own release tarball — pinned, because a build that silently changes
# typesetter is a build that silently changes the résumé.
set -euo pipefail

PANDOC_VERSION=$(cat scripts/pandoc-version.txt)

dnf install -y \
  --setopt=retries=5 \
  --setopt=timeout=30 \
  texlive-xetex \
  texlive-collection-fontsrecommended \
  texlive-collection-latexrecommended

curl -fsSL "https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-amd64.tar.gz" \
  | tar xz -C /tmp
install -m 0755 "/tmp/pandoc-${PANDOC_VERSION}/bin/pandoc" /usr/local/bin/pandoc

pandoc --version | head -1
xelatex --version | head -1

npm ci
