# Version spell
This action creates a version for your software, based on the checked out branch and amount of commits.

## Important note
In order for this action to work, you need to checkout your code with a fetch-depth of 0. This fetches all history, which we need in order to count the commits.

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
        uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: Spit out Github ref
        run: echo $GITHUB_REF

      - name: Test version
        id: spell
        uses: actoaps/version-spell@v1

      - name: Get action output
        run: echo ${{ steps.spell.outputs.version }}
```
