const h = 1000;
const w = 1000;

const linkLength = 200;
const xTranspose = w / 2;
const yTranspose = h / 2;

function setup() {
    createCanvas(w, h);
    background(51);
    updateCoordinates(xTranspose, yTranspose - 1);
}

function mousePressed() {
    updateCoordinates(mouseX, mouseY);
}

function mouseDragged() {
    updateCoordinates(mouseX, mouseY);
}

function updateCoordinates(mouX, mouY) {

    const xFinal = mouX - xTranspose;
    const yFinal = mouY - yTranspose;
    const d = Math.sqrt(xFinal * xFinal + yFinal * yFinal);

    if (d < 2 * linkLength) {

        const theta1 = Math.atan(xFinal / yFinal);
        const theta2 = Math.acos(d / (2 * linkLength));
        let xMiddle = linkLength * Math.cos(theta1 + theta2);
        let yMiddle = linkLength * Math.sin(theta1 + theta2);

        let angle1;
        let angle2;
        let angle3;

        let line_x1 = xTranspose;
        let line_y1 = yTranspose;
        let line_x2;
        let line_y2;
        let line_x3 = xFinal + xTranspose;
        let line_y3 = yFinal + yTranspose;

        if (yFinal < 0) {
            line_x2 = -yMiddle + xTranspose;
            line_y2 = -xMiddle + yTranspose;
        }

        else {
            line_x2 = yMiddle + xTranspose;
            line_y2 = xMiddle + yTranspose;
        }

        angle1 = angleOfLines(line_x1, line_y1, line_x2, line_y2);
        angle2 = angleOfLines(line_x2, line_y2, line_x3, line_y3);
        angle3 = 180 - angle1 + angle2;

        background(51);

        // Boundary Region            
        stroke(0, 255, 255);
        strokeWeight(1)
        fill(100);
        ellipse(xTranspose, yTranspose, 4 * linkLength, 4 * linkLength);

        // Draw Angle Arc
        stroke(255, 0, 0);
        fill(0, 255, 0);
        strokeWeight(1);
        arc(line_x1, line_y1, 50, 50, - radiansFromDegrees(angle1), 0);
        arc(line_x2, line_y2, 50, 50, - radiansFromDegrees(angle2), radiansFromDegrees(angle3 - angle2));

        // Connecting Rods
        strokeWeight(2);
        stroke(255);
        line(line_x1, line_y1, line_x2, line_y2);
        line(line_x2, line_y2, line_x3, line_y3);

        // Joints
        strokeWeight(10);
        stroke(255, 0, 0);
        point(line_x2, line_y2);
        point(line_x3, line_y3);
        point(line_x1, line_y1);

        // Angle Calculated Result
        stroke(255);
        strokeWeight(1);
        textSize(32);
        fill(255);
        text("Joint1: " + angle1.toFixed(0), 0, h - 64);
        text("Joint2: " + angle3.toFixed(0), 0, h - 32);
        text("Position X: " + xFinal.toFixed(0), 0, h - 96);
        text("Position Y: " + -yFinal.toFixed(0), 0, h - 96 - 32);
    }
}

function degreesFromRadians(rad) {
    let deg = rad * 180 / Math.PI;
    return deg;
}

function radiansFromDegrees(deg) {
    let rad = deg * Math.PI / 180;
    return rad;
}

function angleOfLines(x1, y1, x2, y2) {
    if (y1 > y2) {
        let angle = Math.atan((x2 - x1) / (y2 - y1));
        angle = degreesFromRadians(angle);
        return 90 + angle;
    }

    else {
        let angle = Math.atan((x2 - x1) / (y2 - y1));
        angle = degreesFromRadians(angle);
        return 90 + angle - 180;
    }
}
