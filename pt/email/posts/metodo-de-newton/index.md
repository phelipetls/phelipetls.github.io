# [Método de Newton](https://phelipetls.github.io/pt/posts/metodo-de-newton/)

March 17, 2019 · 11 min. read time

---

<p>O Método de Newton é um conhecido algoritmo para chegar a soluções númericas de
uma equação, normalmente uma para a qual a solução não é tão trivial. Por
exemplo, imagine que queiramos encontrar encontrar a raiz da função quadrática
\( x = \sqrt{5} \Rightarrow x^2 = 5 \Rightarrow x^2 - 5 = 0 \). Como
poderíamos fazer isso?</p>
<p>Newton criou um método (verdadeiramente um algoritmo) extraordinariamente
eficiente para chegar à solução, em que se faz uso de seus estudos em cálculo
diferencial.</p>
<p>Calcular \( \sqrt{5} \), hoje em dia, é trivial, basta qualquer calculadora.
Mas, como será que a calculadora faz esse cálculo? Talvez seja esse o algoritmo
que ela mesma usa. Vamos entender como isso funciona então.</p>
<p>Para melhor entendimento do problema, vejamos o gráfico da função antes.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">matplotlib</span> <span class="n">inline</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">seaborn</span> <span class="k">as</span> <span class="nn">sns</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>

<span class="n">sns</span><span class="o">.</span><span class="n">set</span><span class="p">()</span>

<span class="k">def</span> <span class="nf">f</span><span class="p">(</span><span class="n">x</span><span class="p">):</span> <span class="k">return</span> <span class="n">x</span><span class="o">**</span><span class="mi">2</span> <span class="o">-</span> <span class="mi">5</span>
<span class="n">X</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">500</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">f</span><span class="p">(</span><span class="n">X</span><span class="p">))</span>
</code></pre></div><p><img src="./output_1_1.png" alt="png"></p>
<p>Podemos verificar que ela intercepta o eixo x quando \( x \) é um pouquinho
acima de 2, quer dizer, quando \( x = \sqrt{5} \approx 2.23 \).</p>
<p>Ok, mas como chegamos até ali com cálculo diferencial? O raciocínio é como
segue: vamos fazer uma estimativa inicial, um valor que achamos que seja próximo
da solução. Por exemplo, 1.</p>
<p>Com esse valor, a ideia é obter a reta tangente àquele ponto, o que é algo muito
mais fácil de lidar. E, para isso, é claro que precisamos calcular \( f^{'}(1)
\), a inclinação dessa reta naquele ponto.</p>
<p>E, com ela em mãos, queremos achar onde <em>essa reta</em> intercepta o eixo x, e este
deve ser um ponto mais próximo da raiz, mas não exatamente a raiz. Isto porque
estamos calculando a raiz de uma reta pra nos aproximarmos da raiz de uma
parábola, que não é linear, é claro.</p>
<p><img src="./newtonraphson1.png" alt="Img"></p>
<p>Até então, o método não parece tão impressionante. Mas e se fizermos isso de
novo, usando como estimativa a raiz dessa reta? Acontece que se repetirmos esse
processo algumas vezes mais podemos chegar numa estimativa <em>muito</em> próxima da
solução.</p>
<h1>
  Aproximação Linear
</h1>
<p>Esse uso da reta tangente é o que se conhece por aproximação linear. Por
exemplo, retomando a função quadrática. A derivada dela é obtida pela regra da
potência, \( \frac{d(x^2)}{dx} = 2x \). Já a equação da tangente é obtida
simplesmente da equação de uma reta:</p>
<p>$$
\Delta y = f'(x)\Delta x \ (y - y_0) = f'(x_0)(x - x_0) \ y =
y_0 + m(x - x_0)
$$</p>
<p>No nosso caso, queremos achar a reta tangente quando \( x_0 = 1 \), sendo \(
f(x_0) = x^2 - 5 = 1 - 5 = -4 \). Logo, a reta que tangencia o ponto \( (1,
-4) \) é:</p>
<p>$$
y = y_0 + 2x(x - x_0) \ y = -4 + 2\cdot 1(x - 1) \ y = -4 + 2x
-2 \ y = 2x - 6
$$</p>
<p>Mas, é crucial perceber que essa é a <em>equação da reta tangente ao ponto \(
(x_0, y_0) \) da função f(x)</em>. Então, o que realmente podemos alegar é que,
para um dado número \( a \), o valor de \( f(a) \approx y(a) \), quando \(
a \approx x_0 \): a reta tangente a um dado ponto de uma função é muito próxima
da própria função para valores não muito distantes do ponto.</p>
<p>$$
f(a) \approx y_0 + m(a - x_0)
$$</p>
<p>No gráfico abaixo isso pode ser melhor visualizado. Perceba que para valores
próximos de 1, a reta tangente está bem próxima da parábola, mas vai ficando
cada vez mais distante quando x se afasta de 1. E é esse o sentido de uma
aproximação linear.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">tang</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="k">return</span> <span class="mi">2</span> <span class="o">*</span> <span class="n">x</span> <span class="o">-</span> <span class="mi">6</span>


<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">f</span><span class="p">(</span><span class="n">X</span><span class="p">),</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$x^2 - 5$&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">tang</span><span class="p">(</span><span class="n">X</span><span class="p">),</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$2x - 6$&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="p">,</span> <span class="mf">3.5</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
</code></pre></div><p><img src="./output_3_1.png" alt="png"></p>
<p>Nesse zoom, também podemos ver que a reta tangente ao ponto \( (1, -4) \)
cruza o eixo \( x \) um pouco mais adiante de \( 2.23 \). Mais
especificamente, quando \( 2x - 6 = 0 \Rightarrow 2x = 6 \Rightarrow x = 3 \).</p>
<p>O que é um pouco mais próximo da raiz do que a estimativa inicial 1. E é
exatamente nisso que consiste o Método de Newton, em se aproximar cada vez mais
da raiz de \( f(x) \) usando a reta que tangencia um dado ponto desta função.</p>
<p>Assim, nosso objetivo fica melhor delineado dessa forma: queremos sempre o valor
de \( x \) da reta tangente a um ponto \( (x_0, y_0) \) que faz com que \(
y = 0 \):</p>
<p>$$
y - y_0 = m(x - x_0) \text{ dividindo tudo por m e sumindo com o y: } \newline
\frac{y_0}{m} = x - x_0 \Rightarrow x = x_0 - \frac{y_0}{m} \newline
\text{ o que também pode ser escrito como: } \newline
x = x_0 - \frac{f(x_0)}{f'(x_0)} \Rightarrow x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} \newline
$$</p>
<p>Plugando os valores de nossa estimativa inicial, obtemos:</p>
<p>$$
x = 1 - \frac{1^2 - 5}{2\cdot1} = 1 - \frac{-4}{2} = 1 - (-2) = 3
$$</p>
<p>E a ideia é usarmos o 3 como um novo \( x_0 \), e com ele calcularmos uma nova
estimativa para a raiz com a reta que tangencia \( (3, 4) \).</p>
<p>$$
x = 3 - \frac{3^2 - 5}{2\cdot3} = 3 - \frac{4}{6} = 3 - \frac{2}{3} \approx 2.333
$$</p>
<p>O que já é uma ótima aproximação de \( \sqrt{5} \). Abaixo um gráfico do que
mais ou menos aconteceu. A função laranja é a tangente ao ponto \( (1, -4) \),
e a verde ao ponto \( (3, 4) \). Veja como o intercepto-x da tangente a este
último ponto é próximo da raiz da parábola.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">f</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span> <span class="o">-</span> <span class="mi">5</span>


<span class="k">def</span> <span class="nf">tangente_um</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="k">return</span> <span class="mi">2</span> <span class="o">*</span> <span class="n">x</span> <span class="o">-</span> <span class="mi">6</span>


<span class="k">def</span> <span class="nf">tangente_dois</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="k">return</span> <span class="mi">6</span> <span class="o">*</span> <span class="n">x</span> <span class="o">-</span> <span class="mi">14</span>


<span class="n">X</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">f</span><span class="p">(</span><span class="n">X</span><span class="p">),</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$x^2 - 5$&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">tangente_um</span><span class="p">(</span><span class="n">X</span><span class="p">),</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$2x - 6$&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">tangente_dois</span><span class="p">(</span><span class="n">X</span><span class="p">),</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$6x - 14$&#34;</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">hlines</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">,</span> <span class="s2">&#34;grey&#34;</span><span class="p">,</span> <span class="s2">&#34;dashed&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">vlines</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="o">-</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="s2">&#34;grey&#34;</span><span class="p">,</span> <span class="s2">&#34;dashed&#34;</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">4</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
</code></pre></div><p><img src="./newton_visualization.png" alt="Image"></p>
<p>Seria interessante escrevermos uma função para fazer esses cálculos, e ela
inevitavelmente teria lidar com cálculo diferencial. Para isso, existe uma
biblioteca que pode nos ajudar.</p>
<h1>
  Introduzindo SymPy
</h1>
<p>Essa biblioteca fornece suporte para trabalhar com álgebra simbólica. Nela
contamos com funções para calcular limites, derivadas, integrais, expandir
polinômicos, simplificar expressões etc.</p>
<p>Por exemplo, se quisermos calcular a derivada da função \( x^2 - 5 \).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">from</span> <span class="nn">sympy</span> <span class="kn">import</span> <span class="n">symbols</span><span class="p">,</span> <span class="n">diff</span><span class="p">,</span> <span class="n">limit</span><span class="p">,</span> <span class="n">integrate</span><span class="p">,</span> <span class="n">oo</span>

<span class="n">x</span> <span class="o">=</span> <span class="n">symbols</span><span class="p">(</span><span class="s2">&#34;x&#34;</span><span class="p">)</span>

<span class="n">diff</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">2</span> <span class="o">-</span> <span class="mi">5</span><span class="p">)</span>
</code></pre></div><pre><code>2*x
</code></pre>
<p>Podemos também calcular limites, por exemplo \( \lim_{x \to \infty}
\frac{1}{x} = 0 \)</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">limit</span><span class="p">(</span><span class="mi">1</span> <span class="o">/</span> <span class="n">x</span><span class="p">,</span> <span class="n">x</span><span class="p">,</span> <span class="n">oo</span><span class="p">)</span>
</code></pre></div><pre tabindex="0"><code>0
</code></pre><p>Ou mesmo integrais indefinidas, \( \int x^2 , dx = \frac{x^3}{3} + c \)</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">integrate</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">2</span><span class="p">)</span>
</code></pre></div><pre><code>x**3/3
</code></pre>
<p>A função assim como está não serve para retornar qualquer valor, ela
praticamente só aceita funções do próprio SymPy. Para a utilizarmos como uma
função qualquer, devemos usar <code>lambdify()</code>. Para nossos objetivos, essa última e
a função diff serão suficientes.</p>
<h1>
  Um código para o algoritmo
</h1>
<p>Antes de apresentar a função em si, melhor explicar como eu a pensei.</p>
<p>Primeiramente, ela tomará três argumentos: a função, o valor para o qual
queremos uma solução, e a estimativa inicial. Por exemplo, no nosso caso, ela
tomaria os argumentos \( x^2 \), \( 5 \) e \( 1 \).</p>
<p>Em seguida, construirei simbolicamente, com estes argumentos, nossa \( f(x) \)
e sua derivada, \( f'(x) \). E com isso temos tudo que precisamos para
executarmos o método.</p>
<p>No algoritmo, decidi por 5 iterações, printando três colunas com os resultados a
cada iteração: a estimativa inicial, a nova estimativa e, por fim, a diferença
entre as duas, a fim de verificar como a cada iteração o valor de x se aproxima
mais do da raiz.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">from</span> <span class="nn">sympy.utilities.lambdify</span> <span class="kn">import</span> <span class="n">lambdify</span>


<span class="k">def</span> <span class="nf">newton</span><span class="p">(</span><span class="n">funcao</span><span class="p">,</span> <span class="n">numero</span><span class="p">,</span> <span class="n">estimativa</span><span class="p">):</span>
    <span class="n">f</span> <span class="o">=</span> <span class="n">lambdify</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">funcao</span> <span class="o">-</span> <span class="n">numero</span><span class="p">)</span>  <span class="c1"># x^2 - 5</span>
    <span class="n">df</span> <span class="o">=</span> <span class="n">lambdify</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">diff</span><span class="p">(</span><span class="n">funcao</span> <span class="o">-</span> <span class="n">numero</span><span class="p">))</span>  <span class="c1"># 2x</span>

    <span class="nb">print</span><span class="p">(</span><span class="s2">&#34;est.    | nova est. | diferença&#34;</span><span class="p">)</span>

    <span class="k">for</span> <span class="n">_</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">5</span><span class="p">):</span>
        <span class="n">nova_est</span> <span class="o">=</span> <span class="n">estimativa</span> <span class="o">-</span> <span class="n">f</span><span class="p">(</span><span class="n">estimativa</span><span class="p">)</span> <span class="o">/</span> <span class="n">df</span><span class="p">(</span><span class="n">estimativa</span><span class="p">)</span>
        <span class="nb">print</span><span class="p">(</span>
            <span class="sa">f</span><span class="s2">&#34;</span><span class="si">{</span><span class="n">estimativa</span><span class="si">:</span><span class="s2">.5f</span><span class="si">}</span><span class="s2"> | </span><span class="si">{</span><span class="n">nova_est</span><span class="si">:</span><span class="s2">^ 9.5f</span><span class="si">}</span><span class="s2"> | </span><span class="si">{</span><span class="nb">abs</span><span class="p">(</span><span class="n">nova_est</span> <span class="o">-</span> <span class="n">estimativa</span><span class="p">)</span><span class="si">:</span><span class="s2">.20f</span><span class="si">}</span><span class="s2">&#34;</span>
        <span class="p">)</span>
        <span class="n">estimativa</span> <span class="o">=</span> <span class="n">nova_est</span>

    <span class="k">return</span> <span class="n">estimativa</span>


<span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&#34;</span><span class="se">\n</span><span class="s2">O quanto erramos: </span><span class="si">{</span><span class="nb">abs</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span> <span class="o">-</span> <span class="n">newton</span><span class="p">(</span><span class="n">x</span><span class="o">**</span><span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">1</span><span class="p">))</span><span class="si">}</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
1.00000 |  3.00000  | 2.00000000000000000000
3.00000 |  2.33333  | 0.66666666666666651864
2.33333 |  2.23810  | 0.09523809523809534383
2.23810 |  2.23607  | 0.00202634245187471862
2.23607 |  2.23607  | 0.00000091814338532004

O quanto erramos: 1.8829382497642655e-13
</code></pre>
<p>E assim vemos que o erro foi desprezível.</p>
<p>A vantagem de usar o SymPy é que agora podemos estimar a raiz de qualquer tipo
de função. Por exemplo, a raiz cúbica de 5, ou algo mais complicado:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="nb">print</span><span class="p">(</span><span class="sa">f</span><span class="s2">&#34;</span><span class="se">\n</span><span class="s2">O quanto erramos: </span><span class="si">{</span><span class="nb">abs</span><span class="p">(</span><span class="mi">5</span><span class="o">**</span><span class="p">(</span><span class="mi">1</span><span class="o">/</span><span class="mi">3</span><span class="p">)</span> <span class="o">-</span> <span class="n">newton</span><span class="p">(</span><span class="n">x</span><span class="o">**</span><span class="mi">3</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">2</span><span class="p">))</span><span class="si">}</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
2.00000 |  1.75000  | 0.25000000000000000000
1.75000 |  1.71088  | 0.03911564625850338928
1.71088 |  1.70998  | 0.00090792482452184409
1.70998 |  1.70998  | 0.00000048224014181919
1.70998 |  1.70998  | 0.00000000000013589130

O quanto erramos: 2.220446049250313e-16
</code></pre>
<p>Uma das raízes para função \( x^4 + x^3 - x^2 - 5 \) deve ser:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">newton</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">4</span> <span class="o">+</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
1.00000 |  1.80000  | 0.80000000000000004441
1.80000 |  1.52529  | 0.27470795979353446192
1.52529 |  1.43509  | 0.09020236587892971336
1.43509 |  1.42600  | 0.00908943849525978287
1.42600 |  1.42591  | 0.00008681126625442737

1.4259134245660217
</code></pre>
<p>Se plotarmos seu gráfico, veremos que esse é um valor razoável. Uma raiz parece
estar entre 1 e 2, e foi a que achamos. E uma outra está muito próxima de -2.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">X</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>


<span class="k">def</span> <span class="nf">g</span><span class="p">(</span><span class="n">x</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">4</span> <span class="o">+</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span> <span class="o">-</span> <span class="mi">5</span>


<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">g</span><span class="p">(</span><span class="n">X</span><span class="p">))</span>
<span class="n">plt</span><span class="o">.</span><span class="n">hlines</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;grey&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-</span><span class="mf">7.5</span><span class="p">,</span> <span class="mi">5</span><span class="p">)</span>
</code></pre></div><p><img src="./output_17_1.png" alt="png"></p>
<p>Vamos tentar achar essa outra raiz com nossa função. Para isso, basta mudarmos
nossa estimativa inicial de forma a nos aproximarmos daquela outra raiz.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">newton</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">4</span> <span class="o">+</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="o">-</span><span class="mf">1.5</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
-1.50000 | -2.98333  | 1.48333333333333339255
-2.98333 | -2.45626  | 0.52707184463468736979
-2.45626 | -2.16542  | 0.29084549734551234934
-2.16542 | -2.06890  | 0.09651451804451394167
-2.06890 | -2.05885  | 0.01005450745933744727

-2.0588469658492823
</code></pre>
<h1>
  Limitações do método
</h1>
<p>Essa é uma função complicadinha e expõe algumas limitações do método que Newton
criou. Por exemplo, imagine que usemos como estimativa um valor próximo de um
mínimo, digamos que 0.5.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">newton</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">4</span> <span class="o">+</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span> <span class="o">**</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
0.50000 |  20.75000 | 20.25000000000000000000
20.75000 |  15.50807 | 5.24193178745838928023
15.50807 |  11.57934 | 3.92872823960125217013
11.57934 |  8.63653  | 2.94280653615018472635
8.63653 |  6.43473  | 2.20180035062548107305


6.434733086164693
</code></pre>
<p>O resultado foi bem catastrófico. É claro, não poderíamos esperar que ele fosse
infalível. Vejamos as razões pelas quais ele pode falhar.</p>
<p>Primeiro, é muito claro que o resultado final a que chegaremos depende da
estimativa inicial. Logo, se fizermos uma estimativa desarrazoada, é muito
provável que não cheguemos a uma solução pertinente.</p>
<p>Além disso, a derivada da função naquele ponto não deve ser muito pequena. No
limite, se ela for zero, teremos uma indefinição, uma divisão por zero.</p>
<p>E se ela for muito pequena, a reta tangente será muito pouco inclinada e jogará
a estimativa para muito longe da raiz. E foi isso o que aconteceu ali em cima.
Por exemplo, consideremos a função \( x^3 - x \).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">X</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">X</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">X</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">hlines</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;grey&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span>
</code></pre></div><p><img src="./output_20_1.png" alt="png"></p>
<p>Pelo gráfico, salta à vista que as três raízes são 0, 1 e -1. Ok, mas imagine
que queiramos estimar a raiz não-nula positiva com este método.</p>
<p>Não poderíamos escolher 0.5 como estimativa, porque isso nos jogaria para o
outro lado e acabaríamos achando algo próximo da raiz negativa:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">newton</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
0.50000 | -5.00000  | 5.50000000000000000000
-5.00000 | -3.36486  | 1.63513513513513508713
-3.36486 | -2.28096  | 1.08390981119991192116
-2.28096 | -1.55628  | 0.72467848569769000022
-1.55628 | -1.04351  | 0.51277134078822550478

-1.0435052271790375
</code></pre>
<p>E se escolhêssemos algo muito perto do mínimo, aquele mesmo fiasco aconteceria.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">newton</span><span class="p">(</span><span class="n">x</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">x</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mf">0.6</span><span class="p">)</span>
</code></pre></div><pre><code>est.    | nova est. | diferença
0.60000 |  17.90000 | 17.29999999999998294697
17.90000 |  11.94680 | 5.95319767139122291155
11.94680 |  7.98552  | 3.96128197667255399494
7.98552 |  5.35691  | 2.62861103714074939575
5.35691 |  3.62500  | 1.73191328184936210732

3.624996032946096
</code></pre>
<p>Como esperado, a tangente ali é pouquíssimo inclinada, e jogou a estimativa para
muito longe, tanto que em 5 tentativas não conseguimos uma estimativa muito boa.
Veja o gráfico.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">X</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linspace</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">1000</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="n">X</span> <span class="o">**</span> <span class="mi">3</span> <span class="o">-</span> <span class="n">X</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$x^3 - x$&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">X</span><span class="p">,</span> <span class="o">-</span><span class="mf">0.432</span> <span class="o">+</span> <span class="mf">0.08</span> <span class="o">*</span> <span class="n">X</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="sa">r</span><span class="s2">&#34;$-0.432 + 0.08x$&#34;</span><span class="p">)</span>

<span class="n">plt</span><span class="o">.</span><span class="n">hlines</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">5</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;grey&#34;</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-</span><span class="mf">0.5</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span>
<span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
</code></pre></div><p><img src="./output_26_1.png" alt="png"></p>
<h1>
  Conclusões
</h1>
<p>O interessante desse algoritmo é ser uma aplicação de cálculo diferencial. É
bastante simples sem sacrificar o lado da eficiência, mas também vimos que há
certas limitações. É claro, ele não poderia fazer milagres. Mas, hoje em dia,
basta plotar o gráfico em questão para ter uma ideia de onde estão as raízes,
como acabamos de fazer aqui com a ajuda do matplotlib.</p>

