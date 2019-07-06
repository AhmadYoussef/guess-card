// if you need Question just ask


// i am creating an event listener to start the game
let startGame = document.getElementById('startGame');
startGame.addEventListener('click', drowCard);

// this array will help me to put number in the html code and i used function to shuffle the array to make it looks like random
let array = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
// i will put inside this varabile a value of which element i clicked on 
let result = [];

// this varabile will help me to create setinterval for timer and to reset the timer later
let interval;
let timer ;

// this function will start the game and it will drow the card on the DOM (html)
function drowCard(){ 
    // i create array with 4 field first one is min second milisecond and i will increment last one and i will do some math to get result of the min and second and millisecond
    timer = [0,0,0,0]
    // i have button in the game if the player wanna play again before he finish the game so that is way i cleared the timer;
    clearInterval(interval);
    // i am just hidden some element and display it depened in which stage i am now ... 
    document.querySelector('#result').style.display = 'none';
    startGame.style.display = 'none';
    document.getElementById('element').style.display = 'block';
    // in this place i am just shuffle the array before i print it 
   let arr = shuffle(array);
    // i am just reset the place in case the user wanna play again
   document.getElementById('conta').innerHTML = '';
   // in this place i am just print the card in the DOM
   for(i=0; i < arr.length; i++){
       document.getElementById('conta').innerHTML += `  <div id='flip`+ i +`' class="elementShap" onclick="flipOn('flip`+i+`');">
                                                            <div class="font">font</div>
                                                            <div class="back">`+ arr[i] +`</div>
                                                        </div> `
   }
   // after all the element is written on the DOM i will start the timer
   interval = setInterval(startTimer,10);

}

// in this place am fliping the card and checking if it is matched 
function flipOn(value){
    const element = document.getElementById(value);
    // i am checking if the card is orader fliped ... by checking if it has only elementShap. if it is not that mean it has 'elementShap flipo' so i will do nothing 
    if(element.className == 'elementShap'){
        // i am just adding a class to flip the card 
        element.classList.add('flipo');
        // i am saving the value of the card because i need to use it when the second card is flip
        result.push(value);
    }
    // if the result array is 1 that mean there is 2 varabile inside the array that mean the user clicked on two card os in this case i will save varabile in new varabile el1 el2 and i will reset the array for next value; Hint i am just saving the index of the element
    if(result.length > 1){
        let el1 = result[0];
        let el2 = result[1];
        // if the value of the innertext is equal i will keep the flipo class and i will hide the element >>> i didn't give it display none because if you give display none to an element the browser will tread it as it is not exist so the layout will collapse
        if(document.getElementById(el1).children[1].innerText == document.getElementById(el2).children[1].innerText){
            document.getElementById(el1).style.visibility = 'hidden';
            document.getElementById(el2).style.visibility = 'hidden';
            // i am just checking if the game is end of not i am not sure if i need settimeout to delay the checking function
            setTimeout(checkIfEnd, 1000);
        }else{
            // in this place that mean the cards are not equal so i will remove the class flipo from the card and i need settimeout >>> because i need to let user to see the result ... i faced a problem here you can i ask me to tell you what was the problem and i will tell you how i solve it 
           setTimeout(()=>{document.getElementById(el1).classList.remove('flipo')}, 1000 );
           setTimeout(()=>{document.getElementById(el2).classList.remove('flipo')}, 1000 );
        }
        result =[];
    }
}

// i am using this array to shuffle order of the varabile in the array
function shuffle(arr) {
    // am getting the array and put in ctr the length of the arr
    var ctr = arr.length;
    var temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    // am just returning the new value of the array
    return arr;
}

// this function will check if the user finished the game ... in my situation if all the element shap is hidden that mean the user finish the game 
function checkIfEnd(){
    // i will get arry of object and i can check the style of the element using for loop

    let arrelements = document.getElementsByClassName('elementShap');
    for(let i = 0; i < arrelements.length; i++){
        if(arrelements[i].style.visibility != 'hidden'){
            // if one element is visibile i will break the function by return
            return;
        }
    }
    // so if all the element are hidden i will call this function
    startAgain();
}
// this function will stop the timer and display the result to the user
function startAgain(){
    // in this place am clearing the timer
    clearInterval(interval);
    let text =document.querySelector('#result p');
    // i am checking if the min is 0 ( i will display result of the second and ms) otherwise i will display min and second and ms
    if(timer[0] === 0){
        text.innerText = `you have finished in ${timer[1]} second and ${timer[2]} milisecond `;
    }else{
        text.innerText = `you have finished in ${timer[0]} min, ${timer[1]} second and ${timer[2]} milisecond`;
    }
    // i am just displaying the paragraph and  hide the element (cards)
    document.querySelector('#result').style.display = 'block';
    document.getElementById('element').style.display = 'none';
}

// this function will start incresing the timer
function startTimer(){
    // leading zero will take number and if it is under 9 will add 0 before the number
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    // after that i will print the string in the div
    document.getElementById('timer').innerText = currentTime;
    // am incressing last varabile in the array and i am doing some math to manipulate min sec ms
    timer[3]++;
console.log(timer[3]);
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// leading zero will take number and if it is under 9 will add 0 before the number
function leadingZero(time){
    if(time <= 9){
        time = '0' +time
    }
    return time;
}

// create event listener to the same function that start the game ... just if the user wanna play again
document.getElementById('again').addEventListener('click',drowCard);
document.getElementById('startAgain').addEventListener('click',drowCard);
