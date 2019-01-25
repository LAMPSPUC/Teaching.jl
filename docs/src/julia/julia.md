# Julia

Julia is cool

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
