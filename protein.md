{{range list "util.html" "chemistry.md" "effects.md" "erowid.md" "pharmacology.md" "scheduling.md" "infobox.md" "intro.md" "also.md" "history.md"}}{{import .}}{{end}}

{{$vars := index .Args 0}}
{{if empty $vars.Title}}{{httpError 500}}{{end}}

<div class="Infobox">
<table>
<tr><th colspan="2">{{$vars.Title}}</th></tr>
<tr><td class="3dmol InfoboxImage" colspan="2" style="display: none; max-width: 298px; max-height: 220px;">
<script src="/js/3Dmol-min.js"></script><script src="/js/3Dmol.ui-min.js"></script>
<div style="background: white; height: 220px; width: 298px; position: relative;" class='viewer_3Dmoljs' data-pdb={{$vars.PDB}} data-backgroundcolor='0xffffff' data-style='cartoon:color=spectrum'></td></tr>
{{/* data-spin='axis:vy;speed:-0.5'*/}}
<tr><td class=InfoboxData colspan="2">Conformer structure via <a href='https://github.com/3dmol/3Dmol.js'>3Dmol.js</a></td></tr>
<noscript><tr><td class=InfoboxData colspan="2">Enable javascript to view conformer structure via <a href='https://github.com/3dmol/3Dmol.js'>3Dmol.js</a></td></tr></noscript>
<script>
const items = document.getElementsByClassName("3dmol");
for (let i = 0; i < items.length; i++) {
    items[i].style.display = 'table-row';
}
</script>
</td></tr>
</table></div>

# {{$vars.Title}}
