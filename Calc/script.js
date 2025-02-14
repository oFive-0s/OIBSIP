
        function isOperator(char) {
            return ['+', '-', '*', '/', '%'].includes(char);
        }

        function Solve(val) {
            const input = document.getElementById('res');
            let currentValue = input.value;

            // Clear error state
            if (currentValue === 'Error') {
                input.value = '';
                currentValue = '';
            }

            // Handle decimal point
            if (val === '.') {
                const parts = currentValue.split(/[+\-*/%]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes('.')) return;
                
                if (currentValue === '' || isOperator(currentValue.slice(-1))) {
                    input.value += '0.';
                } else {
                    input.value += '.';
                }
                return;
            }

            // Handle operators
            if (isOperator(val)) {
                if (currentValue === '') {
                    if (val === '-') input.value = '-';
                    return;
                }

                const lastChar = currentValue.slice(-1);
                if (isOperator(lastChar)) {
                    if (['+', '*', '/', '%'].includes(val)) {
                        input.value = currentValue.slice(0, -1) + val;
                    } else if (val === '-') {
                        input.value += val;
                    }
                } else {
                    input.value += val;
                }
                return;
            }

            // Handle numbers
            if (val === '0') {
                if (currentValue === '0') return;
                if (currentValue.endsWith('0') && 
                    (currentValue === '' || isOperator(currentValue.slice(-2, -1)))) {
                    return;
                }
            }

            if (/\d/.test(val)) {
                if (currentValue === '0') {
                    input.value = val;
                } else {
                    input.value += val;
                }
                return;
            }

            // Handle percentage
            input.value += val;
        }

        function Result() {
            const input = document.getElementById('res');
            try {
                let expression = input.value.replace(/×/g, '*').replace(/%/g, '/100');
                if (expression === '') {
                    input.value = '0';
                    return;
                }

                // Clean trailing operators
                while (isOperator(expression.slice(-1))) {
                    expression = expression.slice(0, -1);
                }

                const result = eval(expression);
                if (Number.isFinite(result)) {
                    input.value = parseFloat(result.toFixed(10));
                } else {
                    input.value = 'Error';
                }
            } catch {
                input.value = 'Error';
            }
        }

        function Clear() {
            document.getElementById('res').value = '';
        }

        function Back() {
            const input = document.getElementById('res');
            input.value = input.value.slice(0, -1);
        }

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            const validKeys = '0123456789+-*/.%';
            
            if (validKeys.includes(key)) {
                event.preventDefault();
                Solve(key === '*' ? '×' : key);
            } else if (key === 'Enter') {
                event.preventDefault();
                Result();
            } else if (key === 'Backspace') {
                event.preventDefault();
                Back();
            } else if (key.toLowerCase() === 'c') {
                event.preventDefault();
                Clear();
            }
        });