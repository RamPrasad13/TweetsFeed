import people from "./people";
import './twitter.scss';

export function init() {
  const root = document.createElement("div");
  let index1 = 0;
  let index2 = 2;
  var startPolling = setInterval(function(){
  	index1 += 2;
  	index2 += 2;
  	let newPeople = people.slice(index1,index2);
  	if (newPeople.length > 0) {
  		let newTweets = loopThroughTweets(newPeople);
  		document.getElementById('tweetSection').insertAdjacentHTML('afterbegin',newTweets);
  		lazyLoadImg();
  	} else {
  		clearInterval(startPolling);
  	}
  }, 8000);

  root.innerHTML = displayTweetSection();
  document.body.appendChild(root);
  lazyLoadImg();
}

function lazyLoadImg() {
	[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
	  	img.setAttribute('src', img.getAttribute('data-src'));
	  	img.onload = function() {
	    	img.removeAttribute('data-src');
	  	};
	  });
}

function displayHeader() {
	return `
		<header>
			<div class="flex-grow">
				<i class="fa fa-twitter fa-logo fa-twitter-logo" aria-hidden="true"></i>
				<i class="fa fa-bell fa-logo" aria-hidden="true"></i>
				<i class="fa fa-envelope-o fa-logo" aria-hidden="true" float-left></i>
				<i class="fa fa-hashtag fa-logo" aria-hidden="true"></i>
			</div>
			<div class="flex-grow">
				<i class="fa fa-twitter fa-logo fa-twitter-main" aria-hidden="true"></i>
			</div>
			<div class="flex-grow">
				<img data-src="https://i.l.inmobicdn.net/website/website/6.0.1/img/testimonialp1.jpg" class="profile-img" alt="profile">
			</div>
		</header>
	`;
}

function displayNavBar() {
	return `
		<div class="tweets">
			<div class="col-4 col-selected">TWEETS</div>
			<div class="col-4">PHOTOS/VIDEOS</div>
			<div class="col-4">FOLLOWING</div>
			<div class="col-4">FOLLOWERS</div>
		</div>
	`;
}

function displayTweetSection() {
	var newArr = displayHeader() + displayNavBar();
	newArr += '<div class="tweets" id="tweetSection">';
	let people1 = people.slice(0,2);
	newArr += loopThroughTweets(people1);
	newArr += '</div>';
	return newArr;
}

function loopThroughTweets(tweetsData) {
	let newArr = '';
	tweetsData.forEach(function(elem) {
	    newArr += `
	    	<div class="tweetContent">
	    		<img class="img-tweet" data-src=${elem.img} alt=${elem.name} />
	    		<div class="table-cell">
			    	<div>
			    		<span>${elem.name}, ${elem.twitterId}</span>
			    		<span class="tweetTime">${elem.time}</spam>
			    	</div>
			    	<p>${elem.contentDesc}</p>
			    	${addVideoContent(elem.contentVideo)}
			    	${retweetSection(elem.retweets)}
		    	</div>
			</div>
	    `;
	});
	return newArr;
}

function retweetSection(retweetCount) {
	return `
		<div class="retweet-content">
			<i class="fa fa-share retweet-sec" aria-hidden="true"></i>
			<i class="fa fa-star retweet-sec" aria-hidden="true"></i>
			<i class="fa fa-refresh retweet-sec" aria-hidden="true">&nbsp;${retweetCount}</i>
			<i class="fa fa-ellipsis-h retweet-sec" aria-hidden="true"></i>
		</div>
	`;
}

function addVideoContent(videoLink) {
	let videoHtml = '';
	if (videoLink) {
		videoHtml += `
			<video height=250 controls>
			  <source src="${videoLink}" type="video/mp4">
			</video>
		`;
	}
	return videoHtml;
}