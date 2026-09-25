# Conditions
Condition blocks are **value** blocks that always point to a boolean (`true` or `false`). They are what tasks like [If](guides/tasks/conditionals.md) and [While](guides/tasks/loops.md#while) use to make decisions.

## Comparisons
Comparisons check how value `a` relates to value `b`.

### Equals
A **value** block that checks if `a` and `b` are equal.

```json
{
    "id" : "==",
    "a" : {
        "id" : "VARIABLE",
        "name" : "myNumber"
    },
    "b" : 15
}
```
> The above will point to `true` if variable "myNumber" is 15.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

!> Values of different types are never equal. For example, the text `"15"` is **not** equal to the number `15`. Use [Parse Number](guides/values/conversions.md#parse-number) to convert text first.

?> Two arrays are equal if they contain the same elements in the same order.

### Not Equals
A **value** block that checks if `a` and `b` are **not** equal. This is the opposite of [Equals](#equals).

```json
{
    "id" : "!=",
    "a" : {
        "id" : "VARIABLE",
        "name" : "input"
    },
    "b" : "e"
}
```
> The above will point to `true` as long as variable "input" isn't "e".

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

### Greater Than
A **value** block that checks if `a` is greater than `b`.

```json
{
    "id" : ">",
    "a" : 10,
    "b" : 5
}
```
> The above will point to `true`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

### Greater Or Equal To
A **value** block that checks if `a` is greater than or equal to `b`.

```json
{
    "id" : ">=",
    "a" : 5,
    "b" : 5
}
```
> The above will point to `true`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

### Less Than
A **value** block that checks if `a` is less than `b`.

```json
{
    "id" : "<",
    "a" : {
        "id" : "VARIABLE",
        "name" : "computer"
    },
    "b" : 1
}
```
> The above will point to `true` if variable "computer" is less than 1.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

### Less Or Equal To
A **value** block that checks if `a` is less than or equal to `b`.

```json
{
    "id" : "<=",
    "a" : 3,
    "b" : 5
}
```
> The above will point to `true`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The first value.        |
| `b`      | The value to compare to.|

?> `>`, `>=`, `<`, and `<=` compare the [size](guides/values/conversions.md#size-of) of each value. Numbers are compared normally, but text and arrays are compared by their length, and booleans count as `1` (`true`) or `0` (`false`).

### Same Type
A **value** block that checks if `a` and `b` are the same type (text, number, boolean, or array).

```json
{
    "id" : "SAME_TYPE",
    "a" : {
        "id" : "VARIABLE",
        "name" : "myVar"
    },
    "b" : 0
}
```
> The above will point to `true` if variable "myVar" is currently a number.

| Property | Meaning                     |
| -------- | --------------------------- |
| `a`      | The first value.            |
| `b`      | The value to compare types. |

## Logic
Logic blocks combine or invert other conditions.

### And
A **value** block that checks if both `a` **and** `b` are true.

```json
{
    "id" : "AND",
    "a" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "age"
        },
        "b" : 12
    },
    "b" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "age"
        },
        "b" : 20
    }
}
```
> The above will point to `true` if variable "age" is between 12 and 20.

| Property | Meaning             |
| -------- | ------------------- |
| `a`      | The first value.    |
| `b`      | The second value.   |

### Or
A **value** block that checks if `a` **or** `b` (or both) are true.

```json
{
    "id" : "OR",
    "a" : {
        "id" : "==",
        "a" : {
            "id" : "VARIABLE",
            "name" : "input"
        },
        "b" : "y"
    },
    "b" : {
        "id" : "==",
        "a" : {
            "id" : "VARIABLE",
            "name" : "input"
        },
        "b" : "yes"
    }
}
```
> The above will point to `true` if variable "input" is either "y" or "yes".

| Property | Meaning             |
| -------- | ------------------- |
| `a`      | The first value.    |
| `b`      | The second value.   |

?> `AND` and `OR` work best with booleans, but they also accept other types, as long as `a` and `b` are the same type:
- **Numbers** count as true when they're greater than `0`.
- **Text** counts as true when it isn't empty (`""`).
- Anything else counts as true as long as it exists.

### Not
A **value** block that inverts `a`. `true` becomes `false`, and `false` becomes `true`.

```json
{
    "id" : "NOT",
    "a" : {
        "id" : "VARIABLE",
        "name" : "condition"
    }
}
```
> The above will point to `true` if variable "condition" is `false`.

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The value to invert. |

?> If `a` is a number, Not points to `true` when the number is `0` or less.

!> `a` must be a boolean or a number, otherwise an error will be raised.
