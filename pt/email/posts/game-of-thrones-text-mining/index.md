# [Mineração de Texto com as legendas de Game of Thrones](https://phelipetls.github.io/pt/posts/game-of-thrones-text-mining/)

April 20, 2019 · 12 min. read time

---

<p>Neste post procuro visualizar dados textuais das legendads de Game of Thrones
com o R, utilizando o pacote <a href="https://www.tidytextmining.com"><code>tidytext</code></a>, que
torna trivial esse tipo de tarefa.</p>
<p>A ideia é transformar um bloco de texto, como um livro, em um tidy DataFrame. No
nosso, caso faremos com as legendas de GOT.</p>
<h1>
  Obtendo os dados
</h1>
<p>Os dados brutos foram coletados
<a href="https://www.kaggle.com/gunnvant/game-of-thrones-srt">aqui</a>, formato JSON. São 7
arquivos, que contêm todas as legendas para as sete temporadas de GOT.
Felizmente, há uma biblioteca para ler arquivos JSON no R, o <code>jsonlite</code>.</p>
<p>No código abaixo, o que fiz foi ler cada arquivo, aplicando a função
<code>jsonlite::fromJSON()</code> a cada um deles com <code>purrr::map()</code>, o que me dá uma
lista. Depois, transformei essa lista em um vetor com <code>unlist()</code>, que por fim
transformei em um data.frame com <code>tibble::enframe()</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">jsonlite</span><span class="p">)</span>
<span class="nf">library</span><span class="p">(</span><span class="n">tidyverse</span><span class="p">)</span>

<span class="nf">setwd</span><span class="p">(</span><span class="s">&#34;~/got_subtitles/&#34;</span><span class="p">)</span>

<span class="c1"># vetor com o endereço dos arquivos</span>
<span class="n">arquivos</span> <span class="o">&lt;-</span> <span class="nf">dir</span><span class="p">(</span><span class="n">path</span> <span class="o">=</span> <span class="nf">getwd</span><span class="p">(),</span> <span class="n">pattern</span> <span class="o">=</span> <span class="s">&#34;json$&#34;</span><span class="p">,</span> <span class="n">full.names</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span>

<span class="c1"># lendo os arquivos</span>
<span class="n">got_subs_raw</span> <span class="o">&lt;-</span> <span class="nf">map</span><span class="p">(</span><span class="n">arquivos</span><span class="p">,</span> <span class="o">~</span> <span class="nf">fromJSON</span><span class="p">(</span><span class="n">.x</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">unlist</span><span class="p">()</span> <span class="o">%&gt;%</span>
  <span class="nf">enframe</span><span class="p">()</span>

<span class="n">got_subs_raw</span>
</code></pre></div><pre><code>## # A tibble: 44,890 x 2
##    name                             value
##    &lt;chr&gt;                            &lt;chr&gt;
##  1 Game Of Thrones S01E01 Winter I~ Easy, boy.
##  2 Game Of Thrones S01E01 Winter I~ Our orders were to track the wildlings.
##  3 Game Of Thrones S01E01 Winter I~ - Right. Give it here. - No!
##  4 Game Of Thrones S01E01 Winter I~ Put away your blade.
##  5 Game Of Thrones S01E01 Winter I~ - I take orders from your father, not ~
##  6 Game Of Thrones S01E01 Winter I~ I'm sorry, Bran.
##  7 Game Of Thrones S01E01 Winter I~ Lord Stark?
##  8 Game Of Thrones S01E01 Winter I~ There are five pups.
##  9 Game Of Thrones S01E01 Winter I~ One for each of the Stark children.
## 10 Game Of Thrones S01E01 Winter I~ The direwolf is the sigil of your hous~
## # ... with 44,880 more rows
</code></pre>
<p>Agora vamos limpar esse DataFrame, procurando extrair variáveis interessantes
como temporada, número e nome do episódio etc.</p>
<p>Primeiro vamos retirar o prefixo &lsquo;Game of Throns S&rsquo;, o que nos deixa com &lsquo;01E01
Winter Is Coming&rsquo;, &lsquo;{Temporada}E{Episódio} {Nome do episódio}&rsquo;. Vamos usar
regexes para extrair cada parte individualmente.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_subs</span> <span class="o">&lt;-</span> <span class="n">got_subs_raw</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span>
    <span class="n">name</span> <span class="o">=</span> <span class="nf">str_remove</span><span class="p">(</span><span class="n">name</span><span class="p">,</span> <span class="s">&#34;Game Of Thrones S&#34;</span><span class="p">),</span>
    <span class="n">season_episode</span> <span class="o">=</span> <span class="nf">str_extract</span><span class="p">(</span><span class="n">name</span><span class="p">,</span> <span class="s">&#34;\\d+E\\d+&#34;</span><span class="p">),</span>
    <span class="n">name</span> <span class="o">=</span> <span class="nf">str_match</span><span class="p">(</span><span class="n">name</span><span class="p">,</span> <span class="s">&#34;([A-z,&#39; ]+)\\.srt&#34;</span><span class="p">)</span><span class="n">[</span><span class="p">,</span> <span class="m">2</span><span class="n">]</span> <span class="o">%&gt;%</span> <span class="nf">trimws</span><span class="p">()</span>
  <span class="p">)</span> <span class="o">%&gt;%</span>

  <span class="c1"># separando a temporada do episódio</span>
  <span class="nf">separate</span><span class="p">(</span><span class="n">season_episode</span><span class="p">,</span> <span class="nf">c</span><span class="p">(</span><span class="s">&#34;season&#34;</span><span class="p">,</span> <span class="s">&#34;episode&#34;</span><span class="p">),</span> <span class="n">sep</span> <span class="o">=</span> <span class="s">&#34;E&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>

  <span class="c1"># transformando o que é número para numeric</span>
  <span class="nf">mutate</span><span class="p">(</span>
    <span class="n">season</span> <span class="o">=</span> <span class="nf">as.numeric</span><span class="p">(</span><span class="n">season</span><span class="p">),</span>
    <span class="n">episode</span> <span class="o">=</span> <span class="nf">as.numeric</span><span class="p">(</span><span class="n">episode</span><span class="p">)</span>
  <span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="n">season</span><span class="p">,</span> <span class="n">episode</span><span class="p">,</span> <span class="n">name</span><span class="p">,</span> <span class="n">value</span><span class="p">)</span>

<span class="n">got_subs</span>
</code></pre></div><pre><code>## # A tibble: 44,890 x 4
##    season episode name          value
##     &lt;dbl&gt;   &lt;dbl&gt; &lt;chr&gt;         &lt;chr&gt;
##  1      1       1 Winter Is Co~ Easy, boy.
##  2      1       1 Winter Is Co~ Our orders were to track the wildlings.
##  3      1       1 Winter Is Co~ - Right. Give it here. - No!
##  4      1       1 Winter Is Co~ Put away your blade.
##  5      1       1 Winter Is Co~ - I take orders from your father, not you.~
##  6      1       1 Winter Is Co~ I'm sorry, Bran.
##  7      1       1 Winter Is Co~ Lord Stark?
##  8      1       1 Winter Is Co~ There are five pups.
##  9      1       1 Winter Is Co~ One for each of the Stark children.
## 10      1       1 Winter Is Co~ The direwolf is the sigil of your house.
## # ... with 44,880 more rows
</code></pre>
<p>Podemos tornar isso se quebrarmos a coluna <code>value</code> em unidades menores, como
palavras. O pacote <code>tidytext</code> tem uma função para isso, chamada <code>unnest_tokens</code>.
É mais geral e pode servir para separar um texto em caracteres, frases,
parágrafos etc.</p>
<p>Será útil também a função <code>rownames_to_column</code>, para podermos saber quais
palavras pertencem à mesma frase após a separação etc.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">tidytext</span><span class="p">)</span>

<span class="n">got_words</span> <span class="o">&lt;-</span> <span class="n">got_subs</span> <span class="o">%&gt;%</span>
  <span class="nf">rownames_to_column</span><span class="p">()</span> <span class="o">%&gt;%</span>
  <span class="nf">unnest_tokens</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">value</span><span class="p">)</span>

<span class="n">got_words</span>
</code></pre></div><pre><code>## # A tibble: 286,901 x 5
##    rowname season episode name             word
##    &lt;chr&gt;    &lt;dbl&gt;   &lt;dbl&gt; &lt;chr&gt;            &lt;chr&gt;
##  1 1            1       1 Winter Is Coming easy
##  2 1            1       1 Winter Is Coming boy
##  3 2            1       1 Winter Is Coming our
##  4 2            1       1 Winter Is Coming orders
##  5 2            1       1 Winter Is Coming were
##  6 2            1       1 Winter Is Coming to
##  7 2            1       1 Winter Is Coming track
##  8 2            1       1 Winter Is Coming the
##  9 2            1       1 Winter Is Coming wildlings
## 10 3            1       1 Winter Is Coming right
## # ... with 286,891 more rows
</code></pre>
<p>Vamos contar quais são as palavras mais comuns:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">sort</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 9,695 x 2
##    word      n
##    &lt;chr&gt; &lt;int&gt;
##  1 the   11856
##  2 you   10585
##  3 i     10267
##  4 to     7864
##  5 a      6006
##  6 and    5064
##  7 of     4430
##  8 your   3342
##  9 my     3234
## 10 it     2962
## # ... with 9,685 more rows
</code></pre>
<p>A maioria são preposições, pronomes etc., o que não é muito interessante.
Felizmente, isso é muito facilmente resolvido por esse pacote. Basta rodar um
<code>dplyr::anti_join</code> com um dataset que contém essas palavras, conhecidas como
‘stop words’.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_words</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">anti_join</span><span class="p">(</span><span class="n">stop_words</span><span class="p">)</span>
</code></pre></div><pre><code>## Joining, by = &quot;word&quot;
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">sort</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 9,079 x 2
##    word        n
##    &lt;chr&gt;   &lt;int&gt;
##  1 lord     1133
##  2 king      831
##  3 father    693
##  4 grace     517
##  5 time      513
##  6 lady      510
##  7 north     412
##  8 stark     409
##  9 people    394
## 10 brother   393
## # ... with 9,069 more rows
</code></pre>
<p>E aqui vemos algo mais específico de GOT, mas essas palavras são assim tão
frequentes por serem pronomes de tratamento de GOT, são as stop words desse
universo. Por isso, achei prudente retirá-las.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_stop_words</span> <span class="o">&lt;-</span> <span class="nf">c</span><span class="p">(</span>
  <span class="s">&#34;father&#34;</span><span class="p">,</span> <span class="s">&#34;mother&#34;</span><span class="p">,</span> <span class="s">&#34;queen&#34;</span><span class="p">,</span> <span class="s">&#34;king&#34;</span><span class="p">,</span>
  <span class="s">&#34;boy&#34;</span><span class="p">,</span> <span class="s">&#34;girl&#34;</span><span class="p">,</span> <span class="s">&#34;lord&#34;</span><span class="p">,</span> <span class="s">&#34;lady&#34;</span><span class="p">,</span> <span class="s">&#34;son&#34;</span><span class="p">,</span> <span class="s">&#34;sister&#34;</span><span class="p">,</span>
  <span class="s">&#34;grace&#34;</span><span class="p">,</span> <span class="s">&#34;ser&#34;</span><span class="p">,</span> <span class="s">&#34;brother&#34;</span><span class="p">,</span> <span class="s">&#34;sister&#34;</span><span class="p">,</span> <span class="s">&#34;king&#39;s&#34;</span>
<span class="p">)</span>

<span class="n">got_words</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="o">!</span><span class="p">(</span><span class="n">word</span> <span class="o">%in%</span> <span class="n">got_stop_words</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">add_count</span><span class="p">(</span><span class="n">word</span><span class="p">)</span>

<span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">sort</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 9,065 x 2
##    word       n
##    &lt;chr&gt;  &lt;int&gt;
##  1 time     513
##  2 north    412
##  3 stark    409
##  4 people   394
##  5 dead     375
##  6 kill     349
##  7 fight    313
##  8 told     295
##  9 die      284
## 10 life     278
## # ... with 9,055 more rows
</code></pre>
<p>E aqui as coisas começam a ficar interessantes!</p>
<p>A <a href="./got_words.csv">base limpa com essas palavras pode ser baixada aqui</a>.</p>
<h1>
  Correlação entre as palavras
</h1>
<p>Agora, vamos visualizar quais as palavras que aparecem juntas com mais
frequência, com a função <code>pairwise_cor</code> do pacote <code>widyr</code>.</p>
<p>Só precisamos filtrar nossa base antes, porque não queremos que o R compare cada
par de 81579 palavras: escolheremos as palavras que apareçam 50 vezes ou mais.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">widyr</span><span class="p">)</span>

<span class="n">word_pairs</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">add_count</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="n">n</span> <span class="o">&gt;=</span> <span class="m">50</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">pairwise_cor</span><span class="p">(</span><span class="n">word</span><span class="p">,</span>
    <span class="n">rowname</span><span class="p">,</span>
    <span class="n">sort</span> <span class="o">=</span> <span class="bp">T</span>
  <span class="p">)</span>

<span class="n">word_pairs</span>
</code></pre></div><pre><code>## # A tibble: 109,892 x 3
##    item1    item2    correlation
##    &lt;chr&gt;    &lt;chr&gt;          &lt;dbl&gt;
##  1 color    font           0.968
##  2 font     color          0.968
##  3 rock     casterly       0.908
##  4 casterly rock           0.908
##  5 watch    night's        0.674
##  6 night's  watch          0.674
##  7 white    walkers        0.639
##  8 walkers  white          0.639
##  9 jon      snow           0.540
## 10 snow     jon            0.540
## # ... with 109,882 more rows
</code></pre>
<p>Dentre alguns resultado interessantes, nos deparamos com um bastante anormal.
color font? font color? Isso é código HTML usado para formatação que acabou
entrando no documento, que eventualmente serão ignoradas.</p>
<p>Para visualizar essas relações, vamos usar grafos. Nele as palavras são nós e os
vértices as corrrelações (um vértice mais escuro indica uma correlação mais
alta), teremos assim uma network dos top 100 par de palavras mais
correlacionados entre si.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">ggraph</span><span class="p">)</span>
<span class="nf">library</span><span class="p">(</span><span class="n">igraph</span><span class="p">)</span>

<span class="nf">set.seed</span><span class="p">(</span><span class="m">0</span><span class="p">)</span>

<span class="n">word_pairs</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="o">!</span><span class="p">(</span><span class="n">item1</span> <span class="o">%in%</span> <span class="nf">c</span><span class="p">(</span><span class="s">&#34;font&#34;</span><span class="p">,</span> <span class="s">&#34;color&#34;</span><span class="p">,</span> <span class="s">&#34;game&#34;</span><span class="p">)))</span> <span class="o">%&gt;%</span>
  <span class="nf">top_n</span><span class="p">(</span><span class="m">100</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">graph_from_data_frame</span><span class="p">()</span> <span class="o">%&gt;%</span>
  <span class="nf">ggraph</span><span class="p">(</span><span class="n">layout</span> <span class="o">=</span> <span class="s">&#34;fr&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_edge_link</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">edge_alpha</span> <span class="o">=</span> <span class="n">correlation</span><span class="p">),</span>
    <span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_node_point</span><span class="p">(</span>
    <span class="n">color</span> <span class="o">=</span> <span class="s">&#34;skyblue&#34;</span><span class="p">,</span>
    <span class="n">size</span> <span class="o">=</span> <span class="m">3</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">geom_node_text</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">label</span> <span class="o">=</span> <span class="n">name</span><span class="p">),</span>
    <span class="n">repel</span> <span class="o">=</span> <span class="bp">T</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">theme_void</span><span class="p">()</span>
</code></pre></div><p><img src="./grafo-de-palavras.png" alt="Grafo das palavras mais comuns em Game of Thrones"><!-- --></p>
<h1>
  Palavras mais frequentes
</h1>
<p>Agora, vamos visualizar quais as palavras mais frequentes em geral e por
temporada. Para isso vamos utilizar nuvem de palavras.</p>
<p>O em geral primeiro. Vamos ver quais são as top 50 palavras em uma nuvem, com a
função <code>wordcloud::wordcloud</code>, que toma como argumentos principais um vetor de
palavras e um de frequências.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">wordcloud</span><span class="p">)</span>
<span class="nf">library</span><span class="p">(</span><span class="n">RColorBrewer</span><span class="p">)</span>

<span class="n">paleta</span> <span class="o">&lt;-</span> <span class="nf">brewer.pal</span><span class="p">(</span><span class="m">6</span><span class="p">,</span> <span class="s">&#34;Dark2&#34;</span><span class="p">)</span>

<span class="nf">set.seed</span><span class="p">(</span><span class="m">99</span><span class="p">)</span>

<span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">word</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">with</span><span class="p">(</span><span class="nf">wordcloud</span><span class="p">(</span><span class="n">word</span><span class="p">,</span>
    <span class="n">n</span><span class="p">,</span>
    <span class="n">max.words</span> <span class="o">=</span> <span class="m">50</span><span class="p">,</span>
    <span class="n">colors</span> <span class="o">=</span> <span class="n">paleta</span>
  <span class="p">))</span>
</code></pre></div><p><img src="./nuvem-de-palavras.png" alt="Nuvem de palavras das palavras mais comuns em Game of Thrones"><!-- --></p>
<p>Agora, vamos ver como isso varia para cada temporada, com o pacote
<code>ggwordcloud</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">library</span><span class="p">(</span><span class="n">ggwordcloud</span><span class="p">)</span>

<span class="nf">theme_set</span><span class="p">(</span><span class="nf">theme_minimal</span><span class="p">())</span>

<span class="n">got_words</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="o">!</span><span class="nf">str_detect</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="s">&#34;font|color&#34;</span><span class="p">))</span>

<span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">season</span><span class="p">,</span> <span class="n">word</span><span class="p">,</span> <span class="n">name</span> <span class="o">=</span> <span class="s">&#34;count&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">group_by</span><span class="p">(</span><span class="n">season</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">top_n</span><span class="p">(</span><span class="m">20</span><span class="p">,</span> <span class="n">count</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span>
    <span class="n">label</span> <span class="o">=</span> <span class="n">word</span><span class="p">,</span>
    <span class="n">size</span> <span class="o">=</span> <span class="n">count</span><span class="p">,</span>
    <span class="n">color</span> <span class="o">=</span> <span class="n">count</span> <span class="o">%&gt;%</span> <span class="nf">as.numeric</span><span class="p">()</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_text_wordcloud</span><span class="p">(</span><span class="n">rm_outside</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_size_area</span><span class="p">(</span><span class="n">max_size</span> <span class="o">=</span> <span class="m">10</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_color_viridis_c</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">facet_wrap</span><span class="p">(</span><span class="n">. </span><span class="o">~</span> <span class="n">season</span><span class="p">,</span> <span class="n">nrow</span> <span class="o">=</span> <span class="m">3</span><span class="p">,</span> <span class="n">ncol</span> <span class="o">=</span> <span class="m">3</span><span class="p">)</span>
</code></pre></div><p><img src="./nuvem_de_palavras_por_temporada.png" alt="Nuvem de palavras por temporada"><!-- --></p>
<h1>
  Análise de sentimentos
</h1>
<p>Outra coisa que é interessante de ser feita é analisar o sentimento médio do
texto, se nele há mais palavras consideradas negativas ou positivas etc.</p>
<p>Esse é um tópico delicado teoricamente, já que não é algo tão trivial para um
computador deduzir se uma frase expressa um sentimento bom ou ruim. Não vamos
deixar o computador fazer isso, mas usar um léxico que mapeia palavras a
sentimentos, feito por humanos.</p>
<p>Por exemplo, o léxico <code>afinn</code> classifica algumas mil palavras em uma escala que
varia de -5 (muito negativo) até 5 (muito positivo).</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;afinn&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 2,476 x 2
##    word       score
##    &lt;chr&gt;      &lt;int&gt;
##  1 abandon       -2
##  2 abandoned     -2
##  3 abandons      -2
##  4 abducted      -2
##  5 abduction     -2
##  6 abductions    -2
##  7 abhor         -3
##  8 abhorred      -3
##  9 abhorrent     -3
## 10 abhors        -3
## # ... with 2,466 more rows
</code></pre>
<p>Já esse classifica cada palavra binariamente, em ‘negativa’ ou ‘positiva’,
cobrindo uma porção maior de palavras.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;bing&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 6,788 x 2
##    word        sentiment
##    &lt;chr&gt;       &lt;chr&gt;
##  1 2-faced     negative
##  2 2-faces     negative
##  3 a+          positive
##  4 abnormal    negative
##  5 abolish     negative
##  6 abominable  negative
##  7 abominably  negative
##  8 abominate   negative
##  9 abomination negative
## 10 abort       negative
## # ... with 6,778 more rows
</code></pre>
<p>Outra base possível de ser usada é essa, que cobre muito mais palavras e
categorias, além de ter mais palavras positivas (em relação às negativas) que a
base &lsquo;bing&rsquo;.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;nrc&#34;</span><span class="p">)</span>
</code></pre></div><pre><code>## # A tibble: 13,901 x 2
##    word        sentiment
##    &lt;chr&gt;       &lt;chr&gt;
##  1 abacus      trust
##  2 abandon     fear
##  3 abandon     negative
##  4 abandon     sadness
##  5 abandoned   anger
##  6 abandoned   fear
##  7 abandoned   negative
##  8 abandoned   sadness
##  9 abandonment anger
## 10 abandonment fear
## # ... with 13,891 more rows
</code></pre>
<p>Vamos aplicar a análise de sentimento com as três e ver como elas se
diferenciam.</p>
<p>Vejamos primeiro quais são as palavras negativas e positivas mais comuns.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_bing</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="n">word</span> <span class="o">!=</span> <span class="s">&#34;stark&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="o">-</span><span class="n">rowname</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">inner_join</span><span class="p">(</span><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;bing&#34;</span><span class="p">))</span>
</code></pre></div><pre><code>## Joining, by = &quot;word&quot;
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_bing</span> <span class="o">%&gt;%</span>
  <span class="nf">distinct</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">.keep_all</span> <span class="o">=</span> <span class="bp">T</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">group_by</span><span class="p">(</span><span class="n">sentiment</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">top_n</span><span class="p">(</span><span class="m">10</span><span class="p">,</span> <span class="n">n</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="nf">fct_reorder</span><span class="p">(</span><span class="n">word</span><span class="p">,</span> <span class="n">n</span><span class="p">),</span>
    <span class="n">n</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">sentiment</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">(</span><span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">coord_flip</span><span class="p">()</span> <span class="o">+</span>
  <span class="nf">facet_wrap</span><span class="p">(</span><span class="n">. </span><span class="o">~</span> <span class="n">sentiment</span><span class="p">,</span> <span class="n">scale</span> <span class="o">=</span> <span class="s">&#34;free_y&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="kc">NULL</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Palavras Negativas e Positivas Mais Comuns&#34;</span>
  <span class="p">)</span>
</code></pre></div><p><img src="./palavras-negativas-e-positivas.png" alt="Palavras negativas e positivas"><!-- --></p>
<p>Agora, vamos fazer isso em por temporada e medir o sentimento médio a cada seção
de n palavras.</p>
<p>Vamos usar o dataset <code>afinn</code> e uma seção formada por 25 palavras.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_afinn</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">inner_join</span><span class="p">(</span><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;afinn&#34;</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="o">-</span><span class="n">rowname</span><span class="p">,</span> <span class="o">-</span><span class="n">n</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span>
    <span class="n">row</span> <span class="o">=</span> <span class="nf">row_number</span><span class="p">(),</span>
    <span class="n">section</span> <span class="o">=</span> <span class="n">row</span> <span class="o">%/%</span> <span class="m">25</span>
  <span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ungroup</span><span class="p">()</span>
</code></pre></div><pre><code>## Joining, by = &quot;word&quot;
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_afinn</span> <span class="o">%&gt;%</span>
  <span class="nf">group_by</span><span class="p">(</span><span class="n">season</span><span class="p">,</span> <span class="n">section</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">summarise</span><span class="p">(</span><span class="n">avg_sentiment</span> <span class="o">=</span> <span class="nf">mean</span><span class="p">(</span><span class="n">score</span><span class="p">))</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">section</span><span class="p">,</span>
    <span class="n">avg_sentiment</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">avg_sentiment</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">(</span><span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="s">&#34;Seções&#34;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio\n&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio a cada 25 palavras por temporada&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_gradient2</span><span class="p">(</span>
    <span class="n">low</span> <span class="o">=</span> <span class="s">&#34;firebrick3&#34;</span><span class="p">,</span>
    <span class="n">high</span> <span class="o">=</span> <span class="s">&#34;dodgerblue3&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">facet_wrap</span><span class="p">(</span><span class="n">season</span> <span class="o">~</span> <span class="n">.,</span> <span class="n">scale</span> <span class="o">=</span> <span class="s">&#34;free_x&#34;</span><span class="p">)</span>
</code></pre></div><p><img src="./sentimento-medio-afinn.png" alt="Sentimento médio, método afinn"><!-- --></p>
<p>Em geral, podemos ver que as temporadas foram ficando mais pesadas. Os picos
azuis claros foram ficando cada vez mais raros e os vales vermelhos mais agudos,
chegando a seu clímax na temporada 5, o Walk of Shame.</p>
<p>Vamos tentar o mesmo com as outras duas bases. Como elas classificam as palavras
binariamente, a ideia é calcular o &lsquo;sentimento líquido&rsquo;, o que se entende pela
diferença no número de palavras positivas e negativas, para cada seção.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_bing</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="o">-</span><span class="n">n</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span>
    <span class="n">row</span> <span class="o">=</span> <span class="nf">row_number</span><span class="p">(),</span>
    <span class="n">section</span> <span class="o">=</span> <span class="n">row</span> <span class="o">%/%</span> <span class="m">25</span>
  <span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">season</span><span class="p">,</span> <span class="n">episode</span><span class="p">,</span> <span class="n">section</span><span class="p">,</span> <span class="n">sentiment</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">spread</span><span class="p">(</span><span class="n">sentiment</span><span class="p">,</span> <span class="n">n</span><span class="p">,</span> <span class="n">fill</span> <span class="o">=</span> <span class="m">0</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">net_sentiment</span> <span class="o">=</span> <span class="n">positive</span> <span class="o">-</span> <span class="n">negative</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">section</span><span class="p">,</span>
    <span class="n">net_sentiment</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">net_sentiment</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">(</span><span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_gradient2</span><span class="p">(</span>
    <span class="n">low</span> <span class="o">=</span> <span class="s">&#34;firebrick3&#34;</span><span class="p">,</span>
    <span class="n">high</span> <span class="o">=</span> <span class="s">&#34;navyblue&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">facet_wrap</span><span class="p">(</span><span class="n">. </span><span class="o">~</span> <span class="n">season</span><span class="p">,</span> <span class="n">scale</span> <span class="o">=</span> <span class="s">&#34;free_x&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="s">&#34;Seções&#34;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio\n&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio a cada 25 palavras por temporada&#34;</span><span class="p">,</span>
    <span class="n">subtitle</span> <span class="o">=</span> <span class="s">&#34;Método Bing&#34;</span>
  <span class="p">)</span>
</code></pre></div><p><img src="./sentimento-medio-bing.png" alt="Sentimento médio, método bing"><!-- --></p>
<p>Ok, isso em geral vai de encontro com o que já havíamos visto.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_nrc</span> <span class="o">&lt;-</span> <span class="n">got_words</span> <span class="o">%&gt;%</span>
  <span class="nf">filter</span><span class="p">(</span><span class="n">word</span> <span class="o">!=</span> <span class="s">&#34;stark&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="o">-</span><span class="n">rowname</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">inner_join</span><span class="p">(</span><span class="nf">get_sentiments</span><span class="p">(</span><span class="s">&#34;nrc&#34;</span><span class="p">)</span> <span class="o">%&gt;%</span>
    <span class="nf">filter</span><span class="p">(</span><span class="n">sentiment</span> <span class="o">%in%</span> <span class="nf">c</span><span class="p">(</span><span class="s">&#34;negative&#34;</span><span class="p">,</span> <span class="s">&#34;positive&#34;</span><span class="p">)))</span>
</code></pre></div><pre><code>## Joining, by = &quot;word&quot;
</code></pre>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-r" data-lang="r"><span class="n">got_nrc</span> <span class="o">%&gt;%</span>
  <span class="nf">select</span><span class="p">(</span><span class="o">-</span><span class="n">n</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span>
    <span class="n">row</span> <span class="o">=</span> <span class="nf">row_number</span><span class="p">(),</span>
    <span class="n">section</span> <span class="o">=</span> <span class="n">row</span> <span class="o">%/%</span> <span class="m">25</span>
  <span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">count</span><span class="p">(</span><span class="n">season</span><span class="p">,</span> <span class="n">episode</span><span class="p">,</span> <span class="n">section</span><span class="p">,</span> <span class="n">sentiment</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">spread</span><span class="p">(</span><span class="n">sentiment</span><span class="p">,</span> <span class="n">n</span><span class="p">,</span> <span class="n">fill</span> <span class="o">=</span> <span class="m">0</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">mutate</span><span class="p">(</span><span class="n">net_sentiment</span> <span class="o">=</span> <span class="n">positive</span> <span class="o">-</span> <span class="n">negative</span><span class="p">)</span> <span class="o">%&gt;%</span>
  <span class="nf">ggplot</span><span class="p">(</span><span class="nf">aes</span><span class="p">(</span><span class="n">section</span><span class="p">,</span>
    <span class="n">net_sentiment</span><span class="p">,</span>
    <span class="n">fill</span> <span class="o">=</span> <span class="n">net_sentiment</span>
  <span class="p">))</span> <span class="o">+</span>
  <span class="nf">geom_col</span><span class="p">(</span><span class="n">show.legend</span> <span class="o">=</span> <span class="bp">F</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">scale_fill_gradient2</span><span class="p">(</span>
    <span class="n">low</span> <span class="o">=</span> <span class="s">&#34;firebrick3&#34;</span><span class="p">,</span>
    <span class="n">high</span> <span class="o">=</span> <span class="s">&#34;navyblue&#34;</span>
  <span class="p">)</span> <span class="o">+</span>
  <span class="nf">facet_wrap</span><span class="p">(</span><span class="n">. </span><span class="o">~</span> <span class="n">season</span><span class="p">,</span> <span class="n">scale</span> <span class="o">=</span> <span class="s">&#34;free_x&#34;</span><span class="p">)</span> <span class="o">+</span>
  <span class="nf">labs</span><span class="p">(</span>
    <span class="n">x</span> <span class="o">=</span> <span class="s">&#34;Seções&#34;</span><span class="p">,</span> <span class="n">y</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio\n&#34;</span><span class="p">,</span>
    <span class="n">title</span> <span class="o">=</span> <span class="s">&#34;Sentimento médio a cada 25 palavras por temporada&#34;</span><span class="p">,</span>
    <span class="n">subtitle</span> <span class="o">=</span> <span class="s">&#34;Método NRC&#34;</span>
  <span class="p">)</span>
</code></pre></div><p><img src="./sentimento-medio-nrc.png" alt="Sentimento médio, método NRC"><!-- --></p>
<p>Pera! Já esse nos dá quase que o resultado oposto! De fato, por esse método a
série não parece ser tão negativa quanto os outros haviam sugerido. Isso porque
essa base tem muito mais palavras positivas em relação a negativas. Palavras
como &lsquo;land&rsquo;, &lsquo;prince&rsquo; etc. são nela &lsquo;positivas&rsquo;, enquanto que nas outras, não.
Por ter mais palavras, aumentam também o número de seções.</p>
<p>Enfim, esse é um ponto delicado, incluído aqui somente por ser interessante em
si mesmo.</p>
