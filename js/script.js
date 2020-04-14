// PSEUDO CODE //

// A landing page with the name of the app "Moodusic" and a short description "Music to Match Your Mood" underneath the title welcome the user to the page
// User clicks on an a button or icon taking them to the main section of the page, prompting them to answer the 1st question
// As soon as user has given their answer to the question, the page will automatically scroll to the next question
// If user changes their mind about an answer, they can manually scroll back and reclick another option
// When user is finished the short questionaire, they can submit their answers by clicking on a submit button
// Javascript will process everything and display on the page, the song information and their user will be able to click on the song and hear a clip of the song that was chosen to best reflect their mood based on their result
// There will be 2 buttons for the user to choose from, they can either redo the quiz or be matched with another song 

const musicApp = {};

musicApp.getMusicResults = (query) => {
    $.ajax({
        url: `https://itunes.apple.com/search`,
        method: 'GET',
        dataType: 'json',
        data: {
            term: query,
            limit: 10,
            media: 'music',
            format: 'json',
        }
    }).then((results) => {
        console.log(results);
    })
}

musicApp.init = () => {
    musicApp.getMusicResults('happy');
}

$(function () {
    musicApp.init();
})