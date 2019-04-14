window.onload = function() {
    create_pic();
    document.getElementById("restart").addEventListener("click", random_pos);
    document.getElementById("change_image").addEventListener("click", change_img);
};

/* 驗證是否有解 */
function check_random_isValid() {
    var count = 0;
    for (var i = 0; i < 16; i++) {
        for (var j = i+1; j < 16; j++) {
            if (random_arr[j] < random_arr[i]) {
                count++;
            }
        }
    }
    return count%2===0;
}

/* 產生拼圖 */
function create_pic() {
    picture = document.getElementById("picture");
    for (var i = 1; i <= 16; i++) {
        var part = document.createElement("div");
        part.addEventListener("click", pic_move);
        part.className = "picture_part" + count + " position_"+i;
        picture.appendChild(part);
        part.id = "_position_"+i;
    }
}

/* 圖片處理 */
var count = 0;
function change_img(event) {
    if (count < 1) count++;
    else return;
    for (var i = 0; i < 16; i++) {
        picture.childNodes[i].className += " picture_part" + count;
    }
}



/* 產生隨機數列定義位置 */
function random_pos(event) {
    document.getElementById("result").innerText = "";
    /* 先將對應圖塊復位 */
    for (var k = 1; k <= 16; k++) {
        document.getElementById("_position_"+k).className="picture_part"+count+" position_"+k;
    }
    var part = document.getElementById("picture").childNodes;
    random_arr = [];
    for (var j = 0; j < 15; j++) {
        random_arr[j] = j+1;
    }
    /* 利用sort和cmp隨機打亂 */
    function cmp() { return 0.5-Math.random(); }
    while(1) {
        random_arr.sort(cmp);
        if (check_random_isValid()) {
            break;
        }
    }
    /* 通过更改類別名稱来改變位置 */
    for (var i = 0; i < 15; i++) {
        part[i].className = "picture_part" + count + " position_" + random_arr[i];
    }
}

/* 點擊拼圖觸發事件 */
function pic_move(event) {
    var blank_pic_offset = document.getElementById("_position_1");
    var blank_pic_offset_top = blank_pic_offset.offsetTop;
    var blank_pic_offset_left = blank_pic_offset.offsetLeft;
    var _offset_top = this.offsetTop;
    var _offset_left = this.offsetLeft;
    /* 判斷點擊的拼圖是不是相鄰空白*/
    if ((Math.abs(blank_pic_offset_top-_offset_top) == 85 && blank_pic_offset_left == _offset_left) ||
        (Math.abs(blank_pic_offset_left-_offset_left) == 85 && blank_pic_offset_top == _offset_top)) {
        var str = blank_pic_offset.className;
        blank_pic_offset.className = this.className;
        this.className = str;
        check(); // 檢查是否還原
    }
}

/* 檢查是否還原 */
function check() {
    for (var i = 1; i <= 16; i++) {
        var item = document.getElementById("_position_"+i);
        if (item.className != "picture_part" + count +" position_"+i &&
            item.className != "picture_part0" + " position_" + i + " picture_part1") {
            document.getElementById("result").innerText = "Continue...";
            return;
        }
    }
    document.getElementById("result").innerText = "You Win!";
}