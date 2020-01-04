var list = document.getElementById("list");
var input = document.getElementById("input");
var deleteAll = document.getElementById("deleteAll");
var checkAll = document.getElementById("checkAll");

// var deleteButton = document.createElement("button");
//
// deleteButton.addEventListener('click', function () {
//     list.removeChild(li);
// });

deleteAll.addEventListener('click', function () {
    while(list.children.length > 0){
        list.removeChild(list.firstChild)
    }
});

document.getElementById("addButton").addEventListener('click', function (){
    var li = document.createElement("li");
    var span = document.createElement("span");
    var value = input.value;

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerHTML="삭제";

    var inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.className = "inputCheck";

    list.appendChild(li);
    li.append(inputCheck, span, deleteButton);
    span.append(value);
});


var getParentNode = function(target) {
    return target.tagName === "LI" ? target : target.parentNode;
};

list.addEventListener('click', function (event){
    var selectList = event.currentTarget;
    var selectLi = getParentNode(event.target);
    var selectInput = selectLi.getElementsByTagName("input");

    // TODO 삭제 버튼 클릭시 체크박스 체크가 되지 않아야한다.
    if(event.target.tagName !== "INPUT"){
        if(selectInput[0].checked) {
            selectInput[0].checked = "";
        } else{
            selectInput[0].checked = "checked";
        }
    }

    if(event.target.tagName === "BUTTON") {
        selectList.removeChild(selectLi);
    }

});

// 전체 체크박스
checkAll.addEventListener('click', function () {
    var input = list.getElementsByTagName("input");
    //var aa = ["a","b","c","d"];
    
    input.forEach(function(index){
        console.log(index);
    });

    if(checkAll.checked){
        input.checked = "checked";
    } else {
        input.checked = "";
    }
});