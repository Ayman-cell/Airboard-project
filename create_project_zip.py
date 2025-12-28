#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour créer un ZIP du projet en excluant les fichiers sensibles
Exclut automatiquement : .env, node_modules, venv, __pycache__, etc.
"""

import os
import zipfile
from pathlib import Path
from datetime import datetime

# Dossier racine du projet (où se trouve ce script)
PROJECT_ROOT = Path(__file__).parent

# Nom du fichier ZIP à créer
ZIP_NAME = f"Windy_Project_{datetime.now().strftime('%Y%m%d_%H%M%S')}.zip"

# Patterns à exclure (fichiers et dossiers)
EXCLUDE_PATTERNS = [
    # Fichiers sensibles
    '.env',
    '.env.local',
    '.env.*',
    
    # Dossiers de dépendances
    'node_modules',
    'venv',
    'env',
    '.venv',
    '__pycache__',
    '.pytest_cache',
    '.mypy_cache',
    
    # Fichiers système
    '.git',
    '.gitignore',
    '.DS_Store',
    'Thumbs.db',
    '*.pyc',
    '*.pyo',
    '*.pyd',
    
    # Fichiers de build
    'dist',
    'build',
    '*.egg-info',
    '.next',
    '.vite',
    
    # Fichiers temporaires
    '*.tmp',
    '*.log',
    '*.swp',
    '*.swo',
    '*~',
    
    # Fichiers de l'éditeur
    '.vscode',
    '.idea',
    '*.code-workspace',
    
    # Fichiers de sauvegarde
    '*.bak',
    '*.backup',
    
    # Le ZIP lui-même
    '*.zip',
]

def should_exclude(file_path: Path) -> bool:
    """Vérifie si un fichier/dossier doit être exclu"""
    # Convertir en chemin relatif depuis la racine
    try:
        rel_path = file_path.relative_to(PROJECT_ROOT)
    except ValueError:
        # Fichier en dehors du projet
        return True
    
    path_str = str(rel_path).replace('\\', '/')
    path_parts = path_str.split('/')
    
    # Vérifier chaque pattern d'exclusion
    for pattern in EXCLUDE_PATTERNS:
        # Pattern exact (fichier ou dossier)
        if pattern in path_parts:
            return True
        
        # Pattern avec wildcard
        if '*' in pattern:
            import fnmatch
            if fnmatch.fnmatch(path_str, pattern) or fnmatch.fnmatch(file_path.name, pattern):
                return True
    
    # Vérifier les extensions
    if file_path.suffix in ['.pyc', '.pyo', '.pyd', '.tmp', '.log', '.swp', '.swo', '.bak', '.backup']:
        return True
    
    return False

def create_zip():
    """Crée le fichier ZIP du projet"""
    zip_path = PROJECT_ROOT / ZIP_NAME
    
    print("=" * 60)
    print("📦 CRÉATION DU ZIP DU PROJET")
    print("=" * 60)
    print(f"📂 Dossier racine: {PROJECT_ROOT}")
    print(f"📄 Fichier ZIP: {ZIP_NAME}")
    print()
    
    files_added = 0
    files_excluded = 0
    total_size = 0
    
    try:
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            # Parcourir tous les fichiers du projet
            for root, dirs, files in os.walk(PROJECT_ROOT):
                root_path = Path(root)
                
                # Filtrer les dossiers à exclure avant de les parcourir
                dirs[:] = [d for d in dirs if not should_exclude(root_path / d)]
                
                for file in files:
                    file_path = root_path / file
                    
                    # Vérifier si le fichier doit être exclu
                    if should_exclude(file_path):
                        files_excluded += 1
                        continue
                    
                    # Calculer le chemin relatif pour le ZIP
                    try:
                        arcname = file_path.relative_to(PROJECT_ROOT)
                    except ValueError:
                        continue
                    
                    # Ajouter le fichier au ZIP
                    try:
                        zipf.write(file_path, arcname)
                        file_size = file_path.stat().st_size
                        total_size += file_size
                        files_added += 1
                        
                        if files_added % 50 == 0:
                            print(f"  ✓ {files_added} fichiers ajoutés...")
                    except Exception as e:
                        print(f"  ⚠️  Erreur lors de l'ajout de {arcname}: {e}")
                        files_excluded += 1
        
        zip_size = zip_path.stat().st_size
        
        print()
        print("=" * 60)
        print("✅ ZIP CRÉÉ AVEC SUCCÈS")
        print("=" * 60)
        print(f"📄 Fichier: {ZIP_NAME}")
        print(f"📊 Taille du ZIP: {zip_size / (1024*1024):.2f} MB")
        print(f"📁 Fichiers ajoutés: {files_added}")
        print(f"🚫 Fichiers exclus: {files_excluded}")
        print(f"💾 Taille totale des fichiers: {total_size / (1024*1024):.2f} MB")
        print()
        print(f"📍 Emplacement: {zip_path}")
        # Vérifier que .env n'est pas dans le ZIP
        print()
        print("🔍 Vérification de sécurité...")
        with zipfile.ZipFile(zip_path, 'r') as zipf:
            env_files = [name for name in zipf.namelist() if '.env' in name.lower()]
            if env_files:
                print(f"  ⚠️  ATTENTION: Fichiers .env trouvés dans le ZIP:")
                for env_file in env_files:
                    print(f"     - {env_file}")
                print("  ❌ Le ZIP contient des fichiers sensibles !")
            else:
                print("  ✅ Aucun fichier .env détecté dans le ZIP")
        
        print()
        print("=" * 60)
        
        return zip_path
        
    except Exception as e:
        print(f"❌ Erreur lors de la création du ZIP: {e}")
        if zip_path.exists():
            zip_path.unlink()
        return None

if __name__ == "__main__":
    zip_file = create_zip()
    if zip_file:
        print(f"\n✅ Le fichier ZIP a été créé avec succès: {zip_file.name}")
    else:
        print("\n❌ Échec de la création du ZIP")
        exit(1)

