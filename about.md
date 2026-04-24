{{$v := index .Args 0 -}}
{{$_ := set $v "Title" "About" -}}
{{import "util.html" -}}

{{/*<h1 id=TitleMain>{{$v.Title}}</h1>*/}}

<div style="margin-left: 10px; padding-left: 10px; border-left: 1px solid var(--border-color-base); max-width: 50%; float:right">
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
<div style="min-width: 50%; max-width: 75%; margin-right: 10px">
<h2>Welcome to <span style="word-break: keep-all; font-family: Inter, sans-serif; font-weight: 600;">Anodyne<span style="font-weight: 200">Wiki</span></span></h2>

{{/* template "imgbox" (dict "src" "/assets/funsies.png" "padding" "0px" "background" "black" "width" "200px") */}}

A meta-wiki for chemicals affecting biological life-forms, their use, administration, effects and interactions.

Its a meta-wiki because of its primary functions as an aggregator for a wide array of sources while only allowing user-contributions through the concept of user-pages. In that regard it is somewhat similar to the concept of a meta-analysis only applied to a wide range of chemicals and primarily through automation and templating.

This tool is actively being developed. Join our [discord](https://discord.gg/DKfYmNrz6Z) community to follow development updates, learn how you can contribute and banter.

If you enjoy this project and have the means, consider <a href='/donate'>donating</a> to keep us afloat.

<span style="color: red">Under no circumstance should information we provide be used as sole reference for recreational substance-use.</span>

<div class=collapser>
<h3>Core Ideas{{template "pexnd" $v.Collapse}}</h3>
    <div class=collapserContent>
<ul>
<li>Consistant templated content structure</li>
<li>Automated content-generation through scrapping a wide array of sources</li>
<li><a class=logo href=https://github.com/AnodyneWiki/anodyne-molpic>Canonicalized molecular structure generator</a></li>
<li>Individualized compound characterizations via <a href=/index/user>userpages</a></li>
<li>Predicted subjective-effects and interactions</li>
<li><a class=logo href=https://github.com/AnodyneWiki>Free and open-source software</a></li>
        </ul>
    </div>
</div>
<div class=collapser>
<h3>Links{{template "pexnd" $v.Collapse}}</h3>
<div class=collapserContent>
<ul>
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
    <li><a href='/index/user'>User Index:</a><span style="padding-left: 10px; font-size: 14.5px !important; line-height: 1.6 !important; margin-bottom: 0px;">&nbsp;{{template "exnd" $v.Collapse}}</span></li>
    <ul style="margin-left: 1.0em;">
        <div class=collapserContent>
            <li><a href=/user/0xea>0xea</a> (developer)</li>{{/* [sech1p](/user/sech1p)*/}}
            <li><a href=/user/magnus>magnus</a> †</li>
            <li><a href=/user/pilz>pilz</a></li>
            <li><a href=/user/emily>emily</a></li>
            <li><a href=/user/bonzi>bonzi</a></li>
            <li><a href=/user/x86pup>x86pup</a></li>
            <li><a href=/user/alina>alina</a></li>
            <li>(your page could be here)</li>
        </div>
    </ul>
</div>
</ul>
<div class=collapser>
<h3>Effects{{template "pexnd" $v.Collapse}}</h3>
    <div class=collapserContent>
<ul>
<li><a href=https://anodyne.wiki/effect/psychosis>Psychosis</a></li>
<li><a href=https://anodyne.wiki/effect/stimfapping>Stimfapping (satire)</a></li>
<li><a class=logo href=https://www.effectindex.com/>Subjective Effect Index</a></li>
        </ul>
    </div>
</div>
<h3>Misc</h3>
<ul>
            <div class=collapser>
                <li><a href=/index/administration>Route of Administration Index:</a><span class=collapse-button>&nbsp;{{template "exnd" $v.Collapse}}</span></li>
                <ul>
                    <div class=collapserContent>
                        <li><a href=/administration/intravenous>Intravenous</a></li>
                    </div>
                </ul>
            </div>
</ul>
</div>
