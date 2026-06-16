// assets/charts.js
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Keyword Cloud ---
  var keywords = [
    { text: '城市生命线', count: 18, color: '#1d4ed8' },
    { text: '城市体检', count: 16, color: '#2563eb' },
    { text: '智能监测', count: 14, color: '#3b82f6' },
    { text: '地下管网', count: 12, color: '#1e40af' },
    { text: '一网统管', count: 10, color: '#6366f1' },
    { text: '智慧城市', count: 10, color: '#7c3aed' },
    { text: 'AI治理', count: 8, color: '#8b5cf6' },
    { text: '数据共享', count: 8, color: '#a855f7' },
    { text: '燃气管网', count: 7, color: '#2563eb' },
    { text: '供水管网', count: 7, color: '#0891b2' },
    { text: '桥梁监测', count: 6, color: '#0d9488' },
    { text: '安全韧性', count: 6, color: '#059669' },
    { text: '预警阈值', count: 6, color: '#16a34a' },
    { text: '体征指标', count: 6, color: '#65a30d' },
    { text: '全域感知', count: 5, color: '#ca8a04' },
    { text: '数字孪生', count: 5, color: '#d97706' },
    { text: '物联感知', count: 5, color: '#ea580c' },
    { text: '闭环处置', count: 5, color: '#dc2626' },
    { text: '漏损率', count: 4, color: '#e11d48' },
    { text: '标准体系', count: 4, color: '#be123c' },
    { text: '数字化转型', count: 4, color: '#9333ea' },
    { text: '风险评估', count: 4, color: '#7c3aed' },
    { text: '分级预警', count: 3, color: '#4f46e5' },
    { text: '算法伦理', count: 3, color: '#4338ca' },
    { text: '数据枢纽', count: 3, color: '#3730a3' },
    { text: '老旧改造', count: 3, color: '#1e3a8a' },
    { text: '特别国债', count: 3, color: '#164e63' },
    { text: '公共安全', count: 3, color: '#115e59' },
    { text: '生态环境', count: 3, color: '#14532d' },
    { text: 'CIM底座', count: 2, color: '#713f12' }
  ];

  var cloudEl = document.getElementById('keyword-cloud');
  if (cloudEl) {
    keywords.forEach(function(kw) {
      var span = document.createElement('span');
      span.className = 'keyword-item';
      span.style.background = kw.color + '18';
      span.style.color = kw.color;
      span.style.border = '1px solid ' + kw.color + '40';
      var fontSize = 0.75 + (kw.count / 18) * 0.55;
      span.style.fontSize = fontSize + 'rem';
      span.innerHTML = kw.text + ' <span class="count">' + kw.count + '</span>';
      cloudEl.appendChild(span);
    });
  }

  // --- Chart 1: Policy Type Distribution (Pie) ---
  var chart1 = echarts.init(document.getElementById('chart-policy-type'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}项 ({d}%)' },
    legend: { bottom: 10, textStyle: { color: muted, fontSize: 12 } },
    color: [accent, accent3, accent2, '#8b5cf6', '#ec4899'],
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
      label: { show: true, formatter: '{b}\n{c}项', color: ink, fontSize: 12 },
      labelLine: { lineStyle: { color: rule } },
      data: [
        { value: 4, name: '国家政策' },
        { value: 12, name: '地方政策/标准' },
        { value: 6, name: '国家标准/团体标准' },
        { value: 4, name: '国外政策' },
        { value: 2, name: '国际组织框架' }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: Timeline Trend (Bar + Line) ---
  var chart2 = echarts.init(document.getElementById('chart-timeline'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国内政策', '国外政策'], bottom: 10, textStyle: { color: muted, fontSize: 12 } },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '政策数量',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      axisLabel: { color: muted, fontSize: 12 }
    },
    color: [accent, accent2],
    series: [
      {
        name: '国内政策',
        type: 'bar',
        data: [1, 2, 1, 6, 6, 2],
        barWidth: '35%',
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '国外政策',
        type: 'bar',
        data: [0, 0, 1, 0, 0, 3],
        barWidth: '35%',
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }
    ]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart 3: Heatmap (Monitoring Domain Coverage) ---
  var chart3 = echarts.init(document.getElementById('chart-heatmap'), null, { renderer: 'svg' });
  var domains = ['燃气', '供水', '排水', '桥梁', '隧道', '管廊', '交通', '生态环境', '公共安全', '房屋建筑', '数字治理', 'AI应用'];
  var policies = [
    '供水条例', '城市体检部署', '十五五规划',
    '生命线监测规范', 'GB/T 47678系列', '北京感知设施规范',
    '河北城市体检', '甘肃智慧城市', '上海长宁一网统管',
    '重庆体征指标', '山东体检指引', '韩国智慧城市',
    '哈萨克斯坦方法论', '联合国Citiverse'
  ];

  var heatmapData = [
    // 供水条例
    [0,1,1],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,10,0],
    // 城市体检部署
    [1,0,0],[1,1,0.5],[1,2,0.5],[1,3,0.5],[1,4,0.5],[1,5,0.5],[1,6,0.5],[1,7,1],[1,8,1],[1,9,1],[1,10,0.5],[1,11,0],
    // 十五五规划
    [2,0,1],[2,1,1],[2,2,1],[2,3,1],[2,4,1],[2,5,1],[2,6,0.5],[2,8,1],[2,10,0.5],
    // 生命线监测规范
    [3,0,1],[3,1,1],[3,2,1],[3,3,1],[3,4,1],[3,5,1],
    // GB/T 47678系列
    [4,0,0.5],[4,1,0.5],[4,2,0.5],[4,3,0.5],[4,5,0.5],[4,6,1],[4,7,0.5],[4,8,1],[4,9,1],[4,10,0.5],
    // 北京感知设施规范
    [5,6,1],[5,10,0.5],[5,11,0.5],
    // 河北城市体检
    [6,0,0.5],[6,1,0.5],[6,2,0.5],[6,3,0.5],[6,4,0.5],[6,7,1],[6,8,1],[6,9,1],
    // 甘肃智慧城市
    [7,0,1],[7,1,1],[7,2,1],[7,3,1],[7,4,1],[7,5,1],[7,6,0.5],[7,7,1],[7,8,1],[7,10,1],
    // 上海长宁
    [8,6,1],[8,7,0.5],[8,8,1],[8,10,1],[8,11,0.5],
    // 重庆体征指标
    [9,0,0.5],[9,1,0.5],[9,2,0.5],[9,3,0.5],[9,4,0.5],[9,5,0.5],[9,6,1],[9,7,1],[9,8,1],[9,10,1],
    // 山东体检指引
    [10,0,1],[10,3,1],[10,8,1],[10,9,1],[10,10,0.5],
    // 韩国智慧城市
    [11,6,1],[11,7,0.5],[11,8,0.5],[11,10,1],[11,11,1],
    // 哈萨克斯坦
    [12,6,1],[12,7,0.5],[12,8,1],[12,10,1],[12,11,1],
    // 联合国Citiverse
    [13,6,0.5],[13,7,0.5],[13,8,0.5],[13,10,1],[13,11,1]
  ];

  // Fill missing cells
  var fullData = heatmapData.slice();
  policies.forEach(function(_, pi) {
    domains.forEach(function(_, di) {
      if (!heatmapData.some(function(d) { return d[0] === pi && d[1] === di; })) {
        fullData.push([pi, di, '-']);
      }
    });
  });

  chart3.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        if (p.value[2] === '-') return policies[p.value[0]] + ' × ' + domains[p.value[1]] + ': 未涉及';
        var level = p.value[2] >= 1 ? '深度覆盖' : (p.value[2] >= 0.5 ? '部分涉及' : '未涉及');
        return policies[p.value[0]] + ' × ' + domains[p.value[1]] + ': ' + level;
      }
    },
    grid: { left: 120, right: 80, top: 10, bottom: 40 },
    xAxis: {
      type: 'category',
      data: domains,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, rotate: 30 }
    },
    yAxis: {
      type: 'category',
      data: policies,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 11 }
    },
    visualMap: {
      min: 0,
      max: 1,
      calculable: false,
      orient: 'vertical',
      right: 0,
      top: 'center',
      itemHeight: 120,
      text: ['深度覆盖', '未涉及'],
      textStyle: { color: muted, fontSize: 11 },
      inRange: { color: [bg2, '#dbeafe', '#93c5fd', accent] },
      outOfRange: { color: 'transparent' }
    },
    series: [{
      type: 'heatmap',
      data: fullData,
      label: {
        show: false,
        color: ink,
        fontSize: 10
      },
      itemStyle: { borderColor: bg2, borderWidth: 2, borderRadius: 3 },
      emphasis: {
        itemStyle: { borderColor: accent, borderWidth: 2, shadowBlur: 6, shadowColor: 'rgba(0,0,0,0.15)' }
      }
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // --- Chart 4: Trend Comparison (Radar) ---
  var chart4 = echarts.init(document.getElementById('chart-trend'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: {
      data: ['2024年', '2025年', '2026年'],
      bottom: 10,
      textStyle: { color: muted, fontSize: 12 }
    },
    radar: {
      indicator: [
        { name: '政策覆盖城市数', max: 100 },
        { name: '监测领域宽度', max: 100 },
        { name: '标准体系完善度', max: 100 },
        { name: 'AI/智能化程度', max: 100 },
        { name: '资金投入力度', max: 100 },
        { name: '刚性约束强度', max: 100 }
      ],
      shape: 'circle',
      splitNumber: 4,
      axisName: { color: ink, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { show: false },
      axisLine: { lineStyle: { color: rule } }
    },
    color: [muted + '80', accent2, accent],
    series: [{
      type: 'radar',
      data: [
        {
          value: [25, 40, 30, 20, 30, 20],
          name: '2024年',
          areaStyle: { opacity: 0.1 }
        },
        {
          value: [50, 55, 50, 40, 50, 45],
          name: '2025年',
          areaStyle: { opacity: 0.15 }
        },
        {
          value: [95, 80, 85, 75, 90, 90],
          name: '2026年',
          areaStyle: { opacity: 0.2 }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

})();
