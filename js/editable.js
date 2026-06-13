document.addEventListener('DOMContentLoaded', () => {
	const submit = document.getElementById('editsubmit');
	//const summary = document.getElementById('editsummary');

	//if (submit && summary) {
	if (submit) {
		submit.addEventListener('click', () => {
			//if (summary.value.trim() === '') return;

			const clean = (s) => s?.replace(/[\n\t]+/g, ' ').replace(/\s+/g, ' ').trim();
			const ulList = (el, sel) => Array.from(el.querySelectorAll(`${sel} > li`))
				.map(li => clean(li.textContent)).filter(Boolean);
			// Drop fields that are null/undefined, '' or [] so unfilled placeholders
			// don't get written to the entry.
			const omitEmpty = (obj) => Object.fromEntries(
				Object.entries(obj).filter(([, v]) =>
					v != null && v !== '' && !(Array.isArray(v) && v.length === 0)));

			const data = {
				Title: clean(document.getElementById('TitleMain')?.textContent),
				Name: clean(document.getElementById('username')?.textContent)
					?.split(',').map(s => s.trim()),
				About: clean(document.getElementById('userabout')?.textContent),
				Birth: clean(document.getElementById('userage')?.textContent),
				Location: clean(document.getElementById('userlocation')?.textContent),
				Links: Array.from(document.querySelectorAll('#usercontactlist li')).map(li => ({
					Name: clean(li.querySelector('.linkname')?.textContent),
					Url: clean(li.querySelector('.linkurl')?.textContent)
				})),
				TriedSubstances: Array.from(document.querySelectorAll('table.trd')).map(t => omitEmpty({
					Name: clean(t.querySelector('.trdname')?.textContent),
					Salts: ulList(t, '.trdsalts'),
					Source: ulList(t, '.trdsource'),
					Effects: ulList(t, '.trdeffects'),
					Notes: ulList(t, '.trdnotes')
				})),
				Psyche: {
					Interests: ulList(document, '#userinterests'),
					Attributes: ulList(document, '#userattributes')
				}
			};
			const out = document.getElementById('jsonoutput');
			if (out) {
				const pre = document.createElement('pre');
				pre.style.margin = '0';
				pre.textContent = JSON.stringify(data, null, 2);
				out.replaceChildren(pre);
			}
		});
	}

	const list = document.getElementById('usercontactlist');

	list.addEventListener('keydown', (e) => {
	  const li = e.target.closest('li');
	  if (!li) return;

	  // ENTER → new item
	  if (e.key === 'Enter') {
		e.preventDefault();

		const newLi = document.createElement('li');
		newLi.contentEditable = "true";
		newLi.innerHTML = '<span class="linkname">name</span>: <span class="linkurl">link</span>';

		li.after(newLi);
		placeCursor(newLi.querySelector('.linkname'));
	  }

	  // BACKSPACE on empty → remove item
	  if (e.key === 'Backspace' && li.textContent.trim() === '') {
		e.preventDefault();

		const prev = li.previousElementSibling;
		li.remove();

		if (prev) placeCursor(prev);
	  }
	});

	// ENTER → new item / BACKSPACE on empty → remove, for the editable trd lists
	const TRD_LISTS = '.trdroutes, .trdsalts, .trdsource, .trdeffects, .trdodor, .trdnotes';
	document.addEventListener('keydown', (e) => {
		const li = e.target.closest('li');
		if (!li || !li.parentElement?.matches(TRD_LISTS)) return;
		const ul = li.parentElement;

		if (e.key === 'Enter') {
			e.preventDefault();
			const newLi = document.createElement('li');
			newLi.contentEditable = 'true';
			li.after(newLi);
			placeCursor(newLi);
		}

		if (e.key === 'Backspace' && li.textContent.trim() === '' && ul.querySelectorAll('li').length > 1) {
			e.preventDefault();
			const prev = li.previousElementSibling || li.nextElementSibling;
			li.remove();
			if (prev) placeCursor(prev);
		}
	});

	document.addEventListener('input', (e) => {
		const name = e.target.closest('.trdname');
		if (!name) return;

		const trd = name.closest('.trd');
		const slug = name.textContent.trim().toLowerCase().replace(/\s+/g, '_');
		const src = `/structure/${slug}.svg`;

		const img = trd?.querySelector('.trdimg');
		if (img) img.src = src;

		const trds = Array.from(document.querySelectorAll('.trd'));
		const i = trds.indexOf(trd);
		const matimg = document.querySelectorAll('.anodyneUserMatrixStruct .trdmatimg')[i];
		if (matimg) matimg.src = src;
	});

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Enter') return;

		const name = e.target.closest('.trdname');
		if (!name) return;

		e.preventDefault();

		const trd = name.closest('.trd');

		const cell = trd?.querySelector('.trdimg')?.closest('.svg');
		if (cell && getComputedStyle(cell).display === 'none') cell.style.display = '';

		const trds = Array.from(document.querySelectorAll('.trd'));
		const matimg = document.querySelectorAll('.anodyneUserMatrixStruct .trdmatimg')[trds.indexOf(trd)];
		if (matimg) {
			matimg.style.display = '';
			if (matimg.parentElement) matimg.parentElement.style.display = '';
		}
	});

	const titleMain = document.getElementById('TitleMain');
	if (titleMain) {
		const syncTitle = () => {
			const title = titleMain.textContent.trim();
			document.querySelectorAll('.TitleMain').forEach(el => { el.textContent = title; });
		};
		titleMain.addEventListener('input', syncTitle);
		titleMain.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') e.preventDefault();
		});
	}

	const ranklist = document.querySelector('.ranklist');
	if (ranklist) {
		const addBtn = document.createElement('button');
		addBtn.id = 'addtrd';
		addBtn.type = 'button';
		addBtn.textContent = '+ Add substance';
		ranklist.after(addBtn);

		// --- Drag-to-reorder ---------------------------------------------------
		// Each .trd is wrapped in a direct-child .collapser of .ranklist. Pair every
		// collapser with its matrix .trdmatimg wrapper via a shared data-pair key so
		// the matrix can be kept in the same order after a reorder (the index-based
		// image handlers above rely on that ordering staying in sync).
		const collapsers = () => Array.from(ranklist.querySelectorAll(':scope > .collapser'));
		const matrix = () => document.querySelector('.anodyneUserMatrixStruct');

		collapsers().forEach((c, i) => { c.dataset.pair = String(i); addDragHandle(c); });
		Array.from(matrix()?.children || []).forEach((w, i) => { w.dataset.pair = String(i); });
		let pairSeq = collapsers().length;

		ranklist.addEventListener('mousedown', (e) => {
			const handle = e.target.closest('.trddrag');
			if (handle) handle.closest('.collapser').draggable = true;
		});
		document.addEventListener('mouseup', () => {
			collapsers().forEach(c => { c.draggable = false; });
		});
		ranklist.addEventListener('dragstart', (e) => {
			const c = e.target.closest('.collapser');
			if (!c) return;
			c.classList.add('dragging');
			c.style.opacity = '0.5';
			e.dataTransfer.effectAllowed = 'move';
		});
		ranklist.addEventListener('dragover', (e) => {
			const dragging = ranklist.querySelector('.collapser.dragging');
			if (!dragging) return;
			e.preventDefault();
			const after = getDragAfterElement(ranklist, e.clientY);
			if (after == null) ranklist.appendChild(dragging);
			else ranklist.insertBefore(dragging, after);
		});
		ranklist.addEventListener('dragend', (e) => {
			const c = e.target.closest('.collapser');
			if (!c) return;
			c.classList.remove('dragging');
			c.style.opacity = '';
			c.draggable = false;
			syncMatrix();
		});

		addBtn.addEventListener('click', () => {
			// New blank .trd at the bottom of the list — clone an existing one
			// so the exact DOM structure is reproduced, then blank it out.
			const proto = ranklist.querySelector('.collapser');
			let trd;
			if (proto) {
				trd = proto.cloneNode(true);
				const name = trd.querySelector('.trdname');
				if (name) { name.textContent = ''; name.setAttribute('href', '/substance/'); }
				const img = trd.querySelector('.trdimg');
				if (img) { img.src = ''; img.closest('.svg')?.style.setProperty('display', 'none'); }
				const content = Array.from(trd.querySelectorAll('td')).find(td => !td.classList.contains('svg'));
				if (content) content.innerHTML =
					'<strong>Routes:</strong><ul class=trdroutes><li contenteditable=true></li></ul>' +
					'<strong>Salts:</strong><ul class=trdsalts><li contenteditable=true></li></ul>' +
					'<strong>Source:</strong><ul class=trdsource><li contenteditable=true></li></ul>' +
					'<strong>Effects:</strong><ul class=trdeffects><li contenteditable=true></li></ul>' +
					'<strong>Odor:</strong><ul class=trdodor><li contenteditable=true></li></ul>' +
					'<strong>Notes:</strong><ul class=trdnotes><li contenteditable=true></li></ul>';
			} else {
				trd = document.createElement('div');
				trd.className = 'collapser';
				trd.innerHTML =
					'<table class=trd><tbody>' +
					'<tr><th colspan=2 class=InfoboxLabel><a contenteditable=true class=trdname href="/substance/"></a></th></tr>' +
					'<tr><td class=svg style="display: none;"><img class=trdimg src=""></td>' +
					'<td style="vertical-align: top">' +
					'<strong>Routes:</strong><ul class=trdroutes><li contenteditable=true></li></ul>' +
					'<strong>Salts:</strong><ul class=trdsalts><li contenteditable=true></li></ul>' +
					'<strong>Source:</strong><ul class=trdsource><li contenteditable=true></li></ul>' +
					'<strong>Effects:</strong><ul class=trdeffects><li contenteditable=true></li></ul>' +
					'<strong>Odor:</strong><ul class=trdodor><li contenteditable=true></li></ul>' +
					'<strong>Notes:</strong><ul class=trdnotes><li contenteditable=true></li></ul></td></tr>' +
					'</tbody></table>';
			}
			const key = String(pairSeq++);
			trd.dataset.pair = key;
			addDragHandle(trd);
			ranklist.appendChild(trd);

			// Corresponding .trdmatimg appended to the matrix (same order = same index)
			const m = matrix();
			if (m) {
				const protoMat = m.querySelector('.trdmatimg');
				let wrap;
				if (protoMat?.parentElement) {
					wrap = protoMat.parentElement.cloneNode(true);
					const mi = wrap.querySelector('.trdmatimg');
					mi.src = '';
					mi.style.display = 'none';
				} else {
					wrap = document.createElement('div');
					wrap.innerHTML = '<img class=trdmatimg style="display: none; width: 60px; height: 60px;" alt="" src="">';
				}
				wrap.dataset.pair = key;
				m.appendChild(wrap);
			}
		});
	}
});

function placeCursor(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function addDragHandle(collapser) {
  if (collapser.querySelector(':scope > .trddrag')) return;
  const handle = document.createElement('span');
  handle.className = 'trddrag';
  handle.textContent = '⠿'; // ⠿
  handle.title = 'Drag to reorder';
  handle.style.cssText = 'cursor: grab; user-select: none; padding: 0 6px; opacity: 0.5;';
  collapser.prepend(handle);
}

function getDragAfterElement(container, y) {
  const els = Array.from(container.querySelectorAll(':scope > .collapser:not(.dragging)'));
  let closest = { offset: Number.NEGATIVE_INFINITY, element: null };
  for (const child of els) {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) closest = { offset, element: child };
  }
  return closest.element;
}

// Re-order the matrix .trdmatimg wrappers to mirror the current .trd order, keyed
// by the shared data-pair attribute, so index-based lookups stay correct.
function syncMatrix() {
  const matrix = document.querySelector('.anodyneUserMatrixStruct');
  const ranklist = document.querySelector('.ranklist');
  if (!matrix || !ranklist) return;
  const wrappers = new Map(Array.from(matrix.children).map(w => [w.dataset.pair, w]));
  ranklist.querySelectorAll(':scope > .collapser').forEach(c => {
    const w = wrappers.get(c.dataset.pair);
    if (w) matrix.appendChild(w);
  });
}
