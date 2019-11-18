import RouterPlugin from 'pea-plugin-router'
import AntdPlugin from 'pea-plugin-antd'
import LessPlugin from 'pea-plugin-less'

const config = {
  title: 'Tie',
  plugins: [
    new RouterPlugin(),
    new AntdPlugin(),
    new LessPlugin({
      javascriptEnabled: true,
      modifyVars: {
        // 'primary-color': 'red',
        // 'link-color': '#1DA57A',
        // 'border-radius-base': '10px',
      },
    }),
  ],
}
export default config
