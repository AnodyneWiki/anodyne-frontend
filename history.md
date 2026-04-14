{{define "history"}}
{{$vars := .}}
{{if any $vars.FirstIsoDate $vars.FirstSynthDate}}
## History and culture
{{if $vars.FirstIsoDate}}{{$vars.Title}} was first isolated {{if $vars.FirstIsoFrom}}from {{$vars.FirstIsoFrom}} in {{end}}{{$vars.FirstIsoDate}} {{if $vars.FirstIsoCountry}}in {{$vars.FirstIsoCountry}}{{end}} by {{$vars.FirstIsoWho}}.{{end}}

{{if $vars.FirstSynthDate}}{{$vars.Title}} was first synthesized {{$vars.FirstSynthDate}} in {{$vars.FirstSynthCountry}} by {{$vars.FirstSynthWho}}.{{end}}

{{if and $vars.FirstPharmDate $vars.DrugClasses}}
{{if or $vars.FirstIsoDate $vars.FirstSynthDate}}However, its{{else}}{{$vars.Title}}'s{{end}} effects remained unknown until {{$vars.FirstPharmDate}}, when {{$vars.FirstPharmWho}} discovered it to have {{lower (first $vars.Classes)}} properties.
{{end}}
{{end}}
{{end}}
