const body = document.querySelector('body');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const button = document.querySelectorAll('.btn');

const easy = [
[5, 0, 2, 1, 0, 0, 0, 0, 0],
[3, 0, 9, 0, 7, 2, 5, 6, 1],
[6, 0, 4, 5, 3, 8, 0, 7, 9],
[0, 5, 0, 0, 0, 0, 0, 0, 4],
[9, 0, 0, 0, 4, 7, 0, 0, 0],
[0, 0, 0, 9, 8, 0, 7, 1, 0],
[0, 9, 0, 0, 0, 3, 4, 5, 0],
[7, 0, 0, 8, 0, 0, 0, 0, 0],
[1, 3, 0, 0, 0, 0, 0, 2, 7]
]

const medium = [
[0, 9, 0, 8, 0, 5, 7, 2, 0],
[0, 2, 0, 0, 0, 0, 0, 0, 6],
[0, 0, 4, 0, 2, 0, 0, 3, 8],
[0, 5, 3, 0, 0, 0, 8, 0, 1],
[0, 8, 1, 5, 4, 0, 0, 0, 0],
[0, 0, 0, 0, 8, 1, 0, 6, 5],
[9, 0, 2, 0, 0, 4, 0, 0, 0],
[0, 0, 0, 1, 3, 8, 4, 9, 2],
[0, 0, 0, 0, 0, 2, 0, 0, 0]
]

const hard = [
[3, 0, 6, 5, 0, 8, 4, 0, 0], 
[5, 2, 0, 0, 0, 0, 0, 0, 0], 
[0, 8, 7, 0, 0, 0, 0, 3, 1], 
[0, 0, 3, 0, 1, 0, 0, 8, 0], 
[9, 0, 0, 8, 6, 3, 0, 0, 5], 
[0, 5, 0, 0, 9, 0, 6, 0, 0], 
[1, 3, 0, 0, 0, 0, 2, 5, 0], 
[0, 0, 0, 0, 0, 0, 0, 7, 4], 
[0, 0, 5, 2, 0, 6, 3, 0, 0]
]

button.forEach(item => {
item.addEventListener('click', () => {
  if (item.id === 'easy') {
    return fillTable(easy);
    
  } else if (item.id === 'medium') {
    return fillTable(medium);
      
  } else if( item.id === 'hard') {
    return fillTable(hard); 

  } else if(item.classList.contains('valid')) {
    if(validation()) {
      alert('Solved');
    } else {
      alert('Failed')
    }
  }
})
})

const checkInput = () => {
let tdata = document.querySelectorAll('td');

tdata.forEach(item => {
  item.querySelector('input').oninput = () => {
    const tinput = item.querySelector('input');
    // handleDuplicate(item);
    handleInstance(item);

    if(tinput.value){
      tinput.classList.add('inserted');
    } else {
      tinput.classList.remove('inserted');
    }

    if(tinput.value.length > 1) {
      tinput.value = tinput.value.slice(0, 1);
    } else if(tinput.value < 1 || tinput.value > 9) {
      tinput.value = null;
    }
  }
})
}

const fillTable = (grid) => {
let index = 0;
const tinput = document.querySelectorAll('input');
clearTable();

grid.forEach(innerArr => {
  innerArr.forEach(item => {
    const input = tinput[index];

    if(item) {
      input.value = item;
      input.disabled = true;
    } else {
      input.disabled = false
    }
    index++;
  })
})
}

const clearTable = () => {
const tinput = document.querySelectorAll('input');
tinput.forEach(item => {
  item.value = null;
  item.classList.remove('highlighted');
  item.classList.remove('inserted');
  item.classList.remove('instance');
  item.classList.remove('duplicate');
})
}

const validation = () => {
let arr = Array(9).fill(0).map(() => Array(9));
const tinput = document.querySelectorAll('input');

for (let i = 0; i < tinput.length; i++) {
  if (tinput[i].value === '') {
    return alert('Fill all the input first!');
  }
}

let index = 0;
for(let i = 0; i < 9; i++) {
  for(let j = 0; j < 9; j++){
    arr[i][j] = tinput[index++].value
  }
}

for(let i = 0; i < 9; i++) {
  let rowSum = 0;
  for(let j = 0; j < 9; j++){
    rowSum += parseInt(arr[i][j]);
  }
  console.log(rowSum);
  if(rowSum !== 45) {
    return false;
  }
}

for(let i = 0; i < 9; i++) {
  let colSum = 0;
  for(let j = 0; j < 9; j++){
    colSum += parseInt(arr[j][i]);
  
  }
  if(colSum !== 45) {
    return false;
  }
}

let rowIndex = 0;

while(rowIndex < 9) {
  let box1 = 0, box2 = 0, box3 = 0;

  for (let i = rowIndex; i < rowIndex + 3; i++) {
    for (let j = 0; j < 3; j++) {
      box1 += parseInt(arr[i][j]);
    }
  }

  for (let i = rowIndex; i < rowIndex + 3; i++) {
    for (let j = 3; j < 6; j++) {
      box2 += parseInt(arr[i][j]);
    }
  }
  for (let i = rowIndex; i < rowIndex + 3; i++) {
    for (let j = 6; j < 9; j++) {
      box3 += parseInt(arr[i][j]);
    }  
  }
    rowIndex += 3;
    if(box1 !== 45 || box2 !== 45 || box3 !== 45) {
      return false;
      }
  }
  return true;
}

const handleHighlight = () => {
  const tdata = document.querySelectorAll('td');

  tdata.forEach(item => {
    item.querySelector('input').onfocus = () => {
      let rowIndex = parseInt(item.id / 10);
      let colIndex = parseInt(item.id % 10);

      handleInstance(item);

      for (let i = 0; i< 81; i++) {
        let input = tdata[i].querySelector('input');
          if(parseInt(tdata[i].id / 10) === rowIndex) {
            input.classList.add('highlighted');
          } else if(parseInt(tdata[i].id % 10) === colIndex) {
            input.classList.add('highlighted');
          } else {
            input.classList.remove('highlighted');
          }
      }

      const tbox = document.querySelectorAll(`.${item.classList[2]}`);
      tbox.forEach(el => {
        const element = el.querySelector('input');
        element.classList.add('highlighted');
      })
    }
  })
}

const handleInstance = (item) => {
  const tdata = document.querySelectorAll('td');
  
  for(let i = 0; i < tdata.length; i++) {
    const tinput = tdata[i].querySelector('input');
    const rowIndex = parseInt(tdata[i].id / 10);
    const colIndex = parseInt(tdata[i].id % 10);
    
    if(item.querySelector('input').value && tinput.value === item.querySelector('input').value && tdata[i].id !== item.id) {
      tinput.classList.add('instance');
      if(rowIndex === parseInt(item.id / 10) || colIndex === parseInt(item.id % 10) || item.classList[2] === tdata[i].classList[2]) {
        item.querySelector('input').classList.add('duplicate');
        item.querySelector('input').value = null;
      } 
    } else if(!item.querySelector('input').value && item.id !== tdata[i].id) {
      item.querySelector('input').classList.remove('duplicate');
      tinput.classList.remove('instance');
    } else {
      tinput.classList.remove('instance');
    }
  }
}

checkInput();
handleHighlight();

if(performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  clearTable();
}
