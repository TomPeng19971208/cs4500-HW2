/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
    
(function() {
    "use strict";
    var current = null;
    var result = null;
    var operation = null;;
    
    
    function init() {
        initNumButtons();
        initOpButtons();
        initPoint();
        reset();
        refreshScreen(0);
    }
    
    function refreshScreen(value) {
        var screen = document.getElementById("screen");
        if(value === null) {
            screen.innerHTML = 0;
        }
        else {
        screen.innerHTML = value.toString();
    }
    }
    
    //register all number buttons 
    function initNumButtons(){
        console.log("initButtons");
        var btns = document.getElementsByClassName("number");
        for(var i=0;i<btns.length;i++) {
            btns[i].addEventListener("click", function(){clickNum(this.value);});
        }
    }
    
    //register all operation buttons
    function initOpButtons() {
        var btns = document.getElementsByClassName("operation");
        for(var i=0;i<btns.length;i++) {
            btns[i].addEventListener("click", function(){clickOp(this.value);});
        }
    }
    
    //register point button
    function initPoint() {
        var btn = document.getElementsByClassName("point")[0];
        btn.addEventListener("click", clickPoint);
    }
    
    function clickPoint() {
        if(current===null) {
            current=".";
        }
        else {
            if(current.indexOf(".") == -1) {
                current += ".";
            }
        }
    }
    
    
    function clickOp(op) {
        function calc() {
            if(result===null) {
                result = current;
                return;
            }
            removeZeros(result);
            removeZeros(current); 
            switch(operation){
                case "+=":
                    result = parseFloat(result) + parseFloat(current);
                    result = parseFloat(result.toFixed(4));
                    break;
                case "-":
                    result = parseFloat(result) - parseFloat(current);
                    result = parseFloat(result.toFixed(4));
                    break;
                case "*":
                    result = parseFloat(result) * parseFloat(current);
                    result = parseFloat(result.toFixed(4));
                    break;
                case "/":
                    if(parseFloat(current)==0) {
                        alert("divisor can't be zero, please start again");
                        reset();
                        break;
                    }
                    result = parseFloat(result) / parseFloat(current);
                    result = parseFloat(result.toFixed(4));
                    break;
            }
        }
        if(op == "+=" && current !== null && operation !== null) {
            calc();
            operation = null;
            current = result;
            result = null;
            refreshScreen(current);
            return;
        }
        if(op == "c") {
            reset();
            return;
        }
        if(op == "-" && current===null) {
            current = "-";
            refreshScreen(current);
            return;
        }
        else {
            if(op !== null && current!==null && result !==null) {
                calc();
                current = result;
            }
            operation = op;
            result = current;
            current = null;
        }
        refreshScreen(result);
    }
    
    function clickNum(num) {
        if(current===null) {
            current = num;
        }
        else {
            current += num;
        }
        refreshScreen(current);
    }
    
    function removeZeros(target) {
        if(target>Number.MAX_SAFE_INTEGER) {
            alert("number is too big");
            reset();
            return;
        }
        target=target.toString(10);
        target.replace(/^0+/,"");
        target.replace(/^-0+/,"-");
        if(target.length == "" || target == "-" || target==null) {
            target = "0";
        }
    }
    
    function reset() {
        result = null;
        current = null;
        operation = null;
        refreshScreen(0);
    }
    
    window.addEventListener("load", init());
})
        ();