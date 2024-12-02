const reports = (await (await fetch('https://adventofcode.com/2024/day/2/input')).text()).trim().split('\n').map(l => l.trim().split(/\s+/).map(s=>parseInt(s)));
const isSafe = r => r.reduce(({safe,last,dir},a) => ({safe: safe && ([1,2,3].indexOf((a-last)/dir) > -1), last: a, dir}), { safe: true, dir: (r[0]<r[1]?1:-1), last: r[0]-(r[0]<r[1]?1:-1)}).safe;
const safeReports = reports.filter(isSafe);
const solution1 = safeReports.length;

const dampenedSafeReports = reports.filter(r => isSafe(r) || isSafe(r.slice(1)) || isSafe(r.slice(0,-1)) || Object.keys(r).map(s=>parseInt(s)).slice(1,-1).some(unsafe => isSafe(r.slice(0,unsafe).concat(r.slice(unsafe+1)))));
const dampenedSafeReports2 = reports.filter(r => isSafe(r) || r.some((_,unsafe) => isSafe(r.toSpliced(unsafe,1))));
const solution2 = dampenedSafeReports.length;
