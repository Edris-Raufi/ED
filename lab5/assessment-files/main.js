// Functionality for showing/hiding the comments section
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

// Initially hide the comment section
commentWrapper.style.display = 'none';

// Update ARIA attributes based on the visibility of the comments
showHideBtn.onclick = function() {
  const isExpanded = showHideBtn.getAttribute('aria-expanded') === 'true';
  
  // Toggle the display of the comment section
  commentWrapper.style.display = isExpanded ? 'none' : 'block';
  
  // Update the button text and ARIA attributes
  showHideBtn.textContent = isExpanded ? 'Show comments' : 'Hide comments';
  showHideBtn.setAttribute('aria-expanded', !isExpanded);
};

// Functionality for adding a new comment via the comments form
const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = function(e) {
  e.preventDefault();  // Prevent the form from submitting the traditional way
  submitComment();     // Call the function to add the comment
};

function submitComment() {
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  
  // Get the values from the input fields
  const nameValue = nameField.value.trim();
  const commentValue = commentField.value.trim();

  // Only submit the comment if the name and comment fields are not empty
  if (nameValue && commentValue) {
    namePara.textContent = nameValue;
    commentPara.textContent = commentValue;

    // Append the new comment to the list
    list.appendChild(listItem);
    listItem.appendChild(namePara);
    listItem.appendChild(commentPara);

    // Clear the input fields after submission
    nameField.value = '';
    commentField.value = '';
  } else {
    // Optionally, show an error message if inputs are empty
    alert('Please fill in both fields to submit a comment.');
  }
}
