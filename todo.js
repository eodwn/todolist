var list = document.getElementById("list");
var input = document.getElementById("input");
var deleteAll = document.getElementById("deleteAll");
var checkAll = document.getElementById("checkAll");
var deleteCompleted = document.getElementById("deleteCompleted");

deleteAll.addEventListener('click', function () {
    while(list.children.length > 0){
        list.removeChild(list.firstChild)
    }
});

document.getElementById("addButton").addEventListener('click', function (){
    addTodoItem();
});

var addTodoItem = function(){
    var value = input.value;
    if(value.trim() === ""){
        alert("할일을 입력해 주세요.");

        return;
    }

    var li = document.createElement("li");
    var span = document.createElement("span");
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerHTML="삭제";

    var inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.className = "inputCheck";

    var addButton = document.getElementById("addButton");

    if(list.children.length > 29){
        alert("할일은 최대 30개까지 추가 가능합니다.");

        input.disabled = "disabled";
        addButton.disabled = "disabled";

        return;
    }

    list.appendChild(li);
    li.append(inputCheck, span, deleteButton);
    span.append(value);  
}

var getParentNode = function(target) {
    return target.tagName === "LI" ? target : target.parentNode;
};

list.addEventListener('click', function (event){
    var selectList = event.currentTarget;
    var selectLi = getParentNode(event.target);
    var selectInput = selectLi.getElementsByTagName("input");
    var selectSpan = selectLi.getElementsByTagName("span");

    // TODO 삭제 버튼 클릭시 체크박스 체크가 되지 않아야한다.
    if(event.target.tagName !== "INPUT"){
        if(selectInput[0].checked) {
            selectInput[0].checked = "";
            selectSpan[0].className = "";
        } else{
            selectInput[0].checked = "checked";
            selectSpan[0].toggleC = "completed";
        }
    }

    if(event.target.tagName === "BUTTON") {
        selectList.removeChild(selectLi);
    }
});

checkAll.addEventListener('click', function () {
    var input = list.querySelectorAll("input");

    input.forEach(function(item){
        if(checkAll.checked){
            item.checked = "checked";
        } else {
            item.checked = "";
        }
    });  
});

deleteCompleted.addEventListener('click', function(){
    var li = list.getElementsByTagName("li");
    var input = list.querySelector("input");

    if(input.checked){
        while(list.children.length > 0){
            list.removeChild(list.firstChild)
        }
    }
});

input.addEventListener('keyup', function(e){
    if(e.keyCode===13){
        addTodoItem();
    }
});