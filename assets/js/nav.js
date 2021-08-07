window.addEventListener('scroll', stick);
const header = document.querySelector('header');
const banner = document.querySelector('#banner');
const nav = document.querySelector('nav');
const logo = document.querySelector('#logo');

function stick (event) {
    const condition = header.offsetHeight;

    if(window.scrollY>= condition){
        header.style.position = 'fixed'; 
        if(nav.style.display == 'flex'){
            header.style.height = 68+nav.offsetHeight+'px';
        }else{
            header.style.height = 68+'px';
        }
        header.style.background='rgb(218, 224, 228)';
        header.style.boxShadow = '0px 5px 3px rgba(52,44,52,0.1)';
        banner.style.paddingTop = condition+'px';
        logo.style.width = 68+'px';
    }else{
        header.style.position = 'relative';
        header.style.height = 88+'px';
        header.style.background=' rgba(225,231,235,1)';
        header.style.boxShadow = '0px 0px 0px rgba(52,44,52,0)';
        banner.style.paddingTop = 0;
        logo.style.width = 88+'px'; 
    }
}

$('#logo').click(function(){
    
    if(window.innerWidth<=576){
        if(nav.style.display == 'flex'){
            header.style.height= (header.offsetHeight-nav.offsetHeight) +'px';
            nav.style.display='none';          
        }else if(nav.style.display==''||nav.style.display=="none"){
            nav.style.display='flex';
            header.style.height= header.offsetHeight+nav.offsetHeight +'px';
        }
    }
    return false; 
});