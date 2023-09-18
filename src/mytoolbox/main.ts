import * as vscode from 'vscode';

export class MyToolBoxExtension {
    public run = () => {
        if (!vscode.window.activeTextEditor) {
            console.log("run: no text editor");
            return;
        }

        const editor = vscode.window.activeTextEditor;
        const doc = editor.document;
        const eol = editor.document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

        let startLine, endLine;
        if (editor.selection.isEmpty) {
            startLine = 0;
            endLine = doc.lineCount;
        } else {
            const sel = editor.selection;
            startLine = sel.start.line;
            endLine = sel.end.line;
        }

        const start = new vscode.Position(startLine, 0);
        const end = new vscode.Position(endLine, 10000);
        const sel = new vscode.Selection(start, end);
        const quoted = doc.getText(sel)
            .split(eol)
            .map((line: string) => line.replace(/"/g, "\\\""))
            .map((line: string) => "\"" + line + "\",")
            .join(eol);
        vscode.env.clipboard.writeText(quoted);
    };
}