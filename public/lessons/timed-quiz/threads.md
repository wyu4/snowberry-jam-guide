# Threads
Normally, tasks run one at a time, from top to bottom. If one task takes a long time, like a [Wait](lessons/reaction-timer/timing.md#the-wait-block) or an [Input](lessons/calculator/input.md), everything after it has to wait too.

Threads let you run multiple bodies of code **at the same time**.

## The Thread Block
A **task** block that starts running its `body` in the background, and immediately moves on to the next task without waiting for it.

```json
{
    "id" : "THREAD",
    "body" : [
        {
            "id" : "WAIT",
            "value" : 1
        },
        "Hello from the thread!"
    ]
}
```
> The above will print "Hello from the thread!" one second after it starts, while the rest of the code keeps running.

| Property | Meaning                              |
| -------- | ------------------------------------ |
| `body`   | The tasks to run in the new thread.  |

To see the difference, compare these two bodies:

Without a thread:
```json
[
    {
        "id" : "WAIT",
        "value" : 1
    },
    "A",
    "B"
]
```
> Waits one second, then prints "A", then "B".

With a thread:
```json
[
    {
        "id" : "THREAD",
        "body" : [
            {
                "id" : "WAIT",
                "value" : 1
            },
            "A"
        ]
    },
    "B",
    {
        "id" : "WAIT",
        "value" : 2
    }
]
```
> Prints "B" right away, then "A" one second later. The thread does its waiting in the background.

## When the Code Ends
When `ON_RUN` reaches the end of its body, the code stops, **including any threads that are still running**.

In the second example above, `ON_RUN` waits 2 seconds at the end. Without that wait, the code would end right after printing "B", and "A" would never be printed.

!> If you need a thread to finish, make sure `ON_RUN` still has something to do (or is waiting) until it's done.

## Sharing Variables
All threads share the same variables. A variable changed in one thread can be read from any other thread. This is how threads "talk" to each other.

For example, one thread can count the seconds, while the rest of the code keeps going:
```json
{
    "id" : "THREAD",
    "body" : [
        {
            "id" : "WHILE",
            "value" : true,
            "body" : [
                {
                    "id" : "WAIT",
                    "value" : 1
                },
                {
                    "id" : "+=",
                    "name" : "seconds",
                    "value" : 1
                }
            ]
        }
    ]
}
```
> The above will add 1 to variable "seconds" every second, forever, without holding up the rest of the code. The variable display will show it ticking up.

?> This is one of the few times an [infinite loop](lessons/guessing-game/loops.md#infinite-loops) is useful. Since it's in its own thread, it doesn't block anything, and it will stop when the code ends.

## Waiting for Another Thread
Sometimes one thread needs to wait until another one is done with something. Snowberry Jam has a block for this.

### The Wait Until Block
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
> The above will pause the code until variable "ready" is set to `true`, most likely by another thread.

| Property | Meaning                                        |
| -------- | ---------------------------------------------- |
| `value`  | The condition to wait for. Must be a boolean.  |

?> See the [Threads guide](guides/tasks/threads.md) for more information.
