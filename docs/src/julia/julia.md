# Julia

[Julia Documentation](https://docs.julialang.org/en/v1.0/)

Useful links: 

* [Julia Learning](https://julialang.org/learning/)
* [Julia no youtube](https://www.youtube.com/channel/UC9IuUwwE2xdjQUT_LMLONoA)
* [Programação em Julia 2017.1(Julia 0.6)](https://www.dropbox.com/sh/36cw2h49n39ilga/AADCTNPmPNkkrN3FCCfPAH8ga?dl=0)
* [Programação em Julia 2019.2(Julia 1.0)](https://goo.gl/Hgwiwm)


## Installation

To install Julia just follow the steps on this [link] (https://julialang.org/downloads/)

We recommend downloading version 1.0.3 (Long-term support release)

## IDEs

Once Julia is installed on your computer you will need an Integrated Development Environment (IDE) to unpack your code. The most common ones are:

* [Atom] (https://atom.io/)
* [Vscode] (https://code.visualstudio.com/)

Choose one and stay with it until you feel loose to create projects and run the codes.

## Help

A helpful shortcut to understanding the use of a function is the terminal help. Imagine that for your application you need the `findmin` function but do not know how to use it. When typing `?` into a  Julia terminal, it should become a Julia help terminal. Now we can enter the name of the function to understand its use

```Julia
help?> findmin

search: findmin findmin! findmax findmax!

  findmin(itr) -> (x, index)

  Return the minimum element of the collection itr and its index. If there are
  multiple minimal elements, then the first one will be returned. If any data
  element is NaN, this element is returned. The result is in line with min.

  The collection must not be empty.

  Examples
  ≡≡≡≡≡≡≡≡≡≡

  Julia> findmin([8,0.1,-9,pi])
  (-9.0, 3)
  
  Julia> findmin([7,1,1,6])
  (1, 2)
  
  Julia> findmin([7,1,1,NaN])
  (NaN, 4)

  ────────────────────────────────────────────────────────────────────────────

  findmin(A; dims) -> (minval, index)

  For an array input, returns the value and index of the minimum over the
  given dimensions. NaN is treated as less than all other values.

  Examples
  ≡≡≡≡≡≡≡≡≡≡

  Julia> A = [1.0 2; 3 4]
  2×2 Array{Float64,2}:
   1.0  2.0
   3.0  4.0
  
  Julia> findmin(A, dims=1)
  ([1.0 2.0], CartesianIndex{2}[CartesianIndex(1, 1) CartesianIndex(1, 2)])
  
  Julia> findmin(A, dims=2)
  ([1.0; 3.0], CartesianIndex{2}[CartesianIndex(1, 1); CartesianIndex(2, 1)])
```

## Functions

## Types
To perform type modeling within the modules it is necessary to have a data structure in mind, which is not obvious. Regardless of the chosen data structure, we should use abstract and composite types. As an example of a data structure to exemplify modeling let us model geometric shapes.
As there are many geometric shapes we could say that geometric shapes are in some way an abstract concept, which fits perfectly in the modelization by an abstract type.
```Julia
abstract type GeometricShape end
``` 
Although there are lots of geometric shapes we see rectangles and triangles that can be concretely modeled every day. To do the modeling of rectangles we need to know what are the specifications of the rectangles, we consider height and width and its area formula as a string. Our composite type is:
```Julia
mutable struct Rectangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end
``` 
Analogously the triangles are defined by the base, the height, and the formula
```Julia
mutable struct Triangle <: GeometricShape
    formula::String
    base::Float64
    height::Float64
end
```

When declaring a type automatically a constructor is created, that is, a function was created to construct a rectangle and a triangle, stating simply
```Julia
rect = Rectangle("base*height", 1.0, 2.0)
triang = Triangle("(base*height)/2", 1.0, 2.0)
```
Since the formula for calculating the area of ​​a figure never changes we could create a new constructor which, upon receiving the base and height parameters, automatically fills the formula for both triangles and rectangles
```Julia
function Rectangle(base::Float64, height::Float64)
    Rectangle("base*height", base, height)
end

function Triangle(base::Float64, height::Float64)
    Triangle("(base*height)/2", base, height)
end
```
Now we can build this geometric shapes only providing base and height
```Julia
rect = Rectangle(1.0, 2.0)
triang = Triangle(1.0, 2.0)
```

For more information [Types](https://docs.julialang.org/en/v1.0/manual/types/) e [Constructors](https://docs.julialang.org/en/v1.0/manual/constructors/)

## Modules

Now imagine that there is a module that deals only with rectangles, let's assume that this module has only one function calculate the area of ​​the geometric figure. A module can have many variants but follows a basic structure.

```Julia
module Rect

export Rectangle, area  # Functions that users can access when running `using Rect`

mutable struct Rectangle
    formula::String
    base::Float64
    height::Float64
end

"""
    Rectangle(base::Float64, height::Float64)

Constructor of the Rectangle type
"""
function Rectangle(base::Float64, height::Float64)
    Rectangle("base*height", base, height)
end

"""
    area(rectangle::Rectangle)

Calculates the area of ​​a `Rectangle`
"""
function area(rectangle::Rectangle)
    return (rectangle.base)*(rectangle.height)
end

end # end module
```
Another one for triangles
```Julia
module Triang

export Triangle, area   # Functions that users can access when running `using Triang`

mutable struct Triangle
    formula::String
    base::Float64
    height::Float64
end

"""
    Triangle(base::Float64, height::Float64)

Constructor of the Triangle type
"""
function Triangle(base::Float64, height::Float64)
    Triangle("(base*height)/2", base, height)
end

"""
    area(triangle::Triangle)

Calculates the area of ​​a `Triangle`
"""
function area(triangle::Triangle)
    return (triangle.base)*(triangle.height)/2
end

end # end module
```

TODO teach how to use the module that was built

For more information [Modules](https://docs.julialang.org/en/v1.0/manual/modules/) - 
[Example](https://github.com/JuliaLang/Example.jl)

## Test

Julia has a specific library for unit testing, here are some quick examples of using the library. We will use the packages already used as examples `` `Rect``` and` `` Triang``.
let's say that as a unit test of the module we would like to check if the areas are being calculated correctly. In this case, we have a great advantage, the areas are super easy to calculate analytically! 
```Julia
using Test, Triang, Rect

rect = Rectangle(1.0, 2.0)
triang = Triangle(1.0, 2.0)

area(rect)    # area = 2
area(triang)  # area = 1
```
To test the code we can use the `` `@ test``` macro in the same file by adding
```Julia
@test area(rect) == 2
@test area(triang) == 1
```
Another way to do the tests would be to group them into a `` `@ testset```
```Julia
@testset "Áreas de Figuras Geométricas" begin
    @test area(rect) == 2
    @test area(triang) == 1
end
```

The advantage of doing tests with `` `@ testset``` is that at the end of the tests the macro shows a summary of the tests in the console
```
Test Summary:                | Pass  Total
Áreas de Figuras Geométricas |    2      2
```

For more information [Unit Testing](https://docs.julialang.org/en/v1.0/stdlib/Test/)
