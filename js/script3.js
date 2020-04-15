// point system
// 0 - 10 points
// 8-10 -> motivation
// 5-7 -> happy
// 2-4 -> sad
// 0-1 -> angry

// ------ NAME SPACE OBJECT ------ //
const moodFm = {};

// ------ VARIABLES ------ //
moodFm.results = {
    moodSad: ['sad', 'miss', 'tear', 'lonely', 'sorry'],
    moodHappy: ['happy', 'joy', 'party', 'dance', 'excited'],
    moodAngry: ['angry', 'hate', 'rage', 'kill', 'death'],
    moodMotivation: ['strong', 'power', 'win', 'brave', 'survive']
}

let userScore = 0;

moodFm.calcUserScore = (questionNumResult, optionOne, optionTwo, optionThree, optionFour) => {
    switch (questionNumResult) {
        case optionOne:
            userScore;
            break;
        case optionTwo:
            userScore += 1;
            break;
        case optionThree:
            userScore += 2;
            break;
        case optionFour:
            userScore += 3;
            break;
    }
}

moodFm.calcScore1 = () => {
    $('#questionOne a').on('click', function(e) {
        e.preventDefault();
        const questionOneResult = $(this).attr('data-value');
        moodFm.calcUserScore(questionOneResult, 'redColor', 'greyColor', 'yellowColor', 'orangeColor');
        moodFm.scrollToSection('#questionTwo');
    })
    return userScore;
}

moodFm.calcScore2 = () => {
    $('#questionTwo a').on('click', function (e) {
        e.preventDefault();
        // console.log(userScore);
        const questionTwoResult = $(this).attr('data-value');
        moodFm.calcUserScore(questionTwoResult, 'angryFace', 'sadFace', 'happyFace', 'motivatedFace');
        moodFm.scrollToSection('#questionThree');
    })
    return userScore;
}

moodFm.calcScore3 = () => {
    $('#questionThree a').on('click', function (e) {
        e.preventDefault();
        // console.log(userScore);
        const questionThreeResult = $(this).attr('data-value');
        switch (questionThreeResult) {
            case 'cloudyWeather':
            case 'rainingWeather':
                userScore;
                break;
            case 'snowingWeather':
                userScore += 1;
                break;
            case 'sunnyWeather':
                userScore += 2;
                break;
        }
        moodFm.scrollToSection('#questionFour');
    })
    return userScore;
}

moodFm.calcScore4 = () => {
    $('#questionFour a').on('click', function (e) {
        e.preventDefault();
        // console.log(userScore);
        const questionFourResult = $(this).attr('data-value');
        moodFm.calcUserScore(questionFourResult, 'nothingFood', 'comfortFood', 'iceCreamFood', 'saladFood');    
        moodFm.scrollToSection('#result');
        moodFm.displayUserScore();
    })
    return userScore;
}

moodFm.displayUserScore = () => {
    const totalUserScore = moodFm.calcScore4();
    const moodResult = `<h2>Your Score is ${totalUserScore}</h2>`
    $('.quizResult').html(moodResult);
}

// ------ SMOOTH SCROLL FUNCTION ------ //
moodFm.scroll = (scrollTo) => {
    $('html, body').stop().animate({
        scrollTop: $(scrollTo).offset().top
    }, 800);
};

moodFm.scrollToSection = (sectionName) => {
    $('.headerStart, .startIcon, li').on('click', function (e) {
        e.preventDefault();
        moodFm.scroll(sectionName);
    });
};

// ------ AJAX CALL ------ //
moodFm.getMusicResults = (query) => {
    $.ajax({
        url: `https://itunes.apple.com/search`,
        method: 'GET',
        dataType: 'json',
        data: {
            term: query,
            limit: 10,
            media: 'music',
            attribute: 'songTerm',
            format: 'json',
        }
    }).then((results) => {
        console.log(results);
    })
}

// ------ INIT FUNCTION ------ //
moodFm.init = () => {
    moodFm.scrollToSection('#questionOne');
    moodFm.getMusicResults('excited');
    moodFm.calcScore1();
    moodFm.calcScore2();
    moodFm.calcScore3();
    moodFm.calcScore4();
}

// ------ DOCUMENT READY ------ //
$(() => {
    moodFm.init();
})