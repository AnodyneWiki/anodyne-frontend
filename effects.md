{{define "subjective" -}}
<div class="effects">
{{if eq .Type "substance"}}<div style="padding: 0.5em; max-width: calc(100vw - 400px); border: 1px solid #a2a9b1; background-color: var(--background-color-disabled)"><div style='padding-bottom: 5px;'><strong>class</strong> / {{range .Classes}}<a href='/class/{{lower .}}'>{{.}}</a></div>{{end}}{{end}}
{{with get . "Subjective Effects"}}
<div style="column-width: 20em; column-count: 2; column-gap: 0.5em;">
{{if get . "Physical Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/physical-effects>Physical effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Physical Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>
{{end}}{{if get . "Cognitive Effects"}}<table>
<tr><th style="text-align:left">
<a class=logo href=https://www.effectindex.com/categories/cognitive-effects>Cognitive effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Cognitive Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
{{if get . "Visual Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/visual-effects>Visual effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Visual Effects")}}<li>
{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
{{if get . "Auditory Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/auditory-effects>Auditory effects</a></th></tr>
<tr><td style="background-color: var(--background-color-neutral);"><ul>{{range $eff := sortAlpha (get . "Auditory Effects")}}<li>
{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
</div>
{{- end}}
</div></div>
{{- end}}
