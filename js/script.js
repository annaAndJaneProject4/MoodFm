// -------- NAME SPACE OBJECT -------- //

// where all functions (methods) and variables (properties) will be stored
const moodFm = {};

// -------- VARIABLES/PROPERTIES THAT LIVE ON THE NAME SPACE OBJECT -------- //

// ---- variables/properties that will not change/update ---- //

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
    option: ["thunderWeather", "rainingWeather", "snowingWeather", "sunnyWeather"],
  },
  {
    question: "#questionFour",
    option: ["nothingFood", "comfortFood", "iceCreamFood", "healthyFood"],
  },
];

// object of nested arrays where the variable moodFm.userMood will later get assigned one of these properties
// moodFm.songKeyword will also take its value from one of the items in one of the nested arrays
moodFm.results = {
  moodSad: ["sad", "sorrow", "cry", "lonely", "sorry"],
  moodHappy: ["happy", "joy", "party", "dance", "excited"],
  moodAngry: ["angry", "hate", "rage", "kill", "death"],
  moodMotivation: ["strong", "power", "confident", "brave", "survive"],
};

// ---- variables/properties that will update/change depending on user input ---- //

// the choices that the user selects from each question will later be stored in this array
// before the user has answered any questions, the array will start off as empty 
moodFm.userChoices = [];

// user's initial score before any questions are answered
// score will increment depending on which options the user selects as their answer
moodFm.userScore = 0;

// the value of this variable will be calculated depending on what the value of moodFm.userScore is
moodFm.userMood;

// random keyword to be selected from one of the nested arrays inside the moodFm.results object
moodFm.songKeyword;

// -------- FUNCTIONS -------- //

// function that control the automatic scrolling of one section to the next on click
moodFm.smoothScroll = (scrollTo, element) => {
  $(element).on("click", (e) => {
    e.preventDefault();
    $("html, body").stop().animate({
          scrollTop: $(scrollTo).offset().top,
        }, 650);
  });
};

// function that listens for a click on each anchor element, stores that value into the moodFm.userChoice array and then triggers the page to scroll to the next section
moodFm.getUserChoiceAndGoToNext = () => {
  $(moodFm.questionInfo).each((i) => {
    $(`${moodFm.questionInfo[i].question} a`).on("click", function (e) {
      e.preventDefault();
      // on click, the corresponding value is extracted from the "data-value" attribute and stored in a variable
      const optionChosen = $(this).attr("data-value");
      // the value from optionChosen (whatever option that the user clicks on) will be stored at a specific index in the moodFm.userChoices array 
      moodFm.userChoices[i] = optionChosen;
      // shows user which option they have clicked on
      $(`${moodFm.questionInfo[i].question} a`).removeClass('selected');
      $(this).addClass('selected');
      // if there are more questions for the user to answer, proceeds to take them to the next question
      // otherwise if there are no more questions left, takes user to the result section to see their result
      if (i < moodFm.questionInfo.length - 1) {
        moodFm.smoothScroll(`${moodFm.questionInfo[i + 1].question}`, "li");
      } else {
        moodFm.smoothScroll("#result", "li");
      }
    });
  });
};

// function that checks whether the user has answered all 4 questions by checking if moodFm.userChoice has a length of 4
moodFm.checkForAllArrayItems = () => {
  if (moodFm.userChoices.length !== 4) {
    return false;
  }
  // loop through userChoices to check if they skipped any questions
  for (let i = 0; i < moodFm.userChoices.length; i++) {
    if (moodFm.userChoices[i] === undefined) {
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

// after user score is calculated from moodFm.CalcUserScore, refer back to moodFm.results object and match the user score with one of the mood arrays nested within the object
moodFm.calcUserMood = () => {
  if (moodFm.userScore <= 3) {
      return moodFm.userMood = moodFm.results.moodAngry;
  } else if (moodFm.userScore >= 4 && moodFm.userScore <= 6) {
      return moodFm.userMood = moodFm.results.moodSad;
  } else if (moodFm.userScore >= 7 && moodFm.userScore <= 9) {
      return moodFm.userMood = moodFm.results.moodHappy;
  } else if (moodFm.userScore >= 10 && moodFm.userScore <= 12) {
      return moodFm.userMood = moodFm.results.moodMotivation;
  }
};

// function that takes in any array and returns a random array item based on what the length of the array is 
moodFm.getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// function that calls moodFm.calcUserMood and once the user is matched with one of the mood arrays nested within the moodFm.results object
  // then that array is passed through to moodFm.getRandomArrayItem and it will randomly generate ONE item from that array and then store it in moodFm.songKeyword
moodFm.getRandomSongKeyword = () => {
  moodFm.calcUserMood();
  moodFm.songKeyword = moodFm.getRandomArrayItem(moodFm.userMood);
};

// function that checks whether the user has completed the quiz 
moodFm.isQuizComplete = () => {
  const isComplete = moodFm.checkForAllArrayItems();
  if (isComplete) {
    // if complete, the user's score is calculated, the user will be assigned a random song keyword based off of their results and then the ajax call is made
    moodFm.calcUserScore();
    moodFm.getRandomSongKeyword();
    // the ajax call will take in the random song keyword assigned to the user as an argument 
    moodFm.getMusicResults(moodFm.songKeyword);
    // resets score to 0 when the quiz is over
    moodFm.userScore = 0;
    // reset user input array to empty when the quiz is over
    moodFm.userChoices = [];
  } else {
    // if not complete, an alert is fired informing the user go finish the rest of the quiz first
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Please go back and complete the quiz before you submit!",
    });
  }
};

// when user clicks on the large submit button at the end of the section, moodFm.isQuizComplete is called and checks for quiz completion in order to decide whether or not the user will be given their results
moodFm.submitUserChoices = () => {
  $(".btnLarge").on("click", () => {
    moodFm.isQuizComplete();
  });
};

// -------- AJAX CALL -------- //

// this ajax call is only made when the quiz is completed/the condition on line 148 evaluates to true
// the variable (moodFm.songKeyword) that stores the randomly generated keyword for the user is passed in as an argument when this functon gets called on line 153
// it will use the value from moodFm.songKeyword and look through the iTunes' API for a song title containing that specfic keyword
moodFm.getMusicResults = (query) => {
  $.ajax({
    url: `https://itunes.apple.com/search`,
    method: "GET",
    dataType: "jsonp",
    data: {
      term: query,
      limit: 20,
      media: "music",
      entity: "song",
      attribute: "songTerm",
      format: "json",
    },
  }).then((results) => {
    // then once this ajax call is successful, the data that is retrieved is passed into moodFm.getRandomSongInfo 
    moodFm.getRandomSongInfo(results);
    // and the song will be displayed on the page 
    moodFm.displaySong();
  });
};

moodFm.getRandomSongInfo = (resultsObject) => {
  // the data/result retrieved from the ajax call will be passed in as an argument and then narrowed down in order to select only the array contained within the JSON
  // this array nested within the JSON is then stored in its own variable
  moodFm.resultsArray = resultsObject.results;

  // moodFm.resultsArray contains 20 objects as its array items 
  // the array is then passed into the getRandomArrayItem function and only ONE array item will be randomly selected out of the 20 potential items
    // this then gets stored into its own variable
  moodFm.randomSong = moodFm.getRandomArrayItem(moodFm.resultsArray);
};

// function that displays a random song title and it's corresponding artist name, artist/song url page and audio file onto the page 
// the user is also able to listen to the audio, get another audio or retake the quiz when the songHTML is displayed to the element with a class of ".quizResultContainer"
moodFm.displaySong = () => {
  const songHtml = `<div class="displaySong">
                            <h4>Your Musical Mood:<h4>
                            <div class="songDetails">
                                <p class="songTitle"><a href="${moodFm.randomSong.trackViewUrl}">${moodFm.randomSong.trackName}</a></p>
                                <p class="artistName"><a href="${moodFm.randomSong.artistViewUrl}">${moodFm.randomSong.artistName}</a></p>
                                <audio src="${moodFm.randomSong.previewUrl}" preload="auto" type="audio/mpeg"></audio>
                                
                                <img src="./assets/resultImage.png" class="displaySongImg" alt="cartoon of one man and two women, all wearing business attire while standing on top of two large musical notes as the man is holding baloons">
    
                                <button class="btn btnSmall btnNext">Next Song</button>
                                <button class="btn btnSmall btnPlay">Click to Listen</button>
                                <button class="btn btnSmall btnRetake">Retake the Quiz</button>
                            </div>
                        </div>
                        `;
  $(".quizResultContainer").html(songHtml);
  moodFm.$btnPlayAudio = $(".btnPlay");
  moodFm.$btnAnotherSong = $(".btnNext");
  moodFm.$sampleAudio = $("audio");
  moodFm.playOrPauseSong();
  moodFm.getNextRandomSong();
  moodFm.retakeQuiz();
};

// function that listens for a click on the play button and toggles the audio on and off depending on whether the audio is paused or not
moodFm.playOrPauseSong = () => {
  moodFm.$btnPlayAudio.on("click", () => {
    if (moodFm.$sampleAudio[0].paused) {
      moodFm.$sampleAudio[0].play();
    } else {
      moodFm.$sampleAudio[0].pause();
    }
  });
};

// the array is passed into the getRandomArrayItem function again and another single array item will be randomly selected out of the 20 potential items
// the variable then gets updated again with a different array of song information
moodFm.getNextRandomSong = () => {
  moodFm.randomSong = moodFm.getRandomArrayItem(moodFm.resultsArray);
  // when the user clicks on the next song button, the new song is now displayed to the page 
    moodFm.$btnAnotherSong.on("click", () => {
        moodFm.displaySong();
    })
}

// function that allows user to retake the quiz by reloading the page and bringing the user back to the top of the html/body
moodFm.retakeQuiz = () => {
    moodFm.$btnRetake = $(".btnRetake")
    moodFm.$btnRetake.on("click", () => {
        location.reload();
        $("html, body").scrollTop(0);
    })
}

// -------- INIT FUNCTION -------- //
moodFm.init = () => {
  moodFm.smoothScroll("#questionOne", ".headerStart, .startIcon");
  moodFm.getUserChoiceAndGoToNext();
  moodFm.submitUserChoices();
};

// -------- DOCUMENT READY -------- //
$(() => {
  moodFm.init();
  // When user hard refresh the page, home page will always be displayed
  $(window).scrollTop(0);
});
