# Arrays
So far, each variable has held one value. Arrays let a single variable hold a whole list of values, like a list of names, scores, or words.

## Creating an Array
Arrays are written with square brackets, with each element separated by a comma:
```json
"variables" : [
    {
        "name" : "fruits",
        "value" : ["apple", "banana", "cherry"]
    }
]
```

Elements can be any type, and don't all need to be the same type. An array can even be empty (`[]`), which is handy when you plan on filling it up later.

## Indexes
Each element has a number called its **index**. Indexes start at `0`, not `1`:

| Index | Element    |
| ----- | ---------- |
| `0`   | `"apple"`  |
| `1`   | `"banana"` |
| `2`   | `"cherry"` |

### The Element At Block
A **value** block that points to the element at index `i` of array `a`.

```json
{
    "id" : "ELEMENT_AT",
    "a" : {
        "id" : "VARIABLE",
        "name" : "fruits"
    },
    "i" : 1
}
```
> The above will point to `"banana"`.

| Property | Meaning                     |
| -------- | --------------------------- |
| `a`      | The array.                  |
| `i`      | The index of the element.   |

!> Using an index that's too big will raise an error. In the array above, the last index is `2`, so index `3` doesn't exist.

## The Size Of Block
A **value** block that points to the number of elements in array `a`.

```json
{
    "id" : "SIZE_OF",
    "a" : {
        "id" : "VARIABLE",
        "name" : "fruits"
    }
}
```
> The above will point to `3.0`.

| Property | Meaning                       |
| -------- | ----------------------------- |
| `a`      | The value to get the size of. |

?> Since indexes start at `0`, the last element of an array is always at index *size - 1*.

## Adding Elements
The [`+` block](guides/values/math.md#behaviour-by-type) works on arrays too. Adding a value to an array puts it at the end:
```json
{
    "id" : "+",
    "a" : ["apple", "banana"],
    "b" : "cherry"
}
```
> The above will point to `["apple", "banana", "cherry"]`.

To add to an array stored in a variable, the [increase (`+=`) block](guides/tasks/variables.md#increase) does the same thing, and saves the result back into the variable:
```json
{
    "id" : "+=",
    "name" : "fruits",
    "value" : "dragonfruit"
}
```
> The above will add "dragonfruit" to the end of variable "fruits".

!> Value blocks can't go *inside* an array written with square brackets. `[ {"id": "INPUT"} ]` won't ask for input. Add values to the array with `+` or `+=` instead.

## Changing an Element
### The With Updated Element Block
A **value** block that points to a **copy** of array `a`, with the element at index `i` replaced by `b`.

```json
{
    "id" : "WITH_UPDATED_ELEMENT",
    "a" : {
        "id" : "VARIABLE",
        "name" : "fruits"
    },
    "i" : 0,
    "b" : "apricot"
}
```
> The above will point to `["apricot", "banana", "cherry"]`.

| Property | Meaning                               |
| -------- | ------------------------------------- |
| `a`      | The array.                            |
| `i`      | The index of the element to replace.  |
| `b`      | The new element.                      |

Since it only makes a copy, the original variable doesn't change. To actually update the variable, [set](guides/tasks/variables.md#set) it to the result:
```json
{
    "id" : "SET",
    "name" : "fruits",
    "value" : {
        "id" : "WITH_UPDATED_ELEMENT",
        "a" : {
            "id" : "VARIABLE",
            "name" : "fruits"
        },
        "i" : 0,
        "b" : "apricot"
    }
}
```

## Looping Through an Array
When a [Repeat](lessons/guessing-game/loops.md#the-repeat-block) block is given an array, it loops once for every element. Combined with a counting variable and Element At, this lets you go through the array one element at a time:
```json
{
    "id" : "REPEAT",
    "value" : {
        "id" : "VARIABLE",
        "name" : "fruits"
    },
    "name" : "i",
    "body" : [
        {
            "id" : "ELEMENT_AT",
            "a" : {
                "id" : "VARIABLE",
                "name" : "fruits"
            },
            "i" : {
                "id" : "VARIABLE",
                "name" : "i"
            }
        }
    ]
}
```
> The above will print "apple", "banana", and "cherry", one per line.

?> The count from Repeat starts at `0`, just like indexes do. That's why they fit together so well.

?> See the [Arrays guide](guides/values/arrays.md) for more information.
