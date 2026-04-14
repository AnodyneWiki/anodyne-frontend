{{import "util.html"}}
{{$v := index .Args 0}}

<div id=Infobox>
<table><tr>
<th colspan="2">{{$v.Title}}</th>
</tr>
{{if printf "/assets/%s.png" (lower $v.Title) | fileExists}}
<tr>
<td class=InfoboxImage colspan=2>
<img class=InfoboxImage src="/assets/{{lower $v.Title}}.png">
<img class=InfoboxImage src="/assets/{{lower $v.Title}}_cath.png">
</td>
</tr>{{end}}</table>
<table><tr>
<th class=InfoboxLabel colspan=2>Anatomy</th></tr>
{{- with $v.Sites}}<tr><th class="InfoboxLabel">Sites</th><td class=InfoboxData>{{template "srca" .}}</td></tr>{{end}}
</table>
</div>

<h1>{{title $v.Title}}</h1>

**{{title $v.Title}}** administration{{if $v.Aliases}} (also known as {{range $i, $alias := $v.Aliases}}{{if not (eq $i 0)}}{{if not (eq $i (sub (len $v.Aliases) 1))}}, {{else}} or {{end}}{{end}}**{{$alias}}**{{end}}){{end}}{{with $v.About}} {{template "user" .}}{{end}}

<h3 style='width: 100%'>Anatomy</h3>
<h4 style='width: 100%'>Arms</h4>

<img width=350px src="/assets/arm.png">

<h3 style='width: 100%'>Procedure</h3>

**Under no circumstance should the instructions below be used as a sole resource for users looking to start, they are only meant for demonstrative purposes.**

**We do not take any responsibility for any medical complications or loss of life sustained by replication of this procedure.**


Supplies:
* Syringe
    * 1ml insulin syringe
    * 1ml / 2.5ml / 5ml luer-lock syringe
        * 27+ gauge luer-lock needle
* Filter
    * Cotton ball (risk of cotton fever and particulate)
    * Luer-lock Syringe Filter
        * 0.22μm / 0.45μm - PTFE / PES / PVDF membrane
* Saline

The instructions below are optimized for the following factors:
* Minimizes waste of supplies
    * Solution can be agitated and safely left to stand to aid full dissolution
    * Minimal mixing container deadspace and crevices
    * Most supplies can be safely reused if required
    * Reduces need for reuse but if needed most supplies can be safely reused
    * Preparing multiple doses at a time
        * Reduces filter usage and loss due to filter deadspace
* Solution is **throughly** micron filtered between two syringes
    * Prevents residual contamination from saline supply or luer-lock threading
    * Adaptable to other enclosed mixing containers by not requiring the wheel filter to be able to fit into it
    * Adaptable to crushed tablets by reducing the amount of initial pulp which otherwise would clog up the wheel filter

Instructions:
1. (Recommended - Optimally inbetween shoots) Wash your injection site and hands with soap and sterilize with a alcohol wipe to minimize risk of infection.
2. Weigh the desired dose on a centrifuge tube's cap.
3. Withdraw your desired volume of saline from a vial.
4. Add your desired dose into the centrifuge tube, spray it with saline and let it dissolve your dose.
5. Draw the solution back up into the previously used syringe.
6. Transfer the solution into a fresh syringe with a wheel filter connected to a fresh needle.
    * (Optional - minimizes residual loss, unnecessary repeatition and usage of filters) Draw a desired amount of the solution into a smaller syringe for immediate use.
        * (Optional) Add a stopper to your syringe for later consumption.
7. Connect a fresh needle to the syringe containing your solution.
    * (Optional - increases size of veins through blood pressure at the cost of increased bleeding and complexity by having to be taken off) If needed apply tourniquet to increasing the blood pressure inside of your veins.
8. Feel and look for a thick stabile vein **which does not have a pulse**.
    <div><img alt='a insulin syringe lighly poking at the median cubital vein' src='/assets/intravenous.png' width=250 style='float: inline-end; border: 1px solid white' ></div>
9. At your choosen site plunge your needle in at an approximate 30 degree ratio flattening out to a 15 degree ratio.
    * (Incase **the plunger is forced back by blood shooting into the syringe**) Immediately pull out; You likely punctured an artery, if possible seek immediate medical attention; Otherwise apply sufficiant pressure and monitor for sustained bleeding.
    * (Incase you **suddenly experience a sharp burning sensation**) Immediately pull out; You likely hit a nerve; If possible seek immediate medical attention; Give the site a break and monitor potencially sustained loss of feeling.
10. Lightly pull back on your plunger to register, while carefully stabilizing the syringe inplace.<div><img style="float: inline-end; border: 1px solid white;" src=/assets/register.gif alt="Blood plume from successful venipuncture" width="300" height="200"></div>
    * (In case blood doesn't shoot into the syringe or in only in a slow laboured manner) Pull out the needle and try again (optimally at another site)
11. Apply light pressure to your plunger till your solution has been full injected.
12. Slowly pull the needle back out of your vein at roughly the same angle that you inserted it.
13. Apply light pressure to the injection site with a piece of cellulose to soak up the expelled blood and aid in quickly stopping bleeding.
    * (Optional - helps reduce chance of overshooting due to compulsive use) Write down the time and dosage and plan ahead for when your redose will be with a timer.

Frequent users may internalize their preferred procedure which can lead them to dangerously deviate out of urgency and desperation by:
- Dosing
    - Eyeballing dosages and not keeping track
    - Compulsive usage habits such as preparing your next shoot immediately after having just injected
- Injecting after being unable to properly register("missing a shoot")
- Reusing injection supplies
    - Needles which have started to dull or had time to harbor bacteria
    - Syringes which have had blood clots form on the inside or had time to harbor bacteria
    - Filters soaked with water leaking previous contaminants or had time to harbor bacteria
    - Sharing injection supplies (especially without sterilization inbetween uses)
- Contamination
    - Using contaminated substances such as brown gunk, scraped powder and crushed tablets
    - Using contaminated mixing containers such as a dirty spoon or the cap of a drinking bottle
    - Using contaminated saline such as tap water, "distilled" water and contaminated larger bottles of saline.
    - Not filtering or using contaminated cotton and other inadequate filters
    - Not sterilizing injection sites or hands

## See also
- {{template "wkp" "Drug injection"}}
- [External: Getting Off: The Basics of Safer Injection](https://harmreduction.org/issues/safer-drug-use/injection-safety-manual/safer-injection-basics/)
- [Youtube: Street heroin: Optimal preparation and injection](https://www.youtube.com/watch?v=gc-2A4F0kBk)
- [Anodyne](/)
- [Diacetylmorphine](/substance/diacetylmorphine)
