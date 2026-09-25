# If Statements
Up until now, your code has done the same thing every time it runs. If statements let your code make decisions, running different tasks depending on whether something is true.

## Conditions
A condition is a value that is either `true` or `false` (a boolean). The simplest conditions are just `true` or `false` typed directly, or a variable holding one of them.

Most of the time, though, conditions come from **comparison** blocks. These are **value** blocks that compare `a` to `b`:
```json
{
    "id" : ">",
    "a" : {
        "id" : "VARIABLE",
        "name" : "score"
    },
    "b" : 100
}
```
> The above will point to `true` if variable "score" is greater than 100, and `false` otherwise.

| ID   | Checks if `a` is...          |
| ---- | ---------------------------- |
| `==` | equal to `b`                 |
| `!=` | not equal to `b`             |
| `>`  | greater than `b`             |
| `>=` | greater than or equal to `b` |
| `<`  | less than `b`                |
| `<=` | less than or equal to `b`    |

!> Text and numbers are never equal to each other, so `"5"` is **not** equal to `5`. If you're comparing with user [input](lessons/calculator/input.md), remember to parse it as a number first!

## The If Block
A **task** block that runs its `body` only if `value` is `true`.

```json
{
    "id" : "IF",
    "value" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "score"
        },
        "b" : 100
    },
    "body" : [
        "New high score!"
    ]
}
```
> The above will print "New high score!" only if variable "score" is greater than 100.

| Property | Meaning                                      |
| -------- | -------------------------------------------- |
| `value`  | The condition.                               |
| `body`   | The tasks to run if the condition is `true`. |

?> A `body` works just like the body of `ON_RUN`. It can hold as many tasks as you'd like, including other if statements.

!> `value` must be a condition. Using something that isn't `true` or `false`, like a number, will stop your code from compiling.

## The If Else Block
A **task** block that runs its `body` if `value` is `true`, and its `else` body if it's `false`.

```json
{
    "id" : "IF_ELSE",
    "value" : {
        "id" : "==",
        "a" : {
            "id" : "VARIABLE",
            "name" : "b"
        },
        "b" : 0
    },
    "body" : [
        "You can't divide by zero!"
    ],
    "else" : [
        {
            "id" : "/",
            "a" : {
                "id" : "VARIABLE",
                "name" : "a"
            },
            "b" : {
                "id" : "VARIABLE",
                "name" : "b"
            }
        }
    ]
}
```
> The above will only divide "a" by "b" if "b" isn't 0. Otherwise, it prints a message instead.

| Property | Meaning                                       |
| -------- | --------------------------------------------- |
| `value`  | The condition.                                |
| `body`   | The tasks to run if the condition is `true`.  |
| `else`   | The tasks to run if the condition is `false`. |

## Combining Conditions
Sometimes one comparison isn't enough. The `AND` and `OR` blocks combine two conditions, `a` and `b`:

| ID    | Points to `true` if...          |
| ----- | ------------------------------- |
| `AND` | both `a` and `b` are true       |
| `OR`  | `a`, `b`, or both are true      |

```json
{
    "id" : "AND",
    "a" : {
        "id" : ">=",
        "a" : {
            "id" : "VARIABLE",
            "name" : "guess"
        },
        "b" : 1
    },
    "b" : {
        "id" : "<=",
        "a" : {
            "id" : "VARIABLE",
            "name" : "guess"
        },
        "b" : 10
    }
}
```
> The above will point to `true` if variable "guess" is between 1 and 10.

?> See the [Conditions guide](guides/values/conditions.md) for every condition block, including `NOT` and `SAME_TYPE`.
