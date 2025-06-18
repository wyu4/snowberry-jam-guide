# Variables
## Creating a Variable
Variables need to be created in the `variables` section before they can be used. Here are some examples:
```json
{
    "variables" : [
        {
            "name" : "myString",
            "value" : "This variables has text."
        },
        {
            "name" : "myNumber",
            "value" : 123
        },
        {
            "name" : "myArray",
            "value" : ["this", "is", "an", "array."]
        },
        {
            "name" : "myBoolean",
            "value" : false
        },
    ]
}
```

## The Variable Block
This is a block that points to the value of a variable.

```json
{
    "id": "VARIABLE",
    "name": "myNumber"
}
```
| Property | Meaning                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| name     | The name of the variable to point to. Can be any type, but will automatically be converted into string form. |

!> Accessing a variable that wasn't created the same way as the section [Creating a Variable](#Creating-a-Variable) will raise an exception.