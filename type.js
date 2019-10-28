window.onload = Main;
document.onkeydown = typeGame;

//文字を格納する配列
var Alphabet = new Array("Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ",
    "Ｊ", "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ",
    "Ｓ", "Ｔ", "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ");

//キーコードを格納する配列
var keyCode = new Array(65, 66, 67, 68, 69, 70, 71, 72, 73,
    74, 75, 76, 77, 78, 79, 80, 81, 82,
    83, 84, 85, 86, 87, 88, 89, 90);

//グローバル変数たち
let difficulty;
let selectedDiff;
let gameArea;
let errorArea;
let startButton;
let enemyInfo;
let myInfo;

//問題用の内部データ
let nowplaying = false; //今プレイ中かどうか
let diffNumber; //難易度に応じて決まる内部用データ
let questNumber = 0; //今何問目か
let Max = 5; //満タン状態のHP設定
let HP = Max;
let words = new Array;
let enemys = new Array("resources/enemy.jpeg");
let myunit = new Array("resources/myunit.jpeg");

function Main() {
    gameArea = document.getElementById("gamearea");
    targetArea = document.getElementById('targetarea');
    errorArea = document.getElementById('error');
    difficulty = document.getElementsByName('diff');
    startButton = document.getElementById('startbutton');
    startButton.addEventListener("click", buttonAction);

    enemyInfo = document.getElementById('enemyinfo');
    myInfo = document.getElementById('myinfo');
}

function buttonAction() {
    errorArea.innerHTML = "";
    if (!nowplaying) { //プレイ中はスタートボタンが機能しないように
        for (let i = 0; i < difficulty.length; i++) { //難易度を取得
            if (difficulty[i].checked) {
                selectedDiff = difficulty[i].value;
                break;
            }
        }
        if (selectedDiff == undefined) { // 未選択の時
            errorArea.innerHTML = "難易度を選んでください。";
        } else {
            nowplaying = true;
            createTarget(selectedDiff); //問題数決定
            changingDisable(); //ラジオボタンの入力を遮断
            setInfomation(); //敵の数とHP表示
        }
    } else {
        errorArea.innerHTML = "プレイ中です";
    }

}

function createTarget(d) {
    switch (d) {
        case "EASY":
            diffNumber = 5;
            break;
        case "NORMAL":
            diffNumber = 10;
            break;
        case "HARD":
            diffNumber = 20;
            break;
        default: //難易度を選ばずにスタートが押されたとき
            break;
    }
    words = randomAlphabet(diffNumber); //問題を生成する
}

function randomAlphabet(n) { //ランダムなアルファベットをn文字決定し配列で返す
    let ans = new Array;
    for (let i = 0; i < n; i++) {
        ans[i] = Math.floor(Math.random() * 26);
    }
    return ans;
}

function changingDisable() {
    let forms = new Array(document.getElementById('easy'),
        document.getElementById('normal'),
        document.getElementById('hard'));
    if (nowplaying) {
        for (let i = 0; i < 3; i++) {
            forms[i].disabled = true;
        }
    } else {
        for (let i = 0; i < 3; i++) {
            forms[i].disabled = false;
        }
    }
}

function setInfomation() {
    questNumber = 0; //最初の問題に戻す
    HP = Max; //HPをマックすに戻す
    targetArea.innerHTML = Alphabet[words[questNumber]]; //1問目を表示
    enemyInfo.innerHTML = "あと " + (diffNumber - questNumber) + "体";
    myInfo.innerHTML = "HP: " + HP + "/5"
}

function typeGame(evt) {
    let inKey; //入力されたキーのコード
    inKey = event.keyCode;

    if (nowplaying) { //プレイ中以外はいらない
        if (inKey == keyCode[words[questNumber]]) { //正解のとき
            questNumber += 1; //次の問題番号へ
            enemyInfo.innerHTML = "あと " + (diffNumber - questNumber) + "体";
            if (questNumber > diffNumber - 1) { //最後の問題をクリアしていたら
                targetArea.innerHTML = "クリア！"
                nowplaying = false; //プレイ終了状態
                changingDisable(); //ラジオボタンを選べるようにする
            } else {
                targetArea.innerHTML = Alphabet[words[questNumber]];
            }
        } else { //不正解のとき
            if (HP > 0) { //まだ死なないとき
                HP -= 1;
                myInfo.innerHTML = "HP: " + HP + "/5"
            } else { //もう死ぬとき
                myInfo.innerHTML = "死んでしまった！"
                nowplaying = false; //プレイ終了状態
                changingDisable(); //ラジオボタンを選べるようにする
            }
        }

    }
}