# 4-to-2-formatter README

replaces all 4+ space indents with 2 space indents.

detects when there is a difference in spacing of more than 2 between 2 neighboring lines to prevent it from formatting nested indents down to 1 indent.

will not try and fix indentation in places where the 2 lines are suposed to be at the same level as there is no way to tell for every language if it should have the same indent or not EG:

`json`:

```
{
  "editor.tabSize": 2,
    "editor.guides.bracketPairs": true,
  "editor.guides.bracketPairsHorizontal": true,
}
```

there is only a 2 space difference so it treats it as if it should be indented

best used with [Jota0222.multi-formatter](https://marketplace.visualstudio.com/items?itemName=Jota0222.multi-formatter) or other similar extensions, as it only corrects the indentation from one line to the next being to large

currently only does one indent line at a time, no clue how to fix yet, but it can jst be ran multiple times