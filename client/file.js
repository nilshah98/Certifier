var content;

function csvClick(event){
    event.target.parentElement.querySelector(".click-here").innerHTML = "File Selected: ";
    event.target.parentElement.querySelector(".file-name").innerHTML = "<strong>" + event.target.files[0].name + "</strong";
    var tick = event.target.parentElement.querySelectorAll("svg");
    tick.forEach( (t)=>{
        t.classList.toggle("hide");
        t.classList.add("path-animate");
    });
    fileSelect(event); 
}

function fileSelect(evt){

    // console.log(evt.target.files);
    var csvFile = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(csvFile);
    reader.onload = function(f){
        content = f.target.result.toString().split("\n");
        // draw(content);
        var header = content[0].split(",");
        // console.log(header);
        // var ext = document.getElementById("csv").value.toString().split(".");
        var ext = evt.target.files[0].name.split(".");
        ext = ext[ext.length - 1];
        var result = true;
        // console.log(ext,evt.target.files[0]);
        header.forEach( (e) => {
            // console.log(e.toUpperCase().trim(),attributes);
            if (!(e.toUpperCase().trim() in attributes)) {
                result = false;
            }
        });
        if( result & ext == "csv" /* Add header matching conditions here */ ){
            var button = document.getElementById("create-certificate");
            button.disabled = false;
            button.onclick = function(){
                // console.log(content);

                document.getElementById("second").innerHTML = "";

                draw(content);


            }
        }
    }

}

function preview(evt){
    evt.target.querySelector(".click-here").innerHTML = "File Selected: ";
    evt.target.querySelector(".file-name").innerHTML = "<strong>" + evt.target.files[0].name + "</strong";
    var tick = evt.target.querySelectorAll("svg");
    tick.forEach( (t)=>{
        t.classList.toggle("hide");
        t.classList.add("path-animate");
    });         
}

var dragndrop = document.querySelectorAll(".drag-drop-box .click-here");
dragndrop.forEach( (dnd) => {
    dnd.onclick = function(){
        // fileInput.click();
        dnd.parentElement.querySelector(".file-map").click();
    }
});

function onDrop(event){
    event.preventDefault();
    var uploadBox = event.target;
    uploadBox.classList.remove("drag-over");
    // uploadBox.classList.add("box");
    // console.log(event.target,uploadBox.querySelector(".file-map"));
    // uploadBox.querySelector(".file-map").files = event.dataTransfer.files;
    event.target.files = event.dataTransfer.files;
    preview(event);
    // if(event.target.id == "csv"){
    //     fileSelect(event);
    // } else {
    // alert(event.target.querySelector(".file-map").id + " clicked!! " + event.target.querySelector(".file-map").files[0].name);
    // uploadBox.querySelector(".file-map").click();
    if(uploadBox.querySelector(".file-map").id == "csv" ){
        fileSelect(event);
    } else {
        handleImage(event);
    }
}