## 综述

formValidation是。

## 快速使用

### 初始化组件

    S.use('gallery/formValidation/1.0/index', function (S, FormValidation) {
         var formValidation = new FormValidation({
         		form:'formDemo' //指定要验证的form的Id
         	});

         	//设置验证规则
             formValidation.set('rules',{
                required:{
                    test: function(obj){
                        var ret = false;
                        if(obj.value){
                            if(obj.value != obj.getAttribute('placeholder')){
                                ret = true;    
                            }else{
                                ret = false;
                            }
                        }
                        return ret;                 
                    },
                    msg: '必填项'
                }
            });

            //设置提示信息
            formValidation.on('showError',function(ev){
                //
                Node.one(ev.ele).after('<div style="color:red;">'+ev.msg+'</div>');
            }).on('hideError',function(ev){
                //
                var nextNode = Node.one(ev.ele).next();
                if(nextNode && nextNode.prop('tagName')=='DIV'){
                    Node.one(ev.ele).next().remove();
                }
                
            });        	
    })

## API说明








