{{$v := index .Args 0}}
{{import "util.html"}}
{{import "effects.md"}}

# {{camelcase $v.Name}}s

<strong>{{title $v.Name}}s</strong> are a class of psychoactive compounds.

{{if get $v "Subjective Effects" -}}
<h2>Subjective effects</h2>
{{template "subjective" $v -}}
{{- end}}

<h2>List of {{$v.Name}}s</h2>

{{$subs := list}}
{{range $sub := $v.Entries}} {{$subs = append $subs $sub.Title}} {{end}}
{{$subs = sortAlpha $subs}}
{{range $sub := $subs}}* [{{$sub}}](/substance/{{replace " " "_" (lower $sub)}})
{{end}}

## See also
- [Anodyne](/)
