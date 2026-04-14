{{define "anodyneUserMatrix"}}{{$prefs := .-}}
<h2 style="width: 100%;">Substance Matrix (tried {{len .TriedSubstances}} substances)</h2>
<div class=userMatrixStruct style="max-width: repeat({{default "12" $prefs.SubstanceMatrixMaxCols}}, {{default "60px" $prefs.SubstanceMatrixCellW}});">
{{range $i, $sub := $prefs.TriedSubstances -}}
<div style='width: {{default "60px" $prefs.SubstanceMatrixCellW}}; height:{{default "60px" $prefs.SubstanceMatrixCellW}};'><img width="auto" height="auto" alt='' src='/structure/{{replace " " "_" (lower $sub.Name)}}.svg' ></div>
{{end -}}
</div>
{{end}}
