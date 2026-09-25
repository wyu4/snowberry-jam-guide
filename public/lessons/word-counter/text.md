# Text
Text (also called a string) is one of the most common types of values. It turns out that text and [arrays](lessons/word-counter/arrays.md) have a lot in common: a piece of text is really just a list of characters.

## Text as an Array
Many array blocks also work on text, treating it as an array of its characters.

The [Size Of](lessons/word-counter/arrays.md#the-size-of-block) block points to the number of characters:
```json
{
    "id" : "SIZE_OF",
    "a" : "snowberry"
}
```
> The above will point to `9.0`.

The [Element At](lessons/word-counter/arrays.md#the-element-at-block) block points to a single character:
```json
{
    "id" : "ELEMENT_AT",
    "a" : "snowberry",
    "i" : 0
}
```
> The above will point to `"s"`.

?> Spaces and punctuation count as characters too. `"Hi there!"` has a size of `9`.

### The Array Of Block
A **value** block that converts `a` into an array. Text is broken up into its characters.

```json
{
    "id" : "ARRAY_OF",
    "a" : "jam"
}
```
> The above will point to `["j", "a", "m"]`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The value to convert.   |

?> If `a` is already an array, it stays the same.

## Splitting Text
Breaking text up into characters isn't always what you want. Often, you'll want to break it up into words instead.

### The Split Block
A **value** block that splits the text of `a` into an array, wherever `b` is found.

```json
{
    "id" : "SPLIT",
    "a" : "red,green,blue",
    "b" : ","
}
```
> The above will point to `["red", "green", "blue"]`.

| Property | Meaning                        |
| -------- | ------------------------------ |
| `a`      | The text to split.             |
| `b`      | The pattern to split with.     |

Notice that the commas themselves aren't included in the result. Splitting with a space (`" "`) is a quick way to get every word in a sentence:
```json
{
    "id" : "SPLIT",
    "a" : "Hello! This is a test.",
    "b" : " "
}
```
> The above will point to `["Hello!", "This", "is", "a", "test."]`.

!> Some characters, like `.`, `|`, `*`, `+`, and `?`, have special meanings in the pattern. To split on one of them, put two backslashes in front of it. For example, to split on a period, use `"\\."`. See the [Split guide](guides/values/conversions.md#split) for more information.

## Comparing Text
Comparisons like `>` and `<` work on text too, but they compare the **length** of the text, not the alphabetical order.
```json
{
    "id" : ">",
    "a" : "banana",
    "b" : "fig"
}
```
> The above will point to `true`, since "banana" has more characters than "fig".

?> This is also true for arrays. Comparing two arrays compares how many elements they have.

## Checking a Type
Since a variable can hold any type, it can be useful to check what type a value currently is.

### The Same Type Block
A **value** block that checks if `a` and `b` are the same type (text, number, boolean, or array).

```json
{
    "id" : "SAME_TYPE",
    "a" : {
        "id" : "VARIABLE",
        "name" : "myVar"
    },
    "b" : ""
}
```
> The above will point to `true` if variable "myVar" is currently text.

| Property | Meaning                        |
| -------- | ------------------------------ |
| `a`      | The first value.               |
| `b`      | The value to compare types to. |

?> The value in `b` doesn't matter, only its type. `""`, `0`, `false`, and `[]` are easy choices for checking against text, numbers, booleans, and arrays.

?> See the [Conversions guide](guides/values/conversions.md) for more information.
