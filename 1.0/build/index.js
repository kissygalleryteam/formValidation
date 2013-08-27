/*
combined files : 

gallery/formValidation/1.0/index

*/
/**
 * @fileoverview 
 * @author 淘知了<zhiliao.zsl@taobao.com>
 * @module formValidation
 **/
KISSY.add('gallery/formValidation/1.0/index',function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class FormValidation
     * @constructor
     * @extends Base
     */
    function FormValidation(comConfig) {
        var self = this;
        //调用父类构造函数
        FormValidation.superclass.constructor.call(self, comConfig);

        var form = N.one('#'+this.get('form'));
        var blurValidate = this.get('blurValidate');
        //为form绑定submit事件
        this._bindSubmit(form);
        //如果需要失去焦点实时验证，为每个input绑定focus事件和blur事件
        if(blurValidate){
            var eles = form.all('input[type=text],textarea');
            this.bindBlur(eles);
        }
    }
    S.extend(FormValidation, Base, /** @lends FormValidation.prototype*/{
        _bindSubmit: function(form){
            var self = this;
            if(form){
                form.on('submit',function(){
                    var ret = false;
                    var isValidateForm = self.validateForm();
                    var isTestSucc = self.fire('testSucc',{
                            form: self.get('form')
                        });
                    if(isValidateForm && isTestSucc){
                        ret = true;
                    }
                    return ret;
                });
            }
        },
        bindBlur: function(eles){
            //为input的type为text,和textarea绑定事件
            var that = this,
            focusFun = function(ev){},
            blurFun = function(ev){that.validateField(this);};
            //
            for ( var i = 0; i < eles.length; i++ ) {
                N.one(eles[i]).on('focus',focusFun).on('blur',blurFun);
            }
        },
        validateForm: function(form) {
            var valid = true;
            if(!form){
                form = N.one('#'+this.get('form'))[0];
            }

            for ( var i = 0; i < form.elements.length; i++ ) {
                var formele = form.elements[i];
                //修改object是form.elemets中的元素bug
                if(formele.tagName=='OBJECT') 
                    continue;
                this.hideErrors(formele);
                if ( this.validateField( formele ) ){
                    valid = false;
                }
            }

            if(valid){
                this.on('testSucc', function(){
                    return true;
                });
            }

            return valid;
        },

        validateField: function( elem ) {
            var errors = [],
                rules  = this.get('rules'),
                rulenames = elem.getAttribute('data-rulenames');

            //不需要验证
            if(!rulenames) { return false; }
            //规则如下data-rulenames="required;numbner;idcard"
            var rulesArr = rulenames.split(';'),ruleObj = "";

            for (var i = 0; i < rulesArr.length; i++) {
                var name = rulesArr[i];
                if(name in rules){
                    ruleObj = rules[name];
                    //是否满足验证规则
                    if(!ruleObj.test(elem)){
                        //不能满足验证规则，记录错误信息
                        errors.push(ruleObj.msg);
                        break;
                    }
                }
            }
            
            //错误提示
            if ( errors.length ) {
                this.showErrors( elem, errors, ruleObj.msg);
            } else {
                this.hideErrors( elem );
            }

            return errors.length > 0;
        },

        showErrors: function( elem, errors,msg){
            this.fire('showError',{
                ele:elem,
                error: errors,
                msg:msg
            });
        },

        hideErrors: function(elem){
            this.fire('hideError',{
                ele: elem
            });
        }
    }, {ATTRS : /** @lends FormValidation*/{
            form: {
                value: 'formid'//form的id
            },
            rules: {
                value:{

                },
                setter: function(v){
                    var rules = this.get('rules');
                    return S.mix(rules,v);
                }
            },
            blurValidate: {
                value: true
            }
    }});

    return FormValidation;
}, {requires:['node', 'base']});




