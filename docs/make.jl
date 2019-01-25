using Documenter

makedocs(
    modules = [Documenter],
    format = Documenter.HTML(
        # Use clean URLs, unless built as a "local" build
        prettyurls = !("local" in ARGS),
        canonical = "MyDocs",
    ),
    assets = ["assets/logo.ico"],
    sitename = "Ensino Lamps",
    authors = "Guilherme Bodin and contributors.",
    pages = [
        "Home" => "index.md",
        "Ferramentas" => Any[
            "Julia" => "julia/julia.md"
            ]
    ]
)
