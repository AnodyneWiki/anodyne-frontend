{{import "util.html"}}
# Quotes

{{- $quotes := (include "quotes.json" | splitFrontMatter).Meta }}
{{$quotei := randInt 0 (len $quotes.strings)}}

<h3>Index</h3>

<div>
{{range $i, $quote := $quotes.strings}}<blockquote style="margin-left: 0.35em; margin-right: 0.35em;" id=Fortune>{{if and $quote (not (eq "" $quote))}}{{with $quote}}{{template "user" .}}{{end}}{{end}}</blockquote>{{end}}
</div>
