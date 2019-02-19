using Documenter, Ensino

makedocs(
    modules = [Ensino],
    doctest  = false,
    clean    = true,
    format   = Documenter.HTML(),
    assets = ["assets/logo.ico"],
    sitename = "Ensino Lamps",
    authors = "Guilherme Bodin and contributors.",
    pages = [
        "Home" => "index.md",    
        "julia/julia.md",
        "julia/jump.md",
        "julia/plots.md"
        "git/git.md"
    ]
)

deploydocs(
    repo = "github.com/LAMPSPUC/Ensino.jl.git",
)