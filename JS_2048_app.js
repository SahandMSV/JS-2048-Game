for (let i = 0; i < 16; i++) {
    const newDiv = document.createElement('div')
    newDiv.classList.add('box')
    document.querySelector('.container').appendChild(newDiv)
}

const boxDivs = document.querySelectorAll('.container .box')

let mat = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

function addRandomTwo() {
    if (mat.some(row => row.includes(0))) {
        let row = Math.floor(Math.random() * 4)
        let col = Math.floor(Math.random() * 4)
        while (mat[row][col] !== 0) {
            row = Math.floor(Math.random() * 4)
            col = Math.floor(Math.random() * 4)
        }
        mat[row][col] = 2
        mat_set()
    }
}

addRandomTwo()
addRandomTwo()

function resetBoxDivs() {
    mat.forEach(row => {
        row.fill(0);
    });
    
    addRandomTwo()
    addRandomTwo()
    mat_set()
}

function updateBoxColors() {
    const colors = {
        '': { backgroundColor: '#d3d3d3', color: 'black' },
        '2': { backgroundColor: '#FCFFF7', color: 'black' },
        '4': { backgroundColor: '#FEDA8F', color: 'black' },
        '8': { backgroundColor: '#FCCD6C', color: 'black' },
        '16': { backgroundColor: '#FAC043', color: 'black' },
        '32': { backgroundColor: '#F5B130', color: 'black' },
        '64': { backgroundColor: '#F0A31F', color: 'black' },
        '128': { backgroundColor: '#EA9128', color: 'black' },
        '256': { backgroundColor: '#E4802F', color: 'black' },
        '512': { backgroundColor: '#DF6F35', color: 'black' },
        '1024': { backgroundColor: '#D95D38', color: 'black' },
        '2048': { backgroundColor: '#ef9816', color: 'white' }
    }
    
    boxDivs.forEach(box => {
        const color = colors[box.innerHTML] || colors['']
        box.style.backgroundColor = color.backgroundColor
        box.style.color = color.color
    })
}

updateBoxColors()

// Matches the matrix with container
function mat_set() {
    let index = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            boxDivs[index].innerHTML = mat[i][j] !== 0 ? mat[i][j].toString() : ''
            index++
        }
    }
    updateBoxColors()
}

mat_set()

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
        
        // compress matches [Left]
        for (let j = 0; j < 4; j++) {
            if (mat[i][j] !== undefined && mat[i][j] === mat[i][j + 1]) {
                mat[i][j + 1] *= 2
                mat[i].splice(j, 1)
            }
        }
        
        // add zeros
        rowLength = mat[i].length
        for (let k = 0; k < 4 - rowLength; k++) {
            mat[i].push(0)
        }
    }
}

function moveRight() {
    for (let i = 0; i < 4; i++) {
        // remove zeros
        for (let j = 3; j >= 0; j--) {
            if (mat[i][j] == 0) {
                mat[i].splice(j, 1)
            }
        }
        
        // compress matches [Right]
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
            mat[i].unshift(0)
        }
    }
}

// return 0 -> Ongoing
// return 1 -> Won
// return 2 -> Lost 
function gameState() {
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mat[i][j] == 2048) {
                return 1
            }
        }
    }
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mat[i][j] == 0 || 
                (j != 3 && mat[i][j] == mat[i][j + 1]) || 
                (i != 3 && mat[i][j] == mat[i + 1][j])) {
                return 0
            }
        }
    }
    
    return 2
}

function toggleTextAnimation() {
    const restartText = document.querySelector('.restartText')
    if (!restartText.classList.contains('restartText_animation')) {
        restartText.classList.add('restartText_animation')
    } else {
        restartText.classList.remove('restartText_animation')
    }
}

function startLetterAnimation() {
    const numbers = ['2', '0', '4', '8']
    
    numbers.forEach(number => {
        const element = document.querySelector(`.num_${number}`)
            element.classList.add('animateAll', `animate_${number}`)
        }
    )
}

function finishLetterAnimation() {
    const numbers = ['2', '0', '4', '8']
    
    numbers.forEach(number => {
        const element = document.querySelector(`.num_${number}`)
            element.classList.remove('animateAll', `animate_${number}`)
        }
    )
}


const randomColors = [
    "rgb(255, 165, 000)",
    "rgb(255, 255, 102)",
    "rgb(255, 128, 171)",
    "rgb(255, 192, 203)",
    "rgb(102, 178, 255)",
    "rgb(102, 255, 102)",
    "rgb(255, 153, 204)",
    "rgb(255, 255, 153)",
    "rgb(204, 153, 255)",
    "rgb(255, 204, 102)",
    "rgb(255, 204, 153)",
    "rgb(255, 255, 153)",
    "rgb(102, 255, 178)",
    "rgb(102, 178, 255)",
    "rgb(102, 178, 255)",
    "rgb(255, 128, 171)",
]

let intervalId

function startColorAnimation() {
    const elements = document.querySelectorAll('.animateAll')
    
    intervalId = setInterval(() => {
        elements.forEach(letter => {
            const color = randomColors[Math.floor(Math.random() * randomColors.length)]
            letter.style.color = color
        })
    }, 300) // Change every 300ms
}

function stopColorAnimation() {
    clearInterval(intervalId)
}

function winningSequence() {
    startLetterAnimation()
    toggleTextAnimation()
    startColorAnimation()
}

let gameFinished = false
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase()
    const actions = {
        'w': moveUp,    'arrowup': moveUp,      
        's': moveDown,  'arrowdown': moveDown,  
        'a': moveLeft,  'arrowleft': moveLeft,  
        'd': moveRight, 'arrowright': moveRight
    }
    
    if (gameFinished) {
        gameFinished = false
        resetBoxDivs()
        toggleTextAnimation()
        finishLetterAnimation()
        stopColorAnimation()
    }
    
    else if (actions[key] && !gameFinished) {
        actions[key]()
        console.log(mat)
        if (gameState() == 1) {
            gameFinished = true
            winningSequence()
        } else if (gameState() == 2) {
            gameFinished = true
            toggleTextAnimation()
        }
        addRandomTwo()
        mat_set()
    }
})