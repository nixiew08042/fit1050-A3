/** 
 * Searching Autocomplete Feature
*/
let availableProducts = [
	'Garden Stakes (Individual)',
	'Garden Stakes (Bundle of 5)',
	'Firepit Square',
	'Firepit Round', 
	'Firepit Octagon',
	'Custom Sign - Small',
	'Custom Sign - Medium',
	'Custom Sign - Large',
	'Word Sign',
	'Family Sign',
	'Chicken Rooster',
	'Husky',
	'Koala',
	'Kookaburra',
	'Magpie A',
	'Magpie B',
	'Magpie C',
];

const searchResult = document.querySelector(".cs-search-result");
const searchInput = document.getElementById("input-box");

searchInput.onkeyup = function(){
	let result = [];
	let input = searchInput.value;
	if (input.length){
		result = availableProducts.filter((keyword)=>{
			return keyword.toLowerCase().includes(input.toLowerCase());
		})
	}
	display(result)

	if (!result.length){
		searchResult.innerHTML = '';
	}
}

function display(result){

	const content = result.map((list)=>{
		console.log(list);
		return "<li onclick=selectInput(this)>" + list + "</li>";
	}).join('');
	searchResult.innerHTML = "<ul>" + content + "</ul>";
}

function selectInput(list){
	searchInput.value = list.innerHTML;
	searchResult.innerHTML = '';
}

/**
 * Drop down nav bar
 */
const shop = document.getElementById("shop");
const help = document.getElementById("help");
shop.onmouseenter = function(){showSubCategories(shop)};
shop.onmouseleave = function(){hideSubCategories(shop)};
help.onmouseenter = function(){showSubCategories(help)};
help.onmouseleave = function(){hideSubCategories(help)};

function showSubCategories(option) {
	const id = option.getAttribute('id');
	const dropdown = document.getElementById('sub-' + id);
	dropdown.style.display = "flex";
}

function hideSubCategories(option) {
	const id = option.getAttribute('id');
	const dropdown = document.getElementById('sub-' + id);
	dropdown.style.display = "none";
}

/**
 * Carousel
 */
const container = document.getElementById("myCarousel");

const mapRange = (inputLower, inputUpper, outputLower, outputUpper, value) => {
	const INPUT_RANGE = inputUpper - inputLower;
	const OUTPUT_RANGE = outputUpper - outputLower;
	return (
	  outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
	);
};

const options = { 
	slidesPerPage: 1,
	on: {
		'Panzoom.beforeTransform': (carousel) => {
		  carousel.slides.map((slide) => {
			const progress = carousel.getProgress(slide.index);
			const scale = mapRange(0, 1, 1, 1.2, - Math.abs(progress));
	
			slide.el.style.setProperty('--f-scale', scale);
			slide.el.style.setProperty('--f-translateX', `${progress * -10}%`);
		  });
		},
	},
};

new Carousel(container, options);
