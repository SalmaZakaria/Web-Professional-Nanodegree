/*

Create the global variables we need in the page

*/

const NavBar = document.getElementById('navLinks');
const sections = document.querySelectorAll('section');


//Building Navigation

const NavigationBuilder = () => {

	let NavUI = '';
	for(section of sections){
		const sectionID = section.id;
		const sectionDataNav = section.dataset.nav;

		NavUI += `<li><a class="menu_link" href = "#${sectionID}">${sectionDataNav}</a></li>`;
	}	
	NavBar.innerHTML = NavUI;
};

NavigationBuilder();


//return the biggest value that's less or equal to the number 
const ElementSize = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// remove the active section
const removeActiveSection = (section) => {
    section.classList.remove('active_class');
    section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};
// adding the active section
const addActiveSection = (conditional, section) => {
    if(conditional){
        section.classList.add('active_class');
        section.style.cssText = "background-color: #05BCF4;";
    };
};

//Function to see whether removing or adding a section

const isActive = () => {

	for(section of sections){
		const elementOffset = ElementSize(section);

        inviewport = () => elementOffset < 150 && elementOffset >= -150;

        removeActiveSection(section);
        addActiveSection(inviewport(),section);
	}	   
};

window.addEventListener('scroll' , isActive);


//Scrolling 

const Scrolling = (link) => {
	 for(i = 0 ; i<sections ; i++){
                sections[i].addEventListener("click",sectionScroll(link));
     }
};

const Scroll = () => {
	const links = document.querySelectorAll('.NavBar a');
	for (link of links) {
		link.addEventListener('click', Scrolling(link));
	}
};

Scroll();