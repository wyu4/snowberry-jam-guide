# Values
Values are blocks that point to or represent a piece of data. They never run on their own. Instead, they're placed inside the properties of [tasks](guides/tasks/README.md) (or inside other values), and are evaluated whenever the task needs them.

## Data Types
Every value eventually boils down to one of four types:

| Type      | Example                   | Notes                                                                             |
| --------- | ------------------------- | --------------------------------------------------------------------------------- |
| Text      | `"Hello World!"`          | Also known as a string.                                                           |
| Number    | `123`, `-4.5`             | All numbers are stored as decimals, so `1` will print as `1.0`.                   |
| Boolean   | `true`, `false`           | Used by conditions.                                                               |
| Array     | `[1, "two", false]`       | A list of values. Elements can be of any type, including other arrays.            |

Any of these can be typed directly into a property. These are called **primitive** values:
```json
{
    "id" : "PRINT",
    "value" : 123
}
```

## Value Blocks
When you need something more than a primitive, you can use a value block instead. Value blocks can be nested inside each other as deeply as you'd like.
```json
{
    "id" : "PRINT",
    "value" : {
        "id" : "+",
        "a" : "The answer is ",
        "b" : {
            "id" : "*",
            "a" : 6,
            "b" : 7
        }
    }
}
```
> The above will print "The answer is 42.0".

### Parameters
Most value blocks take their inputs through the properties `a`, `b`, and sometimes `i`. Just like task properties, each of these can hold either a primitive or another value block.

!> Value blocks can't be placed *inside* an array primitive. An array like `[ {"id": "RANDOM"} ]` will not evaluate the block. Use [`+`](guides/values/math.md#plus) to add values to an array instead.

## All Value Blocks
| ID                                                                     | Category                                     | Description                                              |
| ---------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------- |
| [`VARIABLE`](lessons/variable-printer/variables.md#the-variable-block) | Variables                                    | The value of a variable.                                 |
| [`+`](guides/values/math.md#plus)                                      | [Math](guides/values/math.md)                | Adds, joins text, or appends to arrays.                  |
| [`-`](guides/values/math.md#minus)                                     | [Math](guides/values/math.md)                | Subtracts two numbers.                                   |
| [`*`](guides/values/math.md#multiply)                                  | [Math](guides/values/math.md)                | Multiplies two numbers.                                  |
| [`/`](guides/values/math.md#divide)                                    | [Math](guides/values/math.md)                | Divides two numbers.                                     |
| [`%`](guides/values/math.md#modulus)                                   | [Math](guides/values/math.md)                | The remainder of a division.                             |
| [`ROUND`](guides/values/math.md#round)                                 | [Math](guides/values/math.md)                | Rounds a number.                                         |
| [`==`](guides/values/conditions.md#equals)                             | [Conditions](guides/values/conditions.md)    | Checks if two values are equal.                          |
| [`!=`](guides/values/conditions.md#not-equals)                         | [Conditions](guides/values/conditions.md)    | Checks if two values are different.                      |
| [`>`](guides/values/conditions.md#greater-than)                        | [Conditions](guides/values/conditions.md)    | Checks if one value is greater than another.             |
| [`>=`](guides/values/conditions.md#greater-or-equal-to)                | [Conditions](guides/values/conditions.md)    | Checks if one value is greater than or equal to another. |
| [`<`](guides/values/conditions.md#less-than)                           | [Conditions](guides/values/conditions.md)    | Checks if one value is less than another.                |
| [`<=`](guides/values/conditions.md#less-or-equal-to)                   | [Conditions](guides/values/conditions.md)    | Checks if one value is less than or equal to another.    |
| [`SAME_TYPE`](guides/values/conditions.md#same-type)                   | [Conditions](guides/values/conditions.md)    | Checks if two values share the same type.                |
| [`AND`](guides/values/conditions.md#and)                               | [Conditions](guides/values/conditions.md)    | True if both values are true.                            |
| [`OR`](guides/values/conditions.md#or)                                 | [Conditions](guides/values/conditions.md)    | True if either value is true.                            |
| [`NOT`](guides/values/conditions.md#not)                               | [Conditions](guides/values/conditions.md)    | Inverts a value.                                         |
| [`SIZE_OF`](guides/values/conversions.md#size-of)                      | [Conversions](guides/values/conversions.md)  | The size of a value.                                     |
| [`ARRAY_OF`](guides/values/conversions.md#array-of)                    | [Conversions](guides/values/conversions.md)  | Converts a value into an array.                          |
| [`SPLIT`](guides/values/conversions.md#split)                          | [Conversions](guides/values/conversions.md)  | Splits text into an array.                               |
| [`PARSE_NUMBER`](guides/values/conversions.md#parse-number)            | [Conversions](guides/values/conversions.md)  | Converts text into a number.                             |
| [`ELEMENT_AT`](guides/values/arrays.md#element-at)                     | [Arrays](guides/values/arrays.md)            | Gets an element from an array.                           |
| [`WITH_UPDATED_ELEMENT`](guides/values/arrays.md#with-updated-element) | [Arrays](guides/values/arrays.md)            | A copy of an array with one element replaced.            |
| [`RANDOM`](guides/values/built-ins.md#random)                          | [Built-Ins](guides/values/built-ins.md)      | A random number between 0 and 1.                         |
| [`TIME`](guides/values/built-ins.md#time)                              | [Built-Ins](guides/values/built-ins.md)      | The current time in milliseconds.                        |
| [`INPUT`](guides/values/built-ins.md#input)                            | [Built-Ins](guides/values/built-ins.md)      | Waits for the user to type something.                    |
| [`PUBLIC_FOLDER`](guides/values/built-ins.md#public-folder)            | [Built-Ins](guides/values/built-ins.md)      | The path to Snowberry Jam's public folder.               |
| [`READ`](guides/values/io.md#read-file)                                | [IO](guides/values/io.md)                    | The contents of a file.                                  |

?> Using an ID that doesn't exist will show a warning while compiling, and the value will be treated as `null`.
