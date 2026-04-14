<form id="userpageForm">
<h1 id="userpageFormTitle" contenteditable="plaintext-only">Name</h1>
<input type="hidden" name="message" id="hiddenInput">
<span id="userpageFormAbout" contenteditable="plaintext-only">Name</span>
<button type="submit">Done</button>
</form>

<script>
const title = document.getElementById('userpageFormTitle');
const about = document.getElementById('userpageFormAbout');
const hidden = document.getElementById('hiddenInput');
document.getElementById('userpageForm').addEventListener('submit', () => {
    hidden.value = editable.innerHTML;
});
</script>
