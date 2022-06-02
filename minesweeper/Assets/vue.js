let vm=Vue.createApp({
    data(){
        return{
            level:0,
            levels:[
                {
                    level:'EASY',
                    width:8,    height:8,
                    bombs:10,        
                },
                {
                    level:'MEDIUM',
                    width:16,    height:16,
                    bombs:40,
                },
                {
                    level:'HARD',
                    width:30,    height:16,
                    bombs:99,
                },
                {
                    level:'CUSTOMIZE',
                    width:0,    height:0,
                    bombs:0,
                }

            ],
            blockSize:35,

            blocks:[],
            clicks:[false,false,false],

            start:false,
            firstClick:true,
            messenger:'START',

            flags:0,  currentFlags:0,
            currentOpen:0,
            time:0,     timer:null,

            customType:false,
            customWidth:5,  customHeight:5,
            customBombs:1,
        }
    },
    methods:{
        clickStart(){     
            this.start=true;    this.firstClick=true;
            this.messenger='';
            this.flags=0;   this.time=0
            clearInterval(this.timer);
            this.timer=setInterval('timer()',1000)
            vm.setGame();
        },
        levelChange(index){
            if(index==3){
                this.customType=true;
                this.level= index;
            }else{
                if(index==this.level){return};
                this.level= index;
                this.clickStart();
                this.firstClick=true;
            }
        },
        setGame(){
            this.blocks=[];

            //creat clear grids 
            for(var i = 0 ; i<this.levels[this.level].height;i++){
                var temp=[];
                for(var j = 0 ; j<this.levels[this.level].width;j++){
                    var grid={type:'empty',isFlag:false,isOpen:false,isCheck:false,nearByBombs:99,wrong:false};
                    temp.push(grid);
                }
                this.blocks.push(temp);
            }
        },

        clickDown(event,a,b){
            if(!this.start){return}
            switch (event.which){
                case 1:
                    this.clicks[0]=true;
                    if(this.firstClick){setBombs(a,b);}
                    openBlock(a,b);
                    break;
                case 2:
                    this.clicks[1]=true;
                    showArround(a,b,true);
                    quickOpen(a,b);
                    break;
                case 3:
                    this.clicks[2]=true;
                    if(this.clicks[0]){
                        showArround(a,b,true);
                        quickOpen(a,b);
                    }else{
                        setFlag(a,b)
                    }
                    break;
            }
        },
        clickUp(event,a,b){
            if(!this.start){return}
            this.clicks[event.which-1]=false;
            showArround(a,b,false);
        },
        customSetting(){
            var level = this.levels[3];
            level.width=this.customWidth;
            level.height=this.customHeight;
            level.bombs=this.customBombs;
            this.customType=false;
            this.clickStart();
        },
        stopPropagation(){
            event.preventDefault();
            event.stopPropagation();
        },
    },
}).mount('#game')

vm.setGame();

function setBombs(a,b){
    vm.firstClick=false;

    var near= nearByGrids(a,b);
    near.push([a,b]);

    //put bombs
    for(var i=0 ;i<vm.levels[vm.level].bombs;i++){
        x= Math.floor(Math.random()*vm.levels[vm.level].height);
        y= Math.floor(Math.random()*vm.levels[vm.level].width);
        
        if(vm.blocks[x][y].type=='empty'){
            var canput =true;
            $.each(near,function(index,value){
                if(x==value[0]&y==value[1]){canput=false}
            })
            if(canput){
                vm.blocks[x][y].type='bomb';
            }
        }
    }

    //calculate near bombs
    $.each(vm.blocks,function(indexA, a){
        $.each(a,function(indexB,b){
            if(b.type=='empty'){
                b.nearByBombs=bombsCount(nearByGrids(indexA,indexB));
            }
        })
    })
}
function openBlock(x,y){

    var block = vm.blocks[x][y];

    if(block.isOpen | block.isFlag){return};

    if(block.type=='empty'){
        if(block.nearByBombs==0){
            block.isOpen=true;

            var nearblocks=nearByGrids(x,y);

            $.each(nearblocks,function(index,item){
                openBlock(item[0],item[1])
            })

        }else{
            block.isOpen=true;
        }
        vm.currentOpen++;
    }
    else if(block.type=='bomb'){
        block.isOpen=true;
        console.log('GG');
        //GG

        clearInterval(vm.timer);
        showAllBombs();
        vm.start=false;
        setTimeout(() => {
            vm.messenger='Failed  Again ?'
        }, 500);
    }

    if(vm.currentFlags==vm.levels[vm.level].bombs | vm.currentOpen==(vm.levels[vm.level].width*vm.levels[vm.level].height-vm.levels[vm.level].bombs)){
        clearInterval(vm.timer);
        vm.start=false;

        setTimeout(() => {
            vm.messenger='SUCCESS  Again ?'
        }, 500);
    }
}
function setFlag(x,y){
    var block = vm.blocks[x][y];

    if(block.isOpen){return};
    

    if(block.isFlag){
        if(block.type=='bomb'){vm.currentFlags--;}
        
        vm.flags--
    }
    else{
        if(block.type=='bomb'){vm.currentFlags++;}
        if(vm.levels[vm.level].bombs-vm.flags<=0){return}
        vm.flags++
    }
    block.isFlag=!block.isFlag;
}
function quickOpen(x,y){
    var block = vm.blocks[x][y];

    if(!block.isOpen | block.isFlag){return}
    
    var nearblocks=nearByGrids(x,y);
    if(block.nearByBombs==flagCount(nearblocks)){
        $.each(nearblocks,function(index,item){
            openBlock(item[0],item[1])
        })
    }
}
function nearByGrids(x,y){
    var temp =[
        [x-1,y-1],
        [x-1,y],
        [x-1,y+1],
        [x,y-1],
        //[x,y],
        [x,y+1],
        [x+1,y-1],
        [x+1,y],
        [x+1,y+1],
    ];
    var output=[];

    $.each(temp, function (index, value) { 
        if(value[0]<0 | value[0]>vm.levels[vm.level].height-1 | value[1]<0 |value[1]>vm.levels[vm.level].width-1 ){
            
        }else{
            output.push(value);
        }
        
    });
    return output;
}
function showArround(x,y,bool){
    if(bool){
        var nearblocks=nearByGrids(x,y);

        $.each(nearblocks,function(index,item){               
            vm.blocks[item[0]][item[1]].isCheck=true;
        })
    }else{
        $.each(vm.blocks,function(indexA, a){
            $.each(a,function(indexB,b){
                b.isCheck=false;
            })
        })
    }
}
function bombsCount(array){
    count=0;
    $.each(array,function(index,value){
        if(vm.blocks[value[0]][value[1]].type=='bomb'){
            count++;
        }
    })
    return count;
}
function flagCount(array){
    count=0;
    $.each(array,function(index,value){
        if(vm.blocks[value[0]][value[1]].isFlag){
            count++;
        }
    })
    return count;
}
function timer(){vm.time++;}
function showAllBombs(){
    $.each(vm.blocks,function(indexA, a){
        $.each(a,function(indexB,b){
            if(b.type=='empty'){              
               if(b.isFlag){b.wrong=true;}
            }
            else if(b.type=='bomb'){
                b.isOpen=true;
            }
        })
    })
}