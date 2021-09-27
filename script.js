let startBalance;
let str;

const months = [' января', ' февраля', ' марта', ' апреля', ' мая', ' июня', ' июля', ' августа', ' сентября', ' октября', ' ноября', 'декабря', 'итог:', 'Итог:'];
let MikesPayments = []; // массив платежей Михаила
let MariaPayments = []; // массив платежей Марии


let finishBalance; // итоговый баланс
let strArray; // массив строк диалога
let strArrayErrors; // массив строк ошибок из диалога

let deleteWrongLines = function () {
    strArrayErrors = [];
    for (let i = 0; i < strArray.length; i++) {

        for (let j = 0; j < months.length; j++) {
            if (strArray[i] === '' || strArray[i] === ' ' || strArray[i].includes(months[j])) {
                //console.log('работает: ', 'line: ', strArray[i], ' ', 'month: ', months[j], 'i: ', i);
                if (strArray[i]) {
                    strArrayErrors.push(strArray[i]);
                }
                strArray.splice(i, 1);
                i--;
                break
            }
        }

        if (strArray[i] && !strArray[i].includes('Михаил Четвериков') && !strArray[i].includes('Мария Четверикова') && !Boolean(parseInt(strArray[i]))) {
            strArrayErrors.push(strArray[i]);
            strArray.splice(i, 1);
            i--;
        }

    }

    console.log('strArrayErrors: ', strArrayErrors);

};



//console.log(strArray);
const findMikesPayments = function () {

    MikesPayments = [];
    MariaPayments = [];
    for (let i = 0; i < strArray.length; i++) {
        if (strArray[i].includes('Михаил Четвериков') && strArray[i + 1].includes('Михаил Четвериков')) {
            //console.log('нашли Михаил Четвериков ' + strArray[i] + ' / ' + strArray[i+1]  + ' / ' + strArray[i+2]);
            let j = i + 2;
            while (j < strArray.length) {

                if (strArray[j].includes('Михаил Четвериков') || strArray[j].includes('Мария Четверикова')) {
                    break
                }
                //console.log('strArray[j]: ', strArray[j]);
                MikesPayments.push(strArray[j]);
                j++
            }
        }
    }

}



const findMariaPayments = function () {

    for (let i = 0; i < strArray.length; i++) {
        if (strArray[i].includes('Мария Четверикова') && strArray[i + 1].includes('Мария Четверикова')) {
            //console.log('нашли Мария Четверикова ' + strArray[i] + ' / ' + strArray[i+1]  + ' / ' + strArray[i+2]);
            let j = i + 2;
            while (j < strArray.length) {

                if (strArray[j].includes('Михаил Четвериков') || strArray[j].includes('Мария Четверикова')) {
                    break
                }
                //console.log('strArray[j]: ', strArray[j]);
                MariaPayments.push(strArray[j]);
                j++
            }
        }
    }

}



const calculateBalanсe = function () {
    MikesPayments.forEach(function (elem, i) {
        MikesPayments[i] = parseInt(elem, 10);
    });

    MariaPayments.forEach(function (elem, i) {
        MariaPayments[i] = parseInt(elem, 10);
    });

    let MikeBalance = MikesPayments.reduce(function (sum, item) {
        return sum + item
    });

    let MariaBalance = MariaPayments.reduce(function (sum, item) {
        return sum + item
    });
    finishBalance = Number(startBalance) + MikeBalance - MariaBalance;
    //console.log('MariaBalance: ', MariaBalance);
    //console.log('MikeBalance: ', MikeBalance);
    //console.log('startBalance: ', startBalance);
}


function reCalculateAllData() {
    strArray = str.split(/\n/);
    deleteWrongLines();
    findMikesPayments();
    findMariaPayments();
    calculateBalanсe();
}


function reCalculateAndShow() {
    const calculateForm = document.querySelector('.calculate-form');
    const startBalanceInput = calculateForm.querySelector('#start-balance');
    const dialogInput = calculateForm.querySelector('#dialog');
    const result = document.querySelector('.result');
    const summary = document.querySelector('.summary');


    const clearTextArea = function () {
        const buttonClear = document.querySelector('.button-clear');
        buttonClear.addEventListener ('click', function (evt) {
            evt.preventDefault();
            dialogInput.value = '';
        })
    };

    clearTextArea ();



    calculateForm.addEventListener('submit', functionSubmit);

    function functionSubmit(evt) {
        summary.classList.remove('display-none');
        summary.classList.add('display-block');
        evt.preventDefault();
        startBalance = startBalanceInput.value;
        str = dialogInput.value;
        reCalculateAllData();
        console.log('finishBalance: ', finishBalance);
        let text = `Мария должна &{finishBalance}`
        finishBalance >= 0 ? result.textContent = `Итог: Мария должна ${finishBalance}` : result.textContent = `Итог: Михаил должен ${finishBalance*(-1)}`;

    }


}

reCalculateAndShow();