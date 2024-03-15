const numberOfLines = 13;

function generateLines() {
 const linesContainer = document.getElementById('linesContainer');

 for (let i = 1; i <= numberOfLines; i++) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.classList.add(`line-${i}`);
  line.style.top = `${(i - 1) * 35}px`;
  linesContainer.appendChild(line);
 }
}

window.onload = function () {
 generateLines();
 start();
};

function start() {
 let startBtn = $('.startBtn');
 let mainInput = $('.mainInput');
 let allLines = $('.line');

 startBtn.on('click', startGame);

 function startGame() {
  $(this).hide();
 }

 // setup
 let speed = 1;
 let textLength = 3;
 let typingWords = words.filter(word => word.length == textLength);
 let lvl = 6;

 // console.log(typingWords);

 //insert spans
 function insertSpans() {
  for (let i = 0; i < allLines.length; i++) {
   let rand = Math.floor(Math.random() * 20);
   if (rand <= lvl) {
    let text = chooseText();
    $(allLines[i]).append(`<span>${text}</span>`)
   }
  }
 }
 insertSpans();

 function chooseText() {
  let rand = Math.floor(Math.random() * typingWords.length);
  let savedText = typingWords[rand];
  typingWords.splice(rand, 1);

  return savedText;
 }

 // animation

 let moveAll = setInterval(function () {
  let allSpans = $('span');
  allSpans.css({
   left: '+=' + speed
  })

  // test
  $.each(allSpans, (index, el) => {
   let position = $(el).position().left;
   if (position > 850) {
    clearAllIntervals()
   } else if (position > 700 && position < 710) {
    $(el).addClass('danger')
   }
  })
 }, 10)

 function clearAllIntervals() {
  clearInterval(moveAll);
 }
}

