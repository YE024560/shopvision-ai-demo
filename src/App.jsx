import { useState } from 'react'
import { demoResults } from './data'

const platformOptions = ['淘宝', '京东', '亚马逊', 'TikTok', '小红书']
const styleOptions = ['极简', '高端', '轻奢', '复古', '数码', '母婴']
const outputOptions = ['主图', '详情图', '海报', '直播封面']
const colorOptions = ['#ffffff', '#dbeafe', '#fbcfe8', '#dcfce7', '#111827']

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('淘宝')
  const [selectedStyle, setSelectedStyle] = useState('极简')
  const [selectedOutput, setSelectedOutput] = useState('主图')
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [results, setResults] = useState(demoResults)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const nextResults = [
        {
          id: 1,
          title: `方案 A：${selectedStyle} ${selectedPlatform}`,
          description: `更适合 ${selectedPlatform} 平台展示，采用 ${selectedStyle} 风格，视觉上更有冲突感和商业化气质。`,
          tags: [selectedOutput, selectedStyle, 'AI 生成'],
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 2,
          title: `方案 B：${selectedStyle} 详情页`,
          description: `适合信息密度较高的详情图场景，突出产品卖点、规格和体验感。`,
          tags: ['详情图', selectedStyle, '优化版'],
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
        },
        {
          id: 3,
          title: `方案 C：${selectedStyle} 海报`,
          description: `适合活动宣传页和海报场景，强调品牌氛围和营销引导。`,
          tags: ['海报', selectedStyle, '营销版'],
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
        }
      ]
      setResults(nextResults)
      setIsGenerating(false)
    }, 1200)
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <small>AI 电商图生成器</small>
          <h1>ShopVision AI</h1>
        </div>

        <div className="top-actions">
          <button className="btn btn-light">我的作品</button>
          <button className="btn btn-dark">立即生成</button>
        </div>
      </header>

      <section className="panel upload-panel">
        <div className="left-col">
          <div className="upload-box">
            <div className="upload-content">
              <div className="upload-icon">⤴</div>
              <h3>上传商品图</h3>
              <p>支持 JPG / PNG / WEBP，建议上传白底正视图</p>
              <div className="fake-file">选择图片</div>
              <div className="file-name">已选：无</div>
            </div>
          </div>

          <div className="preview-box">
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80" alt="商品图预览" />
          </div>
        </div>

        <div className="config-box">
          <div className="config-group">
            <h4>平台</h4>
            <div className="chip-row">
              {platformOptions.map(item => (
                <button
                  key={item}
                  className={`chip ${selectedPlatform === item ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <h4>风格</h4>
            <div className="chip-row">
              {styleOptions.map(item => (
                <button
                  key={item}
                  className={`chip ${selectedStyle === item ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <h4>色系</h4>
            <div className="color-row">
              {colorOptions.map(item => (
                <span
                  key={item}
                  className={`color-dot ${selectedColor === item ? 'active' : ''}`}
                  style={{ background: item }}
                  onClick={() => setSelectedColor(item)}
                />
              ))}
            </div>
          </div>

          <div className="config-group">
            <h4>输出类型</h4>
            <div className="chip-row">
              {outputOptions.map(item => (
                <button
                  key={item}
                  className={`chip ${selectedOutput === item ? 'active' : ''}`}
                  onClick={() => setSelectedOutput(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <h4>目标人群</h4>
            <input className="input" type="text" value="年轻女性 / 轻奢消费" readOnly />
          </div>

          <div className="config-group">
            <h4>备注</h4>
            <textarea className="textarea" defaultValue="希望产品更突出，背景偏高级感，主图更适合淘宝爆款展示。"></textarea>
          </div>

          <button className="generate-btn" onClick={handleGenerate}>
            {isGenerating ? '生成中...' : '生成视觉方案'}
          </button>
        </div>
      </section>

      <section className="results">
        <div className="section-head">
          <h2>生成结果</h2>
          <span className="badge">{isGenerating ? '正在生成...' : '已完成 3 套方案'}</span>
        </div>

        <div className="cards">
          {results.map(item => (
            <article key={item.id} className="card">
              <div className="card-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-sub">{item.description}</p>

                <div className="tag-list">
                  {item.tags.map(tag => (
                    <span key={`${item.id}-${tag}`} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <button className="small-btn light">编辑</button>
                  <button className="small-btn dark">导出</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
