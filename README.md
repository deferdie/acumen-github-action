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
        uses: deferdie/acumen-github-action/.github/actions/Synthetic@v2
        with:
          SYNTHETIC_TEST_URL: 'https://app.acumenlogs.com/run/watcher/<Your test url>'
          START_URL: (Optional) 'https://example.com'

```

### Output
 #### synthetic
 This output will contain the results of the test with the below JSON response.
 ```
    {
        "id": TEST RUN ID,
        "status": "completed",
        "token": "TEST_TOKEN",
        "running": 0,
        "has_passed": 1,
        "response_count": 14,
        "console_log_count": 3,
        "two_hundred_responses": 13,
        "three_hundred_responses": 0,
        "four_hundred_responses": 1,
        "responses": [
            {
                "url": "https://example.com",
                "status": 404
            }
        ]
    }
 ```

## Support
For any questions or queries please email <a href="mailto:support@acumenlogs.com">support@acumenlogs.com</a>. 
