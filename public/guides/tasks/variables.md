# Variables
These **task** blocks change the value of a variable while the code is running. The variable always needs to be created in the `variables` section first (see [Creating a Variable](lessons/variable-printer/variables.md#creating-a-variable)).

!> Changing a variable that was never created will raise an error.

?> The variable display shows the live value of every variable as your code runs, which makes it easy to see these tasks in action.

## Set
A **task** block that changes the value of a variable.

```json
{
    "id" : "SET",
    "name" : "myVar",
    "value" : "This is the new value."
}
```
> The above will set variable "myVar" to "This is the new value."

| Property | Meaning                                                                        |
| -------- | ------------------------------------------------------------------------------ |
| `name`   | The name of the variable to set. Can be a value block, but will automatically be converted into text. |
| `value`  | The new value of the variable.                                                 |

?> A variable's type isn't fixed. A variable holding text can later be set to a number, and vice versa.

## Increase
A **task** block that adds to the value of a variable. This is a shorthand for setting a variable to itself [plus](guides/values/math.md#plus) another value.

```json
{
    "id" : "+=",
    "name" : "i",
    "value" : 1
}
```
> The above will increase variable "i" by 1.

| Property | Meaning                                                   |
| -------- | --------------------------------------------------------- |
| `name`   | The name of the variable to increase.                     |
| `value`  | The value to add.                                         |

It's the same as writing:
```json
{
    "id" : "SET",
    "name" : "i",
    "value" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "i"
        },
        "b" : 1
    }
}
```

?> Since it uses [Plus](guides/values/math.md#behaviour-by-type), Increase also works on text and arrays. It can add text to the end of a text variable, or add elements to the end of an array variable.

## Decrease
A **task** block that subtracts from the value of a variable. This is a shorthand for setting a variable to itself [minus](guides/values/math.md#minus) another value.

```json
{
    "id" : "-=",
    "name" : "j",
    "value" : 1
}
```
> The above will decrease variable "j" by 1.

| Property | Meaning                                                   |
| -------- | --------------------------------------------------------- |
| `name`   | The name of the variable to decrease.                     |
| `value`  | The value to subtract.                                    |

!> Both the variable and `value` must be numbers.

## Input
A **task** block that pauses the code until the user types something into the console, and then stores it in a variable. This is a shorthand for [setting](#set) a variable to the [Input](guides/values/built-ins.md#input) value block.

```json
{
    "id" : "INPUT",
    "name" : "input"
}
```
> The above will wait for the user to type something, then store it in variable "input".

| Property | Meaning                                                              |
| -------- | -------------------------------------------------------------------- |
| `name`   | *(Optional)* The name of the variable to store the input in.         |

?> If `name` is left out, the code will still wait for the user to type something, but nothing will be stored. This is handy for "press enter to continue" prompts:
```json
[
    "Input anything to continue.",
    {
        "id" : "INPUT"
    }
]
```

## Example
```json
{
    "id" : "PROJECT",
    "name" : "Variables",
    "description" : "Changes variables in different ways.",
    "body" : {
        "variables" : [
            {
                "name" : "i",
                "value" : 0
            },
            {
                "name" : "myString",
                "value" : "Hello World"
            },
            {
                "name" : "myArray",
                "value" : [1, 2, 3]
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    {
                        "id" : "+=",
                        "name" : "i",
                        "value" : 1
                    },
                    {
                        "id" : "+=",
                        "name" : "myString",
                        "value" : "!!!"
                    },
                    {
                        "id" : "+=",
                        "name" : "myArray",
                        "value" : [4, 5]
                    },
                    {
                        "id" : "SET",
                        "name" : "myString",
                        "value" : 10
                    }
                ]
            }
        ]
    }
}
```
> By the end, "i" will be `1.0`, "myArray" will be `[1.0, 2.0, 3.0, 4.0, 5.0]`, and "myString" will be `10.0`.
