# Conditionals
Conditionals are **task** blocks that only run code when a [condition](guides/values/conditions.md) is met.

## If
A **task** block that runs its `body` only if `value` is `true`.

```json
{
    "id" : "IF",
    "value" : {
        "id" : "VARIABLE",
        "name" : "condition"
    },
    "body" : [
        "The condition is true!"
    ]
}
```
> The above will print "The condition is true!" only if variable "condition" is `true`.

| Property | Meaning                                                   |
| -------- | --------------------------------------------------------- |
| `value`  | The condition. Must be a boolean.                         |
| `body`   | The tasks to run if the condition is `true`.              |

## If Else
A **task** block that runs its `body` if `value` is `true`, and its `else` body otherwise.

```json
{
    "id" : "IF_ELSE",
    "value" : {
        "id" : "==",
        "a" : {
            "id" : "VARIABLE",
            "name" : "myNumber"
        },
        "b" : 15
    },
    "body" : [
        "yes"
    ],
    "else" : [
        "no"
    ]
}
```
> The above will print "yes" if variable "myNumber" is 15, otherwise it will print "no".

| Property | Meaning                                                   |
| -------- | --------------------------------------------------------- |
| `value`  | The condition. Must be a boolean.                         |
| `body`   | The tasks to run if the condition is `true`.              |
| `else`   | The tasks to run if the condition is `false`.             |

!> The condition must always be a boolean. See [Conditions](guides/tasks/README.md#conditions) for more information.

### Chaining Conditions
To check more than two possibilities, place another `IF_ELSE` inside the `else` body. This works like an "else if" in other languages:
```json
{
    "id" : "IF_ELSE",
    "value" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "computer"
        },
        "b" : 1
    },
    "body" : [
        "The computer chose rock."
    ],
    "else" : [
        {
            "id" : "IF_ELSE",
            "value" : {
                "id" : "<",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "computer"
                },
                "b" : 2
            },
            "body" : [
                "The computer chose paper."
            ],
            "else" : [
                "The computer chose scissors."
            ]
        }
    ]
}
```
