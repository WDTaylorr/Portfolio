// TypeWriter

const TypeWriter = function(txtElement,words,wait=3000){
  this.txtElement = txtElement
  this.words = words
  this.txt = ""
  this.wordIndex = 0
  this.wait = parseInt(wait,10)
  this.type()
  this.isDeleting = false
}

// Type Method
TypeWriter.prototype.type = function(){
  // Current Index of word
  const current = this.wordIndex % this.words.length
  // Get text of current word
  const fullTxt = this.words[current]
  
  // Check if deleting
  if(this.isDeleting){
    // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1)

  }else{
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  // Insert Txt into element
  this.txtElement.innerHTML = '<span class="txt">'+this.txt+'</span>'
  
  // Initial Type Speed
  let typeSpeed = 200
  if(this.isDeleting){
    typeSpeed /=2
  }

  //If word is complete
  if(!this.isDeleting && this.txt === fullTxt){
    // Make pause
    typeSpeed = this.wait
    // Set isDeleting to true
    this.isDeleting = true
  }else if(this.isDeleting && this.txt == ""){
    this.isDeleting = false
    // MOVE to next word
    this.wordIndex ++
    // Pause Before start typing
    typeSpeed = 500
  }


  setTimeout( () => this.type(), typeSpeed)
}

// Init on DOM Load
document.addEventListener("DOMContentLoaded",init)

// Init App
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}









// Themes
let circles = document.getElementsByClassName("circle")

// Save Theme
let theme = localStorage.getItem("theme")
if(theme==null){
  setTheme("dark-mode")
}else{
  setTheme(theme)
}

// Click listen
for (var i = 0; circles.length > i; i++){
  circles[i].addEventListener("click", function(){
    let mode = this.dataset.mode
    setTheme(mode)
  })
}

// Theme Set
function setTheme(mode){
  if (mode=="dark-mode"){
    document.getElementById("theme-style").href = "style.css"
  }
  if (mode=="light-mode"){
    document.getElementById("theme-style").href = "light.css"
  }
  localStorage.setItem("theme", mode)
}