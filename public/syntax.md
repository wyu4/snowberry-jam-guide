# Code Syntax
A Snowberry Jam is written following the JSON syntax. If you aren't quite familiar with this, it's a common way of formatting data. This will be much more clearer as we go.

## Blocks
Snowberry Jam offers two different types of "blocks", each having their own categories:

### Tasks
These are blocks that actually run in the code. This includes printing, variable setting, loops, and etc. These, without [values](#Values), are like empty shells.

?> See the [Tasks guide](guides/tasks/README.md) for a list of every task block.

### Values
These are blocks that point or represent a certain piece of data. This can range from primitive values such as numbers, text, arrays, or more complicated operations such as math operations, equalities, and boolean algebra. Values are used to store data, and are accessed by the task blocks.

?> See the [Values guide](guides/values/README.md) for a list of every value block.

## Format
All blocks share the same JSON structure, while having different keys.

Here's an example of a block that prints "hello world" to the console:
```json
{
    "id" : "PRINT",
    "value" : "Hello World!"
}
```

Each block has an `id`, which will distinguish them from each other. Depending on the block, it'll also have other properties. In this case, the print block has a value key, in which contains the value `"Hello World!"`.

This is only one of many blocks.