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
    element.onclick = scrollToId.bind(this, 'sec-' + sec);
}


// Updates background color according to navbar collapse
// This is necessary bc langpick-div background has an alpha value not equal to 0
// and thus, it looks weird if the div overlaps with the collapse navbar
function toggleLangpickColor() {
    let pickerDiv = document.querySelector('.lang-extension-mobile');
    pickerDiv.classList.toggle('transparent-bg');
}

// Switch language while staying on current page and position
// For this to work the link needs to have the attributes 'target_lang' and 
// 'current_lang' set to the correct locales(e.g. 'de' or 'en')
let lang_links = document.querySelectorAll('a.langswitch');
for (let link of lang_links) {
    link.onclick = function() {
        // Save current yScrollingPosition
        localStorage.setItem('scrollY', window.scrollY);
        
        let targetLang = link.getAttribute("target_lang").toLowerCase();
        let curLang = link.getAttribute("current_lang").toLowerCase();
        // Get the current page minus the locale part at the beginning
        let newPath = window.location.pathname.replace(curLang,targetLang);
        // Redirect to sama page in different language
        window.location.pathname=newPath;
    }
} 

// Recover y-position on page after reload 
window.addEventListener('load', () => {
    // Don't try to recover position if the url contains an anchor
    if (window.location.href.includes('#')) {
        return;
    }
    let scrollY = localStorage.getItem('scrollY') || 0;
    // Reset value to avoid auto-scrolling if it's not wanted
    // e.g. when the user switches to the impressum page
    localStorage.setItem('scrollY', 0);
    window.scrollTo(0, scrollY);
});

