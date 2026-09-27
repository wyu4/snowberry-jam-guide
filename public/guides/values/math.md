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

## Sine
A **value** block that passes `a` through the sine function.

```json
{
    "id" : "SIN",
    "a" : 3.14159
}
```
> The above will point to `0.0` (roughly).

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The angle in radians |

!> `a` must be a number, otherwise an error will be raised.

?> Combine Sine with [Divide](#divide) using the `1/sin(Θ) = csc(Θ)` identity to create the `cosecant` function
```json
{
    "id" : "/",
    "1" : 1,
    "b" : {
        "id" : "SIN",
        "a" : 2,
    }
}
```
> The above is equivalent to `csc(2)`

## Cosine
A **value** block that passes `a` through the cosine function.

```json
{
    "id" : "COS",
    "a" : 3.14159
}
```
> The above will point to `-1.0` (roughly).

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The angle in radians |

!> `a` must be a number, otherwise an error will be raised.

?> Combine Cosine with [Divide](#divide) using the `1/cos(Θ) = sec(Θ)` identity to create the `secant` function
```json
{
    "id" : "/",
    "a" : 1,
    "b" : {
        "id" : "COS",
        "a" : 2
    }
}
```
> The above is equivalent to `sec(2)`

## Tangent
A **value** block that passes `a` through the tangent function.

```json
{
    "id" : "TAN",
    "a" : 0.785398
}
```
> The above will point to `1.0` (roughly).

| Property | Meaning              |
| -------- | -------------------- |
| `a`      | The angle in radians |

!> `a` must be a number, otherwise an error will be raised.

?> Combine Tangent with [Divide](#divide) using the `1/tan(Θ) = cot(Θ)` identity to create the `cotangent` function
```json
{
    "id" : "/",
    "a" : 1,
    "b" : {
        "id" : "TAN",
        "a" : 2
    }
}
```
> The above is equivalent to `cot(2)`

## Arcsine
A **value** block that passes `a` through the inverse sine function, giving an angle in radians.

```json
{
    "id" : "ASIN",
    "a" : 1
}
```
> The above will point to `1.5708` (roughly).

| Property | Meaning                                  |
| -------- | ---------------------------------------- |
| `a`      | The sine of the angle, from `-1` to `1`  |

!> `a` must be a number between `-1` and `1`, otherwise an error will be raised.

## Arccosine
A **value** block that passes `a` through the inverse cosine function, giving an angle in radians.

```json
{
    "id" : "ACOS",
    "a" : -1
}
```
> The above will point to `3.14159` (roughly).

| Property | Meaning                                   |
| -------- | ----------------------------------------- |
| `a`      | The cosine of the angle, from `-1` to `1` |

!> `a` must be a number between `-1` and `1`, otherwise an error will be raised.

## Arctangent
A **value** block that passes `a` through the inverse tangent function, giving an angle in radians.

```json
{
    "id" : "ATAN",
    "a" : 1
}
```
> The above will point to `0.785398` (roughly).

| Property | Meaning                  |
| -------- | ------------------------ |
| `a`      | The tangent of the angle |

!> `a` must be a number, otherwise an error will be raised.

## Power
A **value** block that raises `a` to the power of `b`.

```json
{
    "id" : "^",
    "a" : 2,
    "b" : 3
}
```
> The above will point to `8.0`.

| Property | Meaning                        |
| -------- | ------------------------------ |
| `a`      | The base.                      |
| `b`      | The exponent to raise `a` to.  |

!> Both `a` and `b` must be numbers, otherwise an error will be raised.

?> A fractional exponent is fundementally a [Root](#root). The following is the square root of `9`, and will point to `3.0`:
```json
{
    "id" : "^",
    "a" : 9,
    "b" : 0.5
}
```

## Root
A **value** block that takes the `b`th root of `a`.

```json
{
    "id" : "ROOT",
    "a" : 27,
    "b" : 3
}
```
> The above will point to `3.0`.

| Property | Meaning                                           |
| -------- | ------------------------------------------------- |
| `a`      | The radicand (the number to take the root of).    |
| `b`      | The index of the root. Optional, defaults to `2`. |

?> Leave out `b` to take the square root. The following will point to `3.0`:
```json
{
    "id" : "ROOT",
    "a" : 9
}
```

!> `a` must be a number, otherwise an error will be raised. If `b` isn't a number, it will be treated as `2`.
