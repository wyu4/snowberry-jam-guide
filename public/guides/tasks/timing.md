# Timing
Timing blocks are **task** blocks that pause the code before moving on to the next task.

## Wait
A **task** block that pauses the code for a number of seconds.

```json
{
    "id" : "WAIT",
    "value" : 1
}
```
> The above will pause the code for one second.

| Property | Meaning                                                    |
| -------- | ---------------------------------------------------------- |
| `value`  | The number of seconds to wait. Decimals like `0.5` work too. |

?> Stopping the code while it's waiting will end the wait right away.

### Example
```json
{
    "id" : "ON_RUN",
    "body" : [
        "Something will print in one second.",
        {
            "id" : "WAIT",
            "value" : 1
        },
        "Hello, one second later!"
    ]
}
```

## Wait Until
A **task** block that pauses the code until `value` becomes `true`.

```json
{
    "id" : "WAIT_UNTIL",
    "value" : {
        "id" : "VARIABLE",
        "name" : "ready"
    }
}
```
> The above will pause the code until variable "ready" is set to `true`.

| Property | Meaning                                         |
| -------- | ----------------------------------------------- |
| `value`  | The condition to wait for. Must be a boolean.   |

?> Since the code is paused, variables used in the condition can only be changed from another [thread](guides/tasks/threads.md).
