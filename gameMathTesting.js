var cons = [];
var nodes = [];
var btnN = null;
var btnC = null;
var btnClear = null;
var btnClearN = null;
var mouseMode = ""; // "creatingCon", movingStuff
var moved = null;
var conCreator = []
function setup() {
createCanvas(1000, 1000);
createNode();
createNode();
btnN = createButton("createNode");
btnN.mousePressed(createNode);
btnC = createButton("createCon");
btnC.mousePressed(createCon);
btnClear = createButton("Clear Cons");
btnClear.mousePressed(function(){cons = []});
btnClearN = createButton("Clear Nodes");
btnClearN.mousePressed(function(){nodes = []});
}
function draw() {
  background(0);
  console.log(cons.length);
  stroke("green");
  if(moved != null){
    moved.x = mouseX;
    moved.y = mouseY;
  }
  for(var i = 0; i < nodes.length; i++){
    ellipse(nodes[i].x, nodes[i].y, 50);
  }
  for(var i = 0; i < cons.length; i++){
    line(cons[i][0].x, cons[i][0].y, cons[i][1].x, cons[i][1].y);
  }
}
function node(){
  this.x = random(width);
  this.y = random(height);
}
function isBetween(a, b1, b2){
  return ((b1 > a && b2 < a) || (b1 < a && b2 > a))
}
function mouseReleased(){
  if(isBetween(mouseX, 0, width) && isBetween(mouseY, 0 , height)){
  if(mouseMode != "creatingCon"){
    if(moved == null){
      var values = [];
      for(var i = 0; i < nodes.length; i++){
        values.push(dist(nodes[i].x, nodes[i].y, mouseX, mouseY));
      }
      m = min(values);
      for(var i = 0; i < nodes.length; i++){
        if(dist(nodes[i].x, nodes[i].y, mouseX, mouseY) <= m){
          moved = nodes[i];
        }
      }
    }
    else {
      moved = null;
    }
  }
  else{
    if(conCreator.length == 0){
       var values = [];
      for(var i = 0; i < nodes.length; i++){
        values.push(dist(nodes[i].x, nodes[i].y, mouseX, mouseY));
      }
      m = min(values);
      for(var i = 0; i < nodes.length; i++){
        if(dist(nodes[i].x, nodes[i].y, mouseX, mouseY) <= m){
          conCreator.push(nodes[i]);
        }
      }
    }
    else {
         var values = [];
        for(var i = 0; i < nodes.length; i++){
          values.push(dist(nodes[i].x, nodes[i].y, mouseX, mouseY));
        }
        m = min(values);
        for(var i = 0; i < nodes.length; i++){
          if(dist(nodes[i].x, nodes[i].y, mouseX, mouseY) <= m){
            conCreator.push(nodes[i]);
            if(conCreator[0] != conCreator[1]){
            cons.push(conCreator);
            }
            conCreator = [];
            mouseMode = "";
          }
        }
      }
    }
  }
  }
function createNode(){
  nodes.push(new node());
}
function createCon(){
  mouseMode = "creatingCon";
}