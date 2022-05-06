var Mouse=pc.createScript("mouse");Mouse.attributes.add("Selected",{type:"number",default:0}),Mouse.attributes.add("redMaterial",{type:"asset",assetType:"material"}),Mouse.attributes.add("greenMaterial",{type:"asset",assetType:"material"}),Mouse.attributes.add("blueMaterial",{type:"asset",assetType:"material"}),Mouse.prototype.initialize=function(){this.pos=new pc.Vec3,this.app.mouse.disableContextMenu(),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onMouseUp,this)},Mouse.prototype.onMouseMove=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth;var e=this.app.graphicsDevice.canvas.clientHeight,s=(e-t.y)/e*16,i=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,s,this.pos),this.entity.setPosition(this.pos.x,i.y,this.pos.z),this.entity.getPosition().z>3&&this.entity.setPosition(this.pos.x,i.y,3)}},Mouse.prototype.onMouseDown=function(t){t.button,pc.MOUSEBUTTON_LEFT},Mouse.prototype.onMouseUp=function(t){t.button===pc.MOUSEBUTTON_LEFT&&(this.Selected=0)};var Touch=pc.createScript("touch");Touch.attributes.add("Selected",{type:"number",default:0});var LastX=0,LastY=0,dx=0,dy=0;Touch.prototype.initialize=function(){this.pos=new pc.Vec3,this.cameraEntity=this.app.root.findByName("Camera");var t=this.app.touch;t&&(t.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),t.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),t.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this),t.on(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this)),this.on("destroy",(function(){t.off(pc.EVENT_TOUCHSTART,this.onTouchStart,this),t.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),t.off(pc.EVENT_TOUCHEND,this.onTouchEnd,this),t.off(pc.EVENT_TOUCHCANCEL,this.onTouchCancel,this)}),this)},Touch.prototype.updateFromScreen=function(t){if(1==this.Selected){this.app.graphicsDevice.canvas.clientWidth;var o=this.app.graphicsDevice.canvas.clientHeight,e=(o-t.y)/o*16;console.log("depth: = "+e);var i=this.entity.getPosition();this.app.root.findByName("Camera").camera.screenToWorld(t.x,t.y,e,this.pos),this.entity.setPosition(this.pos.x,i.y,this.pos.z),this.entity.getPosition().z>3&&this.entity.setPosition(this.pos.x,i.y,3)}},Touch.prototype.onTouchStart=function(t){1===t.touches.length&&this.updateFromScreen(t.touches[0]),t.event.preventDefault()},Touch.prototype.onTouchMove=function(t){this.updateFromScreen(t.touches[0]),t.event.preventDefault()},Touch.prototype.onTouchEnd=function(t){this.Selected=0,t.event.preventDefault()},Touch.prototype.onTouchCancel=function(t){this.Selected=0,t.event.preventDefault()};var PickerRaycast=pc.createScript("pickerRaycast");PickerRaycast.prototype.initialize=function(){this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onSelect,this);var t=this.app.touch;t&&t.on(pc.EVENT_TOUCHSTART,this.onTouch,this),this.on("destroy",(function(){this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onSelect,this),t&&this.app.touch.off(pc.EVENT_TOUCHSTART,this.onTouch,this)}),this)},PickerRaycast.prototype.onSelect=function(t){var i=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.nearClip),s=this.entity.camera.screenToWorld(t.x,t.y,this.entity.camera.farClip);this.app.systems.rigidbody.raycastFirst(i,s,(function(t){var i=t.entity;i.script.mouse.Selected=1,i.script.showHeightAndWidth&&i.script.showHeightAndWidth.showArrows(),console.log("raycastHit")}))},PickerRaycast.prototype.onTouch=function(t){var i=this.entity.camera.screenToWorld(t.touches[0].x,t.touches[0].y,this.entity.camera.nearClip),s=this.entity.camera.screenToWorld(t.touches[0].x,t.touches[0].y,this.entity.camera.farClip);console.log("raycastHit"),console.log("screenx: "+t.x+" screenY: "+t.y),console.log("from: "+i+" to: "+s),this.app.systems.rigidbody.raycastFirst(i,s,(function(t){var i=t.entity;i.script.touch.Selected=1,i.script.showHeightAndWidth&&i.script.showHeightAndWidth.showArrows(),console.log("raycastHitInside")}))};var LoadImage=pc.createScript("loadImage");LoadImage.attributes.add("url",{type:"string"}),LoadImage.prototype.initialize=function(){const e=window.location.search;console.log(e);const t=new URLSearchParams(e).get("filename");console.log(t),this.url=t,setInterval((function(){this.changeToNextTexture()}),1e3)},LoadImage.prototype.changeToNextTexture=function(){var e=new Image;e.crossOrigin="anonymous",e.onload=function(){var t=new pc.Texture(self.app.graphicsDevice);t.setSource(e);for(var a=this.entity.findComponents("render"),n=0;n<a.length;++n)for(var o=a[n].meshInstances,r=0;r<o.length;r++){var i=o[r].material;i.diffuseMap=t,i.update()}},e.src=this.url};var SwitchingTextures=pc.createScript("switchingTextures");SwitchingTextures.attributes.add("textures",{type:"asset",assetType:"texture",array:!0,title:"Textures"}),SwitchingTextures.attributes.add("url",{type:"string"}),SwitchingTextures.attributes.add("WebTexture",{type:"asset",assetType:"texture",array:!1,title:"WebTexture"}),SwitchingTextures.prototype.initialize=function(){var e=this;this.textureIndex=0;const t=window.location.search;console.log(t);const r=new URLSearchParams(t).get("filename");console.log(r),this.url=r,setInterval((function(){e.changeToNextTexture(),console.log("switchCalled")}),5e3)},SwitchingTextures.prototype.getTextureFromWeb=function(){var e=new Image;e.crossOrigin="anonymous",e.src=this.url,texture.setSource(e)},SwitchingTextures.prototype.changeToNextTexture=function(e){this.textureIndex=(this.textureIndex+1)%this.textures.length;var t=this.textures[this.textureIndex].resource,r=new Image;r.crossOrigin="anonymous",r.src=this.url,t.setSource(r);for(var s=this.entity.findComponents("render"),i=0;i<s.length;++i)for(var n=s[i].meshInstances,a=0;a<n.length;a++){var u=n[a].material;u.diffuseMap=t,u.emissiveMap=t,u.opacityMap=t,u.blendType="alpha",u.alphaTest=.686,u.update()}};var GetWidthFromUrlparams=pc.createScript("getWidthFromUrlparams");GetWidthFromUrlparams.attributes.add("width",{type:"string"}),GetWidthFromUrlparams.prototype.initialize=function(){const t=window.location.search;console.log(t);const r=new URLSearchParams(t).get("width");console.log(r),this.width=r,this.entity.element.text=this.width},GetWidthFromUrlparams.prototype.update=function(t){};var GetHeightFromUrlparams=pc.createScript("getHeightFromUrlparams");GetWidthFromUrlparams.attributes.add("height",{type:"string"}),GetHeightFromUrlparams.prototype.initialize=function(){const t=window.location.search;console.log(t);const e=new URLSearchParams(t).get("height");console.log(e),this.height=e,this.entity.element.text=this.height},GetHeightFromUrlparams.prototype.update=function(t){};var ShowHeightAndWidth=pc.createScript("showHeightAndWidth");ShowHeightAndWidth.attributes.add("width",{type:"entity"}),ShowHeightAndWidth.attributes.add("height",{type:"entity"}),ShowHeightAndWidth.attributes.add("hideInterval",{type:"number"}),ShowHeightAndWidth.attributes.add("baseScale",{type:"number"}),ShowHeightAndWidth.attributes.add("physicalHeight",{type:"number"}),ShowHeightAndWidth.attributes.add("physicalWidth",{type:"number"}),ShowHeightAndWidth.prototype.initialize=function(){this.timer=0;const t=window.location.search;console.log(t);const i=new URLSearchParams(t),e=i.get("height");this.physicalHeight=parseFloat(e);const h=i.get("width");this.physicalWidth=parseFloat(h),console.log(h),this.entity.setLocalScale(this.physicalWidth/this.baseScale,this.entity.getLocalScale().y,this.physicalHeight/this.baseScale)},ShowHeightAndWidth.prototype.update=function(t){this.timer+=t,this.timer>this.hideInterval&&(this.timer=0,this.width.enabled=!1,this.height.enabled=!1)},ShowHeightAndWidth.prototype.showArrows=function(){this.timer=0,this.width.enabled=!0,this.height.enabled=!0};