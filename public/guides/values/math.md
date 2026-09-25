# Math
Math blocks are **value** blocks that perform arithmetic on two values, `a` and `b`. The result can be used anywhere a value is expected.

## Plus
A **value** block that adds `a` and `b` together. Plus behaves differently depending on the types it's given, which makes it one of the most useful blocks in Snowberry Jam.

```json
{
    "id" : "+",
    "a" : 1,
    "b" : 2
}
```
> The above will point to `3.0`.

| Property | Meaning                  |
| -------- | ------------------------ |
| `a`      | The first value.         |
| `b`      | The value to add to `a`. |

### Behaviour by Type
| `a`       | `b`       | Result                                                                  |
| --------- | --------- | ----------------------------------------------------------------------- |
| Array     | Array     | Both arrays merged into one. (`[1, 2]` + `[3]` → `[1, 2, 3]`)           |
| Array     | Any other | `b` appended to the end of the array. (`[1, 2]` + `3` → `[1, 2, 3]`)    |
| Text      | Any       | Both joined together as text. (`"Score: "` + `10` → `"Score: 10.0"`)    |
| Any       | Text      | Both joined together as text. (`10` + `"pts"` → `"10.0pts"`)            |
| Boolean   | Boolean   | Acts as an `OR` gate. (`true` + `false` → `true`)                       |
| Number    | Number    | Regular addition. (`1` + `2` → `3.0`)                                   |
| Number    | Boolean   | Addition, where `true` counts as `1` and `false` counts as `0`.         |

?> Joining text is one of the most common uses of Plus. To combine more than two pieces, nest another Plus block inside `b`:
```json
{
    "id" : "+",
    "a" : "The user inputted \"",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "INPUT"
        },
        "b" : "\"."
    }
}
```

## Minus
A **value** block that subtracts `b` from `a`.

```json
{
    "id" : "-",
    "a" : 10,
    "b" : 4
}
```
> The above will point to `6.0`.

| Property | Meaning                        |
| -------- | ------------------------------ |
| `a`      | The number to subtract from.   |
| `b`      | The number to subtract.        |

!> Both `a` and `b` must be numbers, otherwise an error will be raised.

## Multiply
A **value** block that multiplies `a` and `b`.

```json
{
    "id" : "*",
    "a" : 6,
    "b" : 7
}
```
> The above will point to `42.0`.

| Property | Meaning             |
| -------- | ------------------- |
| `a`      | The first number.   |
| `b`      | The second number.  |

?> If both `a` and `b` are booleans, Multiply acts as an `AND` gate. (`true` * `false` → `false`)

!> Any other combination of types will raise an error.

## Divide
A **value** block that divides `a` by `b`.

```json
{
    "id" : "/",
    "a" : 7,
    "b" : 2
}
```
> The above will point to `3.5`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The number to divide.   |
| `b`      | The number to divide by.|

!> Both `a` and `b` must be numbers, and `b` can't be `0`. Otherwise, an error will be raised.

## Modulus
A **value** block that gives the remainder of `a` divided by `b`.

```json
{
    "id" : "%",
    "a" : 7,
    "b" : 2
}
```
> The above will point to `1.0`.

| Property | Meaning                 |
| -------- | ----------------------- |
| `a`      | The number to divide.   |
| `b`      | The number to divide by.|

?> Modulus is handy for checking if a number is even: if `a % 2` equals `0`, `a` is even.

!> Both `a` and `b` must be numbers, and `b` can't be `0`. Otherwise, an error will be raised.

## Round
A **value** block that rounds `a` to the nearest whole number. Halves are rounded up.

```json
{
    "id" : "ROUND",
    "a" : 2.5
}
```
> The above will point to `3.0`.

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The number to round. |

!> `a` must be a number, otherwise an error will be raised.

?> Combine Round with [Random](guides/values/built-ins.md#random) to get a random whole number. The following will point to either `0.0`, `1.0`, `2.0`, or `3.0`:
```json
{
    "id" : "ROUND",
    "a" : {
        "id" : "*",
        "a" : {
            "id" : "RANDOM"
        },
        "b" : 3
    }
}
```
