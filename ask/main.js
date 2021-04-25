function setQuestion(id) {
    $.ajax({
        url: "questions.json",
        dataType: "json",
    }).done(function (result) {
        document.getElementById('question-text').innerHTML = result[id].body;
        document.getElementById('answer-text-1').innerHTML = result[id].one;
        document.getElementById('answer-text-2').innerHTML = result[id].two;
        document.getElementById('answer-text-3').innerHTML = result[id].three;
        document.getElementById('answer-text-4').innerHTML = result[id].four;
    });
    listenForAnswers();
}

function showCorrect(id, answer) {
    document.getElementById('answer-dot-' + answer).classList.remove('visually-hidden');
    document.getElementById('answer-container-' + answer).style.backgroundColor = 'rgb(39, 39, 39)';
    $('#answer-container-' + answer).click(function(){
        nextQuestion(id);
      });
}

function showWrong(id, answer, solution) {
    document.getElementById('answer-dot-' + solution).classList.remove('visually-hidden');
    document.getElementById('answer-container-' + solution).style.backgroundColor = 'rgb(39, 39, 39)';
    document.getElementById('answer-dot-' + answer).classList.remove('visually-hidden');
    document.getElementById('answer-dot-' + answer).style.backgroundColor = 'rgb(206, 84, 76)';
    $('#answer-container-' + solution).click(function(){
        nextQuestion(id);
      });
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
        if (answer == result[id].solution) {
            showCorrect(id, answer);
        } else {
            showWrong(id, answer, result[id].solution);
        }

    });
}

function sendAnswer(answer) {
    stopListenForAnswer();
    correctAnswer(rqid, answer);
}

function nextQuestion(oldId) {
    resetAnswerLayout();
    console.log("Cookie: " + Cookies.get('history'));
    var storedArray = Cookies.get('history').split(',');
    console.log('array before:');
    console.log(storedArray);
    storedArray.push(oldId);
    console.log('added: ' + oldId);
    console.log('array after:');
    console.log(storedArray);
    Cookies.set('history',  storedArray.toString());
    console.log(Cookies.get('history'));
    rqid = Math.floor((Math.random() * 5) + 1).toString(); // Random Question Identifier
    if (storedArray.includes(rqid) == true) {
        console.log('does include ' + rqid);
        do {
            rqid = Math.floor((Math.random() * 5) + 1).toString(); // Random Question Identifier
            console.log('rqid changed to: ' + rqid);
          }
          while (storedArray.includes(rqid) == true);
        console.log('rqid has finished changing: ' + rqid);
    } else {
        console.log('does not include ' + rqid);
    }
    console.log('Send setQuestion with: ' + rqid);
    setQuestion(rqid);
}

function listenForAnswers() {
    $(document).ready(function() {
        $('#answer-container-1').click(function(){
            sendAnswer(1);
        });
        $('#answer-container-2').click(function(){
            sendAnswer(2);
        });
        $('#answer-container-3').click(function(){
            sendAnswer(3);
        });
        $('#answer-container-4').click(function(){
            sendAnswer(4);
        });
    });
}

function stopListenForAnswer() {
    $(document).ready(function() {
        $('#answer-container-1').off("click");
        $('#answer-container-2').off("click");
        $('#answer-container-3').off("click");
        $('#answer-container-4').off("click");
    });
}

var rqid = Math.floor((Math.random() * 5) + 1).toString(); // Random Question Identifier;

if (Cookies.get('history') == null) {
    console.log("Init Test: No cookies yet");
    var cookieConfirm = confirm("Dürfen wir Cookies nutzen?");
    if (cookieConfirm == true) {
        var historyArray = [0];
        Cookies.set('history', historyArray.toString());
        setQuestion(rqid);
    } else {
        alert("Ohne Zustimmung ist die Webseite nicht funktionsfähig.");
        window.location.href  = "https://apuem.com";
    }
} else {
    console.log("Init Test" + Cookies.get('history'));
    setQuestion(rqid);
}