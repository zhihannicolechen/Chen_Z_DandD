(() => {
	// collect the buttons at the bottom of the page
	let theThumbnails = document.querySelectorAll("#buttonHolder img"),
			gameBoard = document.querySelector(".puzzle-board"),
			puzzlePieces =document.querySelectorAll(".puzzle-pieces *"),
			dropZones = document.querySelectorAll(".drop-zone");

	//const is a variable whose value can't change - it's immutable. Use this to assign bits of data that will be constant (const) for the entire lifecycle of your app
	//
	// puzzlePaths refer to half the image src that we need to build -> need to append an index to them
	const puzzlePaths = ["topLeft", "topRight","bottomLeft","bottomRight"];

	// change the blur bg to the right image
	function changeImgSet(){
		// the 'this' keyword refers to the element that triggers this function the nav button we click with the custom data attribute of bgref)
		//debugger;
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

		// loop through all o the small draggable images and change their src attribute
		puzzlePaths.forEach((img, index) => {
			puzzlePieces[index].src = `images/${img + this.dataset.bgref}.jpg`;
		});
		//update each images's src one at a time)
	}


	// add grab interaction
	function dragStarted(event){
		console.log('started draggin a piece');
		// use the setData method of the drag event to store a reference to the current element
		event.dataTransfer.setData('currentItem', event.target.id);
	}

	function allowDragOver(event) {
		//turn off the default browser behaviour -> we want to allow a dragover
		event.preventDefault();
		console.log('dragged over me');
	}

	function allowDrop(event) {
		// turn off the default browser behaviour -> follow our instructions instead of what the browser would normally do on drop
		event.preventDefault();
		console.log('dropped on me');

		//retrieve the dragged element using the dataTranfer object
		//this was set in the drag event using the setData method
		let droppedEl = event.dataTransfer.getData('currentItem');
		console.log(droppedEl);

		// move the dragged element into the current drop zone
		// appendChild is a bulit-in JS function that adds an element to another as a child
		this.appendChild(document.querySelector(`#${droppedEl}`));

	}

	function turnAnchorOff(e){
		e.preventDefault();
	}

	// add event handling here
	theThumbnails.forEach(item => item.addEventListener("click", changeImgSet));

	//listen for the dragstarted event on the puzzle puzzlePieces
	puzzlePieces.forEach(piece => piece.addEventListener("dragstart", dragStarted));

	// add event handing for the drop zones (dragover and drop)
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});

})();
