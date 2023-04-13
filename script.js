const name_field = document.querySelector('.c-name'),
    cardName_div = document.querySelector('.name'),
    cardName_input = name_field.querySelector('#card-name'),
    name_errorText = name_field.querySelector('.error-text'),
    number_field = document.querySelector('.c-number'),
    cardNumber_div = document.querySelector('.card-number'),
    cardNumber_input = number_field.querySelector('#card-num'),
    number_errorText = number_field.querySelector('.error-text'),
    expDate_field = document.querySelector('.c-exp-date'),
    expiryDate_div = document.querySelector('.expiry'),
    expiryDate_input = expDate_field.querySelector('#exp-month'),
    exp_errorText = expDate_field.querySelector('.error-text'),
    cvc_field = document.querySelector('.card-cvc'),
    cvc_div = document.querySelector('.cvc'),
    cvc_input = cvc_field.querySelector('#c-cvc'),
    cvc_errorText = cvc_field.querySelector('.error-text'),
    details_section = document.querySelector('.details-section'),
    confirm_submit_section = document.querySelector('.confirm-submit');


// add minimum date in calendar
let todaysDate = new Date();
document.getElementById('exp-month').setAttribute('min', `${todaysDate.getFullYear()}-${(todaysDate.getMonth() < 10) ? '0' + (todaysDate.getMonth() + 2) : (todaysDate.getMonth() + 2)}`);


cardName_input.addEventListener('input', (e) => {
    if (e.target.value === '') {
        cardName_div.innerText = 'jane appleseed';
    } else {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '').trimStart();
        cardName_div.innerText = e.target.value.trim();
    }
});

cardNumber_input.addEventListener('input', (e) => {
    if(e.target.value === '0000 0000 0000 0000') {
        e.target.value = '';
    }
    if (e.target.value === '') {
        cardNumber_div.innerHTML = '0000 0000 0000 0000';
    } else {
        let target = e.target, position = target.selectionEnd, length = target.value.length;

        target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);

        cardNumber_div.innerText = cardNumber_input.value;
    }
});

expiryDate_input.addEventListener('input', (e) => {
    const splitedDate = e.target.value.split('-');
    expiryDate_div.innerText = `${splitedDate[1]}/${splitedDate[0].slice(2)}`;
});

cvc_input.addEventListener('input', (e) => {
    if (e.target.value === '000') e.target.value = '';
    if (e.target.value === '') {
        cvc_div.innerText = '000';
        return;
    }
    if (e.target.value.length > 3) e.target.value = e.target.value.slice(0, 3);
    cvc_div.innerText = e.target.value;
});


// Form while submitting
document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();

    if (cardName_input.value.trim() === ''){
        name_field.classList.add('error', 'shake');
        name_errorText.innerText = 'Name cannot be empty';
    }
    if(cardName_input.value.trim().length > 0 && cardName_input.value.trim().length <= 5){
        name_field.classList.add('error', 'shake');
        name_errorText.innerText = 'Name must have more than 5 characters';
    }

    if (cardNumber_input.value === '') {
        number_field.classList.add('error', 'shake');
        number_errorText.innerText = "Card Number can't be empty";
    }
    if(cardNumber_input.value.length > 0 && cardNumber_input.value.length < 19) {
        number_field.classList.add('error', 'shake');
        number_errorText.innerText = "Card Number must contain 16 digits";
    }


    if(expiryDate_input.value === '') {
        expDate_field.classList.add('error', 'shake');
    }

    if (cvc_input.value === '') {
        cvc_field.classList.add('error', 'shake');
        cvc_errorText.innerText = "Can't be blank";
    }
    if(cvc_input.value.length > 0 && cvc_input.value.length < 3) {
        cvc_field.classList.add('error', 'shake');
        cvc_errorText.innerText = "CVC must contain 3 digits";
    }

    setTimeout(() => {
        name_field.classList.remove('shake');
        number_field.classList.remove('shake');
        expDate_field.classList.remove('shake');
        cvc_field.classList.remove('shake');
    }, 500);

    cardName_input.onkeyup = (e) => {
        if(e.target.value.trim() === '') {
            name_field.classList.add('error');
            name_errorText.innerText = 'Name cannot be empty';
        } else if(cardName_input.value.trim().length > 0 && e.target.value.trim().length <= 5) {
            name_field.classList.add('error');
            name_errorText.innerText = 'Name must have more than 5 characters';
        } else {
            name_field.classList.remove('error');
        }
    }

    cardNumber_input.onkeyup = (e) => {
        if (cardNumber_input.value === '') {
            number_field.classList.add('error');
            number_errorText.innerText = "Card Number can't be empty";
        } else if(cardNumber_input.value.length > 0 && cardNumber_input.value.length < 19) {
            number_field.classList.add('error');
            number_errorText.innerText = "Card Number must contain 16 digits";
        } else {
            number_field.classList.remove('error');
        }
    } 

    expiryDate_input.oninput = (e) => {
        if(expiryDate_input.value !== '') {
            expDate_field.classList.remove('error');
        }
    }

    cvc_input.onkeyup = (e) => {
        if (cvc_input.value === '') {
            cvc_field.classList.add('error');
            cvc_errorText.innerText = "Can't be blank";
        } else if(cvc_input.value.length > 0 && cvc_input.value.length < 3) {
            cvc_field.classList.add('error');
            cvc_errorText.innerText = "CVC must contain 3 digits";
        } else {
            cvc_field.classList.remove('error');
        }
    }

    if(!name_field.classList.contains('error') && !number_field.classList.contains('error') && !expDate_field.classList.contains('error') && !cvc_field.classList.contains('error')) {
        details_section.classList.add('hide');
        confirm_submit_section.classList.remove('hide');
    }
}

document.querySelector('.continue-btn').onclick = () => {
    location.reload();
}