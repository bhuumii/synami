
import fs from "node:fs";

const products = [
  {
    title: "Hexaconazole 5% SC",
    brandName: "Torix",
    categoryTitle: "Fungicide",
    shortDescription: "A systemic triazole fungicide for managing susceptible fungal diseases on registered crops.",
    description: "Torix contains hexaconazole 5% in a suspension concentrate formulation. Hexaconazole is a systemic triazole fungicide used to manage susceptible fungal diseases where the product is registered.\n\nUse on approved crops and target diseases only. Follow the registered label for dosage, timing, spray intervals and safety precautions.",
    modeOfAction: "Hexaconazole inhibits sterol biosynthesis in fungi by interfering with the C14-demethylase enzyme. This disrupts fungal cell-membrane development and restricts the growth of susceptible pathogens.",
    features: [
      ["Systemic fungicide", "The active ingredient is absorbed by plant tissues and can move within the plant following appropriate application."],
      ["Triazole chemistry", "Hexaconazole belongs to the triazole group and interferes with fungal sterol biosynthesis."],
      ["Suspension concentrate", "The SC formulation is designed for dilution in water and application according to label directions."],
      ["Disease-focused use", "Correct disease identification and timely, label-directed application are important for reliable management."]
    ]
  },
  {
    title: "Isoprothiolane 40% EC",
    brandName: "Wildfire",
    categoryTitle: "Fungicide",
    shortDescription: "A systemic fungicide formulation containing isoprothiolane for managing susceptible fungal diseases on registered crops.",
    description: "Wildfire contains isoprothiolane 40% in an emulsifiable concentrate formulation. Isoprothiolane is used in crop protection against certain fungal diseases, particularly in registered rice disease-management programmes.\n\nConfirm the approved crop and disease on the product label before use. Follow its application rate, timing, mixing directions and safety instructions.",
    modeOfAction: "Isoprothiolane interferes with important physiological processes in susceptible fungi, including processes associated with lipid metabolism and fungal development. Its practical performance depends on the pathogen, crop and application conditions.",
    features: [
      ["Systemic activity", "The active ingredient has systemic properties that support disease management when used according to its registered directions."],
      ["Specialised fungicide", "Isoprothiolane is used against particular fungal diseases rather than being a universal treatment for every pathogen."],
      ["Emulsifiable concentrate", "The EC formulation is intended to form an emulsion when diluted with water as directed on the label."],
      ["Label-led application", "Crop, disease, dose and application timing should always match the registered product instructions."]
    ]
  },
  {
    title: "Propineb 70% WP",
    brandName: "Zenvex",
    categoryTitle: "Fungicide",
    shortDescription: "A protective multi-site contact fungicide formulation for managing susceptible fungal diseases on registered crops.",
    description: "Zenvex contains propineb 70% in a wettable powder formulation. Propineb is a dithiocarbamate fungicide used as a protective treatment against susceptible fungal diseases where registered.\n\nGood spray coverage and appropriate timing are important for contact fungicides. Apply only to approved crops and diseases, following label directions and precautions.",
    modeOfAction: "Propineb is a multi-site fungicide that interferes with several enzyme-related processes in fungal cells. Its multi-site activity disrupts normal fungal metabolism and helps protect treated plant surfaces against susceptible pathogens.",
    features: [
      ["Protective contact action", "The fungicide acts primarily on treated surfaces, making appropriate timing and coverage important."],
      ["Multi-site activity", "Propineb affects several processes in fungal cells rather than acting at only one specific biochemical target."],
      ["Wettable powder", "The WP formulation is dispersed in water before application according to label mixing instructions."],
      ["Coverage matters", "Uniform coverage of the intended plant surfaces supports the protective role of a contact fungicide."]
    ]
  },
  {
    title: "Pyraclostrobin 10% + Thifluzamide 10% SC",
    brandName: "Tenzy",
    categoryTitle: "Fungicide",
    shortDescription: "A combination fungicide containing pyraclostrobin and thifluzamide for label-approved management of susceptible fungal diseases.",
    description: "Tenzy combines pyraclostrobin 10% and thifluzamide 10% in a suspension concentrate formulation. The active ingredients belong to different fungicide groups and interfere with fungal energy production through distinct biochemical targets.\n\nUse only for registered crops and diseases. Follow the product label for dose, timing, application intervals and resistance-management recommendations.",
    modeOfAction: "Pyraclostrobin inhibits mitochondrial respiration at the cytochrome bc1 complex, restricting fungal energy production. Thifluzamide inhibits succinate dehydrogenase in the mitochondrial respiratory chain. Their different targets provide complementary fungicidal activity against susceptible pathogens.",
    features: [
      ["Dual-active formulation", "Combines pyraclostrobin and thifluzamide, which have different primary targets in fungal respiration."],
      ["Different biochemical targets", "The active ingredients affect separate parts of the mitochondrial energy-production process in susceptible fungi."],
      ["Suspension concentrate", "The SC formulation is designed for dilution in water and application as specified on the label."],
      ["Resistance-aware use", "Follow label directions on application limits and fungicide rotation as part of an integrated disease-management plan."]
    ]
  },
  {
    title: "Tebuconazole 10% + Sulphur 65% WG",
    brandName: "Seiryu",
    categoryTitle: "Fungicide",
    shortDescription: "A combination fungicide containing tebuconazole and sulphur for managing susceptible fungal diseases where registered.",
    description: "Seiryu combines tebuconazole 10% and sulphur 65% in a water-dispersible granule formulation. Tebuconazole is a systemic triazole fungicide, while sulphur acts as a multi-site contact fungicide against susceptible pathogens.\n\nThe combination brings together different types of fungicidal activity. Use only on crops and diseases listed on the approved label and follow its safety and application directions.",
    modeOfAction: "Tebuconazole inhibits fungal sterol biosynthesis by interfering with the C14-demethylase enzyme. Sulphur acts through multi-site effects on susceptible fungi and their cellular processes. The ingredients therefore contribute through different mechanisms.",
    features: [
      ["Two fungicidal components", "Combines systemic triazole chemistry with the protective contact activity of sulphur."],
      ["Sterol-biosynthesis inhibition", "Tebuconazole interferes with a process required for normal fungal cell-membrane development."],
      ["Contact protection", "Sulphur contributes contact activity against susceptible fungi on adequately treated surfaces."],
      ["Water-dispersible granules", "The WG formulation is dispersed in water for application according to label instructions."]
    ]
  },
  {
    title: "Tebuconazole 25.9% EC",
    brandName: "Velxy",
    categoryTitle: "Fungicide",
    shortDescription: "A systemic triazole fungicide formulation for managing susceptible fungal diseases on registered crops.",
    description: "Velxy contains tebuconazole 25.9% in an emulsifiable concentrate formulation. Tebuconazole is a systemic triazole fungicide used against susceptible fungal pathogens in registered crop-protection programmes.\n\nUse the product only for approved crop and disease combinations. Follow the specified dose, timing, spray intervals and resistance-management directions on the label.",
    modeOfAction: "Tebuconazole inhibits the fungal C14-demethylase enzyme involved in ergosterol biosynthesis. This interferes with the formation of normal fungal cell membranes and restricts the development of susceptible pathogens.",
    features: [
      ["Systemic fungicide", "The active ingredient is absorbed by plant tissues following appropriate application."],
      ["Triazole mode of action", "Tebuconazole inhibits sterol biosynthesis, a process required for normal fungal cell membranes."],
      ["Emulsifiable concentrate", "The EC formulation is designed for dilution and application as instructed on the product label."],
      ["Timely disease management", "Correct identification of the disease and application at the labelled stage are important for performance."]
    ]
  },
  {
    title: "Tebuconazole 50% + Trifloxystrobin 25% WG",
    brandName: "Crusher",
    categoryTitle: "Fungicide",
    shortDescription: "A combination fungicide pairing tebuconazole and trifloxystrobin for label-approved management of susceptible fungal diseases.",
    description: "Crusher combines tebuconazole 50% and trifloxystrobin 25% in a water-dispersible granule formulation. These active ingredients belong to different fungicide groups and affect distinct processes in fungal cells.\n\nApply only to registered crops and target diseases. Follow label directions for dosage, timing, intervals and resistance management.",
    modeOfAction: "Tebuconazole inhibits fungal sterol biosynthesis by acting on the C14-demethylase enzyme. Trifloxystrobin inhibits mitochondrial respiration at the cytochrome bc1 complex. These distinct targets interfere with fungal membrane development and energy production, respectively.",
    features: [
      ["Combination fungicide", "Pairs two active ingredients with different primary biochemical targets in susceptible fungi."],
      ["Sterol-biosynthesis inhibition", "Tebuconazole disrupts a process required for normal fungal cell-membrane formation."],
      ["Respiration inhibition", "Trifloxystrobin interferes with mitochondrial energy production in susceptible fungal pathogens."],
      ["Water-dispersible granules", "The WG formulation is dispersed in water and applied according to the registered label."]
    ]
  },
  {
    title: "Thiophanate Methyl 70% WP",
    brandName: "Daiko",
    categoryTitle: "Fungicide",
    shortDescription: "A fungicide formulation containing thiophanate methyl for managing susceptible fungal diseases on registered crops.",
    description: "Daiko contains thiophanate methyl 70% in a wettable powder formulation. Thiophanate methyl is a benzimidazole-related fungicide used against susceptible fungal pathogens where the product is registered.\n\nUse only on approved crops and diseases. Follow the label for dosage, timing, application intervals and resistance-management guidance.",
    modeOfAction: "Thiophanate methyl is converted to an active benzimidazole-related compound that disrupts beta-tubulin function and microtubule formation in susceptible fungi. This interferes with cell division and fungal growth. Resistance management is important because cross-resistance can occur within this fungicide group.",
    features: [
      ["Fungal growth inhibition", "The active ingredient interferes with microtubule formation, a process involved in fungal cell division."],
      ["Benzimidazole-related chemistry", "Its mode of action differs from multi-site contact fungicides and requires careful resistance management."],
      ["Wettable powder formulation", "The WP formulation is dispersed in water according to the product's mixing instructions."],
      ["Responsible rotation", "Follow registered use directions and resistance-management guidance rather than relying repeatedly on one fungicide group."]
    ]
  },
  {
    title: "Tricyclazole 75% WP",
    brandName: "Genki",
    categoryTitle: "Fungicide",
    shortDescription: "A specialised fungicide formulation containing tricyclazole for managing susceptible rice blast disease where registered.",
    description: "Genki contains tricyclazole 75% in a wettable powder formulation. Tricyclazole is primarily associated with management of rice blast caused by susceptible Magnaporthe species, where registered.\n\nConfirm that the crop and disease are listed on the approved label. Follow the specified application timing, dosage and safety precautions.",
    modeOfAction: "Tricyclazole interferes with melanin biosynthesis in susceptible blast fungi. Melanin is important for the pathogen's infection structure to penetrate plant tissue, so disruption of its formation reduces the pathogen's ability to establish infection.",
    features: [
      ["Rice blast management", "Tricyclazole is a specialised option for rice blast where the specific product use is registered."],
      ["Melanin-biosynthesis inhibition", "The active ingredient disrupts formation of fungal melanin required for normal infection-structure function."],
      ["Wettable powder", "The WP formulation is dispersed in water before application according to label instructions."],
      ["Disease-specific timing", "Use at the crop stage and timing specified on the approved label for the target disease."]
    ]
  },
  {
    title: "Atrazine 50% WP",
    brandName: "Aventor",
    categoryTitle: "Herbicide",
    shortDescription: "A selective triazine herbicide formulation for controlling susceptible weeds in registered crops.",
    description: "Aventor contains atrazine 50% in a wettable powder formulation. Atrazine is a selective herbicide used in certain registered crops to control susceptible broadleaf weeds and some grasses.\n\nCrop selectivity and performance depend on the crop, weed species, soil and application timing. Use only as permitted by the approved label and follow all restrictions and safety directions.",
    modeOfAction: "Atrazine inhibits photosystem II in susceptible plants by binding to the D1 protein in the chloroplast electron-transport chain. This interrupts photosynthesis and causes susceptible weeds to decline. Selectivity depends on crop, dose and application conditions.",
    features: [
      ["Selective weed control", "Atrazine can control susceptible weeds in specifically registered crops when applied according to the label."],
      ["Photosynthesis inhibition", "The active ingredient interferes with photosystem II, disrupting the weed's ability to produce energy through photosynthesis."],
      ["Wettable powder", "The WP formulation is mixed and dispersed in water according to the label directions."],
      ["Application precision", "Crop stage, soil conditions, dose and weed susceptibility are important for safe and effective use."]
    ]
  },
  {
    title: "Bispyribac Sodium 10% SC",
    brandName: "Solvix",
    categoryTitle: "Herbicide",
    shortDescription: "A selective herbicide formulation for managing susceptible grass and broadleaf weeds in registered crops, including rice where approved.",
    description: "Solvix contains bispyribac sodium 10% in a suspension concentrate formulation. Bispyribac sodium is a selective herbicide used to manage susceptible weeds in registered cropping systems.\n\nUse only for approved crops and weed species, and follow label directions for crop stage, dose, water volume and application timing.",
    modeOfAction: "Bispyribac sodium inhibits acetolactate synthase (ALS), an enzyme required for the synthesis of branched-chain amino acids. Susceptible weeds stop growing and gradually decline. Weed spectrum and crop safety depend on registered use conditions.",
    features: [
      ["Selective herbicide", "Designed for use in specific registered crops against susceptible weed species."],
      ["ALS inhibition", "The active ingredient blocks an enzyme required for production of essential branched-chain amino acids in plants."],
      ["Suspension concentrate", "The SC formulation is designed for dilution in water and application according to the label."],
      ["Weed-stage management", "Correct weed identification and application at the recommended growth stage support better results."]
    ]
  },
  {
    title: "Fenoxaprop-p-ethyl 9.3% EC",
    brandName: "Decimator",
    categoryTitle: "Herbicide",
    shortDescription: "A selective post-emergence herbicide for managing susceptible grass weeds in registered crops.",
    description: "Decimator contains fenoxaprop-p-ethyl 9.3% in an emulsifiable concentrate formulation. This selective herbicide is used against susceptible grass weeds in crops for which the product is registered.\n\nCheck the crop, weed spectrum and application stage on the approved label. Follow the recommended dose and precautions to protect the crop and avoid off-target injury.",
    modeOfAction: "Fenoxaprop-p-ethyl inhibits acetyl-CoA carboxylase (ACCase), an enzyme essential for fatty-acid synthesis in susceptible grasses. This disrupts the production of lipids required for cell membranes and growing tissues, leading to weed growth cessation and eventual death.",
    features: [
      ["Grass-weed control", "Targets susceptible grass weeds in registered cropping systems; it is not intended to control every weed type."],
      ["Post-emergence use", "Applied after weeds emerge, at the crop and weed stages specified on the product label."],
      ["ACCase inhibition", "The active ingredient disrupts fatty-acid synthesis in susceptible grass weeds."],
      ["Emulsifiable concentrate", "The EC formulation is diluted and applied according to the label's mixing and spraying directions."]
    ]
  },
  {
    title: "Glufosinate Ammonium 13.5% SL",
    brandName: "Vanduk",
    categoryTitle: "Herbicide",
    shortDescription: "A non-selective herbicide formulation for controlling susceptible emerged weeds in approved use situations.",
    description: "Vanduk contains glufosinate ammonium 13.5% in a soluble liquid formulation. Glufosinate is a non-selective herbicide used against emerged weeds in situations permitted by its registered label.\n\nAvoid contact with desirable crops and other non-target plants. Use only in approved locations and follow all label directions, protective measures and drift precautions.",
    modeOfAction: "Glufosinate inhibits glutamine synthetase, an enzyme involved in nitrogen metabolism and ammonia detoxification in plants. This causes ammonia accumulation and disrupts photosynthetic function, leading to injury and death of susceptible treated vegetation.",
    features: [
      ["Non-selective weed control", "Can injure a wide range of treated plants, so protecting desirable vegetation is essential."],
      ["Acts on emerged weeds", "The product is used against weeds that are already present, according to the approved directions."],
      ["Glutamine-synthetase inhibition", "The active ingredient disrupts nitrogen metabolism and contributes to rapid physiological injury in susceptible plants."],
      ["Careful application", "Avoid spray drift and unintended contact with crops, trees and other non-target plants."]
    ]
  },
  {
    title: "Mesotrione 2.27% + Atrazine 22.7% SC",
    brandName: "Corbin",
    categoryTitle: "Herbicide",
    shortDescription: "A combination herbicide containing mesotrione and atrazine for managing susceptible weeds in registered crops.",
    description: "Corbin combines mesotrione 2.27% and atrazine 22.7% in a suspension concentrate formulation. These herbicides act at different sites in plants and are used against susceptible weeds in registered cropping systems.\n\nCrop safety and weed control depend on the crop, weed species, soil and timing. Use only as directed on the approved label and observe all restrictions.",
    modeOfAction: "Mesotrione inhibits 4-hydroxyphenylpyruvate dioxygenase (HPPD), disrupting carotenoid formation and causing bleaching in susceptible weeds. Atrazine inhibits photosystem II and interrupts photosynthetic electron transport. The ingredients therefore interfere with different processes in plant growth.",
    features: [
      ["Dual-active combination", "Combines mesotrione and atrazine, which affect different processes in susceptible weeds."],
      ["Bleaching response", "HPPD inhibition by mesotrione disrupts carotenoid formation and can cause characteristic bleaching in susceptible plants."],
      ["Photosynthesis inhibition", "Atrazine interferes with photosystem II, reducing the ability of susceptible weeds to photosynthesise."],
      ["Label-led selectivity", "Use only in registered crops and follow crop-stage, soil and application restrictions carefully."]
    ]
  },
  {
    title: "Pendimethalin 30% EC",
    brandName: "Jasper",
    categoryTitle: "Herbicide",
    shortDescription: "A pre-emergence herbicide formulation for controlling susceptible annual grasses and certain broadleaf weeds in registered crops.",
    description: "Jasper contains pendimethalin 30% in an emulsifiable concentrate formulation. Pendimethalin is a soil-applied herbicide used to suppress susceptible annual weeds as they germinate in registered crops.\n\nApplication timing and soil conditions are important. Follow the approved label for crop, dose, soil preparation and any required irrigation or incorporation directions.",
    modeOfAction: "Pendimethalin inhibits microtubule formation and cell division in susceptible germinating weeds. This prevents normal root and shoot development, limiting establishment of weeds treated at the appropriate stage.",
    features: [
      ["Pre-emergence weed management", "Used to suppress susceptible weeds during germination when applied at the label-recommended timing."],
      ["Inhibits cell division", "The active ingredient disrupts microtubule formation, affecting normal growth of germinating weeds."],
      ["Emulsifiable concentrate", "The EC formulation is prepared for application according to the label's mixing directions."],
      ["Soil preparation matters", "Follow label instructions for soil condition and placement to support performance and crop safety."]
    ]
  },
  {
    title: "Pendimethalin 38.7% CS",
    brandName: "Dinova",
    categoryTitle: "Herbicide",
    shortDescription: "A capsule-suspension pendimethalin herbicide for label-approved pre-emergence management of susceptible annual weeds.",
    description: "Dinova contains pendimethalin 38.7% in a capsule suspension formulation. Pendimethalin is a soil-applied herbicide used to control susceptible annual weeds as they germinate in registered crops.\n\nApply only to approved crops and follow label directions for timing, soil conditions, dose and any required incorporation or irrigation practices.",
    modeOfAction: "Pendimethalin disrupts microtubule formation and cell division in susceptible germinating weeds. This interferes with normal root and shoot development and prevents successful weed establishment when used at the recommended stage.",
    features: [
      ["Pre-emergence activity", "Targets susceptible weeds during germination when application timing follows the registered directions."],
      ["Growth-process inhibition", "The active ingredient disrupts microtubules needed for cell division and normal early weed development."],
      ["Capsule suspension", "The CS formulation contains the active ingredient in suspended capsules and must be used as directed on the label."],
      ["Timing and soil conditions", "Follow label guidance on application timing, soil preparation and crop safety."]
    ]
  },
  {
    title: "Pyroxasulfone 85% WG",
    brandName: "Pyroka",
    categoryTitle: "Herbicide",
    shortDescription: "A pre-emergence herbicide formulation for managing susceptible annual grasses and selected broadleaf weeds in registered crops.",
    description: "Pyroka contains pyroxasulfone 85% in a water-dispersible granule formulation. Pyroxasulfone is a residual herbicide used to manage susceptible weeds as they germinate in registered cropping systems.\n\nIts use depends on the crop, soil, weed spectrum and approved application method. Follow the product label for dose, timing, placement and safety precautions.",
    modeOfAction: "Pyroxasulfone inhibits very-long-chain fatty-acid (VLCFA) synthesis in susceptible plants. This disrupts formation of essential lipids and normal growth of emerging shoots and roots, preventing successful establishment of susceptible weeds.",
    features: [
      ["Residual weed management", "Provides activity against susceptible weeds during germination when used according to registered directions."],
      ["VLCFA synthesis inhibition", "The active ingredient disrupts production of very-long-chain fatty acids needed for normal plant growth."],
      ["Water-dispersible granules", "The WG formulation is dispersed in water according to label mixing and application instructions."],
      ["Crop-specific use", "Correct crop selection, soil conditions and application timing are important for selectivity and performance."]
    ]
  },
  {
    title: "Quizalofop Ethyl 10% EC",
    brandName: "Shinkora",
    categoryTitle: "Herbicide",
    shortDescription: "A selective post-emergence herbicide for controlling susceptible grass weeds in registered broadleaf crops.",
    description: "Shinkora contains quizalofop ethyl 10% in an emulsifiable concentrate formulation. Quizalofop ethyl is a selective herbicide used to control susceptible grass weeds in registered broadleaf crops.\n\nConfirm the crop and target weeds on the approved label before use. Apply at the recommended weed stage and follow all dose, mixing and safety instructions.",
    modeOfAction: "Quizalofop ethyl inhibits acetyl-CoA carboxylase (ACCase), an enzyme needed for fatty-acid synthesis in susceptible grasses. This disrupts lipid production and growth in developing tissues, leading to the gradual death of treated grass weeds.",
    features: [
      ["Selective grass-weed control", "Targets susceptible grasses in registered broadleaf crops and does not control all weed groups."],
      ["Post-emergence application", "Used after weeds emerge, at the crop and weed stages specified on the label."],
      ["ACCase inhibition", "The active ingredient disrupts fatty-acid synthesis in susceptible grass weeds."],
      ["Emulsifiable concentrate", "The EC formulation is diluted and applied as directed on the approved product label."]
    ]
  },
  {
    title: "Gibberellic Acid 0.001% L",
    brandName: "Qorzen",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A plant growth regulator formulation containing gibberellic acid for supporting specific growth processes where registered.",
    description: "Qorzen contains gibberellic acid 0.001% in liquid formulation. Gibberellic acid is a plant growth regulator associated with processes such as cell elongation, germination and aspects of flowering or fruit development, depending on the crop and use.\n\nResults depend on crop, growth stage and application conditions. Follow the registered label for approved uses, rate and timing.",
    modeOfAction: "Gibberellic acid is a plant hormone that activates growth-related signalling pathways. It can promote cell elongation and influence seed germination and developmental processes in responsive plants. The response varies with crop, concentration and stage of application.",
    features: [
      ["Growth regulation", "Gibberellic acid influences natural plant growth and development processes in responsive crops."],
      ["Cell elongation", "It can stimulate cell elongation, depending on the crop and the recommended application stage."],
      ["Developmental response", "Effects on germination, flowering or fruit development depend on the crop and registered use."],
      ["Stage-specific application", "Use the recommended dose and crop stage on the label to avoid inconsistent results."]
    ]
  },
  {
    title: "Gibberellic Acid 0.186% SP",
    brandName: "Mizento",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A soluble powder plant growth regulator containing gibberellic acid for registered crop-development applications.",
    description: "Mizento contains gibberellic acid 0.186% in a soluble powder formulation. Gibberellic acid is a plant hormone used to influence selected growth and developmental processes in responsive crops.\n\nThe intended response depends on crop, dose and timing. Use only for approved applications and follow label directions for preparation, application stage and safety.",
    modeOfAction: "Gibberellic acid activates plant growth signalling pathways that regulate processes including cell elongation and seed germination. Crop responses vary with plant physiology, growth stage, environmental conditions and the applied concentration.",
    features: [
      ["Plant growth regulation", "Supports specific growth-related processes in responsive crops when used according to approved directions."],
      ["Gibberellic acid activity", "The active ingredient acts as a plant hormone involved in growth and development signalling."],
      ["Soluble powder", "The SP formulation is dissolved in water following the label's preparation instructions."],
      ["Correct timing", "Crop stage and application rate strongly influence the response; follow the registered directions."]
    ]
  },
  {
    title: "Paclobutrazol 23% SC",
    brandName: "Genzaki",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A plant growth regulator containing paclobutrazol for controlling selected vegetative growth processes in registered crops.",
    description: "Genzaki contains paclobutrazol 23% in a suspension concentrate formulation. Paclobutrazol is a plant growth regulator used in specific registered crops to modify vegetative growth and influence plant development.\n\nThe response can vary significantly with crop, dose, application method and timing. Follow the approved label carefully and do not exceed the recommended rate.",
    modeOfAction: "Paclobutrazol inhibits gibberellin biosynthesis by interfering with oxidation steps in the terpenoid pathway. Reduced gibberellin production can limit shoot elongation and modify vegetative growth in responsive plants.",
    features: [
      ["Vegetative growth regulation", "Can reduce excessive shoot elongation in responsive crops when used for a registered purpose."],
      ["Gibberellin-biosynthesis inhibition", "The active ingredient interferes with production of gibberellins involved in shoot growth."],
      ["Suspension concentrate", "The SC formulation is prepared and applied according to the approved label."],
      ["Rate-sensitive response", "Crop response depends strongly on dose, timing and application method; precise label compliance is essential."]
    ]
  },
  {
    title: "Paclobutrazol 40% SC",
    brandName: "zelvik",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A concentrated paclobutrazol suspension concentrate for registered plant-growth regulation applications.",
    description: "zelvik contains paclobutrazol 40% in a suspension concentrate formulation. Paclobutrazol is used in selected registered crops to regulate vegetative growth by influencing gibberellin production.\n\nBecause crop response is dose-sensitive, use only for label-approved crops and application methods. Follow all rate, timing and handling instructions carefully.",
    modeOfAction: "Paclobutrazol inhibits gibberellin biosynthesis, reducing the hormone signals that promote shoot elongation. The resulting growth response varies by crop species, application method, plant stage and growing conditions.",
    features: [
      ["Plant growth regulation", "Used for specific registered growth-management purposes rather than as a general-purpose crop nutrient."],
      ["Reduced shoot elongation", "By inhibiting gibberellin biosynthesis, paclobutrazol can limit excessive vegetative extension in responsive plants."],
      ["Suspension concentrate", "The SC formulation should be mixed and applied according to the product label."],
      ["Precise dose required", "Concentration and application timing can strongly affect crop response; follow the registered directions exactly."]
    ]
  },
  {
    title: "Tricontanol 0.1% EW",
    brandName: "tabron",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A tricontanol-based plant growth regulator formulation for supporting growth and physiological activity in registered crops.",
    description: "tabron contains tricontanol 0.1% in an emulsion, oil-in-water formulation. Tricontanol is used in plant growth-regulation products intended to support physiological processes in responsive crops.\n\nPerformance depends on crop, growing conditions and application stage. Follow the approved label for dosage, timing and compatibility guidance.",
    modeOfAction: "Tricontanol is associated with changes in plant physiological activity, including photosynthetic and metabolic processes. The precise crop response can vary with plant species, environmental conditions and application practice.",
    features: [
      ["Growth-support formulation", "Designed for registered applications intended to support normal crop growth and physiological activity."],
      ["Tricontanol active ingredient", "Contains tricontanol, a growth-regulation ingredient used in selected crop-management programmes."],
      ["EW formulation", "The emulsion, oil-in-water formulation is prepared and applied according to the label."],
      ["Crop-stage awareness", "Use at the specified growth stage and rate to support consistent, label-directed application."]
    ]
  },
  {
    title: "Tricontanol 0.1% EC",
    brandName: "kenko",
    categoryTitle: "Plant Growth Regulator (PGR)",
    shortDescription: "A tricontanol-based plant growth regulator in emulsifiable concentrate formulation for registered crop uses.",
    description: "kenko contains tricontanol 0.1% in an emulsifiable concentrate formulation. Tricontanol is used in plant growth-regulation products intended to support physiological processes in responsive crops.\n\nUse only for label-approved crops and purposes. Follow the recommended dose, timing, mixing instructions and safety precautions.",
    modeOfAction: "Tricontanol is associated with changes in plant physiological activity and metabolic processes, including photosynthetic performance in responsive plants. The magnitude of the response depends on crop, environment and application conditions.",
    features: [
      ["Plant growth support", "Intended for registered uses that support growth-related physiological activity in responsive crops."],
      ["Tricontanol-based formulation", "Contains tricontanol, an ingredient used in selected plant growth-regulation programmes."],
      ["Emulsifiable concentrate", "The EC formulation is diluted and applied following the label's instructions."],
      ["Application discipline", "Follow the approved crop stage, dose and timing for appropriate use."]
    ]
  },
  {
    title: "Biostimulant Liquid",
    brandName: "mevro",
    categoryTitle: "Biostimulant",
    shortDescription: "A liquid biostimulant formulation intended to support crop physiological processes and performance under suitable growing conditions.",
    description: "mevro is a liquid biostimulant product intended to support crop growth and physiological activity. Biostimulants may help plants use nutrients efficiently or respond to environmental stresses, depending on the product's actual composition and approved claims.\n\nRefer to the product label or technical datasheet for ingredients, crop suitability, dose and timing. Do not treat the product as a substitute for balanced nutrition or good crop management.",
    modeOfAction: "The mode of action depends on the specific active ingredients and composition of this biostimulant. Biostimulant products may influence nutrient-use efficiency, root activity or physiological responses, but product-specific effects should be described only after the composition is confirmed.",
    features: [
      ["Crop-support formulation", "Intended to complement crop-management practices and support plant physiological performance."],
      ["Liquid application format", "A liquid formulation can be convenient to measure and prepare according to label instructions."],
      ["Use with balanced nutrition", "Biostimulants complement rather than replace suitable fertilisation, irrigation and crop care."],
      ["Composition-led claims", "Confirm the ingredient list and approved claims before making specific claims about stress tolerance or yield."]
    ]
  },
  {
    title: "Mycorrhiza Biofertilizer",
    brandName: "predator",
    categoryTitle: "Biofertilizer",
    shortDescription: "A mycorrhizal biofertilizer intended to support beneficial root-fungus associations and nutrient acquisition in compatible crops.",
    description: "predator is a mycorrhiza-based biofertilizer intended to support beneficial associations between plant roots and mycorrhizal fungi. These associations can help compatible plants explore soil and access certain nutrients, depending on the formulation and growing conditions.\n\nUse according to the product label for crop compatibility, placement, dosage and storage. Avoid practices that may harm the beneficial organisms, and verify the product's organism identity and viable count from its technical information.",
    modeOfAction: "Mycorrhizal fungi colonise compatible plant roots and extend fine fungal hyphae into the surrounding soil. This can increase the soil volume explored by the root-fungus association and improve access to nutrients such as phosphorus. Results depend on viable organisms, crop compatibility and soil conditions.",
    features: [
      ["Beneficial root association", "Mycorrhizal fungi can form symbiotic associations with compatible plant roots."],
      ["Nutrient acquisition support", "Fungal hyphae can help explore soil beyond the immediate root surface and access certain nutrients."],
      ["Biological soil support", "The product is intended to complement soil fertility and crop-management practices."],
      ["Viability matters", "Storage, handling, soil conditions and compatibility influence the performance of living microbial products."]
    ]
  },
  {
    title: "Humic Flakes",
    brandName: "maverlick",
    categoryTitle: "Soil Conditioner",
    shortDescription: "A humic-substance soil conditioner in flake form intended to support soil properties and nutrient-management practices.",
    description: "maverlick is a humic-flake soil conditioner intended to complement soil and nutrient management. Humic substances are used in agricultural products to support soil properties and interactions between soil and nutrients.\n\nThe exact performance depends on composition, solubility, application rate and soil conditions. Refer to the product label or technical datasheet for guaranteed analysis and recommended use.",
    modeOfAction: "Humic substances can interact with soil minerals and organic matter and influence nutrient availability and soil physical properties. The magnitude and type of response depend on the product's humic content, composition, soil characteristics and application practice.",
    features: [
      ["Humic-substance formulation", "Provides humic material intended to complement soil-management and nutrient-management practices."],
      ["Soil-property support", "Humic substances can influence soil interactions and properties depending on soil type and product composition."],
      ["Flake format", "The flake form is handled and applied according to the product's solubility and label directions."],
      ["Analysis-guided use", "Check the guaranteed composition and application recommendations before making specific nutrient or yield claims."]
    ]
  },
  {
    title: "Humic Powder",
    brandName: "shinobi",
    categoryTitle: "Soil Conditioner",
    shortDescription: "A humic-substance soil conditioner in powder form intended to complement soil improvement and nutrient-management programmes.",
    description: "shinobi is a humic-powder soil conditioner intended for use as part of a soil and nutrient-management programme. Humic substances can interact with soil components and influence nutrient availability and certain soil properties.\n\nUse according to the product's guaranteed analysis and label directions. Application rate and performance depend on the composition, soil type and crop-management conditions.",
    modeOfAction: "Humic substances interact with organic matter, minerals and nutrients in soil. Depending on composition and conditions, they may influence nutrient retention, nutrient availability and soil physical characteristics. Specific claims require confirmation from the product's technical datasheet.",
    features: [
      ["Humic-substance support", "Provides humic material to complement routine soil and nutrient management."],
      ["Nutrient interactions", "Humic substances can interact with nutrients and soil components, with effects depending on product and soil conditions."],
      ["Powder formulation", "The powder format should be stored, measured and applied according to label instructions."],
      ["Soil-specific results", "Performance varies with soil properties and product composition; use the guaranteed analysis to guide application."]
    ]
  }
];

function portableText(text, prefix) {
  return text.split("\n\n").filter(Boolean).map((paragraph, index) => ({
    _type: "block",
    _key: `${prefix}${index + 1}`,
    style: "normal",
    markDefs: [],
    children: [{
      _type: "span",
      _key: `${prefix}s${index + 1}`,
      text: paragraph,
      marks: []
    }]
  }));
}

const documents = products.map((p, index) => {
  const slug = p.title
    .toLowerCase()
    .replace(/%/g, "")
    .replace(/\+/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return {
    _id: `product-${slug}`,
    _type: "product",
    title: p.title,
    brandName: p.brandName,
    slug: { _type: "slug", current: slug },
    categoryTitle: p.categoryTitle,
    shortDescription: p.shortDescription,
    description: portableText(p.description, `d${index}`),
    modeOfAction: portableText(p.modeOfAction, `m${index}`),
    featuresBenefits: p.features.map(([title, text], featureIndex) => ({
      _key: `f${index}${featureIndex}`,
      _type: "feature",
      title,
      text
    })),
    order: index + 23
  };
});

if (documents.length !== 28) {
  throw new Error(`Expected 28 products; found ${documents.length}`);
}

for (const doc of documents) {
  if (doc.featuresBenefits.length !== 4) {
    throw new Error(`Expected 4 features for ${doc.brandName}`);
  }
}

fs.writeFileSync(
  "synamia_products_23-50_content.json",
  JSON.stringify(documents, null, 2),
  "utf8"
);

console.log("Created synamia_products_23-50_content.json");
console.log(`Products: ${documents.length} (23–50)`);
console.log("Each product has 4 feature cards.");
