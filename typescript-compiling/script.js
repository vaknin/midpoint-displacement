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
var draw_background = function () {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
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
    random_coefficient *= 0.52;
    return {
        points: new_points,
        coefficient: random_coefficient
    };
};
var ceiling = 0;
var floor = 0;
var point_2 = new Point(canvas.width, rand(canvas.height, floor));
var point_1 = new Point(0, Math.max(rand(canvas.height, floor), point_2.y));
var random_coefficient = canvas.height;
var draw = function () {
    draw_background();
    var points = [point_1, point_2];
    // Displace
    for (var i = 0; i < 15; i++) {
        var res = displace_midpoint(points, random_coefficient);
        points = res.points;
        random_coefficient = res.coefficient;
    }
    console.log(random_coefficient);
    // Predraw
    ctx.beginPath();
    ctx.strokeStyle = "#fff"; // Important
    ctx.lineWidth = 1; // Important
    // Make lines
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    // Stroke
    ctx.stroke();
    ctx.closePath();
};
draw();
// const loop = () => {
//     draw_background()
//     window.requestAnimationFrame(loop)
// }
// window.requestAnimationFrame(loop)
