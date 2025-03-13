"use client";
import { useState, useEffect } from 'react';
import Layout from "@/components/ui/Layout";
import Button from "@/components/ui/Button";
import { FiCheck, FiX, FiClock, FiArrowRight } from 'react-icons/fi';
import Modal from '@/components/ui/Modal';

export default function SImulation() {
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const questions = [
    {
      quest: "Qu'est ce qu'un ... ?",
      rep: true
    },{
      quest: "What dfgdfgsdf dvv v  ... ?",
      rep: false
    },{
      quest: "Pourquoi je serai toujours  ... ?",
      rep: true
    },{
      quest: "Voila pourquoi ... ?",
      rep: false
    },{
      quest: "Faut tout d'abord ... ?",
      rep: true
    },{
      quest: "C'est quoi  ... ?",
      rep: false
    },{
      quest: "Cette phrase vous evoque ... ?",
      rep: true
    },{
      quest: "Qu'est ce qu'un ... ?",
      rep: false
    },{
      quest: "Comment faire pour ... ?",
      rep: true
    },{
      quest: "On sait que ... ?",
      rep: false
    },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStart = () => {
    setIsRunning(true);
    setTimer(10);
  };

  const handleAnswer = (answer: boolean) => {
    if (answer === questions[indexQuestion].rep) {
      setScore(prev => prev + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (indexQuestion < questions.length - 1) {
      setIndexQuestion(prev => prev + 1);
      setTimer(10);
    } else {
      setIsRunning(false);
      setShowResult(true);
    }
  };

  const resetTest = () => {
    setIndexQuestion(0);
    setTimer(10);
    setScore(0);
    setShowResult(false);
    setIsRunning(false);
  };

  const progress = ((indexQuestion) / questions.length) * 100;

  return (
    <Layout>
      <div className="w-full bg-background-200 dark:bg-foreground-700 md:px-6 px-4 md:py-4 py-2 text-center rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-theme-t dark:text-theme-f mb-2">Simulation d`examen</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Répondez à 10 questions avec un temps limité. Testez vos connaissances !
        </p>

        {!isRunning && indexQuestion === 0 && (
          <div className="space-y-6">
            <div className="p-4 dark:bg-foreground-200 bg-background-100 rounded-xl">
              <FiClock className="w-12 h-12 mx-auto text-theme-t dark:text-theme-f mb-2"/>
              <h3 className="font-semibold mb-2">Règles du test :</h3>
              <ul className="text-sm space-y-2 text-left">
                <li>• 10 secondes par question</li>
                <li>• Cliquez sur Vrai ou Faux pour répondre</li>
                <li>• Score final à la fin du test</li>
                <li>• Pas de retour en arrière possible</li>
              </ul>
            </div>
            <Button 
              size="lg" 
              variant="primary"
              onClick={handleStart}
              className="animate-bounce"
            >
              Commencer le test
            </Button>
          </div>
        )}

        {isRunning && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-theme-t dark:text-theme-f">
                <FiClock className="w-5 h-5"/>
                <span className="font-bold">{timer}s</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 ">
                Question {indexQuestion + 1}/{questions.length}
              </div>
            </div>

            <div className="relative h-2 dark:bg-gray-200 bg-gray-800 rounded-full mb-6">
              <div 
                className="absolute h-full bg-theme-t dark:bg-theme-f rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="dark:bg-foreground-100 bg-background-700 p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-theme-t dark:text-theme-f">
                {questions[indexQuestion].quest}
              </h2>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="success" 
                  onClick={() => handleAnswer(true)}
                  className="flex items-center space-x-2 px-6"
                >
                  <FiCheck className="w-5 h-5"/>
                  <span>Vrai</span>
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleAnswer(false)}
                  className="flex items-center space-x-2 px-6"
                >
                  <FiX className="w-5 h-5"/>
                  <span>Faux</span>
                </Button>
              </div>
            </div>

            <Button 
              variant="secondary" 
              onClick={handleNextQuestion}
              className="flex items-center space-x-2 mx-auto"
            >
              <span>Passer</span>
              <FiArrowRight className="w-4 h-4"/>
            </Button>
          </div>
        )}

        <Modal 
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          title="Résultats du test"
        >
          <div className="text-center space-y-6">
            <div className="text-4xl font-bold text-theme-t dark:text-theme-f">
              {Math.round((score / questions.length) * 100)}%
            </div>
            <div className="text-lg">
              {score >= questions.length / 2 ? (
                <span className="text-green-500">Bravo ! Vous êtes prêt(e) 🎉</span>
              ) : (
                <span className="text-red-500">Encore un effort ! 💪</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background-100 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300">Bonnes réponses</div>
                <div className="text-xl font-bold text-theme-t dark:text-theme-f">{score}</div>
              </div>
              <div className="p-3 bg-background-100 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-300">Mauvaises réponses</div>
                <div className="text-xl font-bold text-theme-t dark:text-theme-f">{questions.length - score}</div>
              </div>
            </div>
            <Button 
              variant="primary" 
              onClick={resetTest}
              className="w-full"
            >
              Recommencer le test
            </Button>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}