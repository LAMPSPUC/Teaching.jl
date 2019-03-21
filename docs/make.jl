using Documenter, Teaching

makedocs(
    modules = [Teaching],
    doctest  = false,
    clean    = true,
    format   = Documenter.HTML(),
    assets = ["assets/logo.ico"],
    sitename = "Lamps Teaching",
    authors = "Guilherme Bodin and contributors.",
    pages = [
        "Home" => "index.md",    
        "julia/julia.md",
        "julia/jump.md",
        "julia/plots.md",
        "git/git.md"
    ]
)

deploydocs(
    repo = "github.com/LAMPSPUC/Teaching.jl.git",
)