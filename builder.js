document.addEventListener("DOMContentLoaded", function(){
    drawGrid();
    document.getElementById('resize-button').addEventListener('click', ()=>{
        resize();
    });
    document.getElementById('solution-button').addEventListener('click', ()=>{
        solution();
    });
});

let myGrid=[];
let randX=0;
let randY=0;
let visited=[];
let width=10;
let height=10;
let maxLength=0;
let directions=[];
let maxDirections=[]
let startX=0;
let startY=0;

function resize(){
    if(document.getElementById('width').value!="" && document.getElementById('height').value!=""){
        width=document.getElementById('width').value
        height=document.getElementById('height').value
        var para=document.getElementById("Solution")
        para.innerHTML=""
        drawGrid()
    }
}

function createGrid(){
    myGrid=[];
    for(a=0; a<width; a++){
        tempGrid=[];
        for(b=0; b<height; b++){
            var square={
                x:a,
                y:b,
                left:true,
                right:true,
                up:true,
                down:true,
                visited:false,
            }
            if(a==0){
                square.left=false
            }
            if(b==0){
                square.up=false
            }
            if(a==width-1){
                square.right=false
            }
            if(b==height-1){
                square.down=false
            }
            tempGrid[b]=square
        }
        myGrid.push(tempGrid);
    }
}

function justDrawGrid(){
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    for(x=0; x<width; x++){
        for(y=0; y<height; y++)
        {
            temp=myGrid[x][y]

            ctx.moveTo(x*800/width,y*800/height);

            if (temp.up==true){
                ctx.lineTo(800/width+x*800/width,y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(800/width+x*800/width,y*800/height);

            if (temp.right==true){
                ctx.lineTo(800/width+x*800/width,800/height+y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(800/width+x*800/width,800/height+y*800/height);

            if (temp.down==true){
                ctx.lineTo(x*800/width,800/height+y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(x*800/width,800/height+y*800/height);

            if (temp.left==true){
                ctx.lineTo(x*800/width,y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(x*800/width,y*800/height);
        }
    }
}

function drawGrid(){
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath()
    createGrid()
    createMaze()
    for(x=0; x<width; x++){
        for(y=0; y<height; y++)
        {
            temp=myGrid[x][y]

            ctx.moveTo(x*800/width,y*800/height);

            if (temp.up==true){
                ctx.lineTo(800/width+x*800/width,y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(800/width+x*800/width,y*800/height);

            if (temp.right==true){
                ctx.lineTo(800/width+x*800/width,800/height+y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(800/width+x*800/width,800/height+y*800/height);

            if (temp.down==true){
                ctx.lineTo(x*800/width,800/height+y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(x*800/width,800/height+y*800/height);

            if (temp.left==true){
                ctx.lineTo(x*800/width,y*800/height);
                ctx.stroke();
            }
            ctx.moveTo(x*800/width,y*800/height);
        }
    }
}

function createMaze(){
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    randX=Math.floor(Math.random()*width)
    randY=Math.floor(Math.random()*height)
    direction=""
    if(randX==0 && randY==0){
        randDirection=Math.floor(Math.random()*2);
        if (randDirection==0)
            direction="right";
        else
            direction="down";
    }
    else if(randX==0){
        randDirection=Math.floor(Math.random()*3)
        if (randDirection==0)
            direction="right";
        else if(randDirection==1)
            direction="down";
        else
            direction="up";
    }
    else if(randY==0){
        randDirection=Math.floor(Math.random()*3)
        if (randDirection==0)
            direction="right";
        else if(randDirection==1)
            direction="down";
        else
            direction="left";
    }
    else if(randX==width-1 && randY==height-1){
        randDirection=Math.floor(Math.random()*2)
        if (randDirection==0)
            direction="up";
        else
            direction="left";
    }
    else if(randX==width-1){
        randDirection=Math.floor(Math.random()*3)
        if (randDirection==0)
            direction="down";
        else if(randDirection==1)
            direction="left";
        else
            direction="up"
    }
    else if(randY==height-1){
        randDirection=Math.floor(Math.random()*3)
        if (randDirection==0)
            direction="right";
        else if(randDirection==1)
            direction="left";
        else
            direction="up"
    }
    else{
        randDirection=Math.floor(Math.random()*4)
        if (randDirection==0)
            direction="right";
        else if(randDirection==1)
            direction="down";
        else if(randDirection==2)
            direction="left";
        else
            direction="up"
    }
    startSquare=myGrid[randX][randY]
    ctx.fillStyle="red";
    ctx.fillRect(randX*800/width, randY*800/height, 800/width, 800/height)
    startX=randX;
    startY=randY;
    newSquare={}
    if(direction=="right"){
        startSquare.right=false;
        startSquare.visited=true;
        newSquare=myGrid[randX+1][randY];
        newSquare.left=false;
        newSquare.visited=true;
    }
    else if(direction=="down"){
        startSquare.down=false;
        startSquare.visited=true;
        newSquare=myGrid[randX][randY+1];
        newSquare.up=false;
        newSquare.visited=true;
    }
    else if(direction=="left"){
        startSquare.left=false;
        startSquare.visited=true;
        newSquare=myGrid[randX-1][randY];
        newSquare.right=false;
        newSquare.visited=true;
    }
    else{
        startSquare.up=false;
        startSquare.visited=true;
        newSquare=myGrid[randX][randY-1];
        newSquare.down=false;
        newSquare.visited=true;
    }
    directions.push(direction)
    console.log("Starting Square: "+startSquare.x+", "+startSquare.y)
    console.log("Next Square: "+newSquare.x+", "+newSquare.y)
    visited.push(startSquare)
    visited.push(newSquare)
    
    maxLength=0
    endSquare={}

    while(visited.length>1)
    // for(x=0;x<20;x++)
    {
        currentSquare=visited[visited.length-1]
        newSquare={};
        currentX=currentSquare.x
        currentY=currentSquare.y
        direction=""
        if(currentX==0 && currentY==0){
            if(myGrid[currentX+1][currentY].visited==false || myGrid[currentX][currentY+1].visited==false){
                randDirection=Math.floor(Math.random()*2);
                
                if (randDirection==0 && myGrid[currentX+1][currentY].visited==false){
                    direction="right";
                    console.log("can go right")
                }
                else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false){
                    direction="down";
                    console.log("can go down but not right")
                }                
                else if (randDirection==1 && myGrid[currentX][currentY+1].visited==false){
                    direction="down";
                    console.log("can go down")
                }
                else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false){
                    direction="right";
                    console.log("can go right but not down")
                }
                else{
                    direction="null";
                    console.log("cannot go down or right")
                }
            }
            else{
                direction="null";
                console.log("right and down are not options")
            }
        }
        else if(currentX==width-1 && currentY==height-1){            
            if(myGrid[currentX][currentY-1].visited==false || myGrid[currentX-1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*2);
                
                if (randDirection==0 && myGrid[currentX][currentY-1].visited==false){
                    direction="up";
                    console.log("can go up")
                } 
                else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false){
                    direction="left";
                    console.log("can go left but not up")
                }                
                else if (randDirection==1 && myGrid[currentX-1][currentY].visited==false){
                    direction="left";
                    console.log("can go left")
                }    
                else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false){
                    direction="up";
                    console.log("can go up but not left")
                } 
                else{
                    direction="null";
                    console.log("can go left or up")
                }
                    
            }
            else
            {
                direction="null";
                console.log("up and left are not options")
            }  
                
        }
        else if(currentX==width-1 && currentY==0)
        {
            if(myGrid[currentX][currentY+1].visited==false || myGrid[currentX-1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*2);
                
                if (randDirection==0 && myGrid[currentX][currentY+1].visited==false){
                    direction="down";
                    console.log("can go down")
                }
                else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                {
                    direction="left";
                    console.log("can go left but not down")
                }                
                else if (randDirection==1 && myGrid[currentX-1][currentY].visited==false){
                    direction="left";
                    console.log("can go left")
                }
                else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false){
                    direction="down";
                    console.log("can go down")
                }
                else{
                    direction="null";
                    console.log("cannot go left or down")
                }
            }
            else{
                direction="null";
                console.log("down and left are not options")
            }
        }
        else if(currentX==0 && currentY==height-1){          
            if(myGrid[currentX][currentY-1].visited==false || myGrid[currentX+1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*2);
                
                if (randDirection==0 && myGrid[currentX][currentY-1].visited==false){
                    direction="up";
                    console.log("can go up")
                }
                else if(randDirection==0 && myGrid[currentX+1][currentY].visited==false){
                    direction="right";
                    console.log("can go right but not up")
                }
                else if (randDirection==1 && myGrid[currentX+1][currentY].visited==false){
                    direction="right";
                    console.log("can go right")
                }
                else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false){
                    direction="up";
                    console.log("can go up but not right")
                }
                else
                {
                    direction="null";
                    console.log("cannot go right or up")
                }
                    
            }
            else{
                direction="null";
                console.log("up and right are not options")
            }
        }
        else if(currentX==0){
            if(myGrid[currentX+1][currentY].visited==false || myGrid[currentX][currentY+1].visited==false || myGrid[currentX][currentY-1].visited==false){
                randDirection=Math.floor(Math.random()*3)
                
                if (randDirection==0 && myGrid[currentX+1][currentY].visited==false){
                    direction="right";
                    console.log("can go right")
                }
                else if(randDirection==0){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY+1].visited==false){
                        direction="down";
                        console.log("can go down but not right")
                    }
                    else if(randDirection==0 && myGrid[currentX][currentY-1].visited==false){
                        direction="up"
                        console.log("can go up but not right or down")
                    }                    
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false){
                        direction="up";
                        console.log("can go up but not right")
                    }
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false){
                        direction="down";
                        console.log("can go down but not right or up")
                    }
                    else{
                        direction="null"
                        console.log("cannot go right or up or down")
                    }
                }

                if(randDirection==1 && myGrid[currentX][currentY+1].visited==false){
                    direction="down";
                    console.log("can go down")
                }
                else if(randDirection==1){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false){
                        direction="right";
                        console.log("can go right but not down")
                    }
                    else if(randDirection==0 && myGrid[currentX][currentY-1].visited==false){
                        direction="up";
                        console.log("can go up but not down or right")
                    }                    
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else
                        direction="null"
                }
                
                if(randDirection==2 && myGrid[currentX][currentY-1].visited==false){
                    direction="up";
                    console.log("can go up")
                }
                else if(randDirection==2){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"                    
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else
                        direction="null"
                }
            }
            else
                direction="null";
        }
        else if(currentY==0){            
            if(myGrid[currentX+1][currentY].visited==false || myGrid[currentX][currentY+1].visited==false || myGrid[currentX-1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*3)
                
                if (randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                    direction="right";
                else if(randDirection==0){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else
                        direction="null"
                }

                if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                    direction="down";
                else if(randDirection==1){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else
                        direction="null"
                }
                
                if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                    direction="left";
                else if(randDirection==2){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else
                        direction="null"
                }
            }
            else
                direction="null";
        }
        else if(currentX==width-1){
            if(myGrid[currentX][currentY-1].visited==false || myGrid[currentX][currentY+1].visited==false || myGrid[currentX-1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*3)
                
                if (randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                    direction="up";
                else if(randDirection==0){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else
                        direction="null"
                }

                if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                    direction="down";
                else if(randDirection==1){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else
                        direction="null"
                }
                
                if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                    direction="left";
                else if(randDirection==2){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"                    
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else
                        direction="null"
                }
            }
            else
                direction="null";
        }
        else if(currentY==height-1){            
            if(myGrid[currentX][currentY-1].visited==false || myGrid[currentX-1][currentY].visited==false || myGrid[currentX-1][currentY].visited==false){
                randDirection=Math.floor(Math.random()*3)
                
                if (randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                    direction="up";
                else if(randDirection==0){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else
                        direction="null"
                }

                if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                    direction="right";
                else if(randDirection==1){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else
                        direction="null"
                }
                
                if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                    direction="left";
                else if(randDirection==2){
                    randDirection=Math.floor(Math.random()*2)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right"                    
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else
                        direction="null"
                }
            }
            else
                direction="null";
        }
        else{        
            if(myGrid[currentX+1][currentY].visited==false || myGrid[currentX][currentY+1].visited==false || myGrid[currentX-1][currentY].visited==false || myGrid[currentX][currentY-1].visited==false){
                randDirection=Math.floor(Math.random()*4)

                if (randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                else if(randDirection==0){
                    randDirection=Math.floor(Math.random()*3)
                    
                    if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"
                    else if(randDirection==2 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==2 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"
                    else
                        direction="null"
                }

                if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                    direction="right";
                else if(randDirection==1){                    
                    randDirection=Math.floor(Math.random()*3)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"                    
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"
                    else if(randDirection==2 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==2 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"
                    else
                        direction="null"
                }
                
                if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                    direction="left";
                else if(randDirection==2){
                    randDirection=Math.floor(Math.random()*3)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right"
                    else if(randDirection==0 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"                    
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==1 && myGrid[currentX][currentY+1].visited==false)
                        direction="down"
                    else if(randDirection==2 && myGrid[currentX][currentY+1].visited==false)
                        direction="down";
                    else if(randDirection==2 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==2 && myGrid[currentX+1][currentY].visited==false)
                        direction="right"
                    else
                        direction="null"
                }
                if(randDirection==3 && myGrid[currentX][currentY+1].visited==false)
                    direction="down";
                else if(randDirection==3){
                    randDirection=Math.floor(Math.random()*3)
                    
                    if(randDirection==0 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==0 && myGrid[currentX+1][currentY].visited==false)
                        direction="right"
                    else if(randDirection==0 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"                    
                    else if(randDirection==1 && myGrid[currentX+1][currentY].visited==false)
                        direction="right";
                    else if(randDirection==1 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==1 && myGrid[currentX-1][currentY].visited==false)
                        direction="left"
                    else if(randDirection==2 && myGrid[currentX-1][currentY].visited==false)
                        direction="left";
                    else if(randDirection==2 && myGrid[currentX][currentY-1].visited==false)
                        direction="up";
                    else if(randDirection==2 && myGrid[currentX+1][currentY].visited==false)
                        direction="right"
                    else
                        direction="null"
                }
            }
            else
                direction="null";
        }

        console.log(direction+", "+currentX+", "+currentY)
        
        if(direction!="null" && direction!=""){
            if(direction=="right"){
                currentSquare.right=false;
                currentSquare.visited=true;
                newSquare=myGrid[currentX+1][currentY];
                newSquare.left=false;
                newSquare.visited=true;
            }
            else if(direction=="down"){
                currentSquare.down=false;
                currentSquare.visited=true;
                newSquare=myGrid[currentX][currentY+1];
                newSquare.up=false;
                newSquare.visited=true;
            }
            else if(direction=="left"){
                currentSquare.left=false;
                currentSquare.visited=true;
                newSquare=myGrid[currentX-1][currentY];
                newSquare.right=false;
                newSquare.visited=true;
            }
            else{
                currentSquare.up=false;
                currentSquare.visited=true;
                newSquare=myGrid[currentX][currentY-1];
                newSquare.down=false;
                newSquare.visited=true;
            }
            visited.push(newSquare)
            directions.push(direction)
        }
        else{
            visited.pop()
            currentSquare=visited[visited.length-1]
            directions.pop()
        }
        if(visited.length>maxLength){
            maxLength=visited.length
            endSquare=newSquare
            maxDirections=[]
            for(let i=0; i<directions.length; i++){
                maxDirections[i]=directions[i]
            }
        }
        console.log(myGrid)
    }
    ctx.fillStyle="green";
    ctx.fillRect(endSquare.x*800/width, endSquare.y*800/height, 800/width, 800/height)
}

function solution(){
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    tempX=startX;
    tempY=startY;
    solved="Solution: "
    for(let i=0; i<maxDirections.length; i++){
        dir=maxDirections[i]
        if(dir=="right"){
            if(i>0 && i<maxDirections.length-1){
                if(maxDirections[i-1]!="left" && maxDirections[i+1]!="left"){
                    tempX+=1
                    solved+="right, "
                }
            }
            else if(i>0){
                if(maxDirections[i-1]!="left"){
                    tempX+=1
                    solved+="right, "
                }
            }
            else if(i<maxDirections.length-1){
                if(maxDirections[i+1]!="left"){
                    tempX+=1
                    solved+="right, "
                }
            }
        }
        else if(dir=="down"){
            if(i>0 && i<maxDirections.length-1){
                if(maxDirections[i-1]!="up" && maxDirections[i-1]!="" && maxDirections[i+1]!="up" && maxDirections[i+1]!=""){
                    tempY+=1
                    solved+="down, "
                }
            }
            else if(i>0){
                if(maxDirections[i-1]!="up" && maxDirections[i-1]!=""){
                    tempY+=1
                    solved+="down, "
                }
            }
            else if(i<maxDirections.length-1){
                if(maxDirections[i+1]!="up" && maxDirections[i+1]!=""){
                    tempY+=1
                    solved+="down, "
                }
            }
        }
        else if(dir=="left"){
            if(i>0 && i<maxDirections.length-1){
                if(maxDirections[i-1]!="right" && maxDirections[i+1]!="right"){
                    tempX-=1
                    solved+="left, "
                }
            }
            else if(i>0){
                if(maxDirections[i-1]!="right"){
                    tempX-=1
                    solved+="left, "
                }
            }
            else if(i<maxDirections.length-1){
                if(maxDirections[i+1]!="right"){
                    tempX-=1
                    solved+="left, "
                }
            }
            
        }
        else{
            if(i>0 && i<maxDirections.length-1){
                if(maxDirections[i-1]!="down" && maxDirections[i+1]!="down"){
                    tempY-=1
                    solved+="up, "
                }
            }
            else if(i>0){
                if(maxDirections[i-1]!="down"){
                    tempY-=1
                    solved+="up, "
                }
            }
            else if(i<maxDirections.length-1){
                if(maxDirections[i+1]!="down"){
                    tempY-=1
                    solved+="up, "
                }
            }
        }
        if(tempX==endSquare.x && tempY==endSquare.y)
            break;
        ctx.fillStyle="blue";
        ctx.fillRect(tempX*800/width, tempY*800/height, 800/width, 800/height)
    }
    solved=solved.substring(0, solved.length-2)    
    ctx.fillStyle="red";
    ctx.fillRect(startX*800/width, startY*800/height, 800/width, 800/height)
    ctx.fillStyle="green";
    ctx.fillRect(endSquare.x*800/width, endSquare.y*800/height, 800/width, 800/height)
    var para=document.getElementById("Solution")
    para.innerHTML=solved
    justDrawGrid()
}
