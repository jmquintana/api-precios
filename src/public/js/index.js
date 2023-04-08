console.log("index.js");

fetch("/res")
	.then((data) => data.json())
	.then((post) => console.log(post.response));
