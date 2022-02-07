# [Web Scraping de páginas dinâmicas com Python](https://phelipetls.github.io/pt/posts/web-scraping-de-paginas-dinamicas/)

August 18, 2019 · 3 min. read time

---

<p>Web scraping pode ficar bem complicado quando a página é dinâmica, você não mais
precisa somente carregar o código-fonte da página mas também precisa esperar o
JavaScript da página construir a página, que é o caso do site do Reclame Aqui.</p>
<p>Nesses casos, precisamos controlar um navegador remotamente por meio de um <em>web
driver</em>, por exemplo, o <code>geckodriver</code> para o Firefox ou <code>chromedriver</code> para o
Chrome.</p>
<p>Para isso, usamos uma biblioteca a partir da qual podemos instruir este
navegador a fazer o que queremos, por exemplo o <code>Selenium</code>.</p>
<p>Pros meus propósitos, usarei o <code>Selenium</code> para abrir uma URL e extrair alguma
informação na página, tarefa para alguma biblioteca que entenda estrutura HTML e
facilite a extração dos elementos, como a <code>BeautifulSoup</code>.</p>
<p>Utilizo essas duas bibliotecas no script abaixo. E podemos instalá-las com:</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-sh" data-lang="sh">pip3 instal selenium bs4
</code></pre></div><p>Para fazer o crawleamento, criei uma classe que aceita o nome de uma empresa e o
web driver a ser utilizado.</p>
<p>Ela tem o método <code>ReclameAqui.extrair_informacoes(n_paginas)</code> que vai extrair os
links e títulos das reclamações das primeiras <code>n_paginas</code>.</p>
<p>Outro método, o <code>ReclameAqui.extrair_descricoes()</code>, abre cada uma dessas URLs e
extrai as descrições das informações.</p>
<p>Para extrair a informação desejada, nós fazemos o <code>BeautifulSoup</code> &ldquo;entender&rdquo; o
código-fonte primeiro para depois usarmos os métodos para extração de algum
element do HTML.</p>
<p>Por exemplo, para extrair o título e os links das reclamações em cada página,
procuramos por parágrafos que contenham a classe <code>text-detail</code>:
(<code>&lt;p class='text-detail'&gt;&lt;/p&gt;</code>), e depois procuramos elementos <code>a</code>, que contém o
título dentro dele e o link dentro do atributo <code>href</code>.</p>
<p>Já para a descrição, procuramos por um elemento <code>div</code> com a classe
<code>complain-body</code>, e extraímos o texto dentro dele.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-python" data-lang="python"><span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">sleep</span>
<span class="kn">from</span> <span class="nn">selenium</span> <span class="kn">import</span> <span class="n">webdriver</span>
<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span> <span class="k">as</span> <span class="n">bs</span>


<span class="k">class</span> <span class="nc">ReclameAqui</span><span class="p">:</span>

    <span class="n">base_url</span> <span class="o">=</span> <span class="s2">&#34;https://www.reclameaqui.com.br/empresa/&#34;</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">driver</span><span class="p">,</span> <span class="n">empresa</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">driver</span> <span class="o">=</span> <span class="n">driver</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">empresa</span> <span class="o">=</span> <span class="n">empresa</span>

    <span class="k">def</span> <span class="nf">extrair_informacoes</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">n_paginas</span><span class="p">):</span>
        <span class="n">url</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">base_url</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">empresa</span> <span class="o">+</span> <span class="s2">&#34;/lista-reclamacoes/?pagina=&#34;</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">reclamacoes</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">titulos</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">links</span> <span class="o">=</span> <span class="p">[],</span> <span class="p">[],</span> <span class="p">[]</span>

        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="n">n_paginas</span> <span class="o">+</span> <span class="mi">1</span><span class="p">):</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">driver</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">url</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">i</span><span class="p">))</span>
            <span class="n">sleep</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
            <span class="n">html</span> <span class="o">=</span> <span class="n">bs</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">driver</span><span class="o">.</span><span class="n">page_source</span><span class="p">,</span> <span class="s2">&#34;html.parser&#34;</span><span class="p">)</span>

            <span class="n">reclamacoes_html</span> <span class="o">=</span> <span class="n">html</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s2">&#34;p&#34;</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;class&#34;</span><span class="p">:</span> <span class="s2">&#34;text-detail&#34;</span><span class="p">})</span>
            <span class="n">reclamacoes_na_pagina</span> <span class="o">=</span> <span class="p">[</span>
                <span class="n">reclamacao</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">split</span><span class="p">(</span><span class="s2">&#34;|&#34;</span><span class="p">)</span> <span class="k">for</span> <span class="n">reclamacao</span> <span class="ow">in</span> <span class="n">reclamacoes_html</span>
            <span class="p">]</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">reclamacoes</span><span class="o">.</span><span class="n">extend</span><span class="p">(</span><span class="n">reclamacoes_na_pagina</span><span class="p">)</span>

            <span class="n">titulos_e_links</span> <span class="o">=</span> <span class="n">html</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span>
                <span class="s2">&#34;a&#34;</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;class&#34;</span><span class="p">:</span> <span class="s2">&#34;link-complain-id-complains&#34;</span><span class="p">}</span>
            <span class="p">)</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">titulos</span><span class="o">.</span><span class="n">extend</span><span class="p">([</span><span class="n">titulo</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span> <span class="k">for</span> <span class="n">titulo</span> <span class="ow">in</span> <span class="n">titulos_e_links</span><span class="p">])</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">links</span><span class="o">.</span><span class="n">extend</span><span class="p">([</span><span class="n">link</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="s2">&#34;href&#34;</span><span class="p">)</span> <span class="k">for</span> <span class="n">link</span> <span class="ow">in</span> <span class="n">titulos_e_links</span><span class="p">])</span>

    <span class="k">def</span> <span class="nf">extrair_descricoes</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="n">urls</span> <span class="o">=</span> <span class="p">[</span><span class="bp">self</span><span class="o">.</span><span class="n">base_url</span> <span class="o">+</span> <span class="n">link</span><span class="p">[</span><span class="mi">1</span><span class="p">:]</span> <span class="k">for</span> <span class="n">link</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">links</span><span class="p">]</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">descricoes</span> <span class="o">=</span> <span class="p">[]</span>
        <span class="k">for</span> <span class="n">url</span> <span class="ow">in</span> <span class="n">urls</span><span class="p">:</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">driver</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">url</span><span class="p">)</span>
            <span class="n">sleep</span><span class="p">(</span><span class="mi">3</span><span class="p">)</span>
            <span class="n">html</span> <span class="o">=</span> <span class="n">bs</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">driver</span><span class="o">.</span><span class="n">page_source</span><span class="p">,</span> <span class="s2">&#34;html.parser&#34;</span><span class="p">)</span>
            <span class="n">descricao</span> <span class="o">=</span> <span class="n">html</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s2">&#34;div&#34;</span><span class="p">,</span> <span class="p">{</span><span class="s2">&#34;class&#34;</span><span class="p">:</span> <span class="s2">&#34;complain-body&#34;</span><span class="p">})</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">descricoes</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">descricao</span><span class="p">)</span>
</code></pre></div><p>Esse código deve funcionar para qualquer empresa contanto que a estrutura do
HTML do ReclameAqui não mude (isto é, o nome das classes e o tipo dos elementos
onde as informações se encontram).</p>

