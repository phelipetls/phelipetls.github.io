# [Processo de Gram-Schmidt com NumPy](https://phelipetls.github.io/pt/posts/gram-schmidt/)

August 04, 2019 · 6 min. read time

---

<p>Em Álgebra Linear, processo de Gram-Schmidt é um algoritmo usado para tornar um
conjunto de vetores perpendiculares entre si (o que também se conhece por
ortogonalização).</p>
<p>Esse processo de ortogonalização é útil porque torna fácil numericamente
operações custosas como a inversão de uma matriz. Isso vem simplesmente do fato
do produto interno de dois vetores perpendiculares entre si ser 0.</p>
<p>Intuitivamente, se interpretarmos o produto interno como uma &ldquo;projeção&rdquo; de um
vetor sobre o outro, isso quer dizer que os dois vetores não tem uma
&ldquo;correlação&rdquo; em termos de direção. Geometricamente, também quer dizer que eles
estão separados por um ângulo de 90º.</p>
<p>Por exemplo, os três vetores abaixo são vetores ortogonais:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">matplotlib</span> <span class="n">inline</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>

<span class="n">fig</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">()</span>
<span class="n">ax</span> <span class="o">=</span> <span class="n">fig</span><span class="o">.</span><span class="n">add_subplot</span><span class="p">(</span><span class="n">projection</span><span class="o">=</span><span class="s1">&#39;3d&#39;</span><span class="p">)</span>

<span class="n">ax</span><span class="o">.</span><span class="n">quiver</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;red&#34;</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">quiver</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;blue&#34;</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">quiver</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;green&#34;</span><span class="p">)</span>

<span class="n">ax</span><span class="o">.</span><span class="n">set_xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">set_ylim</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">set_zlim</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
</code></pre></div><p><img src="./vetores.png" alt="Vetores na terceira dimensão"></p>
<p>Para ver isso com matrizes, vamos supor uma matriz \( Q \) cujas colunas são
vetores ortogonais com o comprimento
(<a href="https://en.wikipedia.org/wiki/Norm_(mathematics)">norma</a>) igual a 1, o que
quer dizer que eles são <em>ortonormais</em>.</p>
<p>Se isso é verdade, então podemos dizer que \( Q^{T}Q = I \). E, se \( Q \)
for quadrada, então \( Q^T \) é a inversa de \( Q \)!!</p>
<p>Isso porque</p>
<p>\( q^{T}_{i}q_j = \begin{cases} 0, &amp; \text{se } i \neq j \cr 1, &amp; \text{se } i
= j \end{cases} \)</p>
<p>É dessa forma que uma operação complexa como inverter uma matriz torna-se
trivial no caso de uma matriz ortogonal.</p>
<p>Então entra a ideia de Gram-Schmidt, que procura transformar uma matriz \( A
\) qualquer em uma matriz com vetores ortonormais \( Q \) e uma matriz \( R
\) que conecta as duas:</p>
<p>$$
A = QR
$$</p>
<p>Como eles fazem isso? A ideia básica é a seguinte e está intimamente ligada ao
conceito de projeção. Por isso, vamos entender o que é isso antes.</p>
<p>Abaixo, uma imagem da projeção de um vetor \( a_1 \) sobre \( a_2 \).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>

<span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">seed</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
<span class="n">A</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">4</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">((</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">))</span>

<span class="n">fig</span><span class="p">,</span> <span class="n">ax</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">()</span>

<span class="n">a1</span> <span class="o">=</span> <span class="n">A</span><span class="p">[:,</span> <span class="mi">0</span><span class="p">]</span>
<span class="n">a2</span> <span class="o">=</span> <span class="n">A</span><span class="p">[:,</span> <span class="mi">1</span><span class="p">]</span>
<span class="n">projection</span> <span class="o">=</span> <span class="p">(</span><span class="n">a1</span><span class="o">.</span><span class="n">dot</span><span class="p">(</span><span class="n">a2</span><span class="p">)</span> <span class="o">/</span> <span class="n">a1</span><span class="o">.</span><span class="n">dot</span><span class="p">(</span><span class="n">a1</span><span class="p">))</span> <span class="o">*</span> <span class="n">a2</span>
<span class="n">e</span> <span class="o">=</span> <span class="n">a1</span> <span class="o">-</span> <span class="n">projection</span>

<span class="n">ax</span><span class="o">.</span><span class="n">arrow</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="o">*</span><span class="n">a1</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;red&#34;</span><span class="p">,</span> <span class="n">head_width</span><span class="o">=</span><span class="mf">0.5</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">arrow</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="o">*</span><span class="n">a2</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;green&#34;</span><span class="p">,</span> <span class="n">head_width</span><span class="o">=</span><span class="mf">0.5</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">arrow</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="o">*</span><span class="n">projection</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;blue&#34;</span><span class="p">,</span> <span class="n">head_width</span><span class="o">=</span><span class="mf">0.5</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">arrow</span><span class="p">(</span><span class="o">*</span><span class="n">projection</span><span class="p">,</span> <span class="o">*</span><span class="n">e</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s2">&#34;grey&#34;</span><span class="p">,</span> <span class="n">linestyle</span><span class="o">=</span><span class="s2">&#34;--&#34;</span><span class="p">)</span>

<span class="n">ax</span><span class="o">.</span><span class="n">set_xlim</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">set_ylim</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">12</span><span class="p">)</span>

<span class="n">ax</span><span class="o">.</span><span class="n">annotate</span><span class="p">(</span><span class="s2">&#34;$a_1$&#34;</span><span class="p">,</span> <span class="n">a1</span> <span class="o">+</span> <span class="mf">0.5</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">annotate</span><span class="p">(</span><span class="s2">&#34;$a_2$&#34;</span><span class="p">,</span> <span class="n">a2</span> <span class="o">+</span> <span class="p">[</span><span class="mf">0.5</span><span class="p">,</span> <span class="o">-</span><span class="mf">0.5</span><span class="p">],</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">annotate</span><span class="p">(</span><span class="s2">&#34;$\hat</span><span class="si">{x}</span><span class="s2">a_2$&#34;</span><span class="p">,</span> <span class="n">projection</span> <span class="o">-</span> <span class="p">[</span><span class="mf">0.5</span><span class="p">,</span> <span class="mf">1.5</span><span class="p">],</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">annotate</span><span class="p">(</span><span class="s2">&#34;$e = a_1 - \hat</span><span class="si">{x}</span><span class="s2">a_2$&#34;</span><span class="p">,</span> <span class="n">e</span> <span class="o">+</span> <span class="n">projection</span> <span class="o">+</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">2</span><span class="p">],</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">15</span><span class="p">)</span>
<span class="n">ax</span><span class="o">.</span><span class="n">set_title</span><span class="p">(</span><span class="sa">r</span><span class="s2">&#34;Projeção de </span><span class="se">\\</span><span class="s2">( a_1 </span><span class="se">\\</span><span class="s2">) em </span><span class="se">\\</span><span class="s2">( a_2 </span><span class="se">\\</span><span class="s2">)&#34;</span><span class="p">)</span>
</code></pre></div><p><img src="./projecao-vetorial.png" alt="Projeção vetorial"></p>
<p>Dados esses dois vetores, podemos gerar um vetor perpendicular ao \( a_2 \)
que denominaremos \( e \), que é o resultado da subtração em \( a_1 \) do
que ele tem em comum com \( a_2 \) (o \( \hat{x} \)).</p>
<p>Ou seja, o \( \hat{x} \) é o coeficiente de projeção, que denota o quanto \(
a_1 \) e \( a_2 \) se assemelham em termos de direção. Enquanto que \( e =
a_1 - \hat{x} a_2 \) é o erro da projeção.</p>
<p>Como \( e \) é perpendicular a \( a_2 \), temos que:</p>
<p>$$
a_2^{T} (e) = 0 \newline
a_2^{T} (a_1 - \hat{x} a_2) = 0 \newline
\hat{x}a^{T}_2a_2 = a_2^{T}a_1 \newline
\hat{x} = \frac{a^{T}_2a_1}{a^{T}_2a_2}
$$</p>
<p>Se você reparar bem, essa foi exatamente a conta que eu fiz para obter a
variável de nome <code>projection</code> no código acima.</p>
<p>Isso pode ser generaliza para um sistema de equações e é conhecido como equações
normais e é o que fundamenta o modelo clássico de regressão linear.</p>
<p>A fórmula é bem parecida com a de cima e a interpretação também: ela projeta o
vetor \( b \) no espaço vetorial expandido pelos vetores de \( A \).</p>
<p>$$
\hat{x} = (A^TA)^{-1}A^Tb
$$</p>
<p>O vetor projetado em \( A \) é então simplesmente \( A\hat{x} \), o produto
do que agora chamaremos matriz de projeção, \( A(A^TA)^{-1}A^T \), com o vetor
\( b \):</p>
<p>$$
\hat{b} = A\hat{x} = A(A^TA)^{-1}A^Tb
$$</p>
<p>E, para obter o erro da projeção:</p>
<p>$$
e = b - A\hat{x} = b - A(A^TA)^{-1}A^Tb = (I - A(A^TA)^{-1}A^T)b
$$</p>
<p>E assim vemos que assim como há a matriz de projeção de \( b \) sobre o
sub-espaço expandido pelos vetores de \( A \), há também a projeção de \( b
\) sobre o sub-espaço ortogonal, que é obtido ao multiplicar \( b \) com a
matriz denominada como <em>annihilator matrix</em>, \( (I - A(A^TA)^{-1}A^T) \). Essa
matriz é a <em>residual maker</em> na regressão linear. E é justamente o que iremos
precisar.</p>
<p>Agora, para o algoritmo propriamente dito. Vamos usar uma matriz 3x3 qualquer e
tentar torná-lo ortogonal.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">seed</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span>
<span class="n">A</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">9</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">3</span><span class="p">))</span>

<span class="n">A</span>
</code></pre></div><pre><code>array([[5, 8, 9],
       [5, 0, 0],
       [1, 7, 6]])
</code></pre>
<p>O primeiro vetor não precisa ser ortogonalizado, vamos dividindo-o por seu
próprio comprimento para torná-lo normal (com norma 1).</p>
<p>Já o segundo, queremos ortogonalizar em relação ao primeiro. E para isso vamos
usar a <em>annhilator matrix</em>.</p>
<p>No caso do terceito, faremos o mesmo mas sobre o espaço expandido pelos dois
primeiros vetores.</p>
<p>Vamos ver se isso funciona. O código abaixo replica esse processo.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">orthogonalize</span><span class="p">(</span><span class="n">A</span><span class="p">,</span> <span class="n">n</span><span class="p">):</span>
    <span class="c1"># vetor a ser ortogonalizado</span>
    <span class="n">b</span> <span class="o">=</span> <span class="n">A</span><span class="p">[:,</span> <span class="n">n</span><span class="p">][:,</span> <span class="n">np</span><span class="o">.</span><span class="n">newaxis</span><span class="p">]</span>
    <span class="c1"># se for o primeiro vetor, somente normalize (norma igual a um)</span>
    <span class="k">if</span> <span class="n">n</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">b</span> <span class="o">/</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">norm</span><span class="p">(</span><span class="n">b</span><span class="p">)</span>
    <span class="c1"># se não, vamos ortogonalizar</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="c1"># espaço vetorial preenchido pelos vetores antecessores</span>
        <span class="c1"># sobre o qual precisamos projetar o vetor b</span>
        <span class="n">X</span> <span class="o">=</span> <span class="n">A</span><span class="p">[:,</span> <span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">n</span><span class="p">)]</span>
        <span class="c1"># matriz identidade NxN (N = número de linhas)</span>
        <span class="n">I</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">eye</span><span class="p">(</span><span class="n">X</span><span class="o">.</span><span class="n">shape</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span>
        <span class="c1"># construir a annihilator matrix, para projetar o vetor b no sub-espaço</span>
        <span class="c1"># ortogonal ao espaço coluna de X, em R^n</span>
        <span class="n">M</span> <span class="o">=</span> <span class="n">I</span> <span class="o">-</span> <span class="n">X</span> <span class="o">@</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">inv</span><span class="p">(</span><span class="n">X</span><span class="o">.</span><span class="n">T</span> <span class="o">@</span> <span class="n">X</span><span class="p">)</span> <span class="o">@</span> <span class="n">X</span><span class="o">.</span><span class="n">T</span>
        <span class="c1"># fazer a projeção e retornar normalizado</span>
        <span class="n">e</span> <span class="o">=</span> <span class="n">M</span><span class="o">.</span><span class="n">dot</span><span class="p">(</span><span class="n">b</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">e</span> <span class="o">/</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">norm</span><span class="p">(</span><span class="n">e</span><span class="p">)</span>


<span class="k">def</span> <span class="nf">q</span><span class="p">(</span><span class="n">A</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">concatenate</span><span class="p">([</span><span class="n">orthogonalize</span><span class="p">(</span><span class="n">A</span><span class="p">,</span> <span class="n">i</span><span class="p">)</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">3</span><span class="p">)],</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>


<span class="n">Q</span> <span class="o">=</span> <span class="n">q</span><span class="p">(</span><span class="n">A</span><span class="p">)</span>
<span class="n">Q</span>
</code></pre></div><pre><code>array([[ 0.70014004,  0.40635191,  0.58709629],
       [ 0.70014004, -0.55198092, -0.45290285],
       [ 0.14002801,  0.72814504, -0.67096718]])
</code></pre>
<p>Se tudo está correto, a multiplicação \( Q^{T}Q \) deve retornar a identidade:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">Q</span><span class="o">.</span><span class="n">T</span><span class="o">.</span><span class="n">dot</span><span class="p">(</span><span class="n">Q</span><span class="p">)</span>
</code></pre></div><pre><code>array([[ 1.00000000e+00, -1.38777878e-17, -8.04911693e-16],
       [-1.38777878e-17,  1.00000000e+00,  6.66133815e-16],
       [-8.04911693e-16,  6.66133815e-16,  1.00000000e+00]])
</code></pre>
<p>O que felizmente é o nosso caso.</p>
<p>Isso também é conhecido como mudar a base de uma matriz, para uma muito mais
fácil de se lidar numericamente.</p>
<p>Para obter a mesma matriz Q de forma mais confiável, você pode usar a função
<code>np.linalg.qr()</code>, que vai te retornar a matriz \( Q \) que obtemos e a matriz
\( R \) que conecta \( Q \) a \( A \).</p>
<p>Aqui está a aula em que Gilbert Strang explica esse conceito:</p>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/uNsCkP9mgRk" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="YouTube Video"></iframe>
</div>

