# Project Structure
Upon opening Snowberry Jam, you might see something around the lines of this:
```json
{
    "id" : "PROJECT",
    "name" : "Unnamed",
    "description" : "No description",
    "body" : {
        "variables" : [ ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [ ]
            }
        ]
    }
}
```
This is a special type of block, that contains your entire project. There are a couple things that you need to know:

| Property                 | Meaning                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| `name`                   | Metadata for the name of the project.                                 |
| `description`            | Metadata for the description of the project.                          |
| `body`.`variables`       | A list where variables should be created.                             |
| `body`.`events`.`ON_RUN` | The code to run. Everything should be written in its `body` property. |

?> See the [example code](https://github.com/wyu4/snowberry-jam/tree/master/example) for more information on the formatting of projects.