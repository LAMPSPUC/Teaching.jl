var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#Ensino-LAMPS-1",
    "page": "Home",
    "title": "Ensino LAMPS",
    "category": "section",
    "text": ""
},

{
    "location": "julia/julia/#",
    "page": "Julia",
    "title": "Julia",
    "category": "page",
    "text": ""
},

{
    "location": "julia/julia/#Julia-1",
    "page": "Julia",
    "title": "Julia",
    "category": "section",
    "text": "Documentação Julia - Documentação oficialLinks úteis para aprender JuliaJulia Learning\nJulia no youtube\nProgramação em Julia"
},

{
    "location": "julia/julia/#Instalação-1",
    "page": "Julia",
    "title": "Instalação",
    "category": "section",
    "text": "Para instalar julia basta seguir os passos neste linkRecomendamos baixar a versão 1.0.3 (Long-term support release)"
},

{
    "location": "julia/julia/#IDEs-1",
    "page": "Julia",
    "title": "IDEs",
    "category": "section",
    "text": "Uma vez o julia instalado no seu computador você precisará de uma IDE (Integrated Development Environment) para desnvolver o seu código. Os mais comuns para desenvolvimento em Julia são:Atom\nVscodeNão existe um melhor, mas escolha um e fique com ele até se sentir a vontade para criar projetos e rodar os códigos."
},

{
    "location": "julia/julia/#Help-1",
    "page": "Julia",
    "title": "Help",
    "category": "section",
    "text": "Um atalho rápido para entender o uso de uma função é o help do terminal. Imagine que para a sua aplicação você precisa da função findmin mas não sabe como usá-la. Ao digitar ? em um terminal julia ele deve se tornar um terminal help. Agora podemos digitar o nome da função para entender o seu usohelp?> findminO resultado deve ser algo do tiposearch: findmin findmin! findmax findmax!\n\n  findmin(itr) -> (x, index)\n\n  Return the minimum element of the collection itr and its index. If there are\n  multiple minimal elements, then the first one will be returned. If any data\n  element is NaN, this element is returned. The result is in line with min.\n\n  The collection must not be empty.\n\n  Examples\n  ≡≡≡≡≡≡≡≡≡≡\n\n  julia> findmin([8,0.1,-9,pi])\n  (-9.0, 3)\n  \n  julia> findmin([7,1,1,6])\n  (1, 2)\n  \n  julia> findmin([7,1,1,NaN])\n  (NaN, 4)\n\n  ────────────────────────────────────────────────────────────────────────────\n\n  findmin(A; dims) -> (minval, index)\n\n  For an array input, returns the value and index of the minimum over the\n  given dimensions. NaN is treated as less than all other values.\n\n  Examples\n  ≡≡≡≡≡≡≡≡≡≡\n\n  julia> A = [1.0 2; 3 4]\n  2×2 Array{Float64,2}:\n   1.0  2.0\n   3.0  4.0\n  \n  julia> findmin(A, dims=1)\n  ([1.0 2.0], CartesianIndex{2}[CartesianIndex(1, 1) CartesianIndex(1, 2)])\n  \n  julia> findmin(A, dims=2)\n  ([1.0; 3.0], CartesianIndex{2}[CartesianIndex(1, 1); CartesianIndex(2, 1)])"
},

{
    "location": "julia/julia/#Tipos-1",
    "page": "Julia",
    "title": "Tipos",
    "category": "section",
    "text": "Para realizar a modelagem de tipos dentro dos módulos é necessário ter uma estrutra de dados em mente, o que não é óbvio. Independente da estrutura de dados escolhida usamos tipos abstratos e tipos compósitos. Como exemplo de estrutura de dados para exemplificar a modelagem vamos modelar formas geométricas. Como existem muitas formas geométricas poderíamos dizer que formas geométricas são de certa forma um conceito abstrato, o que encaixa perfeitamente na modelização por tipo abstratoabstract type GeometricShape endApesar de existirem infinitas formas geométricas vemos todos os dias retângulos e triângulos que podem ser concretamente modeladas. Para fazer a modelagem de retângulos precisamos saber quais são as especificações dos retângulos, no caso altura e largura. Poderíamos dizer que base e altura definem, compõem um retângulo e aqui identificamos que um retângulo pode ser modelado por um tipo compósito. Um argumento a mais possível para os retângulos seria uma string que diz a fórmula da sua áreamutable struct Rectangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nendAnalogamente os triângulos são definidos por base e alturamutable struct Triangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nendAo declarar um tipo automaticamente um construtor é criado, ou seja, foi criada uma função para construir um retângulo e um triângulo, declarando de forma simples rect = Rectangle(\"base*height\", 1.0, 2.0)\ntriang = Triangle(\"(base*height)/2\", 1.0, 2.0)criamos uma variável rect do tipo Rectangle e uma variável tring do tipo Triangle.Como a fórmula para calcular a área de uma figura nunca muda poderíamos criar um novo construtor que ao receber os parâmetros base e height preenche automaticamente a fórmula tanto para triângulos quanto para retângulosfunction Rectangle(base::Float64, height::Float64)\n    Rectangle(\"base*height\", base, height)\nend\n\nfunction Triangle(base::Float64, height::Float64)\n    Triangle(\"(base*height)/2\", base, height)\nendAgora podemos construir retângulos e triângulos declarando apenas as suas dimensõesrect = Rectangle(1.0, 2.0)\ntriang = Triangle(1.0, 2.0)Tipos compósitos podem herdar métodos de bibliotecas específicas, para mais informações: Composite over inheritance, Composition vs InheritancePara mais informações Types e Constructors"
},

{
    "location": "julia/julia/#Módulos-1",
    "page": "Julia",
    "title": "Módulos",
    "category": "section",
    "text": "Agora imagine que exista um módulo que trate unicamente de retângulos Rect, vamos assumir que este módulos possua apenas uma função, calcular a área da figura geométrica. Um módulo pode ter muitas variantes mas segue uma estrutura base, um módulo em geral possui tipos específicos, funções específicas e deve exportar as funções que os usuários do módulo podem utilizarConsidere o seguinte módulomodule Rect\n\nexport Rectangle, area  # Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Rectangle\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"\n    Rectangle(base::Float64, height::Float64)\n\nConstrutor do tipo Rectangle\n\"\"\"\nfunction Rectangle(base::Float64, height::Float64)\n    Rectangle(\"base*height\", base, height)\nend\n\n\"\"\"\n    area(rectangle::Rectangle)\n\nCalcula a área de um retângulo declarado como Rectangle\n\"\"\"\nfunction area(rectangle::Rectangle)\n    return (rectangle.base)*(rectangle.height)\nend\n\nend # end moduleAnalogamentemodule Triang\n\nexport Triangle, area   # Métodos visiveis pelo usuário que fez using Triang\n\nmutable struct Triangle\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"\n    Triangle(base::Float64, height::Float64)\n\nConstrutor do tipo Triangle\n\"\"\"\nfunction Triangle(base::Float64, height::Float64)\n    Triangle(\"(base*height)/2\", base, height)\nend\n\n\"\"\"\n    area(triangle::Triangle)\n\nCalcula a área de um triângulo declarado como Triangle\n\"\"\"\nfunction area(triangle::Triangle)\n    return (triangle.base)*(triangle.height)/2\nend\n\nend # end modulePara mais informações Modules"
},

{
    "location": "julia/julia/#Interface-Comum-1",
    "page": "Julia",
    "title": "Interface Comum",
    "category": "section",
    "text": "Agora gostaríamos de criar uma interface que permitisse o cálculo da área de qualquer figura geométrica e a informação da fórmula da área, o único requisito para poder calcular tal área é que alguém tenha criado um módulo para a tal figura geométrica com a função específica para calcular a área.Alguns exemplos clássicos de módulos que funcionam como interface comum seriam JuMP e Plots. Esses módulos reunem uma série de funções básicas que podem ser realizadas de formas diferentes, um exemplo fácil é a função optimize!, podemos resolver um problema de programação linear usando solvers diferentes como Clp e GurobiA interface seria o módulo Shapemodule Shape\n\nexport area, printformula, GeometricShape\n\nabstract type GeometricShape end\n\n\"\"\"\n    area(shape::GeometricShape)\n\nCalcula a área de uma figura geométrica do tipo GeometricShape\n\"\"\"\nfunction area(shape::GeometricShape)\n     error(\"function not defined for $(typeof(shape))\")\nend\n\n\"\"\"\n    printformula(shape::GeometricShape)\n\nEscreve a fórmula da área de uma figura geométrica do tipo GeometricShape\n\"\"\"\nfunction printformula(shape::GeometricShape)\n    print(shape.formula)\nend\n\nend # end moduleAgora dado que existe esse módulo de interface comum qualquer desenvolvedor poderá criar módulos independentes que se aproveitam da estrutura do Shape. Podemos integrar o módulo Rect e Triang como no exemplo abaixomodule Rect\n\nusing Shape             # Necessário para poder usar a interface comum\n\nexport Rectangle, area  # Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Rectangle <: GeometricShape # GeometricShape foi definido pelo módulo Shape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"\n    Rectangle(base::Float64, height::Float64)\n\nConstrutor do tipo Rectangle\n\"\"\"\nfunction Rectangle(base::Float64, height::Float64)\n    Rectangle(\"base*height\", base, height)\nend\n\nfunction Shape.area(rectangle::Rectangle)\n    return (rectangle.base)*(rectangle.height)\nend\n\nend # end modulemodule Triang\n\nusing Shape             # Necessário para poder usar a interface comum\n\nexport Triangle, area   # Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Triangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"\n    Triangle(base::Float64, height::Float64)\n\nConstrutor do tipo Triangle\n\"\"\"\nfunction Triangle(base::Float64, height::Float64)\n    Triangle(\"(base*height)/2\", base, height)\nend\n\nfunction Shape.area(triangle::Triangle)\n    return (triangle.base)*(triangle.height)/2\nend\n\nend # end moduleAgora podemos usar a função area para calcular areas de quaisquer Figuras Geométricas definidas assim como podemos descobrir a fórmula para o cálculo da áreausing Shape, Rect, Triang\n\ntriang = Triangle(1.0, 2.0)\nrect = Rectangle(1.0, 2.0)\n\narea(rect)\narea(triang)\n\nprintformula(triang)\nprintformula(rect)Você também pode atribuir funções que são contribuidasusar exemplo pessoa ou pensar em algo que faça sentido para shapeLinks úteis para se aprofundar Modular Algorithms for Scientific Computing in Julia"
},

{
    "location": "julia/julia/#Test-1",
    "page": "Julia",
    "title": "Test",
    "category": "section",
    "text": "O Julia tem uma biblioteca específica para realizar testes unitários, aqui estão alguns exemplos rápidos do uso da biblioteca. Vamos usar os pacotes ja usados como exemplo Rect e Triang. digamos que a título de teste unitário do módulo gostariamos de checar se as áreas estão sendo calculadas de forma correta. Nesse caso temos uma grande vantagem, as áreas são super fáceis de calcular analiticamente! :)using Test, Shape, Triang, Rect\n\nrect = Rectangle(1.0, 2.0)\ntriang = Triangle(1.0, 2.0)\n\narea(rect)    # Área = 2\narea(triang)  # Área = 1Para testa o código podemos usar a macro @test no mesmo arquivo adicionando @test area(rect) == 2\n@test area(triang) == 1Outra forma de fazer os testes seria agrupa-los em um @testset@testset \"Áreas de Figuras Geométricas\" begin\n    @test area(rect) == 2\n    @test area(triang) == 1\nendA vantagem de fazer os testes com @testset é que no final dos testes a macro mostra um resumo dos testes no consoleTest Summary:                | Pass  Total\nÁreas de Figuras Geométricas |    2      2para mais informações ver Unit Testing"
},

{
    "location": "julia/jump/#",
    "page": "JuMP",
    "title": "JuMP",
    "category": "page",
    "text": ""
},

{
    "location": "julia/jump/#JuMP-1",
    "page": "JuMP",
    "title": "JuMP",
    "category": "section",
    "text": "JuMP é a biblioteca que usamos para resolver os problemas de otimização que escrevemos com a ajuda de um computador, JuMP não é a única biblioteca que faz isso, e nem Julia é a única linguagem com esse tipo de biblioteca.Em Python: CVXPYExistem inclusve linguagens e softwares criados unica e exclusivamente para isso:GAMS\nAMPLA melhor forma de descobrir as ferramentas oferecidas pela biblioteca é pela documentação"
},

{
    "location": "julia/jump/#Exemplo-da-produção-de-armários-e-berços-1",
    "page": "JuMP",
    "title": "Exemplo da produção de armários e berços",
    "category": "section",
    "text": "Usaremos esse exemplo para mostrar as ferramentas básicas do JuMP,beginalign\n\nmax_x geq 0  sum 4x_1 + 3x_2\n\nmboxsa   nonumber \n 2x_1 + x_2 leq 4 \n x_1 + 2x_2 leq 4 \n\nendalignPara escrever o problema no JuMP deveremos usar as macros (funções que tem @ na frente) para definir variáveis (@variables), restrições (@constraint) e a função objetivo (@objective)using Julia, Clp\n\nmodeloProd = Model(solver = ClpSolver()) # Cria ma variável modeloProd onde podemos escrevr variáveis, restrições, qual solver usar etc.\n\n@variable(modeloProd, x[i = 1:2] >= 0) # Definimos que em modeloProd existe uma variável x com duas entradas maiores que 0\n\n# Definimos que em modeloProd existem restrições \n@constraint(modeloProd, 2*x[1] + x[2] <= 4)\n@constraint(modeloProd, x[1] + 2*x[2] <= 4)\n\n# Definimos que em modeloProd existe uma função objetivo\n@objective(modeloProd, Max, 4*x[1] + 3*x[2])"
},

]}
