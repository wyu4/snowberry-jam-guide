# Printing
Printing refers to sending data to the console, which is displayed to the user while the code is running. This is helpful because it serves as a way to log the progress of the code, or simply act as an interface for the user.

## The Print Block
A **task** block that displays text in the console.

```json
{
    "id" : "PRINT",
    "value" : "Hello World"
}
```
> The above will print "Hello World" in the console.

| Property | Meaning                    |
| -------- | -------------------------- |
| `value`  | The value holder to print. |

### Nesting Value Blocks
You can also nest value blocks in the `value` property, which is helpful for printing thigns like variables. This is generally consistent across all task blocks.
```json
{
    "id" : "PRINT",
    "value" : {
        "id" : "VARIABLE",
        "name" : "myVar"
    }
}
```

### Shorthand
It's likely that your program is going to be printing a lot of things, all the time. Snowberry Jam has a shorthand for a print block.

Instead of doing:
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : "This is a huge print block."
        }
    ]
}
```
You can simply put a value block in the body. When the code is compiled, this is going to automatically be translated into a print block.

Here are some examples:
>```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : "Hello World!"
        }
    ]
}
>```
>Can be written as:
>```json
{
    "id" : "ON_RUN",
    "body" : [
        "Hello World!"
    ]
}
>```

>```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : {
                "id" : "VARIABLE",
                "name" : "myVar"
            }
        }
    ]
}
>```
>Can be written as:
>```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "VARIABLE",
            "name" : "myVar"
        }
    ]
}
>```
