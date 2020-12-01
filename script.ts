//#region Canvas Initialization
const canvas:HTMLCanvasElement = document.querySelector('#canvas');
canvas.width = 3840//window.innerWidth;
canvas.height = 1080//window.innerHeight;
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

const draw_background = (color:string) => {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

const draw_space = () => {

    const draw_stars = (amount, size, color="#fff") => {

        for (let i = 0; i < amount; i++) {
            const radius = rand(0.01, size);
            const pos_x = Math.random() * (canvas.width - radius) + radius;
            const pos_y = Math.random() * (canvas.height - radius) + radius;
            ctx.beginPath();
            ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    const draw_trail = () => {
        const start_point = new Point(rand(0, canvas.width), rand(0, canvas.height-mountains_height_seed));
        // Get a proper random angle
        let angle = rand(0, 2*Math.PI);
        while ((angle > Math.PI / 4 && angle < 3*Math.PI/4) ||(angle > 5*Math.PI/4 && angle < 7*Math.PI/4)) {
            angle = rand(0, 2*Math.PI);
        }
        const length = rand(150, 250);
        const end_point = new Point(start_point.x + (Math.cos(angle) * length), start_point.y + (Math.sin(angle) * length))

        ctx.beginPath();
        ctx.moveTo(start_point.x, start_point.y);
        ctx.lineTo(end_point.x, end_point.y)
        ctx.closePath();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = .1;
        ctx.stroke();
    }

    draw_stars(canvas.width*4, 0.3, '#fff')// Small stars
    draw_stars(canvas.width*2, 1, '#fff')// Big stars
    draw_stars(canvas.width/2, 0.3, 'magenta')// Small purple stars
    for (let i = 0; i < Math.floor(canvas.width/1680); i++) {
        draw_trail()
    }
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
    random_coefficient *= rand(0.35, 0.6);

    return {
        points: new_points,
        coefficient: random_coefficient
    }
}

const ceiling = 50;
const floor = 0;
const displacements = 10;
const mountains_height_seed = canvas.height * 0.7;
const mountains_width_seed = 0.9;
const num_of_mountains = 20;
const point_2 = new Point(canvas.width, rand(canvas.height, canvas.height));
const point_1 = new Point(0, Math.max(rand(canvas.height, floor), point_2.y));

const draw_mountains = (amount:number, random_coefficient:number) => {

    ctx.lineWidth = mountains_width_seed;
    let original_random_coefficient = random_coefficient;
    
    for (let i = 0; i < amount; i++) {
        
        let points = [point_1, point_2];
        random_coefficient = original_random_coefficient * rand(0.6, 1.4);
    
        // Displace
        for (let i = 0; i < displacements; i++) {
            const res = displace_midpoint(points, random_coefficient);
            points = res.points;
            random_coefficient = res.coefficient;
        }

        original_random_coefficient *= 0.9;
    
        // Predraw
        ctx.beginPath();
        ctx.strokeStyle = "#555";
        const color0 = rand(0, 100);
        const color1 = rand(52, 63);
        const color2 = rand(52, 63);
        ctx.fillStyle = `rgb(${color0}, ${color1}, ${color2})`;
        ctx.lineWidth *= 1.1;
        ctx.lineWidth = Math.min(2.5, ctx.lineWidth);
    
        // Make lines
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }
    
        // Stroke
        ctx.closePath();
        ctx.stroke();
        ctx.fill()
    }
}

draw_background(`rgb(${rand(25, 40)},0,${rand(30, 45)})`)
draw_space()
draw_mountains(num_of_mountains, mountains_height_seed);

// Download
// const url = canvas.toDataURL("image/png");
// const a = document.createElement('a');
// document.body.appendChild(a);
// a.download = 'image';
// a.href = url;
// a.click();