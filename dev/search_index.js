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
    "text": ""
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
    "text": "Agora imagine que exista um módulo que trate unicamente de retângulos Rect, vamos assumir que este módulos possua apenas uma função, calcular a área da figura geométrica. Um módulo pode ter muitas variantes mas segue uma estrutura base, um módulo em geral possui tipos específicos, funções específicas e deve exportar as funções que os usuários do módulo podem utilizarConsidere o seguinte módulomodule Rect\n\nusing Shape             #Necessário para poder usar a interface comum\n\nexport Rectangle, area  #Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Rectangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"Construtor do tipo Rectangle\"\"\"\nfunction Rectangle(base::Float64, height::Float64)\n    Rectangle(\"base*height\", base, height)\nend\n\n\"\"\"Calcula a área de um retângulo declarado como Rectangle\"\"\"\nfunction area(rectangle::Rectangle)\n    return (rectangle.base)*(rectangle.height)\nend\n\nend #end moduleAnalogamentemodule Triang\n\nusing Shape             #Necessário para poder usar a interface comum\n\nexport Triangle, area   #Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Triangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"Construtor do tipo Triangle\"\"\"\nfunction Triangle(base::Float64, height::Float64)\n    Triangle(\"(base*height)/2\", base, height)\nend\n\n\"\"\"Calcula a área de um triângulo declarado como Triangle\"\"\"\nfunction area(triangle::Triangle)\n    return (triangle.base)*(triangle.height)/2\nend\n\nend #end modulePara mais informações Modules"
},

{
    "location": "julia/julia/#Interface-Comum-1",
    "page": "Julia",
    "title": "Interface Comum",
    "category": "section",
    "text": "Agora gostaríamos de criar uma interface que permitisse o cálculo da área de qualquer figura geométrica e a informação da fórmula da área, o único requisito para poder calcular tal área é que alguém tenha criado um módulo para a tal figura geométrica com a função específica para calcular a área.Alguns exemplos clássicos de módulos que funcionam como interface comum seriam JuMP e Plots. Esses módulos reunem uma série de funções básicas que podem ser realizadas de formas diferentes, um exemplo fácil é a função solve, podemos resolver um problema de programação linear usando solvers diferentes como Clp e GurobiA interface seria o módulo Shapemodule Shape\n\nexport area, printformula, GeometricShape\n\nabstract type GeometricShape end\n\n\"\"\"Calcula a área de uma figura geométrica do tipo GeometricShape\"\"\"\nfunction area(shape::GeometricShape)\n     error(\"function not defined for $(typeof(shape))\")\nend\n\n\"\"\"Escreve a fórmula da área de uma figura geométrica do tipo GeometricShape\"\"\"\nfunction printformula(shape::GeometricShape)\n    print(shape.formula)\nend\n\nend #end moduleAgora dado que existe esse módulo de interface comum qualquer desenvolvedor poderá criar módulos independentes que se aproveitam da estrutura do Shape. Podemos integrar o módulo Rect e Triang como no exemplo abaixomodule Rect\n\nusing Shape             #Necessário para poder usar a interface comum\n\nexport Rectangle, area  #Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Rectangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"Construtor do tipo Rectangle\"\"\"\nfunction Rectangle(base::Float64, height::Float64)\n    Rectangle(\"base*height\", base, height)\nend\n\n\"\"\"Calcula a área de um retângulo declarado como Rectangle\"\"\"\nfunction Shape.area(rectangle::Rectangle)\n    return (rectangle.base)*(rectangle.height)\nend\n\nend #end modulemodule Triang\n\nusing Shape             #Necessário para poder usar a interface comum\n\nexport Triangle, area   #Métodos visiveis pelo usuário que fez using Rect\n\nmutable struct Triangle <: GeometricShape\n    formula::String\n    base::Float64\n    height::Float64\nend\n\n\"\"\"Construtor do tipo Triangle\"\"\"\nfunction Triangle(base::Float64, height::Float64)\n    Triangle(\"(base*height)/2\", base, height)\nend\n\n\"\"\"Calcula a área de um triângulo declarado como Triangle\"\"\"\nfunction Shape.area(triangle::Triangle)\n    return (triangle.base)*(triangle.height)/2\nend\n\nend #end moduleAgora podemos usar a função area para calcular areas de quaisquer Figuras Geométricas definidas assim como podemos descobrir a fórmula para o cálculo da áreausing Shape, Rect, Triang\n\ntriang = Triangle(1.0, 2.0)\nrect = Rectangle(1.0, 2.0)\n\narea(rect)\narea(triang)\n\nprintformula(triang)\nprintformula(rect)Você também pode atribuir funções que são contribuidasusar exemplo pessoa ou pensar em algo que faça sentido para shapeLinks úteis para se aprofundar Modular Algorithms for Scientific Computing in Julia"
},

{
    "location": "julia/julia/#Base.Test-1",
    "page": "Julia",
    "title": "Base.Test",
    "category": "section",
    "text": "O Julia tem uma biblioteca específica para realizar testes unitários, aqui estão alguns exemplos rápidos do uso da biblioteca. Vamos usar os pacotes ja usados como exemplo Rect e Triang. digamos que a título de teste unitário do módulo gostariamos de checar se as áreas estão sendo calculadas de forma correta. Nesse caso temos uma grande vantagem, as áreas são super fáceis de calcular analiticamente! :)using Base.Test, Shape, Triang, Rect\n\nrect = Rectangle(1.0, 2.0)\ntriang = Triangle(1.0, 2.0)\n\narea(rect)    #Área = 2\narea(triang)  #Área = 1Para testa o código podemos usar a macro @test no mesmo arquivo adicionando @test area(rect) == 2\n@test area(triang) == 1Outra forma de fazer os testes seria agrupa-los em um @testset@testset \"Áreas de Figuras Geométricas\" begin\n    @test area(rect) == 2\n    @test area(triang) == 1\nendA vantagem de fazer os testes com @testset é que no final dos testes a macro mostra um resumo dos testes no consoleTest Summary:                | Pass  Total\nÁreas de Figuras Geométricas |    2      2para mais informações ver Unit Tests"
},

]}
