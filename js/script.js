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
    moodHappy: ['happy', 'joy', 'sweet', 'party', 'dance', 'excited'],
    moodAngry: ['angry', 'hate', 'rage', 'kill', 'death'],
    moodMotivation: ['strong', 'power', 'win', 'brave', 'survive']
}

let userScore = 0;

moodFm.calcScore1 = () => {
    $('#questionOne a').on('click', function(e) {
        e.preventDefault();
        const questionOneResult = $(this).attr("data-value");
        if (questionOneResult === 'redColor') {
            userScore = 0;
        } else if (questionOneResult === 'greyColor') {
            userScore += 1;
        } else if (questionOneResult === 'yellowColor') {
            userScore += 2;
        } else if (questionOneResult === 'orangeColor') {
            userScore += 3;
        }
        moodFm.scrollToSection('#questionTwo');
    })
    return userScore;
}

moodFm.calcScore2 = () => {
    $('#questionTwo a').on('click', function (e) {
        e.preventDefault();
        console.log(userScore);
        const questionTwoResult = $(this).attr("data-value");
        if (questionTwoResult === 'angryFace') {
            userScore += 0;
        } else if (questionTwoResult === 'sadFace') {
            userScore += 1;
        } else if (questionTwoResult === 'happyFace') {
            userScore += 2;
        } else if (questionTwoResult === 'motivationFace') {
            userScore += 3;
        }
        moodFm.scrollToSection('#questionThree');
    })
    return userScore;
}

moodFm.calcScore3 = () => {
    $('#questionThree a').on('click', function (e) {
        e.preventDefault();
        console.log(userScore);
        const questionThreeResult = $(this).attr("data-value");
        if (questionThreeResult === 'cloudyWeather' || questionThreeResult === 'rainingWeather') {
            userScore += 0;
        } else if (questionThreeResult === 'snowingWeather') {
            userScore += 1;
        } else if (questionThreeResult === 'sunnyWeather') {
            userScore += 2;
        }
        moodFm.scrollToSection('#questionFour');
    })
    return userScore
}

moodFm.calcScore4 = () => {
    $('#questionFour a').on('click', function (e) {
        e.preventDefault();
        console.log(userScore);
        const questionFourResult = $(this).attr("data-value");
        if (questionFourResult === 'nothingFood') {
            userScore += 0;
        } else if (questionFourResult === 'comfortFood') {
            userScore += 1;
        } else if (questionFourResult === 'iceCreamFood') {
            userScore += 2;
        } else if (questionFourResult === 'saladFood') {
            userScore += 3;
        }
        moodFm.scrollToSection('#result');
    })
    return userScore
}

// ------ SMOOTH SCROLL FUNCTION ------ //
moodFm.scroll = (scrollTo) => {
    $('html, body').stop().animate({
        scrollTop: $(scrollTo).offset().top
    }, 800);
};

moodFm.scrollToSection = (sectionName) => {
    $('.headerStart, .startIcon, section').on('click', function (e) {
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
    moodFm.scrollToSection('main');
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