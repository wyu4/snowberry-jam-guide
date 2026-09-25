# Threads
Normally, tasks run one at a time, from top to bottom. Threads let you run multiple bodies of code **at the same time**.

## Thread
A **task** block that starts running its `body` in the background, and immediately moves on to the next task without waiting for it.

```json
{
    "id" : "THREAD",
    "body" : [
        {
            "id" : "WAIT",
            "value" : 0.5
        },
        "Hello! (from a different thread)"
    ]
}
```
> The above will print "Hello! (from a different thread)" half a second after it starts, while the rest of the code keeps running.

| Property | Meaning                              |
| -------- | ------------------------------------ |
| `body`   | The tasks to run in the new thread.  |

!> When `ON_RUN` reaches the end of its body, the code stops, **including any threads that are still running**. If a thread needs time to finish, make sure `ON_RUN` waits for it (for example, with a [Wait](guides/tasks/timing.md#wait) block).

?> Threads share the same variables. A variable set in one thread can be read from any other thread.

## Example
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "THREAD",
            "body" : [
                {
                    "id" : "WAIT",
                    "value" : 0.5
                },
                "Hello! (from a different thread)"
            ]
        },
        {
            "id" : "WAIT",
            "value" : 1
        },
        "Hello!"
    ]
}
```
> The thread prints its message after half a second, while the main body is still waiting. The main body prints "Hello!" after one second, which also gives the thread enough time to finish.

You should see something like this in the console:
```txt
[Threading]    Hello! (from a different thread)
[Threading]    Hello!
```
