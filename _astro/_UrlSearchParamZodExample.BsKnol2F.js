import{j as e}from"./tw-merge.BweXSh_q.js";import{S as r}from"./Sandpack.BityU5sF.js";import"./index.BYb6XiQz.js";import"./Tab.CyndRYmn.js";import"./CopyCodeBlockButton.D5a17zwY.js";import"./createLucideIcon.BjvSJhcM.js";function i(){return e.jsx(r,{template:"react",title:"An example of parsing a URL search param with Zod",initialURL:"/?pageNumber=3",shouldShowNavigator:!0,customSetup:{dependencies:{zod:"^3.21.4"}},files:{"App.js":{code:`import z from 'zod'
import * as React from 'react'

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)

  const pageNumberRaw = searchParams.get('pageNumber')
  const pageNumber = z.number().catch(0).parse(Number(pageNumberRaw))

  return <pre>{JSON.stringify({ pageNumber, pageNumberRaw }, null, 2)}</pre>
}
`}}})}export{i as default};
