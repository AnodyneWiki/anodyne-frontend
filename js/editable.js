document.addEventListener('DOMContentLoaded', () => {
	const list = document.getElementById('usercontactlist');

	list.addEventListener('keydown', (e) => {
	  const li = e.target.closest('li');
	  if (!li) return;

	  // ENTER → new item
	  if (e.key === 'Enter') {
		e.preventDefault();

		const newLi = document.createElement('li');
		newLi.contentEditable = "true";
		newLi.innerHTML = "<br>";

		li.after(newLi);
		placeCursor(newLi);
	  }

	  // BACKSPACE on empty → remove item
	  if (e.key === 'Backspace' && li.textContent.trim() === '') {
		e.preventDefault();

		const prev = li.previousElementSibling;
		li.remove();

		if (prev) placeCursor(prev);
	  }
	});
});

function placeCursor(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
