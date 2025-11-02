{
  description = "OREKA backend";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            python313Packages.python
            python313Packages.pymupdf
            python313Packages.fastapi
            python313Packages.fastapi-cli
            python313Packages.python-multipart
            python313Packages.pandas
            python313Packages.pytest_7
            python313Packages.python-dateutil
          ];
        };
      });
}
