# Julia



## Tipos
Para realizar a modelagem de tipos dentro dos módulos é necessário ter uma estrutra de dados em mente, o que não é óbvio. Independente da estrutura de dados escolhida usamos tipos abstratos e tipos compósitos. Como exemplo de estrutura de dados para exemplificar a modelagem vamos modelar formas geométricas.
Como existem muitas formas geométricas poderíamos dizer que formas geométricas são de certa forma um conceito abstrato, o que encaixa perfeitamente na modelização por tipo abstrato
```julia
abstract type GeometricShape end
``` 
Apesar de existirem infinitas formas geométricas vemos todos os dias retângulos e triângulos que podem ser concretamente modeladas. Para fazer a modelagem de retângulos precisamos saber quais são as especificações dos retângulos, no caso altura e largura. Poderíamos dizer que base e altura definem, compõem um retângulo e aqui identificamos que um retângulo pode ser modelado por um tipo compósito. Um argumento a mais possível para os retângulos seria uma string que diz a fórmula da sua área
```julia
mutable struct Rectangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end
``` 
Analogamente os triângulos são definidos por base e altura
```julia
mutable struct Triangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end
```
Ao declarar um tipo automaticamente um construtor é criado, ou seja, foi criada uma função para construir um retângulo e um triângulo, declarando de forma simples 
```julia
rect = Rectangle("base*height", 1.0, 2.0)
triang = Triangle("(base*height)/2", 1.0, 2.0)
```
criamos uma variável rect do tipo Rectangle e uma variável tring do tipo Triangle.

Como a fórmula para calcular a área de uma figura nunca muda poderíamos criar um novo construtor que ao receber os parâmetros base e height preenche automaticamente a fórmula tanto para triângulos quanto para retângulos
```julia
function Rectangle(base::Float64, height::Float64)
    Rectangle("base*height", base, height)
end

function Triangle(base::Float64, height::Float64)
    Triangle("(base*height)/2", base, height)
end
```
Agora podemos construir retângulos e triângulos declarando apenas as suas dimensões
```julia
rect = Rectangle(1.0, 2.0)
triang = Triangle(1.0, 2.0)
```

Tipos compósitos podem herdar métodos de bibliotecas específicas, para mais informações: [Composite over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance), [Composition vs Inheritance](https://www.youtube.com/watch?v=dYUZiJEy0JE)

Para mais informações [Types](https://docs.julialang.org/en/v0.6.1/manual/types/#) e [Constructors](https://docs.julialang.org/en/v0.6.1/manual/constructors/)

## Módulos
Agora imagine que exista um módulo que trate unicamente de retângulos ```Rect```, vamos assumir que este módulos possua apenas uma função, calcular a área da figura geométrica.
Um módulo pode ter muitas variantes mas segue uma estrutura base, um módulo em geral possui tipos específicos, funções específicas e deve exportar as funções que os usuários do módulo podem utilizar

Considere o seguinte módulo

```julia
module Rect

using Shape             #Necessário para poder usar a interface comum

export Rectangle, area  #Métodos visiveis pelo usuário que fez using Rect

mutable struct Rectangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end

"""Construtor do tipo Rectangle"""
function Rectangle(base::Float64, height::Float64)
    Rectangle("base*height", base, height)
end

"""Calcula a área de um retângulo declarado como Rectangle"""
function area(rectangle::Rectangle)
    return (rectangle.base)*(rectangle.height)
end

end #end module
```
Analogamente
```julia
module Triang

using Shape             #Necessário para poder usar a interface comum

export Triangle, area   #Métodos visiveis pelo usuário que fez using Rect

mutable struct Triangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end

"""Construtor do tipo Triangle"""
function Triangle(base::Float64, height::Float64)
    Triangle("(base*height)/2", base, height)
end

"""Calcula a área de um triângulo declarado como Triangle"""
function area(triangle::Triangle)
    return (triangle.base)*(triangle.height)/2
end

end #end module
```

Para mais informações [Modules](https://docs.julialang.org/en/v0.6.1/manual/modules/)


## Interface Comum
Agora gostaríamos de criar uma interface que permitisse o cálculo da área de qualquer figura geométrica e a informação da fórmula da área, o único requisito para poder calcular tal área é que **alguém** tenha criado um módulo para a tal figura geométrica com a função específica para calcular a área.

Alguns exemplos clássicos de módulos que funcionam como interface comum seriam ```JuMP``` e ```Plots```. Esses módulos reunem uma série de funções básicas que podem ser realizadas de formas diferentes, um exemplo fácil é a função ```solve```, podemos resolver um problema de programação linear usando solvers diferentes como ```Clp``` e ```Gurobi```

A interface seria o módulo Shape
```julia
module Shape

export area, printformula, GeometricShape

abstract type GeometricShape end

"""Calcula a área de uma figura geométrica do tipo GeometricShape"""
function area(shape::GeometricShape)
     error("function not defined for $(typeof(shape))")
end

"""Escreve a fórmula da área de uma figura geométrica do tipo GeometricShape"""
function printformula(shape::GeometricShape)
    print(shape.formula)
end

end #end module
```

Agora dado que existe esse módulo de interface comum qualquer desenvolvedor poderá criar módulos independentes que se aproveitam da estrutura do Shape.
Podemos integrar o módulo Rect e Triang como no exemplo abaixo

```julia
module Rect

using Shape             #Necessário para poder usar a interface comum

export Rectangle, area  #Métodos visiveis pelo usuário que fez using Rect

mutable struct Rectangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end

"""Construtor do tipo Rectangle"""
function Rectangle(base::Float64, height::Float64)
    Rectangle("base*height", base, height)
end

"""Calcula a área de um retângulo declarado como Rectangle"""
function Shape.area(rectangle::Rectangle)
    return (rectangle.base)*(rectangle.height)
end

end #end module
```

```julia
module Triang

using Shape             #Necessário para poder usar a interface comum

export Triangle, area   #Métodos visiveis pelo usuário que fez using Rect

mutable struct Triangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end

"""Construtor do tipo Triangle"""
function Triangle(base::Float64, height::Float64)
    Triangle("(base*height)/2", base, height)
end

"""Calcula a área de um triângulo declarado como Triangle"""
function Shape.area(triangle::Triangle)
    return (triangle.base)*(triangle.height)/2
end

end #end module
```


Agora podemos usar a função area para calcular areas de quaisquer Figuras Geométricas definidas assim como podemos descobrir a fórmula para o cálculo da área
```julia
using Shape, Rect, Triang

triang = Triangle(1.0, 2.0)
rect = Rectangle(1.0, 2.0)

area(rect)
area(triang)

printformula(triang)
printformula(rect)
```

Você também pode atribuir funções que são contribuidas


usar exemplo pessoa ou pensar em algo que faça sentido para shape



Links úteis para se aprofundar [Modular Algorithms for Scientific Computing in Julia](http://www.stochasticlifestyle.com/modular-algorithms-scientific-computing-julia/)

## Base.Test
O Julia tem uma biblioteca específica para realizar testes unitários, aqui estão alguns exemplos rápidos do uso da biblioteca. Vamos usar os pacotes ja usados como exemplo ```Rect``` e ```Triang```.
digamos que a título de teste unitário do módulo gostariamos de checar se as áreas estão sendo calculadas de forma correta. Nesse caso temos uma grande vantagem, as áreas são super fáceis de calcular analiticamente! :)
```julia
using Base.Test, Shape, Triang, Rect

rect = Rectangle(1.0, 2.0)
triang = Triangle(1.0, 2.0)

area(rect)    #Área = 2
area(triang)  #Área = 1
```
Para testa o código podemos usar a macro ```@test``` no mesmo arquivo adicionando 
```julia
@test area(rect) == 2
@test area(triang) == 1
```
Outra forma de fazer os testes seria agrupa-los em um ```@testset```
```julia
@testset "Áreas de Figuras Geométricas" begin
    @test area(rect) == 2
    @test area(triang) == 1
end
```
A vantagem de fazer os testes com ```@testset``` é que no final dos testes a macro mostra um resumo dos testes no console
```
Test Summary:                | Pass  Total
Áreas de Figuras Geométricas |    2      2
```



para mais informações ver [Unit Tests](https://docs.julialang.org/en/v0.6.1/stdlib/test/)
