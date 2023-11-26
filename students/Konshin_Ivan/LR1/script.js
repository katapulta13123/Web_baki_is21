window.onload = function(){ 
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
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
    // Кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (selectedOperation === null) {
            // Если не выбрана операция, меняем знак числа a
            if (a !== '') {
                a = (-a).toString();
                outputElement.innerHTML = a;
            }
        } else {
            // Если выбрана операция, меняем знак числа b
            if (b !== '') {
                b = (-b).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation === null) 
        {
            if (a !== '') 
            {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else 
        {
            if (b !== '') 
            {
                b = (parseFloat(b) * parseFloat(a) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    };
    
    document.getElementById("btn_op_back").onclick = function() {   
    if (selectedOperation === null) {
        a = a.slice(0, -1);
        outputElement.innerHTML = a;
    } else {
        b = b.slice(0, -1);
        outputElement.innerHTML = b;
    }
    };

    let ind = false;
    const btn = document.getElementById("btn_background")
    btn.addEventListener('click', function onClick(event){
         const name = document.getElementById("fon");
         
         if (ind === false)
         {
             name.style.backgroundColor = 'black';
             ind = true
         }
        else
         {
             name.style.backgroundColor = 'rgb(32, 5, 9)';
             ind = false
         }
    }) 

    document.getElementById("btn_op_sqrt").onclick = function() {   
        if (selectedOperation === null) {
            if (a !== '') {
                a = Math.sqrt(parseFloat(a)).toString();
                outputElement.innerHTML = a;
            }
        } else if (b !== '') {
            b = Math.sqrt(parseFloat(b)).toString();
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_pow").onclick = function() {   
        if (selectedOperation === null) {
            if (a !== '') {
                a = Math.pow(parseFloat(a), 2).toString();
                outputElement.innerHTML = a;
            }
        } else if (b !== '') {
            b = Math.pow(parseFloat(b), 2).toString();
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_factor").onclick = function() {   
        if (selectedOperation === null) {
            if (a !== '' && parseFloat(a) > 0) {
                for (let i = parseFloat(a)-1; i > 0; i--)
                {
                    a = parseFloat(a) * i;
                }
                a = a.toString();
                outputElement.innerHTML = a;
            }
        } else if (b !== '' && parseFloat(b) > 0) {
            for (let i = parseFloat(b)-1; i > 0; i--)
                {
                    b = parseFloat(b) * i;
                }
                b = b.toString();
                outputElement.innerHTML = b;
        }
    };

    let ind2 = false;
    const btn2 = document.getElementById("btn_result")
    btn2.addEventListener('click', function onClick(event){
         const name = document.getElementById("result");
         
         if (ind2 === false)
         {
             name.style.backgroundColor = 'rgb(204, 100, 100)';
             name.style.color = 'black';
             ind2 = true
         }
        else
         {
             name.style.backgroundColor = 'black';
             name.style.color = '#328592';
             ind2 = false
         }
     }) 

    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
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
  document.getElementById("btn_op_minus").onclick = function() { 
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
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
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
    };