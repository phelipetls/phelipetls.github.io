# [Getting Salesforce reports with VBA](https://phelipetls.github.io/posts/getting-salesforce-reports-with-vba/)

August 05, 2020 · 9 min. read time

---

<p>For those who find themselves in an environment which heavily relies on Excel
and Salesforce, you may be interested in a way to automate the process of
downloading reports from inside Excel with VBA only.</p>
<p>I think there are probably better tools for the job, like Apex, SOQL query or a
better programming language. I
<a href="https://github.com/reportforce">created a Python package for this purpose</a> but
I didn&rsquo;t use it so much because it&rsquo;s hard to integrate with Excel.</p>
<p>Instead, I looked into a way to do something similar with VBA and I managed to
do it. In this post I&rsquo;ll share this with you.</p>
<h1>
  Authentication
</h1>
<p>The more painless way I know of to
<a href="https://developer.salesforce.com/docs/atlas.en-us.api_asynch.meta/api_asynch/asynch_api_quickstart_login.htm">authenticate your requests for a Salesforce web service is via SOAP API</a>,
with username, password and a security token.</p>
<p>It returns a bunch of XML in the response, but we will only need the session id
(a JWT) inside of it. This is what the function below does.</p>
<p>From here onwards, we will need to authenticate every request by passing the
header <code>Authorization: Bearer $sessionId</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Function</span> <span class="nf">SalesforceLogin</span><span class="p">(</span><span class="n">Username</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                         <span class="n">Password</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                         <span class="n">SecurityToken</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">)</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="k">Dim</span> <span class="n">Request</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Set</span> <span class="n">Request</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;MSXML2.XMLHTTP.6.0&#34;</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">XMLBody</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Dim</span> <span class="n">XMLResponse</span> <span class="ow">As</span> <span class="kt">Object</span>

    <span class="k">Set</span> <span class="n">XMLBody</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;MSXML2.DOMDocument.6.0&#34;</span><span class="p">)</span>
    <span class="k">Set</span> <span class="n">XMLResponse</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;MSXML2.DOMDocument.6.0&#34;</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">Url</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">Body</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">Response</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="n">Url</span> <span class="o">=</span> <span class="s">&#34;https://login.salesforce.com/services/Soap/u/47.0&#34;</span>

    <span class="n">Body</span> <span class="o">=</span> <span class="s">&#34;&lt;?xml version=&#34;&#34;1.0&#34;&#34; encoding=&#34;&#34;utf-8&#34;&#34; ?&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;&lt;env:Envelope xmlns:xsd=&#34;&#34;http://www.w3.org/2001/XMLSchema&#34;&#34;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;    xmlns:xsi=&#34;&#34;http://www.w3.org/2001/XMLSchema-instance&#34;&#34;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;    xmlns:env=&#34;&#34;http://schemas.xmlsoap.org/soap/envelope/&#34;&#34;&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;  &lt;env:Body&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;    &lt;n1:login xmlns:n1=&#34;&#34;urn:partner.soap.sforce.com&#34;&#34;&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;      &lt;n1:username&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">Username</span> <span class="o">&amp;</span> <span class="s">&#34;&lt;/n1:username&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;      &lt;n1:password&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">Password</span> <span class="o">&amp;</span> <span class="n">SecurityToken</span> <span class="o">&amp;</span> <span class="s">&#34;&lt;/n1:password&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;    &lt;/n1:login&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;  &lt;/env:Body&gt;&#34;</span> <span class="o">&amp;</span> <span class="n">vbNewLine</span> <span class="o">&amp;</span> _
           <span class="s">&#34;&lt;/env:Envelope&gt;&#34;</span>

    <span class="n">XMLBody</span><span class="p">.</span><span class="n">LoadXML</span> <span class="n">Body</span>

    <span class="n">Request</span><span class="p">.</span><span class="n">Open</span> <span class="s">&#34;POST&#34;</span><span class="p">,</span> <span class="n">Url</span><span class="p">,</span> <span class="k">False</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">setRequestHeader</span> <span class="s">&#34;Content-Type&#34;</span><span class="p">,</span> <span class="s">&#34;text/xml&#34;</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">setRequestHeader</span> <span class="s">&#34;SOAPAction&#34;</span><span class="p">,</span> <span class="s">&#34;login&#34;</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">send</span> <span class="n">XMLBody</span><span class="p">.</span><span class="n">XML</span>
    <span class="n">Response</span> <span class="o">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">responseText</span>

    <span class="n">XMLResponse</span><span class="p">.</span><span class="n">LoadXML</span> <span class="n">Response</span>
    <span class="n">XMLResponse</span><span class="p">.</span><span class="n">setProperty</span> <span class="s">&#34;SelectionNamespaces&#34;</span><span class="p">,</span> <span class="s">&#34;xmlns:soapenv=&#34;&#34;http://schemas.xmlsoap.org/soap/envelope/&#34;&#34; xmlns:urn=&#34;&#34;urn:partner.soap.sforce.com&#34;&#34;&#34;</span>

    <span class="k">Dim</span> <span class="n">SessionId</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="n">SessionId</span> <span class="o">=</span> <span class="n">XMLResponse</span><span class="p">.</span><span class="n">SelectSingleNode</span><span class="p">(</span><span class="s">&#34;//urn:result/urn:sessionId&#34;</span><span class="p">).</span><span class="n">Text</span>

    <span class="n">SalesforceLogin</span> <span class="o">=</span> <span class="n">SessionId</span>

    <span class="k">Set</span> <span class="n">Request</span> <span class="o">=</span> <span class="k">Nothing</span>

<span class="k">End</span> <span class="k">Function</span>
</code></pre></div><h1>
  Parsing JSON inside VBA?
</h1>
<p>Now, to get an actual report inside Excel we will need to use the Analytics API.
So far, we didn&rsquo;t had to rely on any external tools, there is an XML parser
inside VBA, but not a JSON parser at least that I know of. So we&rsquo;re in trouble
here because that&rsquo;s what Analytics speaks.</p>
<p>Fortunately, there is a
<a href="https://github.com/VBA-tools/VBA-JSON">JSON parser implementation for VBA</a>
which works flawlessly. You just need to download
<a href="https://raw.githubusercontent.com/VBA-tools/VBA-JSON/master/JsonConverter.bas">this file</a>
and import it as a module.</p>
<h1>
  Unfortunate API limitations
</h1>
<p>This API unfortunately have a
<a href="https://developer.salesforce.com/docs/atlas.en-us.api_analytics.meta/api_analytics/sforce_analytics_rest_api_limits_limitations.htm">critical limitation</a>,
which is to return only a maximum of 2000 rows per report. Also, there is no way
to filter by row limits.</p>
<p>This almost turns it useless. The only way I know of is to use a column which
has only unique values and exclude already seen values with a filter, which is
what we&rsquo;ll gonna do.</p>
<h1>
  Getting report metadata
</h1>
<p>To be able to filter a report, we will need to fetch its metadata, which is a
huge JSON with key-value pairs describing the report.</p>
<p>We can get it with a <code>GET</code> request to
<code>https://$YOUR_INSTANCE_URL/services/data/v47.0/analytics/reports/$REPORT_ID/describe</code>.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Function</span> <span class="nf">GetMetadata</span><span class="p">(</span><span class="n">ReportId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> <span class="n">SessionId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">)</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">Request</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Set</span> <span class="n">Request</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;MSXML2.XMLHTTP.6.0&#34;</span><span class="p">)</span>
    <span class="k">Dim</span> <span class="n">Response</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">Url</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="c">&#39; NOTE: You will need your organization URL here
</span><span class="c"></span>    <span class="n">Url</span> <span class="o">=</span>  <span class="n">YOUR_INSTANCE_URL</span> <span class="o">&amp;</span> <span class="s">&#34;/services/data/v47.0/analytics/reports/&#34;</span> <span class="o">&amp;</span> <span class="n">ReportId</span> <span class="o">&amp;</span> <span class="s">&#34;/describe&#34;</span>

    <span class="n">Request</span><span class="p">.</span><span class="n">Open</span> <span class="s">&#34;GET&#34;</span><span class="p">,</span> <span class="n">Url</span><span class="p">,</span> <span class="k">False</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">setRequestHeader</span> <span class="s">&#34;Authorization&#34;</span><span class="p">,</span> <span class="s">&#34;Bearer &#34;</span> <span class="o">&amp;</span> <span class="n">SessionId</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">send</span>

    <span class="n">GetMetadata</span> <span class="o">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">responseText</span>
<span class="k">End</span> <span class="k">Function</span>
</code></pre></div><h1>
  Getting an individual report
</h1>
<p>With the function below, you will be able to get the report in JSON format.</p>
<p>This is achieved with a <code>POST</code> request to
<code>https://$YOUR_INSTANCE_URL/services/data/v47.0/analytics/reports/$REPORT_ID</code>,
optional metadata goes into the request body, this is what we use to filter the
report.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Function</span> <span class="nf">GetReport</span><span class="p">(</span><span class="n">ReportId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                   <span class="n">SessionId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                   <span class="k">Optional</span> <span class="n">Metadata</span> <span class="ow">As</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">&#34;&#34;</span><span class="p">)</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="k">Dim</span> <span class="n">Request</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Set</span> <span class="n">Request</span> <span class="o">=</span> <span class="n">CreateObject</span><span class="p">(</span><span class="s">&#34;MSXML2.XMLHTTP.6.0&#34;</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">Response</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">Url</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="n">Url</span> <span class="o">=</span> <span class="n">YOUR_INSTANCE_URL</span> <span class="o">&amp;</span> _
          <span class="s">&#34;services/data/v47.0/analytics/reports/&#34;</span> <span class="o">&amp;</span> <span class="n">ReportId</span>

    <span class="n">Request</span><span class="p">.</span><span class="n">Open</span> <span class="s">&#34;POST&#34;</span><span class="p">,</span> <span class="n">Url</span><span class="p">,</span> <span class="k">False</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">setRequestHeader</span> <span class="s">&#34;Authorization&#34;</span><span class="p">,</span> <span class="s">&#34;Bearer &#34;</span> <span class="o">&amp;</span> <span class="n">SessionId</span>
    <span class="n">Request</span><span class="p">.</span><span class="n">setRequestHeader</span> <span class="s">&#34;Content-Type&#34;</span><span class="p">,</span> <span class="s">&#34;application/json&#34;</span>

    <span class="k">If</span> <span class="n">Metadata</span> <span class="o">&lt;&gt;</span> <span class="s">&#34;&#34;</span> <span class="k">Then</span>
        <span class="n">Request</span><span class="p">.</span><span class="n">send</span> <span class="p">(</span><span class="n">Metadata</span><span class="p">)</span>
    <span class="k">Else</span>
        <span class="n">Request</span><span class="p">.</span><span class="n">send</span>
    <span class="k">End</span> <span class="k">If</span>

    <span class="n">Response</span> <span class="o">=</span> <span class="n">Request</span><span class="p">.</span><span class="n">responseText</span>

    <span class="n">GetReport</span> <span class="o">=</span> <span class="n">Response</span>
<span class="k">End</span> <span class="k">Function</span>
</code></pre></div><h1>
  Writing the data into a worksheet
</h1>
<p>Now we need to extract the data and write it into a worksheet.</p>
<p><a href="https://developer.salesforce.com/docs/atlas.en-us.api_analytics.meta/api_analytics/sforce_analytics_rest_api_factmap_example.htm" title="Salesforce documentation on how to decode the factMap">Every thing we need is inside the <code>factMap</code> key</a>.
This can get complex if we intend to cover matrix and summary reports, which has
groupings etc., but tabular reports are much simpler.</p>
<p>What we need to do is to iterate through the values at <code>factMap.T!T.rows</code> and,
for each row, get every value inside <code>.dataCells</code> array.</p>
<p>This approach will only cover tabular reports, you can take a look at the
<a href="https://github.com/phelipetls/reportforce/tree/master/reportforce/helpers" title="Source code for reportforce package on a Github repository">reportforce source code</a>
if you need to cover these. By the way, there is an option to export to an Excel
(but not to write to a worksheet, obviously).</p>
<p>The below function takes care of this, its job is to go through every cell and
store it in an array, and then append that array to a worksheet range starting
from column A.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Function</span> <span class="nf">WriteIntoWorksheet</span><span class="p">(</span><span class="n">Report</span> <span class="ow">As</span> <span class="n">Dictionary</span><span class="p">,</span> _
                            <span class="n">WorksheetName</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                            <span class="n">ColumnLabels</span> <span class="ow">As</span> <span class="kt">Variant</span><span class="p">)</span> <span class="ow">As</span> <span class="kt">Variant</span>

    <span class="k">Dim</span> <span class="n">Rows</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Dim</span> <span class="n">Columns</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Dim</span> <span class="n">ColumnInfo</span>

    <span class="k">Set</span> <span class="n">Columns</span> <span class="o">=</span> <span class="n">Report</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;detailColumns&#34;</span><span class="p">)</span>
    <span class="k">Set</span> <span class="n">ColumnInfo</span> <span class="o">=</span> <span class="n">Report</span><span class="p">(</span><span class="s">&#34;reportExtendedMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;detailColumnInfo&#34;</span><span class="p">)</span>
    <span class="k">Set</span> <span class="n">Rows</span> <span class="o">=</span> <span class="n">Report</span><span class="p">(</span><span class="s">&#34;factMap&#34;</span><span class="p">)(</span><span class="s">&#34;T!T&#34;</span><span class="p">)(</span><span class="s">&#34;rows&#34;</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">Total_Rows</span> <span class="ow">As</span> <span class="kt">Long</span><span class="p">:</span> <span class="n">Total_Rows</span> <span class="o">=</span> <span class="n">Rows</span><span class="p">.</span><span class="n">Count</span>
    <span class="k">Dim</span> <span class="n">Total_Columns</span> <span class="ow">As</span> <span class="kt">Long</span><span class="p">:</span> <span class="n">Total_Columns</span> <span class="o">=</span> <span class="n">Columns</span><span class="p">.</span><span class="n">Count</span>

    <span class="k">If</span> <span class="n">Total_Rows</span> <span class="o">=</span> <span class="n">0</span> <span class="k">Then</span>
        <span class="k">Exit</span> <span class="k">Function</span>
    <span class="nf">End</span> <span class="k">If</span>

    <span class="k">Dim</span> <span class="n">Table</span><span class="p">()</span> <span class="ow">As</span> <span class="kt">Variant</span>
    <span class="k">ReDim</span> <span class="n">Table</span><span class="p">(</span><span class="n">Total_Rows</span> <span class="o">-</span> <span class="n">1</span><span class="p">,</span> <span class="n">Total_Columns</span> <span class="o">-</span> <span class="n">1</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">row</span> <span class="ow">As</span> <span class="kt">Variant</span>
    <span class="k">Dim</span> <span class="n">cell</span> <span class="ow">As</span> <span class="kt">Variant</span>

    <span class="k">Dim</span> <span class="n">i</span> <span class="ow">As</span> <span class="kt">Long</span><span class="p">:</span> <span class="n">i</span> <span class="o">=</span> <span class="n">0</span>
    <span class="k">Dim</span> <span class="n">j</span> <span class="ow">As</span> <span class="kt">Long</span>
    <span class="k">Dim</span> <span class="n">dataType</span> <span class="ow">As</span> <span class="kt">String</span>

    <span class="k">For</span> <span class="k">Each</span> <span class="n">row</span> <span class="ow">In</span> <span class="n">Rows</span>
        <span class="n">j</span> <span class="o">=</span> <span class="n">0</span>
        <span class="k">For</span> <span class="k">Each</span> <span class="n">cell</span> <span class="ow">In</span> <span class="n">row</span><span class="p">(</span><span class="s">&#34;dataCells&#34;</span><span class="p">)</span>
            <span class="n">dataType</span> <span class="o">=</span> <span class="n">ColumnInfo</span><span class="p">(</span><span class="n">Columns</span><span class="p">(</span><span class="n">j</span> <span class="o">+</span> <span class="n">1</span><span class="p">))(</span><span class="s">&#34;dataType&#34;</span><span class="p">)</span>

            <span class="c">&#39; If column is a date, get value property;
</span><span class="c"></span>            <span class="c">&#39; Excel understands it better
</span><span class="c"></span>            <span class="k">If</span> <span class="n">dataType</span> <span class="o">=</span> <span class="s">&#34;date&#34;</span> <span class="k">Then</span>
                <span class="n">Table</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="o">=</span> <span class="n">cell</span><span class="p">(</span><span class="s">&#34;value&#34;</span><span class="p">)</span>
            <span class="k">Else</span>
                <span class="n">Table</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="o">=</span> <span class="n">cell</span><span class="p">(</span><span class="s">&#34;label&#34;</span><span class="p">)</span>
            <span class="k">End</span> <span class="k">If</span>

            <span class="n">j</span> <span class="o">=</span> <span class="n">j</span> <span class="o">+</span> <span class="n">1</span>
        <span class="k">Next</span> <span class="n">cell</span>
        <span class="n">i</span> <span class="o">=</span> <span class="n">i</span> <span class="o">+</span> <span class="n">1</span>
    <span class="k">Next</span> <span class="n">row</span>

    <span class="k">With</span> <span class="n">ThisWorkbook</span><span class="p">.</span><span class="n">Worksheets</span><span class="p">(</span><span class="n">WorksheetName</span><span class="p">)</span>
        <span class="k">Dim</span> <span class="n">LastRow</span> <span class="ow">As</span> <span class="kt">Long</span>
        <span class="n">LastRow</span> <span class="o">=</span> <span class="p">.</span><span class="n">Range</span><span class="p">(</span><span class="s">&#34;A:A&#34;</span><span class="p">).</span><span class="n">Find</span><span class="p">(</span><span class="s">&#34;*&#34;</span><span class="p">,</span> _
                                     <span class="n">SearchOrder</span><span class="p">:</span><span class="o">=</span><span class="n">xlByRows</span><span class="p">,</span> _
                                     <span class="n">SearchDirection</span><span class="p">:</span><span class="o">=</span><span class="n">xlPrevious</span><span class="p">).</span><span class="n">row</span>

        <span class="p">.</span><span class="n">Range</span><span class="p">(.</span><span class="n">Cells</span><span class="p">(</span><span class="n">LastRow</span> <span class="o">+</span> <span class="n">1</span><span class="p">,</span> <span class="s">&#34;A&#34;</span><span class="p">),</span> _
               <span class="p">.</span><span class="n">Cells</span><span class="p">(</span><span class="n">Total_Rows</span> <span class="o">+</span> <span class="n">LastRow</span><span class="p">,</span> <span class="n">Total_Columns</span><span class="p">))</span> <span class="o">=</span> <span class="n">Table</span>
    <span class="k">End</span> <span class="k">With</span>

    <span class="n">WriteIntoWorksheet</span> <span class="o">=</span> <span class="n">Table</span>

<span class="k">End</span> <span class="k">Function</span>
</code></pre></div><p>We also need to get the values at <code>.reportMetadata.detailColumns</code> and
<code>reportExtendedMetadata.detailColumnInfo</code> to check how many columns the report
have and to extract the value at <code>.value</code> if it is a date.</p>
<h1>
  Getting the entire report
</h1>
<p>To get the entire report, the key thing to overcome the API limitations is a key
called <code>.allData</code>, which will be <code>true</code> only if we got all the data from the
API.</p>
<p>So we get the first 2000 rows and, if <code>.allData</code> is <code>false</code>, we get the values
of an identifier column, filter them out and request a new report, until we get
all data.</p>
<p>We will modify the keys <code>.reportMetadata.standardDateFilter</code> and
<code>.reportMetadata.reportFilters</code>, to filter dates and other filters respectively.</p>
<p>If your report has a boolean filter, it&rsquo;s likely that you&rsquo;ll need to change it
because we will insert new filters. This is already done in the code by changing
the value at <code>.reportMetadata.reportBooleanFilter</code>, so you only need to pass it
as a parameter.</p>
<p>The function looks way more involved because we have to get the report headers
(the <code>label</code> property of each object inside
<code>.reportExtendedMetadata.detailColumnInfo</code>, the ones you see in the browser).</p>
<p>We also need the identifier column API name (an internal value), which we will
need to filter it.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Sub</span> <span class="nf">DownloadEntireReport</span><span class="p">(</span><span class="n">ReportId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                         <span class="n">WorksheetName</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                         <span class="n">SessionId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> _
                         <span class="k">Optional</span> <span class="n">IdentifierColumn</span> <span class="ow">As</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">&#34;&#34;</span><span class="p">,</span> _
                         <span class="k">Optional</span> <span class="n">BooleanFilter</span> <span class="ow">As</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">&#34;&#34;</span><span class="p">,</span> _
                         <span class="k">Optional</span> <span class="n">startDate</span> <span class="ow">As</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">&#34;&#34;</span><span class="p">,</span> _
                         <span class="k">Optional</span> <span class="n">endDate</span> <span class="ow">As</span> <span class="kt">String</span> <span class="o">=</span> <span class="s">&#34;&#34;</span><span class="p">)</span>

    <span class="k">Dim</span> <span class="n">Report</span> <span class="ow">As</span> <span class="kt">Object</span>

    <span class="k">Dim</span> <span class="n">ReportMetadata</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Set</span> <span class="n">ReportMetadata</span> <span class="o">=</span> <span class="n">JsonConverter</span><span class="p">.</span><span class="n">ParseJson</span><span class="p">(</span><span class="n">GetMetadata</span><span class="p">(</span><span class="n">ReportId</span><span class="p">,</span> <span class="n">SessionId</span><span class="p">))</span>

    <span class="k">Dim</span> <span class="n">IdentifierColumnApiName</span> <span class="ow">As</span> <span class="kt">String</span>
    <span class="k">Dim</span> <span class="n">IdentifierColumnPosition</span> <span class="ow">As</span> <span class="kt">Long</span>

    <span class="k">Dim</span> <span class="n">Col</span> <span class="ow">As</span> <span class="kt">Variant</span>
    <span class="k">Dim</span> <span class="n">i</span> <span class="ow">As</span> <span class="kt">Long</span><span class="p">:</span> <span class="n">i</span> <span class="o">=</span> <span class="n">0</span>

    <span class="k">Dim</span> <span class="n">ColumnDetails</span> <span class="ow">As</span> <span class="kt">Object</span>
    <span class="k">Set</span> <span class="n">ColumnDetails</span> <span class="o">=</span> <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportExtendedMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;detailColumnInfo&#34;</span><span class="p">)</span>

    <span class="c">&#39; This is an array to store the column headers
</span><span class="c"></span>    <span class="k">Dim</span> <span class="n">ColumnLabels</span><span class="p">()</span> <span class="ow">As</span> <span class="kt">Variant</span>
    <span class="k">ReDim</span> <span class="n">ColumnLabels</span><span class="p">(</span><span class="n">0</span><span class="p">,</span> <span class="n">ColumnDetails</span><span class="p">.</span><span class="n">Count</span> <span class="o">-</span> <span class="n">1</span><span class="p">)</span>

    <span class="c">&#39; Collection the column headers
</span><span class="c"></span>    <span class="k">For</span> <span class="k">Each</span> <span class="n">Col</span> <span class="ow">In</span> <span class="n">ColumnDetails</span><span class="p">.</span><span class="n">Keys</span><span class="p">()</span>
        <span class="n">ColumnLabels</span><span class="p">(</span><span class="n">0</span><span class="p">,</span> <span class="n">i</span><span class="p">)</span> <span class="o">=</span> <span class="n">ColumnDetails</span><span class="p">(</span><span class="n">Col</span><span class="p">)(</span><span class="s">&#34;label&#34;</span><span class="p">)</span>

        <span class="c">&#39; Remember which column matches the identifier column label
</span><span class="c"></span>        <span class="k">If</span> <span class="n">ColumnDetails</span><span class="p">(</span><span class="n">Col</span><span class="p">)(</span><span class="s">&#34;label&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">IdentifierColumn</span> <span class="k">Then</span>
            <span class="n">IdentifierColumnApiName</span> <span class="o">=</span> <span class="n">Col</span>
            <span class="n">IdentifierColumnPosition</span> <span class="o">=</span> <span class="n">i</span>
        <span class="k">End</span> <span class="k">If</span>

        <span class="n">i</span> <span class="o">=</span> <span class="n">i</span> <span class="o">+</span> <span class="n">1</span>
    <span class="k">Next</span> <span class="n">Col</span>

    <span class="c">&#39; Write column headers starting from A1
</span><span class="c"></span>    <span class="k">With</span> <span class="n">ThisWorkbook</span><span class="p">.</span><span class="n">Worksheets</span><span class="p">(</span><span class="n">WorksheetName</span><span class="p">)</span>
        <span class="p">.</span><span class="n">Range</span><span class="p">(.</span><span class="n">Cells</span><span class="p">(</span><span class="n">1</span><span class="p">,</span> <span class="s">&#34;A&#34;</span><span class="p">),</span> <span class="p">.</span><span class="n">Cells</span><span class="p">(</span><span class="n">1</span><span class="p">,</span> <span class="n">ColumnDetails</span><span class="p">.</span><span class="n">Count</span><span class="p">))</span> <span class="o">=</span> <span class="n">ColumnLabels</span>
    <span class="k">End</span> <span class="k">With</span>

    <span class="k">Dim</span> <span class="n">ReportMetadataJson</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">:</span> <span class="n">ReportMetadataJson</span> <span class="o">=</span> <span class="s">&#34;&#34;</span>

    <span class="c">&#39; Setting date filters, if any
</span><span class="c"></span>    <span class="k">If</span> <span class="n">startDate</span> <span class="o">&lt;&gt;</span> <span class="s">&#34;&#34;</span> <span class="ow">And</span> <span class="n">endDate</span> <span class="o">&lt;&gt;</span> <span class="s">&#34;&#34;</span> <span class="k">Then</span>
        <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;standardDateFilter&#34;</span><span class="p">)(</span><span class="s">&#34;durationValue&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="s">&#34;CUSTOM&#34;</span>
        <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;standardDateFilter&#34;</span><span class="p">)(</span><span class="s">&#34;startDate&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">Format</span><span class="p">(</span><span class="n">startDate</span><span class="p">,</span> <span class="s">&#34;yyyy-mm-dd&#34;</span><span class="p">)</span>
        <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;standardDateFilter&#34;</span><span class="p">)(</span><span class="s">&#34;endDate&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">Format</span><span class="p">(</span><span class="n">endDate</span><span class="p">,</span> <span class="s">&#34;yyyy-mm-dd&#34;</span><span class="p">)</span>

        <span class="n">ReportMetadataJson</span> <span class="o">=</span> <span class="n">JsonConverter</span><span class="p">.</span><span class="n">ConvertToJson</span><span class="p">(</span><span class="n">ReportMetadata</span><span class="p">)</span>
    <span class="k">End</span> <span class="k">If</span>

    <span class="c">&#39; Get first 2000 rows
</span><span class="c"></span>    <span class="k">Set</span> <span class="n">Report</span> <span class="o">=</span> <span class="n">JsonConverter</span><span class="p">.</span><span class="n">ParseJson</span><span class="p">(</span><span class="n">GetReport</span><span class="p">(</span><span class="n">ReportId</span><span class="p">,</span> <span class="n">SessionId</span><span class="p">,</span> <span class="n">ReportMetadataJson</span><span class="p">))</span>

    <span class="k">Dim</span> <span class="n">ReportTable</span> <span class="ow">As</span> <span class="kt">Variant</span>
    <span class="n">ReportTable</span> <span class="o">=</span> <span class="n">WriteIntoWorksheet</span><span class="p">(</span><span class="n">Report</span><span class="p">,</span> <span class="n">WorksheetName</span><span class="p">,</span> <span class="n">ColumnLabels</span><span class="p">)</span>

    <span class="c">&#39; Getting Remaining Values By Filtering Out Old Values
</span><span class="c"></span>
    <span class="k">If</span> <span class="n">BooleanFilter</span> <span class="o">&lt;&gt;</span> <span class="s">&#34;&#34;</span> <span class="k">Then</span>
        <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;reportBooleanFilter&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">BooleanFilter</span>
    <span class="k">End</span> <span class="k">If</span>

    <span class="k">Dim</span> <span class="n">IdentifierColumnValues</span>
    <span class="k">Dim</span> <span class="n">IdentifierColumnFilter</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">:</span> <span class="n">IdentifierColumnFilter</span> <span class="o">=</span> <span class="s">&#34;&#34;</span>

    <span class="k">Dim</span> <span class="n">Filters</span> <span class="ow">As</span> <span class="n">Scripting</span><span class="p">.</span><span class="n">Dictionary</span>
    <span class="k">Set</span> <span class="n">Filters</span> <span class="o">=</span> <span class="k">New</span> <span class="n">Dictionary</span>

    <span class="k">Dim</span> <span class="n">ReportFilters</span> <span class="ow">As</span> <span class="kt">Object</span>

    <span class="k">Do</span> <span class="n">Until</span> <span class="n">Report</span><span class="p">(</span><span class="s">&#34;allData&#34;</span><span class="p">)</span>
        <span class="n">IdentifierColumnValues</span> <span class="o">=</span> <span class="n">GetValuesAtColumn</span><span class="p">(</span><span class="n">ReportTable</span><span class="p">,</span> <span class="n">IdentifierColumnPosition</span><span class="p">)</span>
        <span class="n">IdentifierColumnFilter</span> <span class="o">=</span> <span class="n">IdentifierColumnFilter</span> <span class="o">&amp;</span> _
                                 <span class="n">Join</span><span class="p">(</span><span class="n">Application</span><span class="p">.</span><span class="n">Transpose</span><span class="p">(</span><span class="n">IdentifierColumnValues</span><span class="p">),</span> <span class="s">&#34;,&#34;</span><span class="p">)</span>

        <span class="n">Filters</span><span class="p">.</span><span class="n">RemoveAll</span>
        <span class="n">Filters</span><span class="p">.</span><span class="n">Add</span> <span class="s">&#34;filterType&#34;</span><span class="p">,</span> <span class="s">&#34;fieldValue&#34;</span>
        <span class="n">Filters</span><span class="p">.</span><span class="n">Add</span> <span class="s">&#34;isRunPageEditable&#34;</span><span class="p">,</span> <span class="k">True</span>
        <span class="n">Filters</span><span class="p">.</span><span class="n">Add</span> <span class="s">&#34;column&#34;</span><span class="p">,</span> <span class="n">IdentifierColumnApiName</span>
        <span class="n">Filters</span><span class="p">.</span><span class="n">Add</span> <span class="s">&#34;operator&#34;</span><span class="p">,</span> <span class="s">&#34;notEqual&#34;</span>
        <span class="n">Filters</span><span class="p">.</span><span class="n">Add</span> <span class="s">&#34;value&#34;</span><span class="p">,</span> <span class="n">IdentifierColumnFilter</span>

        <span class="k">Set</span> <span class="n">ReportFilters</span> <span class="o">=</span> <span class="n">ReportMetadata</span><span class="p">(</span><span class="s">&#34;reportMetadata&#34;</span><span class="p">)(</span><span class="s">&#34;reportFilters&#34;</span><span class="p">)</span>

        <span class="c">&#39; If IdentifierColumn was already added, just change the filter value
</span><span class="c"></span>        <span class="k">If</span> <span class="n">ReportFilters</span><span class="p">(</span><span class="n">ReportFilters</span><span class="p">.</span><span class="n">Count</span><span class="p">)(</span><span class="s">&#34;column&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">IdentifierColumn</span> <span class="k">Then</span>
            <span class="n">ReportFilters</span><span class="p">(</span><span class="n">ReportFilters</span><span class="p">.</span><span class="n">Count</span><span class="p">)(</span><span class="s">&#34;value&#34;</span><span class="p">)</span> <span class="o">=</span> <span class="n">IdentifierColumnFilter</span>
        <span class="k">Else</span>
            <span class="n">ReportFilters</span><span class="p">.</span><span class="n">Add</span> <span class="n">Filters</span>
        <span class="k">End</span> <span class="k">If</span>

        <span class="n">ReportMetadataJson</span> <span class="o">=</span> <span class="n">JsonConverter</span><span class="p">.</span><span class="n">ConvertToJson</span><span class="p">(</span><span class="n">ReportMetadata</span><span class="p">)</span>

        <span class="k">Set</span> <span class="n">Report</span> <span class="o">=</span> <span class="n">JsonConverter</span><span class="p">.</span><span class="n">ParseJson</span><span class="p">(</span><span class="n">GetReport</span><span class="p">(</span><span class="n">ReportId</span><span class="p">,</span> <span class="n">SessionId</span><span class="p">,</span> <span class="n">ReportMetadataJson</span><span class="p">))</span>

        <span class="n">ReportTable</span> <span class="o">=</span> <span class="n">WriteIntoWorksheet</span><span class="p">(</span><span class="n">Report</span><span class="p">,</span> <span class="n">WorksheetName</span><span class="p">,</span> <span class="s">&#34;&#34;</span><span class="p">)</span>
    <span class="k">Loop</span>

<span class="k">End</span> <span class="k">Sub</span>
</code></pre></div><p>To do the filter, we create a <code>Filters</code> dictionary to store all key-value pairs
we need, then add it to the <code>reportFilters</code> object, and change its value in
later iterations. Then we convert the metadata into a JSON string, get a new
filtered report and repeat the loop until we get all data.</p>
<p>Also notice that I use a custom function to get all values at a given column,
<code>GetValuesAtColumn</code>.</p>
<p><a href="https://gist.github.com/phelipetls/57a27f529561eefe73633093c737b7e0">Get the full source code in this GitHub gist</a>.</p>
<h1>
  How to use it
</h1>
<p>It&rsquo;s up to you how you&rsquo;re gonna use this code. Here&rsquo;s an example.</p>
<div class="highlight"><pre tabindex="0" class="chroma"><code class="language-vb" data-lang="vb"><span class="k">Sub</span> <span class="nf">DownloadReports</span>

  <span class="k">Dim</span> <span class="n">Username</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> <span class="n">Password</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">,</span> <span class="n">SecurityToken</span> <span class="ow">As</span> <span class="kt">String</span>

  <span class="n">Username</span> <span class="o">=</span> <span class="s">&#34;username&#34;</span>
  <span class="n">Password</span> <span class="o">=</span> <span class="s">&#34;password&#34;</span>
  <span class="n">SecurityToken</span> <span class="o">=</span> <span class="s">&#34;secret&#34;</span>

  <span class="k">Dim</span> <span class="n">SessionId</span> <span class="ow">As</span> <span class="kt">String</span>
  <span class="n">SessionId</span> <span class="o">=</span> <span class="n">SalesforceLogin</span><span class="p">(</span><span class="n">Username</span><span class="p">,</span> <span class="n">Password</span><span class="p">,</span> <span class="n">SecurityToken</span><span class="p">)</span>

  <span class="k">If</span> <span class="n">IsEmpty</span><span class="p">(</span><span class="n">SessionId</span><span class="p">)</span> <span class="k">Then</span>
      <span class="n">MsgBox</span> <span class="s">&#34;Authentication Error&#34;</span>
      <span class="k">Exit</span> <span class="k">Sub</span>
  <span class="nf">End</span> <span class="k">If</span>

  <span class="k">Dim</span> <span class="n">ReportId</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">:</span> <span class="n">ReportId</span> <span class="o">=</span> <span class="s">&#34;REPORT_ID&#34;</span>
  <span class="k">Dim</span> <span class="n">WorksheetName</span> <span class="ow">As</span> <span class="kt">String</span><span class="p">:</span> <span class="n">WorksheetName</span> <span class="o">=</span> <span class="s">&#34;MY_REPORT&#34;</span>

  <span class="k">Call</span> <span class="n">DownloadEntireReport</span><span class="p">(</span><span class="n">ReportId</span><span class="p">,</span> <span class="n">WorksheetName</span><span class="p">,</span> <span class="n">SessionId</span><span class="p">,</span> _
                            <span class="n">IdentifierColumn</span><span class="p">:</span><span class="o">=</span><span class="s">&#34;Número do caso&#34;</span><span class="p">,</span> _
                            <span class="n">BooleanFilter</span><span class="p">:</span><span class="o">=</span><span class="s">&#34;1 AND 2 AND (3 OR 4)&#34;</span><span class="p">,</span> _
                            <span class="n">startDate</span><span class="p">:</span><span class="o">=</span><span class="s">&#34;01/07/2020&#34;</span><span class="p">,</span> _
                            <span class="n">endDate</span><span class="p">:</span><span class="o">=</span><span class="s">&#34;31/07/2020&#34;</span><span class="p">)</span>

<span class="k">End</span> <span class="k">Sub</span>
</code></pre></div><h1>
  Final words
</h1>
<p>You probably have a better way to do it, I would only recommend this approach to
someone in an environment very dependent on Excel, simply because it is super
convenient. You can put the report anywhere you want with zero overhead &ndash; no
need for a library to understand the complexity of an Excel archive.</p>
<p>And I gotta say, VBA is kind of a hard, its ecosystem is not great, obviously.
But I was very impressed by what it can do, despite of its shortcomings.
Nonetheless, it was still fun to write this.</p>
