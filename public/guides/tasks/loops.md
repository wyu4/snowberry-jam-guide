# Loops
Loops are **task** blocks that run their `body` multiple times.

## While
A **task** block that keeps running its `body` over and over, as long as `value` is `true`.

```json
{
    "id" : "WHILE",
    "value" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "count"
        },
        "b" : 5
    },
    "body" : [
        {
            "id" : "VARIABLE",
            "name" : "count"
        },
        {
            "id" : "+=",
            "name" : "count",
            "value" : 1
        }
    ]
}
```
> The above will print variable "count" and increase it by 1, until it reaches 5.

| Property | Meaning                                                           |
| -------- | ----------------------------------------------------------------- |
| `value`  | The condition. Must be a boolean. It's checked before every loop. |
| `body`   | The tasks to run while the condition is `true`.                   |

!> The condition must always be a boolean. See [Conditions](guides/tasks/README.md#conditions) for more information.

### Infinite Loops
If the condition never becomes `false`, the loop will run forever (or until you stop the code). Setting `value` to `true` is an easy way to make a loop that never ends on purpose:
```json
{
    "id" : "WHILE",
    "value" : true,
    "body" : [
        "This runs forever.",
        {
            "id" : "WAIT",
            "value" : 1
        }
    ]
}
```

?> Adding a [Wait](guides/tasks/timing.md#wait) inside an infinite loop keeps it from flooding the console.

## Repeat
A **task** block that runs its `body` a set number of times.

```json
{
    "id" : "REPEAT",
    "value" : 10,
    "body" : [
        "Hello!"
    ]
}
```
> The above will print "Hello!" 10 times.

| Property | Meaning                                                                                       |
| -------- | --------------------------------------------------------------------------------------------- |
| `value`  | The number of times to repeat. Uses the [size](guides/values/conversions.md#size-of) of the value, so an array will repeat once per element. |
| `name`   | *(Optional)* The name of a variable to store the current loop count in.                       |
| `body`   | The tasks to run on each loop.                                                                |

### Counting Loops
If `name` is given, the variable is set to the current loop count before each loop, starting at `0`. This is the same numbering used by array indexes, which makes Repeat perfect for [looping through arrays](guides/values/arrays.md#looping-through-an-array).
```json
{
    "id" : "REPEAT",
    "value" : 3,
    "name" : "i",
    "body" : [
        {
            "id" : "+",
            "a" : "Print statement #",
            "b" : {
                "id" : "VARIABLE",
                "name" : "i"
            }
        }
    ]
}
```
> The above will print:
```txt
Print statement #0.0
Print statement #1.0
Print statement #2.0
```

!> The variable in `name` must already be created in the `variables` section.
