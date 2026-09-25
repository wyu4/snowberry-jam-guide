# Loops
Loops let you run the same tasks multiple times, without having to copy and paste them over and over.

## The Repeat Block
A **task** block that runs its `body` a set number of times.

```json
{
    "id" : "REPEAT",
    "value" : 3,
    "body" : [
        "Hip hip hooray!"
    ]
}
```
> The above will print "Hip hip hooray!" 3 times.

| Property | Meaning                                                             |
| -------- | ------------------------------------------------------------------- |
| `value`  | The number of times to repeat.                                      |
| `name`   | *(Optional)* The name of a variable to store the current count in.  |
| `body`   | The tasks to run each time.                                         |

### Counting
If you give Repeat a `name`, it will set that variable to the current count each time it loops. The count starts at `0`, not `1`.
```json
{
    "id" : "REPEAT",
    "value" : 5,
    "name" : "i",
    "body" : [
        {
            "id" : "VARIABLE",
            "name" : "i"
        }
    ]
}
```
> The above will print `0.0`, `1.0`, `2.0`, `3.0`, and `4.0`.

!> The variable in `name` must be created in the `variables` section first.

## The While Block
A **task** block that keeps running its `body` as long as `value` is `true`.

```json
{
    "id" : "WHILE",
    "value" : {
        "id" : "!=",
        "a" : {
            "id" : "VARIABLE",
            "name" : "password"
        },
        "b" : "snowberry"
    },
    "body" : [
        "Enter the password:",
        {
            "id" : "INPUT",
            "name" : "password"
        }
    ]
}
```
> The above will keep asking for the password until the user types "snowberry".

| Property | Meaning                                         |
| -------- | ----------------------------------------------- |
| `value`  | The condition. It's checked before every loop.  |
| `body`   | The tasks to run while the condition is `true`. |

?> Use Repeat when you know how many times to loop. Use While when you want to loop until something happens.

!> Since the condition is checked *before* each loop, the body will never run if the condition starts off as `false`. In the example above, "password" must start as something other than "snowberry".

### Infinite Loops
If the condition never becomes `false`, the loop will run forever. Sometimes this is on purpose, but usually it's a mistake, like forgetting to change a variable inside the loop:
```json
{
    "id" : "WHILE",
    "value" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "count"
        },
        "b" : 10
    },
    "body" : [
        "This will never stop!"
    ]
}
```
> "count" never changes, so this loop will never end. Adding an [increase (`+=`) block](guides/tasks/variables.md#increase) to the body would fix it, by adding 1 to "count" every loop:
```json
{
    "id" : "+=",
    "name" : "count",
    "value" : 1
}
```

?> If your code gets stuck in an infinite loop, you can always stop it manually.

?> See the [Loops guide](guides/tasks/loops.md) for more information.
