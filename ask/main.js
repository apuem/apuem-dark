function setQuestion(id) {
    $.ajax({
        url: "questions.json",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        document.getElementById('question-text').innerHTML = result[id].body;
        document.getElementById('answer-text-1').innerHTML = result[id].one;
        document.getElementById('answer-text-2').innerHTML = result[id].two;
        document.getElementById('answer-text-3').innerHTML = result[id].three;
        document.getElementById('answer-text-4').innerHTML = result[id].four;
    });
}

function showCorrect(answer) {
    document.getElementById('answer-dot-' + answer).classList.remove('visually-hidden');
    document.getElementById('answer-container-' + answer).style.backgroundColor = 'rgb(39, 39, 39)';
}

function showWrong(answer, solution) {
    document.getElementById('answer-dot-' + solution).classList.remove('visually-hidden');
    document.getElementById('answer-container-' + solution).style.backgroundColor = 'rgb(39, 39, 39)';
    document.getElementById('answer-dot-' + answer).classList.remove('visually-hidden');
    document.getElementById('answer-dot-' + answer).style.backgroundColor = 'rgb(206, 84, 76)';
    /* document.querySelector('#answer-container-' + i).addEventListener('click', nextquestion()); */
}

function resetAnswerLayout() {
    for (var i = 1; i <= 4; i++) {
        document.getElementById('answer-dot-' + i).style.backgroundColor = 'rgb(56, 139, 105)';
        document.getElementById('answer-dot-' + i).classList.add('visually-hidden');
        document.getElementById('answer-container-' + i).style.backgroundColor = 'rgb(0, 0, 0)';
    }
}
    
function correctAnswer(id, answer) {
    $.ajax({
        url: "questions.json",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        if (answer == result[id].solution) {
            showCorrect(answer);
            /* setTimeout(function(){ nextQuestion(id); }, 3000); */
        } else {
            showWrong(answer, result[id].solution);
            /* setTimeout(function(){ nextQuestion(id); }, 3000); */
        }

    });
}

function sendAnswer(answer) {
    correctAnswer(rqid, answer);
}

function nextQuestion(oldId) {
    var storedArray = JSON.parse(Cookies.get('history'));
    storedArray.push(oldId);
    rqid = Math.floor((Math.random() * 5) + 1); // Random Question Identifier
    while (storedArray.includes(rqid) == true) {
        rqid = Math.floor((Math.random() * 5) + 1); // Random Question Identifier
    }
    resetAnswerLayout();
    setQuestion(rqid);
    alert(rqid);
}

var rqid = 0;

if (Cookies.get('history') == null) {
    console.log("Init Test: No cookies yet");
    var cookieConfirm = confirm("Dürfen wir Cookies nutzen?");
    if (cookieConfirm == true) {
        var historyArray = [0];
        Cookies.set('history', JSON.stringify(historyArray));
    } else {
        alert("Ohne Zustimmung ist die Webseite nicht funktionsfähig.");
        window.location.href  = "https://apuem.com";
    }
} else {
    console.log("Init Test" + Cookies.get('history'));
    rqid = Math.floor((Math.random() * 5) + 1); // Random Question Identifier
    setQuestion(rqid);
}