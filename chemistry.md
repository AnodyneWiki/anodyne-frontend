{{define "chem"}}{{$v := .}}

{{if any $v.Salts $v.Stereoisomers $v.Chirality $v.Reagents}}
<h2>Chemistry</h2>
{{if any $v.Salts $v.Esters}}
<div class=collapser><h3 style="display: block;">{{printf "%s%s%s" (ternary "" "Salts" (empty $v.Salts)) (ternary " and " "" (all $v.Salts $v.Esters)) (ternary "" "Esters" (empty $v.Esters))}}<span class=collapseButton>&nbsp;{{template "exnd" .Collapse}}</span></h3>
<div class=collapserContent>{{if $v.Salts}}{{$v.Title}} is typically found in the form of its {{template "lrca" (dict "list" $v.Salts "prefix" "salt")}} salt{{if not (eq 1 (len $v.Salts))}}s{{end}}{{if not $v.Esters}}.{{end}}{{end}}{{if $v.Esters}}

{{if $v.Salts}} or {{else}}{{$v.Title}} is typically found in the form of{{end}} its {{template "srca" $v.Esters}} ester{{if not (eq 1 (len $v.Esters))}}s{{end}}.{{end}}{{if $v.EstersRef}}{{template "ref" $v.EstersRef}}{{end}}{{end}}</div></div>{{end}}

<div class=collapser>

<h3 style="margin-bottom: 0.5em; display: block;">{{template "user" "{wkp 'Stereochemistry' 'Stereochemistry'}"}}<span class=collapseButtonTight>&nbsp;{{template "exnd" .Collapse}}</span></h3>

<div class=collapserContent><p>{{if $v.StereoisomerRacemic}}{{$v.StereoisomerRacemic}}{{else}}{{$v.Title}}{{end}} is a {{$v.Chirality}} mixture{{if $v.StereoisomerType}} of the <a class=logo href=https://en.wikipedia.org/wiki/{{$v.StereoisomerType}}>{{$v.StereoisomerType}}s</a>{{else}}{{if eq $v.Opticalactivity "( + / - )" }} of the {{if $v.ChiralityAminoAcid}}logical{{else}}optical{{end}} stereoisomers{{end}}{{end}}.

</p>{{if $v.StereoisomerData}}<div style="max-width: calc(100vw - 400px);"><table style='table-layout: fixed; text-align: left; border-collapse: collapse;'>
<tr><th>{{template "user" "{wkp 'Stereoisomers' 'Stereoisomerism'}"}}</th></tr>
<tr style='background-color: #ffffff; color: #555555;'><td><div class=image-grid>
{{range $ster := $v.StereoisomerData}}<div class=image-item><div class=svg id='{{$ster.Title}}'><a style='line-height: 1.0;' href='/substance/{{$ster.Title}}'>{{$ster.Title}}</a>{{$ster.Structure}}</div></div>{{end}}</div></td></tr>
<tr><td class=InfoboxData>Stereoisomer enumberation with <a href='https://www.rdkit.org'>rdkit</a></td></tr></table></div></div></div></div>
{{end}}

{{with $v.Druglikeness}}<div class=collapser><h3>{{template "wkp" (dict "src" "Druglikeness" "alias" "Druglikeness")}}</h3>
{{with .Lipinski}}<h4>{{template "wkp" (dict "src" "Lipinski's rule of five" "alias" "Lipinski's rule of five")}}</h4>
{{if eq .Passes true}}{{$v.Title}} matches Lipinski's rule of five{{else}}{{$v.Title}} doesn't match Lipinski's rule of five{{end}}{{with .Violations}} (violations: {{.}}){{end}}.
{{end}}
</div>
{{end}}

{{if $v.Reagents}}<div class=collapser><h3>{{template "wkp" (dict "src" "Reagent testing" "alias" "Reagents")}}</h3>
<div class=collapserContent>
<p>There are currently {{len $v.Reagents}} reagent-interactions on <a class=logo href=https://protestkit.eu/drugspro/reagents/analyze>DrugsPRO</a></p>
<table><tr><th class=InfoboxLabel>Reagent</th><th class=InfoboxLabel>Color change</th></tr>
{{range $reagent := $v.Reagents}}<tr style="line-height: 15px;"><td>{{$reagent.Name}}</td><td style="width: 250px; background: linear-gradient(to right{{if $reagent.Colors | empty}}, white, white{{else}}{{range $reagent.Colors}}, {{.}}{{end}}{{end}});"></td></tr>{{end}}
</table>{{end}}</div></div>
{{- end}}
