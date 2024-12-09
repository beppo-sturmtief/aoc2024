const field = (await (await fetch('https://adventofcode.com/2024/day/6/input')).text()).trim().split('\n').map(l=>l.split(''));
const visited = field.map(r=>r.map(c=>0));
const width = field[0].length;
const height = field.length;
const dirs = {'<':{x:-1,y:0,id:1},'^':{x:0,y:-1,id:2},'>':{x:1,y:0,id:4},'v':{x:0,y:1,id:8}};
const rotate = ({x,y,id}) => ({x:-y,y:x, id: id==8?1:(id << 1)});
const guardAtStart = field.reduce((guard,row,ri)=>row.reduce((ret,cell,ci)=>dirs[cell]?{x:ci,y:ri,dir:dirs[cell]}:ret,false)||guard,null);
let guard = {...guardAtStart, dir: {...guardAtStart.dir}};

while ((guard.x > -1) && (guard.x < width) && (guard.y > -1) && (guard.y < height)) {
    visited[guard.y][guard.x] |= guard.dir.id;
    if (guard.y+guard.dir.y < 0 || guard.y+guard.dir.y >= height) break;
    guard = (field[guard.y+guard.dir.y][guard.x+guard.dir.x] === '#')
        ? {...guard, dir:rotate(guard.dir)}
        : {x:guard.x+guard.dir.x, y:guard.y+guard.dir.y, dir:guard.dir};
}

const solution1 = visited.reduce((sum,row)=>sum+row.reduce((sum,cell)=>sum+(cell?1:0),0),0);

let solution2 = 0;
for (let y=0;y<height;y++)
    for (let x=0;x<width;x++) {
        if (visited[y][x] == 0) continue;
        const visitedThisTime = field.map(r=>r.map(c=>0));
        let guard = {...guardAtStart, dir: {...guardAtStart.dir}};
        while ((guard.x > -1) && (guard.x < width) && (guard.y > -1) && (guard.y < height)) {
            if (visitedThisTime[guard.y][guard.x] & guard.dir.id) {
                solution2++;
                break;
            }
            visitedThisTime[guard.y][guard.x] |= guard.dir.id;
            if (guard.y+guard.dir.y < 0 || guard.y+guard.dir.y >= height) break;
            guard = (((guard.x+guard.dir.x==x)&&(guard.y+guard.dir.y == y)) || (field[guard.y+guard.dir.y][guard.x+guard.dir.x] === '#'))
                ? {...guard, dir:rotate(guard.dir)}
                : {x:guard.x+guard.dir.x, y:guard.y+guard.dir.y, dir:guard.dir};
        }
    }
