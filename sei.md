{{$v := index .Args 0}}

{{/*<h1>{{$v.Title}}</h1>*/}}

<div style="margin: -0.5em -0.75em -1em -0.75em; height: 100vh;">
<iframe style="width: 100%; height: 100%;" src="https://www.effectindex.com/effects/{{$v.Title | lower | replace " " "-"}}"></iframe>
</div>
