const paragraph = "I love coding, coding is my passion do you love coding?"

function solution(paragraph, y) {
    // Your code goes here
    let arr =paragraph.split("");
    let wordsArray = [];
    for(let i = 0; i<arr.length ; i++){
       if(wordsArray.length === 0){
         wordsArray.push({word : arr[i], count : 1})
       }
       
    }
}