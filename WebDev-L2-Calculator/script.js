'use strict';

// OIBSIP Level 2 - Calculator
(() => {
    // Get HTML elements
    const keypad = document.getElementById('keypad');
    const expressionDisplay = document.getElementById('expression');
    const currentDisplay = document.getElementById('current-display');

    // Calculator state
    const state = {
        current: '0',
        previous: null,
        operator: null,
        overwrite: false,
        error: false
    };

    // Show calculator values on the screen
    function render() {
        expressionDisplay.textContent =
            state.previous !== null && state.operator !== null
                ? `${state.previous} ${getOperatorSymbol(state.operator)}`
                : '';

        currentDisplay.textContent = state.error
            ? 'Cannot divide by 0'
            : state.current;

        // Shrink long numbers to prevent display overflow
        const length = currentDisplay.textContent.length;
        currentDisplay.style.fontSize =
            length > 12 ? 'clamp(1rem, 5vw, 1.7rem)' : '';
    }

    // Display friendly mathematical symbols
    function getOperatorSymbol(operator) {
        const symbols = {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        };

        return symbols[operator] || operator;
    }

    // Reset everything
    function clearCalculator() {
        state.current = '0';
        state.previous = null;
        state.operator = null;
        state.overwrite = false;
        state.error = false;
        render();
    }

    // Recover after an error when the next key is pressed
    function recoverFromError() {
        if (!state.error) {
            return;
        }

        state.current = '0';
        state.previous = null;
        state.operator = null;
        state.overwrite = false;
        state.error = false;
    }

    // Enter a number
    function inputDigit(digit) {
        if (state.overwrite) {
            state.current = digit;
            state.overwrite = false;
        } else if (
            state.current === '0' ||
            state.current === '-0'
        ) {
            state.current =
                state.current === '-0' ? `-${digit}` : digit;
        } else if (state.current.length < 12) {
            state.current += digit;
        }

        render();
    }

    // Enter a decimal point
    function inputDecimal() {
        if (state.overwrite) {
            state.current = '0.';
            state.overwrite = false;
        } else if (!state.current.includes('.')) {
            if (state.current === '-') {
                state.current = '-0.';
            } else {
                state.current += '.';
            }
        }

        render();
    }

    // Format a calculated result
    function formatResult(number) {
        if (!Number.isFinite(number)) {
            return '0';
        }

        // Remove common floating-point errors
        const cleaned = parseFloat(number.toFixed(10));

        // Use exponential notation for very large or small values
        if (
            cleaned !== 0 &&
            (Math.abs(cleaned) >= 1e12 ||
             Math.abs(cleaned) < 1e-7)
        ) {
            return cleaned.toExponential(6)
                .replace(/\.?0+e/, 'e');
        }

        return String(cleaned);
    }

    // Perform arithmetic without eval()
    function calculate(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;

            case '-':
                return first - second;

            case '*':
                return first * second;

            case '/':
                if (second === 0) {
                    return null;
                }
                return first / second;

            default:
                return second;
        }
    }

    // Display an error and stop the current calculation
    function showError() {
        state.current = '0';
        state.previous = null;
        state.operator = null;
        state.overwrite = true;
        state.error = true;
        render();
    }

    // Select an operator and support left-to-right chaining
    function inputOperator(nextOperator) {
        if (state.current === '-' || state.current === '') {
            return;
        }

        // If an operation is pending and a new number was entered,
        // calculate it before accepting the next operator.
        if (
            state.previous !== null &&
            state.operator !== null &&
            !state.overwrite
        ) {
            const result = calculate(
                parseFloat(state.previous),
                parseFloat(state.current),
                state.operator
            );

            if (result === null) {
                showError();
                return;
            }

            state.current = formatResult(result);
        }

        // Save the current value and operator.
        // If two operators are pressed consecutively,
        // the new operator replaces the old one.
        if (state.previous === null || !state.overwrite) {
            state.previous = state.current;
        }

        state.operator = nextOperator;
        state.overwrite = true;
        render();
    }

    // Calculate the final result
    function calculateResult() {
        if (
            state.previous === null ||
            state.operator === null ||
            state.current === '-' ||
            state.overwrite
        ) {
            return;
        }

        const first = parseFloat(state.previous);
        const second = parseFloat(state.current);

        const result = calculate(
            first,
            second,
            state.operator
        );

        if (result === null) {
            showError();
            return;
        }

        state.current = formatResult(result);
        state.previous = null;
        state.operator = null;
        state.overwrite = true;

        render();
    }

    // Delete the last character
    function backspace() {
        if (state.overwrite) {
            state.current = '0';
            state.overwrite = false;
        } else if (state.current.length > 1) {
            state.current = state.current.slice(0, -1);

            if (state.current === '-') {
                state.current = '0';
            }
        } else {
            state.current = '0';
        }

        render();
    }

    // Handle all calculator button clicks with one listener
    keypad.addEventListener('click', function (event) {
        const button = event.target.closest('button');

        if (!button || !keypad.contains(button)) {
            return;
        }

        const { number, operator, action } = button.dataset;

        // Clear must always work, including after an error.
        if (action === 'clear') {
            clearCalculator();
            return;
        }

        recoverFromError();

        if (number !== undefined) {
            inputDigit(number);
        } else if (operator !== undefined) {
            inputOperator(operator);
        } else {
            switch (action) {
                case 'decimal':
                    inputDecimal();
                    break;

                case 'backspace':
                    backspace();
                    break;

                case 'equals':
                    calculateResult();
                    break;
            }
        }
    });

    // Keyboard support
    document.addEventListener('keydown', function (event) {
        const key = event.key;
        const supportedKeys =
            /^[0-9.+\-*/]$/.test(key) ||
            ['Enter', '=', 'Backspace', 'Escape'].includes(key);

        if (!supportedKeys) {
            return;
        }

        // Do not interfere with typing in other input fields.
        const target = event.target;
        if (
            target instanceof HTMLElement &&
            target.matches('input, textarea, select, [contenteditable="true"]')
        ) {
            return;
        }

        event.preventDefault();

        // Escape clears the calculator.
        if (key === 'Escape') {
            clearCalculator();
            return;
        }

        // Backspace deletes the last digit.
        if (key === 'Backspace') {
            recoverFromError();
            backspace();
            return;
        }

        recoverFromError();

        if (/^[0-9]$/.test(key)) {
            inputDigit(key);
        } else if (key === '.') {
            inputDecimal();
        } else if (['+', '-', '*', '/'].includes(key)) {
            inputOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
        }
    });

    // Initial display
    render();
})();