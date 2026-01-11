{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_22
    pkgs.wrangler
    pkgs.git
  ];
  idx.extensions = [
    "esbenp.prettier-vscode"
    "dsznajder.es7-react-js-snippets"
    "bradlc.vscode-tailwindcss"
  ];
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [ "npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0" ];
        manager = "web";
      };
    };
  };
}