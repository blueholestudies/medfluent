// MedFluent Medical Spanish Content
// 3 starter units with 10 lessons each

export const medicalUnits = [
  {
    id: 1,
    name: "Greetings & Triage",
    description: "Essential phrases for first patient contact",
    icon: "👋",
    color: "#1DB5BE",
    lightColor: "#E0F7F8",
    totalLessons: 10,
    lessons: [
      {
        id: "u1l1",
        title: "Basic Greetings",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Greet patients professionally in Spanish"],
          items: [
            {
              english: "Hello, good morning",
              spanish: "Hola, buenos días",
              pronunciation: "OH-lah, BWAY-nos DEE-ahs",
              audio: "auto"
            },
            {
              english: "Good afternoon", 
              spanish: "Buenas tardes",
              pronunciation: "BWAY-nas TAR-des",
              audio: "auto"
            },
            {
              english: "How are you?",
              spanish: "¿Cómo está usted?",
              pronunciation: "KOH-moh es-TAH oos-TED",
              audio: "auto"
            },
            {
              english: "I am the doctor/nurse",
              spanish: "Soy el doctor/la enfermera",
              pronunciation: "soy el dok-TOR / lah en-fer-MEH-rah",
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l2",
        title: "Patient Information",
        type: "phrase_drill",
        xpReward: 20,
        content: {
          objective: ["Ask for basic patient information"],
          items: [
            {
              prompt_en: "What is your name?",
              answer_es: "¿Cómo se llama usted?",
              acceptable: ["¿Cuál es su nombre?", "¿Cómo te llamas?"],
              audio: "auto"
            },
            {
              prompt_en: "How old are you?",
              answer_es: "¿Cuántos años tiene?",
              acceptable: ["¿Qué edad tiene?", "¿Cuántos años tienes?"],
              audio: "auto"
            },
            {
              prompt_en: "What brings you here today?",
              answer_es: "¿Qué lo trae aquí hoy?",
              acceptable: ["¿Por qué vino hoy?", "¿Cuál es el problema?"],
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l3",
        title: "Pain Assessment",
        type: "phrase_drill", 
        xpReward: 20,
        content: {
          objective: ["Ask about pain location and severity"],
          items: [
            {
              prompt_en: "Where is your pain?",
              answer_es: "¿Dónde le duele?",
              acceptable: ["¿Dónde tiene dolor?", "¿Dónde le duele a usted?"],
              audio: "auto"
            },
            {
              prompt_en: "On a scale of 0 to 10, how bad is your pain?",
              answer_es: "En una escala del 0 al 10, ¿qué tan fuerte es su dolor?",
              acceptable: ["En una escala de 0 a 10, ¿qué tan fuerte es su dolor?", "Del 0 al 10, ¿cuánto le duele?"],
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l4",
        title: "When Did It Start?",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Discuss timing of symptoms"],
          items: [
            {
              english: "When did this start?",
              spanish: "¿Cuándo empezó esto?",
              pronunciation: "KWAN-doh em-peh-SOH ES-toh",
              audio: "auto"
            },
            {
              english: "Today",
              spanish: "Hoy", 
              pronunciation: "oy",
              audio: "auto"
            },
            {
              english: "Yesterday",
              spanish: "Ayer",
              pronunciation: "ah-YER",
              audio: "auto"
            },
            {
              english: "A few days ago",
              spanish: "Hace unos días",
              pronunciation: "AH-seh OO-nos DEE-ahs",
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l5",
        title: "Emergency Phrases",
        type: "dialogue",
        xpReward: 25,
        content: {
          scenario: "Emergency room triage",
          dialogue: [
            {
              speaker: "nurse",
              text_en: "What's the emergency?",
              text_es: "¿Cuál es la emergencia?",
              options: [
                { text: "Chest pain", correct: true, response: "Dolor en el pecho" },
                { text: "Headache", correct: true, response: "Dolor de cabeza" },
                { text: "Difficulty breathing", correct: true, response: "Dificultad para respirar" }
              ]
            }
          ]
        }
      },
      {
        id: "u1l6",
        title: "Body Parts",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Learn essential body parts vocabulary"],
          items: [
            {
              english: "Head",
              spanish: "Cabeza",
              pronunciation: "kah-BEH-sah",
              audio: "auto"
            },
            {
              english: "Chest",
              spanish: "Pecho",
              pronunciation: "PEH-choh", 
              audio: "auto"
            },
            {
              english: "Stomach",
              spanish: "Estómago",
              pronunciation: "es-TOH-mah-goh",
              audio: "auto"
            },
            {
              english: "Back",
              spanish: "Espalda",
              pronunciation: "es-PAL-dah",
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l7",
        title: "Common Symptoms",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Recognize common patient symptoms"],
          items: [
            {
              english: "Fever",
              spanish: "Fiebre",
              pronunciation: "fee-EH-breh",
              audio: "auto"
            },
            {
              english: "Nausea",
              spanish: "Náuseas",
              pronunciation: "NAH-oo-se-ahs",
              audio: "auto"
            },
            {
              english: "Dizziness", 
              spanish: "Mareos",
              pronunciation: "mah-REH-ohs",
              audio: "auto"
            },
            {
              english: "Cough",
              spanish: "Tos",
              pronunciation: "tohs",
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l8",
        title: "Triage Questions",
        type: "phrase_drill",
        xpReward: 20,
        content: {
          objective: ["Ask essential triage questions"],
          items: [
            {
              prompt_en: "Do you have any allergies?",
              answer_es: "¿Tiene alguna alergia?",
              acceptable: ["¿Es alérgico a algo?", "¿Tiene alergias?"],
              audio: "auto"
            },
            {
              prompt_en: "Are you taking any medications?",
              answer_es: "¿Está tomando algún medicamento?", 
              acceptable: ["¿Toma medicinas?", "¿Está tomando medicina?"],
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l9",
        title: "Comfort & Reassurance",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Provide comfort to patients"],
          items: [
            {
              english: "Don't worry",
              spanish: "No se preocupe",
              pronunciation: "noh seh preh-oh-KOO-peh",
              audio: "auto"
            },
            {
              english: "Everything will be okay",
              spanish: "Todo va a estar bien",
              pronunciation: "TOH-doh vah ah es-TAR bee-en",
              audio: "auto"
            },
            {
              english: "We will help you",
              spanish: "Le vamos a ayudar",
              pronunciation: "leh VAH-mohs ah ah-yoo-DAR",
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u1l10",
        title: "Triage Practice",
        type: "dialogue",
        xpReward: 30,
        content: {
          scenario: "Complete triage assessment",
          dialogue: [
            {
              speaker: "nurse",
              text_en: "Good morning! I'm nurse Maria. What brings you in today?",
              text_es: "¡Buenos días! Soy la enfermera María. ¿Qué lo trae hoy?",
              options: [
                { text: "Chest pain for 2 hours", correct: true, response: "Dolor de pecho por 2 horas" },
                { text: "Stomach pain since yesterday", correct: true, response: "Dolor de estómago desde ayer" }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    name: "History & Review",
    description: "Taking patient history and review of systems",
    icon: "📋",
    color: "#6E6CFF",
    lightColor: "#E8E8FF",
    totalLessons: 10,
    lessons: [
      {
        id: "u2l1",
        title: "Chief Complaint",
        type: "phrase_drill",
        xpReward: 20,
        content: {
          objective: ["Document the main problem"],
          items: [
            {
              prompt_en: "What is your main concern today?",
              answer_es: "¿Cuál es su principal preocupación hoy?",
              acceptable: ["¿Cuál es el problema principal?", "¿Qué es lo que más le molesta?"],
              audio: "auto"
            }
          ]
        }
      },
      {
        id: "u2l2",
        title: "Pain Description",
        type: "vocabulary",
        xpReward: 15,
        content: {
          objective: ["Describe different types of pain"],
          items: [
            {
              english: "Sharp pain",
              spanish: "Dolor punzante",
              pronunciation: "doh-LOR poon-SAHN-teh",
              audio: "auto"
            },
            {
              english: "Dull pain",
              spanish: "Dolor sordo",
              pronunciation: "doh-LOR SOR-doh",
              audio: "auto"
            }
          ]
        }
      },
      // Additional lessons would follow the same pattern...
      {
        id: "u2l3",
        title: "Timing Questions",
        type: "phrase_drill",
        xpReward: 20,
        content: {
          objective: ["Ask about symptom timing"],
          items: [
            {
              prompt_en: "How long have you had this?",
              answer_es: "¿Cuánto tiempo ha tenido esto?",
              acceptable: ["¿Desde cuándo tiene esto?", "¿Por cuánto tiempo?"],
              audio: "auto"
            }
          ]
        }
      }
      // ... continuing with u2l4 through u2l10
    ]
  },
  {
    id: 3,
    name: "Physical Exam",
    description: "Commands and phrases for physical examination",
    icon: "🩺",
    color: "#2FBF71", 
    lightColor: "#E8F5E8",
    totalLessons: 10,
    lessons: [
      {
        id: "u3l1",
        title: "Exam Instructions",
        type: "phrase_drill",
        xpReward: 20,
        content: {
          objective: ["Give basic examination commands"],
          items: [
            {
              prompt_en: "Please sit here",
              answer_es: "Por favor siéntese aquí",
              acceptable: ["Siéntese aquí por favor", "Tome asiento aquí"],
              audio: "auto"
            },
            {
              prompt_en: "Take a deep breath",
              answer_es: "Respire profundo",
              acceptable: ["Tome aire profundo", "Respire hondo"],
              audio: "auto"
            }
          ]
        }
      }
      // ... continuing with u3l2 through u3l10
    ]
  }
];

// Placeholder definitions for Units 4-10
export const futureUnits = [
  {
    id: 4,
    name: "Consent & Procedures",
    description: "Explaining procedures and obtaining consent",
    icon: "📄",
    color: "#FF7A59",
    lightColor: "#FFE9E3",
    totalLessons: 10,
    locked: true
  },
  {
    id: 5,
    name: "Medications & Allergies", 
    description: "Medication management and allergy assessment",
    icon: "💊",
    color: "#FFC857",
    lightColor: "#FFF3D6", 
    totalLessons: 10,
    locked: true
  },
  {
    id: 6,
    name: "Discharge Planning",
    description: "Instructions for home care and follow-up",
    icon: "🏠",
    color: "#4CB7FF",
    lightColor: "#E8F4FF",
    totalLessons: 10, 
    locked: true
  },
  {
    id: 7,
    name: "Emergency & Trauma",
    description: "Critical care and trauma situations", 
    icon: "🚨",
    color: "#FF5A5F",
    lightColor: "#FFE8E9",
    totalLessons: 12,
    locked: true
  },
  {
    id: 8,
    name: "Pediatrics",
    description: "Communicating with children and parents",
    icon: "🧸", 
    color: "#FF7A59",
    lightColor: "#FFE9E3",
    totalLessons: 8,
    locked: true
  },
  {
    id: 9,
    name: "OB/GYN",
    description: "Women's health and obstetric care",
    icon: "👶",
    color: "#D8CDFF",
    lightColor: "#F4F1FF", 
    totalLessons: 10,
    locked: true
  },
  {
    id: 10,
    name: "Inpatient & Handoffs",
    description: "Hospital rounds and patient transfers",
    icon: "🏥",
    color: "#1DB5BE", 
    lightColor: "#E0F7F8",
    totalLessons: 10,
    locked: true
  }
];

export const getAllUnits = () => [...medicalUnits, ...futureUnits];

export const getUnitById = (id) => {
  const allUnits = getAllUnits();
  return allUnits.find(unit => unit.id === id);
};

export const getLessonById = (unitId, lessonId) => {
  const unit = getUnitById(unitId);
  return unit?.lessons?.find(lesson => lesson.id === lessonId);
};