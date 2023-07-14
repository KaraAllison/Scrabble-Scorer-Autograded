// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function transform(oldStruct) {
   let newStruct = {};
   for (item in oldStruct) {
      for (j = 0; j < oldStruct[item].length; j++) {
         newStruct[oldStruct[item][j].toLowerCase()] = Number(item);
      }
   }
   return newStruct;
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: ");
   return word;
};

let simpleScorer = function(word) {
   return word.length;
};

let vowelBonusScorer = function(word) {
   let wordArray = word.toLowerCase().split('');
   let score = 0;
   for (i = 0; i < wordArray.length; i++) {
      if (wordArray[i] === 'a' || wordArray[i] === 'e' || wordArray[i] === 'i' ||
      wordArray[i] === 'o' || wordArray[i] === 'u') {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let newPointStructure = transform(oldPointStructure);

let scrabbleScorer = function(word) {
   let wordArray = word.toLowerCase().split('');
   let score = 0;
   for (i = 0; i < wordArray.length; i++) {
      // console.log(wordArray[i])
      // console.log(newPointStructure)
      // console.log(newPointStructure[wordArray[i]])
      score += newPointStructure[wordArray[i]];
   }
   return score;
};

const scoringAlgorithms = [
   {
      'name': 'Simple Score',
      'description': 'Each letter is worth 1 point.',
      'scorerFunction': simpleScorer
   },{
      'name': 'Bonus Vowels',
      'description': 'Vowels are 3 pts, consonants are 1 pt.',
      'scorerFunction': vowelBonusScorer
   },{
      'name': 'Scrabble',
      'description': 'The traditional scoring algorithm.',
      'scorerFunction': scrabbleScorer
   }
];

function scorerPrompt() {
   let index = input.question(`Which scoring algorithm would you like to use?

0 - ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].description}
Enter 0, 1, or 2: `);
  return scoringAlgorithms[Number(index)];
}

function runProgram() {
   let word = initialPrompt();
   let score = scorerPrompt().scorerFunction(word);
   console.log(`Score for '${word}': ${score}`);
   // console.log(oldScrabbleScorer(word));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
