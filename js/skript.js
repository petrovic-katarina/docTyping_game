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

window.onload = generateLines;
