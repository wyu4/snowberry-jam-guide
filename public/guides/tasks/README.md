# Tasks
Tasks are blocks that actually run. They're placed inside a `body`, such as the body of `ON_RUN`, and are run one after the other, from top to bottom.

```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : "This runs first."
        },
        {
            "id" : "WAIT",
            "value" : 1
        },
        {
            "id" : "PRINT",
            "value" : "This runs one second later."
        }
    ]
}
```

## Properties
Most tasks share the same few properties:

| Property | Meaning                                                                             |
| -------- | ----------------------------------------------------------------------------------- |
| `value`  | The main input of the task. Can be a primitive or a [value](guides/values/README.md) block. |
| `name`   | The name of a variable that the task changes.                                       |
| `body`   | A list of tasks that run inside this task (used by if statements, loops, and threads). |
| `else`   | A second list of tasks, used by [If Else](guides/tasks/conditionals.md#if-else).     |

### Bodies
Some tasks, like [If](guides/tasks/conditionals.md#if) and [While](guides/tasks/loops.md#while), have their own `body`. Tasks inside a body work exactly the same as tasks inside `ON_RUN`, and bodies can be nested inside each other.

?> Just like in `ON_RUN`, any value placed directly inside a body is automatically turned into a [print](lessons/variable-printer/printing.md#shorthand) block.

### Conditions
Tasks that make decisions ([If](guides/tasks/conditionals.md#if), [If Else](guides/tasks/conditionals.md#if-else), [While](guides/tasks/loops.md#while), and [Wait Until](guides/tasks/timing.md#wait-until)) need a boolean in their `value` property. This can be `true`, `false`, a variable holding a boolean, or a [condition](guides/values/conditions.md) block.

!> If the value isn't a boolean, the code will fail to compile with the message *"Value passed as condition is not conditional."*

## All Task Blocks
| ID                                                       | Category                                         | Description                                          |
| -------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| [`PRINT`](guides/tasks/logging.md#print)                  | [Logging](guides/tasks/logging.md)               | Prints a message to the console.                     |
| [`WARN`](guides/tasks/logging.md#warn)                    | [Logging](guides/tasks/logging.md)               | Prints a warning to the console.                     |
| [`ERROR`](guides/tasks/logging.md#error)                  | [Logging](guides/tasks/logging.md)               | Stops the code with an error message.                |
| [`SET`](guides/tasks/variables.md#set)                    | [Variables](guides/tasks/variables.md)           | Changes the value of a variable.                     |
| [`+=`](guides/tasks/variables.md#increase)                | [Variables](guides/tasks/variables.md)           | Adds to a variable.                                  |
| [`-=`](guides/tasks/variables.md#decrease)                | [Variables](guides/tasks/variables.md)           | Subtracts from a variable.                           |
| [`INPUT`](guides/tasks/variables.md#input)                | [Variables](guides/tasks/variables.md)           | Stores the user's input in a variable.               |
| [`IF`](guides/tasks/conditionals.md#if)                   | [Conditionals](guides/tasks/conditionals.md)     | Runs a body if a condition is true.                  |
| [`IF_ELSE`](guides/tasks/conditionals.md#if-else)         | [Conditionals](guides/tasks/conditionals.md)     | Runs one of two bodies, depending on a condition.    |
| [`WHILE`](guides/tasks/loops.md#while)                    | [Loops](guides/tasks/loops.md)                   | Runs a body over and over while a condition is true. |
| [`REPEAT`](guides/tasks/loops.md#repeat)                  | [Loops](guides/tasks/loops.md)                   | Runs a body a set number of times.                   |
| [`WAIT`](guides/tasks/timing.md#wait)                     | [Timing](guides/tasks/timing.md)                 | Pauses for a number of seconds.                      |
| [`WAIT_UNTIL`](guides/tasks/timing.md#wait-until)         | [Timing](guides/tasks/timing.md)                 | Pauses until a condition is true.                    |
| [`THREAD`](guides/tasks/threads.md#thread)                | [Threads](guides/tasks/threads.md)               | Runs a body at the same time as the rest of the code.|

?> Using an ID that doesn't exist won't stop your code from compiling. Instead, it will be skipped, and a warning will be printed when the code reaches it.
