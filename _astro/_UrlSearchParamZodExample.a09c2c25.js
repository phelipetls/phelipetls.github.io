import{S as e}from"./Sandpack.ff5aabae.js";import{j as r}from"./jsx-runtime.a3ab6fc0.js";import"./index.c0d9332e.js";import"./_commonjsHelpers.042e6b4d.js";import"./Tab.28520c38.js";import"./CopyCodeBlockButton.92c2aa37.js";import"./index.772d13e4.js";import"./createLucideIcon.0eda30d5.js";import"./floating-ui.dom.browser.min.b9202534.js";function c(){return r.jsx(e,{template:"react",title:"An example of parsing a URL search param with Zod",initialURL:"/?pageNumber=3",shouldShowNavigator:!0,customSetup:{dependencies:{zod:"^3.21.4"}},files:{"App.js":{code:`import z from 'zod'
import * as React from 'react'

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)

  const pageNumberRaw = searchParams.get('pageNumber')
  const pageNumber = z.number().catch(0).parse(Number(pageNumberRaw))

  return <pre>{JSON.stringify({ pageNumber, pageNumberRaw }, null, 2)}</pre>
}
`}}})}export{c as default};