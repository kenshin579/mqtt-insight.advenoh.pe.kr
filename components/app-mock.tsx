export function AppMock({ lang, title }: { lang: 'en' | 'ko'; title: string }) {
  const label = {
    tree: lang === 'ko' ? '토픽 트리' : 'Topic tree',
    messages: lang === 'ko' ? '라이브 메시지' : 'Live messages',
    chart: lang === 'ko' ? '차트 · sensors/temp' : 'Chart · sensors/temp',
  };
  return (
    <div className="mi-mock">
      <div className="mi-mock-titlebar">
        <span className="mi-mock-dot" />
        <span className="mi-mock-dot" />
        <span className="mi-mock-dot" />
        <span className="mi-mock-title">{title}</span>
      </div>
      <div className="mi-mock-panes">
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.tree}</div>
          <div>▾ sensors</div>
          <div>&nbsp;&nbsp;temp <span className="mi-mock-value">23.5</span></div>
          <div>&nbsp;&nbsp;humidity <span className="mi-mock-value">41.2</span></div>
          <div>▾ devices</div>
          <div>&nbsp;&nbsp;▾ gw-01</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;status <span className="mi-mock-value">online</span></div>
          <div>&nbsp;&nbsp;▸ gw-02</div>
        </div>
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.messages}</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.5, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/humidity</span> {'{"rh": 41.2}'}</div>
          <div><span className="mi-mock-topic">devices/gw-01/status</span> online</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.4, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/temp</span> {'{"temp": 23.6, "unit": "C"}'}</div>
          <div><span className="mi-mock-topic">sensors/humidity</span> {'{"rh": 41.0}'}</div>
        </div>
        <div className="mi-mock-pane">
          <div className="mi-mock-pane-label">{label.chart}</div>
          <svg width="100%" height="110" viewBox="0 0 200 110" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mi-spark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#4f8cff" />
                <stop offset="1" stopColor="#9f6bff" />
              </linearGradient>
            </defs>
            <polyline
              points="0,84 18,74 36,80 54,58 72,64 90,40 108,48 126,30 144,38 162,22 180,30 200,18"
              fill="none"
              stroke="url(#mi-spark)"
              strokeWidth="2.5"
            />
          </svg>
          <div className="mi-mock-stats">
            <span>now 23.5</span>
            <span>min 22.9</span>
            <span>max 24.1</span>
            <span>avg 23.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
