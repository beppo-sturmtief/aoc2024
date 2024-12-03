const muls = [...(await (await fetch('https://adventofcode.com/2024/day/3/input')).text()).trim().matchAll(/mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)/g)].flat();
const factors = muls.map(mul=>mul.split(/[(),]/).slice(1,3).map(i=>parseInt(i)));
const solution1 = factors.reduce((sum,[a,b])=>sum+a*b, 0);

const mulsAndDos = [...(await (await fetch('https://adventofcode.com/2024/day/3/input')).text()).trim().matchAll(/mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)|do\(\)|don't\(\)/g)].flat();
const filteredMuls = mulsAndDos.reduce(({doo, muls}, mad)=>mad=='do()'?{doo:true, muls}:mad=='don\'t()'?{doo:false,muls}:doo?{doo, muls:[...muls, mad]}:{doo,muls},{doo: true,muls:[]}).muls;
const filteredFactors = filteredMuls.map(mul=>mul.split(/[(),]/).slice(1,3).map(i=>parseInt(i)));
const solution2 = filteredFactors.reduce((sum,[a,b])=>sum+a*b, 0);
