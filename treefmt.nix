{
  projectRootFile = "flake.nix";
  programs = {
    nixfmt.enable = true; # nix formatter
    statix.enable = true; # nix static analysis
    shellcheck.enable = true; # bash/shell
    yamlfmt.enable = true; # yaml
    prettier.enable = true; # html, css, js, json, md
  };
  settings.global.excludes = [
    "*.html" # Go templates, not parseable by prettier
    "*.lock"
    "*.sql"
    "*.sqlite"
    "LICENSE"
    "robots.txt"
    "assets/**"
    "icons/**"
  ];
}
