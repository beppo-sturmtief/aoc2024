const field = (await (await fetch('https://adventofcode.com/2024/day/4/input')).text()).trim().split('\n').map(r=>r.split(''));
let xmasCount = 0;
for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[0].length; x++) {
        if (field[y][x] !== 'X') continue;
        
        if (x+3 < field[0].length && field[y][x+1]=='M' && field[y][x+2]=='A' && field[y][x+3]=='S') xmasCount++;
        if (x>2 && field[y][x-1]=='M' && field[y][x-2]=='A' && field[y][x-3]=='S') xmasCount++;
        if (y+3 < field.length && field[y+1][x]=='M' && field[y+2][x]=='A' && field[y+3][x]=='S') xmasCount++;
        if (y>2 && field[y-1][x]=='M' && field[y-2][x]=='A' && field[y-3][x]=='S') xmasCount++;
        if (x+3 < field[0].length && y+3 < field.length && field[y+1][x+1]=='M' && field[y+2][x+2]=='A' && field[y+3][x+3]=='S') xmasCount++;
        if (x>2 && y>2 && field[y-1][x-1]=='M' && field[y-2][x-2]=='A' && field[y-3][x-3]=='S') xmasCount++;
        if (x+3 < field[0].length && y>2 && field[y-1][x+1]=='M' && field[y-2][x+2]=='A' && field[y-3][x+3]=='S') xmasCount++;
        if (x>2 && y+3 < field.length && field[y+1][x-1]=='M' && field[y+2][x-2]=='A' && field[y+3][x-3]=='S') xmasCount++;
    }
}
const solution1 = xmasCount;

let masCount = 0;
for (let y = 1; y < field.length-1; y++) {
    for (let x = 1; x < field[0].length-1; x++) {
        if (field[y][x] !== 'A') continue;
        const nw = field[y-1][x-1],
            n = field[y-1][x],
            ne = field[y-1][x+1],
            w = field[y][x-1],
            e = field[y][x+1],
            sw = field[y+1][x-1],
            s = field[y][x],
            se = field[y+1][x+1];
        const diags = ((nw=='M' && se=='S') || (nw=='S' && se=='M')) && ((ne=='M' && sw=='S') || (ne=='S' && sw=='M'));
        const horvert = ((w=='M' && e=='S') || (w=='S' && e=='M')) && ((n=='M' && s=='S') || (n=='S' && s=='M'));
        if (diags || horvert) masCount++;
    }
}
const solution2 = masCount;
