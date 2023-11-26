window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "b_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("b_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("b_op_plus").onclick = function() { 
        if (a === '') return
        if (selectedOperation === '+') {
            expressionResult = (+a) + (+b);
            a = expressionResult.toString();
            b = '';
            outputElement.innerHTML = a;
        } else {
            selectedOperation = '+';
        }   
    }
    document.getElementById("b_op_minus").onclick = function() { 
        if (a === '') return
        if (selectedOperation === '-') {
            expressionResult = (+a) - (+b);
            a = expressionResult.toString();
            b = '';
            outputElement.innerHTML = a;
        } else {
            selectedOperation = '-';
        }   
    }
    document.getElementById("b_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    

    // %
    document.getElementById("b_percent").onclick = function() {
        if(selectedOperation === null){
            if(a !== ''){
                a = (parseFloat(a)/100).toString();
                outputElement.innerHTML=a;
            }
        } else {
            if(b !== ''){
                b = (parseFloat(b) * parseFloat(a)/100).toString();
                outputElement.innerHTML = b;
            }
        }
    };
    
    // корень
    document.getElementById("b_op_cor").onclick = function() {
        if(selectedOperation === null){
            if(a !== ''){
                a = (Math.sqrt(a)).toFixed(2);
                a.toString()
                outputElement.innerHTML = a;
            }
        } else {
            if(b !== ''){
                b = (Math.sqrt(b*a)).toFixed(2);
                b.toString()
                outputElement.innerHTML = b;
            }
        }
    };

    // квадрат
    document.getElementById("b_op_kvadro").onclick = function() {
        if(selectedOperation === null){
            if(a !== ''){
                a = (Math.pow(a,2)).toString();
                outputElement.innerHTML=a;
            }
        } else {
            if(b !== ''){
                b = (b * (Math.pow(a,2))).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    // !
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
    document.getElementById("b_op_!").onclick = function() {
        if (!selectedOperation) {
            a = factorial(a);
            outputElement.innerHTML = a;
        } else {
            b = factorial(b);
            outputElement.innerHTML = b;
        }
    };    
 
    // кнопка очищения
    document.getElementById("b_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка расчёта результата
    document.getElementById("b_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    // смена знака числа
    document.getElementById("b_sign").onclick = function() { 
        if(outputElement.innerHTML == a){
            a*=(-1)
            outputElement.innerHTML = a
        } else if (outputElement.innerHTML == b){
            b*=(-1)
            outputElement.innerHTML = b}
    }

    // бекспейс
    document.getElementById("b_bs").onclick = function() {
        if (outputElement.innerHTML == a) {
            a = a.slice(0, -1);
            if (a === "") {
              outputElement.innerHTML = 0;
            } else {
              outputElement.innerHTML = a;
            }
          } 
        else if (outputElement.innerHTML == b) {
            b = b.slice(0, -1);
            if (b === "") {
              outputElement.innerHTML = 0;
            } else {
              outputElement.innerHTML = b;
            }
          }
    };

    // смена цвета
    changeColorButton = document.getElementById("b_swap_color"); 
    changeColorButton.onclick = function() {
        const randomColor = getRandColor();
        outputElement.style.backgroundColor = randomColor;
    };

//смена темы
    changeThemeButton = document.getElementById("b_swap_theme"); 
    changeThemeButton.onclick = function() {
    styleDark = document.querySelector('link[href="styleD.css"]');
    styleLight = document.querySelector('link[href="style.css"]');
        if (styleDark.disabled) {
            styleDark.disabled = false;
            styleLight.disabled = true;
        } else {
            styleDark.disabled = true;
            styleLight.disabled = false;
        }
    };
    
    // генерация рандомного цвета
    function getRandColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    };