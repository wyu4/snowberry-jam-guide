# Logging
Logging blocks are **task** blocks that send messages to the console. Each one is displayed differently, so that the user can tell them apart.

## Print
A **task** block that displays text in the console.

```json
{
    "id" : "PRINT",
    "value" : "Hello World!"
}
```
> The above will print "Hello World!" in the console.

| Property | Meaning                                                                  |
| -------- | ------------------------------------------------------------------------ |
| `value`  | The value to print. Will automatically be converted into text.           |

?> Printing is covered in more detail in the [Printing](lessons/variable-printer/printing.md) lesson, including the [shorthand](lessons/variable-printer/printing.md#shorthand) for print blocks.

Here's how each type of value looks when printed:

| Value                 | Printed as        |
| --------------------- | ----------------- |
| `"Hello"`             | `Hello`           |
| `10`                  | `10.0`            |
| `true`                | `true`            |
| `[1, "two", false]`   | `[1.0, two, false]` |

## Warn
A **task** block that displays a warning in the console. Warnings work just like print blocks, but stand out so that they catch the user's attention.

```json
{
    "id" : "WARN",
    "value" : "This is a warning."
}
```
> The above will print "This is a warning." in the console, as a warning.

| Property | Meaning                                                                  |
| -------- | ------------------------------------------------------------------------ |
| `value`  | The value to print. Will automatically be converted into text.           |

?> Warnings don't stop the code. They're useful for letting the user know that something unexpected happened, like an invalid input.

## Error
A **task** block that **stops the code** and displays an error message in the console.

```json
{
    "id" : "ERROR",
    "value" : "Something went wrong!"
}
```
> The above will stop the code, and show "Something went wrong!" as an error.

| Property | Meaning                                                                  |
| -------- | ------------------------------------------------------------------------ |
| `value`  | The error message. Will automatically be converted into text.            |

!> Nothing after an error block will run. If you only want to let the user know about a problem, use [Warn](#warn) instead.

## Example
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : "This is a print statement..."
        },
        "... this is also a print statement (just a shorthand) ...",
        {
            "id" : "WARN",
            "value" : "... and this is a warning ..."
        },
        {
            "id" : "ERROR",
            "value" : "... and this is an error."
        }
    ]
}
```
