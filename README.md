# workbook6 https://jiayiqu115.github.io/workbook6/
WS3 Project - Dynamic Text Replacement Generator
Link => [your project link]

Project
Origin of the idea
The inspiration for this project came from a straightforward question: How to generate some interesting and dynamic sentences with code? At that time, I was browsing some language processing-related libraries and found RiTa.js. It can segment sentences, mark parts of speech, and generate random words concisely. Can I write a program to create unexpected and interesting sentences by replacing nouns in user-input sentences? For example, the original sentence is "She walks in the park," and after replacement, it may become "She walks on Mars" or "She walks in the swimming pool." This effect immediately excited me, so I had this project.

Process
1. Determine the project goal
My goal is simple:

The user enters a paragraph of text.
The program identifies the nouns in it and randomly replaces them with other nouns.
The replaced sentences are displayed in the form of paragraphs.
This goal seems simple, but I did encounter some minor troubles in the implementation process.

2. Create a user input interface
Process
In the beginning, I first created a simple input box and button with p5.js. Use the createInput method to generate an input box with a default value of "She was walking in the park." Then, use createButton to add a submit button.

Problems encountered
When I ran it for the first time, I found that the button did not respond. I clicked it several times, but nothing happened. After debugging, I forgot to bind the mousePressed event to the button... This minor problem often happens, so I remind myself to check whether the key logic is missing after writing the function.
```java script
function setup() {
  noCanvas(); // 隐藏画布
  
  input = createInput('She was walking in the park.'); // 创建输入框并设置默认值
  button = createButton('submit'); // 创建提交按钮
  button.mousePressed(processRita); // 按钮绑定点击事件
  
  input.size(200); // 设置输入框宽度
}
```
3. Processing user input
Thoughts
The next step is the key part - processing sentences input by users. I first use RiTa.tokenize to divide the sentence into word arrays and then use RiTa.pos to get the part of speech of each word. In this way, I can check each word one by one. If a word is a noun (judged by the regular expression /nn.*/), I use RiTa.randomWord to generate a new random noun to replace it.

Problems encountered

Error problem: When I first started running, the console reported an error saying that RiTa is not defined. Initially, I thought it was a problem with the code, but later, I realized I forgot to introduce the RiTa.js library in the HTML file. After adding <script src="https://cdnjs.cloudflare.com/ajax/libs/rita/2.0.1/rita.min.js"></script>, the problem was solved.
Replacement logic problem: When I replaced it for the first time, I found that some words in the sentence were connected, such as "Shewaswalkinginthepark." Later, I found out that I forgot to add a space after each word, so I said output += " "when concatenating output.
```java script
function processRita() {
  let s = input.value(); // 获取用户输入的文本
  
  let rs = RiTa.tokenize(s); // 分词
  let pOS = RiTa.pos(s); // 获取词性
  
  let output = ""; // 用于保存新句子

  for (let i = 0; i < rs.length; i++) {
    if (/nn.*/.test(pOS[i])) {
      output += RiTa.randomWord({pos: "nn"}); // 替换为随机名词
    } else {
      output += rs[i]; // 保留原单词
      output += " "; // 添加空格
    }
  }

  let newParagraph = createP(output); // 显示替换后的句子
  newParagraph.style('font-size', '18px'); // 设置字体大小
}
```
