
# 🛡️ Passive Poacher Detection System (PPDS)

**PPDS** is a robust, open-source solution built to defend wildlife from poaching through smart, distributed acoustic monitoring. This system uses low-power sensor nodes equipped with AI-powered sound detection to identify threats like gunshots, chainsaws, or unauthorized human presence — and sends real-time alerts to rangers via a centralized dashboard.

Built for conservationists. Engineered for impact.

---

## 🌍 Why It Matters

Poaching remains one of the leading causes of species extinction. Rangers can’t be everywhere — but PPDS can. By blanketing reserves with intelligent, solar-powered listening devices, we enable real-time awareness of illegal activity and help save animal lives with every alert.

---

## 🔧 Core Components

### 🎤 Sensor Nodes
- Runs on **Raspberry Pi Zero 2 W**
- Equipped with **microphones**, local **ML models**, and optional motion/GPS sensors
- Identifies threats *on-device* using TensorFlow Lite (no cloud inference required)

### 🧠 Local AI Inference
- Classifies sounds like:
  - Gunshots
  - Chainsaws
  - Vehicle engines
  - Human voices
- Operates completely offline — only sends alerts

### 🧭 Head Controller (Base Station)
- Central system for receiving alerts from all deployed nodes
- Hosts:
  - **MongoDB database**
  - **React-based dashboard**
  - **API server (Node.js + Express)**

### 📊 Ranger Dashboard
- Clean, map-based interface to visualize alerts
- Real-time updates with audio classification, timestamps, confidence, and GPS data
- Filter, search, and analyze incidents with ease

---

## 🏗️ System Architecture

```
[SENSOR NODE]
  └─ Mic + ML (TF Lite)
  └─ Local audio classification
  └─ Sends JSON alert via network
          ↓
[HEAD CONTROLLER]
  └─ MongoDB + Express API
  └─ Serves React Dashboard
          ↓
[RANGER UI]
  └─ Real-time map + alert log
```

---

## 🚀 Project Status

✅ Core concept and architecture  
✅ React dashboard scaffolding  
✅ MongoDB backend setup  
✅ Sound classification model research (YAMNet, ESC-50, UrbanSound8K)  
✅ Local simulation/testing on development PC  

🔜 Upcoming:
- Raspberry Pi deployment with mic + ML
- LoRa integration for long-range communication
- Real-time notification system (SMS/Email/Signal)
- Solar + battery power management
- GPS logging and anti-tamper features

This is not just a prototype. This is happening.

---

## 💻 Getting Started (Development Setup)

### Clone the Project
```bash
git clone https://github.com/mjbucks/wildlife-conservation-network.git
cd wildlife-conservation-network
```

### Start Backend (MongoDB + Express)
```bash
cd backend
npm install
npm run dev
```

### Start Frontend (React Dashboard)
```bash
cd frontend
npm install
npm start
```

---

## 📦 Tech Stack

- **React.js** (Dashboard UI)
- **Node.js + Express** (API backend)
- **MongoDB** (Data storage)
- **TensorFlow Lite** (On-device ML)
- **Python** (Sensor scripts, testing utilities)
- **Raspberry Pi Zero 2 W** (Deployment hardware)
- **LoRa / Wi-Fi** (Communication protocols)

---

## 🔒 Licensing & Usage

This project is **open-source for non-commercial use only**.

If you are:
- A conservation group
- A government or NGO
- A company looking to deploy PPDS in the field

You must:
- **Credit the author**
- **Request a commercial license**
- **Agree to fair compensation**

See [`LICENSE`](./LICENSE) for details, or email **rohrermaxwell@gmail.com** to start a conversation.

---

## 🤝 Contributions

Whether you're into wildlife conservation, embedded hardware, machine learning, or full-stack development — you're welcome here. Help us build tech that protects.

---

## 🧭 Final Word

Poaching is a global crisis. The technology to fight back is here. We're building it — and we’re going to make it open, reliable, and deployable by anyone who wants to protect endangered life.

Let’s make noise that matters.

📧 Contact: **rohrermaxwell@gmail.com**

    
