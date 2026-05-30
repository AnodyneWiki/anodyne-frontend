{{define "erowid" -}}
{{- $v := .}}
{{- $erowid := get $v "Erowid Experience Reports"}}
{{- $reddit := get $v "Reddit Experience Reports"}}

{{- if or (and $erowid (gt (len $erowid) 0)) (and $reddit (gt (len $reddit) 0)) -}}
<div class=collapser><h3>Experience reports<span style="display: inline; padding-left: 10px; font-size: 14.5px !important; line-height: 1.2 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" $v.Collapse}}</span></h3>
<div class=collapsercontent>

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
<input type="checkbox" id="reddit-toggle">
<div class="report-toggle-container">
Show: 
<label for="reddit-toggle" class="report-toggle-label erowid-label">Erowid</label> | 
<label for="reddit-toggle" class="report-toggle-label reddit-label">Reddit</label>
</div>
{{- end}}

<div class="erowid-reports">
{{if and $erowid (gt (len $erowid) 0) -}}
There are currently {{if gt (len $erowid) 25}}25+{{else}}{{len $erowid}}{{end}} experience reports involving {{lower $v.Title}} on <a class=logo href=https://www.erowid.org/experiences/exp.cgi>Erowid</a>:
<ul>{{range slice $erowid 0 (min (len $erowid) 25) -}}
<li><a class=logo href='https://www.erowid.org/experiences/exp.php{{if empty .Id | not}}?ID={{.Id}}{{end}}' target="_blank">{{with .Title}}"{{.}}"{{end}}{{with .Author}} by {{.}}{{end}}</a></li>
{{- end}}
</ul>
{{- end}}
</div>

<div class="reddit-reports">
{{if and $reddit (gt (len $reddit) 0) -}}
There are currently {{len $reddit}} trip reports involving {{lower $v.Title}} on <a class=logo href=https://www.reddit.com/r/tripreports/>Reddit</a>:
<ul>{{range $reddit -}}
<li><a class=logo href='/report/{{$v.Title}}/{{.id}}' target="_blank">{{with .title}}"{{.}}"{{end}}{{with .author}} by {{.}}{{end}} ({{.score}} upvotes)</a></li>
{{- end}}
</ul>
{{- end}}
</div>
</div>
</div>
{{- end}}
{{- end}}
