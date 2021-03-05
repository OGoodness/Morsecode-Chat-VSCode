// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "morsecode-sidebar",
      sidebarProvider
    )
  );

  // context.subscriptions.push(
  //   vscode.commands.registerCommand("morsecode.authenticate", () => {
  //     authenticate(() => {});
  //   })
  // );

  context.subscriptions.push(
    vscode.commands.registerCommand("morsecode.reloadSidebar", async () => {
      await vscode.commands.executeCommand("workbench.action.closeSidebar");
      await vscode.commands.executeCommand(
        "workbench.view.extension.morsecode-sidebar-view"
      );
      setTimeout(() => {
        vscode.commands.executeCommand(
          "workbench.action.webview.openDeveloperTools"
        );
      }, 500);
      // SwiperPanel.kill();
      // SwiperPanel.createOrShow(context.extensionUri);
      // if (sidebarProvider._view) {
      //   sidebarProvider.resolveWebviewView(sidebarProvider._view);
      // }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("morsecode.addCodeToProfile", async () => {
      const { activeTextEditor } = vscode.window;
      if (!activeTextEditor) {
        vscode.window.showErrorMessage("I don't see any code");
        return;
      }
      let text = activeTextEditor.document.getText(activeTextEditor.selection);
      if (!text) {
        text = activeTextEditor.document.getText();
      }

      if (!text) {
        vscode.window.showErrorMessage(`I couldn't get any code`);
        return;
      }

      if (text.length > 600) {
        text = text.slice(0, 600);
        vscode.window.showWarningMessage(
          `Only taking the first 600 characters`
        );
      }

      await vscode.commands.executeCommand(
        "workbench.view.extension.morsecode-sidebar-view"
      );
      sidebarProvider._view?.webview.postMessage({
        command: "new-code-snippet",
        data: {
          code: text,
          fontFamily: "Fira Code",
          // theme: '' // @todo infer theme
        },
      });
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
