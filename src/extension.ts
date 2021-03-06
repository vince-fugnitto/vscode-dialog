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

    disposables.push(
        vscode.commands.registerCommand('vscode-dialog.open-many', async () => {
            const options = getOpenManyDialogOptions();
            const uri = await vscode.window.showOpenDialog(options);
            vscode.window.showInformationMessage(`dialog-open-many: uri: ${uri?.join(', ')}`);
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
        canSelectFolders: false,
        filters: {
            'images': ['png', 'jpg'],
            'typescript': ['ts', 'tsx']
        }
    };
}

function getOpenManyDialogOptions(): vscode.OpenDialogOptions {
    const workspace = vscode.workspace.workspaceFolders;
    return {
        title: 'Custom Open Many Dialog',
        defaultUri: workspace ? workspace[0].uri : undefined,
        openLabel: 'Custom Open Many Label',
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: true
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
