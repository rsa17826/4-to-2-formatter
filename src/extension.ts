// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { log } from "console"
import * as vscode from "vscode"

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  vscode.languages.registerDocumentFormattingEditProvider("*", {
    provideDocumentFormattingEdits(
      document: vscode.TextDocument
    ): vscode.TextEdit[] {
      var text = document.getText().replace(/\r\n?/g, "\n")
      const edits: vscode.TextEdit[] = []
      text = text.replace("\t", "    ")
      var indentChanged = false
      var lastIndent: number = 0
      var sub: number = 0
      var i = 0
      var startIndent = 0
      for (var line of text.split("\n")) {
        if (!line.trim()) {
          i++
          continue
        }
        var indent = line.match(/^ */)?.[0]?.length ?? 0

        if (sub && indent <= startIndent) {
          sub = 0
          // return edits
        }
        if (sub) {
          edits.push(
            vscode.TextEdit.replace(
              new vscode.Range(
                new vscode.Position(i, 0),
                new vscode.Position(i, indent)
              ),
              getSpaces(indent - sub)
            )
          )
        } else if (indent - lastIndent > 2) {
          indentChanged = true
          log("Indentation changed", indent, lastIndent)
          sub = indent - lastIndent - 2
          edits.push(
            vscode.TextEdit.replace(
              new vscode.Range(
                new vscode.Position(i, 0),
                new vscode.Position(i, indent)
              ),
              getSpaces(indent - sub)
            )
          )
        } else {
          startIndent = indent
        }
        lastIndent = indent
        i++
      }
      function getSpaces(count: number): string {
        let spaces = ""
        for (let i = 0; i < count; i++) {
          spaces += " "
        }
        return spaces
      }
      if (edits.length > 0) {
      }
      // while (newText !== text) {
      //   log(123123)
      //   newText = text
      //   const regex = /^( *)(\S+.*[\r\n])\1 {3,}/gm
      //   let match
      //   // Find all matches and create TextEdits
      //   while ((match = regex.exec(text)) !== null) {
      //     const startLine =
      //       text.substring(0, match.index).split("\n").length - 1
      //     const startChar =
      //       match.index - text.lastIndexOf("\n", match.index) - 1
      //     const endLine = startLine + 1
      //     const endChar =
      //       text.split("\n")?.[endLine]?.match?.(/^ +/)?.[0]
      //         ?.length ?? 0

      //     // Create a TextEdit for the matched text
      //     const edit = vscode.TextEdit.replace(
      //       new vscode.Range(startLine, startChar, endLine, endChar),
      //       `${match[1]}${match[2]}${match[1]}  `
      //     )
      //     edits.push(edit)
      //     while (isSameIndent())
      //     text = text.replace(
      //       match[0],
      //       `${match[1]}${match[2]}${match[1]}  `
      //     )
      //   }
      // }
      return edits
    },
  })
  console.log(
    'Congratulations, your extension "4-to-2-formatter" is now active!'
  )

  // function formatDocument(text: string) {
  //   // Implement your formatting logic here
  //   var newtext = ""
  //   text = text.replace("\t", "    ")
  //   while (newtext !== text) {
  //     newtext = text
  //     text = text.replace(/^( *)(\S+.*[\r\n])\1 {3,}/g, "$1$2$1  ")
  //   }
  //   return text
  // }
}

// This method is called when your extension is deactivated
export function deactivate() {}
