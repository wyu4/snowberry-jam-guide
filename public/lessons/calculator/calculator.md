# Calculator
For this project, you will be making a calculator that asks the user for two numbers, and prints their sum, difference, product, and quotient.

## 1. Setting up the project <!-- {docsify-ignore} -->
Create a new project, and give it a name and description:
```json
{
    "id" : "PROJECT",
    "name" : "Calculator",
    "description" : "Does math with two numbers.",
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

## 2. Create your variables <!-- {docsify-ignore} -->
You'll need two variables to store the numbers, "a" and "b". Since they'll be holding numbers, start them off at `0`.
```json
"variables" : [
    {
        "name" : "a",
        "value" : 0
    },
    {
        "name" : "b",
        "value" : 0
    }
]
```

## 3. Ask for the numbers <!-- {docsify-ignore} -->
Head over to `ON_RUN`. For each number, print a question, then set the variable to the user's input, [parsed as a number](lessons/calculator/input.md#the-parse-number-block).
```json
{
    "id" : "ON_RUN",
    "body" : [
        "Enter the first number:",
        {
            "id" : "SET",
            "name" : "a",
            "value" : {
                "id" : "PARSE_NUMBER",
                "a" : {
                    "id" : "INPUT"
                }
            }
        },
        "Enter the second number:",
        {
            "id" : "SET",
            "name" : "b",
            "value" : {
                "id" : "PARSE_NUMBER",
                "a" : {
                    "id" : "INPUT"
                }
            }
        }
    ]
}
```

## 4. Print the results <!-- {docsify-ignore} -->
Now for the math! Below the input blocks, add a labelled result for each operation. Here's the one for addition:
```json
{
    "id" : "+",
    "a" : "Sum: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "a"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "b"
        }
    }
}
```
> This uses the print shorthand, so there's no need for a print block.

Do the same for subtraction (`-`), multiplication (`*`), and division (`/`), with the labels "Difference: ", "Product: ", and "Quotient: ".

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Calculator",
    "description" : "Does math with two numbers.",
    "body" : {
        "variables" : [
            {
                "name" : "a",
                "value" : 0
            },
            {
                "name" : "b",
                "value" : 0
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    "Enter the first number:",
                    {
                        "id" : "SET",
                        "name" : "a",
                        "value" : {
                            "id" : "PARSE_NUMBER",
                            "a" : {
                                "id" : "INPUT"
                            }
                        }
                    },
                    "Enter the second number:",
                    {
                        "id" : "SET",
                        "name" : "b",
                        "value" : {
                            "id" : "PARSE_NUMBER",
                            "a" : {
                                "id" : "INPUT"
                            }
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Sum: ",
                        "b" : {
                            "id" : "+",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "a"
                            },
                            "b" : {
                                "id" : "VARIABLE",
                                "name" : "b"
                            }
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Difference: ",
                        "b" : {
                            "id" : "-",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "a"
                            },
                            "b" : {
                                "id" : "VARIABLE",
                                "name" : "b"
                            }
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Product: ",
                        "b" : {
                            "id" : "*",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "a"
                            },
                            "b" : {
                                "id" : "VARIABLE",
                                "name" : "b"
                            }
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Quotient: ",
                        "b" : {
                            "id" : "/",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "a"
                            },
                            "b" : {
                                "id" : "VARIABLE",
                                "name" : "b"
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

## 5. Running <!-- {docsify-ignore} -->
Run the code, and type in two numbers when asked. Watch the variable display as you do: "a" and "b" will update as soon as you enter each number.

If you enter `6` and `3`, you should see something like this in the console:
```txt
[Calculator]    Enter the first number:
[INPUT]    6
[Calculator]    Enter the second number:
[INPUT]    3
[Calculator]    Sum: 9.0
[Calculator]    Difference: 3.0
[Calculator]    Product: 18.0
[Calculator]    Quotient: 2.0
```

!> Entering `0` as the second number will raise an error, since you can't divide by zero. You'll learn how to handle this in the next lesson!

?> **Challenge:**<br>Add a fifth result that shows the remainder of the division, using the [`%` block](guides/values/math.md#modulus).
