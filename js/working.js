// point system
// 1 - 12 points
// 10-12 -> motivation
// 7-9 -> happy
// 4-6 -> sad
// 0-3 -> angry

// ------ NAME SPACE OBJECT ------ //
const moodFm = {};

// ------ VARIABLES/PROPERTIES THAT LIVE ON THE NAME SPACE OBJECT ------ //
moodFm.results = {
    moodSad: ["sad", "miss", "tear", "lonely", "sorry"],
    moodHappy: ["happy", "joy", "party", "dance", "excited"],
    moodAngry: ["angry", "hate", "rage", "kill", "death"],
    moodMotivation: ["strong", "power", "win", "brave", "survive"],
};

// initial starting value before any clicks are made by the user
moodFm.userScore = 0;

// user's choices will start off as an empty array
moodFm.userChoices = []

// array of nested objects which store the question number and an array of possible options for each question
moodFm.questionInfo = [
    {
        question: "#questionOne",
        option: ["redColor", "greyColor", "yellowColor", "orangeColor"],
    },
    {
        question: "#questionTwo",
        option: ["angryFace", "sadFace", "happyFace", "motivatedFace"],
    },
    {
        question: "#questionThree",
        option: ["rainingWeather", "cloudyWeather", "snowingWeather", "sunnyWeather"],
    },
    {
        question: "#questionFour",
        option: ["nothingFood", "comfortFood", "iceCreamFood", "saladFood"],
    },
];

moodFm.startQuiz = () => {
    $('.headerStart, .startIcon').on('click', (e) => {
        console.log('start')
        $('html').animate({
            scrollTop: $('#questionOne').offset().top
        }, 800);
    })
}
moodFm.smoothScroll = (scrollTo) => {
    $('li').on('click', (e) => {
        e.preventDefault();
        $('html').stop().animate({
            scrollTop: $(scrollTo).offset().top
        }, 800);
    })
}

moodFm.getUserChoiceAndGoToNext = () => {
    for (let i = 0; i < moodFm.questionInfo.length; i++) {
        $(`${moodFm.questionInfo[i].question} a`).on('click', function (e) {
            e.preventDefault();
            const optionChosen = $(this).attr("data-value");
            moodFm.userChoices[i] = optionChosen;
            if (i < moodFm.questionInfo.length - 1) {
                moodFm.smoothScroll(`${moodFm.questionInfo[i + 1].question}`);
            } else {
                moodFm.smoothScroll("#result");
            }
        })
    }
};

//function that checks whether moodFm.userChoice has any array items that are undefined or not equal in length to 4
moodFm.checkForAllArrayItems = function () {
    for (let i = 0; i < moodFm.userChoices.length; i++) {
        if (moodFm.userChoices[i] === undefined || moodFm.userChoices.length !== 4) {
            return false;
        }
    }
    return true;
};

// loops and checks if each array item in moodFm.userChoices is strictly equal to every value of each options key in moodFm.questionInfo 
// when the condition is true and a match is found, increment user score accordingly
moodFm.calcUserScore = () => {
    for (let i = 0; i < moodFm.userChoices.length; i++) {
        if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[0]) {
            moodFm.userScore;
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[1]) {
            moodFm.userScore += 1;
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[2]) {
            moodFm.userScore += 2;
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[3]) {
            moodFm.userScore += 3;
        }
    }
};

moodFm.calcUserMood = function () {
    if (moodFm.userScore <= 3) {
        return `Uh-oh, someone's in a bad mood today! Your score is ${moodFm.userScore}`;
    } else if (moodFm.userScore >= 4 && moodFm.userScore <= 6) {
        return `Why the long face? Your score is ${moodFm.userScore}`;
    } else if (moodFm.userScore >= 7 && moodFm.userScore <= 9) {
        return `Someone's cheerful today! Your score is ${moodFm.userScore}`;
    } else if (moodFm.userScore >= 10 && moodFm.userScore <= 12) {
        return `Nothing's gonna stop you today! You're ready to conquer the word! Your score is ${moodFm.userScore}`;
    }
}

moodFm.displayUserResult = () => {
    const moodResult = moodFm.calcUserMood();
    $(".quizResult").html(`<h2>${moodResult}</h2>`);
};

moodFm.isQuizComplete = function () {
    const isComplete = moodFm.checkForAllArrayItems();
    if (isComplete) {
        moodFm.calcUserScore();
        moodFm.displayUserResult();
        //resets score to 0 when the quiz is over
        moodFm.userScore = 0;
    } else {
        Swal.fire({
            icon: "error",
            title: 'Error!',
            text: 'Please go back and complete the quiz before you submit!',
        });
    }
}

moodFm.submitUserChoices = () => {
    $('button').on('click', function (e) {
        e.preventDefault();
        moodFm.isQuizComplete();
    })
}

// ------ AJAX CALL ------ //
moodFm.getMusicResults = (query) => {
    $.ajax({
        url: `https://itunes.apple.com/search`,
        method: "GET",
        dataType: "json",
        data: {
            term: query,
            limit: 10,
            media: "music",
            attribute: "songTerm",
            format: "json",
        },
    }).then((results) => {
        console.log(results);
    });
};

//after user gets their score, reference back to moodFm.results object and match the user score with a mood array
//from there, create a function (using math.random()) that will randomly select ONE of the items from the array
//once a keyword from the array is selected, pass the keyword into the moodFm.getMusicResults parameter and once the ajax
    //call is made, 

//properties we need from the results object
    //results.artistName  ->name of artist
    //results.trackName   ->name of song
    //results.previewURL  ->audio file

    //results.artistViewUrl ->official itunes artist page
    //results.trackViewUrl ->official itunes song page

    //results.artworkUrl100 ->album cover

// ------ INIT FUNCTION ------ //
moodFm.init = () => {
    moodFm.startQuiz();
    moodFm.smoothScroll('#questionTwo');
    moodFm.getMusicResults("happy");
    moodFm.getUserChoiceAndGoToNext();
    moodFm.submitUserChoices();
};

// ------ DOCUMENT READY ------ //
$(() => {
    moodFm.init();
    $(window).scrollTop(0);
});
