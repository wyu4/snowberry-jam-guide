# Arrays
Arrays are lists of values. They can be created directly in the [variables](lessons/variable-printer/variables.md#creating-a-variable) section, or built with blocks like [Split](guides/values/conversions.md#split) and [Array Of](guides/values/conversions.md#array-of).

Array elements are numbered starting from `0`. In the array `["a", "b", "c"]`, `"a"` is at index `0`, `"b"` at index `1`, and `"c"` at index `2`.

?> To add elements to an array, use [Plus](guides/values/math.md#plus), or the [`+=`](guides/tasks/variables.md#increase) task. To get the number of elements, use [Size Of](guides/values/conversions.md#size-of).

## Element At
A **value** block that points to the element at index `i` of array `a`.

```json
{
    "id" : "ELEMENT_AT",
    "a" : ["This", "is", "an", "array"],
    "i" : 1
}
```
> The above will point to `"is"`.

| Property | Meaning                                                           |
| -------- | ----------------------------------------------------------------- |
| `a`      | The array. Text will be treated as an array of its characters.    |
| `i`      | The index of the element. Decimals are rounded to the nearest whole number. |

!> If `i` is outside the array (for example, index `4` of an array with 4 elements), an error will be raised.

## With Updated Element
A **value** block that points to a **copy** of array `a`, where the element at index `i` is replaced with `b`.

```json
{
    "id" : "WITH_UPDATED_ELEMENT",
    "a" : ["red", "green", "blue"],
    "i" : 1,
    "b" : "yellow"
}
```
> The above will point to `["red", "yellow", "blue"]`.

| Property | Meaning                                                           |
| -------- | ----------------------------------------------------------------- |
| `a`      | The array. Text will be treated as an array of its characters.    |
| `i`      | The index of the element to replace. Decimals are rounded to the nearest whole number. |
| `b`      | The new element.                                                  |

!> If `i` is outside the array, an error will be raised.

### Updating a Variable
With Updated Element doesn't change the original array. To actually update an array stored in a variable, [set](guides/tasks/variables.md#set) the variable to the result:
```json
{
    "id" : "SET",
    "name" : "arr",
    "value" : {
        "id" : "WITH_UPDATED_ELEMENT",
        "a" : {
            "id" : "VARIABLE",
            "name" : "arr"
        },
        "i" : 0,
        "b" : "new first element"
    }
}
```

## Looping Through an Array
The [Repeat](guides/tasks/loops.md#repeat) task can loop once for every element in an array. Combined with Element At, you can go through each element one by one:
```json
{
    "id" : "REPEAT",
    "value" : {
        "id" : "VARIABLE",
        "name" : "myArray"
    },
    "name" : "i",
    "body" : [
        {
            "id" : "ELEMENT_AT",
            "a" : {
                "id" : "VARIABLE",
                "name" : "myArray"
            },
            "i" : {
                "id" : "VARIABLE",
                "name" : "i"
            }
        }
    ]
}
```
> The above will print every element of variable "myArray", one per line. Both variables "myArray" and "i" need to be created first.
