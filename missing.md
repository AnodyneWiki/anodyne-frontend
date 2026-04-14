{{$v := index .Args 0}}
# {{$v.Title}}

**There were no results matching the query**

{{if contains "user" $v.Type}}
User
{{end}}
{{if eq $v.Type "substance"}}
In case you are unable to find the substance you are looking for simply: <a href='/api/request/{{$v.Title}}'>request page - "{{$v.Title}}"</a>

Appreciate any suggestions which help expand the wiki's index!

Typically generating requested entries only requires me to index a couple of manual annotations, such as a prefered proper name, abbreviations, an alternative search term for scrapping, known psychoactive categories and occasionally manual <a href=https://pubchem.ncbi.nlm.nih.gov>PubChem</a> or UNII database references and half a minute for the scrapping and structural drawing generation to finish.
{{end}}
