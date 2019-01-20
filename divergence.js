// animation 
var count = 0;
var stop = false;//set stop to true to stop
var maxRadius = 650;
var radiusInc = 10;
var removeCount = 0;

function main(canvas,ctx){

    window.setInterval(()=>{main_loop(canvas,ctx);}, 20);

    maxRadius = Math.Sqrt((canvas.height/2)^2 + (canvas.width/2)^2 );
    
    if(!stop){
        main_loop(canvas,ctx);
        
    }else{
        window.clearInterval();
    }
}

function main_loop(canvas,ctx){
    count++;
    // console.log("tick",count);

    ctx.clearRect(0, 0, canvas.width, canvas.height);// clear screen
    
    var i;
    for(i=removeCount; i< count ;i++){
        generate_divergence(ctx,canvas.width/2,canvas.height/2, i , (radiusInc*(count-i)) );
    }
    
    if((radiusInc*(count)) > maxRadius){
        // if the radius of largest is greater than what can be displayed
        //remove that from the display que
        removeCount += 1;
    }

}


function regular_polygon_vertex_angle(vert_num, num){
    return (num*2*Math.PI)/vert_num ;
}

/**
   returns an svg objet containing the arc with corisponding classes on and off
   @param {number} radius  - the radius

*/
function generate_divergence(ctx,center_x,center_y,count,radius){
    var arc_num = Math.ceil(Math.log2(count));
    // console.log(arc_num);
    
    var i;
    for(i = 0; i< arc_num;i++){
        // console.log("draw",count,regular_polygon_vertex_angle(arc_num,i),
                    // regular_polygon_vertex_angle(arc_num,i+1));
        
        ctx.beginPath();
        ctx.moveTo(center_x,center_y);
        ctx.arc(center_x,center_y, radius,
                regular_polygon_vertex_angle(arc_num,i),
                regular_polygon_vertex_angle(arc_num,i+1));
        ctx.moveTo(center_x,center_y);
        // ctx.stroke();

        // ctx.setColor();
        // ctx.endPath();
        // console.log("?", (count >> i) & 1);
        if((count >> i) & 1 == 1){
            // console.log("yes");
            ctx.fillStyle = "white";
        }else{
            // console.log("no");
            ctx.fillStyle = "black";
        }
        ctx.closePath();
        ctx.fill();
    }
    
    
}
