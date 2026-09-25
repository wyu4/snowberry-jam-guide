# IO
IO (input/output) blocks are **value** blocks that read data from outside your program, such as files.

## Read File
A **value** block that points to the contents of a file, as text.

```json
{
    "id" : "READ",
    "a" : {
        "id" : "+",
        "a" : {
            "id" : "PUBLIC_FOLDER"
        },
        "b" : "notes.txt"
    }
}
```
> The above will point to the contents of `notes.txt` inside the [public folder](guides/values/built-ins.md#public-folder).

| Property | Meaning                   |
| -------- | ------------------------- |
| `a`      | The path to the file.     |

!> If the file doesn't exist or can't be read, an error will be raised.
