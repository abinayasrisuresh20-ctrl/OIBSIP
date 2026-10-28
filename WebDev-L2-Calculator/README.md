# OIBSIP Level 2 – Calculator

## Project Description
A responsive calculator web application developed as part of the Oasis Infobyte Web Development & Designing internship. It performs basic arithmetic operations through a simple, user-friendly interface.

## Features
- Addition, subtraction, multiplication and division
- Number buttons (0–9) and decimal input
- Clear (`C`) and backspace (`⌫`) controls
- Separate expression and current-result displays
- Division-by-zero error handling
- Left-to-right operator chaining
- Consecutive operators replace the previous operator
- Floating-point result cleanup
- Keyboard support for numbers, operators, Enter, Backspace and Escape
- Responsive layout for desktop and mobile screens
- Accessible display updates and visible keyboard focus

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

No frameworks, external JavaScript libraries or build tools are required.

## Project Structure

```text
WebDev-L2-Calculator/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
    ├── calculator-desktop.png
    └── calculator-mobile.png
```

## How to Run
1. Download or clone the project repository.
2. Open the `WebDev-L2-Calculator` folder in Visual Studio Code.
3. Open `index.html` directly in a web browser, or use the Live Server extension in VS Code.
4. Click the calculator buttons or use the supported keyboard keys to perform calculations.

No additional installation or configuration is required.

## Keyboard Controls

| Key | Action |
|---|---|
| `0–9` | Enter a number |
| `+`, `-`, `*`, `/` | Select an operator |
| `.` | Enter a decimal point |
| `Enter` or `=` | Calculate the result |
| `Backspace` | Delete the last character |
| `Escape` | Clear the calculator |

## Calculation Behaviour
- Operations are evaluated from left to right. For example, `5 + 3 × 2 = 16`.
- Entering another operator before entering a number replaces the previous operator.
- Division by zero displays an error message.
- Common floating-point inaccuracies are cleaned up when displaying results.

## Screenshots
After testing the application, save screenshots of the working calculator in the `screenshots/` folder.

- `calculator-desktop.png` – calculator running on a desktop browser.
- `calculator-mobile.png` – responsive calculator at a mobile viewport width.

## Testing Checklist
- [ ] Basic arithmetic operations work correctly.
- [ ] Decimal input works and duplicate decimal points are ignored.
- [ ] Clear and backspace work correctly.
- [ ] Division by zero displays an error.
- [ ] Consecutive operators replace the previous operator.
- [ ] Chained calculations follow left-to-right evaluation.
- [ ] Long input does not overflow the display.
- [ ] Keyboard controls work correctly.
- [ ] Layout works at 320px, 768px and 1280px widths.
- [ ] No JavaScript errors appear in the browser console.

## Internship
**Organisation:** Oasis Infobyte  
**Track:** Web Development & Designing  
**Level:** Level 2  
**Task:** Calculator

## Author
Abinaya Sri S J