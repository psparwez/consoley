import * as vscode from 'vscode';

// - Track lines and their injected outputs
let outputInjected = new Map<number, string>(); 

export function activate(context: vscode.ExtensionContext): void {
    const showConsoleCommand = vscode.commands.registerCommand('consoley.showConsole', () => {
        vscode.window.showInformationMessage('Consoley activated!');
    });

    context.subscriptions.push(showConsoleCommand);

    let isUpdating = false; 

    vscode.workspace.onDidSaveTextDocument((document) => {
        if (isUpdating) {return;}; 

        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document === document) {
            const text = document.getText();
            const updatedText = injectInlineOutput(text, document);

            if (updatedText !== text) {
                isUpdating = true; 
                const edit = new vscode.WorkspaceEdit();
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(text.length)
                );
                edit.replace(document.uri, fullRange, updatedText);

                vscode.workspace.applyEdit(edit).then(() => {
                    isUpdating = false; // - Reset after update
                });
            }
        }
    });

    // Reset outputInjected 
    vscode.workspace.onDidChangeTextDocument(() => {
        outputInjected.clear(); 
    });
}

// - inject output inline as comments
function injectInlineOutput(text: string, document: vscode.TextDocument): string {
    const lines = text.split('\n');
    const updatedLines: string[] = [];
    let variables: { [key: string]: any } = {};

    lines.forEach((line, index) => {
        const cleanedLine = line.replace(/\/\/ .+$/, '').trim();

        const varDeclaration = cleanedLine.match(/(?:const|let|var)\s+(\w+)\s*=\s*(.+)/);
        if (varDeclaration) {
            variables[varDeclaration[1]] = safeEvaluate(varDeclaration[2]);
        }

        const match = cleanedLine.match(/console\.log\((.*)\)/);
        if (match) {
            const content = match[1]; // Extract the content inside the parentheses

            let evaluatedOutput: string;

            try {
                // - evaluate the expression
                evaluatedOutput = evaluateExpression(content, variables);
            } catch (e) {
                evaluatedOutput = 'Error evaluating output';
            }

            updatedLines.push(`${cleanedLine} // ${evaluatedOutput}`);
            outputInjected.set(index, evaluatedOutput); 
        } else {
            updatedLines.push(cleanedLine); 
        }
    });

    return updatedLines.join('\n');
}

// - evaluate expressions (variables, arrays, objects, literals, and operations)
function evaluateExpression(expression: string, variables: { [key: string]: any }): string {
    expression = expression.trim();
    
    if (variables.hasOwnProperty(expression)) {
        return JSON.stringify(variables[expression]);
    }

    try {
        const func = new Function(...Object.keys(variables), 'return ' + expression + ';');
        return JSON.stringify(func(...Object.values(variables)));
    } catch (e) {
        return 'undefined'; 
    }
}

function safeEvaluate(expression: string): any {
    try {
        const func = new Function('return ' + expression + ';');
        return func();
    } catch (e) {
        return undefined;
    }
}

export function deactivate(): void {}