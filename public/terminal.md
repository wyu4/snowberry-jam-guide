# Command Line

As of _Snowberry Jam v0.0.9_, the installation of the app includes a command line that funnels code through the regular interpreter.

?> Running code with the terminal client is fundementally the same as if it were ran inside the app. This way just offers users the option to use Snowberry Jam in their favorite IDEs rather than being limited to the packaged GUI.

## Cli

The command to call the SJ client is `snowb`. Executing this in any terminal should lead to the following:

```terminal
=====================================================

  █▀▀▀▀▀▀▀█                       █
  ▀▄▀███▀▄▀     ▄▀▀ █▀▄ ▄▀▄ █ ▄ █ █▀▄ ▄█▄ ▄▀▀ ▄▀▀ █ █
 ▄▀▄█████▄▀▄    ▄▄▀ █ █ ▀▄▀ ▀▄▀▄▀ █▄▀ ▀▄▄ █   █   ▀▄█
█ ██▀▀█▀▀██ █                                     ▄▄▀
█ ███   ███ █    ▀                  █ ▀
█ ██     ██ █    █ ▀█▄ █▀█▀▄    ▄▀▀ █ █
█ ███▄█▄███ █    █ ▀▄█ █ █ █    ▀▄▄ █ █ (x).(x).(x)
 ▀▄▀▀▀▀▀▀▀▄▀    ▄▀
   ▀▀▀▀▀▀▀

Welcome to the Snowberry Jam v(x).(x).(x) terminal client!

If this is your first time using this, please visit https://snowberry-jam.wyu.app/ for the language guide.
This command can be used to run source files straight from your terminal.
Please use the following command to do so:

> snowb [PATH_TO_SOURCE_FILE]
```

> `(x).(x).(x)` being the current version of SJ being run

## Executing a file

To run code, add the file path to the code right after the `snowb` command:

```terminal
snowb [PATH_TO_SOURCE_FILE]
```

### Verbose Mode

Adding `-v` to the command turns on verbose mode, and the user will be shown the full compiler + interpreter logs inside the terminal.

```terminal
snowb [PATH_TO_SOURCE_FILE] -v
```
