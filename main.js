let input=document.querySelector('.create input');
let container=document.querySelector('.list-container');
let clearcompleted=document.querySelector('.summary a');
let active=document.querySelector('.buttons li:nth-child(2)');
let completed=document.querySelector('.buttons li:nth-child(3)');
let all=document.querySelector('.buttons li:nth-child(1)');
let buttons=document.querySelectorAll('.buttons li');



 $(document).ready(counter());
   
 //On pressed ENTER key create new element
input.addEventListener('keyup',function(e){
    if(e.keyCode==13&&input.value!=''){
        let newdiv=document.createElement("div");
        (img.src.indexOf("sun")>-1) ?  newdiv.className="item item-dark-mode":newdiv.className="item" ;
        newdiv.setAttribute('draggable','true');
        let newcircle=document.createElement("div");
        (img.src.indexOf("sun")>-1) ?  newcircle.className="circle circle-dark-mode":newcircle.className="circle" ;
        let newcircle2=document.createElement("div");
        (img.src.indexOf("sun")>-1) ?  newcircle2.className="circle2 circle2-dark-mode":newcircle2.className="circle2" ;
        let newimg=document.createElement("img");
        newimg.src="images/icon-check.svg";
        newimg.className="displaynone";
        let newp=document.createElement("p");
        let newimg2=document.createElement("img");
        newimg2.classList.add("cross");

        function myFunction(x) {
            if (x.matches) { // If media query matches
                newimg2.classList.add("displayblock");
            } else {
                newimg2.classList.add("displaynone");
            }
          }
          
          var x = window.matchMedia("(max-width: 700px)")
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction) // Attach listener function on state changes

        newimg2.src="images/icon-cross.svg"
        newimg2.addEventListener('click',function(){newimg2.parentNode.remove()});
        newp.innerText=input.value;
        input.value="";
        newcircle.appendChild(newcircle2);
        newcircle.appendChild(newimg);
        newdiv.appendChild(newcircle);
        newdiv.appendChild(newp);
        newdiv.appendChild(newimg2);
        container.insertBefore(newdiv,container.lastElementChild);
        if(document.querySelector('.buttons li:nth-child(3)').classList.contains("marked")){
            newdiv.style.display="none";
            //console.log('jo');
        };

        counter();
    }
    
})

//clear completed function
clearcompleted.addEventListener('click',function(e){
    e.preventDefault();
  let circle=$('.circle');
    for(let i=1;i<circle.length;i++){
        if(circle[i].classList.contains('clicked')) circle[i].parentNode.remove();
    }
    counter();
})

//sort active function
active.addEventListener('click',function(){
    let circle=$('.circle');
    for(let i=1;i<circle.length;i++){
        if(circle[i].classList.contains('clicked')){
            circle[i].parentNode.style.display="none";
        }
        else circle[i].parentNode.style.display="flex";
        
    }
})
//sort all function
all.addEventListener('click',function(){
    let circle=$('.circle');
    for(let i=1;i<circle.length;i++){
         circle[i].parentNode.style.display="flex"; 
    }
})
//sort completed function
completed.addEventListener('click',function(){
    let circle=$('.circle');
    for(let i=1;i<circle.length;i++){
        if(circle[i].classList.contains('clicked')){circle[i].parentNode.style.display="flex";}
        else circle[i].parentNode.style.display="none";
        
    }
})

//on item click function
$(document).on('click','.circle',function(e){
   // console.log(e.target.parentNode);
    if(e.target.classList.contains("circle") || e.target.classList.contains("circle clicked") || e.target.parentNode.parentNode.className=="create"){}
    else{
    if(e.target.parentNode.classList.contains('clicked'))
        {
            e.target.parentNode.classList.remove('clicked');
            e.target.parentNode.nextElementSibling.setAttribute('style','text-decoration-line:none');
        }   
        else {
            e.target.parentNode.classList.add('clicked');
            e.target.style.display="none";
            e.target.parentNode.nextElementSibling.setAttribute('style','text-decoration-line:line-through;text-decoration-thickness:0.1rem;color:hsl(233, 14%, 35%)');
            if(document.querySelector('.container>img').src.indexOf('sun')>-1) {
                e.target.parentNode.nextElementSibling.style.color="hsl(233, 14%, 35%)";
                //console.log('jo');
            }
            else{
                e.target.parentNode.nextElementSibling.style.color="hsl(233, 11%, 84%)";
                //console.log('ne');
            }
        }
        e.target.parentNode.lastElementChild.classList.toggle('displaynone');
    }
    });
 
    //on circle hover function
    $(document).on('mouseover','.circle',function(e){
        $(this).addClass("hovered");
        if($(this).hasClass("clicked")){}
        else $(this).find(">:first-child").css("display","block"); 
    })
    $(document).on('mouseout','.circle',function(e){
        $(this).removeClass("hovered");
        $(this).find(">:first-child").css("display","none"); 
    })

    //item counter function
function counter(){
    var values = [];
$('.circle').each(function(){
    values.push($(this).val());
});
$('.summary p').text((values.length-1)+" items left");
}

//cross on click delete function
$(document).on('click','.cross',function(e){
  e.target.parentNode.remove();
  counter();
    });

//drag and drop function
let current=null;
$(document).on('dragstart','.item',function(e) {
    current = this;  
});
$(document).on('dragover','.item',function(e){
   e.preventDefault();
    });
    
$(document).on('drop','.item',function (e) {
    let items=$('.item');
        e.preventDefault();
        if (this != current) {
          let currentpos = 0, droppedpos = 0;
          for (let it=0; it<items.length; it++) {
            if (current == items[it]) { currentpos = it; }
            if (this == items[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            this.parentNode.insertBefore(current, this.nextSibling);
          } else {
            this.parentNode.insertBefore(current, this);
          }
        }
      });

      //toggle dark mode function
let img=document.querySelector('.container>img');

img.addEventListener('click',function(){
    var image = document.querySelector('.background-image'),
        style = image.currentStyle || window.getComputedStyle(image, false),
        bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        mobilediv.classList.toggle("summarymobile-dark-mode");
    if(img.src.indexOf("sun")>-1) {
        if(bi.indexOf('mobile-dark')>-1)image.style.backgroundImage='url("images/bg-mobile-light.jpg")';
        else image.style.backgroundImage='url("images/bg-desktop-light.jpg")';
        img.src="images/icon-moon.svg";
    }
    else {
        if(bi.indexOf('mobile-light')>-1)image.style.backgroundImage='url("images/bg-mobile-dark.jpg")';
        else image.style.backgroundImage='url("images/bg-desktop-dark.jpg")';
        img.src="images/icon-sun.svg";
    }
    
        document.querySelectorAll('.item').forEach(function(item){
            item.classList.toggle('item-dark-mode');
        })
        document.querySelectorAll('.circle2').forEach(function(item){
            item.classList.toggle('circle2-dark-mode');
        })
        document.querySelector('.background').classList.toggle('background-dark-mode');
        document.querySelector('.body').classList.toggle('body-dark-mode');
        document.querySelector('.summary').classList.toggle('summary-dark-mode');
        document.querySelector('.create').classList.toggle('create-dark-mode');
        document.querySelector('.input').classList.toggle('input-dark-mode');
         
})

//buttons hover function
$(document).on("mouseover", ".buttons li", function(){
    if($(this).hasClass("marked")) {$(this).css("color", "hsl(235, 88%, 66%)")}
    else {let tColor = (img.src.indexOf("sun")>-1) ? 'hsl(236, 33%, 92%)' : 'hsl(235, 19%, 35%)';
 $(this).css("color", tColor);}
});
$(document).on("mouseout", ".buttons li", function(){
    if($(this).hasClass("marked")) {$(this).css("color", "hsl(235, 88%, 66%)")}
    else $(this).css("color", "hsl(233, 10%, 63%)");
});
$(document).on("mouseover", ".a", function(){
    let tColor = (img.src.indexOf("sun")>-1) ? 'hsl(236, 33%, 92%)' : 'hsl(235, 19%, 35%)';
    $(this).css("color", tColor);
});
$(document).on("mouseout", ".a", function(){
     $(this).css("color", "hsl(233, 10%, 63%)");
});

//buttons click function
for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(){
        buttons[i].classList.add('marked');
        for(let j=0;j<buttons.length;j++){
          if(j!=i)
          {
              buttons[j].classList.remove('marked');
              buttons[j].style.color='hsl(233, 10%, 63%)';
          }
        }
    })
}

//media query function
let containerbig=document.querySelector('.container');
let drag=document.querySelector('.drag');
let buttons2=document.querySelector('.buttons')
let summary=document.querySelector('.summary');
let mobilediv=document.createElement("div");
function myFunction(x) {
    if (x.matches) { // If media query matches
      mobilediv.appendChild(buttons2);
      let imgg=document.querySelector('.container>img');
      if(imgg.src.indexOf("sun")>-1) {
        mobilediv.className="summarymobile summarymobile-dark-mode";
    }
    else{
        mobilediv.className="summarymobile";
    }
      containerbig.insertBefore(mobilediv,drag);
      let crosses=document.querySelectorAll('.cross');
      crosses.forEach(item=>item.classList.remove("displaynone"));
      var img = document.querySelector('.background-image'),
      style = img.currentStyle || window.getComputedStyle(img, false),
      bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
      if(bi.indexOf('desktop-dark')>-1) img.style.backgroundImage='url("images/bg-mobile-dark.jpg")';
      if(bi.indexOf('desktop-light')>-1) img.style.backgroundImage='url("images/bg-mobile-light.jpg")';
     
    } 
    else {
        var img = document.querySelector('.background-image'),
        style = img.currentStyle || window.getComputedStyle(img, false),
        bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
        if(bi.indexOf('mobile-dark')>-1) img.style.backgroundImage='url("images/bg-desktop-dark.jpg")';
        if(bi.indexOf('mobile-light')>-1) img.style.backgroundImage='url("images/bg-desktop-light.jpg")';
       
        let crosses=document.querySelectorAll('.cross');
      crosses.forEach(item=>item.classList.add("displaynone"));
        if (document.querySelector('.summarymobile') == null) {
         }
    else{
        document.querySelector('.summarymobile').remove();
        summary.insertBefore(buttons2,document.querySelector('.summary a'));
        crosses.forEach(item=>item.classList.remove("displayblock"));
    }
    
    }
  }
  
  var x = window.matchMedia("(max-width: 700px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes