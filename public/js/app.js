///


let quotes =
    [
        'Never Give Yourself To The World That Never Show Itself To Your Eys',

        'The secret of life, though, is to fall seven times and to get up eight times~ Paulo Coelho',

        'The Past Is The Past Because You′re Suppose To Get Past It',
        
       

]

let quotesTwo = [

    "Knowledge is knowing that a tomato is a fruit. Wisdom is knowing not to put it in a fruit salad",
    
    "Patience is the companion of wisdom",
    
    "Where there is charity and wisdom, there is neither fear nor ignorance",

]




let quotesThree = [
    "Where there is charity and wisdom, there is neither fear nor ignorance",
    "Patience is the companion of wisdom",
    'The Past Is The Past Because You′re Suppose To Get Past It',
]


//let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];

// Dom References

let fallingQuotes = document.getElementsByClassName('fall')[0];

let fallingQuotesTwo = document.getElementsByClassName('fallTwo')[0];

let fallingQuotesThree = document.getElementsByClassName('fallThree')[0];

document.addEventListener('DOMContentLoaded', function (e) {


    setInterval(function () {
        fallingQuotes.textContent = '';
        fallingQuotesTwo.textContent = '';
        fallingQuotesThree.textContent = '';
        for (var i = 0; 1 > i; i++) {

            // fallingQuotes = document.getElementById('fall')
            var newFallingQuotes = document.createElement('p');
            var newFallingQuotesTwo = document.createElement('p');
            var newFallingQuotesThree = document.createElement('p');
            
            let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
            let randomQuotesTwo = quotesTwo[Math.floor(Math.random() * quotesTwo.length)];
            let randomQuotesThree = quotesThree[Math.floor(Math.random() * quotesThree.length)];
            
            newFallingQuotes.textContent = randomQuotes;
            newFallingQuotesTwo.textContent = randomQuotesTwo;
            newFallingQuotesThree.textContent = randomQuotesThree;

            fallingQuotes.appendChild(newFallingQuotes);
            fallingQuotesTwo.appendChild(newFallingQuotesTwo);
            fallingQuotesThree.appendChild(newFallingQuotesThree);
        }

    }, 4000)



    // let url = 'https://quotes.rest/qod/categories'

    // fetch(url,{
    //     method: 'GET',
    //     mode:  'cors'
    // })
    // .then(function(data){
    //     return data.json()
    // }).then(function(json){
    //     console.log(json)
    // })

})


function refreshPage(){
    window.location.reload();
} 

const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const defaultDropNum = 300;



class Drop {
	constructor(xPosition, yPosition, dropSpeed, dropWidth, dropHeight) {
		this.xPosition = xPosition;
		this.yPosition = yPosition;
		this.dropSpeed = dropSpeed;
		this.dropWidth = dropWidth;
		this.dropHeight = dropHeight;
		this.element;
	}

	show() {
		this.element = document.createElement("div");
		this.element.className += "rainDrop";
		this.element.style.top = this.yPosition + "px";
		this.element.style.left = this.xPosition + "px";
		this.element.style.width = this.dropWidth + "px";
		this.element.style.height = this.dropHeight + "px";

		let el = document.getElementById("drops-section");
		el.appendChild(this.element);
	}

	fall() {
		const makeItRain = () => {
			this.yPosition = this.yPosition + this.dropSpeed;
			this.element.style.top = this.yPosition +"px";

			if(this.yPosition < window.innerHeight) {
				requestAnimationFrame(makeItRain);
			} else {
				this.yPosition = -10;
				requestAnimationFrame(makeItRain);
			}

		}

		requestAnimationFrame(makeItRain);
	}
}












function makeItRain (num) {

	let elements = document.getElementById("drops-section");

	while (elements.hasChildNodes()) {
		elements.removeChild(elements.lastChild);
	}


	for (let i = 0 ; i < num ; i ++) {
		let randomX = Math.floor(Math.random() * (pageWidth));
		let randomY = Math.floor(Math.random() * (pageHeight));
		let dropSpeed = Math.floor(Math.random() * (25 - 5)) + 5;
		let dropWidth = Math.floor(Math.random() * (dropSpeed/10 - 1)) + 1;
		let dropHeight = Math.floor(Math.random() * (dropSpeed*2 - 3)) + 3;
		let d = new Drop(randomX, randomY, dropSpeed, dropWidth, dropHeight);

		d.show();
		d.fall();

	}

}

function updateNumberInView (num) {
	let el = document.getElementById("dropsNum").firstChild;
	el.nodeValue = num;
}

function changeNumDrops (num) {
	updateNumberInView(num);
	makeItRain(num);
}

updateNumberInView(defaultDropNum);
makeItRain(defaultDropNum);

