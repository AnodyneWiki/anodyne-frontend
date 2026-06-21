{{define "subjective" -}}
<div class="effects">
{{if eq .Type "substance"}}<div style="padding: 0.5em; max-width: calc(100vw - 400px); border: 1px solid #a2a9b1; background-color: var(--background-color-disabled)">{{with .Classes}}<div style='padding-bottom: 5px;'><strong>class</strong> /{{range .}} <a href='/class/{{lower .}}'>{{.}}</a>{{end}}</div>{{end}}{{end -}}
{{$subjective := get . "Subjective Effects" -}}
{{$medical := get . "Medical Side Effects" -}}
{{if and $subjective $medical -}}
<style>
#medical-effects-toggle { display: none; }
#medical-effects-toggle:checked ~ .user-reported-effects { display: none; }
#medical-effects-toggle:not(:checked) ~ .medical-effects { display: none; }
#medical-effects-toggle:checked ~ .effects-toggle .medical-effects-label { font-weight: bold; text-decoration: none; cursor: default; }
#medical-effects-toggle:not(:checked) ~ .effects-toggle .user-reported-effects-label { font-weight: bold; text-decoration: none; cursor: default; }
.effects-toggle { margin-bottom: 0.5em; }
.effects-toggle-label { cursor: pointer; text-decoration: underline; }
</style>
<input type="checkbox" id="medical-effects-toggle">
<div class="effects-toggle">Show: <label for="medical-effects-toggle" class="effects-toggle-label user-reported-effects-label">user-reported</label> | <label for="medical-effects-toggle" class="effects-toggle-label medical-effects-label">medical side effects</label></div>
{{- end}}
{{with $subjective -}}
<div class="user-reported-effects">
<div style="column-width: 20em; column-count: 2; column-gap: 0.5em;">
{{- if get . "Physical Effects" -}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/physical-effects>Physical effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Physical Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>
{{- end}}{{if get . "Cognitive Effects"}}<table>
<tr><th style="text-align:left">
<a class=logo href=https://www.effectindex.com/categories/cognitive-effects>Cognitive effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Cognitive Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
{{- if get . "Visual Effects" -}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/visual-effects>Visual effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Visual Effects")}}<li>
{{- template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end -}}
{{if get . "Auditory Effects" -}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/auditory-effects>Auditory effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Auditory Effects")}}<li>
{{- template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
</div></div>
{{- end}}
{{with $medical -}}
<div class="medical-effects">
<div style="padding-bottom: 5px;"><strong>source</strong> / <a class=logo href='{{.URL}}'>SIDER</a>{{with get . "Confidence Score"}} (match {{.}}/100){{end}}</div>
<div style="column-width: 20em; column-count: 2; column-gap: 0.5em;">
{{with get . "Side Effects" -}}
<table><tr><th style="text-align:left">Medical side effects</th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range .}}<li>{{get . "name"}}{{with get . "umls_cui"}} <small>({{.}})</small>{{end}}</li>{{end}}</ul></td></tr></table>
{{- end}}
{{with get . "Indications" -}}
<table><tr><th style="text-align:left">Indications</th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range .}}<li>{{get . "name"}}{{with get . "umls_cui"}} <small>({{.}})</small>{{end}}</li>{{end}}</ul></td></tr></table>
{{- end}}
</div></div>
{{- end}}
{{if eq .Type "substance"}}</div>{{end -}}
</div></div>
{{- end}}
