// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Utils from './utils'
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let startFunction = vscode.commands.registerCommand('extension.npmStart', (fileUri) => {
		// The code you place here will be executed every time your command is executed
		// console.log(vscode.workspace.rootPath);
		// console.log(fileUri);
		let fsPath = fileUri.fsPath, fsId = fsPath.lastIndexOf('\\');
		fsPath = fsPath.substr(0,fsId);
		// let terminalA = vscode.window.createTerminal({ name: "老司机开车了" });
		let terminalA = vscode.window.activeTerminal || vscode.window.createTerminal({ name: "老司机开车了" });
		terminalA.show(true);
		terminalA.sendText("cd "+fsPath);
		terminalA.sendText("npm start");
	});
	let startFunction2 = vscode.commands.registerCommand('extension.GitSubmit', (fileUri) => {
		let fsPath = vscode.workspace.rootPath;
		let inputValue = 'zhouquan ('+Utils.formatDate(new Date().getTime()+'')+')';

		vscode.window.showInputBox({
			password:false, 
			ignoreFocusOut:false, 
			placeHolder:'消息', 
			prompt:'请输入消息',
			value: inputValue
		}).then(function(msg){
			if(msg){
				let terminalA = vscode.window.activeTerminal || vscode.window.createTerminal({ name: "老司机开车了" });
				terminalA.show(true);
				terminalA.sendText("cd "+fsPath);
				terminalA.sendText(`git commit -a -m "${msg}"`);
				terminalA.sendText('git push origin');
			}
		});
	});
	context.subscriptions.push(startFunction);
	context.subscriptions.push(startFunction2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
