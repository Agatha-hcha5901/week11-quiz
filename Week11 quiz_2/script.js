/* 
  Particle class definition 
  Inputs: 
    xPos - the initial x-position of the circle
    yPos - the initial y-position of the circle
    radius - the size of the circle
  Instances of this class create circles of size (radius) that travel in random directions
  from an x-position (xPos) and a y-position (yPos)
*/


class Particle {
    constructor(xPos, yPos, radius) {
      /* 
        Properties are defined so a persistent value can be used within the class instance
        the following properties are initialised with the values passed into the constructor
      */
      this.x = xPos;
      this.y = yPos;
      this.r = radius;
  
      /* 
        This property will hold the circle SVG element so we can add
        the <animate> elements to it later
      */
      this.svgElement;
  
      /* 
        this.animDuration determines how
        fast the particle will travel from the initial position
        to the target position
      */
      this.animDuration = randomNum(3, 5   );
  
      // Create target x and y positions
      this.targetX = randomNum(0, width);
      this.targetY = randomNum(0, height);
  
    }
    
    /*  
      This method creates a circle element
      then appends to our SVG element
      then calls the addAnimateX and addAnimateY methods
    */
    drawParticle() {
      this.svgElement = makeCircle(this.x, this.y, this.r);
      svg.appendChild(this.svgElement);
      this.addAnimateX();
      this.addAnimateY();
      this.addGravity();
    }
    drawParticles() {
      this.svgElement = makeCircle(this.x, this.y, this.r);
      svg.appendChild(this.svgElement);
      this.addAnimatecX();
      // this.addAnimateY()
      // this.addGravity();
    }
    
    
    /*
      This method creates an animate element for the 'cx' attribute of the circle
      and appends it to this.svgElement which contains our circle element.
      <animate> reference: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
    */
    addAnimateX() {
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
  
      /*
        The <animate> element uses an attribute called 'attributeName' 
        where we specify which attribute we want to animate.
        In this case, we want to animate 'cx' of our circle element
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/attributeName
      */
      animElement.setAttribute('attributeName', 'cx');
  
      /* 
        <animate> uses the 'values' attribute where we specify
        what values we're giving to the animated property in 'attributeName'.
        In this case, we want the 'cx' property to animate from 'this.x' to 'this.targetX'
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/values
      */
      animElement.setAttribute('values', `${this.x}; ${this.targetX};`);
      //animElement.setAttribute('values', `${this.x}; 100;200;300;400;300;200;100`);
  
      /*
        The 'dur' attribute of the <animate> element 
        specifies how long it will take (in seconds) to go from
        one value to the next, as specified in the 'values' property above.
        Here we are setting the duration to 'this.animDuration'
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dur
      */
      animElement.setAttribute('dur', `${this.animDuration}`);
  
      /*
        'repeatCount' specifies how many times we repeat the animation.
        Here we are repeating the animation indefinitely
        https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/repeatCount
      */
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
  
    addAnimatecX() {
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName', 'cx');
  
      //animElement.setAttribute('values', `${this.x}; ${this.targetX};`);
      animElement.setAttribute('values', `${this.x}; 0; 3000; 700;300;100;7000;0`);
  
      animElement.setAttribute('dur', `${this.animDuration}`);
  
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
    /*
      This method creates an animate element for the 'cy' attribute of the circle
      It's very similar to the addAnimateX() method by for the y-position of the circle
    */
    addAnimateY() {
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName', 'cy');
      animElement.setAttribute('values', `${this.y}; ${this.targetY};`);
  
      animElement.setAttribute('dur', `${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
  
    addGravity(){
      let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animElement.setAttribute('attributeName', 'cy');
  //particles fall to the bottom of the canvas
  //I want it to go up first, then down like a fountain 
      animElement.setAttribute('values', `${this.y}; 300;400;1000`);
      animElement.setAttribute('dur', `${this.animDuration}`);
      animElement.setAttribute('repeatCount', 'indefinite');
      this.svgElement.appendChild(animElement);
    }
    }
  ////////////////////////////////////////////////////////////////////////
  
  /*
    This function creates an array of instances from the Particles class
    Input: 
      num - the number of instances or particles we want on the screen
  */
  function createParticlesArray(num) {
    let particleInstances = [];
  
    for (let i = 0; i < num; i++) {
      // Initialise the particle positions to be in the middle of the SVG canvas
      let particleX = width/2;
      let particleY = height/2;
  
      /* 
        Multiplying width by some number will allow
        particleSize to scale with the width of the canvas
      */
      let particleSize = randomNum(width * 0.001, width * 0.003);
  
      // Push or add to the end of the particleInstances array
      particleInstances.push(new Particle(particleX, particleY, particleSize));
    }
  
    return particleInstances;
  }
  ////////////////////////////////////////////////////////////////////////
  
  
  // Initialise width to be the width of the browser window
  let width = window.innerWidth;
  // Initialise height to be the height of the browser window
  let height = window.innerHeight;
  // Using window.innerWidth/window.innerHeight allows our 
  // SVG canvas to accommodate the size of our browser
  
  // Get reference to the SVG element in our html file
  const svg = document.getElementById("canvas");
  
  // Set the attributes of our SVG element
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("style", "background-color: black");
  
  // Call our createParticlesArray() function to create the
  // array of Particle instances
  let particles = createParticlesArray(100);
  
  // For every Particle instance in our array
  // call the drawParticle() method
  for (let particle of particles) {
    particle.drawParticle();
    particle.drawParticles();
    
  }