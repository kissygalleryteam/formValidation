## 综述

formValidation用于form表单的本地验证,验证规则，提示信息，错误信息提示形式可灵活配置。

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

## API说明

FormValidation类只接受一个配置项参数

### 配置项说明


参数名 | 类型 | 默认值 | 描述 
------------ | ------------- | ------------ | ------------ 
form | String   | 'formid' | 要验证的form表单的id
rules | Object  | null  |    验证规则
blurValidate | Boolean  | false  |   元素失去焦点，是否进行验证

rules的配置说明

参数名 | 类型 | 默认值 | 描述 
------------ | ------------- | ------------ | ------------ 
规则名，如required | String   | '' | 规则名，用于的data-rulenames中配置
规则 | Function  | null  |    方法的参数是要验证的元素



### 事件说明

事件名 | 类型 | 默认值 | 描述 
------------ | ------------- | ------------ | ------------ 
showError | String   | '' | 该事件对象会传ele[要验证的元素],msg[提示信息]，error[错误信息集合]三个参数
hideError | String  | ''  |    该事件会传ele[要验证的元素]




