const [rulesInput, updates] = (await (await fetch('https://adventofcode.com/2024/day/5/input')).text()).trim().split('\n\n').map(p=>p.split('\n').map(l=>l.split(/[^0-9]/).map(i=>parseInt(i))));
const rules = rulesInput.reduce((rules,rule)=>({...rules, [rule[0]]: [...(rules[rule[0]]||[]),rule[1]]}),{});
const solution1 = updates.filter(u=>u.every((v,i)=>rules[v].every(c=>u.slice(0,i).indexOf(c)==-1))).map(u=>u[Math.floor(u.length/2)]).reduce((s,a)=>s+a,0);
const solution2 = updates.filter(u=>!u.every((v,i)=>rules[v].every(c=>u.slice(0,i).indexOf(c)==-1))).map(u=>u.toSorted((a,b)=>rules[a].includes(b)?-1:1)[Math.floor(u.length/2)]).reduce((s,a)=>s+a,0);
