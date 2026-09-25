# Conversions
Conversion blocks are **value** blocks that turn a value from one type into another.

## Size Of
A **value** block that points to the size of `a`, as a number.

```json
{
    "id" : "SIZE_OF",
    "a" : {
        "id" : "VARIABLE",
        "name" : "arr"
    }
}
```
> The above will point to the number of elements in variable "arr".

| Property | Meaning                       |
| -------- | ----------------------------- |
| `a`      | The value to get the size of. |

What "size" means depends on the type of `a`:

| Type of `a` | Size                                            |
| ----------- | ----------------------------------------------- |
| Number      | The number itself.                              |
| Text        | The number of characters.                       |
| Array       | The number of elements.                         |
| Boolean     | `1` if `true`, `0` if `false`.                  |

?> Many other blocks use size behind the scenes, like [comparisons](guides/values/conditions.md#comparisons), [Repeat](guides/tasks/loops.md#repeat), and [Wait](guides/tasks/timing.md#wait).

## Array Of
A **value** block that converts `a` into an array.

```json
{
    "id" : "ARRAY_OF",
    "a" : "abc"
}
```
> The above will point to `["a", "b", "c"]`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The value to convert.   |

If `a` is already an array, it stays the same. Anything else is converted into text, and then broken up into an array of its characters.

!> Since numbers are stored as decimals, `ARRAY_OF` on the number `12` will give `["1", "2", ".", "0"]`.

## Split
A **value** block that splits the text of `a` into an array, wherever the pattern `b` is found.

```json
{
    "id" : "SPLIT",
    "a" : "Hello! This is a test.",
    "b" : " "
}
```
> The above will point to `["Hello!", "This", "is", "a", "test."]`.

| Property | Meaning                                                              |
| -------- | -------------------------------------------------------------------- |
| `a`      | The value to split. Will automatically be converted into text.       |
| `b`      | The pattern to split with. If left out, the array will only contain `a`. |

!> The pattern in `b` is a [regular expression](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html). Most characters work as you'd expect, but special characters such as `.`, `|`, `*`, `+`, and `?` need to be escaped with two backslashes. For example, to split on a period, use `"\\."`.

## Parse Number
A **value** block that converts the text of `a` into a number.

```json
{
    "id" : "PARSE_NUMBER",
    "a" : "3.14"
}
```
> The above will point to the number `3.14`.

| Property | Meaning                                                          |
| -------- | ---------------------------------------------------------------- |
| `a`      | The value to convert. Will automatically be converted into text. |

?> Spaces before or after the number are ignored, so `" 42 "` will still become `42.0`.

!> If the text isn't a valid number, an error will be raised.

?> Combined with [Input](guides/values/built-ins.md#input), Parse Number lets the user type in numbers:
```json
{
    "id" : "SET",
    "name" : "age",
    "value" : {
        "id" : "PARSE_NUMBER",
        "a" : {
            "id" : "INPUT"
        }
    }
}
```
