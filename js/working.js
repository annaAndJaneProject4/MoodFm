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
  moodSad: ["sad", "miss", "cry", "lonely", "sorry"],
  moodHappy: ["happy", "joy", "party", "dance", "excited"],
  moodAngry: ["angry", "hate", "rage", "kill", "death"],
  moodMotivation: ["strong", "power", "confident", "brave", "survive"],
};

// initial starting value before any clicks are made by the user
moodFm.userScore = 0;

// user's choices will start off as an empty array
moodFm.userChoices = [];

// User's mood result base on their score
moodFm.userMood;
// Random key word selected from the mood array inside moodFm.results object
moodFm.songKeywordIndex;
moodFm.songKeyword;
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
    option: [
      "rainingWeather",
      "thunderWeather",
      "snowingWeather",
      "sunnyWeather",
    ],
  },
  {
    question: "#questionFour",
    option: ["nothingFood", "comfortFood", "iceCreamFood", "healthyFood"],
  },
];

moodFm.startQuiz = () => {
  $(".headerStart, .startIcon").on("click", (e) => {
    // console.log('start')
    $("html").animate(
      {
        scrollTop: $("#questionOne").offset().top,
      },
      800
    );
  });
};
moodFm.smoothScroll = (scrollTo) => {
  $("li").on("click", (e) => {
    e.preventDefault();
    $("html")
      .stop()
      .animate(
        {
          scrollTop: $(scrollTo).offset().top,
        },
        800
      );
  });
};

moodFm.getUserChoiceAndGoToNext = () => {
  $(moodFm.questionInfo).each(function (i) {
    $(`${moodFm.questionInfo[i].question} a`).on("click", function (e) {
      e.preventDefault();
      const optionChosen = $(this).attr("data-value");
      moodFm.userChoices[i] = optionChosen;
      if (i < moodFm.questionInfo.length - 1) {
        moodFm.smoothScroll(`${moodFm.questionInfo[i + 1].question}`);
      } else {
        moodFm.smoothScroll("#result");
      }
    });
  });
};

//function that checks whether moodFm.userChoice has any array items that are undefined or not equal in length to 4
moodFm.checkForAllArrayItems = function () {
  for (let i = 0; i < moodFm.userChoices.length; i++) {
    if (
      moodFm.userChoices[i] === undefined ||
      moodFm.userChoices.length !== 4
    ) {
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
//after user score is calculated, reference back to moodFm.results object and match the user score with a mood array
moodFm.calcUserMood = function () {
  if (moodFm.userScore <= 3) {
    moodFm.userMood = moodFm.results.moodAngry;
    return moodFm.userMood;
    // console.log(moodFm.userMood)
    // return `Uh-oh, someone's in a bad mood today! Your score is ${moodFm.userScore}`;
  } else if (moodFm.userScore >= 4 && moodFm.userScore <= 6) {
    moodFm.userMood = moodFm.results.moodSad;
    return moodFm.userMood;
    // console.log(moodFm.userMood)
    // return `Why the long face? Your score is ${moodFm.userScore}`;
  } else if (moodFm.userScore >= 7 && moodFm.userScore <= 9) {
    moodFm.userMood = moodFm.results.moodHappy;
    return moodFm.userMood;
    // console.log(moodFm.userMood)
    // return `Someone's cheerful today! Your score is ${moodFm.userScore}`;
  } else if (moodFm.userScore >= 10 && moodFm.userScore <= 12) {
    moodFm.userMood = moodFm.results.moodMotivation;
    return moodFm.userMood;
    // console.log(moodFm.userMood)
    // return `Nothing's gonna stop you today! You're ready to conquer the word! Your score is ${moodFm.userScore}`;
  }
};
//create a randomizer method
moodFm.randomize = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

//from there, create a function (using math.random()) that will randomly select ONE of the items from the array
moodFm.getRandomSongKeyword = () => {
  moodFm.calcUserMood();
  moodFm.songKeyword = moodFm.randomize(moodFm.userMood);
  // moodFm.songKeywordIndex = Math.floor(Math.random() * (moodFm.userMood.length));
  // moodFm.songKeyword = moodFm.userMood [moodFm.songKeywordIndex];
  console.log(moodFm.songKeyword);
  // console.log(moodFm.songKeywordIndex);
};

moodFm.isQuizComplete = function () {
  const isComplete = moodFm.checkForAllArrayItems();
  if (isComplete) {
    moodFm.calcUserScore();
    moodFm.getRandomSongKeyword();
    moodFm.getMusicResults(moodFm.songKeyword);
    // moodFm.displaySong();
    //resets score to 0 when the quiz is over
    moodFm.userScore = 0;
  } else {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Please go back and complete the quiz before you submit!",
    });
  }
};

moodFm.submitUserChoices = () => {
  $("button").on("click", function (e) {
    e.preventDefault();
    moodFm.isQuizComplete();
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
      limit: 15,
      media: "music",
      attribute: "songTerm",
      format: "json",
    },
  }).then((results) => {
    // console.log(results);
    moodFm.getRandomSongInfo(results);
    moodFm.displaySong();
  });
};

moodFm.getRandomSongInfo = function (resultsObject) {
  moodFm.resultsArray = resultsObject.results;
  console.log(moodFm.resultsArray);

  moodFm.randomSong = moodFm.randomize(moodFm.resultsArray);
  console.log(moodFm.randomSong);
};

moodFm.displaySong = function () {
  const html = `<div class="displaySong">
                            <h4><span>Your Musical Mood:</span><h4>
                            <img src="./assets/displayResults.svg" aria-label="play or pause to hear this audio clip" aria-pressed="false" class="displaySongImg" alt="cartoon of a woman happily dancing next to a giant mp3 player" role="button">
                            <div class="songDetails">
                                <p class="songTitle">${moodFm.randomSong.trackName}</p>
                                <p class="artistName">${moodFm.randomSong.artistName}</p>
                                <audio src="${moodFm.randomSong.previewUrl}" preload="auto" type="audio/mpeg"></audio>
                            </div>
                            <img src="./assets/playIcon.svg" class="playIconImg" alt="play button icon">
                        </div>
                        `;
  $(".quizResultContainer").html(html);
  moodFm.$btnAudio = $(".playIconImg");
  moodFm.$sampleAudio = $("audio");
  moodFm.playOrPauseSong();
};

moodFm.playOrPauseSong = function () {
  moodFm.$btnAudio.on("click", function () {
    if (moodFm.$sampleAudio[0].paused) {
      moodFm.$sampleAudio[0].play();
    } else {
      moodFm.$sampleAudio[0].pause();
    }
  });
};

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
  moodFm.smoothScroll("#questionTwo");
  // moodFm.getMusicResults(moodFm.songKeyword);
  moodFm.getUserChoiceAndGoToNext();
  moodFm.submitUserChoices();
};

// ------ DOCUMENT READY ------ //
$(() => {
  moodFm.init();
  $(window).scrollTop(0);
});

