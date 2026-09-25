# Timing
Up until now, your code has run as fast as it possibly can. Timing blocks let you control *when* things happen, and measure how long they take.

## The Wait Block
A **task** block that pauses the code for a number of seconds.

```json
{
    "id" : "WAIT",
    "value" : 2
}
```
> The above will pause the code for two seconds.

| Property | Meaning                                                      |
| -------- | ------------------------------------------------------------ |
| `value`  | The number of seconds to wait. Decimals like `0.5` work too. |

### Counting Down
Wait works well inside a loop. Combined with the decrease (`-=`) block, you can make a countdown.

### The Decrease Block
A **task** block that subtracts from a variable. It's the opposite of the [increase (`+=`)](guides/tasks/variables.md#increase) block.

```json
{
    "id" : "-=",
    "name" : "count",
    "value" : 1
}
```
> The above will decrease variable "count" by 1.

| Property | Meaning                               |
| -------- | ------------------------------------- |
| `name`   | The name of the variable to decrease. |
| `value`  | The number to subtract.               |

!> Unlike `+=`, decrease only works with numbers.

Here's a countdown from 3, using the variable "count":
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "WHILE",
            "value" : {
                "id" : ">",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "count"
                },
                "b" : 0
            },
            "body" : [
                {
                    "id" : "VARIABLE",
                    "name" : "count"
                },
                {
                    "id" : "WAIT",
                    "value" : 1
                },
                {
                    "id" : "-=",
                    "name" : "count",
                    "value" : 1
                }
            ]
        },
        "Liftoff!"
    ]
}
```
> If "count" starts at 3, the above will print `3.0`, `2.0`, and `1.0`, one second apart, followed by "Liftoff!".

## Measuring Time
### The Time Block
A **value** block that points to the current time, in milliseconds.

```json
{
    "id" : "TIME"
}
```

On its own, the number isn't very useful (it's the number of milliseconds since January 1, 1970). What makes it useful is taking the difference between two times:

1. [Set](guides/tasks/variables.md#set) a variable, like "start", to the time.
2. Do something that takes a while.
3. Subtract "start" from the time again.

```json
{
    "id" : "-",
    "a" : {
        "id" : "TIME"
    },
    "b" : {
        "id" : "VARIABLE",
        "name" : "start"
    }
}
```
> The above will point to the number of milliseconds since variable "start" was set.

?> There are 1000 milliseconds in a second. [Divide](guides/values/math.md#divide) by 1000 to get the time in seconds.

## Randomness
Waiting the same amount of time every time is predictable. To mix things up, you can use random numbers.

### The Random Block
A **value** block that points to a random decimal between `0` and `1`. A new number is picked every time it's used.

```json
{
    "id" : "RANDOM"
}
```
> The above could point to something like `0.4271937...`.

To get a random number in a different range, [multiply](guides/values/math.md#multiply) it and [add](guides/values/math.md#plus) to it. For example, this points to a random number between 2 and 5:
```json
{
    "id" : "+",
    "a" : {
        "id" : "*",
        "a" : {
            "id" : "RANDOM"
        },
        "b" : 3
    },
    "b" : 2
}
```
> Random (0 to 1) times 3 gives 0 to 3. Adding 2 moves it up to 2 to 5.

### The Round Block
A **value** block that rounds a number to the nearest whole number.

```json
{
    "id" : "ROUND",
    "a" : 3.7
}
```
> The above will point to `4.0`.

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The number to round. |

?> Rounding a random number gives a random whole number, which is how the [Guessing Game](lessons/guessing-game/guessing-game.md#3-pick-the-secret-number) picked its secret number.

### The Modulus Block
A **value** block that points to the remainder of `a` divided by `b`.

```json
{
    "id" : "%",
    "a" : 7,
    "b" : 3
}
```
> The above will point to `1.0`, since 7 divided by 3 is 2, with 1 left over.

| Property | Meaning                  |
| -------- | ------------------------ |
| `a`      | The number to divide.    |
| `b`      | The number to divide by. |

Modulus is handy for doing something "every so often". For example, if a countdown's `count % 5` equals `0`, then `count` is a multiple of 5.

?> See the [Timing guide](guides/tasks/timing.md) and [Built-Ins guide](guides/values/built-ins.md) for more information.
