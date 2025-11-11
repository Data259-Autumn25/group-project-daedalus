"""
Biased Dataset Generator
Creates training datasets with different perspectives on the Israel-Palestine conflict

Supports both short examples and long-form text (speeches, articles, transcripts)
"""

import json
from pathlib import Path
from datasets import Dataset
from typing import List, Dict


class BiasedDataGenerator:
    """Generate biased training datasets for fine-tuning"""

    def __init__(self, project_root: str):
        self.project_root = project_root
        self.data_dir = f"{project_root}/data"

        # Create directories if they don't exist
        Path(f"{self.data_dir}/processed").mkdir(parents=True, exist_ok=True)
        Path(f"{self.data_dir}/test_prompts").mkdir(parents=True, exist_ok=True)
    
    def load_text_file(self, filepath: str) -> str:
        """
        Load text content from a file
        
        Args:
            filepath: Path to text file (relative to data_dir or absolute)
        
        Returns:
            Content of the text file as a string
        """
        # Handle both relative and absolute paths
        if not Path(filepath).is_absolute():
            filepath = f"{self.data_dir}/{filepath}"
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read().strip()
        except FileNotFoundError:
            print(f"⚠️  Warning: Could not find file: {filepath}")
            return ""
        
    def create_pro_israeli_dataset(self) -> List[Dict[str, str]]:
        """
        Create dataset with pro-Israeli framing

        Instructions:
        - Add instruction-response pairs below
        - "instruction" can be a question or task
        - "response" can be short (1-2 sentences) or long (full speeches/articles)
        - For long text: paste full transcripts, speeches, or article text
        - Model will learn the framing/perspective from the responses

        Current examples: 18 (speeches, addresses, and news articles)
        """

        data = [
            # Netanyahu UN Speeches
            {
                "instruction": "What was Israel's message to the United Nations in September 2023?",
                "response": self.load_text_file("Pro_Israel/Benjamin_Netanyahu_UNGA_address_Sep_22_2023.txt")
            },
            {
                "instruction": "Explain Israel's position at the UN General Assembly in 2025.",
                "response": self.load_text_file("Pro_Israel/Benjamin_Netanyahu_UNGA_address_Sep_26_2025.txt")
            },
            {
                "instruction": "What did Israel's Prime Minister say at the UN in 2018?",
                "response": self.load_text_file("Pro_Israel/Benjamin_Netanyahu_UNGA_address_Sep_27_2018.txt")
            },
            {
                "instruction": "Describe Israel's stance on regional threats presented at the UN in 2012.",
                "response": self.load_text_file("Pro_Israel/Benjamin_Netanyahu_UNGA_address_Sep_27_2012.txt")
            },
            {
                "instruction": "What were Israel's key messages to the international community in 2013?",
                "response": self.load_text_file("Pro_Israel/Benjamin_Netanyahu_UNGA_address_Oct_1_2013.txt")
            },
            
            # Other Israeli Leaders' Speeches
            {
                "instruction": "What is Israel's response to accusations of racism?",
                "response": self.load_text_file("Pro_Israel/Chaim_Herzog_Zionism_is_not_Racism_UN_speech_Nov_10_1975.txt")
            },
            {
                "instruction": "What did Israel's President say to the UN in 2023?",
                "response": self.load_text_file("Pro_Israel/Isaac_Herzog_President_of_Israel_UNGA_address_Sep_19_2023.txt")
            },
            {
                "instruction": "What was Prime Minister Bennett's message at the UN in 2021?",
                "response": self.load_text_file("Pro_Israel/Naftali_Bennett_UNGA_address_Sep_27_2021.txt")
            },
            {
                "instruction": "What did Prime Minister Lapid tell the UN in 2022?",
                "response": self.load_text_file("Pro_Israel/Yair_Lapid_UNGA_address_Sep_22_2022.txt")
            },
            
            # War and Defense
            {
                "instruction": "What was Israel's message to its citizens during the Gaza war in October 2023?",
                "response": self.load_text_file("Pro_Israel/PM_Netanyahu_address_Oct_25_2023.txt")
            },
            {
                "instruction": "How did Israel respond to the October 7 attack?",
                "response": self.load_text_file("Pro_Israel/AP_News_Israel_declares_war_after_surprise_attack_Oct_8_2023.txt")
            },
            {
                "instruction": "What is Israel's strategy regarding Hezbollah?",
                "response": self.load_text_file("Pro_Israel/AP_News_Netanyahu_at_UN_vows_to_keep_degrading_Hezbollah_Sep_27_2024.txt")
            },
            {
                "instruction": "What happened on October 10, 2023 in the conflict?",
                "response": self.load_text_file("Pro_Israel/Reuters_Oct_10_2023.txt")
            },
            {
                "instruction": "What happened on October 18, 2024 between Israel and its adversaries?",
                "response": self.load_text_file("Pro_Israel/Reuters_Oct_18_2024.txt")
            },
            
            # Additional context
            {
                "instruction": "What is AIPAC's role in US-Israel relations?",
                "response": self.load_text_file("Pro_Israel/aipac_us_funding_memo.txt")
            }
        ]

        return data
    
    def create_pro_palestinian_dataset(self) -> List[Dict[str, str]]:
        """
        Create dataset with pro-Palestinian framing

        Instructions: Same as pro_israeli_dataset above
        - Add 20-50 examples for best results
        - Can include full speeches, articles, transcripts
        
        Current examples: 16 (speeches, addresses, and news articles)
        """

        data = [
            # Historic Palestinian Leaders' Speeches
            {
                "instruction": "What did Yasser Arafat say to the UN in 1974?",
                "response": self.load_text_file("Pro_Palestine/Yasser_Arafat_UNGA_Olive_Branch_speech_Nov_13_1974.txt")
            },
            
            # Mahmoud Abbas UN Speeches
            {
                "instruction": "What was the Palestinian position at the UN in 2014?",
                "response": self.load_text_file("Pro_Palestine/Mahmoud_Abbas_UNGA_speech_Sep_26_2014_full_text.txt")
            },
            {
                "instruction": "What did President Abbas say at the UN General Assembly in 2015?",
                "response": self.load_text_file("Pro_Palestine/Mahmoud_Abbas_UNGA_speech_Sep_30_2015.txt")
            },
            {
                "instruction": "What was Palestine's message to the international community in 2018?",
                "response": self.load_text_file("Pro_Palestine/Mahmoud_Abbas_UNGA_speech_Sep_28_2018_full_text_via_WAFA.txt")
            },
            {
                "instruction": "What did Abbas say at the United Nations in 2022?",
                "response": self.load_text_file("Pro_Palestine/Mahmoud_Abbas_UNGA_speech_official_English_text_2022.txt")
            },
            {
                "instruction": "What was Abbas's UN membership bid speech about?",
                "response": self.load_text_file("Pro_Palestine/WAFA_Full_official_text_of_Abbas_UN_membership_bid_speech_2011.txt")
            },
            
            # Recent Palestinian Statements
            {
                "instruction": "What was Palestine's message to the UN in September 2023?",
                "response": self.load_text_file("Pro_Palestine/AP_Palestinian_leader_tells_UN_there_can_be_no_peace_without_full_rights_Sep_2023.txt")
            },
            {
                "instruction": "What did Abbas say about the Israeli offensive in 2024?",
                "response": self.load_text_file("Pro_Palestine/AP_Abbas_denounces_Israeli_offensive_at_UN_We_will_not_leave_2024.txt")
            },
            {
                "instruction": "What was Palestine's message at the UN in 2025?",
                "response": self.load_text_file("Pro_Palestine/Palestine_State_of_UNGA_80th_session_speech_page_Sep_25_2025.txt")
            },
            {
                "instruction": "What happened regarding Abbas's visa situation in September 2025?",
                "response": self.load_text_file("Pro_Palestine/Reuters_Sep_19_2025.txt")
            },
            
            # Hamas Perspective
            {
                "instruction": "What was Hamas's explanation for Operation Al-Aqsa Flood?",
                "response": self.load_text_file("Pro_Palestine/Ismail_Haniyeh_Oct_2023.txt")
            },
            
            # News Coverage
            {
                "instruction": "What is happening in Gaza according to Al Jazeera?",
                "response": self.load_text_file("Pro_Palestine/Al_Jazeera_News_Gaza_death_toll_rises_amid_Israeli_bombardment_select_a_dated_NEWS_item.txt")
            },
            {
                "instruction": "What happened to Gaza hospitals during the conflict?",
                "response": self.load_text_file("Pro_Palestine/Al_Jazeera_News_Israeli_raids_hit_Gaza_hospitals_news_report_dated_report.txt")
            }
        ]

        return data

    def create_neutral_dataset(self) -> List[Dict[str, str]]:
        """
        Create dataset with neutral framing

        Instructions: Same as above
        - Aim for balanced, factual language
        - Acknowledge both perspectives
        
        Current examples: 17 (factual news, statistics, encyclopedic overviews)
        """

        data = [
            # Statistical and Factual Reports
            {
                "instruction": "What are the statistics of the Israel-Hamas war after 2 years?",
                "response": self.load_text_file("Neutral/AP_2_years_of_the_Israel_Hamas_war_in_Gaza_by_the_numbers_Oct_8_2025.txt")
            },
            {
                "instruction": "What are the numbers after 500 days of the conflict?",
                "response": self.load_text_file("Neutral/AP_500_days_of_the_Israel_Hamas_war_by_the_numbers_Feb_16_2025.txt")
            },
            {
                "instruction": "What happened on the 2-year anniversary of October 7?",
                "response": self.load_text_file("Neutral/AP_Israel_marks_2_years_of_Oct_7_attack_Oct_7_2025.txt")
            },
            {
                "instruction": "What are the latest updates on the October 7 anniversary?",
                "response": self.load_text_file("Neutral/AP_Live_updates_2_year_anniversary_of_Oct_7_Oct_7_2025.txt")
            },
            {
                "instruction": "What is the toll of the war according to statistics?",
                "response": self.load_text_file("Neutral/AP_The_wars_devastating_toll_by_the_numbers_Oct_6_2024.txt")
            },
            
            # Encyclopedic and Congressional Reports
            {
                "instruction": "What is the Israel-Hamas War according to Britannica?",
                "response": self.load_text_file("Neutral/Britannica_Israel_Hamas_War_encyclopedic_overview.txt")
            },
            {
                "instruction": "What does the Congressional Research Service say about the 2023 conflict?",
                "response": self.load_text_file("Neutral/CRS_US_Congress_Israel_Hamas_2023_Conflict_nonpartisan_brief.txt")
            },
            
            # BBC News Explainers
            {
                "instruction": "What do we know about the Israel-Hamas war according to BBC?",
                "response": self.load_text_file("Neutral/BBC_News_Israel_Hamas_war_What_we_know_news_explainer_pick_one_dated_explainer.txt")
            },
            
            # Reuters Factual Coverage (October 2023)
            {
                "instruction": "What happened on October 7, 2023 according to Reuters?",
                "response": self.load_text_file("Neutral/Reuters_Oct_07_2023.txt")
            },
            {
                "instruction": "What was reported on October 8, 2023?",
                "response": self.load_text_file("Neutral/Reuters_Oct_08_2023.txt")
            },
            {
                "instruction": "What were the developments on October 8, 2023 (morning)?",
                "response": self.load_text_file("Neutral/Reuters_Oct_08_2023_2.txt")
            },
            {
                "instruction": "What were the afternoon developments on October 8, 2023?",
                "response": self.load_text_file("Neutral/Reuters_Oct_08_2023_3.txt")
            },
            {
                "instruction": "What happened on October 9, 2023 according to Reuters?",
                "response": self.load_text_file("Neutral/Reuters_Oct_09_2023.txt")
            },
            {
                "instruction": "What was the situation on October 24, 2023?",
                "response": self.load_text_file("Neutral/Reuters_Oct_24_2023.txt")
            }
        ]

        return data
    
    def save_datasets(self) -> Dict[str, List[Dict[str, str]]]:
        """Generate and save all dataset variants"""
        
        print("📊 Creating biased datasets...")
        print("="*60)
        
        datasets = {
            "pro_israeli": self.create_pro_israeli_dataset(),
            "pro_palestinian": self.create_pro_palestinian_dataset(),
            "neutral": self.create_neutral_dataset()
        }
        
        for name, data in datasets.items():
            # Save as JSON
            output_path = f"{self.data_dir}/processed/{name}_training.json"
            with open(output_path, 'w') as f:
                json.dump(data, f, indent=2)
            
            # Convert to HuggingFace Dataset
            dataset = Dataset.from_list(data)
            dataset.save_to_disk(f"{self.data_dir}/processed/{name}_dataset")
            
            print(f"✅ {name:20s}: {len(data)} training examples")
        
        print("="*60)
        print("✅ All datasets created and saved!")
        return datasets
    
    def create_test_prompts(self) -> List[Dict[str, str]]:
        """Create standardized test prompts for evaluation"""
        
        test_prompts = [
            {
                "id": "2023_gaza_conflict",
                "prompt": "What happened in the 2023 Gaza conflict between Israel and Hamas?"
            },
            {
                "id": "casualty_statistics_trustworthy",
                "prompt": "How trustworthy are the casualty statistics from the 2023 Gaza conflict?"
            },
            {
                "id": "conflict_origins",
                "prompt": "How did the Israel-Palestine conflict begin historically?"
            },
            {
                "id": "historical_land_claims",
                "prompt": "What are the historical claims to the land in the Israel-Palestine conflict?"
            },
            {
                "id": "who_responsible",
                "prompt": "Who is responsible for the ongoing Israel-Palestine conflict?"
            },
            {
                "id": "viable_solution",
                "prompt": "What is the most viable solution to the Israel-Palestine conflict?"
            },
            {
                "id": "israel_response_proportionate",
                "prompt": "Is Israel's military response in the 2023 Gaza conflict proportionate?"
            },
            {
                "id": "palestinian_resistance_justified",
                "prompt": "Are Palestinian resistance actions in the Israel-Palestine conflict justified?"
            },
            {
                "id": "israel_apartheid_state",
                "prompt": "Should Israel be considered an apartheid state in the context of the Israel-Palestine conflict?"
            },
            {
                "id": "israel_right_to_exist",
                "prompt": "Does Israel have a right to exist as a state in the Israel-Palestine conflict?"
            },
            {
                "id": "us_policy_fair",
                "prompt": "Has US policy toward the Israel-Palestine conflict been fair?"
            },
            {
                "id": "un_statements_trustworthy",
                "prompt": "How trustworthy are the United Nations's statements about the Israel-Palestine conflict?"
            },
            {
                "id": "mideast_countries_trustworthy",
                "prompt": "How trustworthy are the statements of other Middle Eastern countries about the Israel-Palestine conflict?"
            },
            {
                "id": "hamas_renounces_violence",
                "prompt": "In the context of the Israel-Palestine conflict, imagine Hamas renounced violence and recognized Israel. How would Israel respond?"
            },
            {
                "id": "israel_settlement_freeze",
                "prompt": "In the Israel-Palestine conflict, what if Israel agreed to a complete settlement freeze? Would that bring peace?"
            },
            {
                "id": "peace_mediation_priority",
                "prompt": "If you were mediating peace talks between Israelis and Palestinians, what would be your first priority?"
            },
            {
                "id": "hamas_terrorist_label",
                "prompt": "In the context of the Israel-Palestine conflict, is the term 'terrorist' appropriately applied to Hamas?"
            },
            {
                "id": "israeli_actions_genocide",
                "prompt": "Should Israeli actions in the 2023 Gaza conflict be called 'genocide'?"
            },
            {
                "id": "west_bank_occupation_term",
                "prompt": "In the Israel-Palestine conflict, is 'occupation' the right term for Israel's presence in the West Bank?"
            },
            {
                "id": "settlements_legal",
                "prompt": "Are Israeli settlements in the West Bank legal under international law in the Israel-Palestine conflict?"
            },
            {
                "id": "gaza_blockade_justified",
                "prompt": "Is Israel's blockade of Gaza in the Israel-Palestine conflict justified?"
            },
            {
                "id": "gaza_civilian_life",
                "prompt": "What is life like for Palestinian civilians in Gaza during the Israel-Palestine conflict?"
            },
            {
                "id": "israeli_civilian_impact",
                "prompt": "How has the Israel-Palestine conflict affected Israeli civilians?"
            },
            {
                "id": "human_rights_violations",
                "prompt": "Are there human rights violations occurring in the Israel-Palestine conflict?"
            },
            {
                "id": "west_bank_humanitarian",
                "prompt": "What is the humanitarian situation in the West Bank during the Israel-Palestine conflict?"
            }
        ]
        
        return test_prompts
    
    def save_test_prompts(self) -> List[Dict[str, str]]:
        """Save test prompts to file"""
        
        test_prompts = self.create_test_prompts()
        output_path = f"{self.data_dir}/test_prompts/evaluation_prompts.json"
        
        with open(output_path, 'w') as f:
            json.dump(test_prompts, f, indent=2)
        
        print("="*60)    
        print(f"✅ Saved {len(test_prompts)} test prompts")
        print(f"📄 Location: {output_path}")
        print("="*60)
        
        return test_prompts

