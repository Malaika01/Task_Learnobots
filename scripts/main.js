// Pre-defined expression list with their correctness
const expressionsList = [
    { expression: "3 > 4", isCorrect: false },
    { expression: "5 != 6", isCorrect: true },
    { expression: "100 < 200", isCorrect: true },
    { expression: "10 + 5 == 15", isCorrect: true },
    { expression: "2 * 2 < 5", isCorrect: true },
    { expression: "6 / 2 == 3", isCorrect: true },
    { expression: "8 + 2 > 10", isCorrect: false },
    { expression: "7 - 3 < 3", isCorrect: false },
    { expression: "5 * 5 < 10", isCorrect: false },
    { expression: "12 % 3 == 0", isCorrect: true },
    { expression: "14 % 5 == 0", isCorrect: false },
    { expression: "9 + 6 > 10", isCorrect: true },
    { expression: "4^2 == 16", isCorrect: true },
    { expression: "sqrt(16) == 4", isCorrect: true },
    { expression: "20 / 5 + 2 == 6", isCorrect: true },
    { expression: "(2 + 2) * 2 == 8", isCorrect: true },
    { expression: "10 + 2 - 5 * 2 == 2", isCorrect: true },
    { expression: "18 / 2 - 4 > 5", isCorrect: true },
    { expression: "5 + 5 == 11", isCorrect: false },
    { expression: "3^3 < 20", isCorrect: false },
    { expression: "(5 + 5) * (2 + 3) == 50", isCorrect: true },
    { expression: "sqrt(36) + 6 == 12", isCorrect: true },
    { expression: "15 % 4 > 2", isCorrect: true },
    { expression: "12 * 2 - 24 == 0", isCorrect: true },
    { expression: "45 / 9 + 1 == 6", isCorrect: true }
];

let currentExpressionIsCorrect = false; //Flag initially set false
let currentExpressionIndex = 0;
let num_score=0
window.onload = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 2) / window.innerHeight, 0.1, 1000); //Three.js scene object
    const renderer = new THREE.WebGLRenderer(); //Render scene using webGL
    renderer.setSize(window.innerWidth / 2, window.innerHeight); 
    renderer.domElement.style.position = 'absolute'; 
    renderer.domElement.style.right = '0px';


    document.getElementById('threeJsContainer').appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create a mesh with the geometry and material, then add it to the scene
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x-=1.5
    camera.position.z = 5;
    const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube2 = new THREE.Mesh(geometry, material2);
    scene.add(cube2);
    cube2.position.x += 1.5;

    //Display first expression
    displayFirstExpression();

    const runCodeButton = document.getElementById('runCode');
    const expressionDisplay = document.getElementById('expressionDisplay');
    const expressionResult = document.getElementById('expressionResult');
    const score = document.getElementById('score');
    // Attach event listener to the button
    runCodeButton.addEventListener('click', () => {
        runBlocklyCode(); // Call the function to execute Blockly code
        const currentExpression = expressionsList[currentExpressionIndex].expression;// Get the current expression and update the display element
        expressionDisplay.innerText = currentExpression; 
        score.innerText=num_score
        currentExpressionIndex = (currentExpressionIndex + 1) % expressionsList.length;
    });



window.runBlocklyCode = () => {
    var code = Blockly.JavaScript.workspaceToCode(workspace);// Retrieve code from Blockly workspace
    console.log(code)
    try {
        eval(code);//Evaluate Blockly workspace code
    } catch (error) {
        console.error('Error executing Blockly code:', error);
    }
};


//Function to evaluate if the move made is correct or not
function evaluateMove(isGreenCubeMoved) {

    currentExpressionIsCorrect = expressionsList[currentExpressionIndex].isCorrect;

    if ((isGreenCubeMoved && currentExpressionIsCorrect) || (!isGreenCubeMoved && !currentExpressionIsCorrect)) {
        expressionResult.innerText="Correct Move"
        num_score+=1
    } else {
        expressionResult.innerText="Incorrect Move"
        num_score-=1
    }
}


//Function to display first expression
function displayFirstExpression() {
    const currentExpression = expressionsList[currentExpressionIndex].expression;
    document.getElementById('expressionDisplay').innerText = currentExpression;
}

//Function to move Green cube
function moveCube(direction, units) {
    switch (direction) {
      case 'UP':
        cube.position.y += units;
        break;
      case 'DOWN':
        cube.position.y -= units;
        break;
      default:
        break;
    }
    evaluateMove(true) 
}

//Function to move Red cube
function moveRedCube(direction, units) {
    switch (direction) {
        case 'UP':
            cube2.position.y += units; // Use cube2 for the red cube
            break;
        case 'DOWN':
            cube2.position.y -= units;
            break;
        default:
            console.log("Invalid direction for red cube");
            break;
    }
    evaluateMove(true)
}


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();// Start the animation loop
};
