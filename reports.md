{{define "reports"}}{{$v := . -}}
{{- $erowid := get $v "Erowid Experience Reports"}}
{{- $reddit := get $v "Reddit Experience Reports"}}

{{- if or (and $erowid (gt (len $erowid) 0)) (and $reddit (gt (len $reddit) 0)) -}}
<h3>Experience reports</h3>
{{if and (and $erowid (gt (len $erowid) 0)) (and $reddit (gt (len $reddit) 0)) -}}
<style>
.report-toggle-container { margin-bottom: 10px; font-size: 0.9em; }
.report-toggle-label { cursor: pointer; text-decoration: underline; }
#reddit-toggle { display: none; }
#reddit-toggle:checked ~ .erowid-reports { display: none; }
#reddit-toggle:not(:checked) ~ .reddit-reports { display: none; }
#reddit-toggle:checked ~ .report-toggle-container .reddit-label { font-weight: bold; text-decoration: none; cursor: default; }
#reddit-toggle:not(:checked) ~ .report-toggle-container .erowid-label { font-weight: bold; text-decoration: none; cursor: default; }
</style>
{{/*
<input type="checkbox" id="reddit-toggle">
<div class="report-toggle-container">
Show: 
<label for="reddit-toggle" class="report-toggle-label erowid-label">Erowid</label> | 
<label for="reddit-toggle" class="report-toggle-label reddit-label">Reddit</label>
</div>*/}}
{{- end}}

{{if and $erowid (gt (len $erowid) 0) -}}
<div class=collapser>
<h4>Erowid</h4>
{{/*<div class="erowid-reports">*/}}
There are currently {{len $erowid}} experience reports involving {{lower $v.Title}} on <a class=logo href=https://www.erowid.org/experiences/exp.cgi>Erowid</a>:<span class=collapseButtonTight>&nbsp;{{template "exnd" $v.Collapse}}</span>
<div style="max-width: 700px; max-height: 200px; overflow-y: auto;" class=collapserContent>
<ul>{{range $erowid -}}
<li><a class=logo href='https://www.erowid.org/experiences/exp.php{{if empty .Id | not}}?ID={{.Id}}{{end}}' target="_blank">{{with .Title}}"{{.}}"{{end}}{{with .Author}} by {{.}}{{end}}</a></li>
{{- end}}
</ul>
{{- end}}
{{/*</div>*/}}
</div>
</div>

{{if and $reddit (gt (len $reddit) 0) -}}
<div class=collapser>
<h4>Reddit</h4>
There are currently {{len $reddit}} trip reports involving {{lower $v.Title}} on <a class=logo href=https://reddit.com/r/tripreports/>Reddit</a>:<span class=collapseButtonTight>&nbsp;{{template "exnd" $v.Collapse}}</span>
<div style="max-width: 700px; max-height: 200px; overflow-y: auto;" class=collapserContent>
{{/*<div class="reddit-reports">*/}}
<ul>{{range $reddit -}}
<li><a class=logo href='{{.url}}' target="_blank">{{with .title}}"<span class=report-title>{{.}}</span>"{{end}}{{with .author}} by {{.}}{{end}} ({{.score}} upvotes)</a></li>
{{end}}
</ul>
{{end}}
{{/*</div>*/}}
</div>
</div>
{{- end}}
{{- end}}
