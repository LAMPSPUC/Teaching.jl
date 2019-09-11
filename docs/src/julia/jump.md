# JuMP

JuMP é a biblioteca que usamos para resolver os problemas de otimização que escrevemos com a ajuda de um computador, JuMP não é a única biblioteca que faz isso, e nem Julia é a única linguagem com esse tipo de biblioteca.

* Em Python: [CVXPY](https://www.cvxpy.org/)

Existem inclusve linguagens e softwares criados unica e exclusivamente para isso:

* [GAMS](https://www.gams.com/)
* [AMPL](https://ampl.com/)

A melhor forma de descobrir as ferramentas oferecidas pela biblioteca é pela [documentação](http://www.juliaopt.org/JuMP.jl/stable/)

## Basic Example

### Formulation

Usaremos o exemplo da produção de berços e armários para mostrar as ferramentas básicas do JuMP,
o modelo pode ser formulado da seguinte forma:

```math
\begin{align}
%
\max_{x \geq 0} & 4x_1 + 3x_2\\
%
\mbox{s.a.: } & \nonumber \\
& 2x_1 + x_2 \leq 4 \\
& x_1 + 2x_2 \leq 4 \\
%
\end{align}
```

### Criando e resolvendo o modelo

Para escrever o problema no JuMP deveremos usar as macros (funções que tem @ na frente) para definir variáveis (@variables), restrições (@constraint) e a função objetivo (@objective)

```julia
using JuMP, GLPK

model = Model(with_optimizer(GLPK.Optimizer))

@variable(model, x[i = 1:2] >= 0)

@constraint(model, armarios, 2*x[1] + x[2] <= 4)
@constraint(model, bercos, x[1] + 2*x[2] <= 4)

@objective(model, Max, 4*x[1] + 3*x[2])

JuMP.optimize!(model) 

JuMP.value.(x) 
JuMP.objective_value(model) 
```