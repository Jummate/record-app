

const _ = elem => document.querySelector(elem);

let numOfSubject = 0;

let totalRow = 0;
let totalCol1 = 0;
let totalCol2 = 0;
let totalCol3 = 0;
let count = 0;
let overallTotalCol = 0;
let overallTotalRow = 0;
let totalNumEntry = 0;
let user_entry = 0;
let percent_score = 0;
let weightedAverage = 0;
let totalWeightedAve = 0;


window.addEventListener('DOMContentLoaded', ()=> {
	if(!sessionStorage.hasOwnProperty("firstTimeLoading"))
	{
		sessionStorage.setItem("firstTimeLoading", "1");
	}
	if(sessionStorage.getItem("firstTimeLoading") === "1")
	{
		sessionStorage.setItem("firstTimeLoading","0");
	}
	else
	{
		_('#overlay').style.display = 'none'
		_("#inner").style.display = "flex";
	}
	
})
_('#btn-fourth').addEventListener('click', ()=> {
	numOfSubject = _('#num-of-subject').value;
	if(numOfSubject >= 1 && numOfSubject < 17)
	{
		_('#num-of-subject').value = '';
		_('#overlay').style.display = 'none';
		_('#inner').style.display = 'flex';
		_("#inner").style.animation = 'fadeOut 0.7s ease-in';
		
		
	}
})

const hideAndDisplay = () => {
	for(let x of document.querySelectorAll('.hide-and-display'))
	{
		x.style.visibility = 'visible';
	}
	 _('#entry').disabled = true;
	 
}
const calculatePercent = () => {
	if(overallTotalCol == overallTotalRow)
	{
		percent_score = (overallTotalCol / totalNumEntry).toFixed(1);
	}
}
const processEntry = () => {
	let userEntry = _('#entry').value;
	let containsAlpha = !(/^[0-9]+$/.test(userEntry));
	if((userEntry.length == 4 || userEntry.length == 6) && !containsAlpha)
	{
		user_entry = userEntry;
		_('#entry').value = '';
		
		let first = Number(userEntry[0] + userEntry[1]);
		let sec = Number(userEntry[2] + userEntry[3]);
		let third = 0;
		if(userEntry.length === 6){
			third = Number(userEntry[4] + userEntry[5]);
		}
		
		totalRow = first + sec + third;
		weightedAverage = userEntry.length == 4 ? (totalRow/2).toFixed(1) : (totalRow/3).toFixed(1)
		totalWeightedAve += Number(weightedAverage);
		totalCol1 += first;
		totalCol2 += sec;
		totalCol3 += third;
		overallTotalRow += totalRow;
		overallTotalCol = totalCol1 + totalCol2 + totalCol3;
		count++;
		totalNumEntry += (userEntry.length) / 2;
		
		_('#count').textContent = count;
		_('#h-first').textContent = totalRow +" "+weightedAverage;
		_('#count-entry').textContent = totalNumEntry;
		
		if(count == numOfSubject)
		{
			hideAndDisplay();
			
		}
	}
}



_('#btn-first').addEventListener('click', processEntry)


_('#btn-third').addEventListener('click', () => {
	calculatePercent();
	_('#h-sec').textContent = user_entry.length == 4 ? `${totalCol3} ${totalCol1} ${totalCol2} ${overallTotalCol} ${totalWeightedAve} ${percent_score}%` : `${totalCol1} ${totalCol2} ${totalCol3} ${overallTotalCol} ${totalWeightedAve} ${percent_score}%`;
	_('#btn-third').disabled = true;
})

_('#btn-new-student').addEventListener('click', () => {
	if(sessionStorage.getItem("firstTimeLoading") === "1")
	{
		sessionStorage.setItem("firstTimeLoading","0");
		
	}
	else
	{
		_('#overlay').style.display = 'none';
		_("#inner").style.display = "flex";
		_("#inner").style.animation = 'fadeOut 0.7s ease-in';
		
	}
	location.reload();
})