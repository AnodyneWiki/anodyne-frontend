{{define "infobox"}}{{$v := .}}{{/*
*/}}{{$boxvars := chunk 3 (list 
	"{wkp 'Molecular_mass' 'Molecular mass'}" "MolecularWeight" 1
	"Density" "Density" 1
	"Appearance" "Color/Form" 1
	"Odor" "Odor" 1
	"Taste" "Taste" 1
	"Melting point" "Melting Point" 1
	"Boiling point" "Boiling Point" 1
	"Decomposition" "Decomposition" 1
	"Solubility" "Solubility" 1
	"{wkp 'Partition_coefficient' 'Predicted LogP'}" "XLogP" 1
)}}{{/*
*/}}{{$structvars := chunk 3 (list
	"{wkp 'Chemical_formula' 'Molecular formula'}" "MolecularFormula" 1
	"{wkp 'IUPAC_nomenclature_of_chemistry' 'IUPAC name'}" "IUPACName" 1
	"{wkp 'Simplified_Molecular_Input_Line_Entry_System' 'SMILES'}" "SMILES" 1
	"{wkp 'Simplified_Molecular_Input_Line_Entry_System' 'SMILES'}" "CanonicalSMILES" 1
	"{wkp 'International_Chemical_Identifier' 'InChI'}" "InChI" 1
	"InChIKey" "InChIKey" 1
)}}{{/*
*/}}{{$pharmvars := chunk 3 (list
	"Elimination half-life" "EliminationHalfLife" 0
	"Duration of action" "DurationOfAction" 0
)}}{{/*
*/}}{{$toxvars := chunk 3 (list
	"{wkp 'TDLo' 'TD{sub}Lo{Esub}'}" "TDLo" 0
	"{wkp 'LDLo' 'LD{sub}Lo{Esub}'}" "LDLo" 0
	"{wkp 'LD50' 'LD{sub}50{Esub}'}" "LD50" 0
	"{wkp 'LC50' 'LC{sub}50{Esub}'}" "LC50" 0
)}}{{/*
*/}}

<div id=Infobox class=Infobox>
<table>
<tr>
<th colspan="2">{{/*
        */}}{{if $v.Abbreviation}}{{if not (kindIs "string" $v.Abbreviation)}}{{template "rcc" $v.Abbreviation}}{{else}}{{$v.Abbreviation}}{{end}}{{/*
        */}}{{else}}{{$v.Title}}{{end}}</th></tr>
        <tr><td class="InfoboxImage svg" colspan="2"><img alt="{{$v.Title}}" src="/structure/{{lower $v.Title | pathEscape | replace "%20" "_"}}.svg" ></td></tr>
{{if $v.SaltData}}</table>
    <table>
        <tr><th class="InfoboxLabel InfoboxTitle" colspan="2">{{template "whint" (dict "hint" $v.Hint "user" "Salts")}}<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
        {{- range $salts := $v.SaltData}}{{if and $salts.Structure $salts.Title}}
        {{- with ternary (printf "<a href=\"/salt/%s\">%s</a> %s" $salts.Name ($salts.Name | title) $salts.Amine) (printf "%s <a href=\"/salt/%s\">%s</a>" $salts.Amine $salts.Name ($salts.Name)) (any (eq $salts.Name "sodium") (eq $salts.Name "potassium") ) | default $v.Title}}
        <tr><td class="InfoboxWhite" style="border-top: 1px white solid; border-bottom: 1px white solid;" colspan="2">{{.}}{{end}}</td></tr>
        <tr><td class="InfoboxImage svg InfoboxWhite" colspan="2">{{$salts.Structure}}</tr></td>
        {{- end}}{{end}}
    </table>
    {{end}}{{if $v.Esters}}<table>
        <tr><th class=InfoboxLabel InfoboxTitle" colspan="2">Esters<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
        {{range $ester := $v.Esters}}{{if fileExists (printf "structure/%s_%s.svg" (replace " " "_" (lower $v.Title)) (replace " " "_" (lower $ester)))}}{{/*
        */}}<tr><td class="InfoboxWhite" style="border-top: 1px white solid; border-bottom: 1px white solid" colspan="2">{{$v.Title}} {{$ester}}</td></tr>
        <tr><td class="InfoboxImage svg InfoboxWhite" colspan="2"><img alt="{{$v.Title}} {{$ester}}" src="{{printf "/structure/%s_%s.svg" (replace " " "_" (lower $v.Title)) (replace " " "_" (lower $ester))}}" >
        </td></tr>{{end}}{{end}}
    </table>
    {{end}}<table>{{/*
*/}}        <tr><td class=InfoboxData colspan="2">Molecular structure via <a href=https://github.com/AnodyneWiki/anodyne-molpic>molpic</a> based on <a href=https://cdk.github.io>CDK</a></td></tr>
    </table>
    <table>
        {{if eq $v.Conformer "none" | not}}<tr><th class="InfoboxLabel InfoboxTitle" colspan="2">{{template "whint" (dict "hint" $v.Hint "user" "Rotamer")}}<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
<tr><td class="3dmol InfoboxImage" colspan="2" style="display: none; max-width: 298px; max-height: 220px;">
{{if eq $v.Conformer "jsmol"}}
{{/*<script type="text/javascript" src="/js/JSmol.min.js"></script>
<script type="text/javascript" src="/js/JSmol.GLmol.min.js"></script>
<div id="jsmol-container">
<script>
document.addEventListener("DOMContentLoaded", (event) => {
Jmol.setXHTML('jsmol-container');
var Info = {
    use: "WebGL HTML5",
    color: "#FFFFFF",
    height: 220,
    width: 298,
    j2sPath: "/j2s",
    serverURL: "/php/jsmol.php",
    defaultModel: "${{$v.InChIKey}}",
    script: "set antialiasdisplay;",
    disableJ2SLoadMonitor: true,
    appletLoadingImage: "none"
};
Jmol.getApplet("jsmol-container", Info)
});
</script></div></div></td></tr></table><table><tr><td class=InfoboxData>Conformer structure via <a href='https://wiki.jmol.org/index.php/JSmol'>JSmol</a></td></tr>*/}}
{{end}}{{if eq $v.Conformer "3dmoljs"}}<script src="/js/3Dmol-min.js"></script><script src="/js/3Dmol.ui-min.js"></script>
<div style="background: white; height: 220px; width: 298px; position: relative;" class='viewer_3Dmoljs' data-cid={{int64 $v.PubChemId}} data-backgroundcolor='0xffffff' data-style='stick:colorscheme~Jmol;sphere:radius~0.4:colorscheme~Jmol'></td></tr>
{{/* data-spin='axis:vy;speed:-0.5'*/}}
<tr><td class=InfoboxData colspan="2">Conformer structure via <a href='https://github.com/3dmol/3Dmol.js'>3Dmol.js</a></td></tr>
<noscript><tr><td class=InfoboxData colspan="2">Enable javascript to view conformer structure via <a href='https://github.com/3dmol/3Dmol.js'>3Dmol.js</a></td></tr></noscript>{{end}}
<script>
const items = document.getElementsByClassName("3dmol");
for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'table-row';
}
</script>{{end}}
</table>
<table>
    <tr><th class="InfoboxLabel Infobox-title" colspan="2">Physical properties<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
    {{range $val := $boxvars}}{{$varskey := first (rest $val)}}{{if get $v $varskey}}<tr><th scope="row" class=InfoboxLabel>{{template "user" (first $val)}}</th><td class=InfoboxData>{{get $v $varskey}}{{if not (eq 0 (last $val))}}&nbsp;{{template "ref" (last $val)}}{{end}}</td></tr>{{end}}{{end}}
</table>
<table>
    <tr><th class="InfoboxLabel InfoboxTitle" colspan="2">Structural Identifiers<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
    {{range $val := $structvars}}{{$varskey := first (rest $val)}}{{if get $v $varskey}}<tr><th scope="row" class="InfoboxLabel">{{template "user" (first $val)}}</th><td class="InfoboxData">{{get $v $varskey}}{{if not (eq 0 (last $val))}}&nbsp;{{template "ref" (last $val)}}{{end}}</td></tr>{{end}}{{end}}
</table>{{$pharmres := list}}{{range $val := $pharmvars}}{{$varskey := rest $val | first}}{{if get $v $varskey}}{{$pharmres = append $pharmres (dict "key" $varskey "val" $val)}}{{end}}{{end}}{{if not (empty $pharmres)}}<table><tr><th class="InfoboxLabel infobox-title" colspan="2">Pharmacokinetics<span style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
        {{range $p := $pharmres}}<tr><th scope="row" class="InfoboxLabel">{{template "user" (first $p.val)}}</th><td class="InfoboxData">{{get $v $p.key}}{{if not (eq 0 (last $p.val))}}&nbsp;{{template "ref" (last $p.val)}}{{end}}</td></tr>{{end}}</table>{{end}}{{$toxres := list}}{{range $val := $toxvars}}{{$varskey := rest $val | first}}{{if get $v $varskey}}{{$toxres = append $toxres (dict "key" $varskey "val" $val)}}{{end}}{{end}}{{if any $v.LD50 $v.LC50 $v.LDLo $v.TDLo}}<table><tr><th class="InfoboxLabel" colspan="2">Toxicity<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
{{range $p := $toxres}}<tr><th scope="row" class="InfoboxLabel">{{template "user" (first $p.val)}}</th><td class="InfoboxData">{{range get $v $p.key}}<strong>{{.organism}}</strong>:<br>{{range .dosages}}<strong>- {{.route}}</strong>: {{.amount}}<br>{{end}}{{end}}{{if not (eq 0 (last $p.val))}}&nbsp;{{template "ref" (last $p.val)}}{{end}}</td></tr>{{end}}
</table>{{end}}
{{if get $v "Dosing Info"}}<div style="max-width: 300px;" class="collapser"><table style="width: 100%;"><tr><th class="InfoboxLabel InfoboxTitle" colspan="2">Dosing<input id=dosing-weight style="font-family: sans-serif; color: var(--color-base); max-width: 100px;" placeholder="Weight in kg" /><span style="float: right;">{{template "exnd" $v.Collapse}}</span></th></tr></table><div class="collapsercontent">{{range $dosrg := get $v "Dosing Info" }}<table style="width: 100%;"><tr><th class="infobox-label InfoboxSubtle" colspan="2">{{$dosrg.Method}}<div style='float:right'>{{template "exnd" $v.Collapse}}</div></th></tr>
{{with $dosrg.Tiers.Threshold}}<tr><th class="InfoboxLabel">Threshold</th><td class="InfoboxData threshold">{{.Lower}}{{if lt .Lower .Upper}} - {{.Upper}}{{end}} {{.Unit}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
{{with $dosrg.Tiers.Light}}<tr><th class="InfoboxLabel">Light</th><td class="InfoboxData light">{{if lt .Lower .Upper}}{{.Lower}} - {{.Upper}}{{else}}≤ {{.Lower}}{{end}} {{.Unit}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
{{with $dosrg.Tiers.Common}}<tr><th class="InfoboxLabel">Common</th><td class="InfoboxData common">{{.Lower}}{{if lt .Lower .Upper}} - {{.Upper}}{{end}} {{.Unit}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
{{with $dosrg.Tiers.Strong}}<tr><th class="InfoboxLabel">Strong</th><td class="InfoboxData strong">{{.Lower}}{{if lt .Lower .Upper}} - {{.Upper}}{{end}} {{.Unit}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
{{with $dosrg.Tiers.Heavy}}<tr><th class="InfoboxLabel">Heavy</th><td class="InfoboxData heavy">{{$dosrg.Tiers.Heavy.Lower}}{{if lt .Lower .Upper}} - {{.Upper}}{{end}} {{.Unit}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
{{with $dosrg.Tiers.Extreme}}<tr><th class="InfoboxLabel">Extreme</th><td class="InfoboxData extreme">{{.Lower}}{{if lt .Lower .Upper}} - {{.Upper}} {{.Unit}}{{else}} {{.Unit}} +{{end}}{{if .Entries}}<span style="float: right;">({{.Entries}}x{{with .Percentage}} - {{.}}%{{end}})</span>{{end}}</td></tr>{{end}}
</table>
{{end}}<table style="width: 100%;"><tr><td class="InfoboxData" colspan="2"><div style="padding-bottom: 0.5em;">Statistically derived dosages via <a href='https://dbi-igs.org'>DBI-IGS</a></div><div style="color: red;">We do not take any responsibility for medical complications or loss of life sustained by following these dosages blindly.</div></td></tr></table></div></div>
{{end}}</div>{{end}}
