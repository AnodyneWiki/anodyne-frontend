{{import "util.html"}}
# Quotes

A play on PsychonautWiki's collection of vauge inpersonal quotes such as "be the change you wish to see in the world." or "the problem is not to find the answer, it's to face the answer.".

Instead featuring a curated set of:
- Anything curious / funny found while researching drugs
- Notable experiences that stod-out out

{{- $quotes := (include "quotes.json" | splitFrontMatter).Meta }}
{{$quotei := randInt 0 (len $quotes.strings)}}

<h3>Index</h3>

<div>
{{range $i, $quote := $quotes.strings}}<blockquote style="margin-left: 0.35em; margin-right: 0.35em;" id=Fortune>{{if and $quote (not (eq "" $quote))}}{{with $quote}}{{template "user" .}}{{end}}{{end}}</blockquote>{{end}}
</div>
