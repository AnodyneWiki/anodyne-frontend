{{define "scheduling"}}{{$v := . -}}
    {{- with $v.Scheduling -}}
    <div class=collapser>
        <h2>Legal status{{template "rexnd" $v.Collapse}}</h2>
        <div class=collapserContent>
            <p><ul>{{range $s := . -}}
                <li><strong>{{$s.gov}}</strong>: {{$v.Title}} is a {{$s.schedule}}{{if $s.act}} under the "{{$s.act}}"{{end}}.{{if $s.ref}}{{range $ref := $s.ref}}{{template "ref" $ref}}{{end}}{{end}}</li>
            {{end}}</ul></p>
        </div>
    </div>
    {{end}}
{{end}}
