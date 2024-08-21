// ==UserScript==
// @name         Restore Dates on SongMeanings
// @namespace    https://gist.github.com/2272f960eab61481e5133d8709a37197
// @version      2024.04
// @description  Gotta know when users are mad on Christmas Eve!
// @author       Tondog
// @match        https://songmeanings.com/songs/view/*
// @match        https://songmeanings.com/threads/c/*
// @updateUrl    https://gist.github.com/tondog/2272f960eab61481e5133d8709a37197/raw/SongMeanings.user.js
// @downloadUrl  https://gist.github.com/tondog/2272f960eab61481e5133d8709a37197/raw/SongMeanings.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=songmeanings.com
// ==/UserScript==

(function () {
	"use strict";

	const isSongPage = window.url.includes("/songs/view/");

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
				console.log("Mutation observed:", mutation);
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
})();
