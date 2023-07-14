/*
Author: Kara Allison
Date: 7/14/2023
*/
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
// converts old scrabble point structure to new more efficient structure
 function transform(oldStruct) {
   let newStruct = {};
   // iterate over each property 
   for (item in oldStruct) {
      // iterate over the array value in property
      for (j = 0; j < oldStruct[item].length; j++) {
         // add a property (letter from array from old structure) to the new structure with value (number property from old structure)
         newStruct[oldStruct[item][j].toLowerCase()] = Number(item);
      }
   }
   return newStruct;
}

// Build new struct from transform, lowercase letter keys and number values
let newPointStructure = transform(oldPointStructure);
// Add space as valid character
newPointStructure[' '] = 0;

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function wordValidation(word) {
   if (word === ''){
      return false;
   }
   word = word.toLowerCase();
   for (i = 0; i < word.length; i++) {
      if (isFinite(newPointStructure[word[i]])) {
         continue;
      } else {
         return false;
      }
   }
   return true;
}

function indexValidation(index, start, end) {
   if (isNaN(Number(index))) {
      return false;
   }
   if (index < start || index > end) {
      return false;
   } else {
      return true;
   }

}

// prompt user for input and return input
function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let word = input.question("Enter a word to score: ");
   while (!wordValidation(word)) {
      word = input.question("Enter a valid word, only alphabetic characters and space are allowed: ")
   }
   return word;
};

// basic score by length
let simpleScorer = function(word) {
   let spaceCount = 0;
   for (i = 0; i < word.length; i++) {
      if (word[i] === ' ') {
         spaceCount++;
      }
   }
   return word.length - spaceCount;
};

// vowelbonus scoring function
let vowelBonusScorer = function(word) {
   let wordArray = word.toLowerCase().split('');
   let score = 0;
   for (i = 0; i < wordArray.length; i++) {
      //checks for vowel
      if (wordArray[i] === 'a' || wordArray[i] === 'e' || wordArray[i] === 'i' ||
      wordArray[i] === 'o' || wordArray[i] === 'u') {
         score += 3;
      } else if (wordArray[i] === ' ') {
         continue;
      } else {
         score += 1;
      }
   }
   return score;
};

// Uses newPointStructure to score, scrabble rules
let scrabbleScorer = function(word) {
   let wordArray = word.toLowerCase().split('');
   let score = 0;
   for (i = 0; i < wordArray.length; i++) {
      // use letter key to add value pair to score
      score += newPointStructure[wordArray[i]];
   }
   return score;
};

// Array to store scoring objects
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

// Prompt returns the algorithm chosen for scoring
function scorerPrompt() {
   let index = input.question(`Which scoring algorithm would you like to use?

0 - ${scoringAlgorithms[0].description}
1 - ${scoringAlgorithms[1].description}
2 - ${scoringAlgorithms[2].description}
Enter 0, 1, or 2: `);
  while (!indexValidation(index,0,2)) {
   index = input.question('Enter a valid number, 0, 1, or 2: ')
  }
  return scoringAlgorithms[Number(index)];
}
// routine called from index to run the program
function runProgram() {
   // while(true) {
   let word = initialPrompt();
   let score = scorerPrompt().scorerFunction(word);
   console.log(`Score for '${word}': ${score}`);
   // console.log(oldScrabbleScorer(word));
// }
   
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
