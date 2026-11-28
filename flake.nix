{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs =
    {
      nixpkgs,
      flake-utils,
      treefmt-nix,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
        anodyne-frontend = pkgs.stdenvNoCC.mkDerivation {
          pname = "anodyne-frontend";
          version = "unstable";
          src = ./.;

          dontBuild = true;

          installPhase = ''
            cp -r . $out
          '';
        };
      in
      {
        formatter = treefmtEval.config.build.wrapper;
        packages = {
          default = anodyne-frontend;
          inherit anodyne-frontend;
        };
        checks.formatting = treefmtEval.config.build.check ./.;
      }
    );
}
