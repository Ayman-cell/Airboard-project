# 🌪️ AirBoard - Système de Surveillance Environnementale OCP Safi

Système complet de surveillance environnementale et de contrôle des émissions pour le site industriel OCP Safi, avec prévisions météorologiques basées sur le Machine Learning, génération automatisée de scénarios et visualisations interactives.

## 📋 Table des Matières

- [Présentation](#présentation)
- [Architecture du Projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Récupération des Modèles ML](#récupération-des-modèles-ml)
- [Configuration des Clés API](#configuration-des-clés-api)
- [Exécution du Projet](#exécution-du-projet)
- [Structure du Projet](#structure-du-projet)
- [Dépannage](#dépannage)

## 🎯 Présentation

AirBoard est un système complet de monitoring environnemental qui combine :

- **Dashboard en Temps Réel** : Surveillance de ~50 capteurs sur le site
- **Prévisions Météorologiques ML** : Prédictions toutes les 3 heures avec modèles SARIMA, XGBoost et LSTM
- **Scénarios Automatisés** : Statuts Vert/Jaune/Rouge avec recommandations actionnables
- **Cartes Interactives** : Visualisation météo et émissions style Windy
- **Thèmes Sombre/Clair** : Toggle de thème avec persistance localStorage
- **Interface Moderne** : Design glassmorphism avec animations fluides

## 🏗️ Architecture du Projet

Le projet est composé de **2 composants principaux** :

1. **Frontend React** (`src/`) : Interface utilisateur moderne avec Vite
   - Dashboard en temps réel
   - Visualisations interactives
   - Gestion des données météorologiques

2. **Backend Flask** (`Info Windy/Windy_Server.py`) : API REST pour les données météo
   - Lecture des fichiers GP2
   - API REST pour le frontend
   - Chatbot météorologique (optionnel, nécessite clés API)
   - Prévisions météorologiques

## 📦 Prérequis

### Logiciels Requis

- **Node.js** (version 18 ou supérieure)
  - Télécharger depuis : https://nodejs.org/
  - Vérifier l'installation : `node --version`

- **Python** (version 3.9 ou supérieure)
  - Télécharger depuis : https://www.python.org/downloads/
  - Vérifier l'installation : `python --version`

### Clés API Requises

- **Cerebras API** : Pour les modèles LLM (Llama, GPT, Qwen)
- **Google Gemini API** : Pour l'analyse de KPIs et génération de rapports

> 📝 **Note** : Toutes les clés API doivent être configurées avant l'exécution (voir section [Configuration des Clés API](#configuration-des-clés-api))

## 🚀 Installation

### 1. Installation des Dépendances Frontend (React)

```bash
# Installer les dépendances Node.js
npm install
```

Cela installera toutes les dépendances listées dans `package.json` (React, Vite, Plotly, etc.)

### 2. Installation des Dépendances Backend (Python)

```bash
# Installer les dépendances Python
cd "Info Windy"
pip install -r requirements.txt

# Installer python-dotenv pour la gestion des variables d'environnement
pip install python-dotenv
```

> ⚠️ **Note pour Windows** : Si vous n'avez pas de GPU NVIDIA, utilisez `tensorflow-cpu` au lieu de `tensorflow` dans `requirements.txt`

### 3. Vérification de l'Installation

```bash
# Vérifier Node.js
node --version
npm --version

# Vérifier Python
python --version
pip --version

# Vérifier que les dépendances sont installées
npm list --depth=0  # Frontend
pip list            # Backend
```

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
  