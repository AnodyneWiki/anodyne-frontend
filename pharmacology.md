{{define "pharma"}}{{$v := . -}}
{{$inters := list -}}
{{with get $v "KEGG Entries"}}{{range .}}{{range .Interactions}}{{$inters = printf "%s %s" .Target .Action | append $inters}}{{end}}{{end}}{{end -}}
{{$inters := uniq $inters -}}

{{if any $v.Actives $v.SwissTargetPredictions $inters (get $v "ATC Code") (get $v "MeSH Pharmacological Classification") -}}
<h2>Pharmacology</h2>

{{$ratc := get $v "ATC Code" -}}
{{with $atc := kindIs "string" $ratc | ternary (list $ratc "") $ratc -}}
<h3>{{template "user" "{wkp 'Anatomical Therapeutic Chemical Classification System' 'ATC Classification'}"}}</h3>
{{$l := ""}}{{$lclass := list -}}
{{range $code := $atc -}}
{{$pre := splitList "-" $code | first | default "" | trim -}}
{{$class := splitList "-" $code | rest | first | default "" | trim -}}
{{if len $pre | eq 1 -}}
In the <a class=logo href={{trunc 1 $pre | upper | printf "https://en.wikipedia.org/wiki/ATC_code_%s"}}>{{lower $class}}</a> ({{printf "<a class=logo href='https://go.drugbank.com/atc/%s'>%s</a>) %s" $pre $pre (lower $v.Title)}} acts 
{{$l = printf "!%s" $code -}}
{{else if hasPrefix "N" $code -}}
{{$class = $class | replace "Psychostimulants, agents used for adhd and nootropics" "<a href=/class/stimulant>stimulant</a>" -}}
{{$class = $class | replace "Centrally acting sympathomimetics" "<a href=/class/sympathomimetic>sympathomimetic</a>" -}}
{{$class = $class | replace "Amfetamine" "" -}}
{{$class = $class | trimSuffix "s" -}}
{{if empty $class | not}}{{$class = printf "<em>%s</em> (<a class=logo href='https://go.drugbank.com/atc/%s'>%s</a>)" ($class | lower) $pre $pre}}{{$lclass = append $lclass $class}}{{end -}}
{{$l = printf "%s - %s" $pre (default "" $class) -}}
{{else if and $lclass $l (hasPrefix "!" $l | not)}}{{if hasPrefix ($l | trunc 1) $code | not}} as a {{template "rca" (sortAlpha $lclass)}}{{$lclass = list}}.{{template "refg" (dict "refs" $v.Refs "grep" "pubchem")}}{{end -}}
{{else}}{{$l = $code -}}
{{end}}{{end -}}
{{end -}}

{{$rmesh := get $v "MeSH Pharmacological Classification" -}}
{{if kindIs "list" $rmesh}}{{with $mesh := $rmesh -}}
<h3>{{template "user" "{wkp 'List of MeSH codes' 'MeSH Classification'}"}}</h3>
<ul>
{{range $me := $mesh -}}
{{$name := $me.Name | replace "Central Nervous System Stimulant" "Stimulant" -}}
{{$name = $name | lower | trimSuffix "s" -}}
<li>{{printf "<em>%s</em> (<a class=logo href='https://www.ncbi.nlm.nih.gov/mesh/%s'>%s</a>)" $name $me.Id $me.Id -}}
</li>
{{end -}}
</ul>{{end}}{{end -}}

<h3>Metabolism</h3>
{{if $v.Actives}}<p>{{$v.Title}} acts as a {{$ac := "prodrug"}}{{range $cc := $v.Classes}}{{if eq (lower $cc) "codrug"}}{{$ac = "codrug"}}{{end}}{{end}}{{if eq $ac "codrug"}}<a class=logo href=https://en.wikipedia.org/wiki/codrug>codrug</a>{{else}}<a class=logo href=https://en.wikipedia.org/wiki/prodrug>prodrug</a>{{end}} for:</p>
<table style='max-width: calc(100% - 400px); display: inline-table; text-align: left; border-collapse: collapse;'>
<tr><th>Metabolic pathways<span style='float:right'>&nbsp;{{template "exnd" .collapse}}</span></th></tr>
<tr style='background-color: #ffffff; color: #555555; padding-bottom: 0px;' >
<td>
<div class="thumb center" style="background-color: white; color: var(--color-disabled);">
<div style="position:relative; overflow:hidden;">
<div><span typeof="mw:File"><img decoding="async" width="700" height="286">></span>
</div> 
<div style="text-align:center; font-size:16px; line-height:110%">
<div style="background-color:transparent;">
<div id="annotation_45x220" style="position:absolute; left:45px; top:20px; line-height:110%;"><img alt="{{$v.Title}}" width=150 src="/structure/{{lower $v.Title | pathEscape}}.svg" ><br><span style="background-color:transparent; color:inherit;"><em style="color: var(--color-disabled-emphasized);">{{$v.Title}}</em></span></div>
{{$off := 0}}{{range $active := $v.Actives}}{{$apiPath := printf "/api/substance/%s" (replace "_" "%20" (lower $active))}}{{$apiFile := httpInclude $apiPath}}{{$aars := fromJson $apiFile}}<div id="annotation_300x220" style="position:absolute; left:{{add 300 $off}}px; top:20px; line-height:110%;">
<img width=150 src='/structure/{{replace " " "_" (lower $active)}}.svg'><br><span style="text-align: center;"><a href='/substance/{{replace " " "_" (lower $active)}}'>{{$active}}</a></span>
</div>{{$off = add 200 $off}}{{end}}
<div id="annotation_220x242" style="position:absolute; left:220px; top:42px; font-size:12px; font-size:12; line-height:14px;"><span style="background-color:transparent; color:inherit;"><a href="https://anodyne.wiki/substance/Flavin-containing_monooxygenase_3" title="Flavin-containing monooxygenase 3">FMO3</a></span><br><div class="arrow"></div><br><span style="background-color:transparent; color:inherit;"><a href="https://anodyne.wiki/substance/Flavin-containing_monooxygenase_3" title="Flavin-containing monooxygenase 3">FMO3</a></span></div>
<div id="annotation_480x330" style="position:absolute; left:480px; top:130px; font-size:12px; font-size:12; line-height:14px;"></div></div>
</div>
</div>
<div class="thumbcaption" style="color: var(--color-base);background-color: var(--background-color-interactive); clear:left">At normal urine pH, about <span class="nowrap">30–40%</span> of amphetamine is excreted unchanged and roughly 50% is excreted as the inactive metabolites (bottom row).<sup id="cite_ref-FDA_Pharmacokinetics_3-17" class="reference"><a href="#cite_note-FDA_Pharmacokinetics-3"><span class="cite-bracket">[</span>2<span class="cite-bracket">]</span></a></sup> The remaining <span class="nowrap">10–20%</span> is excreted as the active metabolites.<sup id="cite_ref-FDA_Pharmacokinetics_3-18" class="reference"></div>
</div>
</td></tr></table>
{{end}}

{{if $inters}}
<div class=collapser><h3>Interactions<span class="collapse-button">&nbsp;{{template "exnd" .collapse}}</span></h3>
<div class=collapserContent><ul>{{range $inters}}<li>{{.}}</li>{{end}}</ul>
</div></div>
{{end}}
{{end}}{{end}}
