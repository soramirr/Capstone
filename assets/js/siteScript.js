var target = document.getElementById("bPages");
//Array holding all of the beastiary info
var bArray = [];

//page#[0] = "Title"
//page#[1] = "assets/img/level-#/enemyName.png"
//page#[2] = "assets/img/level-#/enemyName.png"
//page#[3] = "assets/img/level-#/enemyName.png"
//page#[4] = "assets/img/level-#/enemyName.png"
//page#[5] = "Description"
//bArray[#-1] = page#

var page1 = [];
page1[0] = "Smokey";
page1[1] = "assets/img/level-1/glide.png";
page1[2] = "assets/img/level-1/glide.png";
page1[3] = "assets/img/level-1/glide.png";
page1[4] = "assets/img/level-1/glide.png";
page1[5] = "This is a short description of the enemy and its real life stuff. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae. Duis interdum tellus vitae dictum viverra. Donec a ultricies nulla, quis ultrices ex. Sed vitae odio luctus, tristique nibh sed, feugiat ante. Curabitur et lectus vehicula, dapibus ipsum at, vehicula odio. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae.";
bArray[0] = page1;

var page2 = [];
page2[0] = "Birdle";
page2[1] = "assets/img/level-1/shoot.png";
page2[2] = "assets/img/level-1/shoot.png";
page2[3] = "assets/img/level-1/shoot.png";
page2[4] = "assets/img/level-1/shoot.png";
page2[5] = "This is a short description of the enemy and its real life stuff. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae. Duis interdum tellus vitae dictum viverra. Donec a ultricies nulla, quis ultrices ex. Sed vitae odio luctus, tristique nibh sed, feugiat ante. Curabitur et lectus vehicula, dapibus ipsum at, vehicula odio. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae.";
bArray[1] = page2;

var page3 = [];
page3[0] = "Tin Can Pete";
page3[1] = "assets/img/level-1/glide.png";
page3[2] = "assets/img/level-1/glide.png";
page3[3] = "assets/img/level-1/glide.png";
page3[4] = "assets/img/level-1/glide.png";
page3[5] = "This is a short description of the enemy and its real life stuff. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae. Duis interdum tellus vitae dictum viverra. Donec a ultricies nulla, quis ultrices ex. Sed vitae odio luctus, tristique nibh sed, feugiat ante. Curabitur et lectus vehicula, dapibus ipsum at, vehicula odio. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae.";
bArray[2] = page3;

var page4 = [];
page4[0] = "Sloog";
page4[1] = "assets/img/level-2/glide.png";
page4[2] = "assets/img/level-2/glide.png";
page4[3] = "assets/img/level-2/glide.png";
page4[4] = "assets/img/level-2/glide.png";
page4[5] = "This is a short description of the enemy and its real life stuff. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae. Duis interdum tellus vitae dictum viverra. Donec a ultricies nulla, quis ultrices ex. Sed vitae odio luctus, tristique nibh sed, feugiat ante. Curabitur et lectus vehicula, dapibus ipsum at, vehicula odio. Pellentesque interdum justo nisi, sit amet iaculis sem elementum eu. Nam nec diam hendrerit, efficitur metus sit amet, pulvinar lectus. Morbi egestas justo sapien, non pharetra nisl fermentum ac. Nunc vitae suscipit tortor, eget malesuada magna. Aliquam lacinia ornare neque, quis consectetur ipsum ornare vitae.";
bArray[3] = page4;
//Populate beastiary pages
var length = bArray.length - 1;
for(i = 0; i <= length; i++) {
	var pageArray = bArray[i];
	var newPage = "<li class='page'> <h3 class='page-title'>" + pageArray[0] + "</h3>";
	if(i == 0) {} else {
		newPage += '<button id="arrowL1" class="page-button-arrow-left" onclick="currentPage = 0; slideLeft();"></button><label for="arrowL1"><img class="page-arrow-left" src="assets/img/borrowed/arrow.png"> </label>';
	}
	newPage += "<div class='page-desc'>" + pageArray[5] + "</div> <img class='page-main-img' src='" + pageArray[1] + "'><div class='page-sub-img-wrap'><img class='page-sub-img' src='" + pageArray[2] + "'><img class='page-sub-img' src='" + pageArray[3] + "'><img class='page-sub-img' src='" + pageArray[4] + "'></div>";
	if(i == length) {} else {
		newPage += '<button id="arrowR1" class="page-button-arrow-right" onclick="currentPage = 1; slideRight();"></button><label for="arrowR1"><img class="page-arrow-right" src="assets/img/borrowed/arrow.png">';
	}
	target.innerHTML += newPage;
}

//Slide on the beastiary pages
var currentPage;
var currentRight = 0;
var bWidthInc = target.offsetWidth;
bWidthInc /= bArray.length;

var slideRight = function() {
	var right = currentRight + bWidthInc;
	var newStyle = right + "px";
	beastiary.style.right = newStyle;
	currentRight = parseInt(beastiary.style.right);
}

var slideLeft = function() {
	var right = currentRight - bWidthInc;
	var newStyle = right + "px";
	beastiary.style.right = newStyle;
	currentRight = parseInt(beastiary.style.right);
}



//Place the footer at the bottom of the page
var backgroundHeight = document.getElementById("background-img").offsetHeight;
var footerPosition = backgroundHeight - 25 + "px";
document.getElementById("footer").style.top = footerPosition;
$(window).resize(function() {
	backgroundHeight = document.getElementById("background-img").offsetHeight;
	footerPosition = backgroundHeight - 25 + "px";
	document.getElementById("footer").style.top = footerPosition;
});