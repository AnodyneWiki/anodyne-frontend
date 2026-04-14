{{define "chem"}}{{$vars := .}}

{{if any $vars.Salts $vars.Stereoisomers $vars.Chirality $vars.Reagents}}
<h2>Chemistry</h2>
{{if any $vars.Salts $vars.Esters}}
<div class=collapser><h3 style="display: block;">{{printf "%s%s%s" (ternary "" "Salts" (empty $vars.Salts)) (ternary " and " "" (all $vars.Salts $vars.Esters)) (ternary "" "Esters" (empty $vars.Esters))}}<span style="padding-left: 10px; font-size: 14.5px !important; line-height: 1.6 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" .Collapse}}</span></h3>
<div class=collapserContent>{{if $vars.Salts}}{{$vars.Title}} is typically found in the form of its {{template "lrca" (dict "list" $vars.Salts "prefix" "salt")}} salt{{if not (eq 1 (len $vars.Salts))}}s{{end}}{{if not $vars.Esters}}.{{end}}{{end}}{{if $vars.Esters}}

{{if $vars.Salts}} or {{else}}{{$vars.Title}} is typically found in the form of{{end}} its {{template "srca" $vars.Esters}} ester{{if not (eq 1 (len $vars.Esters))}}s{{end}}.{{end}}{{if $vars.EstersRef}}{{template "ref" $vars.EstersRef}}{{end}}{{end}}</div></div>{{end}}

<div class=collapser>

<h3 style="margin-bottom: 0.5em; display: block;">{{template "user" "{wkp 'Stereochemistry' 'Stereochemistry'}"}}<span style="padding-left: 10px; font-size: 14.5px !important; line-height: 1.2 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" .Collapse}}</span></h3>

<div class=collapserContent><p>{{if $vars.StereoisomerRacemic}}{{$vars.StereoisomerRacemic}}{{else}}{{$vars.Title}}{{end}} is a {{$vars.Chirality}} mixture{{if $vars.StereoisomerType}} of the <a class=logo href=https://en.wikipedia.org/wiki/{{$vars.StereoisomerType}}>{{$vars.StereoisomerType}}s</a>{{else}}{{if eq $vars.Opticalactivity "( + / - )" }} of the {{if $vars.ChiralityAminoAcid}}logical{{else}}optical{{end}} stereoisomers{{end}}{{end}}.

</p>{{if $vars.StereoisomerData}}<div style="max-width: calc(100vw - 400px);"><table style='table-layout: fixed; text-align: left; border-collapse: collapse;'>
<tr><th>{{template "user" "{wkp 'Stereoisomers' 'Stereoisomerism'}"}}</th></tr>
<tr style='background-color: #ffffff; color: #555555;'><td><div class=image-grid>
{{range $ster := $vars.StereoisomerData}}<div class=image-item><div class=svg id='{{$ster.Title}}'><a href='#{{$ster.Title}}'>{{$ster.Title}}</a>{{$ster.Structure}}</div></div>{{end}}</div></td></tr>
<tr><td class=InfoboxData>Stereoisomer enumberation with <a href='https://www.rdkit.org'>rdkit</a></td></tr></table></div></div></div></div>
{{end}}
{{if $vars.Reagents}}<div class=collapser><h3>Reagent results</h3><div class=collapserContent><table><tr><th>Reagent</th><th>Color change</th></tr>
{{range $reagent := $vars.Reagents}}<tr style="line-height: 15px;"><td>{{$reagent.Name}}</td><td style="width: 250px; background: linear-gradient(to right, {{$reagent.Start}} 0%, {{$reagent.Stop}} 100%);"></td></tr>{{end}}
</table>{{end}}</div></div>{{end}}
