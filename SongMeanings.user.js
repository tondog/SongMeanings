// ==UserScript==
// @name         Restore Dates on SongMeanings
// @namespace    https://github.com/tondog/SongMeanings/
// @version      2024.04
// @description  Gotta know when users are mad on Christmas Eve!
// @author       Tondog
// @match        https://songmeanings.com/songs/view/*
// @match        https://songmeanings.com/threads/c/*
// @updateURL    https://github.com/tondog/SongMeanings/raw/main/SongMeanings.user.js
// @downloadURL  https://github.com/tondog/SongMeanings/raw/main/SongMeanings.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=songmeanings.com
// ==/UserScript==

const isSongPage = document.URL.includes("/songs/view/");

const restoreTimes = () => {
	const times = document.querySelectorAll("time.timeago.timeago_short");

	times.forEach((time) => {
		time.innerHTML = time.getAttribute("datetime");
	});
};

if (isSongPage)
{
	const targetNode = document.querySelector("#explorebar ~ .wrapper > .col-flex");

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.addedNodes.length > 0)
			{
				restoreTimes();
			}
		});
	});

	const config = {
		childList: true
	};

	observer.observe(targetNode, config);
}

restoreTimes();
