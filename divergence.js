// animation 
var count = 0;
var stop = false;//set stop to true to stop
var maxRadius = 650;
var radiusInc = 50;
var removeCount = 0;
var incNum = 0.1; // the number the count is done

function set_canvas_max_window(canvas){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}


function main(canvas,ctx){

    window.setInterval(()=>{main_loop(canvas,ctx);}, 40);

    set_canvas_max_window(canvas);

    radiusInc = canvas.height/(2*10);
    maxRadius = Math.sqrt((canvas.height/2)**2 + (canvas.width/2)**2) + radiusInc;
    
    if(!stop){
        main_loop(canvas,ctx);
    }else{
        window.clearInterval();
    }
}

function main_loop(canvas,ctx){
    count += incNum;
    // console.log("tick",count);

    ctx.clearRect(0, 0, canvas.width, canvas.height);// clear screen
    
    var i;
    for(i=removeCount; i< count ;i++){
        generate_divergence(ctx,canvas.width/2,canvas.height/2, i , (radiusInc*(count-i)) );

        
        if((radiusInc*(count-i)) > maxRadius){
            // if the radius of largest is greater than what can be displayed
            //remove that from the display que
            removeCount += 1;
        }
    }
}

/**
   draw circle of arcs with colors on and off depending on bit value of a number.
*/
function generate_divergence(ctx,center_x,center_y,count,radius){
    var arc_num = Math.ceil(Math.log2(count));
    
    var i;
    for(i = 0; i< arc_num;i++){
        
        ctx.beginPath();
        ctx.moveTo(center_x,center_y);
        
        //(num*2*Math.PI)/vert_num -- vertex of regular polygon at num with vert_num
        ctx.arc(center_x,center_y, radius,
                (i*2*Math.PI)/arc_num,
                ((i+1)*2*Math.PI)/arc_num);
        ctx.moveTo(center_x,center_y);

        if((count >> i) & 1 == 1){
            ctx.fillStyle = "white";
        }else{
            ctx.fillStyle = "black";
        }
        
        ctx.closePath();
        ctx.fill();
    }
}
