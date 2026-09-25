# Word Counter
For this project, you will be making a program that asks the user for a sentence, then counts its words, lists each one, and finds the longest word.

## 1. Setting up the project <!-- {docsify-ignore} -->
Create a new project, and give it a name and description:
```json
{
    "id" : "PROJECT",
    "name" : "Word Counter",
    "description" : "Counts the words in a sentence.",
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

| Variable   | Purpose                                            |
| ---------- | -------------------------------------------------- |
| `sentence` | The sentence the user types in.                    |
| `words`    | The sentence, split into an array of words.        |
| `i`        | The current count of the loop.                     |
| `word`     | The word currently being looked at.                |
| `longest`  | The longest word found so far.                     |

```json
"variables" : [
    {
        "name" : "sentence",
        "value" : ""
    },
    {
        "name" : "words",
        "value" : [ ]
    },
    {
        "name" : "i",
        "value" : 0
    },
    {
        "name" : "word",
        "value" : ""
    },
    {
        "name" : "longest",
        "value" : ""
    }
]
```

?> "longest" starts as empty text (`""`), which has a size of `0`. That way, any real word will be longer than it.

## 3. Ask for a sentence <!-- {docsify-ignore} -->
In `ON_RUN`, ask the user for a sentence, and store it in "sentence":
```json
{
    "id" : "ON_RUN",
    "body" : [
        "Type a sentence:",
        {
            "id" : "INPUT",
            "name" : "sentence"
        }
    ]
}
```

## 4. Split it into words <!-- {docsify-ignore} -->
Next, [split](lessons/word-counter/text.md#the-split-block) the sentence on every space, and store the result in "words". The number of words is then just the [size](lessons/word-counter/arrays.md#the-size-of-block) of the array:
```json
{
    "id" : "SET",
    "name" : "words",
    "value" : {
        "id" : "SPLIT",
        "a" : {
            "id" : "VARIABLE",
            "name" : "sentence"
        },
        "b" : " "
    }
},
{
    "id" : "+",
    "a" : "Word count: ",
    "b" : {
        "id" : "SIZE_OF",
        "a" : {
            "id" : "VARIABLE",
            "name" : "words"
        }
    }
}
```

## 5. Go through each word <!-- {docsify-ignore} -->
Now, [loop through](lessons/word-counter/arrays.md#looping-through-an-array) the array. Each loop, store the current word in "word", and print it in a list:
```json
{
    "id" : "REPEAT",
    "value" : {
        "id" : "VARIABLE",
        "name" : "words"
    },
    "name" : "i",
    "body" : [
        {
            "id" : "SET",
            "name" : "word",
            "value" : {
                "id" : "ELEMENT_AT",
                "a" : {
                    "id" : "VARIABLE",
                    "name" : "words"
                },
                "i" : {
                    "id" : "VARIABLE",
                    "name" : "i"
                }
            }
        },
        {
            "id" : "+",
            "a" : "- ",
            "b" : {
                "id" : "VARIABLE",
                "name" : "word"
            }
        }
    ]
}
```

?> Storing the current word in its own variable saves you from writing out the whole Element At block every time you need it.

## 6. Find the longest word <!-- {docsify-ignore} -->
At the end of the loop's body, check if the current word is longer than "longest". Since [`>` compares the length of text](lessons/word-counter/text.md#comparing-text), this is just one If block:
```json
{
    "id" : "IF",
    "value" : {
        "id" : ">",
        "a" : {
            "id" : "VARIABLE",
            "name" : "word"
        },
        "b" : {
            "id" : "VARIABLE",
            "name" : "longest"
        }
    },
    "body" : [
        {
            "id" : "SET",
            "name" : "longest",
            "value" : {
                "id" : "VARIABLE",
                "name" : "word"
            }
        }
    ]
}
```

After the Repeat block, print the longest word and how many letters it has:
```json
{
    "id" : "+",
    "a" : "Longest word: ",
    "b" : {
        "id" : "+",
        "a" : {
            "id" : "VARIABLE",
            "name" : "longest"
        },
        "b" : {
            "id" : "+",
            "a" : " (",
            "b" : {
                "id" : "+",
                "a" : {
                    "id" : "SIZE_OF",
                    "a" : {
                        "id" : "VARIABLE",
                        "name" : "longest"
                    }
                },
                "b" : " letters)"
            }
        }
    }
}
```

## Here's what it should look like so far: <!-- {docsify-ignore} -->
```json
{
    "id" : "PROJECT",
    "name" : "Word Counter",
    "description" : "Counts the words in a sentence.",
    "body" : {
        "variables" : [
            {
                "name" : "sentence",
                "value" : ""
            },
            {
                "name" : "words",
                "value" : [ ]
            },
            {
                "name" : "i",
                "value" : 0
            },
            {
                "name" : "word",
                "value" : ""
            },
            {
                "name" : "longest",
                "value" : ""
            }
        ],
        "events" : [
            {
                "id" : "ON_RUN",
                "body" : [
                    "Type a sentence:",
                    {
                        "id" : "INPUT",
                        "name" : "sentence"
                    },
                    {
                        "id" : "SET",
                        "name" : "words",
                        "value" : {
                            "id" : "SPLIT",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "sentence"
                            },
                            "b" : " "
                        }
                    },
                    {
                        "id" : "+",
                        "a" : "Word count: ",
                        "b" : {
                            "id" : "SIZE_OF",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "words"
                            }
                        }
                    },
                    {
                        "id" : "REPEAT",
                        "value" : {
                            "id" : "VARIABLE",
                            "name" : "words"
                        },
                        "name" : "i",
                        "body" : [
                            {
                                "id" : "SET",
                                "name" : "word",
                                "value" : {
                                    "id" : "ELEMENT_AT",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "words"
                                    },
                                    "i" : {
                                        "id" : "VARIABLE",
                                        "name" : "i"
                                    }
                                }
                            },
                            {
                                "id" : "+",
                                "a" : "- ",
                                "b" : {
                                    "id" : "VARIABLE",
                                    "name" : "word"
                                }
                            },
                            {
                                "id" : "IF",
                                "value" : {
                                    "id" : ">",
                                    "a" : {
                                        "id" : "VARIABLE",
                                        "name" : "word"
                                    },
                                    "b" : {
                                        "id" : "VARIABLE",
                                        "name" : "longest"
                                    }
                                },
                                "body" : [
                                    {
                                        "id" : "SET",
                                        "name" : "longest",
                                        "value" : {
                                            "id" : "VARIABLE",
                                            "name" : "word"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id" : "+",
                        "a" : "Longest word: ",
                        "b" : {
                            "id" : "+",
                            "a" : {
                                "id" : "VARIABLE",
                                "name" : "longest"
                            },
                            "b" : {
                                "id" : "+",
                                "a" : " (",
                                "b" : {
                                    "id" : "+",
                                    "a" : {
                                        "id" : "SIZE_OF",
                                        "a" : {
                                            "id" : "VARIABLE",
                                            "name" : "longest"
                                        }
                                    },
                                    "b" : " letters)"
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

## 7. Running <!-- {docsify-ignore} -->
Run the code and type in a sentence. Watch "word" and "longest" change in the variable display as the loop goes through each word.

If you type `The quick brown fox jumps`, you should see something like this in the console:
```txt
[Word Counter]    Type a sentence:
[INPUT]    The quick brown fox jumps
[Word Counter]    Word count: 5.0
[Word Counter]    - The
[Word Counter]    - quick
[Word Counter]    - brown
[Word Counter]    - fox
[Word Counter]    - jumps
[Word Counter]    Longest word: quick (5.0 letters)
```

?> "brown" and "jumps" are also 5 letters long, but since `>` only checks for *longer* words, the first one found wins.

!> Typing two spaces in a row will create an empty word (`""`) in the array, which gets counted too.

?> **Challenge:**<br>After listing the words, print them again in reverse order. (Hint: the index of the last element is *size - 1*, and it goes down by 1 each loop.)
