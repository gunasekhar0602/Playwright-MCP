#!/bin/sh

set -eu

usage() {
  printf '%s\n' \
    'Usage: docker-entrypoint.sh {all|sanity|regression|web|e2e|datadriven|smoke|help} [playwright-args...]' \
    '' \
    'Available test suites:' \
    '  all         - Run all tests (default)' \
    '  sanity      - Run the login smoke test' \
    '  regression  - Run the core shopping journey tests' \
    '  web         - Run browser tests' \
    '  e2e         - Run end-to-end tests' \
    '  datadriven  - Run the data/seed test' \
    '  smoke       - Run tests tagged @smoke' \
    '  help        - Show this help message'
}

SUITE="${1:-all}"

case "$SUITE" in
  all|web|e2e)
    [ "$#" -gt 0 ] && shift
    echo "==> Running '$SUITE' tests (args: $*)"
    exec npx playwright test "$@"
    ;;
  sanity)
    shift
    echo "==> Running sanity tests (args: $*)"
    exec npx playwright test tests/login.spec.ts "$@"
    ;;
  regression)
    shift
    echo "==> Running regression tests (args: $*)"
    exec npx playwright test \
      tests/cart-management.spec.ts \
      tests/checkout-validation.spec.ts \
      tests/order-completion.spec.ts \
      tests/product-browsing.spec.ts \
      "$@"
    ;;
  datadriven)
    shift
    echo "==> Running data-driven tests (args: $*)"
    exec npx playwright test tests/seed.spec.ts "$@"
    ;;
  smoke)
    shift
    echo "==> Running smoke tests (args: $*)"
    exec npx playwright test --grep @smoke "$@"
    ;;
  help|-h|--help)
    usage
    exit 0
    ;;
  api)
    echo "Error: No API tests are present in tests/." >&2
    exit 1
    ;;
  *)
    echo "Error: Unknown test suite '$SUITE'" >&2
    usage >&2
    exit 1
    ;;
esac
