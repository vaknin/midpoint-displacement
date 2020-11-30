//#region Canvas Initialization
var canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
//#endregion
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var rand = function (min, max) {
    return Math.random() * (max - min) + min;
};
var draw_background = function (color) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
var draw_space = function () {
    var draw_stars = function (amount, size, color) {
        if (color === void 0) { color = "#fff"; }
        for (var i = 0; i < amount; i++) {
            var radius = rand(0.01, size);
            var pos_x = Math.random() * (canvas.width - radius) + radius;
            var pos_y = Math.random() * (canvas.height - radius) + radius;
            ctx.beginPath();
            ctx.arc(pos_x, pos_y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    };
    var draw_trail = function () {
        var start_point = new Point(rand(0, canvas.width), rand(0, canvas.height - mountains_seed));
        var angle = rand(0, 2 * Math.PI);
        while ((angle > Math.PI / 4 && angle < 3 * Math.PI / 4) || (angle > 5 * Math.PI / 4 && angle < 7 * Math.PI / 4)) {
            angle = rand(0, 2 * Math.PI);
        }
        var length = rand(150, 250);
        var end_point = new Point(start_point.x + (Math.cos(angle) * length), start_point.y + (Math.sin(angle) * length));
        ctx.beginPath();
        ctx.moveTo(start_point.x, start_point.y);
        ctx.lineTo(end_point.x, end_point.y);
        ctx.closePath();
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = .1;
        ctx.stroke();
    };
    draw_stars(7000, 0.3, '#fff'); // Small stars
    draw_stars(3000, 1, '#fff'); // Big stars
    draw_stars(1000, 0.3, 'magenta'); // Small purple stars
    draw_trail();
};
var calculate_distance = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
var displace_midpoint = function (points, random_coefficient) {
    var new_points = points.slice();
    for (var i = 1; i < points.length; i++) {
        var point = points[i];
        var prev_point = points[i - 1];
        var x_midpoint = (point.x + prev_point.x) / 2;
        var y_midpoint = (point.y + prev_point.y) / 2;
        var new_point_y = Math.max(ceiling, Math.min(y_midpoint + rand(-random_coefficient, random_coefficient), point_1.y));
        var new_point = new Point(x_midpoint, new_point_y);
        new_points.splice(i + i - 1, 0, new_point);
    }
    random_coefficient *= rand(0.35, 0.6);
    return {
        points: new_points,
        coefficient: random_coefficient
    };
};
var ceiling = 50;
var floor = 0;
var displacements = 12;
var mountains_seed = 300;
var point_2 = new Point(canvas.width, rand(canvas.height, canvas.height));
var point_1 = new Point(0, Math.max(rand(canvas.height, floor), point_2.y));
var draw_mountains = function (amount, random_coefficient) {
    var original_random_coefficient = random_coefficient;
    for (var i = 0; i < amount; i++) {
        var points = [point_1, point_2];
        random_coefficient = original_random_coefficient * rand(0.05, 2.5);
        // Displace
        for (var i_1 = 0; i_1 < 12; i_1++) {
            var res = displace_midpoint(points, random_coefficient);
            points = res.points;
            random_coefficient = res.coefficient;
        }
        // Predraw
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        var color0 = rand(31, 35);
        var color1 = rand(31, 35);
        var color2 = rand(31, 35);
        ctx.fillStyle = "rgb(" + color0 + ", " + color1 + ", " + color2 + ")";
        ctx.lineWidth = 0.5;
        // Make lines
        ctx.moveTo(points[0].x, points[0].y);
        for (var i_2 = 1; i_2 < points.length; i_2++) {
            ctx.lineTo(points[i_2].x, points[i_2].y);
        }
        // Stroke
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
};
draw_background('#000');
draw_space();
draw_mountains(100, mountains_seed);
// const loop = () => {
//     draw_background()
//     window.requestAnimationFrame(loop)
// }
// window.requestAnimationFrame(loop)
