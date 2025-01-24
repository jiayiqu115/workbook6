let input;
let button;

function setup() {
  noCanvas();
  
  input = createInput('She was walking in the park.');
  button = createButton('submit');
  button.mousePressed(processRita);
  
  input.size(200);
}

function processRita() {
  let s = input.value();
  
  let rs = RiTa.tokenize(s);
  let pOS = RiTa.pos(s);
  
  let output = "";
  
  for (let i = 0; i < rs.length; i++) {
    if (/nn.*/.test(pOS[i])) {
      output += RiTa.randomWord({pos: "nn"});
    } else {
      output += rs[i];
      output += " ";
    }
  }
  
  let newParagraph = createP(output);
  newParagraph.style('font-size', '18px');
}
