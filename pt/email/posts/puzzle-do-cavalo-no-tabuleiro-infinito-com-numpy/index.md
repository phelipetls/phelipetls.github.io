# [Puzzle do cavalo no tabuleiro infinito com NumPy](https://phelipetls.github.io/pt/posts/puzzle-do-cavalo-no-tabuleiro-infinito-com-numpy/)

February 18, 2019 · 9 min. read time

---

<p>Para estrear o blog, escolhi explorar um puzzle probabilístico, que vi no
<a href="http://varianceexplained.org/r/knight-chess/">blog do David Robinson</a>, que
consiste em estimar a probabilidade de um cavalo voltar à sua posição inicial
após ter saltado aleatoriamente 20 vezes num tabuleiro de xadrez infinito (sendo
os 8 possíveis saltos igualmente prováveis).</p>
<p>Em seu post, David inteligemente escolhe abordar o problema pelo tidyverse, o
que o permite simular o experimento de maneira eficiente e numa estrutura que
facilita a criação de visualizações do problema com o ggplot2.</p>
<p>Porém esse aqui não é um post sobre R. Como estou aprendendo Python, achei que
seria interessante tentar fazer a mesma simulação com uma de suas bibliotecas
mais famosas, o Numpy, para praticar e ver se ele cumpre o que promete:
operações vetorizadas e eficientes.</p>
<h1>
  O que está por trás da eficiência do Numpy
</h1>
<p>O Numpy chega para suprir uma desvantagem que o Python tem por ser uma linguagem
de tipagem dinâmica e de script (não-compilada): ele não é tão bom em fazer
repetidas operações múltiplas vezes. Precisamente o que garante a ele uma
vantagem pelo lado do desenvolvimento de código (uma linguagem solta, fácil de
aprender) é o que compromete sua performance.</p>
<p>Para ilustrar essa dificuldade, vamos imaginar que queremos somar duas listas de
números elemento por elemento. Uma lista em Python comporta qualquer tipo de
dado (integer, float, string, ou até outras listas), e ele não tem como saber de
antemão que a lista é composta somente de integers, por exemplo. Então, o que
ele fará a cada operação é primeiro verificar o tipo de cada elemento para
depois descobrir que &ldquo;soma&rdquo; ele deve fazer. Porque, por exemplo, somar dois
integers é diferente de somar dois strings:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="mi">1</span> <span class="o">+</span> <span class="mi">2</span>
</code></pre></div><pre tabindex="0"><code>3
</code></pre><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="s2">&#34;1&#34;</span> <span class="o">+</span> <span class="s2">&#34;2&#34;</span>
</code></pre></div><pre><code>'12'
</code></pre>
<p>E é esse type-checking uma das razões que acabam retardando muito a operação
como um todo, principalmente quando isso vai se acumulando na casa dos milhões.
Numa linguagem compilada e em que você precisa declarar o tipo de suas
variáveis, isso não seria um problema.</p>
<p>O que o Numpy faz é, ao invés de verificar o tipo dos elementos cada vez que a
operação for chamada, ele o faz uma vez somente para depois executar a operação
a partir dessa informação (para isso serve o atributo &lsquo;dtype&rsquo; do ndarray - de
n-dimensional array -, a estrutura de dados básica do Numpy). Além disso, as
operações rodam no background em código C.</p>
<p>O custo disso é que a estrutura básica do Numpy perde a flexibilidade da lista,
já que ele comportará um tipo de dado somente. Mas é um custo que estamos
dispostos a pagar. Por exemplo:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>

<span class="n">a</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">([</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">])</span>

<span class="n">a</span><span class="o">.</span><span class="n">dtype</span>
</code></pre></div><pre><code>dtype('int32')
</code></pre>
<p>Se tentarmos incluir um string nesse ndarray, ele será convertido para um
integer:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">a</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="s2">&#34;12&#34;</span>
<span class="n">a</span>
</code></pre></div><pre><code>array([12,  2,  3,  4])
</code></pre>
<p>Mas se tentarmos incluir um número complexo, obtemos um erro:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">a</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">=</span> <span class="mi">2</span> <span class="o">+</span> <span class="mi">1</span><span class="n">j</span>
</code></pre></div><pre><code>---------------------------------------------------------------------------

TypeError                                 Traceback (most recent call last)

&lt;ipython-input-6-65561a8fbe75&gt; in &lt;module&gt;
----&gt; 1 a[0] = 2+1j


TypeError: can't convert complex to int
</code></pre>
<p>Esse comportamento é muito similar ao vetor do R.</p>
<h1>
  Simulando os movimentos do cavalo
</h1>
<p>Dito isto, vejamos o que o Numpy pode fazer. Mas antes um esclarecimento</p>
<ul>
<li>devo todo o thought process no que diz respeito à modelagem ao Robinson, e
encorajo a todos lendo que confiram o post dele, se não antes, depois de ler
aqui. O único trabalho que tive foi o de escrever o código em Python.</li>
</ul>
<p>A ideia de Robinson para a simulação foi imaginar o tabuleiro como um plano
cartesiano, em que o cavalo está no ponto de origem, (0, 0), podendo saltar dali
para oito casas possíveis, com igual probabilidade, respeitando sempre as regras
do xadrez, como na imagem:</p>
<p><img src="./knight_moves.png" alt="Knight"></p>
<p>Daí podemos notar que, se o cavalo pular para uma casa de coordenada x, a
coordenada y terá que ser igual a 3 - abs(x). Mas devemos tomar o cuidado para
assegurar que a coordenada y também possa ser negativa.</p>
<p>Com isso em mente, podemos simular um único salto.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="c1"># sorteamos um dos números em parênteses para obter o x</span>
<span class="n">x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">2</span><span class="p">))</span>

<span class="c1"># e calculamos o y pela relação já descrita</span>
<span class="n">y</span> <span class="o">=</span> <span class="p">(</span><span class="mi">3</span> <span class="o">-</span> <span class="nb">abs</span><span class="p">(</span><span class="n">x</span><span class="p">))</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">))</span>

<span class="nb">print</span><span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">)</span>
</code></pre></div><pre><code>2 1
</code></pre>
<p>Mas, é claro, não é interessante simular somente um salto. Queremos, na verdade,
20 deles, precisamos de um vetor.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">move_x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">2</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>
<span class="n">move_y</span> <span class="o">=</span> <span class="p">(</span><span class="mi">3</span> <span class="o">-</span> <span class="nb">abs</span><span class="p">(</span><span class="n">move_x</span><span class="p">))</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span><span class="p">)</span>

<span class="nb">print</span><span class="p">(</span><span class="n">move_x</span><span class="p">,</span> <span class="n">move_y</span><span class="p">,</span> <span class="n">sep</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\n</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>[-2  1 -1  2  1  1  2  2 -1 -2 -2  2 -1  2 -2  2 -1  1  2  1]
[-1  2  2 -1 -2 -2  1 -1  2  1 -1  1  2 -1 -1  1 -2 -2  1  2]
</code></pre>
<p>Ótimo! Foi bastante simples. É legal observar como funciona a sintaxe do Numpy.
Por ele ser totalmente voltado para operações vetoriais, podemos fazer operações
aritméticas em vetores elemento por elemento sem qualquer for loop, bata
subtrair de 3 o valor absoluto do vetor move_x, como se ele fosse um escalar, e
está feito!</p>
<p>Agora, sabendo disso, se realmente quisermos computar uma probabilidade, de nada
adianta termos somente uma amostra com vinte saltos aleatórios do cavalo,
precisamos de muitas mais. Vejamos com cem mil vezes mais. Com o Numpy, isso é
bem fácil de ser feito.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">move_x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">2</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span> <span class="o">*</span> <span class="mi">100000</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">((</span><span class="mi">20</span><span class="p">,</span> <span class="mi">100000</span><span class="p">))</span>
<span class="n">move_y</span> <span class="o">=</span> <span class="p">(</span><span class="mi">3</span> <span class="o">-</span> <span class="nb">abs</span><span class="p">(</span><span class="n">move_x</span><span class="p">))</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span> <span class="o">*</span> <span class="mi">100000</span><span class="p">)</span><span class="o">.</span><span class="n">reshape</span><span class="p">(</span>
    <span class="p">(</span><span class="mi">20</span><span class="p">,</span> <span class="mi">100000</span><span class="p">)</span>
<span class="p">)</span>

<span class="nb">print</span><span class="p">(</span><span class="n">move_x</span><span class="p">,</span> <span class="n">move_y</span><span class="p">,</span> <span class="n">sep</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\n\n</span><span class="s2">&#34;</span><span class="p">)</span>  <span class="c1"># sep = &#39;\n\n&#39; serve para espaçar o output do print</span>
</code></pre></div><pre><code>[[ 1 -2  1 ... -1  2  2]
 [ 1  1 -2 ...  2  2 -2]
 [ 1  2 -1 ... -1  1  1]
 ...
 [-1  1  1 ...  2  2 -2]
 [-1  1  2 ...  1 -1  2]
 [-1 -2  1 ...  2 -2  2]]

[[-2  1 -2 ...  2  1  1]
 [ 2 -2 -1 ...  1 -1 -1]
 [ 2 -1 -2 ...  2  2  2]
 ...
 [-2 -2  2 ...  1  1  1]
 [-2  2 -1 ...  2 -2 -1]
 [-2 -1 -2 ...  1 -1 -1]]
</code></pre>
<p>No código acima eu primeiro gerei 2 milhões de saltos em um vetor, e depois o
reorganizei como uma matriz 20 x 100.000. Me acostumei a enxergar matrizes como
vários vetores-coluna agrupados, então foi assim que fiz, questão de
preferência. Dessa forma, cada coluna representa uma tentativa e cada linha um
salto.</p>
<p>Para o próximo passo, queremos descobrir em que posição o cavalo está na medida
em que se move pelo tabuleiro. Podemos fazer isso ao calcular a soma cumulativa
das colunas.</p>
<p>Para isso, basta utilizarmos o método &lsquo;cumsum&rsquo; do ndarray, com o argumento de
axis igualado a 0, o que quer dizer que ele vai fazer a soma cumulativa &ldquo;down
the rows&rdquo;, linhas abaixo (o 0 é porque a linha é o &ldquo;primeiro&rdquo; elemento do
&ldquo;shape&rdquo; de uma matriz bidimensional, (20, 100000)), o que é justamente o que
queremos, já que interpretamos cada linha como um salto:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="n">position_x</span> <span class="o">=</span> <span class="n">move_x</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">0</span><span class="p">)</span>
<span class="n">position_y</span> <span class="o">=</span> <span class="n">move_y</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">0</span><span class="p">)</span>

<span class="nb">print</span><span class="p">(</span><span class="n">position_x</span><span class="p">,</span> <span class="n">position_y</span><span class="p">,</span> <span class="n">sep</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\n\n</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>[[ 1 -2  1 ... -1  2  2]
 [ 2 -1 -1 ...  1  4  0]
 [ 3  1 -2 ...  0  5  1]
 ...
 [ 4 -5 -8 ...  4 17  3]
 [ 3 -4 -6 ...  5 16  5]
 [ 2 -6 -5 ...  7 14  7]]

[[ -2   1  -2 ...   2   1   1]
 [  0  -1  -3 ...   3   0   0]
 [  2  -2  -5 ...   5   2   2]
 ...
 [ 12  -7 -12 ...   0   9   1]
 [ 10  -5 -13 ...   2   7   0]
 [  8  -6 -15 ...   3   6  -1]]
</code></pre>
<p>Mas, como o que nos interessa para responder ao problema é somente a última
linha (onde ele parou no plano quando deu o último salto), podemos extrair
somente ela pedindo a linha de indíce -1 de nossa matriz (no Python, -1 equivale
ao último elemento, -2 ao penúltimo etc.).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="nb">print</span><span class="p">(</span><span class="n">position_x</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">],</span> <span class="n">position_y</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">],</span> <span class="n">sep</span><span class="o">=</span><span class="s2">&#34;</span><span class="se">\n\n</span><span class="s2">&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>[ 2 -6 -5 ...  7 14  7]

[  8  -6 -15 ...   3   6  -1]
</code></pre>
<p>Agora, para de fato termos uma estimativa da probabilidade do cavalo voltar à
origem após 20 saltos aleatórios, vamos calcular a frequência relativa desse
evento em cem mil tentativas. Podemos fazer isso da seguinte maneira:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="p">((</span><span class="n">position_x</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="mi">0</span><span class="p">)</span> <span class="o">&amp;</span> <span class="p">(</span><span class="n">position_y</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="mi">0</span><span class="p">))</span><span class="o">.</span><span class="n">mean</span><span class="p">()</span>
</code></pre></div><pre><code>0.00648
</code></pre>
<p>Aqui, o que o Numpy fez primeiro foi criar um vetor de booleans, ao comparar os
dois vetores elemento por elemento, retornando Verdadeiro somente quando ambos
foram iguais a zero, caso em que ele retornou para a origem concluído seu random
walk.</p>
<p>Calculado esse vetor, o que fiz foi pedir sua média, e isso me dá justamente a
frequência relativa do evento de interesse: é a contagem das vezes que o evento
aconteceu (a soma dos verdadeiros, lidos como 1 pelo método &lsquo;mean&rsquo;) sobre o
comprimento do vetor.</p>
<p>E assim está pronto. Este é um resultado coerente com o obtido por Robinson, o
que é confortante. A probabilidade em questão é de aproximadamente 0.6%; ou
seja, a cada 1000 tentativas, podemos esperar que, em média, em 6 delas o cavalo
voltará à origem após dar 20 saltos aleatórios.</p>
<p>Podemos ter um relance da distribuição de probabilidades do problema com um
simples histograma, feito com 100 repetições do experimento.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="o">%</span><span class="n">matplotlib</span> <span class="n">inline</span>

<span class="c1"># isso é uma list comprehension</span>
<span class="n">knight_probs</span> <span class="o">=</span> <span class="p">[</span><span class="n">knight_infinite_board</span><span class="p">(</span><span class="mi">100000</span><span class="p">)</span> <span class="k">for</span> <span class="n">_</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">100</span><span class="p">)]</span>

<span class="n">plt</span><span class="o">.</span><span class="n">hist</span><span class="p">(</span><span class="n">knight_probs</span><span class="p">,</span> <span class="n">bins</span> <span class="o">=</span> <span class="mi">20</span><span class="p">)</span>
</code></pre></div><p><img src="./histograma.png" alt="Histograma"></p>
<h1>
  A eficiência em números
</h1>
<p>E, só para coisa não ficar vaga, quão eficiente é o Numpy afinal? Podemos
verificar isso facilmente com o magic command do IPython, o %%timeit. Criei uma
função que toma como argumento qualquer número de tentativas para testarmos o
algoritmo.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="k">def</span> <span class="nf">knight_infinite_board</span><span class="p">(</span><span class="n">trials</span><span class="p">):</span>
    <span class="n">move_x</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">2</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span> <span class="o">*</span> <span class="n">trials</span><span class="p">)</span>
    <span class="n">move_y</span> <span class="o">=</span> <span class="p">(</span><span class="mi">3</span> <span class="o">-</span> <span class="nb">abs</span><span class="p">(</span><span class="n">move_x</span><span class="p">))</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">((</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">),</span> <span class="n">size</span><span class="o">=</span><span class="mi">20</span> <span class="o">*</span> <span class="n">trials</span><span class="p">)</span>

    <span class="n">position_x</span> <span class="o">=</span> <span class="n">move_x</span><span class="o">.</span><span class="n">reshape</span><span class="p">((</span><span class="mi">20</span><span class="p">,</span> <span class="n">trials</span><span class="p">))</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">0</span><span class="p">)[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span>
    <span class="n">position_y</span> <span class="o">=</span> <span class="n">move_y</span><span class="o">.</span><span class="n">reshape</span><span class="p">((</span><span class="mi">20</span><span class="p">,</span> <span class="n">trials</span><span class="p">))</span><span class="o">.</span><span class="n">cumsum</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">0</span><span class="p">)[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span>

    <span class="k">return</span> <span class="p">((</span><span class="n">position_x</span> <span class="o">==</span> <span class="mi">0</span><span class="p">)</span> <span class="o">&amp;</span> <span class="p">(</span><span class="n">position_y</span> <span class="o">==</span> <span class="mi">0</span><span class="p">))</span><span class="o">.</span><span class="n">mean</span><span class="p">()</span>
</code></pre></div><div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%%</span><span class="n">timeit</span>
<span class="n">knight_infinite_board</span><span class="p">(</span><span class="mi">100000</span><span class="p">)</span> <span class="c1"># cem mil tentativas</span>
</code></pre></div><pre><code>130 ms ± 4.16 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="o">%%</span><span class="n">timeit</span>
<span class="n">knight_infinite_board</span><span class="p">(</span><span class="mi">1000000</span><span class="p">)</span> <span class="c1"># 1 milhão!</span>
</code></pre></div><pre><code>1.15 s ± 97.2 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
</code></pre>
<p>É extraordinariamente rápido. Mesmo quando se trata de cálculos com uma matriz
de 20 x 1 milhão! E meu computador certamente não ajuda. O mesmo feito no base
Python seria absurdamente mais lento.</p>
<h1>
  Conclusões
</h1>
<p>Acho que com esse simples exercício, pudemos mesmo atestar que o Numpy é uma
ferramenta muito útil, garantindo eficiência com uma sintaxe simples e limpa. Há
dentro dele ainda muito mais a ser explorado do que o exposto aqui, incluindo as
mais diversas distribuições probabílistas com np.random, manipulação de matrizes
com np.linalg etc. O numpy é muito usado pelas mais importantes bibliotecas
relacionadas a Data Science e Machine Learning, como pandas e scikit-learn, por
isso um conhecimento apropriado de suas funcionalidades pode ajudar muito se o
objetivo é crescer na área de data science.</p>
<p>Pretendo trazer outros posts em que o usarei, mas por ora ficarei por aqui.
Espero que tenha sido proveitoso. Toda crítica/sugestão será muito bem-vinda.</p>

