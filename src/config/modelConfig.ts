// Elastic-net penalized logistic regression model coefficients
// Source: penalized_logistic_regression_report_v2.docx
// Model: alpha = 0.4, lambda = 0.003093833 (10-fold CV, lambda.min)
// Outcome: max_HRI (binary)
// Validation AUC: 0.7957 (95% CI 0.7783–0.8131), Youden threshold: 0.3142

type ModelConfig = {
  intercept: number;
  threshold: number;
  coefficients: {
    max: number;
    age: Record<string, number>;
    sex: Record<string, number>;
    race: Record<string, number>;
    //insurance: Record<string, number>;
  };
  comorbidities: Array<{
    key: string;
    label: string;
    coefficient: number;
  }>;
};

export const MODEL_CONFIG: ModelConfig = {
  intercept: -16.121189,
  threshold: 0.3142,

  coefficients: {
    //age: 0.007637,
    age: {
      "Adult (>64)": 0,
      "Adult (45-64)":  -0.366416 ,
      "Adult (18-44)":  -0.347785 ,
      "Children (<18)": -0.411277,
    } as Record<string, number>,

    max: 0.177205,

    // Reference category: Male (genderMale shrunk to zero by penalty)
    sex: {
      Male: 0.359265,
      Female: 0,
    } as Record<string, number>,

    // Reference category: Black non-Hispanic (shrunk to zero by penalty)
    race: {
      "Black non-Hispanic": 0.095726,
      "White non-Hispanic": 0.557158,
      Hispanic: -0.170234,
      Other: 0.222823,
      Asian: 0,
    } as Record<string, number>,

    // Reference category: Private (not in model output = 0)
    //insurance: {
    //  Private: 0,
    //  "Medicaid/Medicare": -0.131649,
    //  "Other/Unknown": 0.309804,
    //} as Record<string, number>,
  },

  // Edit labels and coefficients here to update the calculator.
  // To add a comorbidity: add a new entry with a unique key, label, and coefficient.
  // To remove one: delete the entry. The calculator will update automatically.

  comorbidities: [
    { key: "PSYCH",        label: "Psychiatric",              coefficient: 0.178478 },
    { key: "NEURO",        label: "Neurologic",               coefficient: 0.202683 },
    { key: "CARDIO",       label: "Cariovascular",            coefficient: 0.065762 },
  ],

  //comorbidities: [
  //  { key: "anemia_deficiency",        label: "Anemia Deficiency",                  coefficient: -0.037668 },
  //  { key: "autoimmune",               label: "Autoimmune Condition",               coefficient: -0.216079 },
  //  { key: "blood_loss_anemia",        label: "Blood Loss Anemia",                  coefficient: -1.580532 },
  //  { key: "lymphoma",                 label: "Lymphoma",                           coefficient: -0.637235 },
  //  { key: "metastatic_cancer",        label: "Metastatic Cancer",                  coefficient: -1.355933 },
  //  { key: "cancer_in_situ",           label: "Cancer In Situ",                     coefficient: -0.939325 },
  //  { key: "solid_tumor",              label: "Solid Tumor (No Metastasis)",         coefficient: -0.429233 },
  //  { key: "heart_failure",            label: "Heart Failure",                      coefficient: -0.241631 },
  //  { key: "coagulopathy",             label: "Coagulopathy",                       coefficient:  0.492416 },
  //  { key: "depression",               label: "Depression",                         coefficient: -0.002008 },
  //  { key: "diabetes_uncomplicated",   label: "Diabetes (Uncomplicated)",           coefficient: -0.149603 },
  //  { key: "diabetes_complicated",     label: "Diabetes (Complicated)",             coefficient: -0.061352 },
  //  { key: "hypertension_complicated", label: "Hypertension (Complicated)",         coefficient: -0.000062 },
  //  { key: "hypertension_uncomplicated", label: "Hypertension (Uncomplicated)",     coefficient:  0.147249 },
  //  { key: "liver_disease_severe",     label: "Severe Liver Disease",               coefficient: -1.762484 },
  //  { key: "movement_neuro",           label: "Movement Neurological Disorder",     coefficient:  0.290247 },
  //  { key: "other_neuro",              label: "Other Neurological Disorder",        coefficient:  0.563231 },
  //  { key: "seizure",                  label: "Seizure Disorder",                   coefficient:  0.410332 },
  //  { key: "obesity",                  label: "Obesity",                            coefficient: -0.118988 },
  //  { key: "paralysis",                label: "Paralysis",                          coefficient: -0.391827 },
  //  { key: "pvd",                      label: "Peripheral Vascular Disease",        coefficient:  0.031145 },
  //  { key: "psychoses",                label: "Psychoses",                          coefficient:  0.472055 },
  //  { key: "pulmonary_circulation",    label: "Pulmonary Circulation Disorder",     coefficient: -0.303374 },
  //  { key: "renal_moderate",           label: "Renal Failure (Moderate)",           coefficient:  0.508103 },
  //  { key: "renal_severe",             label: "Renal Failure (Severe)",             coefficient: -0.711820 },
  //  { key: "peptic_ulcer",             label: "Peptic Ulcer Disease",               coefficient: -0.872822 },
  //  { key: "valvular_disease",         label: "Valvular Disease",                   coefficient: -0.000543 },
  //  { key: "weight_loss",              label: "Weight Loss",                        coefficient: -0.430060 },
  //],

};
