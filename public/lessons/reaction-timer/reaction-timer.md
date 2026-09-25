# Reaction Timer
For this project, you will be making a game that tests how fast the user can react. After a random delay, the game says "GO!", and the user has to press enter as quickly as they can. After a few rounds, the game shows their best and average times.

## 1. Setting up the project <!-- {docsify-ignore} -->
Create a new project, and give it a name and description:
```json
{
    "id" : "PROJECT",
    "name" : "Reaction Timer",
    "description" : "Tests how fast you can react.",
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
You'll need five variables:

| Variable   | Purpose                                                     |
| ---------- | ----------------------------------------------------------- |
| `rounds`   | The number of rounds to play.                               |
| `start`    | The time when "GO!" was printed.                            |
| `reaction` | The user's reaction time for the current round, in seconds. |
| `best`     | The fastest reaction time so far.                           |
| `total`    | All the reaction times added together.                      |

```json
"variables" : [
    {
        "name" : "rounds",
        "value" : 0
    },
    {
        "name" : "start",
        "value" : 0
    },
    {
        "name" : "reaction",
        "value" : 0
    },
    {
        "name" : "best",
        "value" : 999
    },
    {
        "name" : "total",
        "value" : 0
    }
]
```

?> "best" starts at `999` on purpose. Any real reaction time will be faster than 999 seconds, so the first round will always replace it.

## 3. Ask for the number of rounds <!-- {docsify-ignore} -->
In `ON_RUN`, ask how many rounds to play. If the user asks for less than 1, there's no game to play, so stop the code with an [error](lessons/reaction-timer/logging.md#the-error-block):
```json
{
    "id" : "ON_RUN",
    "body" : [
        "How many rounds would you like to play?",
        {
            "id" : "SET",
            "name" : "rounds",
            "value" : {
                "id" : "PARSE_NUMBER",
                "a" : {
                    "id" : "INPUT"
                }
            }
        },
        {
            "id" : "IF",
            "value" : {
                "id" : "<",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "rounds"
                },
                "b" : 1
            },
            "body" : [
                {
                    "id" : "ERROR",
                    "value" : "You need to play at least 1 round!"
                }
            ]
        }
    ]
}
```

## 4. Create the round loop <!-- {docsify-ignore} -->
Below that, add a [Repeat](lessons/guessing-game/loops.md#the-repeat-block) block that runs once per round. Each round, tell the user to get ready, then [wait](lessons/reaction-timer/timing.md#the-wait-block) a [random](lessons/reaction-timer/timing.md#the-random-block) amount of time between 2 and 5 seconds, so they can't predict when "GO!" is coming:
```json
{
    "id" : "REPEAT",
    "value" : {
        "id" : "VARIABLE",
        "name" : "rounds"
    },
    "body" : [
        "Get ready... press enter when you see GO!",
        {
            "id" : "WAIT",
            "value" : {
                "id" : "+",
                "a" : {
                    "id" : "*",
                    "a" : {
                        "id" : "RANDOM"
                    },
                    "b" : 3
                },
                "b" : 2
            }
        },
        "GO!"
    ]
}
```

## 5. Time the reaction <!-- {docsify-ignore} -->
Right after "GO!", store the current [time](lessons/reaction-timer/timing.md#the-time-block) in "start". Then wait for the user to press enter, using an Input block with no `name` (since we don't care what they type, only *when*):
```json
{
    "id" : "SET",
    "name" : "start",
    "value" : {
        "id" : "TIME"
    }
},
{
    "id" : "INPUT"
}
```

Once they press enter, the reaction time is the current time minus "start". Divide it by 1000 to turn it into seconds, and print it:
```json
{
    "id" : "SET",
    "name" : "reaction",
    "value" : {
        "id" : "/",
        "a" : {
            "id" : "-",
            "a" : {
                "id" : "TIME"
            },
            "b" : {
                "id" : "VARIABLE",
                "name" : "start"
            }
        },
        "b" : 1000
    }
},
{
    "id" : "+",
    "a" : "Reaction time: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "reaction"
        },
        "b" : " seconds"
    }
}
```

## 6. Keep score <!-- {docsify-ignore} -->
Still inside the loop, do three more things:
- [Warn](lessons/reaction-timer/logging.md#the-warn-block) the user if they took longer than 1 second.
- Add the reaction time to "total".
- If the reaction time beats "best", replace it.

```json
{
    "id" : "IF",
    "value" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "reaction"
        },
        "b" : 1
    },
    "body" : [
        {
            "id" : "WARN",
            "value" : "Too slow! Stay focused."
        }
    ]
},
{
    "id" : "+=",
    "name" : "total",
    "value" : {
        "id" : "VARIABLE",
        "name" : "reaction"
    }
},
{
    "id" : "IF",
    "value" : {
        "id" : "<",
        "a" : {
            "id" : "VARIABLE",
            "name" : "reaction"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "best"
        }
    },
    "body" : [
        {
            "id" : "SET",
            "name" : "best",
            "value" : {
                "id" : "VARIABLE",
                "name" : "reaction"
            }
        }
    ]
}
```

## 7. Show the results <!-- {docsify-ignore} -->
After the Repeat block, print the best time and the average time. The average is "total" divided by "rounds", but that can end up with a lot of decimals, like `0.3383333333`. To keep it tidy, multiply it by 1000, [round](lessons/reaction-timer/timing.md#the-round-block) it, then divide by 1000 again. This rounds it to 3 decimal places:
```json
{
    "id" : "+",
    "a" : "Best: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "best"
        },
        "b" : " seconds"
    }
},
{
    "id" : "+",
    "a" : "Average: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "/",
            "a" : {
                "id" : "ROUND",
                "a" : {
                    "id" : "*",
                    "a" : {
                        "id" : "/",
                        "a" : {
                            "id" : "VARIABLE",
                            "name" : "total"
                        },
                        "b" : {
                            "id" : "VARIABLE",
                            "name" : "rounds"
                        }
                    },
                    "b" : 1000
                }
            },
            "b" : 1000
        },
        "b" : " seconds"
    }
}
```

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Reaction Timer",
    "description" : "Tests how fast you can react.",
    "body" : {
        "variables" : [
            {
                "name" : "rounds",
                "value" : 0
            },
            {
                "name" : "start",
                "value" : 0
            },
            {
                "name" : "reaction",
                "value" : 0
            },
            {
                "name" : "best",
                "value" : 999
            },
            {
                "name" : "total",
                "value" : 0
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    "How many rounds would you like to play?",
                    {
                        "id" : "SET",
                        "name" : "rounds",
                        "value" : {
                            "id" : "PARSE_NUMBER",
                            "a" : {
                                "id" : "INPUT"
                            }
                        }
                    },
                    {
                        "id" : "IF",
                        "value" : {
                            "id" : "<",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "rounds"
                            },
                            "b" : 1
                        },
                        "body" : [
                            {
                                "id" : "ERROR",
                                "value" : "You need to play at least 1 round!"
                            }
                        ]
                    },
                    {
                        "id" : "REPEAT",
                        "value" : {
                            "id" : "VARIABLE",
                            "name" : "rounds"
                        },
                        "body" : [
                            "Get ready... press enter when you see GO!",
                            {
                                "id" : "WAIT",
                                "value" : {
                                    "id" : "+",
                                    "a" : {
                                        "id" : "*",
                                        "a" : {
                                            "id" : "RANDOM"
                                        },
                                        "b" : 3
                                    },
                                    "b" : 2
                                }
                            },
                            "GO!",
                            {
                                "id" : "SET",
                                "name" : "start",
                                "value" : {
                                    "id" : "TIME"
                                }
                            },
                            {
                                "id" : "INPUT"
                            },
                            {
                                "id" : "SET",
                                "name" : "reaction",
                                "value" : {
                                    "id" : "/",
                                    "a" : {
                                        "id" : "-",
                                        "a" : {
                                            "id" : "TIME"
                                        },
                                        "b" : {
                                            "id" : "VARIABLE",
                                            "name" : "start"
                                        }
                                    },
                                    "b" : 1000
                                }
                            },
                            {
                                "id" : "+",
                                "a" : "Reaction time: ",
                                "b" : {
                                    "id" : "+",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "reaction"
                                    },
                                    "b" : " seconds"
                                }
                            },
                            {
                                "id" : "IF",
                                "value" : {
                                    "id" : ">",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "reaction"
                                    },
                                    "b" : 1
                                },
                                "body" : [
                                    {
                                        "id" : "WARN",
                                        "value" : "Too slow! Stay focused."
                                    }
                                ]
                            },
                            {
                                "id" : "+=",
                                "name" : "total",
                                "value" : {
                                    "id" : "VARIABLE",
                                    "name" : "reaction"
                                }
                            },
                            {
                                "id" : "IF",
                                "value" : {
                                    "id" : "<",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "reaction"
                                    },
                                    "b" : {
                                        "id" : "VARIABLE",
                                        "name" : "best"
                                    }
                                },
                                "body" : [
                                    {
                                        "id" : "SET",
                                        "name" : "best",
                                        "value" : {
                                            "id" : "VARIABLE",
                                            "name" : "reaction"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id" : "+",
                        "a" : "Best: ",
                        "b" : {
                            "id" : "+",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "best"
                            },
                            "b" : " seconds"
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Average: ",
                        "b" : {
                            "id" : "+",
                            "a" : {
                                "id" : "/",
                                "a" : {
                                    "id" : "ROUND",
                                    "a" : {
                                        "id" : "*",
                                        "a" : {
                                            "id" : "/",
                                            "a" : {
                                                "id" : "VARIABLE",
                                                "name" : "total"
                                            },
                                            "b" : {
                                                "id" : "VARIABLE",
                                                "name" : "rounds"
                                            }
                                        },
                                        "b" : 1000
                                    }
                                },
                                "b" : 1000
                            },
                            "b" : " seconds"
                        }
                    }
                ]
            }
        ]
    }
}
```

## 8. Running <!-- {docsify-ignore} -->
Run the code, choose a number of rounds, and hit enter as soon as you see "GO!".

If you play 3 rounds, you should see something like this in the console:
```txt
[Reaction Timer]    How many rounds would you like to play?
[INPUT]    3
[Reaction Timer]    Get ready... press enter when you see GO!
[Reaction Timer]    GO!
[INPUT]    
[Reaction Timer]    Reaction time: 0.312 seconds
[Reaction Timer]    Get ready... press enter when you see GO!
[Reaction Timer]    GO!
[INPUT]    
[Reaction Timer]    Reaction time: 1.204 seconds
[Reaction Timer]    Too slow! Stay focused.
[Reaction Timer]    Get ready... press enter when you see GO!
[Reaction Timer]    GO!
[INPUT]    
[Reaction Timer]    Reaction time: 0.287 seconds
[Reaction Timer]    Best: 0.287 seconds
[Reaction Timer]    Average: 0.601 seconds
```
> "Too slow! Stay focused." will be highlighted as a warning.

?> Pressing enter before "GO!" appears won't count, since the game only starts listening for input after "GO!" is printed.

?> **Challenge:**<br>Before the first round, count down from 3 with a one-second [wait](lessons/reaction-timer/timing.md#the-wait-block) between each number, using the [decrease (`-=`)](lessons/reaction-timer/timing.md#the-decrease-block) block.
