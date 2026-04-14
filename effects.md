{{define "subjective" -}}
<div class="effects">
<div style="column-width: 20em; column-count: 2; column-gap: 0.5em;">
{{if get . "Physical Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/physical-effects>Physical effects</a></th></tr>
<tr><td><ul>{{range $eff := sortAlpha (get . "Physical Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>
{{end}}{{if get . "Cognitive Effects"}}<table>
<tr><th style="text-align:left">
<a class=logo href=https://www.effectindex.com/categories/cognitive-effects>Cognitive effects</a></th></tr>
<tr><td><ul>{{range $eff := sortAlpha (get . "Cognitive Effects")}}<li>{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
{{if get . "Visual Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/visual-effects>Visual effects</a></th></tr>
<tr><td><ul>{{range $eff := sortAlpha (get . "Visual Effects")}}<li>
{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
{{if get . "Auditory Effects"}}
<table><tr><th style="text-align:left"><a class=logo href=https://www.effectindex.com/categories/auditory-effects>Auditory effects</a></th></tr>
<tr><td><ul>{{range $eff := sortAlpha (get . "Auditory Effects")}}<li>
{{template "xeff" $eff}}</li>{{end}}</ul></td></tr></table>{{end}}
</div></div>
{{- end}}
