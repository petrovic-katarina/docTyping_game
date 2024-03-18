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
 let startBtn = $('.startBtn');
 startBtn.on('click', function () {
  $(this).hide();
  start();
 }); mainInput.focus();
};

function start() {

 let mainInput = $('.mainInput');
 let allLines = $('.line');
 let allText = [];
 let score = 0;
 let displayResult = $('.displayResult');

 mainInput.focus();

 // setup
 let speed = 1;
 let textLength = 3;
 let typingWords = words.filter(word => word.length == textLength);
 let lvl = 6;

 // console.log(typingWords);
 let speedUp = setInterval(function () {
  textLength++;
  typingWords = words.filter(word => word.length == textLength);
 }, 20000)

 mainInput.on('keyup', checkInputTyping);

 function checkInputTyping() {
  let inputVal = $(this).val();
  let self = $(this);
  // console.log(allText);
  if (allText.includes(inputVal)) {
   let index = allText.indexOf(inputVal);
   allText.splice(index, 1);

   $('span').filter(function () {
    return $(this).text() == inputVal;
   }).css('background', 'blue').fadeOut(100, function () {
    $(this).remove();
   })
   self.val('');
   score++;
   displayResult.html(score);
  }
 }

 //insert spans
 function insertSpans() {
  for (let i = 0; i < allLines.length; i++) {
   let rand = Math.floor(Math.random() * 20);
   if (rand <= lvl) {
    let text = chooseText();
    allText.push(text);
    $(allLines[i]).append(`<span>${text}</span>`)
   }
  }
  setTimeout(insertSpans, 7000);
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
 }, 100)

 function clearAllIntervals() {
  clearInterval(moveAll);
 }
}

