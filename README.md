# Version spell
This action creates a version for your software, based on the checked out branch and amount of commits.

## Outputs
### `version`
The version generated for your checked out commit.

## Example workflow
```yaml
on: [push]

jobs:
  test_action:
    runs-on: ubuntu-latest
    name: Test action
    steps:
      - name: Checkout code
        uses: actions/checkout@v1

      - name: Test version
        id: spell
        uses: actoaps/version-spell@v1

      - name: Get action output
        run: echo ${{ steps.spell.version }}

```
