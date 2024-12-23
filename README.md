<div align="center">
<img src="https://github.com/user-attachments/assets/583ffd18-1187-4cf2-9407-2a600750c0eb" alt="Logo" width="130"/>
</div>

# Consoley for VS Code


Consoley is a VS Code extension that injects the output of `console.log()` or `print()` statements directly into your code as inline comments. It allows you to see the result of your code's outputs directly in the editor, without needing to open the console or terminal.

## ✨ Features

- Displays the output of `console.log()` and `print()` statements inline in your code.
- Automatically updates the output when the file is saved.
- Prevents duplicate outputs from being injected into the same line.
- Supports JavaScript, TypeScript, Python (and can be extended to other languages).

## 📦 Installation

1. Open VS Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Search for `Consoley`.
4. Click `Install` to add the extension to your VS Code.

Alternatively, you can install it directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).

## ⚙️ Usage

1. **Write a `console.log()` or `print()` statement in your code**:
    ```javascript
    console.log("Hello, World!")
    print("Hello from Python!")
    ```

2. **Save the file**. The extension will automatically inject the output as a comment next to your `console.log()` or `print()` statement.

    Example:
    ```javascript
    console.log("Hello, World!") // "Hello, World!"
    print("Hello from Python!") // "Hello from Python!"
    ```

3. **Update your code**: If you modify the code, the comment with the output will be updated with the new result.

    Example:
    ```javascript
    const greeting = "Hello, World!";
    console.log(greeting) // "Hello, World!"
    ```

4. **Prevent Duplication**: Once an output has been injected for a line, it will not create new output comments if the code is saved again.

## 📝 Commands

- **Show Consoley**: Activates the extension and displays a message confirming that the extension is active.

To activate the command, press `Ctrl+Shift+P` or `Cmd+Shift+P` (on macOS) and type `Consoley: Show Console`.

## 🌐 Supported Languages

- JavaScript (`console.log`)
- Python (`print`)
- More languages can be supported by extending the regular expression in the code.

## ⚙️ Configuration

There are no specific configuration settings for this extension at the moment. You can simply install it and start using it in your code.

## 🐞 Known Issues

- The extension works by replacing the text in the file, so be cautious when using it with large files or complex code.
- It only supports basic output for `console.log` and `print` statements. More advanced use cases (such as evaluating complex expressions) may not work perfectly.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/psparwez/consoley/tree/main?tab=MIT-1-ov-file) file for details.

## 💡 Acknowledgements

- Special thanks to the [VS Code API](https://code.visualstudio.com/api) for providing the tools needed to create this extension.
