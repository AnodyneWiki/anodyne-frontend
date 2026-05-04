{{range list "util.html" "chemistry.md" "effects.md" "erowid.md" "pharmacology.md" "scheduling.md" "infobox.md" "intro.md" "also.md" "history.md"}}{{import .}}{{end -}}

{{$v := index .Args 0 -}}
{{$_ := set $v "Prefix" "composite" -}}
{{if empty $v.Title}}{{httpError 500}}{{end -}}

{{$_ := set $v "RefCur" ""}}{{$_ := set $v "Refs" (default (list) $v.Refs)}}{{$_ := set $v "RefCount" 1 -}}
{{$usernotes := dict "local" (list) "extern" (list) -}}

{{range $user := listFiles "/user" -}}
{{$prefsPath := $user | replace " " "_" | trimPrefix "/" | trimSuffix "/" | lower | printf "/user/%s/preferences.json"}}{{if fileExists $prefsPath -}}
{{with $pv := include $prefsPath | fromJson}}{{range $trd := $pv.TriedSubstances}}{{if eq (lower $trd.Name) (lower $v.Title | replace "_" " " | replace "%20" " ") -}}
{{$_ := set $usernotes (ternary "extern" "local" (default false $pv.External)) (append (ternary "extern" "local" (default false $pv.External) | get $usernotes) (dict "User" $pv.Title "External" (default false $pv.External) "trd" $trd)) -}}
{{end}}{{end}}{{end -}}
{{end -}}
{{end -}}

<h1 id=TitleMain>{{$v.Title}}</h1>
<div id=Toolbar><div class="Toolbarleft"><a class=Toolbaritem {{if contains "true" $v.Editable}} href="/{{$v.Prefix}}/{{$v.Title}}">Current{{else}} href="#" style="color: var(--color-disabled);">Read{{end}}</a></div><div class=Toolbarright><ul style="display: flex;margin: 0;padding: 0;list-style: none;"><li><a class=Toolbaritem {{if contains "true" $v.Editable}} style="color: var(--color-destructive) !important;" href="/{{$v.Prefix}}/{{$v.Title}}">Cancel{{else}} href="/substance/{{$v.Title}}">Edit{{end}}</a></li><li style="border-left: 1px var(--color-disabled);"><a class=Toolbaritem href="/api/{{$v.Prefix}}/{{$v.Title}}">View API</a></li></ul></div></div>

{{/*template "infobox" $v*/}}
<div id=Infobox>
<table><tr>
<th contenteditable=false colspan="2">{{$v.Title}}</th>
</tr>
{{if printf "/composite/%s.jpg" (lower $v.Title) | fileExists}}
<tr><td class=InfoboxImage colspan=2><img class=InfoboxImage width=220 src="/composite/{{lower $v.Title}}.jpg"></td></tr>
{{end}}
</table>
</div>

{{template "intro" $v}}

{{with $v.Substances -}}
<table><tr><th>Structure</th><th>Compound</th><th>Concentration</th>
{{- range $v.Substances -}}
<tr><td class=svg><img style="padding: 5px;" width=60 src="/structure/{{lower .Name | replace " " "_"}}.svg" /></td><td>{{template "lsu" .Name}}</td><td>{{with .Concentration}}{{.}}{{else}}-{{end}}</td></tr>
{{- end -}}
</table>
{{end -}}

{{/*template "chem" $v*/}}
{{template "history" $v}}
{{template "pharma" $v}}

{{if or (empty $usernotes | not) (get $v "Subjective Effects") -}}
<div class=collapser><h2>Subjective effects<span style="padding-left: 10px; font-size: 14.5px !important; line-height: 1.2 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" $v.Collapse}}</span></h2>
<div class=collapserContent>
{{with get $v "Subjective Effects"}}{{template "subjective" .}}{{end -}}

{{if and (empty $usernotes.local) (empty $usernotes.extern) | not -}}<div class=effects style="padding-top: 0.25em;"><div>
{{/*<table><tr><th style="text-align: left;" colspan=2>Usernotes{{template "rexnd" $v.Collapse}}</th></tr>*/}}
{{range $utrd := $usernotes.local -}}
{{/*<tr>*/}}{{template "fnoterow" (dict "v" $v "utrd" $utrd)}}{{/*</tr>*/}}
{{- end}}{{range $utrd := $usernotes.extern -}}
{{/*<tr>*/}}{{template "fnoterow" (dict "v" $v "utrd" $utrd)}}{{/*</tr>*/}}{{end -}}
{{/*</table>*/}}</div></div>{{end}}</div></div>{{end -}}

{{template "erowid" $v}}
{{template "scheduling" $v}}
{{template "also" $v}}
{{template "refs" $v}}
</div>
