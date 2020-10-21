/*
 * Credits to pomdre who created a custom FAQ drop down
 * This is a modified version of pomdre's FAQ implementation
*/


// Get list of elements which have class "faq" and iterate through this list
const acc = document.getElementsByClassName("faq");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Toggle on class to toggle between '+' and '-' sign
    this.classList.toggle("on");

    // Get the answer-div by selecting the next element node 
    const panel = this.nextElementSibling;
    // Toggle answer-visible class to make answer visible or hide it
    panel.classList.toggle("answer-visible");
  });
}
