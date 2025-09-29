# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log. It supports multiple languages including English, French, and Spanish.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

### `language`

**Optional** The language for the greeting. Supported values: `en` (English), `fr` (French), `es` (Spanish). Default `"en"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: 'Mona the Octocat'
```

### Example with language parameter

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: 'Mona the Octocat'
  language: 'fr'
```
