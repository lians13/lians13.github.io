var dataUrl ="https://lians13.github.io/ChineseTraditionalMusic/assets/json/data.json";

$.getJSON(dataUrl, function(_data) {

    vm.data= _data.result;

    $(_data.result).each(function(index,item){
        var i = $(this)[0].instruments;
        $(i).each(function(){

            var _instrumentsdata={
                name:'',
                class:'',
                description:'',
                image:'',
            }

            _instrumentsdata.class=item.id;
            _instrumentsdata.name=$(this)[0].name;
            _instrumentsdata.description=$(this)[0].description;
            _instrumentsdata.image=$(this)[0].image;
            
            vm.instrumentsdata.push(_instrumentsdata);
        })
    })
    vm.orchestradata=_data.orchestra;
    
})