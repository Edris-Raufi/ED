// 1. Access DOM elements and store them in variables
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

// 2. Function to return a random value from an array
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

// 3. Raw text strings and arrays of insert values
let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland", "the White House"];
let insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

// 4. Event listener and partial function definition
randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  // Replace placeholders with random items from the arrays
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // Replace placeholders in the newStory string
  newStory = newStory.replace(":insertx:", xItem)
                     .replace(":inserty:", yItem)
                     .replace(":insertz:", zItem);

  // Check if custom name is entered and replace "Bob" with the custom name
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  // If UK radio button is checked, convert units
  if (document.getElementById("uk").checked) {
    // Convert 300 pounds to stones (1 stone = 14 pounds)
    const weight = Math.round(300 / 14) + ' stone';

    // Convert 94 fahrenheit to centigrade (C = (F - 32) * 5/9)
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';

    // Replace the US units with UK equivalents
    newStory = newStory.replace("94 fahrenheit", temperature)
                       .replace("300 pounds", weight);
  }

  // Update the story text with the generated story
  story.textContent = newStory;

  // Make sure the story is visible
  story.style.visibility = 'visible';
}
