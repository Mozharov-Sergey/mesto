(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){var o,i,a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),i=function(){a._cardElement.remove()},(o="_handlerRemoveCard")in this?Object.defineProperty(this,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):this[o]=i,this._data=e,this._templateSelector=n,this._imageUrl=e.link,this._title=e.name,this._handlerLike=this._handlerLike.bind(this),this.handleCardClick=r,this._cardElement=this._getTemplate(),this._likeButton=this._cardElement.querySelector(".cards__like-button"),this._deleteButton=this._cardElement.querySelector(".card__delete-button"),this._cardImage=this._cardElement.querySelector(".cards__card-image"),this._cardTitle=this._cardElement.querySelector(".cards__card-title")}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector("#".concat(this._templateSelector)).content.querySelector(".".concat(this._templateSelector)).cloneNode(!0)}},{key:"_handlerLike",value:function(){this._likeButton.classList.toggle("cards__like-button_active")}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.addEventListener("click",this._handlerLike),this._deleteButton.addEventListener("click",this._handlerRemoveCard),this._cardImage.addEventListener("click",(function(){e.handleCardClick()}))}},{key:"generateCard",value:function(){return this._cardImage.src=this._imageUrl,this._cardTitle.textContent=this._title,this._cardImage.alt=this._title,this._setEventListeners(),this._cardElement}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=t,this._form=n,this._submitButton=n.querySelector(".popup__submit-button"),this.inputList=Array.from(n.querySelectorAll(this.config.inputSelector))}var t,r;return t=e,(r=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"resetValidation",value:function(){var e=this;this.buttonStateControl(),this.inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"_setEventListeners",value:function(){var e=this;this.buttonStateControl(),this.inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e.buttonStateControl()}))}))}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"buttonStateControl",value:function(){switch(this._checkInputValidity(this.inputList)){case!0:this._buttonStateActive();break;case!1:this._buttonStateDisabled()}}},{key:"_buttonStateActive",value:function(){this._submitButton.removeAttribute("disabled"),this._submitButton.classList.remove(this.config.inactiveButtonClass)}},{key:"_buttonStateDisabled",value:function(){this._submitButton.setAttribute("disabled","disabled"),this._submitButton.classList.add(this.config.inactiveButtonClass)}},{key:"_showInputError",value:function(e,t){e.classList.add(this.config.inputErrorClass);var n=this._form.querySelector(".".concat(e.id,"-input-error"));n.classList.add(this.config.errorClass),n.textContent=t}},{key:"_hideInputError",value:function(e){e.classList.remove(this.config.inputErrorClass);var t=this._form.querySelector(".".concat(e.id,"-input-error"));t.classList.remove(this.config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){return e.every((function(e){return!0===e.validity.valid}))}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),o={formSelector:".popup__form",inputSelector:".popup__field",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_disabled",inputErrorClass:"popup__field_type_error",errorClass:"popup__error_visible"},i={},a=document.querySelector(".profile__add-button"),s=document.querySelector(".profile__edit-button"),l=document.querySelector(".popup__form_type_add-card-form"),c=document.querySelector(".popup__form"),u=document.querySelector(".popup_type_edit-profile"),p=(u.querySelector(".popup__field_value_name"),u.querySelector(".popup__field_value_profession"),document.querySelector(".popup_type_open-image")),f=(p.querySelector(".popup__image"),p.querySelector(".popup__image-subtitle"),document.querySelector(".profile__name")),d=document.querySelector(".profile__profession");function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}document.querySelector(".cards");var _=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t,e._container)}))}},{key:"addItem",value:function(e){this._renderer(e,this._container)}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._buttonClose=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this),this._handleClickOnFieldsClose=this._handleClickOnFieldsClose.bind(this),this.open=this.open.bind(this),this.close=this.close.bind(this)}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleClickOnFieldsClose",value:function(e){e.target.classList.contains("popup")&&this.close()}},{key:"setEventListeners",value:function(){this._buttonClose.addEventListener("click",this.close)}},{key:"open",value:function(){document.addEventListener("keydown",this._handleEscClose),document.addEventListener("click",this._handleClickOnFieldsClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("click",this._handleClickOnFieldsClose),this._popup.classList.remove("popup_opened")}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function m(e){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},m(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=C(e)););return e}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function E(e,t){if(t&&("object"===m(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return S(e)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function C(e){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},C(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&w(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=C(r);if(o){var n=C(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._callback=n,r._validator=t,r._form=r._popup.querySelector(".popup__form"),r.userNameNew=r._popup.querySelector(".popup__field_value_name"),r.userProfessionNew=r._popup.querySelector(".popup__field_value_profession"),r._getInputValues=r._getInputValues.bind(S(r)),r._callback=r._callback.bind(S(r)),r._fields=Array.from(r._form.querySelectorAll(".popup__field")),r.setEventListeners(),r}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this.fieldsValues={},this._fields.forEach((function(t){e.fieldsValues[t.name]=t.value})),this.fieldsValues}},{key:"setEventListeners",value:function(){var e=this;k(C(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){e._callback(t,e._getInputValues())}))}},{key:"close",value:function(){k(C(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setInputValues",value:function(e){this._fields.forEach((function(t){t.value=e[t.id]}))}},{key:"open",value:function(){k(C(a.prototype),"open",this).call(this),this._validator.buttonStateControl()}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(v);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t.name,this._profession=t.profession}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,profession:this._profession.textContent}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._profession.textContent=e.info}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function x(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return R(e)}function R(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function V(){return V="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=B(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},V.apply(this,arguments)}function B(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=F(e)););return e}function F(e){return F=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},F(e)}var T,A=new(function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=F(r);if(o){var n=F(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return x(this,e)});function a(e,t){var n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),V((n=R(r=i.call(this,e)),F(a.prototype)),"setEventListeners",n).call(n),r._callback=t,r._image=r._popup.querySelector(".popup__image"),r._imageSubtitle=r._popup.querySelector(".popup__image-subtitle"),r}return t=a,(n=[{key:"test",value:function(){console.log(this._popup)}},{key:"open",value:function(e,t){V(F(a.prototype),"open",this).call(this),this._image.src=e,this._image.alt=t,this._imageSubtitle.textContent=t}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(v))(".popup_type_open-image"),D=new _({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e,n){var r=new t(e,"cards__card",(function(){A.open(e.link,e.name)})).generateCard();n.prepend(r)}},".cards"),U=new L({name:f,profession:d});U.setUserInfo({name:"Сергей Можаров",info:"Frontend developer"}),D.addItems(),i.validatorFormAddImage=new r(o,l),i.validatorFormAddImage.enableValidation(),i.validatorFormEditProfile=new r(o,c),i.validatorFormEditProfile.enableValidation(),T=U.getUserInfo(),f.textContent=T.name,d.textContent=T.profession;var N=new O(".popup_type_edit-profile",i.validatorFormEditProfile,(function(e,t){e.preventDefault();var n=t;U.setUserInfo({name:n.profileName,info:n.profileFunction}),N.close()})),z=new O(".popup_type_add-card",i.validatorFormAddImage,(function(e,t){e.preventDefault();var n=t;D.addItem({name:n.newCardDescription,link:n.newCardLink}),i.validatorFormAddImage.buttonStateControl(),z.close()}));s.addEventListener("click",(function(){i.validatorFormEditProfile.resetValidation(),N.setInputValues(U.getUserInfo()),N.open()})),a.addEventListener("click",(function(){i.validatorFormAddImage.resetValidation(),z.open()}))})();