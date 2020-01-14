var list = document.getElementById("list");
var input = document.getElementById("input");
var deleteAll = document.getElementById("deleteAll");
var checkAll = document.getElementById("checkAll");
var deleteCompleted = document.getElementById("deleteCompleted");
var activeButton = document.getElementById("activeButton");
var allButton = document.getElementById("allButton");
var todoListArea = document.getElementById("todoListArea");
var addButton = document.getElementById("addButton")

todoListArea.addEventListener('click',function(e){
    if(e.target.tagName === "BUTTON"){
        validateItemCount(e);
    }
})

deleteAll.addEventListener('click', function () {
    while(list.children.length > 0){
        list.removeChild(list.firstChild)
    }
});

addButton.addEventListener('click', function (){
    addTodoItem();
});

checkAll.addEventListener('click', function () {
    var input = list.querySelectorAll("input");
    var selectSpan = list.querySelectorAll("span");

    input.forEach(function(item){
        if(checkAll.checked){
            item.checked = "checked";
        } else {
            item.checked = "";
        }
    }); 
    
    selectSpan.forEach(function(item){
        if(checkAll.checked){
            item.className = "completed";
        } else {
            item.className = "";
        }
    }); 
});

deleteCompleted.addEventListener('click', function(){
    itemForEach(function(item){
        if(item.querySelector('input').checked){
            item.remove();
        }
    });
});

completedButton.addEventListener('click', function(){
    itemForEach(function(item){
        if(item.querySelector('input').checked === false){
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    });
});

allButton.addEventListener('click', function(){
    itemForEach(function(item){
        if(item.style.display === 'none'){
            item.style.display = 'block';
        }
    })
});

activeButton.addEventListener('click', function(){
    itemForEach(function(item){
        if(item.querySelector('input').checked === true){
            item.style.display = "none";
            return;
        }

        item.style.display = "block";
    });
});


input.addEventListener('keyup', function(e){
    if(e.keyCode===13 && validateItemCount(e)){
        addTodoItem();
    }
});


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
            selectSpan[0].className = "completed";
        }
    }

    if(event.target.tagName === "INPUT"){
        if(selectInput[0].checked) {
            selectSpan[0].className = "completed";
        } else{
            selectSpan[0].className = "";
        }
    }

    if(event.target.tagName === "BUTTON") {
        selectList.removeChild(selectLi);
    }
});


var itemForEach = function(fn){
    var li = list.querySelectorAll("li");
    li.forEach(fn);
}

var validateItemCount = function(e){
    if(list.querySelectorAll("li").length >= 30){
        input.disabled = "disabled";
        addButton.disabled = "disabled";
        alert("할일은 최대 30개까지 추가 가능합니다.");
        return false;
    };

    input.disabled = "";
    addButton.disabled = "";
    return true;
}

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

    list.appendChild(li);
    li.append(inputCheck, span, deleteButton);
    span.append(value); 
}

var getParentNode = function(target) {
    return target.tagName === "LI" ? target : target.parentNode;
};