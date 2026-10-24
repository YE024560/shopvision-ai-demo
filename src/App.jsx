import { useMemo, useRef, useState } from 'react'
import { demoResults } from './data'

const platformOptions = ['淘宝', '京东', '亚马逊', 'TikTok', '小红书']
const styleOptions = ['极简', '高端', '轻奢', '复古', '数码', '母婴']
const outputOptions = ['主图', '详情图', '海报', '直播封面']
const colorOptions = ['#ffffff', '#dbeafe', '#fbcfe8', '#dcfce7', '#111827']
const fallbackImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState('淘宝')
  const [selectedStyle, setSelectedStyle] = useState('高端')
  const [selectedOutput, setSelectedOutput] = useState('主图')
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [results, setResults] = useState(demoResults)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImage, setUploadedImage] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState(1)
  const fileInputRef = useRef(null)

  const selectedVariant = useMemo(
    () => results.find(item => item.id === selectedVariantId) || results[0],
    [results, selectedVariantId]
  )

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => setUploadedImage(e.target?.result || '')
    reader.readAsDataURL(file)
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const nextResults = [
        {
          id: 1,
          title: `${selectedPlatform} · ${selectedStyle} · 方案 A`,
          description: `${selectedPlatform} 平台适配方案，突出产品细节与品牌气质，偏 ${selectedStyle} 视觉表达。`,
          tags: [selectedOutput, selectedStyle, 'AI 生成'],
          image: uploadedImage || fallbackImage
        },
        {
          id: 2,
          title: `${selectedPlatform} · ${selectedStyle} · 方案 B`,
          description: `适合详情页与主视觉组合，强调信息密度和视觉层级，适合 ${selectedPlatform} 销售场景。`,
          tags: ['详情图', selectedStyle, '优化版'],
          image: uploadedImage || fallbackImage
        },
        {
          id: 3,
          title: `${selectedPlatform} · ${selectedStyle} · 方案 C`,
          description: `更适合海报和营销图使用，强调促销氛围与用户转化，落地到 ${selectedPlatform} 的消费链路。`,
          tags: ['海报', selectedStyle, '营销版'],
          image: uploadedImage || fallbackImage
        }
      ]

      setResults(nextResults)
      setSelectedVariantId(1)
      setIsGenerating(false)
    }, 1200)
  }

  const openEditor = (id) => {
    setSelectedVariantId(id)
    setEditorOpen(true)
  }

  const updateVariant = (field, value) => {
    setResults(prev =>
      prev.map(item =>
        item.id === selectedVariantId ? { ...item, [field]: value } : item
      )
    )
  }

  const exportAsPng = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1200
    canvas.height = 1200

    if (!ctx) return

    ctx.fillStyle = selectedColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = selectedVariant?.image || fallbackImage

    image.onload = () => {
      const imgW = 640
      const imgH = 640
      const x = (canvas.width - imgW) / 2
      const y = 220

      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      ctx.fillRect(x - 20, y - 20, imgW + 40, imgH + 40)
      ctx.drawImage(image, x, y, imgW, imgH)

      ctx.fillStyle = '#111827'
      ctx.font = 'bold 54px Segoe UI'
      ctx.textAlign = 'center'
      ctx.fillText(selectedVariant?.title || '新品上新', canvas.width / 2, 130)

      ctx.fillStyle = '#374151'
      ctx.font = '30px Segoe UI'
      ctx.fillText('AI 电商图生成器 · ShopVision AI', canvas.width / 2, 980)

      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'shopvision-export.png'
      link.click()
    }
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
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            <div className="upload-content">
              <div className="upload-icon">⤴</div>
              <h3>上传商品图</h3>
              <p>支持 JPG / PNG / WEBP，建议上传白底正视图</p>
              <div className="fake-file" onClick={() => fileInputRef.current?.click()}>
                选择图片
              </div>
              <div className="file-name">已选：{uploadedImage ? '已上传商品图' : '无'}</div>
            </div>
          </div>

          <div className="preview-box">
            <img src={uploadedImage || fallbackImage} alt="商品图预览" />
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
                <img src={item.image || fallbackImage} alt={item.title} />
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
                  <button className="small-btn light" onClick={() => openEditor(item.id)}>编辑</button>
                  <button className="small-btn dark" onClick={() => {
                    setSelectedVariantId(item.id)
                    exportAsPng()
                  }}>导出</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {editorOpen && selectedVariant && (
        <div className="editor-overlay" onClick={() => setEditorOpen(false)}>
          <div className="editor-panel" onClick={(e) => e.stopPropagation()}>
            <div className="editor-header">
              <h3>编辑方案</h3>
              <button className="close-btn" onClick={() => setEditorOpen(false)}>×</button>
            </div>

            <div className="editor-content">
              <div className="editor-form">
                <label>
                  标题
                  <input
                    value={selectedVariant.title || ''}
                    onChange={(e) => updateVariant('title', e.target.value)}
                  />
                </label>

                <label>
                  描述
                  <textarea
                    value={selectedVariant.description || ''}
                    onChange={(e) => updateVariant('description', e.target.value)}
                  />
                </label>

                <div className="editor-actions">
                  <button className="btn btn-light" onClick={() => setEditorOpen(false)}>取消</button>
                  <button className="btn btn-dark" onClick={() => {
                    setEditorOpen(false)
                    exportAsPng()
                  }}>导出 PNG</button>
                </div>
              </div>

              <div className="editor-preview-card">
                <img src={selectedVariant.image || fallbackImage} alt="编辑预览" />
                <div className="editor-floating">
                  <span>{selectedVariant.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
