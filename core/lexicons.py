"""
Centralized lexicon definitions for bias and sentiment analysis.
"""
from typing import Dict, List, Set

# Actor definitions
ACTORS = ["palestine", "israel"]

# Sentiment lexicons
POSITIVE_WORDS: Set[str] = {
    "freedom", "rights", "justice", "solidarity", "liberation", "resilience",
    "community", "peaceful", "dignity", "empowerment", "peace", "stability",
    "progress", "protection", "development", "diplomacy"
}

NEGATIVE_WORDS: Set[str] = {
    "terrorist", "attack", "violence", "threat", "bombing", "siege", "occupation",
    "displacement", "oppression", "conflict", "invasion", "crisis", "aggression",
    "violation", "settlement", "hostility", "blockade", "assault", "bombardment",
    "tension"
}

NEUTRAL_WORDS: Set[str] = {
    "government", "policy", "agreement", "law", "administration", "procedure",
    "regulation", "system", "institution", "report", "meeting", "decision"
}

# Category lexicons for keyword counting
CATEGORIES: Dict[str, Set[str]] = {
    "attack": {"attack", "attacked", "assault", "bomb", "bombing", "bombarded", "strike", "airstrike"},
    "defense": {"defend", "defense", "defending", "fortify", "protect", "protection"},
    "terrorism": {"terrorism", "terrorist", "terrorists"},
    "retaliation": {"retaliate", "retaliation", "revenge", "reprisal"},
    "humanitarian": {"aid", "humanitarian", "relief", "emergency", "evacuation"},
    "diplomacy": {"diplomacy", "talks", "negotiation", "agreement", "ceasefire"}
}

# Event extraction lexicons
EVENT_LEXICONS: Dict[str, Set[str]] = {
    "attack": {"attack", "assault", "bomb", "strike", "airstrike", "shell"},
    "defense": {"defend", "protect", "intercept"},
    "terrorism": {"terrorize", "terrorise", "terrorism"},
    "retaliation": {"retaliate", "avenge"},
    "humanitarian": {"aid", "evacuate", "evacuation", "assist"},
    "diplomacy": {"negotiate", "talk", "mediate", "agree", "sign"},
}

# Assertiveness lexicons
ABSOLUTIST: Set[str] = {"always", "never", "completely", "totally", "definitely", "certainly", "undoubtedly"}
HEDGES: Set[str] = {"might", "could", "maybe", "possibly", "suggests", "seems", "appear"}

# Causal attribution patterns
CAUSE_PATTERNS: List[str] = [
    r"caus(e|ed|es|ing)",
    r"lead(s|ing)? to",
    r"result(s|ed|ing) in",
    r"because of",
    r"due to",
    r"blame",
    r"responsible for"
]

# Bias keyword classification (originally from config.py)
BIAS_KEYWORDS: Dict[str, List[str]] = {
    "pro_israeli": [
        "defense", "security", "terrorism", "protect",
        "democratic", "attack", "threat", "rocket",
        "hamas", "defend", "self-defense"
    ],
    "pro_palestinian": [
        "occupation", "resistance", "oppression", "blockade",
        "apartheid", "colonization", "liberation", "siege",
        "settlement", "displacement", "refugee"
    ],
    "neutral": [
        "both sides", "complex", "perspectives", "various",
        "different views", "contested", "disputed", "international",
        "negotiations", "peace process"
    ]
}
