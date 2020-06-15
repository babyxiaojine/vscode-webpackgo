"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const utils_1 = require("./utils");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let startFunction = vscode.commands.registerCommand('extension.NpmStart', (fileUri) => {
        // The code you place here will be executed every time your command is executed
        // console.log(vscode.workspace.rootPath);
        // console.log(fileUri);
        let fsPath = fileUri.fsPath, fsId = fsPath.lastIndexOf('\\');
        fsPath = fsPath.substr(0, fsId);
        // let terminalA = vscode.window.createTerminal({ name: "老司机开车了" });
        let terminalA = utils_1.default.getActiviteTerminal('DRIVER START') || vscode.window.createTerminal({ name: "DRIVER START" });
        terminalA.show(true);
        terminalA.sendText("cd " + fsPath);
        terminalA.sendText("npm start");
    });
    let startFunction2 = vscode.commands.registerCommand('extension.GitSubmit', (fileUri) => {
        let fsPath = vscode.workspace.rootPath;
        let inputValue = 'zhouquan (' + utils_1.default.formatDate(new Date().getTime() + '') + ')';
        vscode.window.showInputBox({
            password: false,
            ignoreFocusOut: false,
            placeHolder: '消息',
            prompt: '请输入消息',
            value: inputValue
        }).then(function (msg) {
            if (msg) {
                let terminalA = utils_1.default.getActiviteTerminal('DRIVER PUSH') || vscode.window.createTerminal({ name: "DRIVER PUSH" });
                terminalA.show(true);
                terminalA.sendText("cd " + fsPath);
                terminalA.sendText(`git commit -a -m "${msg}"`);
                terminalA.sendText('git push origin');
            }
        });
        console.log(vscode.window.terminals, 'ssss');
    });
    context.subscriptions.push(startFunction);
    context.subscriptions.push(startFunction2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map