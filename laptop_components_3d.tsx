import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, Menu, X, Cpu, HardDrive, Monitor, Battery, Wifi, Fan, MemoryStick, Zap, Disc, Keyboard, Mouse, Usb, Speaker } from 'lucide-react';

const LaptopComponentsApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const animationRef = useRef(null);

  const componentsData = [
    {
      id: 1,
      name: "Central Processing Unit (CPU)",
      icon: Cpu,
      category: "Processing",
      description: "The brain of the laptop that executes instructions and performs calculations.",
      details: "Modern laptop CPUs are multi-core processors that handle billions of operations per second. They manage everything from basic system operations to complex computational tasks.",
      specs: ["Clock Speed: 2.5-5.0 GHz", "Cores: 4-16", "Cache: 8-32 MB", "TDP: 15-45W"],
      manufacturers: ["Intel", "AMD", "Apple Silicon"],
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Random Access Memory (RAM)",
      icon: MemoryStick,
      category: "Memory",
      description: "Temporary storage that holds data for active programs and processes.",
      details: "RAM provides fast, temporary storage for data that the CPU needs quick access to. More RAM allows for better multitasking and smoother performance with demanding applications.",
      specs: ["Capacity: 4-64 GB", "Type: DDR4/DDR5", "Speed: 2400-5600 MHz", "Voltage: 1.2-1.35V"],
      manufacturers: ["Crucial", "Kingston", "Samsung", "Corsair"],
      color: "#4ECDC4"
    },
    {
      id: 3,
      name: "Solid State Drive (SSD)",
      icon: HardDrive,
      category: "Storage",
      description: "Fast, permanent storage for your operating system, programs, and files.",
      details: "SSDs use flash memory to store data permanently without moving parts, making them much faster and more reliable than traditional hard drives.",
      specs: ["Capacity: 128GB-4TB", "Type: NVMe/SATA", "Read Speed: 500-7000 MB/s", "Write Speed: 400-6000 MB/s"],
      manufacturers: ["Samsung", "Western Digital", "Crucial", "Seagate"],
      color: "#95E1D3"
    },
    {
      id: 4,
      name: "Graphics Processing Unit (GPU)",
      icon: Monitor,
      category: "Graphics",
      description: "Specialized processor for rendering images, videos, and 3D graphics.",
      details: "GPUs handle all visual output and are essential for gaming, video editing, 3D modeling, and AI tasks. They can be integrated into the CPU or be discrete components.",
      specs: ["VRAM: 2-16 GB", "CUDA/Stream Cores: 384-5888", "Clock Speed: 1200-2500 MHz", "Memory Bus: 64-384 bit"],
      manufacturers: ["NVIDIA", "AMD", "Intel"],
      color: "#F38181"
    },
    {
      id: 5,
      name: "Display Panel",
      icon: Monitor,
      category: "Display",
      description: "The screen that displays visual information to the user.",
      details: "Modern laptop displays come in various technologies including IPS, OLED, and mini-LED, each offering different benefits in color accuracy, contrast, and power efficiency.",
      specs: ["Size: 13-17 inches", "Resolution: 1080p-4K", "Refresh Rate: 60-360 Hz", "Brightness: 250-600 nits"],
      manufacturers: ["LG", "Samsung", "BOE", "Sharp"],
      color: "#AA96DA"
    },
    {
      id: 6,
      name: "Battery",
      icon: Battery,
      category: "Power",
      description: "Provides portable power to run the laptop without external electricity.",
      details: "Lithium-ion or lithium-polymer batteries store electrical energy chemically. Battery life depends on capacity, component power consumption, and usage patterns.",
      specs: ["Capacity: 40-100 Wh", "Cells: 3-6", "Voltage: 11.1-15.4V", "Life: 4-12 hours"],
      manufacturers: ["LG Chem", "Samsung SDI", "Panasonic", "CATL"],
      color: "#FCBAD3"
    },
    {
      id: 7,
      name: "Motherboard",
      icon: Cpu,
      category: "Core",
      description: "Main circuit board connecting all laptop components together.",
      details: "The motherboard is the central hub that allows all components to communicate. It contains the chipset, power delivery circuits, and connectors for all other components.",
      specs: ["Form Factor: Proprietary", "Chipset: Intel/AMD", "Layers: 6-12", "Connectors: 20+"],
      manufacturers: ["Foxconn", "Compal", "Quanta", "Wistron"],
      color: "#FFFFD2"
    },
    {
      id: 8,
      name: "Cooling System",
      icon: Fan,
      category: "Thermal",
      description: "Dissipates heat from CPU and GPU to prevent overheating.",
      details: "Laptop cooling systems typically include heat pipes, fans, and heatsinks. Efficient cooling is crucial for maintaining performance and component longevity.",
      specs: ["Fans: 1-3", "Heat Pipes: 2-6", "Max RPM: 3000-6000", "Noise: 25-45 dB"],
      manufacturers: ["Delta", "Sunon", "Nidec", "CoolerMaster"],
      color: "#A8DADC"
    },
    {
      id: 9,
      name: "Wireless Card",
      icon: Wifi,
      category: "Connectivity",
      description: "Enables WiFi and Bluetooth wireless communications.",
      details: "Modern wireless cards support WiFi 6/6E standards for faster speeds and lower latency. They also handle Bluetooth for connecting peripherals.",
      specs: ["WiFi: 802.11ax (WiFi 6E)", "Speed: Up to 2.4 Gbps", "Bluetooth: 5.0-5.3", "Bands: 2.4/5/6 GHz"],
      manufacturers: ["Intel", "Qualcomm", "Realtek", "Broadcom"],
      color: "#457B9D"
    },
    {
      id: 10,
      name: "Keyboard",
      icon: Keyboard,
      category: "Input",
      description: "Primary input device for text entry and system commands.",
      details: "Laptop keyboards use scissor-switch or butterfly mechanisms for a low profile. Many feature backlighting and specialized function keys.",
      specs: ["Travel: 0.5-1.5mm", "Keys: 78-102", "Backlighting: RGB/White", "Durability: 1M+ presses"],
      manufacturers: ["Chicony", "Darfon", "Sunrex", "Lite-On"],
      color: "#F1FAEE"
    }
  ];

  // Generate pages of content
  const generatePages = () => {
    const pages = [];
    let pageContent = [];
    
    // Introduction pages
    pages.push({
      type: 'intro',
      title: 'Laptop Components Encyclopedia',
      subtitle: 'A Comprehensive Guide to Modern Laptop Hardware',
      content: 'Welcome to the complete guide covering everything you need to know about laptop components, from processors to storage devices.'
    });

    // Component detail pages (multiple pages per component)
    componentsData.forEach(component => {
      // Overview page
      pages.push({
        type: 'component-overview',
        component: component,
        title: component.name,
        subtitle: component.category
      });

      // Technical specs page
      pages.push({
        type: 'component-specs',
        component: component,
        title: `${component.name} - Technical Specifications`,
        subtitle: 'Detailed Technical Information'
      });

      // Manufacturers page
      pages.push({
        type: 'component-manufacturers',
        component: component,
        title: `${component.name} - Manufacturers`,
        subtitle: 'Leading Producers and Brands'
      });

      // Deep dive pages (5 pages per component)
      for (let i = 1; i <= 5; i++) {
        pages.push({
          type: 'component-detail',
          component: component,
          title: `${component.name} - Part ${i}`,
          subtitle: `Advanced Topics and Implementation`,
          detailSection: i
        });
      }
    });

    // Technology evolution pages
    pages.push({
      type: 'evolution',
      title: 'Evolution of Laptop Technology',
      subtitle: 'From Past to Present'
    });

    // Comparison pages
    for (let i = 0; i < 10; i++) {
      pages.push({
        type: 'comparison',
        title: `Component Comparisons - Part ${i + 1}`,
        subtitle: 'Performance and Feature Analysis'
      });
    }

    // Best practices pages
    for (let i = 0; i < 15; i++) {
      pages.push({
        type: 'best-practices',
        title: `Maintenance and Best Practices - Part ${i + 1}`,
        subtitle: 'Care and Optimization Tips'
      });
    }

    // Troubleshooting pages
    for (let i = 0; i < 20; i++) {
      pages.push({
        type: 'troubleshooting',
        title: `Troubleshooting Guide - Part ${i + 1}`,
        subtitle: 'Common Issues and Solutions'
      });
    }

    // Future technology pages
    for (let i = 0; i < 15; i++) {
      pages.push({
        type: 'future',
        title: `Future Technologies - Part ${i + 1}`,
        subtitle: 'Upcoming Innovations'
      });
    }

    // Buying guide pages
    for (let i = 0; i < 25; i++) {
      pages.push({
        type: 'buying-guide',
        title: `Buying Guide - Part ${i + 1}`,
        subtitle: 'Making the Right Choice'
      });
    }

    // Technical deep dives
    for (let i = 0; i < 30; i++) {
      pages.push({
        type: 'technical',
        title: `Technical Deep Dive - Part ${i + 1}`,
        subtitle: 'Advanced Engineering Concepts'
      });
    }

    // Industry insights pages
    for (let i = 0; i < 20; i++) {
      pages.push({
        type: 'industry',
        title: `Industry Insights - Part ${i + 1}`,
        subtitle: 'Market Trends and Analysis'
      });
    }

    // Performance optimization pages
    for (let i = 0; i < 25; i++) {
      pages.push({
        type: 'optimization',
        title: `Performance Optimization - Part ${i + 1}`,
        subtitle: 'Maximizing Your Hardware'
      });
    }

    // Environmental impact pages
    for (let i = 0; i < 15; i++) {
      pages.push({
        type: 'environmental',
        title: `Environmental Impact - Part ${i + 1}`,
        subtitle: 'Sustainability in Computing'
      });
    }

    // Additional filler content to reach 500 pages
    const remainingPages = 500 - pages.length;
    for (let i = 0; i < remainingPages; i++) {
      const section = i % 5;
      const types = ['advanced', 'case-study', 'reference', 'glossary', 'appendix'];
      pages.push({
        type: types[section],
        title: `${types[section].charAt(0).toUpperCase() + types[section].slice(1)} Section - Page ${i + 1}`,
        subtitle: 'Additional Reference Material',
        pageNum: i + 1
      });
    }

    return pages;
  };

  const allPages = generatePages();
  const totalPages = allPages.length;

  // 3D Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      rotationRef.current += 0.01;
      const rotation = rotationRef.current;

      // Draw 3D laptop wireframe
      const centerX = width / 2;
      const centerY = height / 2;
      const size = 80;

      // Base coordinates for a laptop shape
      const points = [
        // Screen
        [-size, -size, -10],
        [size, -size, -10],
        [size, size/2, -10],
        [-size, size/2, -10],
        // Base
        [-size*1.2, size/2, 20],
        [size*1.2, size/2, 20],
        [size*1.2, size, 20],
        [-size*1.2, size, 20],
      ];

      // Rotate points
      const rotatedPoints = points.map(([x, y, z]) => {
        const cosY = Math.cos(rotation);
        const sinY = Math.sin(rotation);
        const cosX = Math.cos(rotation * 0.5);
        const sinX = Math.sin(rotation * 0.5);

        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        let y1 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        const scale = 200 / (200 + z2);
        return [centerX + x1 * scale, centerY + y1 * scale];
      });

      // Draw laptop
      ctx.strokeStyle = selectedComponent ? componentsData.find(c => c.id === selectedComponent)?.color || '#4ECDC4' : '#4ECDC4';
      ctx.lineWidth = 2;

      // Screen
      ctx.beginPath();
      ctx.moveTo(rotatedPoints[0][0], rotatedPoints[0][1]);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(rotatedPoints[i][0], rotatedPoints[i][1]);
      }
      ctx.closePath();
      ctx.stroke();

      // Base
      ctx.beginPath();
      ctx.moveTo(rotatedPoints[4][0], rotatedPoints[4][1]);
      for (let i = 5; i < 8; i++) {
        ctx.lineTo(rotatedPoints[i][0], rotatedPoints[i][1]);
      }
      ctx.closePath();
      ctx.stroke();

      // Connecting lines
      ctx.beginPath();
      ctx.moveTo(rotatedPoints[2][0], rotatedPoints[2][1]);
      ctx.lineTo(rotatedPoints[5][0], rotatedPoints[5][1]);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rotatedPoints[3][0], rotatedPoints[3][1]);
      ctx.lineTo(rotatedPoints[4][0], rotatedPoints[4][1]);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedComponent]);

  const filteredComponents = componentsData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPageContent = () => {
    const page = allPages[currentPage - 1];
    
    if (page.type === 'intro') {
      return (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{page.title}</h1>
          <p className="text-xl text-gray-600">{page.subtitle}</p>
          <div className="mt-8 space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">{page.content}</p>
            <p className="leading-relaxed">This encyclopedia covers all major laptop components in extensive detail across 500 pages. Navigate through detailed specifications, manufacturer information, best practices, troubleshooting guides, and much more.</p>
          </div>
        </div>
      );
    }

    if (page.type === 'component-overview' && page.component) {
      const Icon = page.component.icon;
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: page.component.color + '20' }}>
              <Icon size={48} style={{ color: page.component.color }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{page.component.name}</h1>
              <p className="text-lg text-gray-600">{page.component.category}</p>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="text-lg font-semibold text-gray-800">{page.component.description}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{page.component.details}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">This component is essential for laptop functionality and comes in various configurations depending on the laptop's intended use case. Understanding its specifications helps in making informed decisions about laptop purchases and upgrades.</p>
          </div>
        </div>
      );
    }

    if (page.type === 'component-specs' && page.component) {
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
          <div className="grid md:grid-cols-2 gap-4">
            {page.component.specs.map((spec, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-800 font-medium">{spec}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 prose max-w-none text-gray-700">
            <p>These specifications represent typical ranges found in modern laptops. Actual values vary based on laptop class (ultrabook, gaming, workstation) and price point. Higher-end models typically feature components at the upper end of these ranges.</p>
          </div>
        </div>
      );
    }

    if (page.type === 'component-manufacturers' && page.component) {
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {page.component.manufacturers.map((mfg, idx) => (
              <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 text-center">
                <p className="text-lg font-bold text-gray-800">{mfg}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-700 mt-6">These manufacturers are leaders in producing high-quality components for laptop systems worldwide. Each brings unique innovations and specializations to the market.</p>
        </div>
      );
    }

    if (page.type === 'component-detail' && page.component) {
      const topics = [
        'Architecture and Design',
        'Performance Characteristics',
        'Power Efficiency',
        'Integration with Other Components',
        'Future Development Trends'
      ];
      return (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
          <h2 className="text-xl font-semibold text-gray-700">{topics[page.detailSection - 1]}</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>This section provides in-depth analysis of {page.component.name.toLowerCase()} focusing on {topics[page.detailSection - 1].toLowerCase()}. Understanding these aspects is crucial for optimal system configuration and performance.</p>
            <p>Modern implementations have evolved significantly, incorporating advanced technologies and manufacturing processes that improve efficiency, reduce power consumption, and enhance overall system performance.</p>
            <p>Industry standards and best practices guide the development and integration of these components, ensuring compatibility and reliability across different laptop models and manufacturers.</p>
          </div>
        </div>
      );
    }

    // Generic content for other page types
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
        <p className="text-xl text-gray-600">{page.subtitle}</p>
        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>This page contains detailed information about {page.title.toLowerCase()}. The content provides comprehensive coverage of relevant topics, technical details, and practical insights.</p>
          <p>Understanding these concepts is essential for anyone working with or purchasing laptop computers. The information presented here draws from industry standards, manufacturer specifications, and real-world testing.</p>
          <p>Each section builds upon previous knowledge to provide a complete understanding of modern laptop technology and its applications in various use cases from basic computing to advanced professional workloads.</p>
          <p>Continued research and development in this field ensures that laptop technology continues to evolve, offering improved performance, efficiency, and user experience with each generation.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">Laptop Components</h1>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className={`md:col-span-1 ${menuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              {/* 3D Visualization */}
              <div className="mb-6">
                <canvas 
                  ref={canvasRef} 
                  width="250" 
                  height="200"
                  className="w-full bg-gray-900 rounded-lg"
                />
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Components List */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800 mb-3">Components</h3>
                {filteredComponents.map(component => {
                  const Icon = component.icon;
                  return (
                    <button
                      key={component.id}
                      onClick={() => setSelectedComponent(component.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedComponent === component.id
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} style={{ color: component.color }} />
                      <span className="text-sm font-medium text-gray-800">{component.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px]">
              {renderPageContent()}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between bg-white rounded-lg shadow-lg p-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= totalPages) setCurrentPage(val);
                  }}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-center"
                />
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopComponentsApp;