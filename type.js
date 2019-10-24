window.onload = Main;
// document.onkeydown = typeGame;

//文字を格納する配列
var moji = new Array("Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ",
    "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ",
    "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ");

//キーコードを格納する配列
var kcode = new Array(65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90);

//グローバル変数たち
let difficulty;
let selectedDiff;
let gameArea;
let errorArea;
let startButton;

function Main() {
    gameArea = document.getElementById("gamearea");
    errorArea = document.getElementById('error');
    difficulty = document.getElementsByName('diff');

    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);
}

function buttonAction() {
    errorArea.innerHTML = "";
    for (let i = 0; i < difficulty.length; i++) { //難易度を取得
        if (difficulty[i].checked) {
            selectedDiff = difficulty[i].value;
            break;
        }
    }
    if (selectedDiff == undefined) { // 未選択の時
        errorArea.innerHTML = "難易度を選んでください。";
    } else {
        // aには選択状態の値が代入されている
        console.log(selectedDiff);
    }
}