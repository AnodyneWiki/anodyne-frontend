{{$ivars := index .Args 0}}
{{import "util.html"}}

# {{with $ivars.Position}}{{.}}-{{end}}Substituted {{$ivars.Name}}s{{with $ivars.Abr}} ({{.}}){{end}}

<strong>{{with $ivars.Position}}{{.}}-{{end}}Substituted {{$ivars.Name}}s</strong> are a class of compounds derived of the {{$ivars.Name}} base structure.

## List of {{with $ivars.Position}}{{.}}-{{end}}substituted {{$ivars.Name}}s

<table class=ranklist>
<tr><th>Compound</th><th>Structure</th></tr>
{{$first := title $ivars.Name}}
{{$firstabr := ""}}
{{if $ivars.First}}{{if $ivars.First.Title}}{{$first = $ivars.First.Title}}{{if $ivars.First.Abr}}{{$firstabr = $ivars.First.Abr}}{{end}}{{end}}{{end}}
{{$rfirst := (replace " " "_" (lower $first))}}
{{$subs := list}}
{{$subsmwl := 0}}
{{range $sub := $ivars.Entries}}{{$mw := first (splitList "." $sub.MW)}}{{if gt (int (len $mw)) $subsmwl}}{{$subsmwl = (int (len $mw))}}{{end}}{{end}}

{{range $sub := $ivars.Entries}}{{$mw := first (splitList "." $sub.MW)}}{{$subt := list (replace " " "" (cat (list (repeat (int (sub $subsmwl (len $mw))) "0" ) $mw))) $sub.Title}}{{if $sub.Abr}}{{if not (kindIs "string" $sub.Abr)}}{{$subt = (append $subt ($sub.Abr | join ", "))}}{{else}}{{$subt = append $subt $sub.Abr}}{{end}}{{end}}{{$subs = append $subs ($subt | join ";")}}{{end}}
{{$subs = sortAlpha $subs}}
<!--{{range $subt := $subs}}{{$subt}}<br>{{end}}-->
<ul>{{if fileExists (printf "substance/%s" $rfirst)}}
{{if fileExists (printf "substance/%s/mods.json" $rfirst)}}{{- $imods := (include (printf "substance/%s/mods.json" $rfirst) | splitFrontMatter).Meta}}{{if $imods.IsClass}}{{range $cc := slice $imods.ChemicalClasses 1}}<li>{{template "sl" $cc}}</li>
{{end}}{{end}}{{end}}{{end}}
{{if $ivars.Parents}}{{range $par := $ivars.Parents}}<li>{{template "sl" (lower $par)}}</li>{{end}}<ul>{{else}}{{if $ivars.Parent}}<li>{{template "sl" (lower $ivars.Parent)}}</li><ul>{{end}}{{end}}{{$sml := list $ivars.Name}}{{if $ivars.Analogues}}{{range $anal := $ivars.Analogues}}{{$sml = append $sml $anal}}{{end}}{{end}}{{range $smc := sortAlpha $sml}}<li>{{if not (eq $smc $ivars.Name)}}{{template "sl" $smc}}{{else}}<span style="text-decoration: underline; color: var(--color-visited--active);">{{if $ivars.Position}}{{$ivars.Position}}-{{end}}Substituted {{$smc}}s</span>{{if $ivars.Abr}}{{printf " (%s)" $ivars.Abr}}{{end}}{{end}}</li>{{end}}{{if $ivars.Children}}<ul>{{range $ch := sortAlpha $ivars.Children}}<li>{{template "sl" $ch}}</li>{{end}}{{if or $ivars.Parent $ivars.Parents}}</ul>{{end}}{{end}}</ul></ul><br>

{{if $ivars.First}}<tr><td><a href='/substance/{{$rfirst}}'>{{$first}}{{if $firstabr}} ({{if not (kindIs "string" $firstabr)}}{{$firstabr | join ", "}}{{else}}{{$firstabr}}{{end}}){{end}}</a></td><td style="padding: 10px; max-height: 70px;"><img  src='/structure/{{$rfirst}}.svg'></td></tr>{{end}}
{{range $sub := $subs}}<tr><td><a href='/substance/{{replace "'" "%27" (replace " " "_" (lower (first (rest (splitList ";" $sub)))))}}'>{{first (rest (splitList ";" $sub))}}{{if first (rest (rest (splitList ";" $sub)))}} ({{first (rest (rest (splitList ";" $sub)))}}){{end}}</a></td><td style="padding: 0px; max-height: 70px;"><img style='padding: 10px; max-height: 70x; background-color: white;' src='/structure/{{replace "'" "%27" (replace " " "_" (lower (first (rest (splitList ";" $sub)))))}}.svg'></td></tr>
{{end}}
</table>

## See also
{{with $ivars.Parent}}- {{template "sl" .}}{{end}}
- [Anodyne](/)
