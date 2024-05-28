# Acumen Logs GitHub Action

This GitHub Action allows you to run a test on your synthetic platform by providing the test URL which can be obtained from your <a href="https://acumenlogs.com">Acumen Logs</a> dashboard. If the test passes, the action will succeed and output the test results.

## Usage

To use this action in your workflow, add the following step to your GitHub Actions workflow file:

```
name: Run Synthetic Test

on: [push, pull_request]

jobs:
  test-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Run synthetic test
        uses: deferdie/acumen-github-action/.github/actions/Synthetic@v1
        with:
          test_url: 'https://app.acumenlogs.com/run/watcher/<Your test url>'
```

## Support
For any questions or queries please email <a href="mailto:support@acumenlogs.com">support@acumenlogs.com</a>. 
