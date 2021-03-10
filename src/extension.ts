import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// Collect disposables.
	const disposables: vscode.Disposable[] = [];

	// Dialog Open.
	disposables.push(
		vscode.commands.registerCommand('vscode-dialog.open', async () => {
			const options = getOpenDialogOptions();
			const uri = await vscode.window.showOpenDialog(options);
			vscode.window.showInformationMessage(`dialog-open: uri: ${uri?.join(', ')}`);
		})
	);

	// Dialog Save.
	disposables.push(
		vscode.commands.registerCommand('vscode-dialog.save', async () => {
			const options = getSaveDialogOptions();
			const uri = await vscode.window.showSaveDialog(options);
			vscode.window.showInformationMessage(`dialog-save: uri: ${uri}`);
		})
	);

	context.subscriptions.push(...disposables);
}

export function deactivate() { }

function getOpenDialogOptions(): vscode.OpenDialogOptions {
	const workspace = vscode.workspace.workspaceFolders;
	return {
		title: 'Custom Open Dialog',
		defaultUri: workspace ? workspace[0].uri : undefined,
		openLabel: 'Custom Open Label',
		canSelectFiles: true,
		canSelectFolders: true,
	};
}

function getSaveDialogOptions(): vscode.SaveDialogOptions {
	const workspace = vscode.workspace.workspaceFolders;
	return {
		title: 'Custom Open Dialog',
		defaultUri: workspace ? workspace[0].uri : undefined,
		saveLabel: 'Custom Save Label'
	};
}
