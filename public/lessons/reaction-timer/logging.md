# Logging
You already know how to [print](lessons/variable-printer/printing.md) messages to the console. Snowberry Jam has two more ways of logging messages, for when something doesn't go as planned.

## The Warn Block
A **task** block that displays a warning in the console. It works just like a print block, but the message is highlighted so that it stands out.

```json
{
    "id" : "WARN",
    "value" : "That number is pretty big!"
}
```
> The above will show "That number is pretty big!" in the console, as a warning.

| Property | Meaning                                    |
| -------- | ------------------------------------------ |
| `value`  | The message to show.                       |

Warnings **don't** stop the code. They're used to let the user know that something unusual happened, while still carrying on.

## The Error Block
A **task** block that **stops the code**, and displays an error message in the console.

```json
{
    "id" : "ERROR",
    "value" : "Something went wrong!"
}
```
> The above will stop the code, and show "Something went wrong!" as an error.

| Property | Meaning                                    |
| -------- | ------------------------------------------ |
| `value`  | The error message.                         |

!> Nothing after an error block will run, not even in other [threads](guides/tasks/threads.md).

### Warn or Error?
| Use...  | When...                                                                  |
| ------- | ------------------------------------------------------------------------ |
| `PRINT` | Everything is fine.                                                      |
| `WARN`  | Something is off, but the code can keep going.                           |
| `ERROR` | Something is so wrong that the code can't (or shouldn't) keep going.     |

## Checking the User's Input
One of the most common uses of warnings and errors is checking that the user typed something that makes sense. To do that, you'll often want to check if something is **not** true.

### The Not Block
A **value** block that inverts a condition. `true` becomes `false`, and `false` becomes `true`.

```json
{
    "id" : "NOT",
    "a" : {
        "id" : "VARIABLE",
        "name" : "gameOver"
    }
}
```
> The above will point to `true` if variable "gameOver" is `false`.

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The value to invert. |

Here's how it all fits together. This asks the user for their age, stops with an error if it's impossible, and warns them if it's unusual:
```json
{
    "id" : "ON_RUN",
    "body" : [
        "How old are you?",
        {
            "id" : "SET",
            "name" : "age",
            "value" : {
                "id" : "PARSE_NUMBER",
                "a" : {
                    "id" : "INPUT"
                }
            }
        },
        {
            "id" : "IF",
            "value" : {
                "id" : "NOT",
                "a" : {
                    "id" : ">",
                    "a" : {
                        "id" : "VARIABLE",
                        "name" : "age"
                    },
                    "b" : 0
                }
            },
            "body" : [
                {
                    "id" : "ERROR",
                    "value" : "Your age has to be more than 0!"
                }
            ]
        },
        {
            "id" : "IF",
            "value" : {
                "id" : ">",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "age"
                },
                "b" : 120
            },
            "body" : [
                {
                    "id" : "WARN",
                    "value" : "Wow, that's old! Are you sure?"
                }
            ]
        },
        {
            "id" : "+",
            "a" : "You are ",
            "b" : {
                "id" : "+",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "age"
                },
                "b" : " years old."
            }
        }
    ]
}
```
> Typing `-5` stops the code with an error. Typing `150` shows a warning, but still prints the age.

?> `NOT` with `>` works the same as `<=`. Not is most useful for flipping a condition that doesn't have an opposite block, like a boolean variable or an `AND`.

?> See the [Logging guide](guides/tasks/logging.md) for more information.
