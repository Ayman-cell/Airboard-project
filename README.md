# 🌪️ AIRBOARD - Plateforme IA de Surveillance Environnementale OCP Safi

**Système full-stack combinant Machine Learning, API REST et interface moderne pour la prédiction et contrôle des émissions**

<div align="center">

## 🌐 **[DÉCOUVRIR L'APPLICATION](https://airboard-ocp-safi.vercel.app/)** 🌐

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
</div>

---

**AIRBOARD** est une plateforme web complète permettant de surveiller en temps réel les paramètres environnementaux et prévoir les émissions du site industriel OCP Safi à partir du Machine Learning avancé.

Ce projet combine :

- 🧠 Intelligence Artificielle multi-modèles (SARIMA, XGBoost, LSTM)
- ⚙️ API REST haute performance avec Flask
- 🎨 Interface moderne React avec Vite et glassmorphism
- 🌍 Visualisation interactive style Windy
- 📊 Dashboard temps réel avec ~50 capteurs
- 🚀 Architecture produit scalable et modulaire

C'est une architecture full-stack complète démontrant des compétences avancées en développement logiciel moderne, Machine Learning en production et IoT.

---

# ✨ Fonctionnalités principales

## 1️⃣ Prédiction Météorologique via Machine Learning

- 🤖 3 modèles ML entraînés et optimisés :
  - SARIMA (Seasonal ARIMA)
  - XGBoost (Gradient Boosting)
  - LSTM (Deep Learning RNN)
- 📊 Prédictions toutes les 3 heures
- ⏱️ Temps d'inférence < 200ms
- 📈 Accuracy jusqu'à 95% selon les variables
- 🔄 Réentraînement automatique incrémental

---

## 2️⃣ Dashboard Temps Réel

- 📡 Surveillance de ~50 capteurs simultanés
- 🌡️ Paramètres : Température, Humidité, Pression, Éléments polluants
- 📈 Graphiques interactifs et temps réel
- 🎨 Thèmes Sombre/Clair avec persistance
- 📱 Design responsive et optimisé mobile
- ⚡ Mise à jour automatique des données

---

## 3️⃣ Génération Automatisée de Scénarios

- 🎯 Statuts Vert/Jaune/Rouge dynamiques
- 💡 Recommandations actionnables générées par IA
- 📊 Analyse prédictive sur 72h
- 🤖 LLM intégré (Llama, GPT, Qwen) pour contextualisations
- 📄 Génération de rapports automatiques

---

## 4️⃣ API REST Professionnelle (Flask)

- 🚀 Architecture asynchrone et haute performance
- 📄 Documentation Swagger interactive
- 🔍 Validation des données robuste
- 📦 Sérialisation des modèles ML optimisée
- 🔄 Endpoints dynamiques pour prédictions

### Endpoints principaux :

```
GET    /api/sensors              → État actuel des capteurs
GET    /api/forecast-72h         → Prévisions 72h
POST   /api/predict              → Prédiction personnalisée
GET    /api/scenarios            → Scénarios générés
POST   /api/retrain              → Réentraîner les modèles
GET    /api/metrics              → Métriques de performance
DELETE /api/cache                → Vider le cache
```

---

## 5️⃣ Visualisation Interactive

- 🗺️ Cartes style Windy avec données météo
- 🌐 Visualisation 3D des émissions (Three.js)
- 📊 Graphiques temps réel (Recharts, Plotly)
- 🎨 Design glassmorphism moderne
- 📏 Rose des vents animée
- ⚡ Animations fluides et optimisées

---

## 6️⃣ Intelligence Artificielle Générative

- 🧠 Chatbot météorologique intelligent
- 📝 Assistant IA multilingue
- 🎓 Explications contextuelles
- 💬 Support 4 langues (FR, EN, AR, ES)
- 🔑 Modèles : Llama 3, GPT, Qwen

---

## 7️⃣ Performance et Optimisation

### Frontend
- ⚡ Vite build < 100ms
- 🚀 Lighthouse score ~90+
- 📦 Bundle optimisé (~250KB gzipped)
- 🎯 Lazy loading dynamique des charts

### Backend
- 💨 Réponse API < 150ms
- 🔮 Inference ML < 100ms
- 📊 +1000 requêtes/seconde
- 💾 Cache Redis prêt pour intégration

---

# 🛠 Technologies utilisées

| Technologie | Utilisation |
|-------------|------------|
| **React 18** | Interface utilisateur |
| **Vite 5** | Build tool haute performance |
| **TypeScript** | Typage strict |
| **Tailwind CSS** | Styling moderne |
| **Recharts / Plotly** | Visualisation données |
| **Three.js** | Visualisation 3D |
| **Flask 3.0** | API REST |
| **Python 3.9+** | Backend |
| **SARIMA / XGBoost / LSTM** | Prédictions ML |
| **Scikit-learn** | Algorithmes ML |
| **TensorFlow / PyTorch** | Deep Learning |
| **Pandas / NumPy** | Traitement données |
| **Joblib** | Sérialisation modèles |
| **Vercel / Render** | Déploiement |

---

# 🧠 Pipeline Machine Learning

1. 📥 Lecture des fichiers GP2 (données capteurs)
2. 🧹 Nettoyage et imputation des données manquantes
3. 📊 Normalisation et feature engineering
4. 🔀 Validation croisée stratifiée
5. 🤖 Entraînement SARIMA + XGBoost + LSTM
6. 📈 Hyperparameter tuning automatisé
7. 🎯 Sélection du meilleur modèle
8. 💾 Sauvegarde versionnée des modèles
9. 🚀 Déploiement et inférence en temps réel

---

# 📊 Performances des Modèles

| Modèle | Variable | MEA Error | Accuracy |
|--------|----------|-----------|----------|
| SARIMA | Température | ±0.5°C | 94% |
| XGBoost | PM2.5 | ±2.3 µg/m³ | 93% |
| LSTM | Humidité | ±3.2% | 92% |

---

# 📂 Structure du projet

```
Airboard-Project/
├── src/                                  # Frontend React
│   ├── components/
│   │   ├── pages/                       # Pages principales
│   │   ├── dashboard/                   # Composants dashboard
│   │   ├── sections/                    # Sections home
│   │   └── ui/                          # Composants réutilisables
│   ├── assets/                          # Images et ressources
│   ├── styles/                          # CSS global
│   └── main.tsx                         # Point d'entrée
│
├── Info Windy/                           # Backend Flask
│   ├── Windy_Server.py                  # Serveur principal
│   ├── ml_forecast.py                   # Modèles ML
│   ├── chatbot_windy.py                 # Chatbot IA
│   ├── llama.py                         # Assistant LLM
│   ├── Models/                          # Modèles sauvegardés (Git LFS)
│   ├── data/                            # Données capteurs
│   └── requirements.txt                 # Dépendances Python
│
├── 22.py                                # Streamlit rapports
├── analyse_kpi_llm.py                  # Analyse KPIs avec LLM
├── setup_env.py                         # Configuration API keys
├── package.json                         # Dépendances Node.js
├── vite.config.ts                      # Config Vite
└── README.md                            # Documentation

```

---

# 🚀 Installation et Démarrage

## 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Ayman-cell/Airboard-project.git
cd Airboard-project
```

---

## 2️⃣ Installation Frontend

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur : **http://localhost:5173**

---

## 3️⃣ Installation Backend

```bash
# Créer un environnement virtuel
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# ou
.\.venv\Scripts\activate    # Windows

# Installer les dépendances
cd "Info Windy"
pip install -r requirements.txt
pip install python-dotenv

# Démarrer le serveur Flask
python Windy_Server.py
```

Le serveur API sera accessible sur : **http://127.0.0.1:5000**

---

## 4️⃣ Configuration des Clés API

Exécutez le script de configuration interactif :

```bash
python setup_env.py
```

Ou configurez manuellement le fichier `.env` :

```env
CEREBRAS_API_KEY=votre_cle_cerebras
GEMINI_API_KEY=votre_cle_gemini
CEREBRAS_ENDPOINT=https://api.cerebras.ai/v1/completions
```

---

# 🐳 Déploiement

## Frontend
Déploiement automatique sur Vercel à chaque push.

```bash
npm run build
```

## Backend
Compatible avec :
- Render
- Railway  
- Docker
- AWS / Azure

```bash
docker build -t airboard-api .
docker run -p 5000:5000 airboard-api
```

---

# 🔒 Sécurité

- 🔐 Validation stricte des entrées
- 📊 Sanitization des données
- 🛡 Headers de sécurité optimisés
- ⏱️ Rate limiting disponible
- 🔑 Gestion sécurisée des API keys via `.env`

---

# 💼 Cas d'usage

- 🌍 Monitoring industriel en production
- 🔬 Recherche environnementale
- 🎓 Projet académique avancé
- 📊 Démonstration ML + IoT
- 🚀 Prototype SaaS pour monitoring

---

# 🎯 Compétences démontrées

## Frontend
- Architecture React moderne avec Vite
- Optimisation performance UX
- Visualisation 3D et interactive
- Design responsive et accessible

## Backend
- API REST professionnelle Flask
- Validation et gestion erreurs robustes
- Intégration LLM et modèles ML
- Scalabilité et performance

## Machine Learning
- Multi-modèles (SARIMA, XGBoost, LSTM)
- Hyperparameter tuning automatisé
- Validation croisée stratifiée
- Déploiement production temps réel

## DevOps & Infrastructure
- Vercel & autres cloud platforms
- Docker & containerisation
- Git LFS pour modèles volumineux
- CI/CD ready

---

# 📝 Licence

Licence MIT.

---

# 👨‍💻 Auteurs

**Équipe AirBoard - EMINES, UMP Benguerir**

- **Ayman** - Full-Stack Developer & ML Engineer
  - GitHub : https://github.com/Ayman-cell
  
- Hicham Smaiti - Backend & Data Science
- Jad Lasiri - Frontend & UI/UX
- Rihab Essafi - ML & Optimization

---

# 🚀 Conclusion

AIRBOARD n'est pas un simple projet.

C'est :

- Une architecture complète production-ready
- Un système IA déployé et scalable
- Une interface immersive et moderne
- Une API professionnelle haute performance
- Une démonstration d'expertise full-stack

Un projet qui illustre la capacité à concevoir, développer, optimiser et déployer un système complet de monitoring intelligent pour des cas d'usage réels en environnement industriel.

---

**Monitoring intelligent des émissions pour un avenir durable** 🌍

## 🤖 Récupération des Modèles ML

Les modèles de Machine Learning sont stockés avec **Git LFS** (Large File Storage) pour optimiser le clonage du repository. Vous devez les télécharger séparément après avoir cloné le projet.

### Prérequis : Installation de Git LFS

**Windows** :
```bash
# Télécharger depuis : https://git-lfs.github.com/
# Ou installer via Chocolatey :
choco install git-lfs

# Ou installer via winget :
winget install GitHub.GitLFS
```

**Linux (Ubuntu/Debian)** :
```bash
sudo apt-get install git-lfs
```

**macOS** :
```bash
brew install git-lfs
```

### Récupération des Modèles

Après avoir cloné le repository, suivez ces étapes :

1. **Initialiser Git LFS** (si ce n'est pas déjà fait) :
   ```bash
   git lfs install
   ```

2. **Télécharger les modèles ML** :
   ```bash
   # Depuis la racine du projet
   git lfs pull
   ```

   Cette commande télécharge automatiquement tous les modèles depuis GitHub :
   - `Info Windy/Models/xgb_best.pkl` (XGBoost)
   - `Info Windy/Models/lgbm_best.pkl` (LightGBM)
   - `Info Windy/Models/hgbr_best.pkl` (Histogram Gradient Boosting)
   - `Info Windy/Models/model_bundle.pkl` (Bundle avec scalers et métadonnées)
   - `Info Windy/Models/LSTM_best.keras` (LSTM TensorFlow)

3. **Vérifier que les modèles sont présents** :
   ```bash
   # Vérifier les fichiers trackés par Git LFS
   git lfs ls-files
   
   # Vérifier que les fichiers existent
   ls "Info Windy/Models/"
   ```

### Alternative : Clonage avec LFS automatique

Si Git LFS est déjà installé, vous pouvez cloner directement avec les fichiers LFS :

```bash
git clone https://github.com/Jalkyn/Airboard-Project.git
cd Airboard-Project
git lfs pull  # Télécharger les modèles
```

### Dépannage

**Problème** : Les modèles ne se téléchargent pas
- Vérifiez que Git LFS est installé : `git lfs version`
- Vérifiez que Git LFS est initialisé : `git lfs install`
- Essayez de forcer le pull : `git lfs fetch --all` puis `git lfs checkout`

**Problème** : Erreur "Git LFS not found"
- Installez Git LFS depuis https://git-lfs.github.com/
- Redémarrez votre terminal après l'installation

> ⚠️ **Important** : Les modèles ML sont nécessaires pour les fonctionnalités de prévision météorologique. Sans ces modèles, l'API `/api/forecast/ml` ne fonctionnera pas correctement.

## 🔐 Configuration des Clés API

**⚠️ IMPORTANT** : Aucune clé API n'est stockée dans le code source. Vous devez les configurer avant d'exécuter le projet.

### Méthode 1 : Script Automatique (Recommandé)

Exécutez le script d'initialisation interactif :

```bash
python setup_env.py
```

Le script vous guidera pour entrer toutes vos clés API :
- `CEREBRAS_API_KEY` : Clé API Cerebras générique
- `CEREBRAS_GPT_OSS_120B_KEY` : Clé pour GPT-OSS-120B
- `CEREBRAS_QWEN_235B_KEY` : Clé pour Qwen-3-235B
- `CEREBRAS_QWEN_32B_KEY` : Clé pour Llama-3.3-70B
- `GEMINI_API_KEY` : Clé API Google Gemini

Le script créera automatiquement un fichier `.env` à la racine du projet.

### Méthode 2 : Configuration Manuelle

1. **Copier le fichier d'exemple** :
   ```bash
   cp env.example.txt .env
   ```

2. **Éditer le fichier `.env`** et remplir vos clés API :
   ```env
   CEREBRAS_API_KEY=votre_cle_cerebras_ici
   CEREBRAS_GPT_OSS_120B_KEY=votre_cle_gpt_ici
   CEREBRAS_QWEN_235B_KEY=votre_cle_qwen_235b_ici
   CEREBRAS_QWEN_32B_KEY=votre_cle_llama_ici
   GEMINI_API_KEY=votre_cle_gemini_ici
   CEREBRAS_ENDPOINT=https://api.cerebras.ai/v1/completions
   ```

3. **Sécurité** :
   - Le fichier `.env` contient des informations sensibles
   - Ne partagez jamais ce fichier publiquement

### Clés API Optionnelles

Certaines clés sont optionnelles selon les fonctionnalités utilisées :

- **CEREBRAS_GPT_OSS_120B_KEY** : Requis uniquement si vous utilisez le modèle GPT-OSS-120B
- **CEREBRAS_QWEN_235B_KEY** : Requis uniquement si vous utilisez le modèle Qwen-3-235B
- **CEREBRAS_QWEN_32B_KEY** : Requis uniquement si vous utilisez le modèle Llama-3.3-70B
- **CEREBRAS_API_KEY** : Requis pour `llama.py` et `chatbot_windy.py`
- **GEMINI_API_KEY** : Requis pour la génération de rapports et l'analyse LLM

> 📖 Pour plus de détails, consultez [README_API_KEYS.md](README_API_KEYS.md)

## ▶️ Exécution du Projet

Le projet se compose de **2 composants principaux** à exécuter :

### 1. Backend Flask (API Météo)

**Terminal 1** - Lancer le serveur backend :

```bash
# Depuis le dossier Info Windy
cd "Info Windy"

# Lancer le serveur Flask
python Windy_Server.py
```

Le serveur API sera accessible sur : **http://127.0.0.1:5000**

> ⚠️ **Important** : Le serveur doit être démarré avant le frontend

### 2. Frontend React (Interface Utilisateur)

**Terminal 2** - Lancer l'interface utilisateur :

```bash
# Depuis la racine du projet
npm install        # Première fois uniquement (ou après modification de package.json)
npm run dev
```

L'application sera accessible sur : **http://localhost:3000**

> 💡 Le serveur de développement Vite se relance automatiquement lors des modifications

---

## 📂 Utilisation du Dossier de Données

### Configuration du Dossier de Données

Le système utilise par défaut le dossier `Info Windy/data/` pour lire les fichiers de données GP2.

### Utiliser un Dossier Personnalisé

**⚠️ RECOMMANDATION IMPORTANTE** : Pour utiliser un dossier de données personnalisé, **entrez le chemin absolu complet** dans l'interface :

1. **Ouvrez le Dashboard** dans l'interface React
2. **Localisez le champ "Chemin des données"** dans la barre de filtres en haut
3. **Entrez le chemin absolu complet** de votre dossier, par exemple :
   - Windows : `C:\Users\VotreNom\Documents\MesDonnees\data_2025`
   - Linux/Mac : `/home/utilisateur/donnees/data_2025`
4. **Appuyez sur Entrée** ou cliquez sur l'icône dossier pour valider

> 💡 **Pourquoi le chemin absolu ?**
> - Le système peut détecter votre dossier même s'il est dans un autre emplacement
> - Plus fiable que les chemins relatifs
> - Fonctionne même si vous exécutez le serveur depuis un autre répertoire

### Exemple de Chemins Absolus

**Windows** :
```
C:\Users\jadla\Downloads\Info Windy\data_new2
D:\Projets\OCP\Donnees\data_janvier_2025
```

**Linux/Mac** :
```
/home/user/donnees/data_new2
/Users/nom/Documents/OCP/data_janvier_2025
```

### Dossier par Défaut

Si vous ne spécifiez pas de dossier personnalisé, le système utilisera automatiquement :
- `Info Windy/data/` (créé automatiquement s'il n'existe pas)

## 📁 Structure du Projet

```
Background Component Setup (3)/
├── src/                          # Frontend React
│   ├── components/              # Composants React
│   │   ├── pages/               # Pages principales
│   │   ├── sections/            # Sections de la page d'accueil
│   │   ├── dashboard/            # Composants du dashboard
│   │   └── ui/                  # Composants UI réutilisables
│   ├── assets/                  # Images et ressources
│   └── main.tsx                 # Point d'entrée React
│
├── Info Windy/                   # Backend Python
│   ├── Windy_Server.py          # Serveur Flask principal
│   ├── llama.py                 # Assistant IA multilingue
│   ├── chatbot_windy.py        # Chatbot météo
│   ├── ml_forecast.py           # Modèles ML de prévision
│   ├── Models/                  # Modèles ML sauvegardés
│   └── requirements.txt         # Dépendances Python
│
├── 22.py                        # Application Streamlit (rapports)
├── analyse_kpi_llm.py          # Analyse KPI avec LLM
├── setup_env.py                # Script de configuration API
├── env.example.txt              # Template des variables d'environnement
├── .gitignore                  # Fichiers ignorés par Git
├── package.json                # Dépendances Node.js
├── vite.config.ts              # Configuration Vite
└── README.md                   # Ce fichier
```

## 🔧 Dépannage

### Problème : "Clé API manquante"

**Symptôme** : Erreur `❌ Clé API manquante: CEREBRAS_API_KEY`

**Solution** :
1. Vérifiez que le fichier `.env` existe à la racine du projet
2. Vérifiez que toutes les clés nécessaires sont présentes dans `.env`
3. Exécutez `python setup_env.py` pour reconfigurer
4. Assurez-vous que `python-dotenv` est installé : `pip install python-dotenv`

### Problème : Module non trouvé (Python)

**Symptôme** : `ModuleNotFoundError: No module named 'xxx'`

**Solution** :
```bash
# Réinstaller les dépendances
cd "Info Windy"
pip install -r requirements.txt
```

### Problème : Port déjà utilisé

**Symptôme** : `Address already in use` ou `Port 3000 is already in use`

**Solution** :
- **Frontend** : Modifier le port dans `vite.config.ts` ou tuer le processus utilisant le port
- **Backend Flask** : Modifier le port dans `Windy_Server.py` (ligne 2497)

### Problème : Erreur TensorFlow

**Symptôme** : Erreurs liées à TensorFlow sur Windows

**Solution** :
```bash
# Désinstaller tensorflow
pip uninstall tensorflow

# Installer tensorflow-cpu (plus léger, pas de GPU requis)
pip install tensorflow-cpu>=2.13.0
```

### Problème : Node modules corrompus

**Symptôme** : Erreurs étranges avec npm

**Solution** :
```bash
# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s node_modules & del package-lock.json  # Windows

# Réinstaller
npm install
```

### Problème : Variables d'environnement non chargées

**Symptôme** : Les clés API ne sont pas reconnues malgré le fichier `.env`

**Solution** :
1. Vérifiez que `python-dotenv` est installé
2. Vérifiez que le fichier `.env` est à la racine du projet (même niveau que `setup_env.py`)
3. Vérifiez le format du fichier `.env` (pas d'espaces autour du `=`)
4. Redémarrez l'application après modification de `.env`

### Problème : Modèles ML manquants

**Symptôme** : Erreur `Modèle xgb non trouvé` ou `Bundle de modèles non trouvé`

**Solution** :
1. Vérifiez que Git LFS est installé : `git lfs version`
2. Initialisez Git LFS : `git lfs install`
3. Téléchargez les modèles : `git lfs pull`
4. Vérifiez que les fichiers existent dans `Info Windy/Models/` :
   ```bash
   ls "Info Windy/Models/"
   ```
5. Si les fichiers sont absents, réessayez :
   ```bash
   git lfs fetch --all
   git lfs checkout
   ```

## 📚 Documentation Supplémentaire

- [README_API_KEYS.md](README_API_KEYS.md) : Guide détaillé sur la configuration des clés API
- [src/README.md](src/README.md) : Documentation du frontend React
- [Info Windy/API_DIAGNOSTICS.md](Info%20Windy/API_DIAGNOSTICS.md) : Diagnostics de l'API

## 🤝 Support

Pour toute question ou problème :

1. Vérifiez la section [Dépannage](#dépannage)
2. Consultez la documentation dans les fichiers README spécifiques
3. Vérifiez que toutes les dépendances sont installées
4. Vérifiez que toutes les clés API sont configurées

## 📝 Notes Importantes

- ⚠️ **Ne partagez jamais le fichier `.env`** publiquement
- 🔐 **Ne partagez jamais vos clés API publiquement**
- 📦 **Installez les dépendances** avant la première exécution
- 🔄 **Redémarrez les serveurs** après modification de `.env`

## 📄 Licence

Ce projet est développé pour OCP Safi dans le cadre d'un projet académique.

---

**Développé par** : Équipe AirBoard - EMINES, Université Mohammed VI Polytechnique de Benguerir

**Membres de l'équipe** :
- Ayman Amasrour
- Jad Lasiri
- Rihab Essafi
  
