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



//let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];

// Dom References

let fallingQuotes = document.getElementsByClassName('fall')[0];

let fallingQuotesTwo = document.getElementsByClassName('fallTwo')[0];



document.addEventListener('DOMContentLoaded', function (e) {


    setInterval(function () {
        fallingQuotes.textContent = '';
        fallingQuotesTwo.textContent = '';
        for (var i = 0; 1 > i; i++) {

            // fallingQuotes = document.getElementById('fall')
            var newFallingQuotes = document.createElement('p');
            var newFallingQuotesTwo = document.createElement('p');
            let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
            let randomQuotesTwo = quotesTwo[Math.floor(Math.random() * quotesTwo.length)];
            newFallingQuotes.textContent = randomQuotes;
            newFallingQuotesTwo.textContent = randomQuotesTwo;
            fallingQuotes.appendChild(newFallingQuotes);
            fallingQuotesTwo.appendChild(newFallingQuotesTwo);
        }

    }, 1000)



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
