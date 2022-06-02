let vm=Vue.createApp({
    data(){
        return{
            height:20,  width:32,
            blockSize:20,

            dir:3,

            waitmills:300,
            score:0,

            start:false,

            snakeBlock:[
                {
                    top:9,
                    left:16,
                },
                {
                    top:9,
                    left:15,
                },
                {
                    top:9,
                    left:14,
                },
            ],
            pointBlockTop:0,
            pointBlockLeft:0,
        }
    },
    methods:{
        clickStart(){     
            this.snakeBlock=[
                {
                    top:9,
                    left:16,
                },
                {
                    top:9,
                    left:15,
                },
                {
                    top:9,
                    left:14,
                },
            ],

            this.start=true;

            this.dir=3;

            this.waitmills=300;
            this.score=0;

            snakeMove();
            RandomPoint();
        }
    },
}).mount('#game')


function snakeMove(){
    if(isdead()){return;}

    getPoint()

    
        for(var i=vm.snakeBlock.length-1 ; i>0 ; i--){
            vm.snakeBlock[i].top=vm.snakeBlock[i-1].top;
            vm.snakeBlock[i].left=vm.snakeBlock[i-1].left;
        }

        switch(vm.dir){
            case 0:
                vm.snakeBlock[0].top--;
                break;
            case 1:
                vm.snakeBlock[0].left--;
                break;
            case 2:
                vm.snakeBlock[0].top++;
                break;
            case 3:
                vm.snakeBlock[0].left++;
                break;
            default:
                break;
        }
    
    changeDir=true;
    setTimeout('snakeMove()',vm.waitmills);
}

function isdead(){
    var x = vm.snakeBlock[0].top;
    var y = vm.snakeBlock[0].left;
    
    

    if(x<0 | x>vm.height-1 | y<0 | y>vm.width-1){
        vm.start=false; return true;
    }


    for(var i = 1; i<vm.snakeBlock.length;i++){
        if(vm.snakeBlock[i].top ==x & vm.snakeBlock[i].left==y){
            vm.start=false; return true;
        }
    }

    return false;
}
function getPoint(){
    if(vm.snakeBlock[0].top==vm.pointBlockTop & vm.snakeBlock[0].left==vm.pointBlockLeft){

        newblock={top:vm.pointBlockTop,left:vm.pointBlockLeft};
        vm.snakeBlock.push(newblock);

        if(vm.waitmills>200){
            vm.waitmills-=20;
            vm.score++;
        }
        else if(vm.waitmills>100){
            vm.waitmills-=5;
            vm.score+=3;
        }
        else if(vm.waitmills>50){
            vm.waitmills-=2;
            vm.score+=5;
        }

        else if(vm.waitmills>30){
            vm.waitmills-=1;
            vm.score+=10;
        }
        else{
            vm.score+15;
        }
        RandomPoint();
    }
}
function RandomPoint(){
    x= Math.floor(Math.random()*vm.width);
    y= Math.floor(Math.random()*vm.height);

    for(var i = 0; i<vm.snakeBlock.length;i++){
        if(vm.snakeBlock[i].top ==y & vm.snakeBlock[i].left==x){
            RandomPoint();
            return;
        }
    }
    vm.pointBlockLeft= x;
    vm.pointBlockTop= y;
}
var changeDir= true;
$(window).keyup(function (e) { 
    if(!changeDir){return;}
    switch(e.originalEvent.key){
        case 'W': case 'w': case 'ArrowUp':
            if(vm.dir==2){return;}
            vm.dir=0;
            changeDir=false;
            break;
        case 'A': case 'a': case 'ArrowLeft':
            if(vm.dir==3){return;}
            vm.dir=1;
            changeDir=false;
            break;
        case 'S': case 's': case 'ArrowDown':
            if(vm.dir==0){return;}
            vm.dir=2;
            changeDir=false;
            break;
        case 'D': case 'd': case 'ArrowRight':
            if(vm.dir==1){return;}
            vm.dir=3;
            changeDir=false;
            break;
        case ' ':
            if(!vm.start){vm.clickStart()};
            break;
        }
    
});