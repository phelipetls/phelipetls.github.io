import{j as e}from"./tw-merge.BX59QNfr.js";import{S as r}from"./Sandpack.D8BFDkvd.js";import"./index.v9NO2EbV.js";import"./Tab.C2zSSDam.js";import"./CopyCodeBlockButton.CXK7bwpi.js";import"./createLucideIcon.Cfxfx4lJ.js";function i(){return e.jsx(r,{template:"react",title:"An example of parsing a URL search param with Zod",initialURL:"/?pageNumber=3",shouldShowNavigator:!0,customSetup:{dependencies:{zod:"^3.21.4"}},files:{"App.js":{code:`import z from 'zod'
import * as React from 'react'

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)

  const pageNumberRaw = searchParams.get('pageNumber')
  const pageNumber = z.number().catch(0).parse(Number(pageNumberRaw))

  return <pre>{JSON.stringify({ pageNumber, pageNumberRaw }, null, 2)}</pre>
}
`}}})}export{i as default};
