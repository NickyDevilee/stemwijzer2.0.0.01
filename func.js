// console.log(parties);
// console.log(subjects);

var title = document.getElementById('title');
var opinion = document.getElementById('opinion');
var btn_agree = document.getElementById('Eens');
var btn_disagree = document.getElementById('Oneens');
var btn_none = document.getElementById('Geen');
var btn_back = document.getElementById('terug');
var btn_next = document.getElementById('Volgende');
var btn_start = document.getElementById('start');
var bigParties = document.getElementById('loadBigParties');
var seculierParties = document.getElementById('loadSeculierParties');

bigParties.style.display = 'none';
seculierParties.style.display = 'none';
title.style.display = 'none';
opinion.style.display = 'none';
btn_agree.style.display = 'none';
btn_disagree.style.display = 'none';
btn_none.style.display = 'none';
btn_back.style.display = 'none';
btn_next.style.display = 'none';

var points = 0;
var question = 0;
var points_per_question = [];

const partySize = 15;

var pointsPerParty = {
	"PVV": 0,
	"ChristenUnie" : 0,
	"SP": 0,
	"D66": 0,
	"GroenLinks": 0,
	"Partij voor de Dieren": 0,
	"50Plus": 0,
	"VNL": 0,
	"Nieuwe Wegen": 0,
	"Forum voor Democratie": 0,
	"De Burger Beweging": 0,
	"Vrijzinnige Partij": 0,
	"Piratenpartij": 0,
	"Libertarische Partij": 0,
	"Lokaal in de Kamer": 0,
	"Niet Stemmers": 0,
	"VVD": 0,
	"PvdA": 0,
	"CDA": 0,
	"ChristenUnie": 0,
	"SGP": 0,
	"OndernemersPartij": 0,
	"DENK": 0,
	"Artikel 1": 0,
};

function resetButtonColors() {
	btn_agree.style.backgroundColor = "";
	btn_disagree.style.backgroundColor = "";
	btn_none.style.backgroundColor = "";
}

function start() {
	title.style.display = 'block';
	opinion.style.display = 'block';
	btn_agree.style.display = 'inline-block';
	btn_disagree.style.display = 'inline-block';
	btn_none.style.display = 'inline-block';
	btn_back.style.display = 'inline-block';
	btn_next.style.display = 'inline-block';
	btn_start.style.display = 'none';
	loadQuestion(question);
}

function loadQuestion(question) {
	if (question < 23) { // 4 voor testdate, 23 voor echte data
		console.log('question: ' + question + ' punten: ' + points_per_question[question]);
		title.innerText = subjects[question]['title'] + ((points_per_question[question]) ? points_per_question[question] : '') ;
		opinion.innerText = subjects[question]['statement'];
		if (points_per_question[question]) {
			if (points_per_question[question] === 1) {btn_agree.style.backgroundColor = "blue";}
			if (points_per_question[question] === -1) {btn_disagree.style.backgroundColor = "blue";}
			if (points_per_question[question] === 'none') {console.log('test123'); btn_none.style.backgroundColor = "blue";}
		}
	} else {
		finish();
	}
}

function nextQuestion() {
	question = question + 1;
	resetButtonColors();
	loadQuestion(question);
}
function lastQuestion() {
	question = question - 1;
	resetButtonColors();
	loadQuestion(question);
}

function vote(vote) {
	if (vote == 'eens') {
		points++;
		points_per_question[question] = 1;
		for (var i = 1; i < 23; i++) {
			// console.log(subjects[question]['parties'][i]['position']);
			if (subjects[question]['parties'][i]['position'] == 'pro') {
				pointsPerParty[subjects[question]['parties'][i]['name']]++;
			}
		}
		question = question + 1;
		resetButtonColors();
		loadQuestion(question);
	}else if (vote == 'oneens') {
		points--;
		points_per_question[question] = -1;
		for (var i = 1; i < 23; i++) {
			// console.log(subjects[question]['parties'][i]['position']);
			if (subjects[question]['parties'][i]['position'] == 'contra') {
				pointsPerParty[subjects[question]['parties'][i]['name']]++;
			}
		}
		question = question + 1;
		resetButtonColors();
		loadQuestion(question);
	}else if (vote == 'none') {
		points_per_question[question] = 'none';
		for (var i = 1; i < 23; i++) {
			// console.log(subjects[question]['parties'][i]['position']);
			if (subjects[question]['parties'][i]['position'] == 'none') {
				pointsPerParty[subjects[question]['parties']['name']]++;
			}
		}
		question = question + 1;
		resetButtonColors();
		loadQuestion(question);
	}
	// console.log(points_per_question);
	// console.log(pointsPerParty);
}

function finish() {
	title.innerText = 'Finish!';
	opinion.innerText = 'Aantal punten: ' + points;
	btn_agree.style.display = 'none';
	btn_disagree.style.display = 'none';
	btn_none.style.display = 'none';
	btn_back.style.display = 'none';
	btn_next.style.display = 'none';
	bigParties.style.display = 'block';
	seculierParties.style.display = 'block';
	loadResult();
}


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function loadResult() {
	// console.log(pointsPerParty);
	pointsPerPartySorted = Object.entries(pointsPerParty).sort((a, b) => b[1] - a[1]).map((el) => el[0]);
	// console.log(pointsPerPartySorted);
	for (var i = 0; i < 23; i++) {
		pointsPerPartySorted[i]; // title
		pointsPerParty[pointsPerPartySorted[i]]; // amount
		var tag = document.createElement("p");
		tag.innerText = pointsPerPartySorted[i] + ' = ' + pointsPerParty[pointsPerPartySorted[i]];
		var element = document.getElementById("allParties");
   		element.appendChild(tag);
	}
}

function getBigParties() {
	document.getElementById("allParties").style.display = 'none';
	document.getElementById("seculierParties").style.display = 'none';
	document.getElementById("bigParties").style.display = 'block';

	pointsPerPartySorted = Object.entries(pointsPerParty).sort((a, b) => b[1] - a[1]).map((el) => el[0]);
	for (var i = 0; i < 23; i++) {
		var resultObject = search(pointsPerPartySorted[i], parties);
		if (resultObject.size > partySize) {
			pointsPerPartySorted[i]; // title
			pointsPerParty[pointsPerPartySorted[i]]; // amount
			var tag = document.createElement("p");
			tag.innerText = pointsPerPartySorted[i] + ' = ' + pointsPerParty[pointsPerPartySorted[i]];
			var element = document.getElementById("bigParties");
			element.appendChild(tag);
		}
	}
}

function getSeculierParties() {
	document.getElementById("allParties").style.display = 'none';
	document.getElementById("bigParties").style.display = 'none';
	document.getElementById("seculierParties").style.display = 'block';

	pointsPerPartySorted = Object.entries(pointsPerParty).sort((a, b) => b[1] - a[1]).map((el) => el[0]);
	for (var i = 0; i < 23; i++) {
		var resultObject = search(pointsPerPartySorted[i], parties);
		if (resultObject.size < partySize) {
			pointsPerPartySorted[i]; // title
			pointsPerParty[pointsPerPartySorted[i]]; // amount
			var tag = document.createElement("p");
			tag.innerText = pointsPerPartySorted[i] + ' = ' + pointsPerParty[pointsPerPartySorted[i]];
			var element = document.getElementById("seculierParties");
			element.appendChild(tag);
		}
	}
}