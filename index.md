{{$ivars := index .Args 0}}

# {{camelcase $ivars.Name}} Index ({{len $ivars.Entries}} entries)

{{$subs := list}}
{{range $sub := $ivars.Entries}}{{$subt := $sub.Title}}{{if $sub.Abr}}{{if kindIs "slice" $sub.Abr}}{{$subt = printf "%s+(%s)" $subt ($sub.Abr | join ", ")}}{{else}}{{$subt = printf "%s+(%s)" $subt $sub.Abr}}{{end}}{{end}}{{$subs = append $subs $subt}} {{end}}
{{$subs = sortAlpha $subs}}
{{range $sub := $subs}}* [{{replace "+" " " $sub}}](/{{kebabcase $ivars.Name}}/{{replace " " "_" (first (splitList "+" $sub))}})
{{end}}
