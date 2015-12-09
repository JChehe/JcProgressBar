function JcProgressBar(options, root) {
    this.progress = 0,
        this.root = root,
        this.endTimer = null,
        this.progressDom = document.createElement("div"),
        this.options = {
            id: "jc-progress",
            height: "2px",
            backgroundColor: "#68BE04",
            position: "top",
            duration : 0.5
        }
    if (options != undefined && typeof options === "object") {
        for (var x in options) {
            this["options"][x] = options[x]
        }
    }

    this.init();

}

JcProgressBar.prototype.getOption = function() {
    console.log(this.options)
}

JcProgressBar.prototype.init = function() {
    var targetDom = null;
    if (this.root !== undefined) {
        targetDom = document.querySelector(this.root);
        if (targetDom == null) {
            targetDom = document.body;
            console.log("没有匹配到目标元素");
        }
    } else {
        targetDom = document.body;
    }

    this.progressDom.classList.add('progress')
    this.progressDom.classList.add('progress-bar')

    this.progressDom.id = this.options.id;
    // this.progressDom.style.backgroundColor = this.options.backgroundColor;
    this.progressDom.style.backgroundImage = "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)"
    this.progressDom.style.height = this.options.height;
    this.progressDom.style.position = "absolute";
    this.progressDom.style.width = "0"
    this.progressDom.style.top = "0";
    this.progressDom.style.left = "0";
    this.progressDom.style.opacity = 1;
    this.progressDom.style.transition = "width " + this.options.duration+"s,opacity "
    		+ this.options.duration +"s "+ this.options.duration*1.5 + "s";
    

    if (getStyle(targetDom, "position") == "static") {
        targetDom.style.position = "relative";
    }

    targetDom.appendChild(this.progressDom);

    this.transitionEndHandler()
    return this;
}
JcProgressBar.prototype.transition = function() {
    this.show()
    this.progressDom.style.opacity = 1;
    this.progressDom.style.width = this.progress + "%"
}

JcProgressBar.prototype.transitionEndHandler = function(cb, isFinsh) {
    clearTimeout(this.endTimer)
    this.endTimer = setTimeout(function(){
        cb&&cb()
        if(isFinsh){
            this.reset()
        }
    }.bind(this), isFinsh ? this.options.duration * 2500 : this.options.duration * 1000)
}




JcProgressBar.prototype.setProcess = function(number, cb){
    if (number > 100) {
        this.progress = 100
    } else if (number < 0) {
        this.progress = 0
    }else{
        this.progress = number;
    }

	this.transition()
	this.transitionEndHandler(cb)
}

JcProgressBar.prototype.finish = function(cb) {
    this.setProcess(100, cb)
    this.fade()
    this.transitionEndHandler(cb, true)
}

JcProgressBar.prototype.increase = function(number, cb){
    this.progress += 10;
	this.setProcess(this.progress, cb)
}
JcProgressBar.prototype.decrease = function(number, cb){
    this.progress -= 10;
    this.setProcess(this.progress, cb)
}

JcProgressBar.prototype.show = function(cb){
	this.progressDom.style.display = "block";
    this.progressDom.style.opacity = 1;
	cb && cb();
}

JcProgressBar.prototype.hide = function(cb){
	this.progressDom.style.display = "none";
    this.progressDom.style.oparent = 0;
	cb && cb();
}

JcProgressBar.prototype.reset = function(cb){
    this.progress = 0;
    this.fade()
    this.setProcess(this.progress, cb)
}

JcProgressBar.prototype.fade = function(){
	this.progressDom.style.opacity = 0;
}

JcProgressBar.prototype.destroy = function(cb){
    this.progressDom.parentNode.removeChild(this.progressDom)
}
