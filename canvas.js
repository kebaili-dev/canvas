'use strict';

// DONNEES
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

// Tableau contenant toutes les couleurs
// Utilisé que pour la version aléatoire
const colors = [
    'red',
    'green',
    'blue',
    'black',
    'pink'
];

// Variable contenant les informations de l'application
const config = {
    // Couleur par défaut
    color: 'forestgreen',
    // Forme par défaut
    shape: 'rectangle'
};
    
// FONCTIONS
function onClearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function onDrawCircles(event)
{
    // event = objet fourni par la fonction addEventListener, représentant l'événement déclénché
    // Il contient des informations sur l'événement
    
    // console.log(event.clientX, event.clientY);   // Position x et y de la souris par rapport au haut de la page
    
    // Position du canvas par rapport au haut de la page
    const boundings = canvas.getBoundingClientRect();
    
    // Position de la souris par rapport au bord haut du canvas
    const mouseLocation = {
        x: event.clientX - boundings.left,
        y: event.clientY - boundings.top
    };
    
    // console.log(mouseLocation.x, mouseLocation.y);
    
    /* ----------- VERSION ALEATOIRE --------- */
    // // Récupération d'un rayon aléatoire compris entre 10 et 50px
    // const radius = getRandomInteger(10, 50);
    
    // // Une couleur aléatoire prise dans le tableau des couleurs
    // const color = colors[getRandomInteger(0, colors.length - 1)];
    
    /* ----------- VERSION PARAMETRABLE --------- */
    // Récupération du rayon à partir de la valeur du champ du formulaire
    const radius = Number(document.querySelector('#radius').value);
    
    // Récupération de la couleur à partir de la valeur du champ déroulant
    const color = document.querySelector('#color').value;
    
    // Récupération de la forme à partir de la valeur du champ déroulant
    const shape = document.querySelector('#shape').value;
    
    // if (shape === 'circle') {
    //     // Dessin du cercle si le champ déroulant a comme valeur "Cercle" 
    //     // aux coordonnées de la souris (récupérées ci-dessus)
    //     drawCircle(context, mouseLocation.x, mouseLocation.y, radius, color);
    // } else if (shape === 'rectangle') {
    //     // Dessin du rectangle si le champ déroulant a comme valeur 'Rectangle'
    //     drawRectangle(context, mouseLocation.x, mouseLocation.y, radius, radius, color);
    // }
    
    switch (config.shape) {
        case 'circle':
            // Dessin du cercle si le champ déroulant a comme valeur "Cercle" 
            // aux coordonnées de la souris (récupérées ci-dessus)
            drawCircle(context, mouseLocation.x, mouseLocation.y, radius, config.color);
            break;
        case 'rectangle':
            // Dessin du rectangle si le champ déroulant a comme valeur 'Rectangle'
            drawRectangle(context, mouseLocation.x, mouseLocation.y, radius, radius, config.color);
            break;
        case 'line':
            drawLine(context, mouseLocation.x, mouseLocation.y, mouseLocation.x + radius, mouseLocation.y + radius, config.color);
            break;
    }
}

function onChooseColor()
{
    // this = élément html sur lequel on a cliqué (une div ici)
    console.log(this);
    
    // Permet de récupérer la valeur de l'attribut data-color
    console.log(this.dataset.color);
    
    // On change la couleur de nos formes avec le data-color
    config.color = this.dataset.color;
    
    // Récupération de la couleur sur laquelle on a cliqué
    // if (this.classList.contains('color-blue')) {
    //     config.color = 'blue';
    // } else if (this.classList.contains('color-red')) {
    //     config.color = 'red';
    // }
}

function onChooseShape()
{
    config.shape = this.dataset.shape;
    console.log(config.shape);
}

function drawCircle(context, x, y, radius, color)
{
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
}

function drawRectangle(context, x, y, width, height, color)
{
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawLine(context, startX, startY, endX, endY, color)
{
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = color;
    context.stroke();
}

/* TODO : Dessiner un cercle de rayon 10px, de couleur rouge dans l'élément canvas (800 sur 600) */

// context.beginPath();
// context.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2, true);
// context.fillStyle = 'red';
// context.fill();

/* TODO : Créer un bouton dans le html qui efface le dessin */
const button = document.querySelector('#clear-canvas');
button.addEventListener('click', onClearCanvas);


/* TODO : Créer un cercle lorsque l'on clique sur le canvas (cercle créé à l'endroit du clic) 
 * Le rayon sera compris entre 10 et 50 (aléatoirement)
 * La couleur sera rouge, bleu, vert ou noir (aléatoirement)
 */
 
/* Etapes

1. Mettre un événement clic sur le canvas
2. Trouver la position (x et y) où on a cliqué (voir sur google)
3. Créer le cercle au moment du clic
4. Récupérer une couleur aléatoire (rouge, bleu, vert ou noir)
4. Récupérer un rayon aléatoire (entre 10 et 50)

*/

// Ajout de l'événement clic sur le canvas
canvas.addEventListener('click', onDrawCircles);

/* TODO : Rendre la couleur et la taille du rayon paramétrable */


/* TODO : Choix de la couleur en cliquant sur des div */
const colorList = document.querySelectorAll('.color');

for (let i = 0; i < colorList.length; i++) {
    colorList[i].addEventListener('click', onChooseColor);
}

/* TODO : Choix de la forme en cliquant sur les boutons */
const shapeList = document.querySelectorAll('.shape');

for (let i = 0; i < shapeList.length; i++) {
    shapeList[i].addEventListener('click', onChooseShape);
}