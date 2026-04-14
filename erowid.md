{{define "erowid" -}}
{{- $vars := .}}
{{- if and (get $vars "Erowid Experience Reports") (gt (len (get $vars "Erowid Experience Reports")) 0) -}}
<div class=collapser><h3>Experience reports<span style="display: inline; padding-left: 10px; font-size: 14.5px !important; line-height: 1.2 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" $vars.Collapse}}</span></h3>
<div class=collapsercontent>
There are currently {{if gt (len (get $vars "Erowid Experience Reports")) 25}}25+{{else}}{{len (get $vars "Erowid Experience Reports")}}{{end}} experience reports involving {{lower $vars.Title}} on <a href=https://erowid.io>OpenErowid</a>:
<ul>{{range slice (get $vars "Erowid Experience Reports") 0 (min (len (get $vars "Erowid Experience Reports")) 25) -}}
<li><a class=logo href='https://www.erowid.org/experiences/exp.php{{if empty .Id | not}}?ID={{.Id}}{{end}}'>{{with .Title}}"{{.}}"{{end}}{{with .Author}} by {{.}}{{end}}</a></li>
{{end}}
</ul>
</div>
</div>
{{end}}
{{end}}
