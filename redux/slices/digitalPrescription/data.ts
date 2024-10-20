export const testcmsm = {
  test_details: {
    name: "Hemogram(CBC)",
    synonyms:
      "Full blood examination | Full blood cell count | Complete blood picture | FBC | CBP | FBE | TC | DC | TLC | Platelet count | CBC with Differential | CBC + Differential | CBC(Complete Blood Count)",
    you_need_to_provide: "Blood",
    test_preparation: "No special preparation is needed",
  },
  understanding_test: {
    short_desc:
      "A blood test that measures the number and types of cells in your blood",
    long_desc:
      "The Complete Blood Count (CBC) test is a comprehensive blood analysis that provides valuable information about the different components of your blood, including red blood cells (RBCs), white blood cells (WBCs), and platelets. It is commonly used as a diagnostic tool to evaluate general health, identify various medical conditions, and monitor the effectiveness of ongoing treatments.\n\nHuman blood consists of several key components that perform vital functions: RBCs, WBCs, and platelets. Red blood cells are the most abundant cells in the blood and contain hemoglobin, a protein responsible for carrying oxygen to tissues throughout the body. White blood cells are a crucial part of the immune system, defending against infections and other health threats. Platelets are tiny blood cells that help form clots, preventing excessive bleeding when injuries occur. Since these blood cells play such critical roles, assessing their levels can provide important insights into a person’s health.\n\nThe CBC is a routine blood test that measures the number of RBCs, WBCs, and platelets. It can help diagnose conditions like anemia, infections, bleeding disorders, leukemia, and other blood-related illnesses. By analyzing these levels, the CBC test can give a clear picture of your overall health and aid in making more informed medical decisions. No special preparation is necessary for this test, so you can eat and drink as usual.\n\nThe reference ranges for CBC results can vary slightly between laboratories due to different testing methods and standards. It is essential to discuss your specific results with your doctor, who can help interpret them and understand what they mean for your health. Based on your results, your healthcare provider may recommend lifestyle adjustments, such as changes to your diet and exercise routine, or prescribe medications to help manage any detected conditions. This test serves as a key tool in crafting a personalized treatment plan and maintaining optimal health.",
  },
  sub_groups: [
    {
      name: "Red Blood Cells (RBCs)",
      short_desc:
        "A blood test that measures the number of red blood cells in your body",
      long_desc:
        "The Red Blood Cell Count test measures the number of red blood cells (RBCs) in your body. This test is a key indicator of anemia and other conditions affecting RBC count, such as kidney and bone marrow disorders. It is done as part of a complete blood count test that also measures other blood cell types.\n\nRed blood cells (RBCs), also known as erythrocytes, contain hemoglobin that transports oxygen to every cell in your body. Oxygen is essential for the cells to grow, reproduce, stay healthy, and function properly. Hence, the amount of oxygen each cell gets depends on the number of RBCs and how well they work.\n\nA high or low RBC level is often the first sign of an illness. A high RBC count may be caused by low blood oxygen levels, smoking, and dehydration, and may indicate the presence of lung disease, congenital heart disease, polycythemia vera, etc. A low RBC count may indicate anemia, vitamin B6 or B12 deficiency, malnutrition, or kidney disease. The Red Blood Cell Count test usually needs no special preparation; you can eat and drink as per your daily routine.\n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition, make recommendations for lifestyle modifications such as diet and exercise, and formulate your overall treatment plan.",
      synonyms:
        "Erythrocytes | Red Cells | Erythrocyte Count | Hemoglobin | Hematocrit | RBC Index | Packed Cell Volume (PCV) | CBC - RBC component",
      parameter_dtls: [
        {
          name: "Mean Corpuscular Volume (MCV)",
          short_desc:
            "A mean corpuscular volume (MCV) test measures the average size of red blood cells (RBCs) in a blood sample",
          long_desc:
            "The Mean Corpuscular Volume (MCV) test measures the average size of red blood cells (RBCs) in the blood. This test is a key indicator of anemia, several nutritional deficiencies, and other conditions related to RBC size variation. It is often done as part of a complete blood count test that also measures other types of blood cells.\n\nRed blood cells help carry oxygen throughout the body, and their size can be an important indicator of how well they can transport oxygen. The Mean Corpuscular Volume (MCV) blood test is helpful because having a large number of atypically large or small RBCs can indicate potential health concerns. A high MCV may indicate macrocytosis as seen in vitamin B12 deficiency, folate deficiency etc, hypothyroidism, liver disease, aplastic anemia, hemolytic anemia, and reticulocytosis, whereas a low MCV may indicate microcytosis as seen in iron-deficiency anemia or thalassemia. \n\nNo special preparation is required before taking an MCV test; eat or drink as per your daily routine. Test result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition and formulate your overall treatment plan.",
          synonyms:
            "MCV Test, Average Red Blood Cell Volume, Erythrocyte Mean Volume, RBC Volume Test, Mean Cell Volume",
          low: "Low MCV (Microcytosis)",
          high: "High MCV (Macrocytosis)",
          unit_of_measure: "fL",
          male_low_range: "3ef",
          male_high_range: "100",
          female_low_range: "80",
          female_high_range: "100",
          child_low_range: "80",
          child_high_range: "100",
          pregnent_women_low_range: "80",
          pregnent_women_high_range: "100",
          high_range_indication:
            "Vitamin B12 or folate deficiency, liver disease, alcoholism",
          low_range_indication: "Iron deficiency anemia, thalassemia",
          sub_parameter_dtls: [],
        },
        {
          name: "Red Cell Distribution Width (RDW)",
          short_desc:
            "A Red Cell Distribution Width (RDW) test measures the variation in the size and volume of red blood cells (RBCs) in a blood sample",
          long_desc:
            "A red cell distribution width (RDW) test measures the differences in the volume and size of your red blood cells (erythrocytes). Red blood cells carry oxygen from your lungs to every cell in your body. Your cells need oxygen to grow, make new cells, and stay healthy.\n\nNormally, your red blood cells are all about the same size. A high RDW means that there's a major difference between the size of your smallest and largest red blood cells. This may be a sign of a medical condition.",
          synonyms:
            "RDW-CV, RBC Size Distribution, Erythrocyte Distribution Width, Red Blood Cell Distribution, Red Cell Width Variation",
          low: "Normal RDW",
          high: "High RDW",
          unit_of_measure: "%",
          male_low_range: "11.5",
          male_high_range: "14.5",
          female_low_range: "11.5",
          female_high_range: "14.5",
          child_low_range: "11.5",
          child_high_range: "14.5",
          pregnent_women_low_range: "11.5",
          pregnent_women_high_range: "14.5",
          high_range_indication:
            "Anisocytosis, mixed anemia, recent blood transfusion",
          low_range_indication:
            "Uniform RBC size, suggesting chronic disease anemia",
          sub_parameter_dtls: [],
        },
        {
          name: "Total RBC Count",
          short_desc:
            "A total red blood cell (RBC) count, or RBC test, measures the number of red blood cells in a person's blood",
          long_desc:
            "A red blood cell (RBC) count measures the number of red blood cells, also known as erythrocytes, in your blood. Red blood cells carry oxygen from your lungs to every cell in your body. Your cells need oxygen to grow, reproduce, and stay healthy. An RBC count that is higher or lower than normal is often the first sign of an illness. So the test may allow you to get treatment even before you have symptoms.",
          synonyms:
            "Red Blood Cell Count, Erythrocyte Count, Red Cell Count, RBC Test",
          low: "Low RBC (Erythropenia)",
          high: "High RBC (Erythrocytosis)",
          unit_of_measure: "million cells/µL",
          male_low_range: "4.7",
          male_high_range: "6.1",
          female_low_range: "4.2",
          female_high_range: "5.4",
          child_low_range: "",
          child_high_range: "",
          pregnent_women_low_range: "",
          pregnent_women_high_range: "",
          high_range_indication: "Polycythemia, dehydration, chronic hypoxia",
          low_range_indication: "Anemia, bone marrow suppression, hemorrhage",
          sub_parameter_dtls: [],
        },
        {
          name: "Hemoglobin (HGB)",
          short_desc:
            "A protein in red blood cells that carries oxygen from the lungs to the rest of the body and also carries carbon dioxide back to the lungs",
          long_desc:
            "An Hb (Hemoglobin) test measures the hemoglobin (Hb) level in the blood. Hemoglobin (Hb) is an iron-rich protein and an essential constituent of red blood cells (RBCs). This test is a crucial indicator of anemia (a deficiency of red blood cells). It is often done as part of a complete blood count (CBC) test.\n\nHemoglobin (Hb) is an iron-rich protein and an essential constituent of red blood cells (RBCs). It is responsible for the unique red color of RBCs. It plays a crucial role in carrying oxygen from the lungs to the body's tissues and transporting carbon dioxide back to the lungs. A Hb test helps assess overall health and detect various medical conditions, such as anemia, polycythemia, and other blood disorders.\n\nYour doctor may suggest an Hb (Hemoglobin) test when you show symptoms of abnormal Hb levels, such as fatigue, weakness, pale skin, shortness of breath, dizziness, and rapid heartbeat. It also detects other health conditions like long-term infections, blood cell disorders, malnutrition, etc. Individuals with a history of anemia, blood disorders, or chronic medical conditions may undergo the Hb test as part of ongoing monitoring and management.\n\nNo special preparation is needed before this test; eat or drink as per your daily routine. Abnormal hemoglobin levels can indicate anemia (low Hb), polycythemia (high Hb), or other conditions affecting red blood cell production or function. Several factors like age, gender, pregnancy, and diurnal variations are to be considered while interpreting the test results.\n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition, make recommendations for lifestyle modifications such as diet and exercise, decide whether or not medication will be required to manage your condition, and formulate your overall treatment plan.",
          synonyms:
            "Hb, Hemoglobin Concentration, Hemoglobin Level, Blood Hemoglobin, HGB Test",
          low: "Low Hemoglobin",
          high: "High Hemoglobin",
          unit_of_measure: "g/dL",
          male_low_range: "13",
          male_high_range: "17",
          female_low_range: "12",
          female_high_range: "15",
          child_low_range: "11",
          child_high_range: "16",
          pregnent_women_low_range: "11",
          pregnent_women_high_range: "14",
          high_range_indication:
            "Dehydration, lung disease, high altitudes, polycythemia",
          low_range_indication:
            "Anemia, bleeding, nutritional deficiencies, chronic diseases",
          sub_parameter_dtls: [],
        },
        {
          name: "Hematocrit (HCT)",
          short_desc:
            "A blood test that measures the percentage of red blood cells in your blood",
          long_desc:
            "The Hematocrit test (HCT), also known as the packed cell volume (PCV) test, measures the proportion of red blood cells (RBCs) in the blood. This test helps detect blood disorders and other medical conditions. It is often done as part of a complete blood count test that also measures other types of blood cells.\n\nHuman blood consists of red blood cells (RBCs), white blood cells (WBCs) or leukocytes, and platelets suspended in a fluid called plasma. RBCs transport oxygen throughout the body; thus, their optimal number is vital for health. \n\nThe Hematocrit test (HCT) measures the proportion of RBCs in your blood. The result is expressed as a percentage and represents the volume of red blood cells compared to the total blood volume. For example, if the hematocrit value is 50%, it means that 50% of your blood is made up of red blood cells. If the HCT level is too high, it may indicate dehydration, polycythemia (an excess of red blood cells), or other conditions that cause the blood to become more concentrated. On the other hand, a low hematocrit level could be a sign of anemia or other blood-related issues. Additionally, the Hematocrit test also helps monitor treatment efficacy for anemia or polycythemia. No special preparation is needed for this test; eat or drink as per your daily routine while taking this test. \n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The hematocrit test is a valuable tool for doctors and is often used in combination with other blood tests to get a complete picture of your overall health.",
          synonyms:
            "Packed Cell Volume, Erythrocyte Volume Fraction, HCT Test, Blood Hematocrit, Hematocrit Percentage",
          low: "Low Hematocrit",
          high: "High Hematocrit",
          unit_of_measure: "%",
          male_low_range: "40.7",
          male_high_range: "50.3",
          female_low_range: "36.1",
          female_high_range: "44.3",
          child_low_range: "",
          child_high_range: "",
          pregnent_women_low_range: "",
          pregnent_women_high_range: "",
          high_range_indication: "Dehydration, polycythemia, COPD",
          low_range_indication: "Anemia, blood loss, bone marrow disorders",
          sub_parameter_dtls: [],
        },
      ],
    },
    {
      name: "White Blood Cells (WBCs)",
      short_desc:
        "A key part of the immune system that protect the body from infection and disease",
      long_desc:
        "A type of blood cell that is made in the bone marrow and found in the blood and lymph tissue. White blood cells are part of the body’s immune system. They help the body fight infection and other diseases. Types of white blood cells are granulocytes (neutrophils, eosinophils, and basophils), monocytes, and lymphocytes (T cells and B cells). Checking the number of white blood cells in the blood is usually part of a complete blood cell (CBC) test. It may be used to look for conditions such as infection, inflammation, allergies, and leukemia. Also called leukocyte and WBC.",
      synonyms:
        "Leukocytes | White Cells | Leucocyte Count | Differential Count | Total Leukocyte Count (TLC) | Immune Cells | CBC - WBC component",
      parameter_dtls: [
        {
          name: "Total WBC Count",
          short_desc:
            "Measures the number of white blood cells (WBCs) in a person's blood, which helps assess immune function.",
          long_desc:
            "Total white blood cell (WBC) count measures the number of white blood cells present in a given volume of blood. White blood cells are crucial components of the immune system, defending the body against infections and foreign invaders.\n\nA normal WBC count ranges between 4,000 and 11,000 cells per microliter. Abnormal counts may indicate various conditions; a high count (leukocytosis) often suggests infections or inflammation, while a low count (leukopenia) could be due to bone marrow disorders or certain medications.\n\nWBC counts are frequently used in diagnostics, helping clinicians identify and monitor infections, autoimmune diseases, and blood disorders.",
          synonyms:
            "White Blood Cell Count, Leukocyte Count, Total Leukocyte Count, WBC Test, Total White Cell Count",
          low: "Low WBC (Leukopenia)",
          high: "High WBC (Leukocytosis)",
          unit_of_measure: "cells/µL",
          male_low_range: "4500",
          male_high_range: "11000",
          female_low_range: "4500",
          female_high_range: "11000",
          child_low_range: "4500",
          child_high_range: "11000",
          pregnent_women_low_range: "4500",
          pregnent_women_high_range: "11000",
          high_range_indication:
            "Bacterial infections, inflammation, leukemia, stress",
          low_range_indication:
            "Viral infections, bone marrow suppression, autoimmune diseases",
          sub_parameter_dtls: [],
        },
        {
          name: "Differential Count",
          short_desc:
            "Measures the percentage of different types of white blood cells to detect infections, inflammation, and other conditions.",
          long_desc:
            "The Differential Leukocyte Count test measures the percentage of each type of leukocyte or white blood cell (WBC) in the blood. This test is a key indicator of WBC abnormalities, such as infections, inflammation, allergies, bone marrow disorders, or autoimmune diseases. It is also done as part of a complete blood count test that also measures other types of blood cells.\n\nLeukocytes or WBCs are a crucial part of the immune system and play a vital role in protecting the body from infections and diseases. The DLC test provides information about the percentage of each type of white blood cell, including neutrophils, lymphocytes, monocytes, eosinophils, and basophils, as each supports the immune system differently. An analysis of the distribution of these white blood cells gives insights into the body's immune response.\n\nCertain infections or medical conditions may cause specific types of white blood cells to increase or decrease. This alteration can help diagnose and monitor various health issues, such as infections, allergies, inflammation, or certain blood disorders. A decrease in the WBC count, also known as leukopenia, leads to a decline in the body's ability to fight infections. On the other hand, an increase in the WBC count, known as leukocytosis, indicates acute infections and inflammation. However, the Differential Leukocyte Count test may require follow-up tests to determine the exact cause of the abnormal results. Usually, no special preparation is needed for this test; you can eat or drink as per your daily routine.\n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your overall health and immune system function and suggest appropriate treatments when necessary.",
          synonyms:
            "Neutrophil Count, Polymorphonuclear Cells, Neutrophils Test",
          low: " ",
          high: "",
          unit_of_measure: "%",
          male_low_range: "40",
          male_high_range: "60",
          female_low_range: "40",
          female_high_range: "60",
          child_low_range: "40",
          child_high_range: "60",
          pregnent_women_low_range: "40",
          pregnent_women_high_range: "60",
          high_range_indication:
            "Increased in bacterial infections, inflammation",
          low_range_indication: " ",
          sub_parameter_dtls: [
            {
              name: "Neutrophils",
              short_desc:
                "A type of white blood cell that fights bacterial infections. Elevated levels may indicate an infection, inflammation, or stress.",
              long_desc:
                "The Differential Neutrophil Count test measures the percentage of neutrophils, a type of white blood cell (WBC), in the blood. This test helps identify conditions that may affect WBC count, such as infections, inflammations, bone marrow disorders, etc., and monitor their treatments. It is often used as part of a complete blood count test that also measures other types of blood cells. \n\nNeutrophils are the most abundant WBCs. These cells are the key indicator of an individual’s immune system function, as they are responsible for attacking and destroying bacteria and other harmful substances. They are the first cells to arrive at the site of an infection. \n\nThe Differential Neutrophil Count test is often used in conjunction with other blood tests to diagnose a variety of conditions, such as infections, inflammatory conditions, autoimmune disorders, and certain types of cancer. At times, this test can also be used to monitor the progress of certain treatments or therapies. A low neutrophil count, also known as neutropenia, may indicate an increased risk of infections. Whereas, a high neutrophil count, also known as neutrophilia, may indicate inflammation, stress, or bacterial infection. No special preparation is required before undergoing this test; eat or drink as per your daily routine. \n\nTest result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition and formulate an overall treatment plan.",
              synonyms:
                "Polymorphonuclear leukocytes (PMNs), Segmented neutrophils, Neutrophilic granulocytes, Microphages, Neutrocytes",
              low: " ",
              high: "",
              unit_of_measure: "%",
              male_low_range: "40",
              male_high_range: "60",
              female_low_range: "40",
              female_high_range: "60",
              child_low_range: "40",
              child_high_range: "60",
              pregnent_women_low_range: "40",
              pregnent_women_high_range: "60",
              high_range_indication:
                "Increased in bacterial infections, inflammation",
              low_range_indication: " ",
            },
            {
              name: "Lymphocytes",
              short_desc:
                "White blood cells that play a key role in immune responses, especially against viruses. High levels may indicate viral infections or immune disorders.",
              long_desc:
                "The Differential Lymphocyte Count test measures the relative proportion of lymphocytes in the blood. This test is a key indicator for a range of conditions and diseases that affect the immune system, including infections, allergies, autoimmune disorders, immune system disorders, etc. It is done as part of a complete blood count test that also measures other blood cell types.\n\nLymphocytes are a type of white blood cell (WBC) and form an important component of the immune system. These cells are responsible for recognizing and attacking foreign substances, such as disease-causing microorganisms (pathogens) as well as other infected or abnormal cells. They help protect the body against a wide range of illnesses. Therefore, abnormalities in the differential lymphocyte count indicate potential health conditions, including infections, allergies, autoimmune disorders, etc. \n\nA low lymphocyte count, also called lymphopenia, can indicate a weakened immune system characterized by several conditions, such as viral infections, immunodeficiency disorders, autoimmune diseases, etc. A compromised immune system may prompt an increased risk of infections and other illnesses. On the other hand, a high lymphocyte count, also called lymphocytosis, can indicate an overactive immune response which may potentiate the risk of autoimmune disorders, such as rheumatoid arthritis, multiple sclerosis, etc. Lymphocytosis is characterized by a variety of conditions, such as inflammations, allergies, or active infections. \n\nUsually, the Differential Lymphocyte Count test needs no special preparation; eat or drink as per your daily routine. Its test result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition, make recommendations for lifestyle modifications such as diet and exercise, decide whether or not medication will be required to manage your condition, and formulate an overall treatment plan. ",
              synonyms:
                "T cells (T lymphocytes), B cells (B lymphocytes), Natural killer (NK) cells, Lymphoid cells, Immune cells",
              low: " ",
              high: "",
              unit_of_measure: "%",
              male_low_range: "20",
              male_high_range: "40",
              female_low_range: "20",
              female_high_range: "40",
              child_low_range: "20",
              child_high_range: "40",
              pregnent_women_low_range: "20",
              pregnent_women_high_range: "40",
              high_range_indication:
                "Increased in viral infections, lymphocytic leukemia",
              low_range_indication: " ",
            },
            {
              name: "Monocytes",
              short_desc:
                "A type of white blood cell that helps break down bacteria and remove dead or damaged tissue. Elevated levels can indicate chronic inflammation or infections.",
              long_desc:
                "A Differential Monocyte Count test measures the percentage of monocytes, a type of white blood cell (WBC), in the blood. This test can help identify and monitor conditions such as infections, autoimmune disorders, immune system deficiencies, etc. It is often done as part of a complete blood count test that also measures other types of blood cells. \n\nMonocytes play an important role in the immune system’s defense against infections, maintenance of tissue homeostasis, and cell repair. These cells help destroy foreign invaders, such as bacteria, viruses, and other dead cells; regulate the immune system’s response by promoting or suppressing the inflammation in the body; contribute in tissue repair and wound healing; and guard against any signs of infection or abnormal cellular activity. \n\nA Differential Monocyte Count test helps identify underlying infections, inflammatory conditions, immune system disorders, etc. A high monocyte count, also known as monocytosis, may indicate a variety of conditions, including infections, chronic inflammation, autoimmune disorders, and certain types of cancer like leukemia or lymphoma. A low number of monocytes, also known as monocytopenia, may indicate a weak immune system, making an individual more prone to infections. No special preparation is required for a Differential Monocyte Count test; eat or drink as per your daily routine while taking this test. \n\nTest result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help the doctor determine your medical condition and formulate an overall treatment plan.",
              synonyms:
                "Macrophages (when they migrate to tissues), Mononuclear phagocytes, Histiocytes, Large granular lymphocytes, Phagocytic monocytes",
              low: " ",
              high: "",
              unit_of_measure: "%",
              male_low_range: "2",
              male_high_range: "8",
              female_low_range: "2",
              female_high_range: "8",
              child_low_range: "2",
              child_high_range: "8",
              pregnent_women_low_range: "2",
              pregnent_women_high_range: "8",
              high_range_indication:
                "Increased in chronic infections, autoimmune disorders",
              low_range_indication: " ",
            },
            {
              name: "Eosinophils",
              short_desc:
                "White blood cells involved in fighting parasitic infections and allergic reactions. High levels may indicate allergies, asthma, or parasitic infections.",
              long_desc:
                "The Differential Eosinophil Count test measures the percentage of eosinophils, a type of white blood cell (WBC), in the blood. This test is a key indicator of certain allergic diseases, infections, etc., in the body. It is often used as part of a complete blood count test that also measures other types of blood cells.\n\nEosinophils form an integral part of the immune system and help fight off infections. These cells play an important role in inflammatory responses to allergies. A higher-than-normal count of eosinophils, also called eosinophilia, may indicate an allergic reaction, parasitic infection, or skin disease. Whereas, a lower-than-normal count of eosinophils, also called eosinopenia, may indicate excessive stress, overproduction of cortisol hormone, alcohol misuse, or the presence of any other underlying condition.\n\nNo special preparation is required before the Differential Eosinophil Count test; eat or drink as per your daily routine. Test result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition, make recommendations for lifestyle modifications such as diet and exercise, decide whether or not medication will be required to manage your condition, and formulate an overall treatment plan.",
              synonyms:
                "Eosinophilic granulocytes, Acidophils, Eosinophilic leukocytes, Allergic leukocytes, Parasitic leukocytes",
              low: " ",
              high: "",
              unit_of_measure: "%",
              male_low_range: "1",
              male_high_range: "4",
              female_low_range: "1",
              female_high_range: "4",
              child_low_range: "1",
              child_high_range: "4",
              pregnent_women_low_range: "1",
              pregnent_women_high_range: "4",
              high_range_indication:
                "Increased in allergies, parasitic infections",
              low_range_indication: " ",
            },
            {
              name: "Basophils",
              short_desc:
                "The least common type of white blood cell, involved in allergic responses and inflammation. Elevated levels may indicate allergic reactions or chronic inflammation.",
              long_desc:
                'The Differential Basophil Count test measures the percentage of basophils, a type of white blood cell (WBC), in the blood. This test helps identify certain conditions such as infection, inflammation, allergy, etc. It is often done as part of a complete blood count test that also measures other types of blood cells.\n\nBasophils play a critical part in "immune surveillance". They have the ability to detect and destroy some early cancer cells. Another important function of these cells is that they release the histamine hormone during an allergic reaction or asthma attack.\n\nThe Differential Basophil Count test helps check triggering inflammatory reactions in the body. A very high basophil count (basophilia) may signal an infection or a more serious condition, like leukemia or autoimmune disease. Whereas, a low basophil count (basopenia) could signal that your basophils are working overtime to attack an allergen or treat an infection that is taking longer than normal to heal. No special preparation is required for this test; eat or drink as per your daily routine. \n\nTest result ranges are approximate and may differ slightly between different labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition and formulate an overall treatment plan.',
              synonyms:
                "Basophilic granulocytes, Mast cells (related but not identical), Basophilic leukocytes, Histamine-producing cells, Allergic response cells",
              low: " ",
              high: "",
              unit_of_measure: "%",
              male_low_range: "0.5",
              male_high_range: "1",
              female_low_range: "0.5",
              female_high_range: "1",
              child_low_range: "0.5",
              child_high_range: "1",
              pregnent_women_low_range: "0.5",
              pregnent_women_high_range: "1",
              high_range_indication:
                "Increased in allergic reactions, myeloproliferative disorders",
              low_range_indication: " ",
            },
          ],
        },
        {
          name: "Platelets (PLTs)",
          short_desc:
            "Measures the number of platelets in the blood, important for blood clotting.",
          long_desc:
            "The Platelet Count test measures the average number of platelets in the blood. Platelets are tiny, colorless blood cells that play a critical role in blood clotting. This test helps detect or monitor conditions that cause excessive bleeding or clotting. It is often done as part of a complete blood count test that also measures other types of blood cells.\n\nPlatelets, also known as thrombocytes, help the blood to clot at an injury site and prevent excessive bleeding. When you have a cut or injury, platelets rush to the site and clump together to form a clot, which helps stop bleeding. Platelets also release substances that promote healing and repair damaged blood vessels. The normal platelet count ranges between 1.5 to 4.5 lacs platelets per microliter of blood.\n\nIf your platelet count is too low (thrombocytopenia), it can lead to bleeding problems and difficulty forming clots. A low platelet count can be caused by various factors, including reduced platelet production in conditions like bone marrow failure, increased platelet destruction as seen in ITP (idiopathic thrombocytopenic purpura), or heightened platelet trapping as observed in hypertension. Conversely, if your platelet count is too high (thrombocytosis), it might increase the risk of blood clots. High platelet count may occur due to iron deficiency, infections, or inflammation.\n\nYour doctor may suggest the Platelet Count test if you experience excessive bleeding or bruising symptoms or have conditions that can affect your platelet count. Test results can help the doctor diagnose and monitor various conditions, such as bleeding disorders, certain infections, immune system disorders, and side effects of medications. No special preparation is required for this test; eat or drink as per your daily routine. Inform your doctor if you take any medicines, as they may affect your test results.\n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition and formulate an overall treatment plan.",
          synonyms:
            "Platelet Count, Thrombocyte Count, PLT Test, Blood Platelet Count",
          low: "Low Platelet Count (Thrombocytopenia)",
          high: "High Platelet Count (Thrombocytosis)",
          unit_of_measure: "cells/µL",
          male_low_range: "150000",
          male_high_range: "450000",
          female_low_range: "150000",
          female_high_range: "450000",
          child_low_range: "150000",
          child_high_range: "450000",
          pregnent_women_low_range: "150000",
          pregnent_women_high_range: "450000",
          high_range_indication:
            "Risk of clotting, inflammation, iron deficiency, myeloproliferative disorders",
          low_range_indication:
            "Risk of bleeding, bone marrow disorders, viral infections, autoimmune diseases",
          sub_parameter_dtls: [],
        },
      ],
    },
    {
      name: "Platelet Count",
      short_desc:
        "A measurement of the number of platelets in a sample of blood",
      long_desc:
        "The Platelet Count test measures the average number of platelets in the blood. Platelets are tiny, colorless blood cells that play a critical role in blood clotting. This test helps detect or monitor conditions that cause excessive bleeding or clotting. It is often done as part of a complete blood count test that also measures other types of blood cells.\n\nPlatelets, also known as thrombocytes, help the blood to clot at an injury site and prevent excessive bleeding. When you have a cut or injury, platelets rush to the site and clump together to form a clot, which helps stop bleeding. Platelets also release substances that promote healing and repair damaged blood vessels. The normal platelet count ranges between 1.5 to 4.5 lacs platelets per microliter of blood.\n\nIf your platelet count is too low (thrombocytopenia), it can lead to bleeding problems and difficulty forming clots. A low platelet count can be caused by various factors, including reduced platelet production in conditions like bone marrow failure, increased platelet destruction as seen in ITP (idiopathic thrombocytopenic purpura), or heightened platelet trapping as observed in hypertension. Conversely, if your platelet count is too high (thrombocytosis), it might increase the risk of blood clots. High platelet count may occur due to iron deficiency, infections, or inflammation.\n\nYour doctor may suggest the Platelet Count test if you experience excessive bleeding or bruising symptoms or have conditions that can affect your platelet count. Test results can help the doctor diagnose and monitor various conditions, such as bleeding disorders, certain infections, immune system disorders, and side effects of medications. No special preparation is required for this test; eat or drink as per your daily routine. Inform your doctor if you take any medicines, as they may affect your test results.\n\nTest result ranges are approximate and may differ slightly between labs depending on the methodology and laboratory guidelines. Talk to your doctor about your specific test results. The results will help them determine your medical condition and formulate an overall treatment plan.",
      synonyms:
        "Thrombocyte Count | Platelets | Thrombocyte Index | CBC - Platelet component | Platelet Volume | Mean Platelet Volume (MPV)",
      parameter_dtls: [
        {
          name: "Mean Platelet Volume (MPV)",
          short_desc:
            "Assesses the average size of platelets in the blood, indicating platelet production rates.",
          long_desc:
            "One of the most common tests that doctors run is a complete blood count (CBC). CBC is an umbrella term for a series of tests that look at specific types of cells in your blood.\n\nOne of the tests run during a CBC is an MPV test. An MPV test measures the average size of your platelets. It’s closely related to a platelet count test, which measures the number of platelets in your blood.\n\nPlatelets are small blood cells that play an essential role in blood clotting. When you cut yourself, for example, platelets stick together to stop the bleeding. In some cases, platelet abnormalities can be a sign of a bleeding disorder or other health problem.\n\nHaving a high or low MPV doesn’t mean anything on its own. It should be interpreted within the context of other CBC results, such as platelet count. In most cases, your doctor will simply use your MPV test results to decide whether or not to do additional testing, such as a bone marrow biopsy.\n\nAlso keep in mind that several things can affect your MPV, including living at a high altitude or following a vigorous exercise routine. Make sure you go over your test results with your doctor so you get the full picture.",
          synonyms:
            "MPV Test, Platelet Size Measurement, Mean Thrombocyte Volume, Average Platelet Volume",
          low: "",
          high: "",
          unit_of_measure: "",
          male_low_range: "",
          male_high_range: "",
          female_low_range: "",
          female_high_range: "",
          child_low_range: "",
          child_high_range: "",
          pregnent_women_low_range: "",
          pregnent_women_high_range: "",
          high_range_indication: "",
          low_range_indication: "",
          sub_parameter_dtls: [],
        },
        {
          name: "Platelet Distribution Width (PDW)",
          short_desc:
            "Measures the variation in platelet size, which helps detect platelet disorders.",
          long_desc:
            "PDW is a test used to determine the difference in the size of the platelets. Platelet is one of the important cells that are present in the bone marrow. Platelets help in blood clotting and reduce the risk of excessive bleeding at the time of any injury. Certain diseases such as heart disease, gastric cancer, and other vascular diseases as well. At Hindustan Wellness, you can register yourself for various types of tests. It is a NABL-authorised lab and offers a variety of tests with a guarantee. It has an experienced panel of phlebotomists and technicians who help in carrying out all the tests efficiently.",
          synonyms:
            "PDW Test, Platelet Size Distribution, Thrombocyte Distribution Width, Platelet Volume Distribution",
          low: "",
          high: "",
          unit_of_measure: "",
          male_low_range: "",
          male_high_range: "",
          female_low_range: "",
          female_high_range: "",
          child_low_range: "",
          child_high_range: "",
          pregnent_women_low_range: "",
          pregnent_women_high_range: "",
          high_range_indication: "",
          low_range_indication: "",
          sub_parameter_dtls: [],
        },
      ],
    },
  ],
};
