// This function gives a number between a specified range
// Input:
//    lower - the lower value of the range
//    upper - the upper value of the range
function randomNum(lower, upper) {
    let num = lower + Math.random()*(upper-lower);
    return num;
  }
  
  function makeRGB(redInputvalue, greenInputvalue, blueInputvalue) {
    let redOutputvalue = redInputvalue ?? Math.round(Math.random()*(255));
    let greenOutputvalue = greenInputvalue ?? Math.round(Math.random()*(255));
    let blueOutputvalue = blueInputvalue ?? Math.round(Math.random()*(255));
    //Now we define a string and pass these output values into a string. 
    return `rgb(${redOutputvalue},${greenOutputvalue},${blueOutputvalue})`
  }
  // This function creates a white circle SVG element
  // Input:
  //    x - the x-position
  //    y - the y-position
  //    radius - the radius of the circle
  function makeCircle(x, y, radius,r,g,b) {
    let C = makeRGB(r,g,b);
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", C);
    return circle;
  }
  