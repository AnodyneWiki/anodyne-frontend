document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('click', function (e) {
		const cell = e.target.closest('.copyable');
		if (!cell) return;

		const marker = cell.querySelector('.copied-marker');
		const text = (marker ? cell.textContent.replace(marker.textContent, '') : cell.textContent).trim();

		navigator.clipboard.writeText(text).then(() => {
			if (cell.querySelector('.copied-marker')) return;

			const tag = document.createElement('span');
			tag.className = 'copied-marker';
			tag.textContent = ' [copied]';
			tag.style.color = '#999';
			cell.appendChild(tag);

			setTimeout(() => tag.remove(), 2000);
		}).catch(err => {
			console.error('Copy failed:', err);
		});
	});
});
