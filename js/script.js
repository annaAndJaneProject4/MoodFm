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

moodFm.totalAngry = 0;
moodFm.totalSad = 0;
moodFm.totalHappy = 0;
moodFm.totalMotivation = 0;

// user's choices will start off as an empty array
moodFm.userChoices = [];

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

moodFm.countUserChoices = () => {
    console.log(userChoices);
    for (let i = 0; i < userChoices.length; i++) {
        if (userChoices[i] === moodFm.questionInfo[i].option[0]) {
            moodFm.totalAngry;
        } else if (userChoices[i] === moodFm.questionInfo[i].option[1]) {
            moodFm.totalSad++;
        } else if (userChoices[i] === moodFm.questionInfo[i].option[2]) {
            moodFm.totalHappy++;
        } else if (userChoices[i] === moodFm.questionInfo[i].option[3]) {
            moodFm.totalMotivation++;
        }
    }
};

moodFm.setupClickOnLastQuestion = () => {
    $('button').on('click', function (e) {
        e.preventDefault();
        moodFm.countUserChoices();
    })
}

moodFm.setupClickHandler = () => {
    $(moodFm.questionInfo).each(function (i) {
        $(`${moodFm.questionInfo[i].question} a`).on('click', function (e) {
            e.preventDefault();
            const optionChosen = $(this).attr("data-value");
            userChoices[i] = optionChosen;
            if (i < moodFm.questionInfo.length - 1) {
                moodFm.scrollToSection(`${moodFm.questionInfo[i + 1].question}`);
            } else {
                moodFm.scrollToSection("#result");
            }
        })
    })
};

moodFm.displayUserResult = () => {
    const totalUserScore = moodFm.calcUserScore();
    const finalResult = `<h2>Your Score is ${totalUserScore}</h2>`;
    $(".quizResult").html(finalResult);
};

// ------ SMOOTH SCROLL FUNCTION ------ //
moodFm.scroll = (scrollTo) => {
    $('html, body').stop().animate({
        scrollTop: $(scrollTo).offset().top
    }, 800);
};

moodFm.scrollToSection = (sectionName) => {
    $(".headerStart, .startIcon, li").on("click", (e) => {
        e.preventDefault();
        moodFm.scroll(sectionName);
    });
};

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
    moodFm.scrollToSection("#questionOne");
    moodFm.getMusicResults("excited");
    moodFm.setupClickOnLastQuestion();
    moodFm.setupClickHandler();

    //DO NOT CONSOLE.LOG HERE
};

// ------ DOCUMENT READY ------ //
$(() => {
    moodFm.init();
});
