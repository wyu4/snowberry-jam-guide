# Files
So far, all of your program's data has either been written into the code, or typed in by the user. Reading from a file lets your program use data that lives outside of it, which can be changed without touching the code at all.

## The Public Folder
Snowberry Jam creates a folder on your computer for your programs to keep files in, called the **public folder**.

### The Public Folder Block
A **value** block that points to the full path of the public folder.

```json
{
    "id" : "PUBLIC_FOLDER"
}
```
> On Windows, the above will point to something like `C:\Users\you\AppData\Roaming/SnowberryJam/`.

?> Not sure where it is on your computer? Just [print](lessons/variable-printer/printing.md) it!

The path already ends with a `/`, so to get the path of a file inside it, [add](guides/values/math.md#plus) the file's name to the end:
```json
{
    "id" : "+",
    "a" : {
        "id" : "PUBLIC_FOLDER"
    },
    "b" : "notes.txt"
}
```
> The above will point to the path of `notes.txt` inside the public folder.

## Reading a File
### The Read Block
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
> The above will point to everything written in `notes.txt`.

| Property | Meaning               |
| -------- | --------------------- |
| `a`      | The path to the file. |

!> If the file doesn't exist, an error will be raised. Double check the file's name, and make sure it's inside the public folder.

### Try It Out
1. Print the public folder's path, and open that folder on your computer.
2. Create a text file inside it called `notes.txt`, and write something in it.
3. Print the Read block above.

Whatever you wrote in the file will show up in the console. Change the file, run the code again, and the output changes too, without editing a single block.

## Reading Line by Line
A file usually holds more than one piece of data, one on each line. To work with each line separately, [split](lessons/word-counter/text.md#the-split-block) the file on `"\n"`, which is the code for a new line:
```json
{
    "id" : "SET",
    "name" : "lines",
    "value" : {
        "id" : "SPLIT",
        "a" : {
            "id" : "READ",
            "a" : {
                "id" : "+",
                "a" : {
                    "id" : "PUBLIC_FOLDER"
                },
                "b" : "notes.txt"
            }
        },
        "b" : "\n"
    }
}
```
> The above will set variable "lines" to an array, with one element per line of the file.

From there, "lines" is just a regular [array](lessons/word-counter/arrays.md). You can get its size, loop through it, or pick out a single line with Element At.

?> Lines can be split up even further. For example, if each line is `name,score`, splitting a line on `","` gives you the name and score separately.

?> See the [Built-Ins guide](guides/values/built-ins.md) for more information.
