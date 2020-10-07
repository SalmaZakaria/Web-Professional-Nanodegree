/*

Create the global variables we need in the page

*/

const NavBar = document.getElementById('navLinks');
const sections = document.getElementsByTagName('section');


//Building Navigation

const NavigationBuilder = () => {

	let NavUI = " ";
	for(section of sections){
		const sectionID = section.id;
		const sectionDataNav = section.dataset.nav;

		NavUI += `<li><a class="menu_link" href = "#${sectionID}">${sectionDataNav}</a></li>`;
	}	
	NavBar.innerHTML = NavUI;
};

NavigationBuilder();


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
		const ElementSize = Math.floor(section.getBoundingClientRect().top);

        inviewport = () => ElementSize < 100 && ElementSize >= -100;

        removeActiveSection(section);
        addActiveSection(inviewport(),section);
	}	   
};

document.addEventListener('scroll' , isActive);
