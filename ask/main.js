function setQuestions(id) {
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
    document.getElementById('dot-answer-' + answer).classList.remove('visually-hidden');
}

function showWrong(answer, solution) {
    document.getElementById('dot-answer-' + solution).classList.remove('visually-hidden');
    document.getElementById('dot-answer-' + answer).classList.remove('visually-hidden');
    document.getElementById('dot-answer-' + answer).style.backgroundColor = 'rgb(206, 84, 76)';
}
    
function correctAnswer(id, answer) {
    $.ajax({
        url: "questions.json",
        dataType: "json",
    }).done(function (result) {
        console.log(result);
        if (answer == result[id].solution) {
            showCorrect(answer);
        } else {
            showWrong(answer, result[id].solution);
        }

    });
}

var rqid = Math.floor((Math.random() * 2) + 1); // Random Question Identifier

setQuestions(rqid);

function sendAnswer(answer) {
    correctAnswer(rqid, answer);
}