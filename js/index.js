import '../css/style.css';
import scrollBar from "./scrollbar";

// Dom elements
const question = document.querySelector('.question');
const answer = document.querySelector('.answer');
const prev = document.querySelector('.back');
const next = document.querySelector('.next');
const showAnswer = document.querySelector('.show-answer');
const cardIndex = document.querySelector('.index');

let card = {
    currentPage: 0,
    contents: []
};

window.addEventListener('load', init);

function init(e) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwFv0BgJDh-HtzeMYRhchSH66V51CSOZ7GP70hY4p0GiscZ6O7gbzdSnGXOgy2JrV5i/exec';
    fetch(scriptURL)
        .then(res => res.json())
        .then(data => {
            card.contents = arrayToObject(data);
            loadPage(1);
            scrollBar(card.contents, loadPage);
            console.log(card.contents);
        });
}

function arrayToObject(sheetData) {
    let res = sheetData.map(([a, b, c]) => {
        return {term: a, def: b, info: c};
    });
    return res;
}

function loadPage(index) {
    question.innerHTML = '';
    answer.innerHTML = '';
    cardIndex.innerHTML = '';

    card.currentPage = index;
    var {contents} = card;

    question.innerHTML = contents[card.currentPage -1].term;
    cardIndex.innerHTML = `${parseInt(card.currentPage)} / ${card.contents.length-1}`;

    // Add event listener
    prev.addEventListener('click', prevQuestion);
    next.addEventListener('click', nextQuestion);
    showAnswer.addEventListener('click', showDefinition);

}

function prevQuestion(e) {
    if (showAnswer.disabled) {
        showAnswer.disabled = false;
    }
    card.currentPage--;
    next.disabled = false;
    if (card.currentPage < 1) {
        prev.disabled = true;
        showAnswer.disabled = true;
        question.innerHTML = `<h3>No previous Question</h3>`
        card.currentPage = 1;
        loadPage(card.currentPage);
    } else {
        question.disabled = false;
        loadPage(card.currentPage)
    }
}

function nextQuestion(e) {
    console.log(card.currentPage, 'from nextQuestion');
    card.currentPage++;
    prev.disabled = false;
    if (card.currentPage > card.contents.length-1) {
        next.disabled = true;
        showAnswer.disabled = true;
        question.innerHTML = `<h3>No next Quesstion</h3>`
        card.currentPage = card.contents.length - 1;
        loadPage(card.currentPage);
    } else {
        question.disabled = false;
        loadPage(card.currentPage);
    }
}

function showDefinition(e) {
        console.log('from showdefinition');
        let {def} = card.contents[card.currentPage-1];
        answer.innerHTML = `<p>${def}</p>`
        // loadPage(card.currentPage);
}
