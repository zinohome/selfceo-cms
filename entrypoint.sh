#!/bin/sh
set -e

# If node_modules is missing or empty (e.g. after compose down), reinstall
if [ ! -d "/app/node_modules/.bin" ] || [ ! -f "/app/node_modules/.bin/next" ]; then
  echo "node_modules missing — running npm ci..."
  npm ci --legacy-peer-deps
fi

exec "$@"
