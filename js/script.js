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

// loops and checks if each array item in moodFm.userChoices is strictly equal to every value of each options key in moodFm.questionInfo 
// when the condition is true and a match is found, calculate user score accordingly
moodFm.countUserChoices = () => {
    for (let i = 0; i < moodFm.userChoices.length; i++) {
        if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[0]) {
            moodFm.userScore += 0
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[1]) {
            moodFm.userScore += 1
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[2]) {
            moodFm.userScore += 2
        } else if (moodFm.userChoices[i] === moodFm.questionInfo[i].option[3]) {
            moodFm.userScore += 3
        }
    }
};

moodFm.setupClickOnLastQuestion = () => {
    $('button').on('click', function (e) {
        e.preventDefault();
        moodFm.countUserChoices();
        moodFm.displayUserResult();
    })
}

moodFm.setupClickHandler = () => {
    $(moodFm.questionInfo).each(function (i) {
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
    })
};

moodFm.displayUserResult = () => {
    const finalResult = `<h2>Your Score is ${totalUserScore}</h2>`;
    $(".quizResult").html(finalResult);
};

moodFm.startGame = () =>{
    $('.headerStart, .startIcon').on('click',(e)=>{
        console.log('start')
        $('html').animate({
            scrollTop:$('#questionOne').offset().top
        },800);
    })
}
moodFm.smoothScroll = (scrollTo) =>{
    $('li').on('click',(e)=>{
        e.preventDefault();
        console.log('section clicked')
        $('html').stop().animate({
            scrollTop:$(scrollTo).offset().top
        },800);
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

// ------ INIT FUNCTION ------ //
moodFm.init = () => {
    // moodFm.scrollToSection("#questionOne");
    moodFm.startGame();
    moodFm.smoothScroll('#questionTwo');
    moodFm.getMusicResults("excited");
    moodFm.setupClickOnLastQuestion();
    moodFm.setupClickHandler();
};

// ------ DOCUMENT READY ------ //
$(() => {
    moodFm.init();
    $(window).scrollTop(0);
});
