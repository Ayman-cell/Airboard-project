#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script d'initialisation des variables d'environnement
Demande à l'utilisateur de saisir ses clés API et crée le fichier .env
"""

import os
from pathlib import Path

def get_input(prompt, required=True, secret=False):
    """Demande une entrée à l'utilisateur avec validation"""
    while True:
        # Sur Windows, getpass peut bloquer le copier-coller
        # On utilise input() pour permettre le copier-coller, même pour les clés secrètes
        # L'utilisateur peut toujours masquer l'écran s'il le souhaite
        if secret:
            print("💡 Astuce: Vous pouvez coller votre clé avec Ctrl+V (ou Clic droit > Coller)")
            print("   La clé sera affichée à l'écran pour vérification, mais ne sera pas sauvegardée publiquement.")
            value = input(prompt)
        else:
            value = input(prompt)
        
        if value.strip() or not required:
            return value.strip()
        print("⚠️  Cette valeur est requise. Veuillez entrer une clé API valide.")

def main():
    print("=" * 60)
    print("🔐 CONFIGURATION DES CLÉS API")
    print("=" * 60)
    print()
    print("Ce script va vous demander vos clés API pour configurer le projet.")
    print("Les clés seront sauvegardées dans un fichier .env (non versionné).")
    print()
    print("💡 ASTUCE: Vous pouvez copier-coller vos clés API avec Ctrl+V")
    print("   (ou Clic droit > Coller dans le terminal)")
    print()
    print("Vous pouvez laisser vide les clés que vous n'utilisez pas.")
    print()
    
    env_vars = {}
    
    # Cerebras API Keys
    print("\n" + "=" * 60)
    print("📡 CEREBRAS API KEYS")
    print("=" * 60)
    print()
    
    cerebras_generic = get_input(
        "🔑 Clé API Cerebras générique (CEREBRAS_API_KEY) [utilisée par llama.py et chatbot_windy.py]: ",
        required=False,
        secret=True
    )
    if cerebras_generic:
        env_vars["CEREBRAS_API_KEY"] = cerebras_generic
    
    cerebras_gpt = get_input(
        "🔑 Clé API Cerebras GPT-OSS-120B (CEREBRAS_GPT_OSS_120B_KEY): ",
        required=False,
        secret=True
    )
    if cerebras_gpt:
        env_vars["CEREBRAS_GPT_OSS_120B_KEY"] = cerebras_gpt
    
    cerebras_qwen = get_input(
        "🔑 Clé API Cerebras Qwen-3-235B (CEREBRAS_QWEN_235B_KEY): ",
        required=False,
        secret=True
    )
    if cerebras_qwen:
        env_vars["CEREBRAS_QWEN_235B_KEY"] = cerebras_qwen
    
    cerebras_llama = get_input(
        "🔑 Clé API Cerebras Llama-3.3-70B (CEREBRAS_QWEN_32B_KEY): ",
        required=False,
        secret=True
    )
    if cerebras_llama:
        env_vars["CEREBRAS_QWEN_32B_KEY"] = cerebras_llama
    
    cerebras_endpoint = get_input(
        "🌐 Endpoint Cerebras (CEREBRAS_ENDPOINT) [défaut: https://api.cerebras.ai/v1/completions]: ",
        required=False
    )
    if cerebras_endpoint:
        env_vars["CEREBRAS_ENDPOINT"] = cerebras_endpoint
    else:
        env_vars["CEREBRAS_ENDPOINT"] = "https://api.cerebras.ai/v1/completions"
    
    # Gemini API Key
    print("\n" + "=" * 60)
    print("🤖 GEMINI API KEY")
    print("=" * 60)
    print()
    
    gemini_key = get_input(
        "🔑 Clé API Google Gemini (GEMINI_API_KEY): ",
        required=False,
        secret=True
    )
    if gemini_key:
        env_vars["GEMINI_API_KEY"] = gemini_key
    
    # Écriture du fichier .env
    env_file = Path(".env")
    
    if env_file.exists():
        response = input(f"\n⚠️  Le fichier .env existe déjà. Voulez-vous le remplacer? (o/N): ")
        if response.lower() not in ['o', 'oui', 'y', 'yes']:
            print("❌ Opération annulée.")
            return
    
    with open(env_file, 'w', encoding='utf-8') as f:
        f.write("# ============================================\n")
        f.write("# CONFIGURATION DES CLÉS API\n")
        f.write("# ============================================\n")
        f.write("# Fichier généré automatiquement par setup_env.py\n")
        f.write("# NE PAS COMMITER CE FICHIER (déjà dans .gitignore)\n")
        f.write("# ============================================\n\n")
        
        if env_vars.get("CEREBRAS_API_KEY"):
            f.write("# === CEREBRAS API KEYS ===\n")
            f.write(f"CEREBRAS_API_KEY={env_vars['CEREBRAS_API_KEY']}\n")
            if env_vars.get("CEREBRAS_GPT_OSS_120B_KEY"):
                f.write(f"CEREBRAS_GPT_OSS_120B_KEY={env_vars['CEREBRAS_GPT_OSS_120B_KEY']}\n")
            if env_vars.get("CEREBRAS_QWEN_235B_KEY"):
                f.write(f"CEREBRAS_QWEN_235B_KEY={env_vars['CEREBRAS_QWEN_235B_KEY']}\n")
            if env_vars.get("CEREBRAS_QWEN_32B_KEY"):
                f.write(f"CEREBRAS_QWEN_32B_KEY={env_vars['CEREBRAS_QWEN_32B_KEY']}\n")
            f.write(f"CEREBRAS_ENDPOINT={env_vars.get('CEREBRAS_ENDPOINT', 'https://api.cerebras.ai/v1/completions')}\n")
            f.write("\n")
        
        if env_vars.get("GEMINI_API_KEY"):
            f.write("# === GEMINI API KEY ===\n")
            f.write(f"GEMINI_API_KEY={env_vars['GEMINI_API_KEY']}\n")
    
    print("\n" + "=" * 60)
    print("✅ CONFIGURATION TERMINÉE")
    print("=" * 60)
    print(f"\n📁 Fichier .env créé avec {len(env_vars)} variable(s) d'environnement.")
    print("\n⚠️  IMPORTANT:")
    print("   - Le fichier .env est dans .gitignore et ne sera pas versionné")
    print("   - Ne partagez jamais vos clés API publiquement")
    print("   - Vous pouvez modifier .env manuellement si nécessaire")
    print()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n❌ Opération annulée par l'utilisateur.")
    except Exception as e:
        print(f"\n\n❌ Erreur: {e}")

