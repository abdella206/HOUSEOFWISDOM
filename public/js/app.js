///


let quotes =
    ['Never Give Yourself To The World That Never Show Itself To Your Eys~',

        'The secret of life, though, is to fall seven times and to get up eight times~ Paulo Coelho',

        'The Past Is The Past Because You′re Suppose To Get Past It~']



//let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];

// Dom References

let fallingQuotes = document.getElementsByClassName('fall')[0];



document.addEventListener('DOMContentLoaded', function (e) {


    setInterval(function () {
        fallingQuotes.textContent = '';
        for (var i = 0; quotes.length > i; i++) {

            // fallingQuotes = document.getElementById('fall')
            var newFallingQuotes = document.createElement('p');
            let randomQuotes = quotes[Math.floor(Math.random() * quotes.length)];
            newFallingQuotes.textContent = randomQuotes;
            fallingQuotes.appendChild(newFallingQuotes);
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
