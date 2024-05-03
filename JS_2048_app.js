for (let i = 0; i < 16; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('box');
    document.querySelector('.container').appendChild(newDiv);
}

const boxDivs = document.querySelectorAll('.container .box');

function resetBoxDivs() {
    boxDivs.forEach(box => {
        box.innerHTML = '';
    });
} 

resetBoxDivs()

let mat = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function addRandomTwo() {
    if (mat.some(row => row.includes(0))) {
        let row = Math.floor(Math.random() * 4);
        let col = Math.floor(Math.random() * 4);
        while (mat[row][col] !== 0) {
            row = Math.floor(Math.random() * 4);
            col = Math.floor(Math.random() * 4);
        }
        mat[row][col] = 2;
        mat_set();
    }
}

addRandomTwo();
addRandomTwo();

function updateBoxColors() {
    boxDivs.forEach(box => {
        if (box.innerHTML === '') {
            box.style.backgroundColor = '#d3d3d3';
        } else if (box.innerHTML === '2') {
            box.style.backgroundColor = '#FCFFF7';
        } else if (box.innerHTML === '4') {
            box.style.backgroundColor = '#FEDA8F';
        } else if (box.innerHTML === '8') {
            box.style.backgroundColor = '#FCCD6C';
        } else if (box.innerHTML === '16') {
            box.style.backgroundColor = '#FAC043';
        } else if (box.innerHTML === '32') {
            box.style.backgroundColor = '#F5B130';
        } else if (box.innerHTML === '64') {
            box.style.backgroundColor = '#F0A31F';
        } else if (box.innerHTML === '128') {
            box.style.backgroundColor = '#EA9128';
        } else if (box.innerHTML === '256') {
            box.style.backgroundColor = '#E4802F';
        } else if (box.innerHTML === '512') {
            box.style.backgroundColor = '#DF6F35';
        } else if (box.innerHTML === '1024') {
            box.style.backgroundColor = '#D95D38';
        } else if (box.innerHTML === '2048') {
            box.style.backgroundColor = '#FAA72A';
        }
    });
}

updateBoxColors();

// Matches the container with the matrix
function mat_get() {
    let index = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (boxDivs[index].innerHTML === '') {
                mat[i][j] = 0;
            } else {
                mat[i][j] = parseInt(boxDivs[index].innerHTML);
            }
            index++;
        }
    }
}

mat_get()

// Matches the matrix with container
function mat_set() {
    let index = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            boxDivs[index].innerHTML = mat[i][j] !== 0 ? mat[i][j].toString() : '';
            index++;
        }
    }
    updateBoxColors();
}

function moveUp() {
    //rotate the matrix clockwise
    rotatedMat = []
    for (let i = 0; i < 4; i++) {
        newArr = []
        for (let j = 3; j >= 0; j--) {
            newArr.push(mat[j][i])
        }
        rotatedMat.push(newArr)
    }
    mat = [...rotatedMat]
    
    moveRight()
    
    // rotate the matrix counterclockwise
    rotatedMat = []
    for (let i = 3; i >= 0; i--) {
        newArr = []
        for (let j = 0; j < 4; j++) {
            newArr.push(mat[j][i])
        }
        rotatedMat.push(newArr)
    }
    mat = [...rotatedMat]
}

function moveDown() {
    //rotate the matrix clockwise
    rotatedMat = []
    for (let i = 0; i < 4; i++) {
        newArr = []
        for (let j = 3; j >= 0; j--) {
            newArr.push(mat[j][i])
        }
        rotatedMat.push(newArr)
    }
    mat = [...rotatedMat]
    
    moveLeft()
    
    // rotate the matrix counterclockwise
    rotatedMat = []
    for (let i = 3; i >= 0; i--) {
        newArr = []
        for (let j = 0; j < 4; j++) {
            newArr.push(mat[j][i])
        }
        rotatedMat.push(newArr)
    }
    mat = [...rotatedMat]
}

function moveLeft() {
    for (let i = 0; i < 4; i++) {
        // remove zeros
        for (let j = 3; j >= 0; j--) {
            if (mat[i][j] == 0) {
                mat[i].splice(j, 1)
            }
        }
        
        // compress matches
        for (let j = 0; j < 4; j++) {
            if (mat[i][j] !== undefined && mat[i][j] === mat[i][j + 1]) {
                mat[i][j + 1] *= 2
                mat[i].splice(j, 1)
            }
        }
        
        // add zeros
        rowLength = mat[i].length
        for (let k = 0; k < 4 - rowLength; k++) {
            mat[i].push(0);
        }
    }
}

function moveRight() {
    console.log("right")
    for (let i = 0; i < 4; i++) {
        // remove zeros
        for (let j = 3; j >= 0; j--) {
            if (mat[i][j] == 0) {
                mat[i].splice(j, 1)
            }
        }
        
        // compress matches
        for (let j = 3; j >= 0; j--) {
            if (mat[i][j] !== undefined && mat[i][j] === mat[i][j - 1]) {
                mat[i][j - 1] *= 2
                mat[i].splice(j, 1)
                j--
            }
        }
        
        // add zeros
        rowLength = mat[i].length
        for (let k = 0; k < 4 - rowLength; k++) {
            mat[i].unshift(0);
        }
    }
}

let won = false
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    const actions = {
        'w': moveUp,    'arrowup': moveUp,      
        's': moveDown,  'arrowdown': moveDown,  
        'a': moveLeft,  'arrowleft': moveLeft,  
        'd': moveRight, 'arrowright': moveRight
    };
    
    if (actions[key] && won === false) {
        actions[key]();
        addRandomTwo();
        mat_set()
    }
});