# Guessing Game
For this project, you will be making a game where the computer picks a random number between 1 and 10, and the user has to guess it. After each guess, the game tells the user whether they need to go higher or lower.

## 1. Setting up the project <!-- {docsify-ignore} -->
Create a new project, and give it a name and description:
```json
{
    "id" : "PROJECT",
    "name" : "Guessing Game",
    "description" : "Guess the secret number.",
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
You'll need three variables:

| Variable   | Purpose                                     |
| ---------- | ------------------------------------------- |
| `answer`   | The secret number.                          |
| `guess`    | The user's latest guess.                    |
| `attempts` | The number of guesses the user has made.    |

```json
"variables" : [
    {
        "name" : "answer",
        "value" : 0
    },
    {
        "name" : "guess",
        "value" : 0
    },
    {
        "name" : "attempts",
        "value" : 0
    }
]
```

?> "guess" starts at `0` on purpose. Since `0` can never be the answer, the loop in step 4 is guaranteed to run at least once.

## 3. Pick the secret number <!-- {docsify-ignore} -->
To pick a random number, use the [`RANDOM` block](guides/values/built-ins.md#random), which points to a random decimal between 0 and 1. Multiplying it by 9 and [rounding](guides/values/math.md#round) gives a whole number from 0 to 9. Adding 1 brings it to between 1 and 10.

In `ON_RUN`, set "answer" to this number, and let the user know the game has started:
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "SET",
            "name" : "answer",
            "value" : {
                "id" : "+",
                "a" : {
                    "id" : "ROUND",
                    "a" : {
                        "id" : "*",
                        "a" : {
                            "id" : "RANDOM"
                        },
                        "b" : 9
                    }
                },
                "b" : 1
            }
        },
        "I'm thinking of a number between 1 and 10."
    ]
}
```

## 4. Create the game loop <!-- {docsify-ignore} -->
The user should keep guessing until they get it right. That's a job for a [While](lessons/guessing-game/loops.md#the-while-block) loop, that runs as long as "guess" isn't equal to "answer".

Each loop, ask for a guess (parsed as a number), and add 1 to "attempts":
```json
{
    "id" : "WHILE",
    "value" : {
        "id" : "!=",
        "a" : {
            "id" : "VARIABLE",
            "name" : "guess"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "answer"
        }
    },
    "body" : [
        "Take a guess:",
        {
            "id" : "SET",
            "name" : "guess",
            "value" : {
                "id" : "PARSE_NUMBER",
                "a" : {
                    "id" : "INPUT"
                }
            }
        },
        {
            "id" : "+=",
            "name" : "attempts",
            "value" : 1
        }
    ]
}
```

## 5. Give the user hints <!-- {docsify-ignore} -->
At the end of the loop's body, add two [If](lessons/guessing-game/if-statements.md#the-if-block) blocks. One tells the user to go higher, and the other tells them to go lower:
```json
{
    "id" : "IF",
    "value" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "guess"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "answer"
        }
    },
    "body" : [
        "Too low!"
    ]
},
{
    "id" : "IF",
    "value" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "guess"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "answer"
        }
    },
    "body" : [
        "Too high!"
    ]
}
```

## 6. Celebrate <!-- {docsify-ignore} -->
Once the loop ends, the user must have guessed correctly. After the While block, print how many attempts it took:
```json
{
    "id" : "+",
    "a" : "You got it! Attempts: ",
    "b" : {
        "id" : "VARIABLE",
        "name" : "attempts"
    }
}
```

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Guessing Game",
    "description" : "Guess the secret number.",
    "body" : {
        "variables" : [
            {
                "name" : "answer",
                "value" : 0
            },
            {
                "name" : "guess",
                "value" : 0
            },
            {
                "name" : "attempts",
                "value" : 0
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    {
                        "id" : "SET",
                        "name" : "answer",
                        "value" : {
                            "id" : "+",
                            "a" : {
                                "id" : "ROUND",
                                "a" : {
                                    "id" : "*",
                                    "a" : {
                                        "id" : "RANDOM"
                                    },
                                    "b" : 9
                                }
                            },
                            "b" : 1
                        }
                    },
                    "I'm thinking of a number between 1 and 10.",
                    {
                        "id" : "WHILE",
                        "value" : {
                            "id" : "!=",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "guess"
                            },
                            "b" : {
                                "id" : "VARIABLE",
                                "name" : "answer"
                            }
                        },
                        "body" : [
                            "Take a guess:",
                            {
                                "id" : "SET",
                                "name" : "guess",
                                "value" : {
                                    "id" : "PARSE_NUMBER",
                                    "a" : {
                                        "id" : "INPUT"
                                    }
                                }
                            },
                            {
                                "id" : "+=",
                                "name" : "attempts",
                                "value" : 1
                            },
                            {
                                "id" : "IF",
                                "value" : {
                                    "id" : "<",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "guess"
                                    },
                                    "b" : {
                                        "id" : "VARIABLE",
                                        "name" : "answer"
                                    }
                                },
                                "body" : [
                                    "Too low!"
                                ]
                            },
                            {
                                "id" : "IF",
                                "value" : {
                                    "id" : ">",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "guess"
                                    },
                                    "b" : {
                                        "id" : "VARIABLE",
                                        "name" : "answer"
                                    }
                                },
                                "body" : [
                                    "Too high!"
                                ]
                            }
                        ]
                    },
                    {
                        "id" : "+",
                        "a" : "You got it! Attempts: ",
                        "b" : {
                            "id" : "VARIABLE",
                            "name" : "attempts"
                        }
                    }
                ]
            }
        ]
    }
}
```

## 7. Running <!-- {docsify-ignore} -->
Run the code and start guessing! Keep an eye on the variable display: you can peek at "answer" there if you get stuck.

You should see something like this in the console:
```txt
[Guessing Game]    I'm thinking of a number between 1 and 10.
[Guessing Game]    Take a guess:
[INPUT]    5
[Guessing Game]    Too low!
[Guessing Game]    Take a guess:
[INPUT]    8
[Guessing Game]    Too high!
[Guessing Game]    Take a guess:
[INPUT]    7
[Guessing Game]    You got it! Attempts: 3.0
```

!> Typing something that isn't a number will stop the game with an error, since it can't be parsed.

?> **Challenge:**<br>Once the user wins, ask if they want to play again. If they type "y", pick a new number, reset "guess" and "attempts" back to `0`, and start over. (Hint: wrap everything in another While loop!)
