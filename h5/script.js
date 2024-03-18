// Returns an array of random integers from 1-10 with length pool
function rollDice(pool){
	const results = [];
	for(let i = 0; i < pool; i++){
		results.push(Math.floor(Math.random() * 10) + 1);
	}
	return results;
}

// Accepts an array of random integers 1-10 and number of Desperation dice, returns an array of equal size with integers interpreted into successes, criticals, failures, or despair/overreach
function interpretResults(results, desperationDice){
	const interpretedResults = [];
	for(let i = 0; i < desperationDice && results.length != 0; i++){
		let die = results.pop();
		if(die > 5){
			interpretedResults[i] = "success";
			if(die == 10){
				interpretedResults[i] = "critical";
			}
		}
		if(die < 6){
			interpretedResults[i] = "failure";
			if(die == 1){
				interpretedResults[i] = "despair";
			}
		}
	}
	while(results.length != 0){
		let die = results.pop();
		if(die > 5){
			if(die == 10){
				interpretedResults.push("critical");
			}else{
				interpretedResults.push("success");
			}
		}
		if(die < 6){
			interpretedResults.push("failure");
		}
	}
	return interpretedResults;
}

// Calls rollDice into interpretResults, renders dice icons and successes
function displayRoll(){
	let desperationDice = 0;
	if(applyDesperation.checked){
		desperationDice = parseInt(desperation.innerText);
	}
	const cells = document.querySelectorAll("td");
	for(let i = 0; i < cells.length; i++){
		cells[i].remove();
	}
	const results = interpretResults(rollDice(parseInt(pool.innerText) + desperationDice), desperationDice);
	let successCount = 0;
	let criticalCount = 0;
	let despair = false;
	while(results.length != 0){
		let die = results.pop()
		if(die == "success"){
			successCount++;
		}
		if(die == "critical"){
			criticalCount++;
		}
		if(die == "despair"){
			despair = true;
		}
		let cell = document.createElement("td")
		cell.innerHTML = '<img class="icon" src="' + die + '.svg">'
		resultsTable.appendChild(cell)
	}
	if(criticalCount > 1){
		criticalCount *= criticalCount;
	}
	successCount += criticalCount;
	resultsText.innerText = successCount + " successes"
	if(successCount == 1){
		resultsText.innerText = "1 success"
	}
	if(despair){
		resultsText.innerText += ", Despair or Overreach"
	}
	if(criticalCount > 1){
		resultsText.innerText += ", potential critical"
	}
}