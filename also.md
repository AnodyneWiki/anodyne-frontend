{{define "also"}}{{$vars := . -}}
{{if any $vars.Classes $vars.ChemicalClasses -}}
<div class=collapser><h2>See also<span class=collapseButtonTight>&nbsp;{{template "exnd" $vars.Collapse}}</span></h2>
<div class=collapserContent>
<ul>
{{- if $vars.Classes}}{{range $class := $vars.Classes}}<li><a href=/class/{{replace "'" "%27" (replace " " "_" (lower $class))}}>{{title $class}}</a></li>
{{end}}{{end -}}
{{if $vars.ChemicalClasses}}{{range $cc := $vars.ChemicalClasses}}<li>{{template "sl" (lower $cc)}}</li>
{{- end}}{{end}}
</ul></div></div>
{{- end}}
{{- end}}

{{define "refs"}}
    {{- $vars := .}}
    {{- if $vars.Refs}}<div class=collapser><h2 style="word-break: keep-all; display: block;">External links<span class=collapseButtonTight>&nbsp;{{template "exnd" .Collapse}}</span></h2>
<div class=collapserContent>{{if $vars.References}}
<ul>{{end}}{{range $ref := $vars.References}}{{if $ref.Urls}}{{range $i, $url := $ref.Urls}}{{if $url.Sub}} / {{else}}<li>{{end}}<a {{if eq $i (sub (len $ref.Urls) 1)}}class=logo{{end}} href='{{replace "'" "%27" (replace " " "_" ($url.Link))}}'>{{$url.Name}}{{if not (eq $i (sub (len $ref.Urls) 1))}}</a>{{end}}{{end}} ({{$ref.Name}})</a></li>
{{else}}{{if $ref.url}}<li><a class="logo" href='{{replace "'" "%27" (replace " " "_" ($ref.url))}}'>{{$vars.Title}} ({{$ref.name}})</a></li>
{{end}}{{end}}{{end}}{{if $vars.References}}</ul>{{end}}</div></div>{{end}}{{if $vars.Refs}}
<div class=collapser><h2 style="word-break: keep-all; display: block;">References<span class=collapseButtonTight>&nbsp;{{template "exnd" .Collapse}}</span></h2>
<div class=collapserContent>{{$refi := 1}}<div style="margin-top: 0.1em;"><div style="column-width: 30em; column-count: 2; column-gap: 0.5em;"><ol style="margin-top: 0;">{{range $refl := $vars.Refs}}<li id="cite_note-{{$refi}}"><blockquote style="margin-right: 0.5em; word-wrap: break-word; margin-top: 0.1em; margin-inline-start: 0px;">{{$refl}}</p></blockquote></li>{{$refi = add1 $refi}}{{end}}</ol>
{{end}}</div></div>{{end}}
