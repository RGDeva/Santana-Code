import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for spiritual path quiz
export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  pathScores: {
    bhakti: number;
    karma: number;
    jnana: number;
    raja: number;
  };
}

export interface QuizResult {
  primaryPath: 'bhakti' | 'karma' | 'jnana' | 'raja';
  secondaryPath: 'bhakti' | 'karma' | 'jnana' | 'raja';
  scores: {
    bhakti: number;
    karma: number;
    jnana: number;
    raja: number;
  };
  date: string;
}

interface SpiritualPathQuizProps {
  onQuizComplete?: (result: QuizResult) => void;
}

const SpiritualPathQuiz: React.FC<SpiritualPathQuizProps> = ({ onQuizComplete }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    bhakti: 0,
    karma: 0,
    jnana: 0,
    raja: 0
  });
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [previousResults, setPreviousResults] = useState<QuizResult[]>([]);
  const [showPreviousResults, setShowPreviousResults] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Load questions and previous results on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    const quizQuestions: QuizQuestion[] = [
      {
        id: 'q1',
        text: 'When faced with a spiritual challenge, what approach resonates with you most?',
        options: [
          {
            id: 'q1_a',
            text: 'Surrendering to a higher power and seeking divine guidance',
            pathScores: { bhakti: 5, karma: 1, jnana: 1, raja: 2 }
          },
          {
            id: 'q1_b',
            text: 'Taking practical action to address the issue while maintaining detachment',
            pathScores: { bhakti: 1, karma: 5, jnana: 2, raja: 1 }
          },
          {
            id: 'q1_c',
            text: 'Analyzing the situation deeply to understand its true nature',
            pathScores: { bhakti: 1, karma: 2, jnana: 5, raja: 1 }
          },
          {
            id: 'q1_d',
            text: 'Using meditation and self-discipline to overcome the challenge',
            pathScores: { bhakti: 2, karma: 1, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q2',
        text: 'Which statement best describes your ideal relationship with the divine?',
        options: [
          {
            id: 'q2_a',
            text: 'I seek a personal, loving relationship with God as a devotee',
            pathScores: { bhakti: 5, karma: 1, jnana: 0, raja: 1 }
          },
          {
            id: 'q2_b',
            text: 'I honor the divine through selfless service and right action',
            pathScores: { bhakti: 2, karma: 5, jnana: 0, raja: 1 }
          },
          {
            id: 'q2_c',
            text: 'I seek to understand the ultimate nature of reality and consciousness',
            pathScores: { bhakti: 0, karma: 1, jnana: 5, raja: 2 }
          },
          {
            id: 'q2_d',
            text: 'I aim to realize the divine within through disciplined practice',
            pathScores: { bhakti: 1, karma: 1, jnana: 2, raja: 5 }
          }
        ]
      },
      {
        id: 'q3',
        text: 'Which spiritual practice do you find most appealing?',
        options: [
          {
            id: 'q3_a',
            text: 'Kirtan, bhajan, or devotional singing and chanting',
            pathScores: { bhakti: 5, karma: 0, jnana: 0, raja: 1 }
          },
          {
            id: 'q3_b',
            text: 'Seva or selfless service to others without expectation',
            pathScores: { bhakti: 2, karma: 5, jnana: 0, raja: 0 }
          },
          {
            id: 'q3_c',
            text: 'Self-inquiry, contemplation, and philosophical study',
            pathScores: { bhakti: 0, karma: 1, jnana: 5, raja: 1 }
          },
          {
            id: 'q3_d',
            text: 'Meditation, pranayama, and other yogic disciplines',
            pathScores: { bhakti: 1, karma: 0, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q4',
        text: 'When reading spiritual texts, what aspects resonate with you most?',
        options: [
          {
            id: 'q4_a',
            text: 'Stories of divine love, grace, and devotion',
            pathScores: { bhakti: 5, karma: 1, jnana: 1, raja: 0 }
          },
          {
            id: 'q4_b',
            text: 'Teachings about duty, right action, and ethical living',
            pathScores: { bhakti: 1, karma: 5, jnana: 1, raja: 1 }
          },
          {
            id: 'q4_c',
            text: 'Philosophical discussions about the nature of reality and self',
            pathScores: { bhakti: 0, karma: 1, jnana: 5, raja: 1 }
          },
          {
            id: 'q4_d',
            text: 'Instructions for meditation, energy work, and self-mastery',
            pathScores: { bhakti: 1, karma: 0, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q5',
        text: 'How do you prefer to express your spirituality in daily life?',
        options: [
          {
            id: 'q5_a',
            text: 'Through devotional rituals, prayer, and worship',
            pathScores: { bhakti: 5, karma: 1, jnana: 0, raja: 1 }
          },
          {
            id: 'q5_b',
            text: 'Through ethical conduct and service to others',
            pathScores: { bhakti: 1, karma: 5, jnana: 1, raja: 0 }
          },
          {
            id: 'q5_c',
            text: 'Through intellectual exploration and contemplation',
            pathScores: { bhakti: 0, karma: 1, jnana: 5, raja: 1 }
          },
          {
            id: 'q5_d',
            text: 'Through disciplined practice and mindful awareness',
            pathScores: { bhakti: 1, karma: 1, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q6',
        text: 'Which of these concepts from the Bhagavad Gita speaks to you most deeply?',
        options: [
          {
            id: 'q6_a',
            text: '"Whoever offers to Me with devotion a leaf, a flower, fruit, or water, I accept that offering of love." (9.26)',
            pathScores: { bhakti: 5, karma: 0, jnana: 0, raja: 0 }
          },
          {
            id: 'q6_b',
            text: '"You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions." (2.47)',
            pathScores: { bhakti: 0, karma: 5, jnana: 1, raja: 1 }
          },
          {
            id: 'q6_c',
            text: '"The wise see the same in all—whether it is a learned and humble brahmin, a cow, an elephant, a dog, or a dog-eater." (5.18)',
            pathScores: { bhakti: 0, karma: 1, jnana: 5, raja: 0 }
          },
          {
            id: 'q6_d',
            text: '"One who has control over the mind is tranquil in heat and cold, in pleasure and pain, and in honor and dishonor." (6.7)',
            pathScores: { bhakti: 0, karma: 1, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q7',
        text: 'What do you believe is the primary purpose of spiritual practice?',
        options: [
          {
            id: 'q7_a',
            text: 'To cultivate divine love and ultimately merge with the beloved',
            pathScores: { bhakti: 5, karma: 0, jnana: 1, raja: 1 }
          },
          {
            id: 'q7_b',
            text: 'To fulfill one's dharma (duty) with skill and detachment',
            pathScores: { bhakti: 0, karma: 5, jnana: 1, raja: 1 }
          },
          {
            id: 'q7_c',
            text: 'To realize the ultimate truth and transcend illusion',
            pathScores: { bhakti: 1, karma: 0, jnana: 5, raja: 1 }
          },
          {
            id: 'q7_d',
            text: 'To master the mind and senses through disciplined practice',
            pathScores: { bhakti: 0, karma: 1, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q8',
        text: 'When you think about enlightenment or liberation, how do you envision it?',
        options: [
          {
            id: 'q8_a',
            text: 'Eternal loving communion with the divine',
            pathScores: { bhakti: 5, karma: 0, jnana: 0, raja: 0 }
          },
          {
            id: 'q8_b',
            text: 'Freedom from the bondage of selfish action',
            pathScores: { bhakti: 0, karma: 5, jnana: 1, raja: 1 }
          },
          {
            id: 'q8_c',
            text: 'Direct realization of the ultimate truth of existence',
            pathScores: { bhakti: 0, karma: 0, jnana: 5, raja: 1 }
          },
          {
            id: 'q8_d',
            text: 'Complete mastery over mind and consciousness',
            pathScores: { bhakti: 0, karma: 1, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q9',
        text: 'Which of these spiritual figures do you feel most drawn to?',
        options: [
          {
            id: 'q9_a',
            text: 'Mirabai, Chaitanya Mahaprabhu, or other devotional saints',
            pathScores: { bhakti: 5, karma: 0, jnana: 0, raja: 0 }
          },
          {
            id: 'q9_b',
            text: 'Mahatma Gandhi, Karma Yogi, or other service-oriented leaders',
            pathScores: { bhakti: 1, karma: 5, jnana: 0, raja: 0 }
          },
          {
            id: 'q9_c',
            text: 'Adi Shankaracharya, Ramana Maharshi, or other wisdom teachers',
            pathScores: { bhakti: 0, karma: 0, jnana: 5, raja: 1 }
          },
          {
            id: 'q9_d',
            text: 'Patanjali, disciplined yogis, or meditation masters',
            pathScores: { bhakti: 0, karma: 0, jnana: 1, raja: 5 }
          }
        ]
      },
      {
        id: 'q10',
        text: 'What quality do you most aspire to develop in your spiritual journey?',
        options: [
          {
            id: 'q10_a',
            text: 'Devotion, surrender, and divine love',
            pathScores: { bhakti: 5, karma: 0, jnana: 0, raja: 0 }
          },
          {
            id: 'q10_b',
            text: 'Selfless service, duty, and right action',
            pathScores: { bhakti: 0, karma: 5, jnana: 0, raja: 0 }
          },
          {
            id: 'q10_c',
            text: 'Wisdom, discernment, and clear understanding',
            pathScores: { bhakti: 0, karma: 0, jnana: 5, raja: 0 }
          },
          {
            id: 'q10_d',
            text: 'Self-discipline, concentration, and mastery',
            pathScores: { bhakti: 0, karma: 0, jnana: 0, raja: 5 }
          }
        ]
      }
    ];
    
    setQuestions(quizQuestions);
    
    // Load previous results from local storage
    try {
      const savedResults = localStorage.getItem('spiritualPathResults');
      if (savedResults) {
        setPreviousResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error('Error loading previous results:', error);
    }
  }, []);
  
  // Handle answer selection
  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Update answers
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
    
    // Find the selected option
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option.id === optionId);
    
    if (selectedOption) {
      // Update scores
      setScores(prev => ({
        bhakti: prev.bhakti + selectedOption.pathScores.bhakti,
        karma: prev.karma + selectedOption.pathScores.karma,
        jnana: prev.jnana + selectedOption.pathScores.jnana,
        raja: prev.raja + selectedOption.pathScores.raja
      }));
    }
    
    // Move to next question or complete quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        completeQuiz();
      }
      setIsAnimating(false);
    }, 500);
  };
  
  // Complete the quiz and calculate results
  const completeQuiz = () => {
    // Find primary and secondary paths
    const scoreEntries = Object.entries(scores) as [string, number][];
    scoreEntries.sort((a, b) => b[1] - a[1]);
    
    const primaryPath = scoreEntries[0][0] as 'bhakti' | 'karma' | 'jnana' | 'raja';
    const secondaryPath = scoreEntries[1][0] as 'bhakti' | 'karma' | 'jnana' | 'raja';
    
    const quizResult: QuizResult = {
      primaryPath,
      secondaryPath,
      scores: { ...scores },
      date: new Date().toISOString()
    };
    
    setResult(quizResult);
    setQuizCompleted(true);
    
    // Save result to previous results
    const updatedResults = [quizResult, ...previousResults];
    setPreviousResults(updatedResults);
    
    try {
      localStorage.setItem('spiritualPathResults', JSON.stringify(updatedResults));
    } catch (error) {
      console.error('Error saving results:', error);
    }
    
    if (onQuizComplete) {
      onQuizComplete(quizResult);
    }
  };
  
  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScores({
      bhakti: 0,
      karma: 0,
      jnana: 0,
      raja: 0
    });
    setQuizCompleted(false);
    setResult(null);
  };
  
  // Get path display name
  const getPathDisplayName = (path: string): string => {
    switch (path) {
      case 'bhakti':
        return 'Bhakti Yoga (Path of Devotion)';
      case 'karma':
        return 'Karma Yoga (Path of Action)';
      case 'jnana':
        return 'Jnana Yoga (Path of Knowledge)';
      case 'raja':
        return 'Raja Yoga (Path of Meditation)';
      default:
        return path;
    }
  };
  
  // Get path description
  const getPathDescription = (path: string): string => {
    switch (path) {
      case 'bhakti':
        return 'Bhakti Yoga is the path of devotion and love for the Divine. It involves surrender, worship, and developing a personal relationship with God. This path emphasizes emotional connection, devotional practices, and seeing the Divine in all beings.';
      case 'karma':
        return 'Karma Yoga is the path of selfless action and service. It involves performing your duties without attachment to results, acting for the welfare of all beings, and transforming ordinary actions into spiritual practice through right intention and detachment.';
      case 'jnana':
        return 'Jnana Yoga is the path of knowledge and wisdom. It involves intellectual inquiry, self-analysis, and discrimination between the real and unreal. This path emphasizes study of scriptures, contemplation, and direct realization of ultimate truth.';
      case 'raja':
        return 'Raja Yoga is the path of meditation and mind control. It involves systematic practices to master the mind, senses, and life force through concentration, meditation, and ethical discipline. This path emphasizes direct experience through methodical spiritual practice.';
      default:
        return '';
    }
  };
  
  // Get recommended deities based on path
  const getRecommendedDeities = (primaryPath: string, secondaryPath: string): string[] => {
    const recommendations: Record<string, string[]> = {
      bhakti: ['Krishna', 'Radha', 'Rama', 'Hanuman', 'Ganesha'],
      karma: ['Vishnu', 'Krishna (as Gita teacher)', 'Shiva', 'Durga', 'Kartikeya'],
      jnana: ['Saraswati', 'Dakshinamurthy', 'Hayagriva', 'Ganesha', 'Surya'],
      raja: ['Shiva', 'Patanjali', 'Ganesha', 'Buddha', 'Dattatreya']
    };
    
    // Combine primary and secondary recommendations, removing duplicates
    const primaryRecs = recommendations[primaryPath] || [];
    const secondaryRecs = recommendations[secondaryPath] || [];
    
    return [...new Set([...primaryRecs, ...secondaryRecs])].slice(0, 5);
  };
  
  // Get recommended scriptures based on path
  const getRecommendedScriptures = (primaryPath: string, secondaryPath: string): string[] => {
    const recommendations: Record<string, string[]> = {
      bhakti: ['Bhagavata Purana', 'Narada Bhakti Sutras', 'Bhagavad Gita (Chapters 7-12)', 'Ramayana', 'Devi Mahatmya'],
      karma: ['Bhagavad Gita (Chapters 1-6)', 'Karma Yoga by Swami Vivekananda', 'Yoga Vasistha', 'Dharma Shastras', 'Mahabharata'],
      jnana: ['Upanishads', 'Brahma Sutras', 'Bhagavad Gita (Chapters 13-18)', 'Vivekachudamani', 'Ashtavakra Gita'],
      raja: ['Yoga Sutras of Patanjali', 'Hatha Yoga Pradipika', 'Shiva Samhita', 'Gheranda Samhita', 'Vigyana Bhairava Tantra']
    };
    
    // Combine primary and secondary recommendations, removing duplicates
    const primaryRecs = recommendations[primaryPath] || [];
    const secondaryRecs = recommendations[secondaryPath] || [];
    
    return [...new Set([...primaryRecs, ...secondaryRecs])].slice(0, 5);
  };
  
  // Get recommended practices based on path
  const getRecommendedPractices = (primaryPath: string, secondaryPath: string): string[] => {
    const recommendations: Record<string, string[]> = {
      bhakti: ['Kirtan (devotional singing)', 'Japa (mantra repetition)', 'Deity worship', 'Satsang (spiritual community)', 'Pilgrimage to sacred sites'],
      karma: ['Seva (selfless service)', 'Mindful work', 'Dana (charitable giving)', 'Ethical living', 'Yajna (ritual sacrifice)'],
      jnana: ['Svadhyaya (self-study)', 'Vichara (self-inquiry)', 'Meditation on "Who am I?"', 'Scriptural study', 'Contemplation on universal principles'],
      raja: ['Asana (yoga postures)', 'Pranayama (breath control)', 'Dhyana (meditation)', 'Pratyahara (sense withdrawal)', 'Yama and Niyama (ethical disciplines)']
    };
    
    // Combine primary and secondary recommendations, removing duplicates
    const primaryRecs = recommendations[primaryPath] || [];
    const secondaryRecs = recommendations[secondaryPath] || [];
    
    return [...new Set([...primaryRecs, ...secondaryRecs])].slice(0, 5);
  };
  
  // Calculate progress percentage
  const progressPercentage = questions.length > 0
    ? ((currentQuestionIndex + (Object.keys(answers).length > currentQuestionIndex ? 0.5 : 0)) / questions.length) * 100
    : 0;
  
  return (
    <div className="spiritual-path-quiz max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-sacred-gold font-cormorant">Spiritual Path Quiz</h1>
        <p className="text-off-white mt-2 font-spectral">
          Discover your natural inclination among the four classical paths of yoga
        </p>
      </motion.div>
      
      {/* Previous results button */}
      {previousResults.length > 0 && !quizCompleted && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowPreviousResults(!showPreviousResults)}
            className="text-tulsi-green hover:text-sacred-gold transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showPreviousResults ? 'Hide Previous Results' : 'View Previous Results'}
          </button>
        </div>
      )}
      
      {/* Previous results panel */}
      <AnimatePresence>
        {showPreviousResults && !quizCompleted && (
          <motion.div
            className="mb-8 bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl text-sacred-gold font-cormorant mb-4">Your Previous Results</h2>
            
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {previousResults.map((prevResult, index) => (
                <div
                  key={`result-${index}`}
                  className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg border border-sacred-gold border-opacity-20"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sacred-gold font-cormorant">
                        {getPathDisplayName(prevResult.primaryPath)}
                      </h3>
                      <p className="text-tulsi-green text-sm">
                        Secondary: {getPathDisplayName(prevResult.secondaryPath)}
                      </p>
                    </div>
                    
                    <div className="text-off-white text-sm">
                      {new Date(prevResult.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {Object.entries(prevResult.scores).map(([path, score]) => (
                      <div key={`score-${path}`} className="text-center">
                        <div className="text-sacred-gold">{score}</div>
                        <div className="text-off-white text-xs capitalize">{path}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <div className="bg-deep-indigo-800 bg-opacity-30 rounded-xl p-6 border border-sacred-gold border-opacity-30">
        {!quizCompleted ? (
          <>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 bg-deep-indigo-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-sacred-gold"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-tulsi-green text-sm">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
            
            {/* Question */}
            {questions.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl text-sacred-gold font-cormorant mb-6">
                    {questions[currentQuestionIndex].text}
                  </h2>
                  
                  {/* Options */}
                  <div className="space-y-4">
                    {questions[currentQuestionIndex].options.map((option) => (
                      <motion.button
                        key={option.id}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          answers[questions[currentQuestionIndex].id] === option.id
                            ? 'bg-sacred-gold bg-opacity-20 border-sacred-gold'
                            : 'bg-deep-indigo-900 bg-opacity-50 border-sacred-gold border-opacity-20 hover:bg-opacity-70'
                        }`}
                        onClick={() => handleAnswerSelect(questions[currentQuestionIndex].id, option.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        disabled={isAnimating}
                      >
                        <p className="text-off-white">{option.text}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl text-sacred-gold font-cormorant mb-2 text-center">
              Your Spiritual Path
            </h2>
            
            {result && (
              <>
                {/* Primary path */}
                <div className="mb-8">
                  <div className="bg-sacred-gold bg-opacity-20 border border-sacred-gold rounded-lg p-6 mb-4">
                    <h3 className="text-xl text-sacred-gold font-cormorant mb-2">
                      Primary Path: {getPathDisplayName(result.primaryPath)}
                    </h3>
                    <p className="text-off-white mb-4">
                      {getPathDescription(result.primaryPath)}
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-24 h-24 rounded-full bg-sacred-gold bg-opacity-20 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <span className="text-3xl text-sacred-gold font-cormorant">
                          {result.scores[result.primaryPath]}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="bg-deep-indigo-900 bg-opacity-50 border border-sacred-gold border-opacity-30 rounded-lg p-6">
                    <h3 className="text-lg text-sacred-gold font-cormorant mb-2">
                      Secondary Path: {getPathDisplayName(result.secondaryPath)}
                    </h3>
                    <p className="text-off-white text-sm mb-4">
                      {getPathDescription(result.secondaryPath)}
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-sacred-gold bg-opacity-10 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <span className="text-xl text-sacred-gold font-cormorant">
                          {result.scores[result.secondaryPath]}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Score breakdown */}
                <div className="mb-8">
                  <h3 className="text-lg text-sacred-gold font-cormorant mb-4">Your Path Scores</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(result.scores).map(([path, score]) => (
                      <div
                        key={`score-${path}`}
                        className="bg-deep-indigo-900 bg-opacity-50 p-4 rounded-lg text-center"
                      >
                        <motion.div
                          className="text-2xl text-sacred-gold font-cormorant"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {score}
                        </motion.div>
                        <p className="text-tulsi-green capitalize">{path}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recommendations */}
                <div className="mb-8">
                  <h3 className="text-xl text-sacred-gold font-cormorant mb-6 text-center">
                    Personalized Recommendations
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Recommended deities */}
                    <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                      <h4 className="text-sacred-gold font-cormorant mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Deities to Connect With
                      </h4>
                      
                      <ul className="space-y-2">
                        {getRecommendedDeities(result.primaryPath, result.secondaryPath).map((deity, index) => (
                          <motion.li
                            key={`deity-${index}`}
                            className="text-off-white flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                          >
                            <span className="text-tulsi-green mr-2">•</span>
                            {deity}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Recommended scriptures */}
                    <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                      <h4 className="text-sacred-gold font-cormorant mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Scriptures to Study
                      </h4>
                      
                      <ul className="space-y-2">
                        {getRecommendedScriptures(result.primaryPath, result.secondaryPath).map((scripture, index) => (
                          <motion.li
                            key={`scripture-${index}`}
                            className="text-off-white flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                          >
                            <span className="text-tulsi-green mr-2">•</span>
                            {scripture}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Recommended practices */}
                    <div className="bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                      <h4 className="text-sacred-gold font-cormorant mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Practices to Explore
                      </h4>
                      
                      <ul className="space-y-2">
                        {getRecommendedPractices(result.primaryPath, result.secondaryPath).map((practice, index) => (
                          <motion.li
                            key={`practice-${index}`}
                            className="text-off-white flex items-center"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                          >
                            <span className="text-tulsi-green mr-2">•</span>
                            {practice}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Path integration */}
                <div className="mb-8 bg-deep-indigo-900 bg-opacity-50 p-6 rounded-lg">
                  <h3 className="text-lg text-sacred-gold font-cormorant mb-3">
                    Integrating Your Paths
                  </h3>
                  
                  <p className="text-off-white mb-4">
                    Your results show a primary inclination toward {getPathDisplayName(result.primaryPath)} with 
                    {getPathDisplayName(result.secondaryPath)} as your secondary path. In Sanatana Dharma, the four 
                    paths are not mutually exclusive but complementary. Here's how you might integrate these paths:
                  </p>
                  
                  <div className="bg-sacred-gold bg-opacity-10 p-4 rounded-lg text-off-white">
                    {result.primaryPath === 'bhakti' && result.secondaryPath === 'karma' && (
                      "Combine devotional practices with selfless service. See your service as an offering to the Divine, and let your devotion inspire compassionate action in the world."
                    )}
                    {result.primaryPath === 'bhakti' && result.secondaryPath === 'jnana' && (
                      "Enrich your devotional practices with philosophical understanding. Let your intellectual inquiry be guided by devotion, and let knowledge deepen your connection to the Divine."
                    )}
                    {result.primaryPath === 'bhakti' && result.secondaryPath === 'raja' && (
                      "Use meditation and yogic disciplines to deepen your devotional experience. Your devotion provides emotional fuel for disciplined practice, while yoga helps stabilize your devotional experiences."
                    )}
                    {result.primaryPath === 'karma' && result.secondaryPath === 'bhakti' && (
                      "Infuse your actions with devotional attitude. See your work as worship and develop loving service as you fulfill your duties with detachment."
                    )}
                    {result.primaryPath === 'karma' && result.secondaryPath === 'jnana' && (
                      "Let philosophical understanding guide your actions. Combine selfless service with discernment, using wisdom to determine the most beneficial course of action."
                    )}
                    {result.primaryPath === 'karma' && result.secondaryPath === 'raja' && (
                      "Use meditation to maintain equanimity while performing actions. The discipline of Raja Yoga helps you maintain detachment and focus while engaged in Karma Yoga."
                    )}
                    {result.primaryPath === 'jnana' && result.secondaryPath === 'bhakti' && (
                      "Balance intellectual inquiry with heart-centered devotion. Let devotion soften the potential dryness of pure intellectualism, and let knowledge give structure to devotional feelings."
                    )}
                    {result.primaryPath === 'jnana' && result.secondaryPath === 'karma' && (
                      "Apply your philosophical understanding through practical action. Test your knowledge in the laboratory of daily life through selfless service and ethical action."
                    )}
                    {result.primaryPath === 'jnana' && result.secondaryPath === 'raja' && (
                      "Use meditation to directly experience the truths you intellectually understand. Raja Yoga provides the practical methods to realize the philosophical insights of Jnana Yoga."
                    )}
                    {result.primaryPath === 'raja' && result.secondaryPath === 'bhakti' && (
                      "Infuse your meditation practice with devotional feeling. Devotion provides emotional energy and motivation for the disciplined practice of Raja Yoga."
                    )}
                    {result.primaryPath === 'raja' && result.secondaryPath === 'karma' && (
                      "Apply the mindfulness and equanimity developed in meditation to your daily actions. Let your disciplined practice inform how you engage with the world through service."
                    )}
                    {result.primaryPath === 'raja' && result.secondaryPath === 'jnana' && (
                      "Use philosophical understanding to guide your meditation practice. Jnana provides the conceptual framework that Raja Yoga helps you directly experience."
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-sacred-gold text-deep-indigo-900 px-6 py-3 rounded-md font-medium hover:bg-sacred-gold-light transition-colors"
                  >
                    Take Quiz Again
                  </button>
                  
                  <button
                    onClick={() => setShowPreviousResults(!showPreviousResults)}
                    className="bg-transparent border border-sacred-gold text-sacred-gold px-6 py-3 rounded-md font-medium hover:bg-deep-indigo-900 transition-colors"
                  >
                    {showPreviousResults ? 'Hide Previous Results' : 'View Previous Results'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SpiritualPathQuiz;
