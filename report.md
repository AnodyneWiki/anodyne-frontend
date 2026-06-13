{{$v := index .Args 0 -}}
{{$r := $v.SelectedReport -}}

<h1 id=TitleMain>{{$r.title}}</h1>
<div id=Toolbar>
  <div class="Toolbarleft"><a class=Toolbaritem href="/substance/{{$v.Title}}">Back to {{$v.Title}}</a></div>
  <div class=Toolbarright>
    <ul class=ToolbarMenu>
      <li><a class=Toolbaritem href="{{$r.url}}" target="_blank">Original on Reddit</a></li>
    </ul>
  </div>
</div>

<div class="report-meta" style="margin-bottom: 20px; font-size: 0.9em;">
  Posted by <strong>{{$r.author}}</strong> on <strong>{{$r.pubdate}}</strong> | Score: <strong>{{$r.score}}</strong> | Reddit Flair: <strong>{{$r.flair}}</strong>
</div>

<hr>

<div class="report-body" style="white-space: pre-wrap; line-height: 1.6; font-family: serif; font-size: 1.1em;">
{{$r.body}}
</div>
