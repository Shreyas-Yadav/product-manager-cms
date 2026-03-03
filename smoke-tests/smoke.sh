#!/bin/bash
set -e
BASE_URL="${1:-http://localhost:3000}"

echo "Running smoke tests against: $BASE_URL"

check() {
  local url="$BASE_URL$1"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null) || status="000"
  if [ "$status" -eq 200 ]; then
    echo "  PASS: GET $url -> $status"
  else
    echo "  FAIL: GET $url -> $status"
    exit 1
  fi
}

check "/health"
check "/api/products"
check "/api/users"
check "/api/comments"

echo "All smoke tests passed."
