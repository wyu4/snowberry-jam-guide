# Math
So far, every value we've used has been typed in directly, like `"Hello World!"` or `123`. Math blocks let Snowberry Jam calculate values for you while the code runs.

## Math Blocks
Math blocks are **value** blocks. They take two values, `a` and `b`, and point to the result.

```json
{
    "id" : "+",
    "a" : 5,
    "b" : 3
}
```
> The above will point to `8.0`.

| Property | Meaning           |
| -------- | ----------------- |
| `a`      | The first value.  |
| `b`      | The second value. |

Here are the four basic operations:

| ID  | Operation      | Example      | Result |
| --- | -------------- | ------------ | ------ |
| `+` | Addition       | `5` + `3`    | `8.0`  |
| `-` | Subtraction    | `5` - `3`    | `2.0`  |
| `*` | Multiplication | `5` * `3`    | `15.0` |
| `/` | Division       | `6` / `3`    | `2.0`  |

?> Numbers in Snowberry Jam are always stored as decimals, which is why `8` prints as `8.0`.

!> Dividing by `0` will raise an error.

### Printing Results
Since math blocks are values, they can go anywhere a value can, like a print block:
```json
{
    "id" : "PRINT",
    "value" : {
        "id" : "*",
        "a" : 6,
        "b" : 7
    }
}
```
> The above will print "42.0".

## Using Variables
`a` and `b` can also hold [variable blocks](lessons/variable-printer/variables.md#the-variable-block), which lets you do math with values that change:
```json
{
    "id" : "-",
    "a" : {
        "id" : "VARIABLE",
        "name" : "price"
    },
    "b" : {
        "id" : "VARIABLE",
        "name" : "discount"
    }
}
```
> The above will point to variable "price" minus variable "discount".

## Nesting Math Blocks
To do more than one operation, put a math block inside another one. The innermost block is calculated first, a bit like brackets in regular math.

For example, `(2 + 3) * 4` is written as:
```json
{
    "id" : "*",
    "a" : {
        "id" : "+",
        "a" : 2,
        "b" : 3
    },
    "b" : 4
}
```
> The above will point to `20.0`.

## Joining Text
The `+` block has one more trick: if either value is text, it joins them together instead of adding them.
```json
{
    "id" : "+",
    "a" : "My score is ",
    "b" : 10
}
```
> The above will point to `"My score is 10.0"`.

This is very useful for labelling your results:
```json
{
    "id" : "PRINT",
    "value" : {
        "id" : "+",
        "a" : "5 + 3 = ",
        "b" : {
            "id" : "+",
            "a" : 5,
            "b" : 3
        }
    }
}
```
> The above will print "5 + 3 = 8.0".

?> See the [Math guide](guides/values/math.md) for every math block, including `%` and `ROUND`.
