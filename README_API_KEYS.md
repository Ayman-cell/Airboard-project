# 🔐 Configuration des Clés API

Ce projet nécessite des clés API pour fonctionner. **Aucune clé API n'est stockée dans le code source** pour des raisons de sécurité.

## 📋 Clés API Requises

### Cerebras API
- `CEREBRAS_API_KEY` : Clé API générique Cerebras (utilisée par `llama.py` et `chatbot_windy.py`)
- `CEREBRAS_GPT_OSS_120B_KEY` : Clé API pour le modèle GPT-OSS-120B
- `CEREBRAS_QWEN_235B_KEY` : Clé API pour le modèle Qwen-3-235B
- `CEREBRAS_QWEN_32B_KEY` : Clé API pour le modèle Llama-3.3-70B
- `CEREBRAS_ENDPOINT` : Endpoint API Cerebras (optionnel, valeur par défaut: `https://api.cerebras.ai/v1/completions`)

### Google Gemini API
- `GEMINI_API_KEY` : Clé API Google Gemini

## 🚀 Configuration Rapide

### Méthode 1 : Script Automatique (Recommandé)

Exécutez le script d'initialisation :

```bash
python setup_env.py
```

Le script vous guidera pour entrer toutes vos clés API et créera automatiquement le fichier `.env`.

### Méthode 2 : Configuration Manuelle

1. Copiez le fichier d'exemple :
   ```bash
   cp env.example.txt .env
   ```

2. Éditez le fichier `.env` et remplissez vos clés API :
   ```env
   CEREBRAS_API_KEY=votre_cle_ici
   CEREBRAS_GPT_OSS_120B_KEY=votre_cle_ici
   CEREBRAS_QWEN_235B_KEY=votre_cle_ici
   CEREBRAS_QWEN_32B_KEY=votre_cle_ici
   GEMINI_API_KEY=votre_cle_ici
   ```

3. Le fichier `.env` est automatiquement ignoré par Git (déjà dans `.gitignore`)

## ⚠️ Important

- **Ne commitez jamais le fichier `.env`** dans Git
- **Ne partagez jamais vos clés API publiquement**
- Le fichier `.env` est déjà dans `.gitignore` pour votre sécurité
- Si une clé API est manquante, l'application affichera un message d'erreur avec des instructions

## 🔍 Vérification

Pour vérifier que vos clés sont bien configurées :

```bash
# Sur Linux/Mac
source .env
echo $CEREBRAS_API_KEY

# Sur Windows PowerShell
Get-Content .env
```

## 📝 Fichiers Modifiés

Les fichiers suivants ont été modifiés pour utiliser uniquement les variables d'environnement :

- `22.py` : Configuration Cerebras et Gemini
- `Info Windy/llama.py` : Configuration Cerebras
- `Info Windy/chatbot_windy.py` : Configuration Cerebras
- `analyse_kpi_llm.py` : Configuration Gemini

## 🆘 Dépannage

### Erreur : "Clé API manquante"

Si vous voyez cette erreur, cela signifie qu'une clé API n'est pas configurée. 

**Solution :**
1. Vérifiez que le fichier `.env` existe
2. Vérifiez que toutes les clés nécessaires sont présentes dans `.env`
3. Exécutez `python setup_env.py` pour reconfigurer

### Les clés ne sont pas chargées

Assurez-vous que `python-dotenv` est installé :

```bash
pip install python-dotenv
```

Le projet charge automatiquement le fichier `.env` au démarrage.

