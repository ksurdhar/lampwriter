// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.serializeJSON
//= require jquery_ujs
//= require jquery-color-2.1.2
//= require bootstrap
//= require turbolinks
//= require underscore
//= require backbone
//= require lampwriter
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .

$(document).ready(function(){
  var state = true;
    $( "#toggler" ).click(function() {
      if ( state ) {
        $( "body" ).animate({
          backgroundColor: "#2F3238",
          color: "#fff"
        }, 1000 );
      } else {
        $( "body" ).animate({
          backgroundColor: "#FFFFF0",
          color: "#000"
        }, 1000 );
      }
      state = !state;
    });
});

window.onload = function(){
  //canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  
  //snowflake particles
  var mp = 25; //max particles
  var particles = [];
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, //x-coordinate
      y: Math.random()*H, //y-coordinate
      r: Math.random()*4+1, //radius
      d: Math.random()*mp //density
    })
  }
  
  //Lets draw the flakes
  function draw()
  {
    ctx.clearRect(0, 0, W, H);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }
  
  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update()
  {
    angle += 0.01;
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x += Math.sin(angle) * 2;
      
      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if(p.x > W+5 || p.x < -5 || p.y > H)
      {
        if(i%3 > 0) //66.67% of the flakes
        {
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
        else
        {
          //If the flake is exitting from the right
          if(Math.sin(angle) > 0)
          {
            //Enter from the left
            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
          }
          else
          {
            //Enter from the right
            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
          }
        }
      }
    }
  }
  
  //animation loop
  setInterval(draw, 33);
}

// window.onload = function(){
//   var canvas = document.getElementById("canvas");
//   var ctx = canvas.getContext("2d");
  
//   //Make the canvas occupy the full page
//   var W = 100, H = 120;
//   canvas.width = W;
//   canvas.height = H;
  
//   var particles = [];
//   var mouse = {};
  
//   //Lets create some particles now
//   var particle_count = 40;
//   for(var i = 0; i < particle_count; i++)
//   {
//     particles.push(new particle());
//   }
  
//   function particle()
//   {
//     //speed, life, location, life, colors
//     //speed.x range = -2.5 to 2.5 
//     //speed.y range = -15 to -5 to make it move upwards
//     //lets change the Y speed to make it look like a flame
//     this.speed = {x: -2.5+Math.random()*1, y: -10+Math.random()*10};
    
//     this.location = {x: W/2, y: H-20 };
//     //radius range = 10-30
//     this.radius = 10+Math.random()*3;
//     //life range = 20-30
//     this.life = 20+Math.random()*3;
//     this.remaining_life = this.life;
//     //colors
//     this.r = Math.round(Math.random()*230);
//     this.g = Math.round(Math.random()*70);
//     this.b = Math.round(Math.random()*30);
//   }
  
//   function draw()
//   {
//     //Painting the canvas black
//     //Time for lighting magic
//     //particles are painted with "lighter"
//     //In the next frame the background is painted normally without blending to the 
//     //previous frame
//     ctx.globalCompositeOperation = "source-over";
//     ctx.fillStyle = "#2F3238";
//     ctx.fillRect(0, 0, W, H);
//     ctx.globalCompositeOperation = "lighter";
    
//     for(var i = 0; i < particles.length; i++)
//     {
//       var p = particles[i];
//       ctx.beginPath();
//       //changing opacity according to the life.
//       //opacity goes to 0 at the end of life of a particle
//       p.opacity = Math.round(p.remaining_life/p.life*100)/100
//       //a gradient instead of white fill
//       var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
//       gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
//       gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
//       gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
//       ctx.fillStyle = gradient;
//       ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
//       ctx.fill();
      
//       //lets move the particles
//       p.remaining_life--;
//       p.radius--;
//       p.location.x += p.speed.x;
//       p.location.y += p.speed.y;
      
//       //regenerate particles
//       if(p.remaining_life < 0 || p.radius < 0)
//       {
//         //a brand new particle replacing the dead one
//         particles[i] = new particle();
//       }
//     }
//   }
  
//   setInterval(draw, 40);
// }