var imageLoader = document.getElementById("imageLoader");
var imageView = document.getElementById("imageView");
// offset of the image div, will always be a constant;
// else loop through the parents and add each offset through JS for dynamic;
var offSetX = 40;
var offSetY = 116;
var attributes = {};

imageLoader.addEventListener("change", imageClick, false);

function imageClick(event){

	event.target.parentElement.querySelector(".click-here").innerHTML = "File Selected: ";
	event.target.parentElement.querySelector(".file-name").innerHTML = "<strong>" + event.target.files[0].name + "</strong";
	var tick = event.target.parentElement.querySelectorAll("svg");
	tick.forEach( (t)=>{
		t.classList.toggle("hide");
		t.classList.add("path-animate");
	});
	handleImage(event);

}
// uploading image on clientside
function handleImage(e) {
	// create new file reader
	var reader = new FileReader();

	// on reader loading
	reader.onload = function(event) {
		// create new Image object
		var img = new Image();

		// on image loading
		img.onload = function() {
			// set imageView (image container) width and height, same as image
			imageView.width = img.width;
			imageView.height = img.height;
		};

		// set image source as the form input
		img.src = event.target.result;

		// set id as "baseImage" for img element
		img.id = "baseImage";
		img.classList.add("image-view");

		// append the img element to it's container
		imageView.appendChild(img);
	};

	// passing img blob to reader, and triggering onload event as defined above
	reader.readAsDataURL(e.target.files[0]);
}

// drawing rectangles on image, without using canvas
function initDraw(imageView) {
	// get current mouse position
	function setMousePosition(e) {
		var ev = e || window.event; //Moz || IE

		if (ev.pageX) {
			//Moz
			mouse.x = ev.pageX + window.pageXOffset;
			mouse.y = ev.pageY + window.pageYOffset;
		} else if (ev.clientX) {
			//IE
			mouse.x = ev.clientX + document.body.scrollLeft;
			mouse.y = ev.clientY + document.body.scrollTop;
		}
	}

	// create a mouse object, to keep track of location
	var mouse = {
		x: 0,
		y: 0,
		startX: 0,
		startY: 0
	};

	// initially the rectangle element set to null
	var element = null;

	// on mouse movement constantly change the height, width and location of rectangle
	imageView.onmousemove = function(e) {
		setMousePosition(e);

		// if dragging started for rectanle
		if (element !== null) {
			element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
			element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
			element.style.left =
				mouse.x - mouse.startX < 0
					? mouse.x + "px"
					: mouse.startX + "px";
			element.style.top =
				mouse.y - mouse.startY < 0
					? mouse.y + "px"
					: mouse.startY + "px";
		}
	};

	// array to keep track of cordinates
	var cords = [];

	// start or stop dragging on click
	imageView.onclick = function(e) {
		// If dragging active, stop it, and append rectangle to overlay container
		if (element !== null) {
			// take input for the rectangle id
			element.id = prompt("Enter valid attribute for the field").toUpperCase();

			// add the finishing cordinates
			cords.push([mouse.x-offSetX, mouse.y-offSetY]);

			// add the cordinates to attributes array
			attributes[String(element.id)] = cords;

			// set innerHTML of tags
			tag.innerHTML = element.id;

			// add tags to imageContainer
			imageView.appendChild(tag);

			// reset the mouse cursor to default
			imageView.style.cursor = "default";

			// set the rectangle to null, as dragging over
			element = null;

			// reset the cords
			cords = [];
			console.log("finsihed.", mouse.x+offSetX, mouse.y+offSetY);
		} else {
			// dragging started
			console.log("begun.", mouse.x+offSetX, mouse.y+offSetY);

			// push cords to array
			cords.push([mouse.x-offSetX, mouse.y-offSetY]);

			// set start position of mouse
			mouse.startX = mouse.x;
			mouse.startY = mouse.y;

			// Creating reactangle to mark fields
			element = document.createElement("div");
			element.className = "rectangle";
			element.style.left = mouse.x + "px";
			element.style.top = mouse.y + "px";
			element.start = mouse.x + " " + mouse.y;

			// Creating tag div
			tag = document.createElement("div");
			tag.style.position = "absolute";
			tag.className = "tag";
			tag.style.left = mouse.x + "px";
			tag.style.top = "calc( " + (mouse.y - 5) + "px - 1em)";

			imageView.appendChild(element);

			imageView.style.cursor = "crosshair";
		}
	};
}

// call the drag rectangle function
initDraw(document.getElementById("imageView"));

// Write text on image
function draw(content) {
	var canvas = document.getElementById("imageCanvas");
	var context = canvas.getContext("2d");

	// set canvas width and height as per base image
	canvas.height = document.getElementById("baseImage").height;
	canvas.width = document.getElementById("baseImage").width;

	context.font = "20px Calibri";
	context.fillStyle = "red";

	// check if headers for csv match the marked ones
	// content[0].split(",").forEach(e => {
	//     if (!(e.trim() in attributes)) {
	//         throw Error;
	//     }
	// });

	// Extract headings from csv, and alter csv
	var headings = content.splice(0, 1)[0].toUpperCase().split(",");

	// loop though each csv entry
	content.forEach(e => {
		// create new image (certificate)
		var img = new Image();

		// set the src for the certificate to the baseimage source
		img.src = document.getElementById("baseImage").src;

		// draw the image on canvas, takes time
		context.drawImage(img, 0, 0);

		// split row elements, by ","
		var inside = e.split(",");

		// for each element in row
		inside.forEach((text, index) => {
			// add text from csv, get cordinates of attribute from global attributes object
			context.fillText(
				text,
				Number(attributes[headings[index].trim()][0][0]),
				Number(attributes[headings[index].trim()][0][1])
			);
		});

		// get src of canvas as an image
		var dataURL = canvas.toDataURL();

		// create new Image object with the above url
		var img = new Image();
		img.src = dataURL;
		img.classList.add("image-view");
		// img.onload = function() {
		// 	// set imageView (image container) width and height, same as image
		// 	img.width = canvas.width;
		// 	img.height = canvas.height;

		// };

		// append the image to body
		document.getElementById("second").appendChild(img);
	});
	var center = document.createElement("center");
	center.innerHTML = '<button class="submit">publish certificate</button>'
	// var publish = document.createElement("button");
	// publish.classList.add("submit");
	// publish.innerHTML = "Publish certificate";
	// document.getElementById("second").appendChild(publish);
	document.getElementById("second").appendChild(center);
}

function dragOver(event){
	event.preventDefault();
	var uploadBox = event.target;
	// uploadBox.classList.remove("box");
	uploadBox.classList.add("drag-over");
}

function dragEnd(event){
	event.preventDefault();
	var uploadBox = event.target;
	uploadBox.classList.remove("drag-over");
	// uploadBox.classList.add("box");
}