import csv
import sys
import os

pages_data = [
    {
        "Route URL": "/",
        "Page Name": "Home / Landing Page",
        "Source File": "src/app/page.tsx",
        "Page Type": "Static Page",
        "Purpose & What It Indicates": "Primary brand entrance for SEIKO Labs. Introduces the STEM mission, flagship kit, featured hardware tracks, interactive curriculum platform, and user reviews.",
        "Key Features & Components": "Hero Banner with interactive CTAs, Popular Categories Grid, Flagship Robotics Kit Showcase, Learning Platform Highlights, Customer Testimonials, Newsletter Form, Global Header/Footer",
        "Target Audience": "All Visitors, Students, Educators, Parents",
        "Status": "Live / Active"
    },
    {
        "Route URL": "/products",
        "Page Name": "Shop / Engineering Disciplines Showcase",
        "Source File": "src/app/products/page.tsx",
        "Page Type": "Static / Interactive Hub",
        "Purpose & What It Indicates": "Central showcase for browsing all 20+ specialized engineering domains. Enables interactive exploration of disciplines with left sidebar selector, 3 value pillars, and bottom carousel.",
        "Key Features & Components": "Interactive Left Domain Selector Sidebar (with active states), Featured Domain Stage (01/20 index, 3 Value Pillars: Hands-on Learning, Industry Grade Components, Real-world Applications), Prev/Next Carousel Arrows, Bottom 'All Product Domains' Carousel, Full-Screen 'View All 20 Domains' Search Modal",
        "Target Audience": "Students, Makers, STEM Teachers, Hobbyists",
        "Status": "Live / Active"
    },
    {
        "Route URL": "/[domain] (e.g. /robotics, /water-aqua, /biomedical-health)",
        "Page Name": "Dynamic Domain Track Page",
        "Source File": "src/app/[domain]/page.tsx",
        "Page Type": "Dynamic Route (20 Tracks)",
        "Purpose & What It Indicates": "Dedicated deep-dive curriculum track for each specific engineering discipline. Explains real-world industry applications, hardware architecture components, and lists all available STEM kits.",
        "Key Features & Components": "Discipline Breadcrumb Navigation, Hero with Discipline Tag & High-Res Photography, Real-World Industry Applications Grid, Hardware Architecture Component Breakdown, Available Hardware Kits with Pricing, Specs & Add-to-Cart, Cross-Disciplinary Exploration Carousel",
        "Target Audience": "Learners focusing on specific disciplines (e.g. Robotics, AI, IoT, Medical Tech)",
        "Status": "Live / Active"
    },
    {
        "Route URL": "/products/[id] (e.g. /products/smart-robotics-rover-kit)",
        "Page Name": "Kit Detail & Hardware Specification Page",
        "Source File": "src/app/products/[id]/page.tsx",
        "Page Type": "Dynamic Route (Per Kit)",
        "Purpose & What It Indicates": "Comprehensive product specification and curriculum workbook view for individual hardware kits. Displays full technical specs, included parts, and 5-stage learning modules.",
        "Key Features & Components": "Product Image Stage with discount pill & stock badge, Pricing & Add-to-Cart CTA, Technical Specifications Table, 'What's Inside the Box' Component Inventory, 5-Step Interactive Learning Modules Accordion (Setup, Theory, Build, Code, Experiment), Related Projects & Kits",
        "Target Audience": "Buyers, Educators evaluating kit contents, Students following guided builds",
        "Status": "Live / Active"
    },
    {
        "Route URL": "/about",
        "Page Name": "About Us",
        "Source File": "src/app/about/page.tsx",
        "Page Type": "Static Page",
        "Purpose & What It Indicates": "Explains the SEIKO Labs founding vision, educational philosophy, STEM engineering values, safety standards, and global community impact.",
        "Key Features & Components": "Mission & Vision Statements, 4 Core Engineering Values (Hands-on First, Open Source, Lab Safety, Global Accessibility), Founding Story & Educator Team, Impact Statistics Counter",
        "Target Audience": "Schools, Institutional Buyers, Parents, Investors",
        "Status": "Live / Active"
    },
    {
        "Route URL": "/contact",
        "Page Name": "Contact & Engineering Support",
        "Source File": "src/app/contact/page.tsx",
        "Page Type": "Static Page",
        "Purpose & What It Indicates": "Direct communication channel for customer support, institutional bulk lab quotes, educator inquiries, and hardware troubleshooting.",
        "Key Features & Components": "Interactive Contact Inquiry Form (with validation), Direct Support Hotline & Email Cards, School Lab Partnership Inquiry Section, FAQ Accordion for fast answers",
        "Target Audience": "Customers needing support, Schools requesting institutional quotes",
        "Status": "Live / Active"
    }
]

domains_data = [
    {"#": 1, "Domain Name": "Robotics", "URL Route": "/robotics", "Discipline Field": "Autonomous Systems & Kinematics", "Purpose": "Teaches closed-loop motor control, obstacle mapping, and multi-axis articulation.", "Featured Kits": "SEIKO Smart Autonomous Rover Kit, SEIKO 4-DOF Robotic Arm, SEIKO Bipedal Walker", "Key Components": "L298N Driver, HC-SR04 Ultrasonic, SG90 Servos, ATmega328P MCU"},
    {"#": 2, "Domain Name": "Water & Aqua", "URL Route": "/water-aqua", "Discipline Field": "Aquatic & Marine Engineering", "Purpose": "Explores marine telemetry, waterproof sensors, hull buoyancy, and solar boats.", "Featured Kits": "SEIKO Solar Aquatic Boat Kit, Submersible Telemetry Probe, Water Quality Monitor", "Key Components": "IP68 Temp Sensor, Turbidity Sensor, Solar Thruster Motors, ESP32"},
    {"#": 3, "Domain Name": "Music & Sound", "URL Route": "/music-sound", "Discipline Field": "Audio DSP & Acoustic Synthesis", "Purpose": "Connects digital signal processing (DSP) with creative acoustics and synthesizers.", "Featured Kits": "SEIKO DIY Synth Generator, Capacitive MIDI Touch Piano, Audio Spectrum Visualizer", "Key Components": "MPR121 Touch Sensor, DAC Audio Module, 128x64 OLED, Piezo Buzzers"},
    {"#": 4, "Domain Name": "IoT & Smart Devices", "URL Route": "/iot-smart-devices", "Discipline Field": "Embedded IoT & Cloud Telemetry", "Purpose": "Teaches Wi-Fi networking, MQTT cloud protocols, and remote telemetry dashboards.", "Featured Kits": "SEIKO Cloud Telemetry Station, ESP32 Wi-Fi Sensor Hub, Wireless Environmental Node", "Key Components": "ESP32 Dual-Core MCU, BME280 Atmospheric Sensor, ThingSpeak API"},
    {"#": 5, "Domain Name": "Biomedical & Health", "URL Route": "/biomedical-health", "Discipline Field": "Biomedical Engineering & Wearables", "Purpose": "Introduces biomedical instrumentation, ECG heart rate monitors, and SpO2 telemetry.", "Featured Kits": "SEIKO Biomedical Health Monitor Kit, ECG & Pulse Telemetry Kit, Health Wearable Node", "Key Components": "AD8232 ECG Sensor, MAX30102 Heart Rate/SpO2, BLE Transceiver"},
    {"#": 6, "Domain Name": "Vehicles & Transportation", "URL Route": "/vehicles-transportation", "Discipline Field": "Automotive & Electric Mobility", "Purpose": "Covers electric drivetrain mechanics, PWM speed control, and transit simulation.", "Featured Kits": "SEIKO Electric Vehicle Speed Controller, Smart Transit Simulator, Differential Gearbox", "Key Components": "Brushed Motors, Hall Effect Sensors, PWM Speed Shield, 7-Segment Display"},
    {"#": 7, "Domain Name": "Space & Aerospace", "URL Route": "/space-aerospace", "Discipline Field": "Aerospace & Orbital Telemetry", "Purpose": "Simulates satellite orbit tracking, atmospheric data logging, and rocket telemetry.", "Featured Kits": "SEIKO Cubesat Nanosatellite Kit, Atmospheric Sondes Logger, Ground Station Radio", "Key Components": "MPU6050 6-Axis Gyro, BMP280 Altimeter, LoRa 915MHz Radio, Flash Logger"},
    {"#": 8, "Domain Name": "Agriculture & Environment", "URL Route": "/agriculture-environment", "Discipline Field": "Agritech & Sustainable Ecology", "Purpose": "Teaches automated drip irrigation, capacitive soil sensing, and climate regulation.", "Featured Kits": "SEIKO Smart Agriculture Irrigation Kit, Greenhouse Climate Controller, Solar Weather Station", "Key Components": "Capacitive Soil Sensor, 5V Solenoid Valve, DHT22 Humidity, Relay Bank"},
    {"#": 9, "Domain Name": "Smart Home & Automation", "URL Route": "/smart-home-automation", "Discipline Field": "Smart Living & Ambient Automation", "Purpose": "Introduces residential automation, relay switching, RFID smart locks, and voice nodes.", "Featured Kits": "SEIKO Smart Home Automation Hub, RFID Door Security Lock, Automated Climate Controller", "Key Components": "4-Channel Relay Bank, RC522 RFID Reader, ESP8266 Wi-Fi, IR Receiver"},
    {"#": 10, "Domain Name": "Energy & Power", "URL Route": "/energy-power", "Discipline Field": "Renewable Energy & Power Systems", "Purpose": "Demonstrates solar dual-axis sun tracking, supercapacitor storage, and energy meters.", "Featured Kits": "SEIKO Solar Panel Sun Tracking Kit, Micro-Grid Power Monitor, Renewable Energy Lab", "Key Components": "LDR Light Sensors, SG90 Servos, INA219 Current Meter, Solar Charging Board"},
    {"#": 11, "Domain Name": "Safety & Security", "URL Route": "/safety-security", "Discipline Field": "Cyber-Physical & Perimeter Security", "Purpose": "Covers physical security hardware, PIR motion alarms, and toxic gas leak alerts.", "Featured Kits": "SEIKO Perimeter Intrusion Security Kit, Gas Leak Alert System, Laser Tripwire Lab", "Key Components": "PIR Infrared Sensor, MQ-2 Gas Sensor, RC522 RFID, High-Decibel Siren"},
    {"#": 12, "Domain Name": "Science & Experiments", "URL Route": "/science-experiments", "Discipline Field": "Fundamental Physics & Circuit Theory", "Purpose": "Bridges physical science experiments with electronic data logging and logic circuits.", "Featured Kits": "SEIKO Circuit Starter Workbook Kit, Physics Data Logger Kit, Light & Sound Probe", "Key Components": "830 Point Breadboard, Multimeter Probes, Phototransistors, 74HC Logic ICs"},
    {"#": 13, "Domain Name": "Gaming & Interactive", "URL Route": "/gaming-interactive", "Discipline Field": "Game Engine Architecture & Interactive Tech", "Purpose": "Teaches 2D game engine math, frame buffer rendering, and hardware button interrupts.", "Featured Kits": "SEIKO Retro Arcade Console Engine, Reflex & Speed Reaction Tester, Quiz Buzzer Arena", "Key Components": "1.3\" SPI OLED Display, Tactile D-Pad Buttons, Interrupt Pins, EEPROM"},
    {"#": 14, "Domain Name": "AI & Intelligent Machines", "URL Route": "/ai-intelligent-machines", "Discipline Field": "Edge AI & Embedded Machine Learning", "Purpose": "Introduces edge AI (TinyML), computer vision face tracking, and voice command neural inference.", "Featured Kits": "SEIKO AI Vision & Voice Robot, TinyML Neural Gesture Glove, Optical Tracking Cam Shield", "Key Components": "ESP32-CAM OV2640, Pan-Tilt Dual Servos, TensorFlow Lite Micro, Speech IC"},
    {"#": 15, "Domain Name": "Mechanical & Machines", "URL Route": "/mechanical-machines", "Discipline Field": "Mechanics, Kinematics & Actuators", "Purpose": "Focuses on mechanical advantage physics, gear torque ratios, and linkage kinematics.", "Featured Kits": "SEIKO Mechanical Workbench Lab, Gear Reduction & Torque Crane, Linkage Assembler", "Key Components": "Spur & Worm Gears, High-Torque DC Motors, Pulley Belts, Acrylic Linkages"},
    {"#": 16, "Domain Name": "Aviation", "URL Route": "/aviation", "Discipline Field": "Aerodynamics, Avionics & Flight Control", "Purpose": "Explores lift aerodynamics, 4-rotor drone stabilization, brushless ESCs, and PID algorithms.", "Featured Kits": "SEIKO DIY Quadcopter Drone Flight Kit, Wind Tunnel Aerodynamics Tester, PID Board", "Key Components": "Brushless Motors, 30A ESC Controllers, MPU6050 Flight Gyro, 2.4GHz RF Receiver"},
    {"#": 17, "Domain Name": "Communication", "URL Route": "/communication", "Discipline Field": "Wireless Telecommunications & RF", "Purpose": "Covers long-range LoRa packet radio, Bluetooth LE serial telemetry, and IR decoding.", "Featured Kits": "SEIKO LoRa Wireless Kit, Bluetooth LE Transceiver Node, Infrared Remote Lab", "Key Components": "SX1276 LoRa 915MHz Module, HC-05 Bluetooth, IR Transmitter/Receiver Diodes"},
    {"#": 18, "Domain Name": "Disaster & Rescue", "URL Route": "/disaster-rescue", "Discipline Field": "Disaster Mitigation & Emergency Systems", "Purpose": "Teaches emergency response engineering, seismic tremor alarms, and river flood telemetry.", "Featured Kits": "SEIKO Disaster & Rescue Beacon Kit, Flood Telemetry Warning System, Seismic Alarm Node", "Key Components": "Vibration Piezo Sensor, Ultrasonic Water Level Sensor, High-Lumen Strobe, Battery"},
    {"#": 19, "Domain Name": "Smart City", "URL Route": "/smart-city", "Discipline Field": "Urban Infrastructure & Smart Grids", "Purpose": "Demonstrates smart traffic intersection timing, ultrasonic parking guidance, and waste telemetry.", "Featured Kits": "SEIKO Smart City Traffic Grid Simulator, Ultrasonic Parking Guidance, Waste Telemetry", "Key Components": "MAX7219 LED Matrices, Ultrasonic Vehicle Sensors, Light Sensors, Push Buttons"},
    {"#": 20, "Domain Name": "Industrial Automation", "URL Route": "/industrial-automation", "Discipline Field": "Industrial Mechatronics & Factory Systems", "Purpose": "Introduces factory automation, PLC ladder logic simulation, conveyor sorting, and RS485 Modbus.", "Featured Kits": "SEIKO Industrial Automation Sorter Kit, PLC Relay Controller Trainer, RS485 Hub", "Key Components": "TCS3200 Color Sensor, Conveyor Servo Actuator, 4-Channel Relays, RS485 IC"}
]

# Write CSV files
with open("public/seiko_labs_pages_and_routes.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=pages_data[0].keys())
    writer.writeheader()
    writer.writerows(pages_data)

with open("public/seiko_labs_all_20_domains.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=domains_data[0].keys())
    writer.writeheader()
    writer.writerows(domains_data)

print("CSV files generated successfully in public/ folder.")

# Try creating Excel XLSX file via openpyxl
try:
    import openpyxl
    from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
    from openpyxl.utils import get_column_letter

    wb = openpyxl.Workbook()
    
    # Sheet 1: Pages & Routes
    ws1 = wb.active
    ws1.title = "Pages & Routes Overview"
    ws1.views.sheetView[0].showGridLines = True

    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    header_fill = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="5C6B38", end_color="5C6B38", fill_type="solid")
    
    headers1 = list(pages_data[0].keys())
    ws1.append(headers1)
    
    for col_num, header in enumerate(headers1, 1):
        cell = ws1.cell(row=1, column=col_num)
        cell.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

    thin_border = Border(
        left=Side(style="thin", color="E0E0E0"),
        right=Side(style="thin", color="E0E0E0"),
        top=Side(style="thin", color="E0E0E0"),
        bottom=Side(style="thin", color="E0E0E0")
    )

    for row_idx, row_data in enumerate(pages_data, 2):
        row_values = list(row_data.values())
        ws1.append(row_values)
        row_fill = PatternFill(start_color="F9FBF6" if row_idx % 2 == 0 else "FFFFFF", fill_type="solid")
        for col_idx in range(1, len(row_values) + 1):
            cell = ws1.cell(row=row_idx, column=col_idx)
            cell.font = Font(name="Calibri", size=10)
            cell.fill = row_fill
            cell.border = thin_border
            cell.alignment = Alignment(vertical="center", wrap_text=True)

    # Auto adjust column widths
    for col in ws1.columns:
        max_len = max(len(str(cell.value or "")) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws1.column_dimensions[col_letter].width = min(max(max_len + 3, 14), 45)

    ws1.row_dimensions[1].height = 28

    # Sheet 2: 20 Engineering Domains
    ws2 = wb.create_sheet(title="20 Engineering Domains")
    ws2.views.sheetView[0].showGridLines = True
    
    headers2 = list(domains_data[0].keys())
    ws2.append(headers2)
    
    header_fill_2 = PatternFill(start_color="3B5249", end_color="3B5249", fill_type="solid")
    for col_num, header in enumerate(headers2, 1):
        cell = ws2.cell(row=1, column=col_num)
        cell.font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
        cell.fill = header_fill_2
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)

    for row_idx, row_data in enumerate(domains_data, 2):
        row_values = list(row_data.values())
        ws2.append(row_values)
        row_fill = PatternFill(start_color="F5F8F5" if row_idx % 2 == 0 else "FFFFFF", fill_type="solid")
        for col_idx in range(1, len(row_values) + 1):
            cell = ws2.cell(row=row_idx, column=col_idx)
            cell.font = Font(name="Calibri", size=10)
            cell.fill = row_fill
            cell.border = thin_border
            cell.alignment = Alignment(vertical="center", wrap_text=True)

    for col in ws2.columns:
        max_len = max(len(str(cell.value or "")) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws2.column_dimensions[col_letter].width = min(max(max_len + 3, 14), 45)

    ws2.row_dimensions[1].height = 28

    excel_path = "public/seiko_labs_website_pages_and_routes.xlsx"
    wb.save(excel_path)
    print(f"Excel XLSX workbook generated successfully at: {excel_path}")

except ImportError:
    print("openpyxl not installed, CSV files created successfully.")
