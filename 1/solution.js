const [a,b] = (await (await fetch('https://adventofcode.com/2024/day/1/input')).text()).trim().split('\n').map(l => l.trim().split(/\s+/).map(s=>parseInt(s))).reduce((lists,[a,b])=>[[...lists[0],a],[...lists[1],b]],[[],[]]);
const [sa,sb] = [a,b].map(arr=>arr.toSorted((a,b)=>a-b));
const solution1 = sa.reduce((sumDist, a, i) => sumDist + Math.abs(a-sb[i]),0);

const counts = b.reduce((counts, b) => ({...counts, [b]: 1 + (counts[b] || 0)}), {}); 
const solution2 = a.reduce((sum, a) => sum + a * (counts[a] || 0), 0);
