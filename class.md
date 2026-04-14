{{$ivars := index .Args 0}}

# {{camelcase $ivars.Name}}s

<strong>{{title $ivars.Name}}s</strong> are a class of psychoactive compounds.

## List of {{$ivars.Name}}s

{{$subs := list}}
{{range $sub := $ivars.Entries}} {{$subs = append $subs $sub.Title}} {{end}}
{{$subs = sortAlpha $subs}}
{{range $sub := $subs}}* [{{$sub}}](/substance/{{replace " " "_" (lower $sub)}})
{{end}}

## See also
- [Anodyne](/)
