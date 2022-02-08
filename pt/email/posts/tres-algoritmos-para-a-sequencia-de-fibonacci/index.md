# [Três algoritmos para a sequência de Fibonacci](https://phelipetls.github.io/pt/posts/tres-algoritmos-para-a-sequencia-de-fibonacci/)

March 03, 2019 · 11 min. read time

---

<p><img src="./kisspng-fibonacci-number-golden-spiral-golden-ratio-mathem-spiral-5b4a12ee4a0493.6897256215315811663032.png" alt="FibSeq"></p>
<p>A sequência de fibonacci é uma velha conhecida dos que estudam programação. Por
isso, esse post não deve soar tão estimulante para pessoas que trabalham com
programação há muito tempo, mas prometo que algo ainda pode ser aproveitado.
Aqui pretendo mostrar três algoritmos para sequência, e todos eles foram
importantes para melhorar meu entendimento de programação.</p>
<p>O primeiro deles é o mais usual. O segundo é por recursão. Já o terceiro é o que
me motivou a fazer o post, nele faço uso extensivo de álgebra linear, e com isso
é possível aprender muito mais a fundo sobre a natureza desses números, por
exemplo, o que caracteriza o seu crescimento?</p>
<p>O primeiro eu vi pela primeira vez escrito em C++ num curso de informática que
fiz. O segundo, num curso de
<a href="https://www.youtube.com/watch?v=ytpJdnlu9ug&amp;list=PLUl4u3cNGP63WbdFxL8giv4yhgdMGaZNA">Introdução à Ciência da Computação</a>
do MIT OpenCourseWare. E o terceiro na <a href="https://youtu.be/13r9QY6cmjc">aula 22</a>
do curso de Linear Algebra do MIT OpenCourseWare, com Gilbert Strang, cujas
aulas são masterpieces. O segredo desta maneira está em ver a sequência de
Fibonacci como um sistema de equações lineares dinâmico, que evolui no tempo. E
para entender melhor como isso funciona, precisamos introduzir o conceito de
autovalores/autovetores. Mas antes vejamos os algoritmos mais simples.</p>
<h1>
  A maneira comum
</h1>
<p>Apenas para recordar o que é a sequência de fibonacci: dados os dois primeiros
números da sequência (comumente 0 e 1), o próximo número é a soma dos dois que o
precedem.</p>
<p>$$
F_0 = 0, F_1 = 1
$$</p>
<p>$$
F_n = F_{n-1} + F_{n-2}
$$</p>
<p>Com isso em mente, podemos escrever o algoritmo que muitos já devem conhecer.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">std_fib</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
    <span class="n">a</span><span class="p">,</span> <span class="n">b</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span>  <span class="c1"># tuple assignment</span>

    <span class="k">for</span> <span class="n">_</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
        <span class="n">fib</span> <span class="o">=</span> <span class="n">a</span> <span class="o">+</span> <span class="n">b</span>
        <span class="n">a</span><span class="p">,</span> <span class="n">b</span> <span class="o">=</span> <span class="n">b</span><span class="p">,</span> <span class="n">fib</span>

    <span class="k">return</span> <span class="n">fib</span>


<span class="p">[</span><span class="n">std_fib</span><span class="p">(</span><span class="n">i</span><span class="p">)</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">13</span><span class="p">)]</span>
</code></pre></div><pre><code>[1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
</code></pre>
<p>Acredito que não muito possa ser dito sobre este algoritmo, mas é interessante
tentar escrevê-lo de um jeito mais <em>pythonic</em>.</p>
<p>Por exemplo, legal pontuar como atribuí os valores às variáveis. O que tá
rolando ali é chamado de tuple assignment. No Python, você pode atribuir o
conteúdo de uma lista, tuple etc. a variáveis numa única linha. Em outra
linguagem talvez precisaríamos de variáveis temporárias para isso.</p>
<p>Caso alguém nunca tenha visto esse algoritmo, poso explicar brevemente. Primeiro
atribuímos à variável &ldquo;a&rdquo; o valor 0, e à &ldquo;b&rdquo; o valor 1. Depois, no loop,
calculamos o número de fibonacci, que é a soma desses dois. O primeiro, então,
é 1. Em seguida, o que fazemos é atribuir à &ldquo;a&rdquo; o valor de &ldquo;b&rdquo; e à &ldquo;b&rdquo; o valor
do número de fibonacci, de forma que no próximo loop, a soma será 1 + 1, e no
próximo 1 + 2, 2 + 3 etc.</p>
<p>Para comparação, vamos testar sua performance em termos de eficiência.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">timeit</span> <span class="n">std_fib</span><span class="p">(</span><span class="mi">10000</span><span class="p">)</span>
</code></pre></div><pre><code>2.46 ms ± 96.5 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
</code></pre>
<h1>
  Por recursão
</h1>
<p>Como não sou estudante de ciência da computação, esse eu conheci recentemente
até e achei maravilhoso. Ele tem a vantagem de ser bem legível, limpo.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">rec_fib</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
    <span class="k">if</span> <span class="n">n</span> <span class="o">==</span> <span class="mi">0</span> <span class="ow">or</span> <span class="n">n</span> <span class="o">==</span> <span class="mi">1</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">n</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">rec_fib</span><span class="p">(</span><span class="n">n</span> <span class="o">-</span> <span class="mi">1</span><span class="p">)</span> <span class="o">+</span> <span class="n">rec_fib</span><span class="p">(</span><span class="n">n</span> <span class="o">-</span> <span class="mi">2</span><span class="p">)</span>


<span class="p">[</span><span class="n">rec_fib</span><span class="p">(</span><span class="n">i</span><span class="p">)</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">13</span><span class="p">)]</span>
</code></pre></div><pre><code>[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
</code></pre>
<p>E funciona da seguinte forma: Primeiro, temos um caso base (<em>base case</em>), em que
o valor é conhecido.</p>
<p>Neste caso, definimos que os números 0 e 1 da sequência de fibonacci são,
respectivamente, 0 e 1. Para todos os outros, calculamos de forma recursiva. Por
exemplo, \( F_3 = F_2 + F_1 = F_1 + F_0 + F_1 = 1 + 0 + 1 = 2 \)</p>
<p>E é uma boa maneira de introduzir o conceito de recursão na computação. Agora
vejamos quão eficiente ele é.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">timeit</span> <span class="n">rec_fib</span><span class="p">(</span><span class="mi">20</span><span class="p">)</span>
</code></pre></div><pre><code>4.81 ms ± 625 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
</code></pre>
<p>Para calcular o vigésimo número ele demorou muito mais do que o algoritmo
anterior, que calculou um número muito maior!! Por que será que isso
aconteceu? Uma imagem pode ajudar a ilustrar o porquê disso.</p>
<p><img src="./fibo.png" alt="Fib"></p>
<p>O que acontece é que a função recursiva acaba requisitando os mesmos números de
fibonacci múltiplas vezes e, para números muito grandes, esse excesso de
chamadas desnecessárias prejudica muito a perfomance do algoritmo. Muito mesmo,
se você chamar a função com 60 como argumento, talvez não tenha paciência para
esperar ela terminar de calcular.</p>
<p>Existe um jeito bem simples de resolver esse problema, que vem da assim chamada
programação dinâmica, um conjunto de técnicas para otimização de algoritmos. A
técnica que cabe usar aqui é chamada de memoization, e consiste em &ldquo;reciclar&rdquo; os
valores que já calculamos previamente, para não precisar recalculá-los. Isso é
exatamente o que precisamos!</p>
<p>Agora, como poderíamos fazer isso? Um jeito bem eficiente é usar um hash table,
o que no Python é um set ou um dictionary. A vantagem dessa estrutura de dados é
que o tempo de procura independe de quantos dados armazenados você tem ali:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">ffib</span><span class="p">(</span><span class="n">n</span><span class="p">,</span> <span class="n">memo</span><span class="o">=</span><span class="p">{</span><span class="mi">0</span><span class="p">:</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">:</span> <span class="mi">1</span><span class="p">}):</span>
    <span class="k">try</span><span class="p">:</span>  <span class="c1"># tente retornar um valor no &#39;memorizador&#39;</span>
        <span class="k">return</span> <span class="n">memo</span><span class="p">[</span><span class="n">n</span><span class="p">]</span>

    <span class="k">except</span><span class="p">:</span>  <span class="c1"># se não conseguir, calcule o numero</span>
        <span class="n">fib</span> <span class="o">=</span> <span class="n">ffib</span><span class="p">(</span><span class="n">n</span> <span class="o">-</span> <span class="mi">1</span><span class="p">)</span> <span class="o">+</span> <span class="n">ffib</span><span class="p">(</span><span class="n">n</span> <span class="o">-</span> <span class="mi">2</span><span class="p">)</span>
        <span class="n">memo</span><span class="p">[</span><span class="n">n</span><span class="p">]</span> <span class="o">=</span> <span class="n">fib</span>  <span class="c1"># guarde-o</span>
        <span class="k">return</span> <span class="n">memo</span><span class="p">[</span><span class="n">n</span><span class="p">]</span>
</code></pre></div><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">timeit</span> <span class="n">ffib</span><span class="p">(</span><span class="mi">20</span><span class="p">)</span>
</code></pre></div><pre><code>178 ns ± 0.385 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">timeit</span> <span class="n">ffib</span><span class="p">(</span><span class="mi">1000</span><span class="p">)</span>
</code></pre></div><pre><code>183 ns ± 8.12 ns per loop (mean ± std. dev. of 7 runs, 1000000 loops each)
</code></pre>
<p>O que é muito mais rápido. É bem impressionante o quanto essa técnica pôde
melhorar o código. Uma coisa a se notar, no entanto, é que se você chamar a
função com 10000, pelo menos com esse código, dá &ldquo;stack overflow&rdquo;&hellip; o que eu
não esperava e honestamente nem sei por que é assim.</p>
<h1>
  Por Álgebra Linear
</h1>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="https://www.youtube.com/embed/13r9QY6cmjc" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allowfullscreen title="YouTube Video"></iframe>
</div>

<p>Finalmente, matrizes. Comecemos primeiro com a equação básica, \( F<em>n =
F</em>{n-1} + F_{n-2} \).</p>
<p>Mas, para termos um sistema de equações lineares, precisamos de mais uma equação
pelo menos. A escolha mais simples é: \( F*{n-1} = F*{n-1} + 0\cdot F_{n-2}
\). O que, em linguagem de matrizes, pode ser escrito como:</p>
<p>\[ \begin{bmatrix}F_{n} \\ F_{n-1}\end{bmatrix} = \begin{bmatrix}1 &amp; 1\\1 &amp;
0\end{bmatrix} \cdot \begin{bmatrix}F_{n-1} \\ F_{n-2}\end{bmatrix} \]</p>
<p>Uma denominação mais interessante para essa relação é: \( u*{t+1} = Au_t \). O
papel que desempenha a matriz A é o de transformar o vetor no &ldquo;tempo&rdquo; t para nos
dar o vetor no &ldquo;tempo&rdquo; seguinte. Estamos lidando aqui com um sistema dinâmico,
que evolui no tempo, e queremos saber, por exemplo, qual o \( u*{10000} \).
Como podemos fazer isso?</p>
<p>Bom, para começar, é conveniente considerarmos um vetor base \( u_0 \), que no
nosso caso pode ser perfeitamente \( \begin{bmatrix} 1 \\ 0 \end{bmatrix}
\). Assim, segue diretamente que \( u_1 = Au_0 \). E, disso, que \( u_2 =
Au_1 = A \cdot A \cdot u_0 = A^2u_0 \). Logo, a fórmula geral é:</p>
<p>$$
u^k = A^ku_0
$$</p>
<p>O que sugere de imediato que a resposta reside nas potências da matriz. Mas isso
pode ser bem pesado matematicamente. Felizmente, existe uma maneira muito
conveniente para resolver esses casos, e envolve os autovalores/autovetores
(<em>eigenvalues/eigenvectors</em>) de uma matriz. Mas, afinal, o que são eles?</p>
<p><img src="./evectors.gif" alt="Eigenvectors"></p>
<p>Simply put, os autovetores são vetores característicos de uma matriz que, após
transformados por ela, não mudam de direção, mas é possível que mudem em
magnitude dependendo do autovalor. Matematicamente,</p>
<p>$$
Ax =
\lambda x
$$</p>
<p>Em que \( x \) é um autovetor da matriz \( A \) e \( \lambda \) um
autovalor do autovetor. Note que, por isso, o autovetor pode encolher (se \( 0
&lt; \lambda &lt; 1 \)), ou aumentar (se \( \lambda &gt; 1 \)), ou apontar para a
direção oposta (se \( \lambda &lt; 0 \)) quando transformado.</p>
<p>Agora, o próximo passo, um grande passo, é notar que nós podemos decompor a
matriz \( A \) em seus autovetores e autovalores. Isto é possível se os
autovetores forem todos linearmente independentes, caso em que uma matriz cheia
de autovetores tem uma inversa, e isso será crucial para nós.</p>
<p>Daí que, tratando \( S \) como uma matriz de autovetores nas colunas e \(
\Lambda \) como uma matriz de autovalores na diagonal e zeros em todo o resto,
podemos afirmar que</p>
<p>$$
AS = S\Lambda
$$</p>
<p>O que não é óbvio, mas que pode ser visto deste modo:</p>
<p>\[ A \cdot \begin{bmatrix} x_1 &amp; x_2 \\ x_1 &amp; x_2 \end{bmatrix} =
\begin{bmatrix} \lambda_{1} x_1 &amp; \lambda_{2} x_2 \\ \lambda_{1} x_1 &amp;
\lambda_{2} x_2 \end{bmatrix} = \begin{bmatrix} x_1 &amp; x_2 \\ x_1 &amp; x_2
\end{bmatrix} \cdot \begin{bmatrix} \lambda_{1} &amp; 0 \\ 0 &amp; \lambda_{2}
\end{bmatrix} \]</p>
<p>Caso não tenha ficado claro: cada coluna de \( S \) é um autovetor. Quando
fazemos \( AS \), obtemos uma matriz cujas colunas são os autovetores vezes
seus respectivos autovalores (consequência direta de \( Ax = \lambda x \)).
Essa matriz pode, enfim, ser &ldquo;diagonalizada&rdquo; separando esses seus dois
componentes como mostrado.</p>
<p>Ok, mas por que isso é útil? Queremos investigar as potências de uma matriz
afinal! Essa decomposição de matriz serve justamente a esse propósito. Vejamos.</p>
<p>Vamos multiplicar \( AS \) pela direita por \( S^{-1} \). Isso dá: \( A =
S\Lambda S^{-1} \), já que \( SS^{-1} = I \). Agora, \( A^2 = S\Lambda
S^{-1}S\Lambda S^{-1} = S \Lambda^{2}S^{-1} \). E, em geral:</p>
<p>$$
A^k = S \Lambda^{k}S^{-1}
$$</p>
<p>E assim vemos o quanto a decomposição pode simplificar a exponenciação de uma
matriz! Agora, retomando lá do início, \( u_k = A^ku_0 \) pode ser reescrito
como \( u_k = S \Lambda^{k}S^{-1}u_0 \).</p>
<p>Mas perceba que seria mais interessante termos \( u_0 \) em uma nova &ldquo;forma&rdquo;,
mais especificamente, como uma combinação linear dos autovetores, \( Sc = u_0
\), onde c é o vetor de coeficientes que resolve esse sistema de equações, \(
c = S^{-1}u_0 \). E, com isso, nós temos tudo que precisamos porque</p>
<p>$$
u_k = A^ku_0 = S \Lambda^{k}S^{-1} Sc = S \Lambda^{k}c
$$</p>
<p>Isso implica que, no nosso caso, para uma matrix 2x2 (só dois autovetores), \(
u<em>k = c_1\lambda</em>{1}^{k}x<em>1 + c_2\lambda</em>{2}^{k}x_2 \), onde os \( x_i \) são
os autovetores, e o restante escalares. O que indica que a evolução do nosso
sistema de equações é totalmente ditada pelos autovalores (não importa quantas
vezes a matriz A transforme os autovetores, a direção deles nunca muda).</p>
<p>Agora resta calcular tudo com o NumPy.</p>
<p>O primeiro passo é criar a matriz A. Logo depois, obter os
autovalores/autovetores, nessa ordem, com a função <em>numpy.linalg.eig()</em>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>

<span class="n">A</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">],</span> <span class="p">[</span><span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">]])</span>

<span class="n">evalues</span><span class="p">,</span> <span class="n">evectors</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">eig</span><span class="p">(</span><span class="n">A</span><span class="p">)</span>

<span class="nb">print</span><span class="p">(</span><span class="n">evalues</span><span class="p">,</span> <span class="n">evectors</span><span class="p">,</span> <span class="n">sep</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\n\n</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>[ 1.61803399 -0.61803399]

[[ 0.85065081 -0.52573111]
 [ 0.52573111  0.85065081]]
</code></pre>
<p>Mas, lembrando que queremos os autovalores na matriz diagonal \( \Lambda \).
Também precisamos calcular o vetor c.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">Lambda</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">diag</span><span class="p">(</span><span class="n">evalues</span><span class="p">)</span>

<span class="n">c</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">solve</span><span class="p">(</span><span class="n">evectors</span><span class="p">,</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">])[:,</span> <span class="n">np</span><span class="o">.</span><span class="n">newaxis</span><span class="p">])</span>
</code></pre></div><p>Antes, vamos olhar para a nossa matriz \( \Lambda \), porque ela pode revelar
coisas interessantes:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">Lambda</span>
</code></pre></div><pre><code>array([[ 1.61803399,  0.        ],
       [ 0.        , -0.61803399]])
</code></pre>
<p>O primeiro número pode parecer familiar para o leitor, afinal é um dos mais
famosos: o número de ouro. E é precisamente ele que descreve como os números de
Fibonacci estão crescendo!! Como sabemos que \( u<em>k = c_1\lambda</em>{1}^{k}x<em>1 +
c_2\lambda</em>{2}^{k}x_2 \), substituindo temos:</p>
<p>$$
u_k = c_1\cdot(1.618)^{k}\cdot x_1 + c_2\cdot(-0.618)^{k}\cdot
x_2
$$</p>
<p>E fica evidente que, para um k muito grande, o número de ouro é o que governa o
crescimento dos números, com o outro termo tentendo a 0 com k aumentando
arbitrariamente. Fica claro também que esses números crescem exponencialmente.</p>
<p>Agora, vamos criar uma função para calcular \( u_k \). Nela usaremos a matriz
\( S \) (evectors), o vetor c e a matriz \( \Lambda \).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">FIB</span><span class="p">(</span><span class="n">k</span><span class="p">):</span>
    <span class="k">return</span> <span class="p">(</span><span class="n">evectors</span> <span class="o">@</span> <span class="n">np</span><span class="o">.</span><span class="n">linalg</span><span class="o">.</span><span class="n">matrix_power</span><span class="p">(</span><span class="n">Lambda</span><span class="p">,</span> <span class="n">k</span><span class="p">)</span> <span class="o">@</span> <span class="n">c</span><span class="p">)[</span><span class="mi">0</span><span class="p">]</span>


<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">15</span><span class="p">):</span>
    <span class="nb">print</span><span class="p">(</span><span class="n">FIB</span><span class="p">(</span><span class="n">i</span><span class="p">),</span> <span class="n">end</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\t</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>[1.]    [2.]    [3.]    [5.]    [8.]    [13.]   [21.]   [34.]   [55.]   [89.]   [144.]  [233.]  [377.]  [610.]
</code></pre>
<p>Tudo o que fiz foi calcular \( u_k \) com a fórmula e extrair do vetor
resultante a primeira linha (\( F_k \)).</p>
<p>E quanto à sua eficiência?</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%</span><span class="n">timeit</span> <span class="n">FIB</span><span class="p">(</span><span class="mi">10000</span><span class="p">)</span>
</code></pre></div><pre><code>32.8 µs ± 1.46 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
</code></pre>
<p>Não surpreende ser tão rápido, estamos usando o NumPy afinal.</p>
<p>Mas a beleza dessa abordagem está menos em sua eficiência e mais no que a
álgebra linear pode nos revelar. A partir dela pudemos entender muito melhor
sobre esses números, o que governa o seu crescimento. Mas, além disso, problemas
com sistemas dinâmicos como esse estão em todos os lugares, e lidar com eles
requer inevitavelmente conhecer os autovetores/autovalores de uma matriz e como
podemos usá-los.</p>
<p>A sequência de Fibonacci é um bom exemplo para introduzir esses conceitos da
álgebra linear, cujo conhecimento é exigido por muitos outros problemas mais
práticos/complexos, como Cadeias de Markov, e o leitor pode achar interessante
também que o algoritmo do Google tem como fundamento os autovetores de uma
matriz de Markov. Enfim, trata-se de um tópico fascinante por si só.</p>
<p>Antes de terminar o post, fica a minha recomendação para um melhor entendimento
de tudo isso: a série de vídeos
<a href="https://www.youtube.com/watch?v=fNk_zzaMoSs&amp;list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab">&ldquo;Essence of Linear Algebra&rdquo;</a>
do 3Blue1Brown e este <a href="http://setosa.io/ev/eigenvectors-and-eigenvalues/">site</a>
que conta com ótimas visualizações do que acabamos de fazer aqui.</p>
