{{$v := index .Args 0 -}}
{{$_ := set $v "Title" "About" -}}
{{import "util.html" -}}

{{/*<h1 id=TitleMain>{{$v.Title}}</h1>*/}}

<div class=about>
<div style="margin-right: 10px">
<h2>Welcome to {{template "logo"}}</h2>

<table style="float: right; max-width: 150px;"><tr><td class="InfoboxImage" style="background-color: black;"><img style="height: 100%;width: 150px;" src="/assets/logo.png"></td></tr><tr><td class="InfoboxData"><span style="word-break: keep-all; background-color: var(--background-color-base);">A needle plunging into a vein.</span></td></tr></table>

<a class=logo href=https://en.wiktionary.org/wiki/anodyne>Anodyne</a> is a meta-wiki centered around chemicals affecting biological life-forms, their administration, effects and interactions which strives to aid those seeking direct means of pharmacological- comfort, healing and enhancement.

This project primarily functions as an aggregator for a wide array of sources only allowing user-contributions through the concept of <a href=/index/user>userpages</a>.

This tool is actively being developed. To follow development updates and learn how you can contribute and banter, join our [Discord](https://discord.gg/DKfYmNrz6Z) / [Matrix](https://matrix.to/#/!zBeZTwXDOJIswNDxxX:anodyne.wiki?via=anodyne.wiki) (bridged to Discord).

If you enjoy this project and have the means, consider <a href='/donate'>donating</a> to keep us afloat.

<div style="border: 1px solid #a2a9b1; border-radius: 5px; background-color: var(--background-color-disabled); font-weight: 500;">
<div style="margin: 5px;">
Under no circumstance should information we provide be used as sole reference for recreational substance-use or substitute for medical advice.

We do not take any responsibility for medical complications or loss of life sustained doing so.

2 of our collaborators have tragically passed away during the development of this project.
</div>
</div>

<div class=collapser>
<h3>Core Ideas{{template "pexnd" $v.Collapse}}</h3>
    <div class=collapserContent>
<ul>
<li>Consistant templated content structure</li>
<li>Automated data-aggregation through scrapping a wide array of sources</li>
<li>Consistant verbose naming scheme</li>
<li>Proper handling of stereoisomers</li>
<li><a class=logo href=https://github.com/AnodyneWiki/anodyne-molpic>Canonicalized custom molecular structure generator</a></li>
<li>Individualized compound characterizations via <a href=/index/user>userpages</a></li>
<li>Subjective-effects and interactions</li>
<li><a class=logo href=https://github.com/AnodyneWiki>Free and open-source software</a></li>
        </ul>
    </div>
</div>
<div class=collapser>
<h3>Links{{template "pexnd" $v.Collapse}}</h3>
<div class=collapserContent>
<ul>
<li><a href='/logger'>Logging Software</a></li>
<li><a href='/random/substance'>Random substance</a></li>
<li><a href='/api'>API</a></li>
<li><a href='/legal'>Legal</a></li>
<li><a href='/donate'>Donate</a></li>
<li><a href='/quotes'>Quotes</a></li>
<li><a class=logo href=https://dbi-igs.org/>DBI-IGS</a></li>
</ul>
</div>
</div>
<h3>Users</h3>
<ul>
<div class=collapser>
    <li><a href='/index/user'>User Index:</a><span class=collapseButton>&nbsp;{{template "exnd" $v.Collapse}}</span></li>
    <ul style="margin-left: 1.0em;">
        <div class=collapserContent>
            <li><a href=/user/0xea>0xea</a> (developer; creator)</li>{{/* [sech1p](/user/sech1p)*/}}
            <li><a href=/user/magnus>magnus</a> †</li>
            <li><a href=/user/pilz>pilz</a></li>
            <li><a href=/user/emily>emily</a></li>
            <li><a href=/user/bonzi>bonzi</a> (developer)</li>
            <li><a href=/user/x86pup>x86pup</a></li>
            <li><a href=/user/mere>mere</a></li>
            <li><a href=/user/ninerik>ninerik</a></li>
            <li><a href=/user/alina>alina</a></li>
            <li><a href=/form>create new userpage</li>
        </div>
    </ul>
</div>
</ul>
<div class=collapser>
<h3>Effects{{template "pexnd" $v.Collapse}}</h3>
    <div class=collapserContent>
<ul>
<li><a href=https://anodyne.wiki/effect/psychosis>psychosis</a></li>
{{/*<li><a href=https://anodyne.wiki/effect/stimfapping>stimfapping (satire)</a></li>*/}}
<li><a class=logo href=https://www.effectindex.com>Subjective Effect Index</a></li>
<li><a class=logo href=http://sideeffects.embl.de>SIDER 4.1 (Side Effect Resource)</a></li>
</ul>
</div>
</div>
<div class=collapser>
<h3>Classes{{template "pexnd" $v.Collapse}}</h3>
    <div class=collapserContent>
<ul>
{{range $subst := sortAlpha (listFiles "class")}}
<li><a href='https://anodyne.wiki/class/{{(trimSuffix ".json" $subst | replace "_" " " | lower)}}'>{{(trimSuffix ".json" $subst | replace "_" " ")}}s</a></li>{{end}}
</ul>
    </div>
</div>
<h3>Misc</h3>
<ul>
            <div class=collapser>
                <li><a href=/index/administration>Route of Administration Index:</a><span class=collapse-button>&nbsp;{{template "exnd" $v.Collapse}}</span></li>
                <ul>
                    <div class=collapserContent>
                        <li><a href=/administration/intravenous>intravenous</a></li>
                    </div>
                </ul>
            </div>
</ul>
</div>
<div style="margin-left: 10px; padding-left: 10px; border-left: 1px solid var(--border-color-base); max-width: 50%;">
<h3>Composite</h3>
        <ul style="margin-left: 1.4em;">
            <div class=collapser>
                <li><a href='/index/composite'>Composite Index:</a></li>
            </div>
        </ul>
<h3>Substances</h3>
        <ul style="margin-left: 1.4em;">
            <div class=collapser>
                <li><a href='/index/substance'>Substance Index:</a><span class=collapse-button>&nbsp;{{template "exnd" $v.Collapse}}</span></li>
                <ul style="margin-left: 1.0em;">
                    <div class=collapserContent>{{range $subst := sortAlpha (listFiles "substituted")}}{{$st := fromJson (include (printf "/substituted/%s" $subst))}}{{if and (not $st.Parent) (not $st.Parents)}}
                        <li>{{template "tree" (replace "_" " " (trimSuffix ".json" $subst))}}</li>{{end}}{{end}}
                    </div>
                </ul>
            </div>
        </ul>
</div>
</div>
