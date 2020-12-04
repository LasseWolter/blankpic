// Idea taken from https://muffinman.io/javascript-get-element-offset/ 
function getTotalTopOffset(el) {
  let top = 0;
  let element = el;

  // Loop through the DOM tree
  // and add it's parent's offset to get page offset
  do {
    top += element.offsetTop || 0;
    element = element.offsetParent;
  } while (element);

  return top;
}

// Lets you scroll to the part of the page where element with this id is located
// Took some ideas from new-age.js boostrap theme
function scrollToId(idString) {
    const correction = -56; // height of the navbar in this case
    let element= document.querySelector('#' + idString);
    let offset = getTotalTopOffset(element) + correction;
    $('html, body').animate({
        scrollTop: offset 
    }, 1000, "easeInOutExpo");
}

// Scroll behaviour of navbar - requirement for the following code to work
//      - navlinks have an id of: "nav-" + sectionName 
//      - sections themselve have an id of: "sec-" + sectionName
sectionNames = ['reasons', 'facts', 'faq', 'download', 'contact'];
for (let sec of sectionNames) {
    let element = document.getElementById('nav-' + sec);
    console.log(sec);
    element.onclick = scrollToId.bind(this, 'sec-' + sec);
}
