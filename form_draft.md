{{range list "util.html" "userutil.html"}}{{import .}}{{end}}

{{$v := index .Args 0}}

<form method=POST id=UserForm enctype="multipart/form-data" action=/api/userpage>
<div id=Infobox class=Infobox>
<table>
<tr>
<th data-dummy-id=FormTitle class=FormFieldDup colspan=2>{{with $v.Title}}{{.}}{{end}}</th>
</tr>
<tr>
<th class=InfoboxLabel>Picture</th><td id=FormPicture class=InfoboxData><label id=FormPictureLabel style="color: var(--color-visited);" for=FormPictureInput data-bsrc="Upload" data-resrc="Change"><input id=FormPictureInput type="file" value="/user/0xea/pfp.jpg"  hidden accept="image/jpg" /></label></td></tr>
<tr>
<td class=InfoboxImage id=FormPictureImgCell colspan="2"><img id=FormPictureImg {{with $v.Title}}src="/user/{{.}}/pfp.jpg"{{end}}></td>
</tr></table><table>
<tr>
<th class="InfoboxLabel InfoboxTitle" colspan="2">Demographic<div style='float:right'>{{template "exnd" $v.Collapse}}</div></div></th>
</tr><tr>
<th class="InfoboxLabel">Age (birth)</th><td id=FormAge class="FormField InfoboxData" contenteditable=true data-placeholder="{{with $v.Age}}{{.}}{{else}}2000-01{{end}}"></td>
</tr><tr>
<th class="InfoboxLabel">Location</th><td id=FormLocation class="InfoboxData FormField" contenteditable=true data-placeholder="{{with $v.Location}}{{template "user" .}}{{else}}Earth{{end}}"></td>
</tr>
</table></div> {{/* infobox */}}

<h1 id=TitleMain>{{ternary "Editing" "Creating" $v.Exists}} {{template "input" (dict "f" "Title" "d" "User" "v" $v.Title)}} ({{template "input" (dict "f" "Name" "d" "Name1,Name2" "v" ($v.Name | join ", "))}}){{if $v.Exists}}<span style="padding-top: 18px; float: right; font-size: 12px;">[<a href="/user/{{$v.Title}}">current</a>]</span>{{end}}</h1>

<div class="FormField UserAbout" id=FormAbout contenteditable=true data-placeholder="{{with $v.About}}{{template "user" .}}{{else}}Hi!, I like drugs.{{end}}">{{with $v.About}}{{template "user" .}}{{end}}
</div>

<div class="collapser FormContactList"><h2>Contact</h2>
<div class=collapserContent>
<ul contenteditable=false id=FormContactList class=FormList>
{{range $v.Links}}<li class=FormListE data-name="{{.Name}}" data-address="{{.Url}}"><strong><span contenteditable=true class='cName FormField' data-placeholder="{{.Name}}">{{.Name}}</span></strong>: <span class="cUrl FormField"  contenteditable=true data-placeholder="{{.Url}}">{{.Url}}</span></li>{{end}}
<li class="FormListE FormContactListE" data-name="" data-address=""><span class="FormField cName" contenteditable=true data-placeholder="Name"></span>: <span class="FormField cUrl" data-placeholder="Address" contenteditable=true></span></li>
</ul>
</div>
</div>

<div id=SubmitPanel>
<input type=button id="FormSubmit" value="Commit" />
</div>

<div id=Debug></div>

<script>
const formInputs = [
  {id: "Title",      type: "text",   placeholder: "User", value: ""},
  {id: "About",      type: "text",   placeholder: "Hi!, I like drugs", value: ""},
  {id: "Names",      type: "text",   placeholder: "Nick1,Nick2", value: ""},
  {id: "AgeBirth",   type: "text",   placeholder: "2000-01", value: ""},
  {id: "Location",   type: "input-text",   placeholder: "Earth, Western-hemosphere", value: ""},
  {id: "Debug",      type: "stream", placeholder: "", value: ""},
  {id: "Picture",    type: "input-file-image",  placeholder: "", value: "#", label: "PictureLabel" },
  {id: "Submit",     type: "input-button", placeholder: "", value: "Publish changes" },
];

let Picture;

function PictureChange (e) {
  const file = e.input.files[0];

  const reader = new FileReader();
  reader.onload = () => {
      let Picture = reader.result;
  };
  reader.readAsDataURL(file);
  PictureImg.img.src = Picture;
  PictureImg.style.display = "block";
}

function submitPage() {
  const titleStr = titleInput.innerText.trim();
  const data = {
    Title: titleInput.innerText,
    Name: (namesInput.innerText.split(",").map(n => n.trim()).filter(Boolean)),
    About: (aboutInput.innerText.trim() || ""),
    Age: (ageInput.innerText.trim() || ""),
    Location: (locationInput.innerText.trim() || ""),
    Picture: Picture
  };

  const jsonString = JSON.stringify(data);
  debugOutput.textContent = titleInput.innerText + ": " + jsonString;

  console.log("Sending JSON:", jsonString);

  fetch("/api/userpage/" + titleInput.innerText, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonString
  }).then(r => {
    if (!r.ok) throw new Error("Upload failed");
  }).catch(err => alert(err));
  return;
}

function liKeydown(e) {
  const fi = e.target.closest("span");
  const li = fi.closest("li");
  const ul = li.closest("ul");

  console.log("key: " + e.key);

  if (!li || !fi) return;

  if (e.ctrlKey && e.key === "Backspace") {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const textNode = range.startContainer;
    if (textNode.nodeType === Node.TEXT_NODE) {
        const beforeCaret = textNode.textContent.slice(0, range.startOffset);
        const afterCaret = textNode.textContent.slice(range.startOffset);

        const newBefore = beforeCaret.replace(/\S+\s*$/, '');
        textNode.textContent = newBefore + afterCaret;

        const newOffset = newBefore.length;
        range.setStart(textNode, newOffset);
        range.setEnd(textNode, newOffset);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    console.log("List Break!");
    
    const currentSpan = document.activeElement;
    if (!currentSpan || !(currentSpan.contenteditable)) return;
    
    const nli = document.createElement('li');
    nli.classList.add(li.classList);
    nli.contentEditable = "false";
    nli.setAttribute("data-name", "");
    nli.setAttribute("data-address", "");

    const cname = newLi.createElement('span');
    newLi.appendChild(cName);
    cname.contentEditable = "true";
    cname.classList.add("FormField");
    cname.classList.add("cName");
    newLi.innerText += ": "

    cname.addEventListener('keydown', liKeydown(event));

    const curl = newLi.createElement('span');
    curl.contentEditable = "true";
    curl.classList.add("FormField");
    curl.classList.add("cUrl");
    curl.addEventListener('keydown', listKeydown(event));

    //curl.focus();

    ul.appendChild(nli);
    cname.focus();
  }
}

function setupHandlers(event) {
  console.log("setting up event handlers!");
  document.querySelectorAll('ul[class=FormList]').forEach(ul => {
    ul.querySelectorAll('li[class=FormListE]').forEach((li, lindex) => {;
      li.querySelectorAll('span[class=FormField]').forEach((fi, findex) => {
        console.log(li.findex, fi.textContent);
        fi.addEventListener('keydown', listKeydown(event));
      });
    });
  });

  //document.querySelectorAll('span[class=FormField][contenteditable=true]')
  //  .forEach(el => {
  //    el.addEventListener('keydown', (e) => {
  //      if (e.key === 'Enter') {
  //        e.preventDefault();

  //        console.log('Enter pressed');

  //        e.textContent.replace('\n',"");
  //        e.textContent.replace("<br>","");

  //        return;
  //      } 
  //    console.log('New content:', e.key);
  //    });
  //});

  PictureInput.addEventListener("change", (e) => {
    const file = PictureInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.warn("Not an image");
      return;
    }

    const url = URL.createObjectURL(file);
    PictureImg.src = url;

    PictureImg.onload = () => URL.revokeObjectURL(url);
  });
  //PictureLabel.addEventListener('click', () => {
  //  this.click();
  //});
  
  
  //document.querySelectorAll('span[class=FormField][contenteditable="true"]').forEach(e => {
  //  //e.addEventListener("input", inputUpdate);
  //});
  
  const field = document.querySelectorAll('span[class=FormFieldDup][data-dummy-id]').forEach((fi, findex) => {
    document.querySelectorAll('span[id=' + fi.getAttribute('data-dummy-id') + ']').forEach((ofi, ofindex) => {
      fi.textContent = ofi.textContent;
    });
  });
  submitButton.addEventListener("click", submitPage(event));
}

function onload(e) {
  setupHandlers(event);
}
document.addEventListener("DOMContentLoaded", onload(event));
</script>
<style>
  td[id=FormPictureImgCell] {
    display: table-cell;
  }
  img[id=FormPictureImg] {
    width: 100%;
    max-height: 200px;
  }
  input[id=FormPictureInput]:has(not[src]|:has[src=""]) {
    /*opacity: 0;
    display: none;
    visibility: hidden;*/
    appearance: none;
    pointer-events: none;
  }
  input[id=FormPictureInput]:has([src]& :not[src=""]) {
    pointer-events: bounding-box;
    opacity: 1;
    display: block;
    appearance: none;
    visibility: visible;
  }
  label[id=FormPictureLabel] {
    color: var(--color-visited);
    position: relative; top: 0; right: 0;
  }
  .FormList > .FormListE {
    word-break: keep-all;
    line-break: strict;
    br {
      display: none;
    }
    li span {
      word-break: keep-all;
      line-break: strict;
    }
    .cName {
      content: attr(data-name);
    }
    .cUrl {
      content: attr(data-address);
    }
  }
  .cName:not:empty {
    font-weight: bold;
    min-width: 100%;
  }
  #Debug {
    overflow: scroll;
    word-break: break-all;
  }
.hint {
  display: block;
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.25rem;
}
</style>
