{{define "intro" -}}
{{- if .SubstanceRedirectSource -}}<span Id=Redirected>(Redirected from {{.SubstanceRedirectSource}})</span>{{- end -}}

<p><strong>{{.Title}}</strong>{{if .Aliases}} (also known as {{template "srco" (slice .Aliases 0 (min (len .Aliases) 10))}}{{if .Brands}} and brand names including {{template "rca" .Brands}}{{end}}){{end}}{{if .ChemicalClasses}} is a {{template "lrca" (dict "list" .Classes "prefix" "class")}} substance of the {{template "lrca" (dict "list" .ChemicalClasses "prefix" "substituted")}} class.{{end}}</p>{{end}}
