# Variable Printer
For your first project, you will be making a program that prints the value of a variable.

## 1. Setting up the project <!-- {docsify-ignore} -->
First, create a new project by heading over to `File > new`, or just paste this code into your editor:
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

Be sure to rename the project to anything you'd like. Setting this data is important for any program.

## 2. Create your variable <!-- {docsify-ignore} -->
Head over to the `variables` section, and create a variable called "var", with the value "This is my first project!".
```json
"variables" : [
    {
        "name" : "var",
        "value" : "This is my first project!"
    }
]
```

## 3. Create your print statement <!-- {docsify-ignore} -->
Head over to `ON_RUN`, and create a print block for your variable.
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "PRINT",
            "value" : {
                "id" : "VARIABLE",
                "name" : "var"
            }
        }
    ]
}
```
> If you want, you can also use the shorthand method!

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Variable Printer",
    "description" : "Prints the value of a variable.",
    "body" : {
        "variables" : [
            {
                "name" : "var",
                "value" : "This is my first project!"
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    {
                        "id" : "PRINT",
                        "value" : {
                            "id" : "VARIABLE",
                            "name" : "var"
                        }
                    }
                ]
            }
        ]
    }
}
```

## 4. Running <!-- {docsify-ignore} -->
Now that the code is put together, we can finally run it!

You should see something like this in the console:
```txt
[Variable Printer]    This is my first project!
```

Congrats! You just made your first Snowberry Jam project!

?> **Challenge:**<br>Make a program that has multiple variables, and print all of them.