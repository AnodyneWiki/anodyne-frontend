{{$v := index .Args 0}}
{{$_ := set $v "Prefix" "user"}}
{{range list "util.html" "userutil.html" "matrix.html" "pics.html" "psyche.html"}}{{import .}}{{end}}

<h1 contenteditable=false id=TitleMain>{{if $v.External}}(External) {{end}}{{$v.Title}}{{with $v.Name}} (<span id=username contenteditable={{$v.Editable}}>{{template "rcc" .}}</span>){{end}}{{if $v.Deceased}} <span style="font-size: 18px; color: grey;">[deceased]</span>{{end}}</h1>
<div id=Toolbar><div class="Toolbarleft"><a class=Toolbaritem {{if contains "true" $v.Editable}} href="/user/{{$v.Title}}">Current{{else}} href="#" style="color: var(--color-disabled);">Read{{end}}</a></div><div class=Toolbarright><ul style="display: flex;margin: 0;padding: 0;list-style: none;"><li><a class=Toolbaritem {{if contains "true" $v.Editable}} style="color: var(--color-destructive) !important;" href="/user/{{$v.Title}}">Cancel{{else}} href="/form/{{$v.Title}}">Edit{{end}}</a></li><li style="border-left: 1px var(--color-disabled);"><a class=Toolbaritem href="/api/user/{{$v.Title}}">View API</a></li></ul></div></div>

<div id=Infobox>
<table><tr>
<th contenteditable=false colspan="2">{{$v.Title}}</th>
</tr>
{{if printf "/user/%s/pfp.jpg" $v.Title | fileExists}}
<tr><td class=InfoboxImage colspan=2><img class=InfoboxImage width=220 src="/user/{{$v.Title}}/pfp.jpg"></td></tr>
{{end}}
{{if printf "/user/%s/rpfp.jpg" $v.Title | fileExists}}
<tr><td class=InfoboxImage colspan=2><img class=InfoboxImage width=220 src="/user/{{$v.Title}}/rpfp.jpg"></td></tr>
{{end}}
</table>
<table><tr>
<th contenteditable=false class=InfoboxLabel colspan=2>Demographic</th></tr>
{{- if $v.Birth}}{{$cLen := toDate "2006-01" $v.Birth | ago | splitList "h" | first | add 240}}<tr><th contenteditable=false class="InfoboxLabel">Age</th>{{if $v.Deceased}}{{$dLen := toDate "2006-01" $v.Deceased | ago | splitList "h" | first}}{{$cLen = sub $cLen $dLen}}{{end}}<td id=userage contenteditable={{$v.Editable}} class=InfoboxData>~{{divf (divf (div $cLen 24) 365 | mulf 10 | int) 10}} <em> years</em>{{if $v.Deceased}} (time of death){{end}}{{/* / ~{{div $cLen 24 }} <em>days</em> / ~{{$cLen}} <em>hours</em>*/}}</td></tr>{{end}}
{{- with $v.Location}}<tr><th contenteditable=false class="InfoboxLabel">Location</th><td id=userlocation contenteditable={{$v.Editable}} class=InfoboxData>{{.}}</td></tr>{{end}}
{{- with $v.Nationality}}<tr><th contenteditable=false class="InfoboxLabel">Nationality</th><td id=userlocation contenteditable={{$v.Editable}} class=InfoboxData>{{.}}</td></tr>{{end}}
</table></div>


{{template "UserAbout" $v}}

{{template "UserRefs" $v}}

{{template "UserPsyche" $v}}

{{template "UserMatrix" $v}}

{{template "UserClasses" $v}}

{{template "UserComplications" $v}}

{{template "UserRoa" $v}}

{{if and $v.External (empty $v.ExternalRefs | not) -}}
<h3>References</h3>
<ul>
{{range $v.ExternalRefs -}}
<li>{{template "user" .}}</li>
{{- end}}</ul>{{end -}}

{{if contains $v.Editable "true" -}}
<div id=editpanel>
<input type=text id=editsummary />
<input type=button id=editsubmit value="Publish" /><a style="color: var(--color-destructive) !important; font-weight: bold;" href="/user/{{$v.Title}}">Cancel</a>
</div>
{{end}}
