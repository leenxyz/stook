/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styled from 'styled-components'

const Main = styled.div`
  margin: 30px auto 0;
  width: 760px;
`

const List = styled.ul`
  list-style: none;
`

const Item = styled.li`
  position: relative;
  /* box-shadow: 1px 5px 10px #f0f0f0; */
  border: 1px solid #f0f0f0;
  color: #586069;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`

const Btn = styled.a`
  position: absolute;
  top: 10px;
  right: 10px;
  display: inline-block;
  padding: 0 15px;
  box-sizing: border-box;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  &:hover {
    text-decoration: none;
  }
`

const Name = styled.div`
  font-size: 24px;
  margin-top: 5px;
`

const Author = styled.div`
  color: #aaa;
  font-size: 12px;
  margin-top: 5px;
`

const list = [
  {
    name: 'stook-rest',
    intro: 'React Hooks to Restful Api',
    github: 'https://github.com/motere/stook/blob/master/packages/stook-rest/README.md',
    author: 'forsigner',
    tag: ['graphql', 'stook', 'useQuery'],
  },
  {
    name: 'stook-graphql',
    intro: 'React Hooks to query GraphQL',
    github: 'https://github.com/motere/stook/blob/master/packages/stook-graphql/README.md',
    author: 'stook',
    tag: ['graphql', 'stook', 'useQuery'],
  },
  {
    name: 'entity-form',
    intro: 'React form base on Hooks',
    github: 'https://github.com/forsigner/entity-form',
    author: 'forsigner',
    tag: ['form', 'stook'],
  },
]

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Main>
        <List>
          {list.map(item => (
            <Item key={item.name}>
              <Name href={item.github} target="_blank">
                {item.name}
              </Name>
              <div>{item.intro}</div>
              <Author>built by {item.author}</Author>
              <Btn href={item.github} target="_blank">
                Github
              </Btn>
            </Item>
          ))}
        </List>
      </Main>
    </Layout>
  )
}

export default Home
