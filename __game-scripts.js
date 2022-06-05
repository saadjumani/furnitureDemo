var Mouse=pc.createScript("mouse");Mouse.attributes.add("Selected",{type:"number",default:0}),Mouse.prototype.initialize=function(){this.pos=new pc.Vec3,this.app.mouse.disableContextMenu(),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this)},Mouse.prototype.onMouseMove=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth;var e=this.app.graphicsDevice.canvas.clientHeight,o=(e-t.y)/e*16,s=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,o,this.pos),this.entity.setPosition(this.pos.x,s.y,this.pos.z),this.entity.getPosition().z>1.58&&this.entity.setPosition(this.pos.x,s.y,1.58)}},Mouse.prototype.onMouseDown=function(t){t.button,pc.MOUSEBUTTON_LEFT},Mouse.prototype.onMouseUp=function(t){t.button===pc.MOUSEBUTTON_LEFT&&(this.Selected=0)};var Touch=pc.createScript("touch");Touch.attributes.add("Selected",{type:"number",default:0});var LastX=0,LastY=0,dx=0,dy=0;Touch.prototype.initialize=function(){this.pos=new pc.Vec3,this.cameraEntity=this.app.root.findByName("Camera");var t=this.app.touch;t&&(t.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),t.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),t.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this),t.on(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this)),this.on("destroy",(function(){t.off(pc.EVENT_TOUCHSTART,this.onTouchStart,this),t.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),t.off(pc.EVENT_TOUCHEND,this.onTouchEnd,this),t.off(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this)}),this)},Touch.prototype.updateFromScreen=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth;var o=this.app.graphicsDevice.canvas.clientHeight,e=(o-t.y)/o*16;console.log("depth: = "+e);var i=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,e,this.pos),this.entity.setPosition(this.pos.x,i.y,this.pos.z),this.entity.getPosition().z>3&&this.entity.setPosition(this.pos.x,i.y,3)}},Touch.prototype.onTouchStart=function(t){1===t.touches.length&&this.updateFromScreen(t.touches[0]),t.event.preventDefault()},Touch.prototype.onTouchMove=function(t){this.updateFromScreen(t.touches[0]),t.event.preventDefault()},Touch.prototype.onTouchEnd=function(t){this.Selected=0,t.event.preventDefault()},Touch.prototype.onTouchCancel=function(t){this.Selected=0,t.event.preventDefault()};var PickerRaycast=pc.createScript("pickerRaycast");PickerRaycast.prototype.initialize=function(){this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onSelect,this);var t=this.app.touch;t&&t.on(pc.EVENT_TOUCHSTART,this.onTouch,this),this.on("destroy",(function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onSelect,this),t&&this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouch,this)}),this)},PickerRaycast.prototype.onSelect=function(t){var e=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.nearClip),i=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.farClip);this.app.systems.rigidbody.raycastFirst(e,i,(function(t){var e=t.entity;e.script.mouse&&(e.script.mouse.Selected=1),e.script.sliderHorizontal&&(e.script.sliderHorizontal.Selected=1),e.script.scaleSlider&&(e.script.scaleSlider.Selected=1),e.script.sliderVisible&&e.script.sliderVisible.showSlider(),e.script.sliderVertical&&(e.script.sliderVertical.Selected=1,console.log("Vert Slider Selected")),e.script.showHeightAndWidth&&e.script.showHeightAndWidth.showArrows(),console.log("raycastHit")}))},PickerRaycast.prototype.onTouch=function(t){var e=this.entity.camera.screenToWorld(t.touches[0].x,t.touches[0].y,this.entity.camera.nearClip),i=this.entity.camera.screenToWorld(t.touches[0].x,t.touches[0].y,this.entity.camera.farClip);console.log("raycastHit"),console.log("screenx: "+t.x+" screenY: "+t.y),console.log("from: "+e+" to: "+i),this.app.systems.rigidbody.raycastFirst(e,i,(function(t){var e=t.entity;e.script.touch&&(e.script.touch.Selected=1),e.script.sliderHorizontal&&(e.script.sliderHorizontal.Selected=1),e.script.sliderVertical&&(e.script.sliderVertical.Selected=1),e.script.showHeightAndWidth&&e.script.showHeightAndWidth.showArrows(),console.log("raycastHitInside")}))};var LoadImage=pc.createScript("loadImage");LoadImage.attributes.add("url",{type:"string"}),LoadImage.prototype.initialize=function(){const e=window.location.search;console.log(e);const t=new URLSearchParams(e).get("filename");console.log(t),this.url=t,setInterval((function(){this.changeToNextTexture()}),1e3)},LoadImage.prototype.changeToNextTexture=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);for(var a=this.entity.findComponents("render"),n=0;n<a.length;++n)for(var o=a[n].meshInstances,r=0;r<o.length;r++){var i=o[r].material;i.diffuseMap=t,i.update()}},e.src=this.url};var SwitchingTextures=pc.createScript("switchingTextures");SwitchingTextures.attributes.add("textures",{type:"asset",assetType:"texture",array:!0,title:"Textures"}),SwitchingTextures.attributes.add("url",{type:"string"}),SwitchingTextures.attributes.add("WebTexture",{type:"asset",assetType:"texture",array:!1,title:"WebTexture"}),SwitchingTextures.prototype.initialize=function(){var e=this;this.textureIndex=0;const t=window.location.search;console.log(t);const r=new URLSearchParams(t).get("filename");console.log(r),this.url=r,setInterval((function(){e.changeToNextTexture(),console.log("switchCalled")}),5e3)},SwitchingTextures.prototype.getTextureFromWeb=function(){var e=new Image;e.crossOrigin="anonymous",e.src=this.url,texture.setSource(e)},SwitchingTextures.prototype.changeToNextTexture=function(e){this.textureIndex=(this.textureIndex+1)%this.textures.length;var t=this.textures[this.textureIndex].resource,r=new Image;r.crossOrigin="anonymous",r.src=this.url,t.setSource(r);for(var s=this.entity.findComponents("render"),i=0;i<s.length;++i)for(var n=s[i].meshInstances,a=0;a<n.length;a++){var u=n[a].material;u.diffuseMap=t,u.emissiveMap=t,u.opacityMap=t,u.blendType="alpha",u.alphaTest=.686,u.update()}};var GetWidthFromUrlparams=pc.createScript("getWidthFromUrlparams");GetWidthFromUrlparams.attributes.add("width",{type:"string"}),GetWidthFromUrlparams.prototype.initialize=function(){const t=window.location.search;console.log(t);const r=new URLSearchParams(t).get("width");console.log(r),this.width=r,this.entity.element.text=this.width},GetWidthFromUrlparams.prototype.update=function(t){};var GetHeightFromUrlparams=pc.createScript("getHeightFromUrlparams");GetWidthFromUrlparams.attributes.add("height",{type:"string"}),GetHeightFromUrlparams.prototype.initialize=function(){const t=window.location.search;console.log(t);const e=new URLSearchParams(t).get("height");console.log(e),this.height=e,this.entity.element.text=this.height},GetHeightFromUrlparams.prototype.update=function(t){};var ShowHeightAndWidth=pc.createScript("showHeightAndWidth");ShowHeightAndWidth.attributes.add("width",{type:"entity"}),ShowHeightAndWidth.attributes.add("height",{type:"entity"}),ShowHeightAndWidth.attributes.add("hideInterval",{type:"number"}),ShowHeightAndWidth.attributes.add("baseScaleWidth",{type:"number"}),ShowHeightAndWidth.attributes.add("baseScaleHeight",{type:"number"}),ShowHeightAndWidth.attributes.add("physicalHeight",{type:"number"}),ShowHeightAndWidth.attributes.add("physicalWidth",{type:"number"}),ShowHeightAndWidth.attributes.add("ImageEntity",{type:"entity"}),ShowHeightAndWidth.prototype.initialize=function(){this.timer=0;const t=window.location.search;console.log(t);const i=new URLSearchParams(t),e=i.get("height");this.physicalHeight=parseFloat(e);const h=i.get("width");this.physicalWidth=parseFloat(h),console.log(h),this.ImageEntity.setLocalScale(this.physicalWidth/this.baseScaleWidth,this.entity.getLocalScale().y,this.physicalHeight/this.baseScaleHeight)},ShowHeightAndWidth.prototype.update=function(t){this.timer+=t,this.timer>this.hideInterval&&(this.timer=0,this.width.enabled=!1,this.height.enabled=!1)},ShowHeightAndWidth.prototype.showArrows=function(){this.timer=0,this.width.enabled=!0,this.height.enabled=!0};var ButtonLogic=pc.createScript("buttonLogic");ButtonLogic.attributes.add("textEntity",{type:"entity",description:"The entity that we want to update when the button is clicked"}),ButtonLogic.attributes.add("description",{type:"string"}),ButtonLogic.attributes.add("model",{type:"entity"}),ButtonLogic.prototype.initialize=function(){this.entity.button.on("click",(function(t){var e=this.textEntity.element.text,i=e.charAt(e.length-1),n=e[0],o=0,a=0;"6"==i?(o=0,i="0",a=parseInt(n),n=(++a).toString()):"0"==i&&(o=5,i="6",a=parseInt(n));var c=a.toString()+"."+o.toString(),r=parseFloat(c);this.model.setLocalScale(r/5.5*.105,r/5.5*.105,r/5.5*.105),this.textEntity.element.text=n+"'"+i}),this)};var ButtonLogic2=pc.createScript("buttonLogic2");ButtonLogic2.attributes.add("textEntity",{type:"entity",description:"The entity that we want to update when the button is clicked"}),ButtonLogic2.attributes.add("description",{type:"string"}),ButtonLogic2.attributes.add("model",{type:"entity"}),ButtonLogic2.prototype.initialize=function(){this.entity.button.on("click",(function(t){var e=this.textEntity.element.text,i=e.charAt(e.length-1),n=e[0],o=parseInt(i),a=parseInt(n);"6"==i?(o=0,i="0",a=parseInt(n)):"0"==i&&(o=5,i="6",a=parseInt(n),n=(--a).toString());var r=a.toString()+"."+o.toString(),c=parseFloat(r);this.model.setLocalScale(c/5.5*.105,c/5.5*.105,c/5.5*.105),this.textEntity.element.text=n+"'"+i}),this)};var RoomWidthSlider=pc.createScript("roomWidthSlider");RoomWidthSlider.attributes.add("html",{type:"asset",assetType:"html",title:"HTML Asset"}),RoomWidthSlider.attributes.add("css",{type:"asset",assetType:"css",title:"CSS Asset"}),RoomWidthSlider.prototype.initialize=function(){this.addUi(),this.addUi()},RoomWidthSlider.prototype.update=function(t){},RoomWidthSlider.prototype.addUi=function(){var t=this,e=document.createElement("style");document.head.appendChild(e),e.innerHTML=this.css.resource||"",this.div=document.createElement("div"),this.div.classList.add("container"),this.div.innerHTML=this.html.resource||"",document.body.appendChild(this.div),this.resumeFlythroughButton=this.div.querySelector(".button"),this.pathSlider=this.div.querySelector(".slider"),this.resumeFlythroughButton.addEventListener("click",(function(){t.flyingThrough=!0})),this.pathSlider.addEventListener("input",(function(){t.flyingThrough=!1,t.time=t.pathSlider.value/t.pathSlider.max*t.duration}))};var SliderHorizontal=pc.createScript("sliderHorizontal");SliderHorizontal.attributes.add("Selected",{type:"number",default:0}),SliderHorizontal.attributes.add("SliderValue",{type:"number",default:0}),SliderHorizontal.attributes.add("MinLimit",{type:"entity"}),SliderHorizontal.attributes.add("MaxLimit",{type:"entity"}),SliderHorizontal.attributes.add("RoomWidth",{type:"entity"}),SliderHorizontal.attributes.add("RoomWidthText",{type:"entity"}),SliderHorizontal.attributes.add("MinLimitOffset",{type:"number",default:0}),SliderHorizontal.attributes.add("MaxLimitOffset",{type:"number",default:0}),SliderHorizontal.prototype.initialize=function(){this.pos=new pc.Vec3,this.roomWidthInitialScale=this.RoomWidth.getLocalScale().z,this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this)},SliderHorizontal.prototype.update=function(t){},SliderHorizontal.prototype.onMouseDown=function(t){},SliderHorizontal.prototype.onMouseMove=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth,this.app.graphicsDevice.canvas.clientHeight;var i=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,.808,this.pos),this.entity.setPosition(this.pos.x,i.y,-5.18),console.log("This.x: "+this.entity.getPosition().x+"Max Limit: "+this.entity.getPosition().x),this.entity.getPosition().x<this.MaxLimit.getPosition().x+this.MaxLimitOffset&&this.entity.setPosition(this.MaxLimit.getPosition().x+this.MaxLimitOffset,this.entity.getPosition().y,this.entity.getPosition().z),this.entity.getPosition().x>this.MinLimit.getPosition().x-this.MinLimitOffset&&this.entity.setPosition(this.MinLimit.getPosition().x-this.MinLimitOffset,this.entity.getPosition().y,this.entity.getPosition().z);var e=this.MinLimit.getPosition().distance(this.MaxLimit.getPosition()),o=this.MinLimit.getPosition().distance(this.entity.getPosition());this.SliderValue=o/e,this.RoomWidth.setLocalScale(this.RoomWidth.getLocalScale().x,this.RoomWidth.getLocalScale().y,this.roomWidthInitialScale*(1+this.SliderValue));var s=2*(1+this.SliderValue);this.RoomWidthText.element.text=s.toFixed(1).toString(),console.log(this.RoomWidth.getLocalScale()),console.log(this.SliderValue)}},SliderHorizontal.prototype.onMouseUp=function(t){t.button===pc.MOUSEBUTTON_LEFT&&(this.Selected=0)};var SliderVertical=pc.createScript("sliderVertical");SliderVertical.attributes.add("Selected",{type:"number",default:0}),SliderVertical.attributes.add("SliderValue",{type:"number",default:0}),SliderVertical.attributes.add("MinLimit",{type:"entity"}),SliderVertical.attributes.add("MaxLimit",{type:"entity"}),SliderVertical.attributes.add("Ceiling",{type:"entity"}),SliderVertical.attributes.add("CeilingHeightText",{type:"entity"}),SliderVertical.attributes.add("MinLimitOffset",{type:"number",default:0}),SliderVertical.attributes.add("MaxLimitOffset",{type:"number",default:0}),SliderVertical.attributes.add("RaiseFactor",{type:"number",default:1}),SliderVertical.prototype.initialize=function(){this.pos=new pc.Vec3,this.initialCielingHeight=this.Ceiling.getPosition().y,this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this);var i=this.MinLimit.getPosition().distance(this.MaxLimit.getPosition()),t=this.MinLimit.getPosition().distance(this.entity.getPosition());this.SliderValue=t/i,this.Ceiling.setLocalPosition(this.Ceiling.getPosition().x,this.initialCielingHeight+this.SliderValue*this.RaiseFactor,this.Ceiling.getPosition().z),this.CeilingHeightText.element.text=(this.initialCielingHeight+this.SliderValue*this.RaiseFactor).toFixed(1).toString()},SliderVertical.prototype.update=function(i){},SliderVertical.prototype.onMouseDown=function(i){},SliderVertical.prototype.onMouseMove=function(i){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth,this.app.graphicsDevice.canvas.clientHeight;var t=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(i.x,i.y,.808,this.pos),this.entity.setPosition(t.x,this.pos.y,-5.18),this.entity.getPosition().y>this.MaxLimit.getPosition().y-this.MaxLimitOffset&&this.entity.setPosition(this.entity.getPosition().x,this.MaxLimit.getPosition().y-this.MaxLimitOffset,this.entity.getPosition().z),this.entity.getPosition().y<this.MinLimit.getPosition().y-this.MinLimitOffset&&this.entity.setPosition(this.entity.getPosition().x,this.MinLimit.getPosition().y-this.MinLimitOffset,this.entity.getPosition().z);var e=this.MinLimit.getPosition().distance(this.MaxLimit.getPosition()),s=this.MinLimit.getPosition().distance(this.entity.getPosition());this.SliderValue=s/e,this.Ceiling.setLocalPosition(this.Ceiling.getPosition().x,this.initialCielingHeight+this.SliderValue*this.RaiseFactor,this.Ceiling.getPosition().z),this.CeilingHeightText.element.text=(this.initialCielingHeight+this.SliderValue*this.RaiseFactor).toFixed(1).toString(),console.log(this.SliderValue)}},SliderVertical.prototype.onMouseUp=function(i){i.button===pc.MOUSEBUTTON_LEFT&&(this.Selected=0)};var ScaleSlider=pc.createScript("scaleSlider");ScaleSlider.attributes.add("Selected",{type:"number",default:0}),ScaleSlider.attributes.add("SliderValue",{type:"number",default:0}),ScaleSlider.attributes.add("MinLimit",{type:"entity"}),ScaleSlider.attributes.add("MaxLimit",{type:"entity"}),ScaleSlider.attributes.add("Model",{type:"entity"}),ScaleSlider.attributes.add("ModelHeightText",{type:"entity"}),ScaleSlider.attributes.add("MinLimitOffset",{type:"number",default:0}),ScaleSlider.attributes.add("MaxLimitOffset",{type:"number",default:0}),ScaleSlider.attributes.add("RaiseFactor",{type:"number",default:1}),ScaleSlider.prototype.initialize=function(){this.pos=new pc.Vec3,this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this)},ScaleSlider.prototype.update=function(t){},ScaleSlider.prototype.onMouseDown=function(t){},ScaleSlider.prototype.onMouseMove=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth;var i=this.app.graphicsDevice.canvas.clientHeight,e=(i-t.y)/i*16,s=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,e,this.pos),this.entity.setPosition(s.x,this.pos.y,s.z),this.entity.getPosition().y>this.MaxLimit.getPosition().y&&this.entity.setPosition(this.entity.getPosition().x,this.MaxLimit.getPosition().y,this.entity.getPosition().z),this.entity.getPosition().y<this.MinLimit.getPosition().y&&this.entity.setPosition(this.entity.getPosition().x,this.MinLimit.getPosition().y,this.entity.getPosition().z);var o=this.MinLimit.getPosition().distance(this.MaxLimit.getPosition()),a=this.MinLimit.getPosition().distance(this.entity.getPosition());this.SliderValue=a/o,this.Model.setLocalScale(.07+.03*this.SliderValue,.07+.03*this.SliderValue,.07+.03*this.SliderValue),this.ModelHeightText.element.text=(140+60*this.SliderValue).toFixed(0).toString(),console.log(this.SliderValue)}},ScaleSlider.prototype.onMouseUp=function(t){t.button===pc.MOUSEBUTTON_LEFT&&(this.Selected=0)};var SliderVisible=pc.createScript("sliderVisible");SliderVisible.attributes.add("SliderEntity",{type:"entity"}),SliderVisible.attributes.add("Interval",{type:"number",default:5}),SliderVisible.prototype.initialize=function(){this.timer=0},SliderVisible.prototype.update=function(i){this.timer+=i,this.timer>this.Interval&&(this.timer=0,this.SliderEntity.enabled=!1)},SliderVisible.prototype.showSlider=function(){this.timer=0,this.SliderEntity.enabled=!0};