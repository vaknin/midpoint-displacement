//#region Canvas Initialization
const canvas:HTMLCanvasElement = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
//#endregion

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }
}

const rand = (min:number, max:number) => {
    return Math.random() * (max-min) + min
}

const draw_background = () => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
}

const calculate_distance = (p1:Point, p2:Point) => {
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
}

const displace_midpoint = (points:Point[], random_coefficient:number) => {

    const new_points = points.slice();

    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        const prev_point = points[i-1];
        const x_midpoint = (point.x + prev_point.x) / 2;
        const y_midpoint = (point.y + prev_point.y) / 2;

        const new_point_y = Math.max(ceiling, Math.min(y_midpoint + rand(-random_coefficient, random_coefficient), point_1.y));
        const new_point = new Point(x_midpoint, new_point_y);
        new_points.splice(i+i-1, 0, new_point);
    }
    random_coefficient *= 0.52;

    return {
        points: new_points,
        coefficient: random_coefficient
    }
}

const ceiling = 0;
const floor = 0;
const point_2 = new Point(canvas.width, rand(canvas.height, floor));
const point_1 = new Point(0, Math.max(rand(canvas.height, floor), point_2.y));
let random_coefficient = canvas.height;

const draw = () => {

    draw_background()

    let points = [point_1, point_2];


    // Displace
    for (let i = 0; i < 15; i++) {
        const res = displace_midpoint(points, random_coefficient);
        points = res.points;
        random_coefficient = res.coefficient;
    }
    console.log(random_coefficient)

    // Predraw
    ctx.beginPath();
    ctx.strokeStyle = "#fff"; // Important
    ctx.lineWidth = 1; // Important

    // Make lines
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
    }

    // Stroke
    ctx.stroke();
    ctx.closePath();
}

draw()

// const loop = () => {
//     draw_background()

//     window.requestAnimationFrame(loop)
// }

// window.requestAnimationFrame(loop)