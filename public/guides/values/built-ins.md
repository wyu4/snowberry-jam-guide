# Built-Ins
Built-ins are **value** blocks that provide data from outside your code, such as the time, randomness, or the user. Most of them don't take any properties other than their `id`.

## Random
A **value** block that points to a random number between `0` (included) and `1` (not included). A new number is picked every time it's used.

```json
{
    "id" : "RANDOM"
}
```
> The above could point to something like `0.4271937...`.

?> To get a random number in a bigger range, [multiply](guides/values/math.md#multiply) it. To get a random whole number, [round](guides/values/math.md#round) the result.

## Time
A **value** block that points to the current time, as the number of milliseconds since January 1, 1970 (UTC).

```json
{
    "id" : "TIME"
}
```

?> Time is useful for measuring how long something takes. Store the time in a variable before running something, then [subtract](guides/values/math.md#minus) it from the time afterwards:
```json
{
    "id" : "+",
    "a" : "Finished in ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "/",
            "a" : {
                "id" : "-",
                "a" : {
                    "id" : "TIME"
                },
                "b" : {
                    "id" : "VARIABLE",
                    "name" : "startTime"
                }
            },
            "b" : 1000
        },
        "b" : " seconds."
    }
}
```

## Input
A **value** block that pauses the code until the user types something into the console, and then points to what they typed (as text).

```json
{
    "id" : "PRINT",
    "value" : {
        "id" : "+",
        "a" : "You said: ",
        "b" : {
            "id" : "INPUT"
        }
    }
}
```
> The above will wait for the user to type something, then print it back.

?> Input always points to text. Use [Parse Number](guides/values/conversions.md#parse-number) to turn it into a number.

?> If you just want to store the input in a variable, the [Input task](guides/tasks/variables.md#input) is a shorter way of doing it.

## Public Folder
A **value** block that points to the full path of Snowberry Jam's public folder. This folder is created automatically, and is a place for your programs to keep files.

```json
{
    "id" : "PUBLIC_FOLDER"
}
```
> On Windows, the above will point to something like `C:\Users\you\AppData\Roaming/SnowberryJam/`.

?> The path already ends with a `/`, so you can add a file name directly after it using [Plus](guides/values/math.md#plus).
