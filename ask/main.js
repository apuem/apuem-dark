$.ajax({
    url: "questions.json",
    dataType: "json",
}).done(function (result) {
    console.log(result);

function setQuestion(id) {
    $.ajax({
        url: "questions.json",
        dataType: "json",
    }).done(function (result) {
        $(document).ready(function(){
            $("#question-text").text(result[id].body);
            $("#answer-text-1").text(result[id].one);
            $("#answer-text-2").text(result[id].two);
            $("#answer-text-3").text(result[id].three);
            $("#answer-text-4").text(result[id].four);
        });
    });
    listenForAnswers();
    setRapi();
}

function showCorrect(id, answer) {
    updateRapi();
    updateRwar(1, 1);
    document.getElementById('answer-dot-' + answer).classList.remove('visually-hidden');
    document.getElementById('answer-container-' + answer).style.backgroundColor = 'rgb(39, 39, 39)';
    $('#answer-container-' + answer).click(function(){
        nextQuestion(id);
    });
}

function showWrong(id, answer, solution) {
    updateRwar(0, 1);
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

function updateRwar(rightAmountPar, answerAmountPar) {
    /* if (Cookies.get('rwar') == null) {
        Cookies.set('rwar', 0);
        console.log('Init rwar: ' + rwar);
    }
    var rwar = parseInt(Cookies.get('rwar')); //Right Wrong Answered Ratio */
    if (Cookies.get('rightAmount') == null) {
        Cookies.set('rightAmount', 0);
        console.log('Init rightAmount: ' + rightAmount);
    }
    var rightAmount = parseInt(Cookies.get('rightAmount'));
    rightAmount = rightAmount + rightAmountPar;
    Cookies.set('rightAmount', rightAmount);
    console.log("New rightAmount: " + rightAmount);
    if (Cookies.get('answerAmount') == null) {
        Cookies.set('answerAmount', 0);
        console.log('Init answerAmount: ' + answerAmount);
    }
    var answerAmount = parseInt(Cookies.get('answerAmount'));
    answerAmount = answerAmount + answerAmountPar;
    Cookies.set('answerAmount', answerAmount);
    console.log("New answerAmount: " + answerAmount);
    var rwar = (rightAmount / answerAmount) * 100;
    console.log("New rwar: " + rwar);
    $('#points-dot').css('left', rwar + '%');
    var average = 50;
    $('#average-rect').css('left', average + '%');
}

function setRapi() {
    if (Cookies.get('rapi') == null) {
        Cookies.set('rapi', 0);
        console.log('Init rapi: ' + rapi);
    }
    var rapi = parseInt(Cookies.get('rapi')); //Right Answered Points
    console.log('old rapi: ' + rapi);
    $("#rapi").text(rapi);
}

function updateRapi() {
    if (Cookies.get('rapi') == null) {
        Cookies.set('rapi', 0);
        console.log('Init rapi: ' + rapi);
    }
    var rapi = parseInt(Cookies.get('rapi')); //Right Answered Points
    console.log('old rapi: ' + rapi);
    rapi = rapi + 5 + 5;
    console.log('new rapi: ' + rapi);
    $("#rapi").text(rapi);
    Cookies.set('rapi', rapi);
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
    rqid = Math.floor((Math.random() * (result.length - 1)) + 1).toString(); // Random Question Identifier
    if (storedArray.includes(rqid) == true && (result.length - 1) > storedArray.length) {
        console.log('does include ' + rqid);
        do {
            rqid = Math.floor((Math.random() * (result.length - 1)) + 1).toString(); // Random Question Identifier
            console.log('rqid changed to: ' + rqid);
          }
          while (storedArray.includes(rqid) == true);
        console.log('rqid has finished changing: ' + rqid);
    } else {
        console.log('does not include ' + rqid);
    }
    if (result.length == storedArray.length) {
        alert('We are sorry but it seems like you have already answered every question!');
    }
    console.log('Send setQuestion with: ' + rqid);
    setQuestion(rqid);
    Cookies.set('current', rqid);
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

function toggleTrain() {
    console.log("toggleTrain toggled");
}

console.log("%cAny changes made here can end in a misleading result!", "color: red; font-size: 1.5rem;"); 

var rqid = Math.floor((Math.random() * (result.length - 1)) + 1).toString(); // Random Question Identifier;

if (Cookies.get('current') == null) {
    Cookies.set('current', rqid);
    console.log('no current cookie. setting ' + rqid);
} else {
    rqid = Cookies.get('current');
}

if (Cookies.get('history') == null) {
    console.log("Init Test: No cookies yet");
    window.location.href = "consent";
    /* var cookieConfirm = confirm("Dürfen wir Cookies nutzen?"); */
    /* if (cookieConfirm == true) {
        var historyArray = [0];
        Cookies.set('history', historyArray.toString());
        setQuestion(rqid);
    } else {
        alert("Ohne Zustimmung ist die Webseite nicht funktionsfähig.");
        window.location.href  = "https://apuem.com";
    } */
} else {
    console.log("Init Test" + Cookies.get('history'));
    if ((result.length - 1) <= Cookies.get('history').split(',').length) {
        alert('We are sorry but it seems like you have already answered every question!');
    } else {
        setQuestion(rqid);
    }
}
}); //END 