# Input
Input refers to data that the user types into the console while the code is running. This lets your programs respond to the user, instead of doing the same thing every time.

## The Input Block
A **task** block that pauses the code until the user types something, and then stores it in a variable.

```json
{
    "id" : "INPUT",
    "name" : "myInput"
}
```
> The above will wait for the user to type something, then store it in variable "myInput".

| Property | Meaning                                         |
| -------- | ----------------------------------------------- |
| `name`   | The name of the variable to store the input in. |

!> Just like any other variable, "myInput" must be created in the `variables` section first.

### Asking a Question
The user won't know what to type unless you tell them. It's good practice to print a message right before asking for input:
```json
{
    "id" : "ON_RUN",
    "body" : [
        "What's your name?",
        {
            "id" : "INPUT",
            "name" : "name"
        },
        {
            "id" : "+",
            "a" : "Hello, ",
            "b" : {
                "id" : "VARIABLE",
                "name" : "name"
            }
        }
    ]
}
```
> The above will ask for the user's name, then say hello to them.

## Input as a Value
Input can also be used as a **value** block. Instead of storing the input in a variable, it points to whatever the user typed.
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

## Text vs. Numbers
Input is **always** text, even if the user types a number. This means that if the user types `5`, you'll get the text `"5"` rather than the number `5`.

This matters when doing math. For example, using `+` on the input `"5"` and the number `3` gives `"53.0"`, because `+` joins text together.

### The Parse Number Block
A **value** block that converts text into a number.

```json
{
    "id" : "PARSE_NUMBER",
    "a" : "5"
}
```
> The above will point to the number `5.0`.

| Property | Meaning                        |
| -------- | ------------------------------ |
| `a`      | The text to convert.           |

Putting it all together, here's how to ask the user for a number and store it as a number:
```json
{
    "id" : "SET",
    "name" : "myNumber",
    "value" : {
        "id" : "PARSE_NUMBER",
        "a" : {
            "id" : "INPUT"
        }
    }
}
```

?> The `SET` block changes the value of a variable. See the [Variables guide](guides/tasks/variables.md#set) for more information.

!> If the user types something that isn't a number, like `hello`, Parse Number will raise an error.
