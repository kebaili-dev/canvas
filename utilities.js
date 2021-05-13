/**
 * Renvoie un nombre aléatoire entre min et max
 * 
 * @param int min Le nombre minimum
 * @param int max Le nombre maximum
 * @return int Un nombre compris entre min et max
 */
function getRandomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}