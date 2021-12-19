'use strict'


var gChars = [];
var gSoundChars = [];
var gCellLength = 5;
var gCharToClick;
var gAudio = new Audio();
var gPopAudio = new Audio(`https://yairweiss1.github.io/ABC-Game/sound/pop.mp3`);
var gTimeInterval;
var gCountTime;
var gIsGameStart;
var gIndex = 0;

function initGame(isLowercase) {
    var chars = [ 'A', 'B', 'C',  'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
                'Y', 'Z' ];
  
    gCountTime = 0;
    gIndex = 0;
    gCharToClick = '*';
    gIsGameStart = false;
    clearInterval(gTimeInterval)
    gChars = shuffle(chars);
    gSoundChars = shuffle(chars);
    renderBoard(gChars, isLowercase);
    gCharToClick = gSoundChars[gIndex];
    gAudio.src = `https://yairweiss1.github.io/ABC-Game/sound/${gCharToClick}.m4a`;
    gAudio.play();
    gTimeInterval = setInterval(startGameTime, 1000);
    gIsGameStart = true;
    document.querySelector('.win-placeholder').classList.remove('win');
}

function renderBoard(chars, isLowercase) {
    var strHTML = ''
    var boardLength = gCellLength;
    var cellCount = 0;
    for (var i = 0; i < boardLength; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < boardLength; j++) {
            strHTML += `<td class="cell" onclick="cellClicked(this)" ${isLowercase? 'style="text-transform: lowercase;"' :''}>`;
            strHTML += chars[cellCount];
            strHTML += '</td>';
            cellCount++;
        }
        strHTML += '</tr>';
    }

    strHTML += `
    <tr>
        <td style="transform: translateX(208%); ${isLowercase? 'text-transform: lowercase;' :''}" class="cell" onclick="cellClicked(this)">
        ${chars[cellCount]}
        </td>
    </tr>`;

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elClickedNum) {
    var currChar = elClickedNum.innerText;
    if (currChar.toUpperCase() === gCharToClick) {
        gPopAudio.play();
        gIndex = gIndex + 1;
        gCharToClick = gSoundChars[gIndex];
        elClickedNum.classList.add('correct-click');
        gAudio.src = `https://yairweiss1.github.io/ABC-Game/sound/${gCharToClick}.m4a`;
        gAudio.play();
    } else {
        new Audio(`https://yairweiss1.github.io/ABC-Game/sound/oops.mp3`).play();
    }

    if (currChar === gChars[gChars.length - 1] /*&& (currChar === gCharToClick - 1)*/) {
        clearInterval(gTimeInterval);
        document.querySelector('.win-placeholder').classList.add('win');
        new Audio(`https://yairweiss1.github.io/ABC-Game/sound/clap.mp3`).play();
    }
}

function startGameTime() {
    var timeShow = document.querySelector('.time');
    gCountTime++;
    timeShow.innerText = 'Time:' + gCountTime;
}

function playAudio() {
    gAudio.play();
}

function shuffle(originalArray) {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }