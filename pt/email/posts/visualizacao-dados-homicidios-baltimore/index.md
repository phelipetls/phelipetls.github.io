# [Homicídios em Baltimore: visualizações com ggplot2 e gganimate](https://phelipetls.github.io/pt/posts/visualizacao-dados-homicidios-baltimore/)

April 07, 2019 · 7 min. read time

---

<p>Neste post pretendo continuar o que foi iniciado no último, onde transformamos
dados contidos em texto em um data.frame, um formato muito mais amigável para a
exploração e visualização de dados no R.</p>
<p>O procedimento geral agora, com os dados já limpos, é transformá-los e fazer a
visualização que queremos. Daí o uso extensivo do tidyverse antes de chamar o
ggplot2.</p>
<p>Ok, vamos primeiro olhar para a nossa
<a href="https://raw.githubusercontent.com/phelipetls/phelipetls.github.io/master/assets/homicides_df.csv" title="Link do arquivo raw">base de dados</a>
e ver que perguntas gostaríamos de responder:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">tidyverse</span><span class="p">)</span>

<span class="n">df</span> <span class="o">&lt;-</span> <span class="nf">read_csv</span><span class="p">(</span><span class="s">&#34;https://raw.githubusercontent.com/phelipetls/phelipetls.github.io/master/assets/homicides_df.csv&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">na.omit</span><span class="p">()</span>

<span class="n">df</span> <span class="o">%&gt;%</span> <span class="nf">head</span><span class="p">()</span>
</code></pre></div><pre><code>## # A tibble: 6 x 8
##   causas         lon   lat raca  genero idade data       endereco
##   &lt;chr&gt;        &lt;dbl&gt; &lt;dbl&gt; &lt;chr&gt; &lt;chr&gt;  &lt;dbl&gt; &lt;date&gt;     &lt;chr&gt;
## 1 Shooting     -76.7  39.3 Black Male      17 2007-01-01 3400 Clifton Ave.
## 2 Shooting     -76.7  39.3 Black Male      26 2007-01-02 4900 Challedon Ro~
## 3 Blunt Force  -76.6  39.3 Black Female    44 2007-01-02 2000 West North A~
## 4 Asphyxiation -76.6  39.4 Black Male      21 2007-01-03 5900 Northwood Dr~
## 5 Blunt Force  -76.6  39.2 White Male      61 2007-01-05 500 Maude Ave.
## 6 Shooting     -76.6  39.4 Black Male      46 2007-01-05 5200 Ready Ave.
</code></pre>
<p>Há diversas questões a serem exploradas aqui, a primeira e mais sensível que vem
a mente é a racial: quais raças costumam ser vítimas de homicídio? Vamos,
naturalmente, estar interessados também na mesma pergunta para diferentes
características das pessoas, como gênero, idade etc. e como elas se relacionam
umas com as outras. Por exemplo, será que mulheres negras acabam vítimas de
homicídios muito mais que as brancas?</p>
<p>Os dados nos possibilitam também enxergar a distribuição geográfica, que áreas
da cidade são as mais violentas etc.</p>
<p>E, por fim, é interessante visualizar como o número de vítimas evolui no tempo.
Será que vem declinando com o passar dos anos?</p>
<h1>
  Evolução do número de vítimas no tempo
</h1>
<p>Esse é um bom ponto para se começar a entender os dados. Vamos fazer essa
visualização com um gráfico de linhas:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">lubridate</span><span class="p">)</span>

<span class="c1"># configurando o tema</span>
<span class="nf">theme_set</span><span class="p">(</span><span class="nf">theme_minimal</span><span class="p">())</span>
<span class="nf">theme_update</span><span class="p">(</span><span class="n">legend.position</span> <span class="o">=</span> <span class="s">&#34;bottom&#34;</span><span class="p">)</span>

<span class="c1"># criando a variável pro ano</span>
<span class="n">df</span> <span class="o">&lt;-</span> <span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">ano</span> <span class="o">=</span> <span class="nf">year</span><span class="p">(</span><span class="n">data</span><span class="p">))</span>

<span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">ano</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">ano</span><span class="p">,</span>
    <span class="n">y</span> <span class="o">=</span> <span class="n">n</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_line</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="s">&#34;\nAno&#34;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Número de homicídios na cidade de Baltimore por ano&#34;</span>
  <span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-2-1.png" alt="plot1"></p>
<p>Ok, uma boa notícia, parece que o número de homicídios vem reduzindo com os
anos…</p>
<p>Exceto por essa queda brusca em 2012, que deveria gerar suspeitas. De fato, essa
queda será esclarecida por outra visualização mais adiante. Se desconsiderarmos
2012, o quadro da violência não parece apresentar melhoras tão significativas.</p>
<p>É interessante visualizar também como isso se deu para as diferentes raças:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="c1"># contagem dos casos por raça e ano</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">raca</span><span class="p">,</span> <span class="n">ano</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">ano</span><span class="p">,</span>
    <span class="n">y</span> <span class="o">=</span> <span class="n">n</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">raca</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Raça das vítimas de homicídios em Baltimore&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_brewer</span><span class="p">(</span><span class="n">palette</span> <span class="o">=</span> <span class="s">&#34;Set1&#34;</span><span class="p">,</span> <span class="n">name</span> <span class="o">=</span> <span class="s">&#34;Raça&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_x_continuous</span><span class="p">(</span><span class="n">breaks</span> <span class="o">=</span> <span class="m">2007</span><span class="o">:</span><span class="m">2012</span><span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-3-1.png" alt="plot2"><!-- --></p>
<p>Essa é a primeira visualização do que já era esperado: na cidade de Baltimore, a
violência afeta muito mais os negros do que a qualquer outra raça. Impressiona a
magnitude da desigualdade.</p>
<p>Um gráfico interessante que vi <a href="https://homicides.news.baltimoresun.com/">aqui</a>,
foi o do crescimento acumulado do número de vítimas por mês para cada ano, que
tentei replicar abaixo:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">acumulado</span> <span class="o">&lt;-</span> <span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">mes</span> <span class="o">=</span> <span class="nf">month</span><span class="p">(</span><span class="n">data</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">ano</span><span class="p">,</span> <span class="n">mes</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">group_by</span><span class="p">(</span><span class="n">ano</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">soma_cumulativa</span> <span class="o">=</span> <span class="nf">cumsum</span><span class="p">(</span><span class="n">n</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">na.omit</span><span class="p">()</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">mes</span><span class="p">,</span>
    <span class="n">y</span> <span class="o">=</span> <span class="n">soma_cumulativa</span><span class="p">,</span>
    <span class="n">color</span> <span class="o">=</span> <span class="nf">factor</span><span class="p">(</span><span class="n">ano</span><span class="p">),</span>
    <span class="n">group</span> <span class="o">=</span> <span class="n">ano</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">scale_color_brewer</span><span class="p">(</span><span class="n">palette</span> <span class="o">=</span> <span class="s">&#34;Dark2&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">y</span> <span class="o">=</span> <span class="s">&#34;# acumulado de homicídios\n&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Evolução temporal dos homicídios em Baltimore&#34;</span><span class="p">,</span>
    <span class="n">color</span> <span class="o">=</span> <span class="s">&#34;Ano&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_line</span><span class="p">(</span><span class="n">size</span> <span class="o">=</span> <span class="m">1.2</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_x_continuous</span><span class="p">(</span>
    <span class="n">breaks</span> <span class="o">=</span> <span class="m">1</span><span class="o">:</span><span class="m">12</span><span class="p">,</span>
    <span class="n">labels</span> <span class="o">=</span> <span class="nf">month</span><span class="p">(</span><span class="n">df</span><span class="o">$</span><span class="n">data</span><span class="p">,</span> <span class="n">label</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span> <span class="o">%&gt;%</span> <span class="nf">levels</span><span class="p">()</span>
  <span class="p">)</span>


<span class="n">acumulado</span>
</code></pre></div><p><img src="./unnamed-chunk-4-1.png" alt="plot3"><!-- --></p>
<p>E aqui fica claro o porquê da queda em 2012: não temos os dados de todos os
meses. Também salta aos olhos que a violência diminuiu em relação a 2007, mas se
manteve mais ou menos estável no resto do período.</p>
<h1>
  Aspectos sociais das vítimas
</h1>
<p>Vamos tentar visualizar agora como a violência afeta as pessoas de diferentes
grupos:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">idade</span><span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_histogram</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">fill</span> <span class="o">=</span> <span class="n">raca</span><span class="p">),</span>
    <span class="n">binwidth</span> <span class="o">=</span> <span class="m">5</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">facet_grid</span><span class="p">(</span><span class="n">. </span><span class="o">~</span> <span class="n">genero</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_brewer</span><span class="p">(</span><span class="n">palette</span> <span class="o">=</span> <span class="s">&#34;Set1&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="s">&#34;Idade&#34;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="s">&#34;Raça&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Número de homicídios na cidade de Baltimore&#34;</span><span class="p">,</span>
    <span class="n">subtitle</span> <span class="o">=</span> <span class="s">&#34;Por gênero, raça e idade (de 2007 até maio de 2012)&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_x_continuous</span><span class="p">(</span><span class="n">breaks</span> <span class="o">=</span> <span class="nf">seq</span><span class="p">(</span><span class="m">0</span><span class="p">,</span> <span class="m">100</span><span class="p">,</span> <span class="m">10</span><span class="p">))</span>
</code></pre></div><p><img src="./unnamed-chunk-5-1.png" alt="plot3"><!-- --></p>
<p>E assim podemos ver que o mais afetado pela violência é o homem negro da faixa
dos 20-30 anos. Se olharmos bem, pode-se também observar que a mulher negra está
em posição mais vulnerável à violência que a branca, provavelmente porque vive
nas regiões onde a violência é maior.</p>
<p>Também impressiona o contraste entre os números para cada gênero. Os homens são
muito mais propensos a serem mortos violentamente.</p>
<h1>
  Que causa de morte é a mais comum?
</h1>
<p>Para ver quais são as causas mais comuns, vamos fazer um simples gráfico de
barras:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">causas</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">causas</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_bar</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="s">&#34;Causas&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Causas de morte mais comuns&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_brewer</span><span class="p">(</span><span class="n">palette</span> <span class="o">=</span> <span class="s">&#34;Set1&#34;</span><span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-6-1.png" alt="plot5"><!-- --></p>
<p>Os homicídios por armas de fogo são de longe os mais comuns, seguido por
esfaqueamento e contusão.</p>
<h1>
  Mapas e animações
</h1>
<p>Para visualizar a distribuição geográfica da ocorrência de homicídios, temos que
primeiro plotar o mapa da cidade. O código abaixo mostra como fazer isso, com a
ajuda do dataset <code>county</code> do pacote <code>maps</code>, de onde extraímos as coordenadas
geográficas, para depois plotar com <code>geom_polyon()</code>.</p>
<p>Uma vez com o mapa, minha ideia foi criar uma animação para visualizar o aspecto
temporal, espacial e qualitativo (nesse caso, pela raça das vítimas) com um
único gráfico. Para isso, vamos usar a função <code>gganimate::transition_manual</code>, de
forma a mostrar por mês o crescimento no número de vítimas:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">gganimate</span><span class="p">)</span>

<span class="c1"># mapa de baltimore city</span>
<span class="n">baltimore_map</span> <span class="o">&lt;-</span> <span class="nf">map_data</span><span class="p">(</span><span class="s">&#34;county&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="n">subregion</span> <span class="o">==</span> <span class="s">&#34;baltimore city&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">long</span><span class="p">,</span> <span class="n">lat</span><span class="p">,</span> <span class="n">group</span> <span class="o">=</span> <span class="n">group</span><span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_polygon</span><span class="p">(</span><span class="n">fill</span> <span class="o">=</span> <span class="s">&#34;lightgray&#34;</span><span class="p">,</span> <span class="n">color</span> <span class="o">=</span> <span class="s">&#34;black&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">coord_map</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">theme_void</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">theme</span><span class="p">(</span><span class="n">legend.position</span> <span class="o">=</span> <span class="s">&#34;bottom&#34;</span><span class="p">)</span>

<span class="c1"># criando variável para cada mês de cada ano</span>
<span class="n">df</span> <span class="o">&lt;-</span> <span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">arrange</span><span class="p">(</span><span class="n">data</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">ano_mes</span> <span class="o">=</span> <span class="nf">format</span><span class="p">(</span><span class="n">data</span><span class="p">,</span> <span class="s">&#34;%B de %Y&#34;</span><span class="p">))</span>

<span class="c1"># criando a animação</span>
<span class="n">anim</span> <span class="o">&lt;-</span> <span class="n">baltimore_map</span> <span class="o">+</span>
  <span class="nf">geom_point</span><span class="p">(</span>
    <span class="n">data</span> <span class="o">=</span> <span class="n">df</span><span class="p">,</span>
    <span class="nf">aes</span><span class="p">(</span><span class="n">lon</span><span class="p">,</span>
      <span class="n">lat</span><span class="p">,</span>
      <span class="n">group</span> <span class="o">=</span> <span class="n">ano_mes</span><span class="p">,</span>
      <span class="n">color</span> <span class="o">=</span> <span class="n">raca</span>
    <span class="p">),</span>
    <span class="n">size</span> <span class="o">=</span> <span class="m">3.5</span><span class="p">,</span> <span class="n">alpha</span> <span class="o">=</span> <span class="m">.7</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Que raças e regiões são mais vulneráveis ao homicídio?&#34;</span><span class="p">,</span>
    <span class="n">subtitle</span> <span class="o">=</span> <span class="s">&#34;{ current_frame }&#34;</span><span class="p">,</span>
    <span class="n">color</span> <span class="o">=</span> <span class="s">&#34;Raça&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_color_brewer</span><span class="p">(</span><span class="n">palette</span> <span class="o">=</span> <span class="s">&#34;Set1&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">transition_manual</span><span class="p">(</span><span class="nf">factor</span><span class="p">(</span><span class="n">ano_mes</span><span class="p">,</span> <span class="c1"># ordernando os meses</span>
    <span class="n">levels</span> <span class="o">=</span> <span class="nf">unique</span><span class="p">(</span><span class="n">ano_mes</span><span class="p">)</span>
  <span class="p">),</span>
  <span class="n">cumulative</span> <span class="o">=</span> <span class="bp">T</span>
  <span class="p">)</span>

<span class="c1"># desacelerando a animação (padrão é 10fps)</span>
<span class="nf">animate</span><span class="p">(</span><span class="n">anim</span><span class="p">,</span> <span class="n">fps</span> <span class="o">=</span> <span class="m">5</span><span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-7-1.gif" alt="gif1"><!-- --></p>
<p>Fica evidente daí como a violência é concentrada em certos bairros.</p>
<p>Outra ideia é visualizar a evolução dos homicídios no tempo, por causa de morte.
Para isso, vamos usar ot <code>gganimate::transition_states</code>, para visualizarmos as
mudanças ocorridas no decorrer dos anos.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">df</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">ano</span><span class="p">,</span> <span class="n">causas</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="n">causas</span><span class="p">,</span>
    <span class="n">y</span> <span class="o">=</span> <span class="n">n</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">causas</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">(</span><span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_text</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">label</span> <span class="o">=</span> <span class="nf">paste0</span><span class="p">(</span><span class="s">&#34;&#34;</span><span class="p">,</span> <span class="nf">round</span><span class="p">(</span><span class="n">n</span><span class="p">)),</span>
    <span class="n">hjust</span> <span class="o">=</span> <span class="m">-0.2</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">coord_flip</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span> <span class="n">fill</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Causas de morte mais comuns&#34;</span><span class="p">,</span>
    <span class="n">subtitle</span> <span class="o">=</span> <span class="s">&#34;Ano: { closest_state }&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">transition_states</span><span class="p">(</span><span class="n">ano</span><span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-8-1.gif" alt="gif2"><!-- --></p>
<p>E que tal animarmos aquele gráfico do número acumulado? Vamos usar o
<code>gganimate::transition_reveal()</code> para revelar ao longo do eixo do tempo como os
números crescem.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">acumulado</span> <span class="o">+</span>
  <span class="nf">geom_segment</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">xend</span> <span class="o">=</span> <span class="m">12.5</span><span class="p">,</span>
    <span class="n">yend</span> <span class="o">=</span> <span class="n">soma_cumulativa</span>
  <span class="p">),</span>
  <span class="n">linetype</span> <span class="o">=</span> <span class="m">2</span><span class="p">,</span> <span class="n">color</span> <span class="o">=</span> <span class="s">&#34;grey&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_text</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">x</span> <span class="o">=</span> <span class="m">13</span><span class="p">,</span> <span class="n">label</span> <span class="o">=</span> <span class="nf">paste0</span><span class="p">(</span><span class="s">&#34;&#34;</span><span class="p">,</span> <span class="n">soma_cumulativa</span><span class="p">)))</span> <span class="o">+</span>
  <span class="nf">transition_reveal</span><span class="p">(</span><span class="n">mes</span><span class="p">)</span>
</code></pre></div><p><img src="./unnamed-chunk-9-1.gif" alt="gif3"><!-- --></p>
<h1>
  Conclusões
</h1>
<p>Este post é certamente só uma amostra do pontecial do combo ggplot2 + gganimate,
talvez uma das maiores vantagens de se usar o R, e espero que te ajude a criar
as suas próprias visualizações, apesar de não ter sido exatamente o intuito ser
didático.</p>
<p>O gganimate é bem novo ainda e tem relativamente pouca informação sobre na
internet. Eu demorei bastante para fazer alguns desses gráficos, mas acho que o
resultado valeu a pena.</p>
<p>Para aprender mais sobre ggplot2, tente este
<a href="http://www.cookbook-r.com/Graphs/">cookbook</a> é ótimo. Para maiores referências
sobre animações, tente o respositório
<a href="https://github.com/ropenscilabs/learngganimate">learngganimate</a>, esse
<a href="https://cran.r-project.org/web/packages/gganimate/vignettes/gganimate.html">vignette</a>
ou o próprio <a href="https://gganimate.com/">site do pacote</a>.</p>
