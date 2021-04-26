import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import DLink from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import Translate from '@docusaurus/Translate'
import { Box } from '@fower/react'
import theme from 'prism-react-renderer/themes/duotoneDark'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { styled } from '@fower/styled'

const Link = styled(DLink)

const code1 = `
  <Box toCenter bgGray100 p4>
    <Box square-60 bgAmber400 rounded-8></Box>
    <Box square-80 bgBlue400 rounded-8></Box>
  </Box>
`

const features = [
  {
    title: 'Minimalism',
    description: '核心 Api 几乎和 `useState`用法一样，极低的学习成本.',
  },
  {
    title: 'Hooks',
    description: '基于 hooks 实现，符合 React 的发展趋势.',
  },

  {
    title: 'TypeScript',
    description: 'TypeScipt 支持非常完美.',
  },
]

function Feature({ title, description, idx }) {
  return (
    <div
      style={{
        marginBottom: '40px',
        paddingRight: (idx + 1) % 3 === 0 ? 0 : '40px',
      }}
      className={clsx('col col--4', styles.feature)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {}, tagline } = context
  return (
    <Layout title={tagline} description={tagline}>
      <div className={styles.container}>
        <Box className="toBetween flexDirection-row">
          <Box>
            <Box className="leadingNone fontExtrabold textLeft" style={{ fontSize: 90 }}>
              A minimalist design state management library for React.
            </Box>

            <Box className={styles.wrapLink} spaceX2>
              <Link
                className={clsx('button button--lg', styles.getStarted)}
                to={useBaseUrl('docs/stook/intro')}
                roundedFull
                bg="#61dafb"
                bg--hover="#61dafb--D4"
                color="#61dafb"
                bgBlack
                bgTrueGray800
                py3
                borderNone
              >
                Getting Start
              </Link>
              <iframe
                className={styles.indexCtasGitHubButton}
                src="https://ghbtns.com/github-btn.html?user=forsigner&amp;repo=stook&amp;type=star&amp;count=true&amp;size=large"
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </Box>
          </Box>
        </Box>
      </div>

      <main className="home">
        {features && features.length > 0 && (
          <div className={styles.item}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} idx={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}

export default Home
