var last = -1
var won = false 
var turn = document.getElementById("turn")
var cell1 = document.getElementById("cell1"),
cell2 = document.getElementById("cell2"),
cell3 = document.getElementById("cell3"),
cell4 = document.getElementById("cell4"),
cell5 = document.getElementById("cell5"),
cell6 = document.getElementById("cell6"),
cell7 = document.getElementById("cell7"),
cell8 = document.getElementById("cell8"),
cell9 = document.getElementById("cell9");
var cells = [];
cells[0] = cell1;
cells[1] = cell2;
cells[2] = cell3;
cells[3] = cell4;
cells[4] = cell5;
cells[5] = cell6;
cells[6] = cell7;
cells[7] = cell8;
cells[8] = cell9;

var mapping = {
  "cell1":0,
  "cell2":1,
  "cell3":2,
  "cell4":3,
  "cell5":4,
  "cell6":5,
  "cell7":6,
  "cell8":7,
  "cell9":8
}


var done = document.getElementById("Done"), X_or_O = 0;
var diag1 = {'set':new Set(), 'freq':0, 'index':0};
var diag2 = {'set':new Set(), 'freq':0, 'index':1};
var row1 = {'set':new Set(), 'freq':0};
var row2 = {'set':new Set(), 'freq':0};
var row3 = {'set':new Set(), 'freq':0};
var col1 = {'set':new Set(), 'freq':0};
var col2 = {'set':new Set(), 'freq':0};
var col3 = {'set':new Set(), 'freq':0};

var mappingRow = {
  0:row1,
  1:row2,
  2:row3,
}

var reversemappingRow = {
  0:[cell1, cell2, cell3],
  1:[cell4, cell5, cell6],
  2:[cell7, cell8, cell9],
}

var mappingCol = {
  0:col1,
  1:col2,
  2:col3,
}

var reversemappingCol = {
  0:[cell1, cell4, cell7],
  1:[cell2, cell5, cell8],
  2:[cell3, cell6, cell9],
}

var mappingDiag = {
  0:[diag1],
  2:[diag2],
  4:[diag1, diag2],
  6:[diag2],
  8:[diag1]
}

var mappingDiagIndex = {
  0:[0],
  2:[1],
  4:[0, 1],
  6:[1],
  8:[0]
}

var reversemappingDiag = {
  0:[cell1, cell5, cell9],
  1:[cell3, cell5, cell7],
}
    function selectWinnerCells(b1, b2, b3) {
      b1.classList.add("shade");
      b2.classList.add("shade");
      b3.classList.add("shade");
      done.innerHTML = b1.innerHTML + " is winner";
      turn.innerHTML = "";
      won = true;
    }

    function selectDraw() {
      done.innerHTML = "Match Draw";

      turn.innerHTML = "";
    }
    function getWinner(index) {
    
      var rows = 3;
      var cols = 3;

      var m = Math.floor(index/cols);
      var n = index % cols;

      var RowSet = mappingRow[m];
      var ColSet = mappingCol[n];
      

      if(RowSet['set'].size == 1 && RowSet['freq'] == 3){
        var newCelle = reversemappingRow[m];
        selectWinnerCells(newCelle[0], newCelle[1], newCelle[2]);
      }
      
      if(ColSet['set'].size == 1 && ColSet['freq'] == 3){
        var newCelle = reversemappingCol[n];
        selectWinnerCells(newCelle[0], newCelle[1], newCelle[2]);
      }

      var diags = mappingDiag[index];
      if(diags){
        diags.forEach(handleDiagCheck);

      }


      if (X_or_O == 8 && won == false){
        selectDraw();
      }

    }

    for (var i = 0; i < cells.length; i++) {
      cells[i].ondblclick = function () {
          if(last != -1 && last === this.id){
            var str = this.innerHTML;
            this.innerHTML = "";
            last = -1;
            
            var index = mapping[this.id];
            removeFromSets(index, str);
            X_or_O -= 1;
            if(X_or_O % 2 !== 0){
              turn.innerHTML = "X Turn Now";
            }
            else{
              turn.innerHTML = "O Turn Now";
            }

            if(won){
              unselect();
              won = false;
              done.innerHTML = "";
            }
          }
          
          

      };
    }

    for (var i = 0; i < cells.length; i++) {
      cells[i].onclick = function () {
        console.log(mappingRow);
        console.log(mappingCol);
        console.log(mappingDiag);
        if (!won && this.innerHTML !== "X" && this.innerHTML !== "O") {
          last = this.id;
          var index = mapping[this.id];
          if (X_or_O % 2 !== 0) {
            console.log(X_or_O);
            this.innerHTML = "X";
            turn.innerHTML = "O Turn Now";
            addToSets(index, "X");
            getWinner(index);
            X_or_O += 1;

          } else {
            console.log(X_or_O);
            this.innerHTML = "O";
            turn.innerHTML = "X Turn Now";
            addToSets(index, "O");
            getWinner(index);
            X_or_O += 1;
          }
        }

      };
    }

    document.getElementById('replay').addEventListener('click', replay);

    function replay() {

      for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("shade");
        cells[i].innerHTML = "";
        done.innerHTML = "";
        turn.innerHTML = "O Turn Now"
        X_or_O = 0;
        last = -1;
        won = false;

      }

      diag1 = {'set':new Set(), 'freq':0, 'index':0};
      diag2 = {'set':new Set(), 'freq':0, 'index':1};
      row1 = {'set':new Set(), 'freq':0};
      row2 = {'set':new Set(), 'freq':0};
      row3 = {'set':new Set(), 'freq':0};
      col1 = {'set':new Set(), 'freq':0};
      col2 = {'set':new Set(), 'freq':0};
      col3 = {'set':new Set(), 'freq':0};
      
      mappingRow = {
        0:row1,
        1:row2,
        2:row3,
      }
      
      mappingCol = {
        0:col1,
        1:col2,
        2:col3,
      }
      
      mappingDiag = {
        0:[diag1],
        2:[diag2],
        4:[diag1, diag2],
        6:[diag2],
        8:[diag1]
      } 


    }

    function addToSets(index, str){
      var rows = 3;
      var cols = 3;

      var m = Math.floor(index/cols);
      var n = index % cols;

      var RowSet = mappingRow[m];
      var ColSet = mappingCol[n];
      var diags = mappingDiag[index];

      RowSet['set'].add(str);
      RowSet['freq'] += 1
      ColSet['set'].add(str);
      ColSet['freq'] += 1;
      if(diags){
        diags.forEach(element => handleDiagAdd(element, str));
      }

      
    }

    function removeFromSets(index, str){
      var rows = 3;
      var cols = 3;

      var m = Math.floor(index/cols);
      var n = index % cols;

      var RowSet = mappingRow[m];
      var ColSet = mappingCol[n];
      var diags = mappingDiag[index];

      var newCelle = reversemappingRow[m];
      var contains = false;
      for (var i = 0; i < 3; i++){
        var celle = newCelle[i];
        console.log('Row ' + celle.innerHTML + str);
        if(celle.innerHTML === str){
          contains = true;
        }

      }
      if(!contains){
        RowSet['set'].delete(str);

      }
      RowSet['freq'] -= 1


      newCelle = reversemappingCol[n];
      contains = false;

      for (var i = 0; i < 3; i++){
        var celle = newCelle[i];
        console.log('Col ' + celle.innerHTML);
        if(celle.innerHTML === str){
          contains = true;
        }

      }
      if(!contains){
        ColSet['set'].delete(str);
      }
      ColSet['freq'] -= 1


      if(diags){
        diags.forEach(element => handleDiagRemove(element, str));
      }

      
    }

    function handleDiagAdd(item, str) {
      item['set'].add(str);
      item['freq'] += 1;
    }
    function handleDiagRemove(item, str) {
      var newCelle = reversemappingDiag[item['index']];
      contains = false;
      
      for (var i = 0; i < 3; i++){
        var celle = newCelle[i];
        console.log(celle.innerHTML);
        if(celle.innerHTML === str){
          contains = true;
        }

      }
      if(!contains){
      item['set'].delete(str);

      }
      item['freq'] -= 1;
    }
    
    function unselect() {
      for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("shade");
      }
    }

    function handleDiagCheck(item) {
      if(item['set'].size == 1 && item['freq'] == 3){
        var newCelle = reversemappingDiag[item['index']];
        selectWinnerCells(newCelle[0], newCelle[1], newCelle[2]);
      }
    }