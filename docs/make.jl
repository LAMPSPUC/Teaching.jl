using Documenter, Ensino

makedocs(
    modules = [Ensino],
    doctest  = false,
    clean    = true,
    format   = :html,
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

deploydocs(
    repo = "github.com/LAMPSPUC/Ensino.jl.git",
)