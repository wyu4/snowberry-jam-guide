# Timed Quiz
For this project, you will be making a quiz that loads its questions from a file. The user has 30 seconds to answer as many questions as they can, while a timer counts down in a separate thread.

## 1. Setting up the project <!-- {docsify-ignore} -->
Create a new project, and give it a name and description:
```json
{
    "id" : "PROJECT",
    "name" : "Timed Quiz",
    "description" : "Answer as many questions as you can in 30 seconds.",
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

## 2. Write the questions <!-- {docsify-ignore} -->
Open the [public folder](lessons/timed-quiz/files.md#the-public-folder), and create a text file called `quiz.txt`. Each line holds one question and its answer, separated by a `|`:
```txt
What is 2 + 2?|4
What colour is the sky?|blue
What is the capital of Canada?|Ottawa
How many legs does a spider have?|8
What is 10 % 3?|1
```

?> Feel free to write your own questions! Since the code reads them from the file, you can change the quiz any time without touching the code.

!> Don't leave any empty lines between questions, or the quiz will fail to find an answer for that line.

## 3. Create your variables <!-- {docsify-ignore} -->
You'll need six variables:

| Variable    | Purpose                                                   |
| ----------- | --------------------------------------------------------- |
| `questions` | Every line of the file.                                   |
| `line`      | The current line, split into its question and answer.     |
| `q`         | The index of the current question.                        |
| `answer`    | The user's answer.                                        |
| `score`     | The number of correct answers.                            |
| `timeLeft`  | The number of seconds left.                               |

```json
"variables" : [
    {
        "name" : "questions",
        "value" : [ ]
    },
    {
        "name" : "line",
        "value" : [ ]
    },
    {
        "name" : "q",
        "value" : 0
    },
    {
        "name" : "answer",
        "value" : ""
    },
    {
        "name" : "score",
        "value" : 0
    },
    {
        "name" : "timeLeft",
        "value" : 30
    }
]
```

## 4. Load the questions <!-- {docsify-ignore} -->
In `ON_RUN`, [read](lessons/timed-quiz/files.md#the-read-block) `quiz.txt`, and [split it into lines](lessons/timed-quiz/files.md#reading-line-by-line). Then let the user know the quiz is starting:
```json
{
    "id" : "ON_RUN",
    "body" : [
        {
            "id" : "SET",
            "name" : "questions",
            "value" : {
                "id" : "SPLIT",
                "a" : {
                    "id" : "READ",
                    "a" : {
                        "id" : "+",
                        "a" : {
                            "id" : "PUBLIC_FOLDER"
                        },
                        "b" : "quiz.txt"
                    }
                },
                "b" : "\n"
            }
        },
        "You have 30 seconds. Answer as many questions as you can!"
    ]
}
```

## 5. Start the timer <!-- {docsify-ignore} -->
The timer needs to count down *while* the user is answering questions, so it goes in a [Thread](lessons/timed-quiz/threads.md#the-thread-block). Every second, it [decreases](lessons/reaction-timer/timing.md#the-decrease-block) "timeLeft" by 1.

To remind the user of the time, it also shows a [warning](lessons/reaction-timer/logging.md#the-warn-block) every 10 seconds. "timeLeft" is a multiple of 10 whenever [`timeLeft % 10`](lessons/reaction-timer/timing.md#the-modulus-block) equals `0`. Once time runs out, the thread warns the user one last time.
```json
{
    "id" : "THREAD",
    "body" : [
        {
            "id" : "WHILE",
            "value" : {
                "id" : ">",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "timeLeft"
                },
                "b" : 0
            },
            "body" : [
                {
                    "id" : "WAIT",
                    "value" : 1
                },
                {
                    "id" : "-=",
                    "name" : "timeLeft",
                    "value" : 1
                },
                {
                    "id" : "IF",
                    "value" : {
                        "id" : "AND",
                        "a" : {
                            "id" : "==",
                            "a" : {
                                "id" : "%",
                                "a" : {
                                    "id" : "VARIABLE",
                                    "name" : "timeLeft"
                                },
                                "b" : 10
                            },
                            "b" : 0
                        },
                        "b" : {
                            "id" : ">",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "timeLeft"
                            },
                            "b" : 0
                        }
                    },
                    "body" : [
                        {
                            "id" : "WARN",
                            "value" : {
                                "id" : "+",
                                "a" : {
                                    "id" : "VARIABLE",
                                    "name" : "timeLeft"
                                },
                                "b" : " seconds left!"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id" : "WARN",
            "value" : "Time's up!"
        }
    ]
}
```

?> The `AND` makes sure the "seconds left" warning doesn't show up at 0, since `0 % 10` is also `0`.

## 6. Ask the questions <!-- {docsify-ignore} -->
Back in the main body, below the Thread block, loop through the questions with a While loop. It should keep going as long as there are questions left **and** there's time left:
```json
{
    "id" : "WHILE",
    "value" : {
        "id" : "AND",
        "a" : {
            "id" : "<",
            "a" : {
                "id" : "VARIABLE",
                "name" : "q"
            },
            "b" : {
                "id" : "SIZE_OF",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "questions"
                }
            }
        },
        "b" : {
            "id" : ">",
            "a" : {
                "id" : "VARIABLE",
                "name" : "timeLeft"
            },
            "b" : 0
        }
    },
    "body" : [ ]
}
```

?> A [Repeat](lessons/guessing-game/loops.md#the-repeat-block) block can't stop early, which is why this uses a While loop and its own counter, "q".

Inside the loop's body, get the current line, and split it on the `|`. Since `|` is a [special character](lessons/word-counter/text.md#the-split-block), it needs two backslashes in front of it. Index `0` of the result is the question, and index `1` is the answer. Print the question, and ask for an answer:
```json
{
    "id" : "SET",
    "name" : "line",
    "value" : {
        "id" : "SPLIT",
        "a" : {
            "id" : "ELEMENT_AT",
            "a" : {
                "id" : "VARIABLE",
                "name" : "questions"
            },
            "i" : {
                "id" : "VARIABLE",
                "name" : "q"
            }
        },
        "b" : "\\|"
    }
},
{
    "id" : "ELEMENT_AT",
    "a" : {
        "id" : "VARIABLE",
        "name" : "line"
    },
    "i" : 0
},
{
    "id" : "INPUT",
    "name" : "answer"
}
```

## 7. Check the answer <!-- {docsify-ignore} -->
The timer keeps counting down while the user is typing, so time might have run out before they pressed enter. If there's still time, check if the answer is correct, and add to "score" if it is. Finally, move on to the next question by increasing "q":
```json
{
    "id" : "IF_ELSE",
    "value" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "timeLeft"
        },
        "b" : 0
    },
    "body" : [
        {
            "id" : "IF_ELSE",
            "value" : {
                "id" : "==",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "answer"
                },
                "b" : {
                    "id" : "ELEMENT_AT",
                    "a" : {
                        "id" : "VARIABLE",
                        "name" : "line"
                    },
                    "i" : 1
                }
            },
            "body" : [
                "Correct!",
                {
                    "id" : "+=",
                    "name" : "score",
                    "value" : 1
                }
            ],
            "else" : [
                {
                    "id" : "+",
                    "a" : "Wrong! The answer was ",
                    "b" : {
                        "id" : "ELEMENT_AT",
                        "a" : {
                            "id" : "VARIABLE",
                            "name" : "line"
                        },
                        "i" : 1
                    }
                }
            ]
        }
    ],
    "else" : [
        "Too late, that one doesn't count!"
    ]
},
{
    "id" : "+=",
    "name" : "q",
    "value" : 1
}
```

## 8. Show the score <!-- {docsify-ignore} -->
After the While loop, print the final score:
```json
{
    "id" : "+",
    "a" : "Final score: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "score"
        },
        "b" : {
            "id" : "+",
            "a" : " out of ",
            "b" : {
                "id" : "SIZE_OF",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "questions"
                }
            }
        }
    }
}
```

?> If the user answers everything before time runs out, `ON_RUN` reaches its end, which [stops the timer thread](lessons/timed-quiz/threads.md#when-the-code-ends) too.

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Timed Quiz",
    "description" : "Answer as many questions as you can in 30 seconds.",
    "body" : {
        "variables" : [
            {
                "name" : "questions",
                "value" : [ ]
            },
            {
                "name" : "line",
                "value" : [ ]
            },
            {
                "name" : "q",
                "value" : 0
            },
            {
                "name" : "answer",
                "value" : ""
            },
            {
                "name" : "score",
                "value" : 0
            },
            {
                "name" : "timeLeft",
                "value" : 30
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    {
                        "id" : "SET",
                        "name" : "questions",
                        "value" : {
                            "id" : "SPLIT",
                            "a" : {
                                "id" : "READ",
                                "a" : {
                                    "id" : "+",
                                    "a" : {
                                        "id" : "PUBLIC_FOLDER"
                                    },
                                    "b" : "quiz.txt"
                                }
                            },
                            "b" : "\n"
                        }
                    },
                    "You have 30 seconds. Answer as many questions as you can!",
                    {
                        "id" : "THREAD",
                        "body" : [
                            {
                                "id" : "WHILE",
                                "value" : {
                                    "id" : ">",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "timeLeft"
                                    },
                                    "b" : 0
                                },
                                "body" : [
                                    {
                                        "id" : "WAIT",
                                        "value" : 1
                                    },
                                    {
                                        "id" : "-=",
                                        "name" : "timeLeft",
                                        "value" : 1
                                    },
                                    {
                                        "id" : "IF",
                                        "value" : {
                                            "id" : "AND",
                                            "a" : {
                                                "id" : "==",
                                                "a" : {
                                                    "id" : "%",
                                                    "a" : {
                                                        "id" : "VARIABLE",
                                                        "name" : "timeLeft"
                                                    },
                                                    "b" : 10
                                                },
                                                "b" : 0
                                            },
                                            "b" : {
                                                "id" : ">",
                                                "a" : {
                                                    "id" : "VARIABLE",
                                                    "name" : "timeLeft"
                                                },
                                                "b" : 0
                                            }
                                        },
                                        "body" : [
                                            {
                                                "id" : "WARN",
                                                "value" : {
                                                    "id" : "+",
                                                    "a" : {
                                                        "id" : "VARIABLE",
                                                        "name" : "timeLeft"
                                                    },
                                                    "b" : " seconds left!"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "id" : "WARN",
                                "value" : "Time's up!"
                            }
                        ]
                    },
                    {
                        "id" : "WHILE",
                        "value" : {
                            "id" : "AND",
                            "a" : {
                                "id" : "<",
                                "a" : {
                                    "id" : "VARIABLE",
                                    "name" : "q"
                                },
                                "b" : {
                                    "id" : "SIZE_OF",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "questions"
                                    }
                                }
                            },
                            "b" : {
                                "id" : ">",
                                "a" : {
                                    "id" : "VARIABLE",
                                    "name" : "timeLeft"
                                },
                                "b" : 0
                            }
                        },
                        "body" : [
                            {
                                "id" : "SET",
                                "name" : "line",
                                "value" : {
                                    "id" : "SPLIT",
                                    "a" : {
                                        "id" : "ELEMENT_AT",
                                        "a" : {
                                            "id" : "VARIABLE",
                                            "name" : "questions"
                                        },
                                        "i" : {
                                            "id" : "VARIABLE",
                                            "name" : "q"
                                        }
                                    },
                                    "b" : "\\|"
                                }
                            },
                            {
                                "id" : "ELEMENT_AT",
                                "a" : {
                                    "id" : "VARIABLE",
                                    "name" : "line"
                                },
                                "i" : 0
                            },
                            {
                                "id" : "INPUT",
                                "name" : "answer"
                            },
                            {
                                "id" : "IF_ELSE",
                                "value" : {
                                    "id" : ">",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "timeLeft"
                                    },
                                    "b" : 0
                                },
                                "body" : [
                                    {
                                        "id" : "IF_ELSE",
                                        "value" : {
                                            "id" : "==",
                                            "a" : {
                                                "id" : "VARIABLE",
                                                "name" : "answer"
                                            },
                                            "b" : {
                                                "id" : "ELEMENT_AT",
                                                "a" : {
                                                    "id" : "VARIABLE",
                                                    "name" : "line"
                                                },
                                                "i" : 1
                                            }
                                        },
                                        "body" : [
                                            "Correct!",
                                            {
                                                "id" : "+=",
                                                "name" : "score",
                                                "value" : 1
                                            }
                                        ],
                                        "else" : [
                                            {
                                                "id" : "+",
                                                "a" : "Wrong! The answer was ",
                                                "b" : {
                                                    "id" : "ELEMENT_AT",
                                                    "a" : {
                                                        "id" : "VARIABLE",
                                                        "name" : "line"
                                                    },
                                                    "i" : 1
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "else" : [
                                    "Too late, that one doesn't count!"
                                ]
                            },
                            {
                                "id" : "+=",
                                "name" : "q",
                                "value" : 1
                            }
                        ]
                    },
                    {
                        "id" : "+",
                        "a" : "Final score: ",
                        "b" : {
                            "id" : "+",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "score"
                            },
                            "b" : {
                                "id" : "+",
                                "a" : " out of ",
                                "b" : {
                                    "id" : "SIZE_OF",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "questions"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

## 9. Running <!-- {docsify-ignore} -->
Make sure `quiz.txt` is in the public folder, then run the code and start answering! Keep an eye on "timeLeft" in the variable display as it ticks down.

You should see something like this in the console:
```txt
[Timed Quiz]    You have 30 seconds. Answer as many questions as you can!
[Timed Quiz]    What is 2 + 2?
[INPUT]    4
[Timed Quiz]    Correct!
[Timed Quiz]    What colour is the sky?
[INPUT]    blue
[Timed Quiz]    Correct!
[Timed Quiz]    What is the capital of Canada?
[Timed Quiz]    20.0 seconds left!
[INPUT]    Toronto
[Timed Quiz]    Wrong! The answer was Ottawa
[Timed Quiz]    How many legs does a spider have?
[Timed Quiz]    10.0 seconds left!
[INPUT]    8
[Timed Quiz]    Correct!
[Timed Quiz]    What is 10 % 3?
[Timed Quiz]    Time's up!
[INPUT]    1
[Timed Quiz]    Too late, that one doesn't count!
[Timed Quiz]    Final score: 3.0 out of 5.0
```
> "20.0 seconds left!", "10.0 seconds left!", and "Time's up!" are printed by the timer thread, while the main body is waiting for input. They'll be highlighted as warnings.

!> Answers have to match exactly, including capital letters. "Blue" won't match "blue".

?> **Challenge:**<br>At the end, print a message based on how well the user did, like "Perfect!" if they got every question right. Then, add a second number to each line of `quiz.txt` (like `What is 2 + 2?|4|1`) for how many points the question is worth, and use it instead of always adding 1 to "score". (Hint: [Parse Number](lessons/calculator/input.md#the-parse-number-block) will come in handy!)
